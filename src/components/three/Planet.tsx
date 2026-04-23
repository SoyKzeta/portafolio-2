"use client";

import { Billboard, Html, useCursor, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

import type { SolarBody } from "@/data/planets";
import {
  createRadialTexture,
} from "@/lib/space-textures";

type PlanetProps = {
  body: SolarBody;
  selected: boolean;
  reducedMotion: boolean;
  onSelect: (id: SolarBody["id"]) => void;
  onPositionUpdate: (id: SolarBody["id"], position: THREE.Vector3) => void;
};

const TEXTURE_VERSION = "20260423-2";

export function Planet({
  body,
  selected,
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
    () => createRadialTexture("rgba(255,255,255,0.95)", `${body.glowColor}00`, 768),
    [body.glowColor],
  );
  const haloTexture = useMemo(
    () => createRadialTexture(`${body.glowColor}cc`, `${body.glowColor}00`, 768),
    [body.glowColor],
  );

  const haloMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const glowMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const { gl } = useThree();

  const textureUrl = useMemo(() => {
    switch (body.id) {
      case "about":
        return `/textures/planets/sobremi2.jpg?v=${TEXTURE_VERSION}`;
      case "flowsfy":
        return `/textures/planets/proyectos.png?v=${TEXTURE_VERSION}`;
      case "vivestone":
        return `/textures/planets/sobre-mi.png?v=${TEXTURE_VERSION}`;
      case "academic":
        return `/textures/planets/contacto.png?v=${TEXTURE_VERSION}`;
      case "skills":
        return `/textures/planets/skills.png?v=${TEXTURE_VERSION}`;
      case "contact":
        return `/textures/planets/contacto2.jpg?v=${TEXTURE_VERSION}`;
      default:
        return `/textures/planets/contacto.png?v=${TEXTURE_VERSION}`;
    }
  }, [body.id]);

  const surfaceTexture = useTexture(textureUrl);
  useMemo(() => {
    surfaceTexture.colorSpace = THREE.SRGBColorSpace;
    surfaceTexture.wrapS = THREE.RepeatWrapping;
    surfaceTexture.wrapT = THREE.ClampToEdgeWrapping;
    surfaceTexture.anisotropy = gl.capabilities.getMaxAnisotropy();
    surfaceTexture.minFilter = THREE.LinearMipmapLinearFilter;
    surfaceTexture.magFilter = THREE.LinearFilter;
    surfaceTexture.needsUpdate = true;
  }, [gl, surfaceTexture]);

  const ringTexture = useTexture("/textures/8k_saturn_ring_alpha.png");
  useMemo(() => {
    ringTexture.colorSpace = THREE.SRGBColorSpace;
    ringTexture.wrapS = THREE.ClampToEdgeWrapping;
    ringTexture.wrapT = THREE.ClampToEdgeWrapping;
    ringTexture.needsUpdate = true;
  }, [ringTexture]);

  const materialProps = useMemo(() => {
    switch (body.id) {
      case "flowsfy":
        return {
          roughness: 0.85,
          metalness: 0.05,
          clearcoat: 0.0,
          clearcoatRoughness: 0.5,
          emissiveIntensity: selected ? 2.0 : hovered ? 1.5 : 0.8,
        };
      case "about":
        return {
          roughness: 0.3,
          metalness: 0.15,
          clearcoat: 0.5,
          clearcoatRoughness: 0.2,
          emissiveIntensity: selected ? 0.6 : hovered ? 0.4 : 0.15,
        };
      case "vivestone":
        return {
          roughness: 0.4,
          metalness: 0.1,
          clearcoat: 0.3,
          clearcoatRoughness: 0.3,
          emissiveIntensity: selected ? 0.8 : hovered ? 0.5 : 0.2,
        };
      case "skills":
        return {
          roughness: 0.7,
          metalness: 0.0,
          clearcoat: 0.1,
          clearcoatRoughness: 0.4,
          emissiveIntensity: selected ? 0.8 : hovered ? 0.5 : 0.2,
        };
      case "contact":
      case "academic":
      default:
        return {
          roughness: 0.6,
          metalness: 0.1,
          clearcoat: 0.1,
          clearcoatRoughness: 0.35,
          emissiveIntensity: selected ? 0.7 : hovered ? 0.4 : 0.2,
        };
    }
  }, [body.id, selected, hovered]);

  useCursor(hovered);

  useFrame((state, delta) => {
    if (!groupRef.current || !meshRef.current || !glowRef.current) {
      return;
    }

    const time = reducedMotion ? 0 : state.clock.elapsedTime;
    // Slow down the orbit speed significantly for a cinematic feel
    const angle = body.initialAngle + time * body.orbitSpeed * 0.35;
    const radius = body.orbitRadius;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    
    // Smoother, slower vertical bobbing
    const y = Math.sin(time * 0.12 + body.initialAngle) * body.verticalRange * 0.6;

    groupRef.current.position.set(x, y, z);
    
    // Slower, more deliberate self-rotation
    meshRef.current.rotation.y += delta * (0.04 + body.size * 0.015);
    meshRef.current.rotation.x = Math.sin(time * 0.1 + body.initialAngle) * 0.05;
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.12;
    }

    const scaleTarget = selected ? 1.18 + Math.sin(time * 2.5) * 0.02 : hovered ? 1.14 : 1;
    const blend = 1 - Math.exp(-delta * 7.4);
    groupRef.current.scale.lerp(
      new THREE.Vector3(scaleTarget, scaleTarget, scaleTarget),
      blend,
    );
    glowRef.current.scale.lerp(
      new THREE.Vector3(
        selected ? 1.25 : hovered ? 1.18 : 1,
        selected ? 1.25 : hovered ? 1.18 : 1,
        selected ? 1.25 : hovered ? 1.18 : 1,
      ),
      blend,
    );

    // Distance-based glow variation and pulsing
    const dist = state.camera.position.distanceTo(groupRef.current.position);
    const distFactor = THREE.MathUtils.clamp((dist - 10) / 30, 0, 1);
    
    const baseHalo = selected ? 0.55 + Math.sin(time * 3) * 0.1 : hovered ? 0.45 : 0.18;
    const baseGlow = selected ? 0.18 : hovered ? 0.1 : 0.05;
    
    // Attenuate by distance (further = softer/more transparent)
    const targetHaloOpacity = baseHalo * (1 - distFactor * 0.4);
    const targetGlowOpacity = baseGlow * (1 - distFactor * 0.4);

    if (haloMaterialRef.current) {
      haloMaterialRef.current.opacity = THREE.MathUtils.lerp(haloMaterialRef.current.opacity, targetHaloOpacity, 0.1);
    }
    if (glowMaterialRef.current) {
      glowMaterialRef.current.opacity = THREE.MathUtils.lerp(glowMaterialRef.current.opacity, targetGlowOpacity, 0.1);
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
          map={surfaceTexture}
          color="#ffffff"
          emissiveMap={surfaceTexture}
          emissive={body.emissiveColor}
          emissiveIntensity={materialProps.emissiveIntensity}
          roughness={materialProps.roughness}
          metalness={materialProps.metalness}
          clearcoat={materialProps.clearcoat}
          clearcoatRoughness={materialProps.clearcoatRoughness}
          sheen={0.32}
          sheenColor={new THREE.Color(body.glowColor)}
          transparent={false}
          depthWrite={true}
        />
      </mesh>

      <mesh scale={1.04}>
        <sphereGeometry args={[body.size, 48, 48]} />
        <meshBasicMaterial
          color={body.glowColor}
          transparent
          opacity={selected ? 0.12 : hovered ? 0.08 : 0.03}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      <mesh scale={1.09}>
        <sphereGeometry args={[body.size, 48, 48]} />
        <meshBasicMaterial
          color={body.glowColor}
          transparent
          opacity={selected ? 0.08 : hovered ? 0.05 : 0.015}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {body.hasRing && ringTexture ? (
        <group ref={ringRef} rotation={[Math.PI / 2, 0.16, 0]}>
          <mesh>
            <ringGeometry args={[body.size * 1.42, body.size * 2.12, 320]} />
            <meshBasicMaterial
              map={ringTexture}
              color="#ffffff"
              transparent
              opacity={0.95}
              alphaTest={0.02}
              side={THREE.DoubleSide}
              blending={THREE.NormalBlending}
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
