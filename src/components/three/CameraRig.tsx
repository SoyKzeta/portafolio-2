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

  useFrame(() => {
    const controls = controlsRef.current;
    const pending = pendingFocusRef.current;

    if (!controls || !pending || lastAppliedKeyRef.current === pending.key) {
      return;
    }

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
      return;
    }

    const focus = bodyPositions.current[pending.id];
    if (!focus) {
      return;
    }

    const direction = focus.clone().normalize();
    const desiredTarget = focus.clone().add(new THREE.Vector3(0.5, 0.2, 0));
    const desiredPosition = focus
      .clone()
      .add(direction.multiplyScalar(6.6))
      .add(new THREE.Vector3(-2.6, 2.1, 7.6));

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
  });

  return null;
}
