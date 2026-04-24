"use client";

import { Billboard, MeshDistortMaterial, Html, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import { createRadialTexture } from "@/lib/space-textures";

type SunProps = {
  reducedMotion: boolean;
};

export function Sun({ reducedMotion }: SunProps) {
  const groupRef = useRef<THREE.Group>(null);
  const auraRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const shell2Ref = useRef<THREE.Mesh>(null);
  const glowShellRef = useRef<THREE.Mesh>(null);
  const coreMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const shellMaterialRef = useRef<{
    map: THREE.Texture | null;
  } | null>(null);
  const shell2MaterialRef = useRef<{
    map: THREE.Texture | null;
  } | null>(null);

  const surfaceTexture = useTexture("/textures/sun.png");
  const emissiveTexture = useTexture("/textures/sun.png");

  const coronaTexture = useMemo(
    () => createRadialTexture("rgba(255,248,223,0.98)", "rgba(255,144,30,0.82)", 1024),
    [],
  );
  const hazeTexture = useMemo(
    () => createRadialTexture("rgba(255,218,127,0.92)", "rgba(255,115,18,0.48)", 1024),
    [],
  );

  useMemo(() => {
    surfaceTexture.colorSpace = THREE.SRGBColorSpace;
    surfaceTexture.wrapS = THREE.RepeatWrapping;
    surfaceTexture.wrapT = THREE.RepeatWrapping;
    surfaceTexture.needsUpdate = true;

    emissiveTexture.colorSpace = THREE.SRGBColorSpace;
    emissiveTexture.wrapS = THREE.RepeatWrapping;
    emissiveTexture.wrapT = THREE.RepeatWrapping;
    emissiveTexture.needsUpdate = true;
  }, [emissiveTexture, surfaceTexture]);

  useFrame((state, delta) => {
    if (!groupRef.current || !auraRef.current || !shellRef.current || !shell2Ref.current || !glowShellRef.current) {
      return;
    }

    const t = state.clock.elapsedTime;
    // Layered organic pulsation
    const pulse = reducedMotion ? 1 : 1 + Math.sin(t * 0.4) * Math.cos(t * 0.25) * 0.015;
    const auraPulse = reducedMotion ? 1 : 1 + Math.sin(t * 0.3 + 0.5) * Math.cos(t * 0.15) * 0.035;
    const shellPulse = reducedMotion ? 1 : 1 + Math.sin(t * 0.35 + 1.1) * 0.02;
    const shell2Pulse = reducedMotion ? 1 : 1 + Math.sin(t * 0.28 + 2.3) * 0.025;
    const hazePulse = reducedMotion ? 1 : 1 + Math.sin(t * 0.25 + 1.7) * 0.025;

    groupRef.current.scale.setScalar(pulse);
    groupRef.current.rotation.y += delta * 0.015;
    groupRef.current.rotation.z = Math.sin(t * 0.08) * 0.015;

    auraRef.current.scale.setScalar(auraPulse);
    shellRef.current.scale.setScalar(shellPulse);
    shell2Ref.current.scale.setScalar(shell2Pulse);
    glowShellRef.current.scale.setScalar(hazePulse);

    if (reducedMotion) {
      return;
    }

    const coreMaterial = coreMaterialRef.current;
    const shellMaterial = shellMaterialRef.current;
    const shell2Material = shell2MaterialRef.current;

    // Organic texture scrolling for plasma feel
    if (coreMaterial?.map) {
      coreMaterial.map.offset.x += delta * 0.003;
      coreMaterial.map.offset.y += delta * 0.0015;
    }

    if (coreMaterial?.emissiveMap) {
      coreMaterial.emissiveMap.offset.x -= delta * 0.005;
      coreMaterial.emissiveMap.offset.y += delta * 0.002;
    }

    if (coreMaterial?.bumpMap) {
      coreMaterial.bumpMap.offset.x -= delta * 0.004;
      coreMaterial.bumpMap.offset.y += delta * 0.0015;
    }

    if (shellMaterial?.map) {
      shellMaterial.map.offset.x -= delta * 0.006;
      shellMaterial.map.offset.y -= delta * 0.002;
    }
    
    if (shell2Material?.map) {
      shell2Material.map.offset.x += delta * 0.004;
      shell2Material.map.offset.y += delta * 0.003;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[3.12, 128, 128]} />
        <meshStandardMaterial
          ref={coreMaterialRef}
          map={surfaceTexture}
          emissiveMap={emissiveTexture}
          bumpMap={emissiveTexture}
          bumpScale={0.12}
          color="#ffffff"
          emissive="#fff5e6"
          emissiveIntensity={7.5}
          roughness={0.4}
          metalness={0.1}
          toneMapped={false}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[2.95, 96, 96]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>

      {/* Primary Plasma Shell */}
      <mesh ref={shellRef}>
        <sphereGeometry args={[3.42, 112, 112]} />
        <MeshDistortMaterial
          ref={(node) => {
            shellMaterialRef.current = node as { map: THREE.Texture | null } | null;
          }}
          map={emissiveTexture}
          color="#ffffff"
          emissive="#ffaa00"
          emissiveIntensity={4.5}
          roughness={0.2}
          metalness={0.05}
          transparent
          opacity={0.35}
          distort={reducedMotion ? 0.04 : 0.15}
          speed={reducedMotion ? 0.2 : 0.6}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Secondary Plasma Shell (Counter-rotating, different distortion) */}
      <mesh ref={shell2Ref} rotation={[Math.PI / 4, 0, Math.PI / 2]}>
        <sphereGeometry args={[3.55, 96, 96]} />
        <MeshDistortMaterial
          ref={(node) => {
            shell2MaterialRef.current = node as { map: THREE.Texture | null } | null;
          }}
          map={emissiveTexture}
          color="#ffffff"
          emissive="#ff5500"
          emissiveIntensity={3.0}
          roughness={0.4}
          metalness={0.0}
          transparent
          opacity={0.25}
          distort={reducedMotion ? 0.03 : 0.25}
          speed={reducedMotion ? 0.1 : 0.4}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Inner Glow Halo */}
      <mesh ref={glowShellRef}>
        <sphereGeometry args={[4.25, 96, 96]} />
        <meshBasicMaterial
          color="#ff7700"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Outer Glow Aura */}
      <mesh ref={auraRef}>
        <sphereGeometry args={[5.2, 96, 96]} />
        <meshBasicMaterial
          color="#ff4400"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      <Billboard>
        <mesh scale={16.4}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            map={coronaTexture}
            transparent
            opacity={0.85}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </mesh>
      </Billboard>

      <Billboard position={[0.35, -0.15, 0]}>
        <mesh scale={12.8}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            map={hazeTexture}
            transparent
            opacity={0.4}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </mesh>
      </Billboard>

      {/* Lens Flare */}
      <Billboard>
        <mesh scale={[32, 0.4, 1]} rotation={[0, 0, Math.PI / 6]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            color="#ffaa44"
            transparent
            opacity={0.15}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
        <mesh scale={[40, 0.25, 1]} rotation={[0, 0, -Math.PI / 4]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            color="#ff8822"
            transparent
            opacity={0.1}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      </Billboard>

      <Html position={[4.2, 2.5, 0]} distanceFactor={12} className="planet-label select-none pointer-events-none">
        <div className="relative">
          <span
            className="absolute -left-7 top-[0.65rem] h-px w-6"
            style={{ background: `linear-gradient(90deg, #ff9824, transparent)` }}
          />
          <span className="planet-label-title text-xl">Emmanuel Villegas Urrea</span>
          <span className="planet-label-subtitle text-[0.95rem]">Desarrollador Full-Stack & Fundador de FlowsFy</span>
        </div>
      </Html>
    </group>
  );
}
