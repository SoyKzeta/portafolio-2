"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { OrbitRing } from "@/components/three/OrbitRing";
import { Planet } from "@/components/three/Planet";
import { Sun } from "@/components/three/Sun";
import { solarBodies, type SectionId } from "@/data/planets";

type SolarSystemProps = {
  selectedId: SectionId;
  reducedMotion: boolean;
  onSelect: (id: SectionId) => void;
  onPositionUpdate: (id: Exclude<SectionId, "system">, position: THREE.Vector3) => void;
};

export function SolarSystem({
  selectedId,
  reducedMotion,
  onSelect,
  onPositionUpdate,
}: SolarSystemProps) {
  const systemRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!systemRef.current || reducedMotion) {
      return;
    }
    systemRef.current.rotation.z = -0.02 + Math.sin(state.clock.elapsedTime * 0.04) * 0.01;
  });

  return (
    <group ref={systemRef} rotation={[-0.22, -0.42, 0]}>
      <Sun
        reducedMotion={reducedMotion}
        selected={selectedId === "about"}
        onSelect={() => onSelect("about")}
        onPositionUpdate={(pos) => onPositionUpdate("about", pos)}
      />

      {solarBodies.map((body) => (
        <OrbitRing
          key={`orbit-${body.id}`}
          radius={body.orbitRadius}
          color={body.glowColor}
        />
      ))}

      {solarBodies.map((body) => (
        <Planet
          key={body.id}
          body={body}
          selected={selectedId === body.id}
          selectedSectionId={selectedId}
          reducedMotion={reducedMotion}
          onSelect={onSelect}
          onPositionUpdate={onPositionUpdate}
        />
      ))}
    </group>
  );
}
