"use client";

import { useRef, useState } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

function buildLayer(starCount: number, radiusMin: number, radiusSpread: number, flatten = 1) {
  const positionArray = new Float32Array(starCount * 3);
  const colorArray = new Float32Array(starCount * 3);

  for (let index = 0; index < starCount; index += 1) {
    const radius = radiusMin + Math.random() * radiusSpread;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi) * flatten;
    const z = radius * Math.sin(phi) * Math.sin(theta);

    positionArray[index * 3] = x;
    positionArray[index * 3 + 1] = y;
    positionArray[index * 3 + 2] = z;

    const tint = new THREE.Color().setHSL(
      0.55 + Math.random() * 0.16,
      0.18 + Math.random() * 0.34,
      0.74 + Math.random() * 0.18,
    );
    colorArray[index * 3] = tint.r;
    colorArray[index * 3 + 1] = tint.g;
    colorArray[index * 3 + 2] = tint.b;
  }

  return { positions: positionArray, colors: colorArray };
}

function StarLayer({
  positions,
  colors,
  size,
  opacity,
  map,
}: {
  positions: Float32Array<ArrayBuffer>;
  colors: Float32Array<ArrayBuffer>;
  size: number;
  opacity: number;
  map?: THREE.Texture;
}) {
  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        sizeAttenuation
        transparent
        opacity={opacity}
        depthWrite={false}
        vertexColors
        map={map}
        blending={map ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  );
}

export function StarField() {
  const groupRef = useRef<THREE.Group>(null);
  const starsRef = useRef<THREE.Group>(null);
  const farRef = useRef<THREE.Group>(null);
  const midRef = useRef<THREE.Group>(null);
  const dustRef = useRef<THREE.Group>(null);

  const [farLayer] = useState(() => buildLayer(2100, 42, 96, 0.76));
  const [midLayer] = useState(() => buildLayer(980, 28, 54, 0.54));
  
  // Use the dust texture for the closest layer
  const dustTex = useTexture("/textures/dust.png");
  const [dustLayer] = useState(() => buildLayer(800, 16, 32, 0.25));

  // Use the stars texture for a massive background sphere
  const starsTex = useTexture("/textures/stars.png");
  starsTex.wrapS = THREE.RepeatWrapping;
  starsTex.wrapT = THREE.RepeatWrapping;
  starsTex.repeat.set(4, 2);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    
    // Very slow, subtle drift for the entire starfield/dust
    groupRef.current.rotation.y = t * 0.005;
    groupRef.current.rotation.x = Math.sin(t * 0.02) * 0.01;

    // Parallax based on camera movement
    const camX = state.camera.position.x;
    const camY = state.camera.position.y;

    if (starsRef.current) {
      starsRef.current.position.x = THREE.MathUtils.lerp(starsRef.current.position.x, camX * 0.98, 0.05);
      starsRef.current.position.y = THREE.MathUtils.lerp(starsRef.current.position.y, camY * 0.98, 0.05);
    }
    if (farRef.current) {
      farRef.current.position.x = THREE.MathUtils.lerp(farRef.current.position.x, camX * 0.85, 0.05);
      farRef.current.position.y = THREE.MathUtils.lerp(farRef.current.position.y, camY * 0.85, 0.05);
    }
    if (midRef.current) {
      midRef.current.position.x = THREE.MathUtils.lerp(midRef.current.position.x, camX * 0.65, 0.05);
      midRef.current.position.y = THREE.MathUtils.lerp(midRef.current.position.y, camY * 0.65, 0.05);
    }
    if (dustRef.current) {
      // Dust is closest, moves the most relative to background (least following of camera)
      dustRef.current.position.x = THREE.MathUtils.lerp(dustRef.current.position.x, camX * 0.3, 0.05);
      dustRef.current.position.y = THREE.MathUtils.lerp(dustRef.current.position.y, camY * 0.3, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={starsRef}>
        <mesh>
          <sphereGeometry args={[140, 64, 64]} />
          <meshBasicMaterial
            map={starsTex}
            side={THREE.BackSide}
            transparent
            opacity={0.35}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      <group ref={farRef}>
        <StarLayer positions={farLayer.positions} colors={farLayer.colors} size={0.18} opacity={0.8} />
      </group>
      <group ref={midRef}>
        <StarLayer positions={midLayer.positions} colors={midLayer.colors} size={0.11} opacity={0.5} />
      </group>
      <group ref={dustRef}>
        <StarLayer positions={dustLayer.positions} colors={dustLayer.colors} size={2.5} opacity={0.3} map={dustTex} />
      </group>
    </group>
  );
}
