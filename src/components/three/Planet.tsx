"use client";

import { Billboard, Html, useCursor, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

import { ProjectMoons } from "@/components/three/ProjectMoons";
import type { SolarBody, SectionId } from "@/data/planets";
import { createRadialTexture } from "@/lib/space-textures";
import { Textures } from "@/lib/texture-assets";

type PlanetProps = {
  body: SolarBody;
  selected: boolean;
  selectedSectionId: SectionId;
  reducedMotion: boolean;
  onSelect: (id: SectionId) => void;
  onPositionUpdate: (id: Exclude<SectionId, "system">, position: THREE.Vector3) => void;
};

export function Planet({
  body,
  selected,
  selectedSectionId,
  reducedMotion,
  onSelect,
  onPositionUpdate,
}: PlanetProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Group>(null);
  const worldPositionRef = useRef(new THREE.Vector3());
  const [hovered, setHovered] = useState(false);
  const glowTexture = useMemo(
    () => createRadialTexture("rgba(255,255,255,0.5)", "rgba(255,255,255,0)", 768),
    [],
  );
  const haloTexture = useMemo(
    () => createRadialTexture("rgba(255,255,255,0.35)", "rgba(255,255,255,0)", 768),
    [],
  );

  const haloMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const glowMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const { gl } = useThree();

  const skinUrl = useMemo(() => {
    switch (body.id) {
      case "projects":
        return Textures.planetProjects;
      case "skills":
        return Textures.planetSkills;
      case "contact":
        return Textures.planetContact;
      default:
        return Textures.planetContact;
    }
  }, [body.id]);

  const skinMap = useTexture(skinUrl);

  useLayoutEffect(() => {
    skinMap.colorSpace = THREE.SRGBColorSpace;
    skinMap.wrapS = THREE.RepeatWrapping;
    skinMap.wrapT = THREE.ClampToEdgeWrapping;
    skinMap.anisotropy = gl.capabilities.getMaxAnisotropy();
    skinMap.minFilter = THREE.LinearMipmapLinearFilter;
    skinMap.magFilter = THREE.LinearFilter;
    skinMap.needsUpdate = true;
  }, [gl, skinMap]);

  const materialProps = useMemo(() => {
    switch (body.id) {
      case "projects":
        return {
          roughness: 0.75,
          metalness: 0.04,
          clearcoat: 0.0,
          clearcoatRoughness: 0.5,
        };
      case "skills":
        return {
          roughness: 0.7,
          metalness: 0.0,
          clearcoat: 0.05,
          clearcoatRoughness: 0.45,
        };
      case "contact":
      default:
        return {
          roughness: 0.62,
          metalness: 0.08,
          clearcoat: 0.06,
          clearcoatRoughness: 0.38,
        };
    }
  }, [body.id]);

  useCursor(hovered);

  useFrame((state, delta) => {
    if (!groupRef.current || !meshRef.current || !glowRef.current) {
      return;
    }

    const time = reducedMotion ? 0 : state.clock.elapsedTime;
    const angle = body.initialAngle + time * body.orbitSpeed * 0.35;
    const radius = body.orbitRadius;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = Math.sin(time * 0.12 + body.initialAngle) * body.verticalRange * 0.6;

    groupRef.current.position.set(x, y, z);

    meshRef.current.rotation.y += delta * (0.04 + body.size * 0.015);
    meshRef.current.rotation.x = Math.sin(time * 0.1 + body.initialAngle) * 0.05;
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.12;
    }

    const scaleTarget = selected ? 1.16 + Math.sin(time * 2.5) * 0.018 : hovered ? 1.12 : 1;
    const blend = 1 - Math.exp(-delta * 7.4);
    groupRef.current.scale.lerp(
      new THREE.Vector3(scaleTarget, scaleTarget, scaleTarget),
      blend,
    );
    glowRef.current.scale.lerp(
      new THREE.Vector3(
        selected ? 1.2 : hovered ? 1.14 : 1,
        selected ? 1.2 : hovered ? 1.14 : 1,
        selected ? 1.2 : hovered ? 1.14 : 1,
      ),
      blend,
    );

    const dist = state.camera.position.distanceTo(groupRef.current.position);
    const distFactor = THREE.MathUtils.clamp((dist - 10) / 30, 0, 1);
    const baseHalo = selected ? 0.18 + Math.sin(time * 3) * 0.04 : hovered ? 0.12 : 0.05;
    const baseGlow = selected ? 0.06 : hovered ? 0.04 : 0.018;
    const targetHaloOpacity = baseHalo * (1 - distFactor * 0.4);
    const targetGlowOpacity = baseGlow * (1 - distFactor * 0.4);

    if (haloMaterialRef.current) {
      haloMaterialRef.current.opacity = THREE.MathUtils.lerp(
        haloMaterialRef.current.opacity,
        targetHaloOpacity,
        0.1,
      );
    }
    if (glowMaterialRef.current) {
      glowMaterialRef.current.opacity = THREE.MathUtils.lerp(
        glowMaterialRef.current.opacity,
        targetGlowOpacity,
        0.1,
      );
    }

    groupRef.current.getWorldPosition(worldPositionRef.current);
    onPositionUpdate(body.id, worldPositionRef.current);
  });

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        onClick={(event) => {
          event.stopPropagation();
          onSelect(body.id);
        }}
      >
        <sphereGeometry args={[body.size, 72, 72]} />
        <meshPhysicalMaterial
          map={skinMap}
          color="#ffffff"
          emissive="#000000"
          emissiveIntensity={0}
          roughness={materialProps.roughness}
          metalness={materialProps.metalness}
          clearcoat={materialProps.clearcoat}
          clearcoatRoughness={materialProps.clearcoatRoughness}
          sheen={0}
          transparent={false}
          depthWrite
        />
      </mesh>

      {body.id === "projects" ? (
        <ProjectMoons
          selectedSectionId={selectedSectionId}
          reducedMotion={reducedMotion}
          onSelect={onSelect}
          onMoonPositionUpdate={(id, v) => onPositionUpdate(id, v)}
        />
      ) : null}

      <mesh scale={1.02}>
        <sphereGeometry args={[body.size, 48, 48]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={selected ? 0.045 : hovered ? 0.03 : 0.012}
          side={THREE.BackSide}
          depthWrite={false}
          toneMapped
        />
      </mesh>

      {body.hasRing ? (
        <group ref={ringRef} rotation={[Math.PI / 2, 0.16, 0]}>
          <mesh>
            <ringGeometry args={[body.size * 1.42, body.size * 2.12, 320]} />
            <meshBasicMaterial
              color={body.ringColor ?? body.glowColor}
              transparent
              opacity={0.42}
              side={THREE.DoubleSide}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        </group>
      ) : null}

      <Billboard ref={glowRef}>
        <mesh scale={body.size * 4.2}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            ref={haloMaterialRef}
            map={haloTexture}
            transparent
            opacity={0}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      </Billboard>

      <Billboard>
        <mesh scale={body.size * 5}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            ref={glowMaterialRef}
            map={glowTexture}
            transparent
            opacity={0}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      </Billboard>

      <Html
        position={[body.size + body.lineLength, body.size * 0.55, 0]}
        distanceFactor={10}
        className="planet-label select-none pointer-events-none"
      >
        <div className="relative">
          <span
            className="absolute -left-7 top-[0.65rem] h-px w-6"
            style={{ background: `linear-gradient(90deg, ${body.glowColor}, transparent)` }}
          />
          <span className="planet-label-title text-lg">{body.name}</span>
          <span className="planet-label-subtitle text-[0.9rem]">{body.subtitle}</span>
        </div>
      </Html>
    </group>
  );
}
