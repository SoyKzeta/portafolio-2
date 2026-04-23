"use client";

import { Billboard, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type NebulaBackgroundProps = {
  reducedMotion: boolean;
};

export function NebulaBackground({ reducedMotion }: NebulaBackgroundProps) {
  const groupRef = useRef<THREE.Group>(null);
  const layer1Ref = useRef<THREE.Group>(null);
  const layer2Ref = useRef<THREE.Group>(null);
  const layer3Ref = useRef<THREE.Group>(null);
  
  const tex1 = useTexture("/textures/nebula/nebula-1.jpg");
  const tex2 = useTexture("/textures/nebula/nebula-2.jpg");
  const tex3 = useTexture("/textures/nebula/nebula-3.jpg");

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) {
      return;
    }

    const t = state.clock.elapsedTime;
    groupRef.current.rotation.z = Math.sin(t * 0.05) * 0.02;
    groupRef.current.position.y = Math.sin(t * 0.08) * 0.15;

    // Parallax based on camera movement
    // Far elements (layer 3) follow the camera more closely to appear infinitely far
    // Near elements (layer 1) follow less, creating a parallax shift
    const camX = state.camera.position.x;
    const camY = state.camera.position.y;

    if (layer1Ref.current) {
      layer1Ref.current.position.x = THREE.MathUtils.lerp(layer1Ref.current.position.x, camX * 0.6, 0.05);
      layer1Ref.current.position.y = THREE.MathUtils.lerp(layer1Ref.current.position.y, camY * 0.6, 0.05);
    }
    if (layer2Ref.current) {
      layer2Ref.current.position.x = THREE.MathUtils.lerp(layer2Ref.current.position.x, camX * 0.8, 0.05);
      layer2Ref.current.position.y = THREE.MathUtils.lerp(layer2Ref.current.position.y, camY * 0.8, 0.05);
    }
    if (layer3Ref.current) {
      layer3Ref.current.position.x = THREE.MathUtils.lerp(layer3Ref.current.position.x, camX * 0.95, 0.05);
      layer3Ref.current.position.y = THREE.MathUtils.lerp(layer3Ref.current.position.y, camY * 0.95, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={layer1Ref}>
        <Billboard position={[-35, 10, -50]}>
          <mesh scale={[60, 40, 1]}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial
              map={tex1}
              transparent
              opacity={0.35}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
              toneMapped={false}
            />
          </mesh>
        </Billboard>
      </group>

      <group ref={layer2Ref}>
        <Billboard position={[35, -5, -60]}>
          <mesh scale={[70, 45, 1]}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial
              map={tex2}
              transparent
              opacity={0.4}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
              toneMapped={false}
            />
          </mesh>
        </Billboard>
      </group>

      <group ref={layer3Ref}>
        <Billboard position={[0, 15, -70]}>
          <mesh scale={[80, 50, 1]}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial
              map={tex3}
              transparent
              opacity={0.3}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
              toneMapped={false}
            />
          </mesh>
        </Billboard>
      </group>

      <mesh position={[0, -15, -40]} rotation={[-Math.PI / 2.55, 0, 0]}>
        <circleGeometry args={[50, 64]} />
        <meshBasicMaterial color="#0a0514" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}
