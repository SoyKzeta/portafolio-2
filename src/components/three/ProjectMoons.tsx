"use client";

import { Html, useCursor, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

import {
  isProjectMoonId,
  projectMoons,
  type ProjectMoonDef,
  type SectionId,
} from "@/data/planets";
import { MOON_MAP_URLS } from "@/lib/texture-assets";

type ProjectMoonsProps = {
  selectedSectionId: SectionId;
  reducedMotion: boolean;
  onSelect: (id: SectionId) => void;
  onMoonPositionUpdate: (id: ProjectMoonDef["id"], position: THREE.Vector3) => void;
};

function visibilityForMoons(selectedId: SectionId): number {
  if (selectedId === "system") {
    return 0.14;
  }
  if (selectedId === "about") {
    return 0.2;
  }
  if (selectedId === "skills" || selectedId === "contact") {
    return 0.4;
  }
  if (selectedId === "projects" || isProjectMoonId(selectedId)) {
    return 1;
  }
  return 0.5;
}

function ProjectMoonNode({
  def,
  map,
  selectedSectionId,
  reducedMotion,
  onSelect,
  onMoonPositionUpdate,
  visibility,
  emissiveStrength,
}: {
  def: ProjectMoonDef;
  map: THREE.Texture;
  selectedSectionId: SectionId;
  reducedMotion: boolean;
  onSelect: (id: SectionId) => void;
  onMoonPositionUpdate: (id: ProjectMoonDef["id"], position: THREE.Vector3) => void;
  visibility: number;
  emissiveStrength: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const worldPos = useRef(new THREE.Vector3());
  const selected = selectedSectionId === def.id;

  useCursor(hovered);

  useFrame((state, delta) => {
    if (!groupRef.current) {
      return;
    }
    const t = reducedMotion ? 0 : state.clock.elapsedTime;
    const speed = reducedMotion ? 0.12 : 1;
    const a = def.initialAngle + t * def.moonOrbitSpeed * speed;
    const x = Math.cos(a) * def.moonOrbitRadius;
    const z = Math.sin(a) * def.moonOrbitRadius;
    const y = Math.sin(a * 2.1 + def.initialAngle) * def.verticalWobble;
    groupRef.current.position.set(x, y, z);
    groupRef.current.getWorldPosition(worldPos.current);
    onMoonPositionUpdate(def.id, worldPos.current);
    const scaleTarget = selected ? 1.2 : hovered ? 1.08 : 1;
    const blend = 1 - Math.exp(-delta * 6);
    groupRef.current.scale.lerp(new THREE.Vector3(scaleTarget, scaleTarget, scaleTarget), blend);
  });

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(def.id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <sphereGeometry args={[def.size, 40, 40]} />
        <meshStandardMaterial
          map={map}
          emissiveMap={map}
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={emissiveStrength * (0.9 + (selected ? 0.1 : 0) + (hovered ? 0.06 : 0))}
          roughness={0.58}
          metalness={0.03}
        />
      </mesh>
      <Html
        position={[def.size * 1.1 + 0.35, def.size * 0.4, 0]}
        distanceFactor={5.2}
        className="planet-label select-none pointer-events-none"
        style={{ opacity: 0.35 + 0.65 * visibility }}
      >
        <div>
          <span className="planet-label-title" style={{ fontSize: "0.7rem" }}>
            {def.name}
          </span>
        </div>
      </Html>
    </group>
  );
}

export function ProjectMoons({
  selectedSectionId,
  reducedMotion,
  onSelect,
  onMoonPositionUpdate,
}: ProjectMoonsProps) {
  const { gl } = useThree();
  const moonMaps = useTexture([...MOON_MAP_URLS]);

  useLayoutEffect(() => {
    for (const tex of moonMaps) {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.anisotropy = gl.capabilities.getMaxAnisotropy();
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.needsUpdate = true;
    }
  }, [gl, moonMaps]);

  const visibility = useMemo(
    () => visibilityForMoons(selectedSectionId),
    [selectedSectionId],
  );

  const emissiveBase = 0.18 + 0.5 * visibility;

  return (
    <group>
      {projectMoons.map((def, index) => (
        <ProjectMoonNode
          key={def.id}
          def={def}
          map={moonMaps[index]!}
          selectedSectionId={selectedSectionId}
          reducedMotion={reducedMotion}
          onSelect={onSelect}
          onMoonPositionUpdate={onMoonPositionUpdate}
          visibility={visibility}
          emissiveStrength={emissiveBase}
        />
      ))}
    </group>
  );
}
