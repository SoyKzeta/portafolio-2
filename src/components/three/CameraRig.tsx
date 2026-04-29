"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type CameraControlsImpl from "camera-controls";

import type { SectionId } from "@/data/planets";

type CameraRigProps = {
  controlsRef: React.RefObject<CameraControlsImpl | null>;
  bodyPositions: React.MutableRefObject<Record<string, THREE.Vector3>>;
  selectedId: SectionId;
  resetToken: number;
};

type PendingFocus =
  | { type: "overview"; key: string }
  | { type: "planet"; key: string; id: Exclude<SectionId, "system"> };

const tmpD = new THREE.Vector3();
const vOffset = new THREE.Vector3(0.5, 0.2, 0);
const wOffset = new THREE.Vector3(-2.6, 2.1, 7.6);
const tmpP = new THREE.Vector3();
const tmpT = new THREE.Vector3();
const directionScratch = new THREE.Vector3();

export function CameraRig({
  controlsRef,
  bodyPositions,
  selectedId,
  resetToken,
}: CameraRigProps) {
  const overviewPosition = useMemo(() => new THREE.Vector3(-8.5, 8.6, 29.4), []);
  const overviewTarget = useMemo(() => new THREE.Vector3(1.2, -0.6, 0), []);
  const pendingFocusRef = useRef<PendingFocus | null>(null);
  const lastAppliedKeyRef = useRef<string>("");
  const lastBodyPosForFollow = useRef<THREE.Vector3 | null>(null);

  useEffect(() => {
    const key = `${selectedId}:${resetToken}`;

    if (selectedId === "system") {
      pendingFocusRef.current = { type: "overview", key };
      return;
    }

    pendingFocusRef.current = {
      type: "planet",
      key,
      id: selectedId,
    };
  }, [resetToken, selectedId]);

  // Prioridad 1: corre después de `SolarSystem` (prioridad 0) para leer `bodyPositions` ya actualizados
  useFrame(() => {
    const controls = controlsRef.current;
    if (!controls) {
      return;
    }

    const pending = pendingFocusRef.current;
    if (pending && lastAppliedKeyRef.current !== pending.key) {
      if (pending.type === "overview") {
        controls.setLookAt(
          overviewPosition.x,
          overviewPosition.y,
          overviewPosition.z,
          overviewTarget.x,
          overviewTarget.y,
          overviewTarget.z,
          true,
        );
        lastAppliedKeyRef.current = pending.key;
        pendingFocusRef.current = null;
        lastBodyPosForFollow.current = null;
        return;
      }

      const focus = bodyPositions.current[pending.id];
      if (!focus) {
        return;
      }

      const direction = directionScratch.copy(focus).normalize();
      const desiredTarget = focus.clone().add(vOffset);
      const desiredPosition = focus
        .clone()
        .add(tmpD.copy(direction).multiplyScalar(6.6))
        .add(wOffset);

      controls.setLookAt(
        desiredPosition.x,
        desiredPosition.y,
        desiredPosition.z,
        desiredTarget.x,
        desiredTarget.y,
        desiredTarget.z,
        true,
      );
      lastAppliedKeyRef.current = pending.key;
      pendingFocusRef.current = null;
      lastBodyPosForFollow.current = focus.clone();
      return;
    }

    if (selectedId === "system") {
      return;
    }

    const focus = bodyPositions.current[selectedId];
    if (!focus) {
      return;
    }

    if (!lastBodyPosForFollow.current) {
      lastBodyPosForFollow.current = focus.clone();
      return;
    }

    const delta = tmpD.subVectors(focus, lastBodyPosForFollow.current);
    if (delta.lengthSq() < 1e-10) {
      return;
    }
    lastBodyPosForFollow.current.copy(focus);

    controls.getPosition(tmpP);
    controls.getTarget(tmpT);
    tmpP.add(delta);
    tmpT.add(delta);
    controls.setLookAt(tmpP.x, tmpP.y, tmpP.z, tmpT.x, tmpT.y, tmpT.z, false);
  }, 1);

  return null;
}
