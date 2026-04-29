"use client";

import { Html, useCursor, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useLayoutEffect, useRef, useState } from "react";
import * as THREE from "three";

import { Textures } from "@/lib/texture-assets";

type SunProps = {
  reducedMotion: boolean;
  selected: boolean;
  onSelect: () => void;
  onPositionUpdate: (position: THREE.Vector3) => void;
};

export function Sun({ reducedMotion: _reducedMotion, selected, onSelect, onPositionUpdate }: SunProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { gl } = useThree();
  const sunMap = useTexture(Textures.sun);

  useLayoutEffect(() => {
    const maxA = gl.capabilities.getMaxAnisotropy();
    sunMap.colorSpace = THREE.SRGBColorSpace;
    sunMap.wrapS = THREE.RepeatWrapping;
    sunMap.wrapT = THREE.RepeatWrapping;
    sunMap.anisotropy = maxA;
    sunMap.minFilter = THREE.LinearMipmapLinearFilter;
    sunMap.magFilter = THREE.LinearFilter;
    sunMap.needsUpdate = true;
  }, [gl, sunMap]);

  useCursor(hovered);

  useFrame((_, _delta) => {
    if (!groupRef.current) {
      return;
    }
    const w = new THREE.Vector3();
    groupRef.current.getWorldPosition(w);
    onPositionUpdate(w);
  });

  return (
    <group
      ref={groupRef}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      <mesh scale={selected ? 1.04 : hovered ? 1.02 : 1}>
        <sphereGeometry args={[3.12, 128, 128]} />
        <meshStandardMaterial
          map={sunMap}
          emissiveMap={sunMap}
          color="#ffffff"
          emissive="#ff5a14"
          emissiveIntensity={0.42 + (selected ? 0.1 : 0) + (hovered ? 0.06 : 0)}
          roughness={0.5}
          metalness={0.02}
          envMapIntensity={0}
        />
      </mesh>

      <Html
        position={[4.0, 2.6, 0]}
        distanceFactor={12}
        className="planet-label select-none pointer-events-none"
      >
        <div className="relative max-w-xs">
          <span
            className="absolute -left-7 top-[0.65rem] h-px w-6"
            style={{ background: `linear-gradient(90deg, #ff9824, transparent)` }}
          />
          <span className="planet-label-title text-xl">Sobre mí</span>
          <span className="planet-label-subtitle text-[0.95rem]">Emmanuel · Full-Stack · FlowsFy</span>
        </div>
      </Html>
    </group>
  );
}
