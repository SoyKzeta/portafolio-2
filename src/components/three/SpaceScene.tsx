"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import {
  Bloom,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import * as THREE from "three";
import type CameraControlsImpl from "camera-controls";

import { CameraRig } from "@/components/three/CameraRig";
import { SolarSystem } from "@/components/three/SolarSystem";
import type { SectionId } from "@/data/planets";

type SpaceSceneProps = {
  selectedId: SectionId;
  resetToken: number;
  reducedMotion: boolean;
  onSelect: (id: SectionId) => void;
};

export function SpaceScene({
  selectedId,
  resetToken,
  reducedMotion,
  onSelect,
}: SpaceSceneProps) {
  const controlsRef = useRef<CameraControlsImpl | null>(null);
  const bodyPositions = useRef<Record<string, THREE.Vector3>>({});
  const dpr = useMemo(() => [1, 1.8] as [number, number], []);

  return (
    <div className="absolute inset-0 z-10">
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/fondo/8k_stars_milky_way.jpg')" }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.34) 78%, rgba(0,0,0,0.5) 100%)",
        }}
      />
      <Canvas
        dpr={dpr}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [-8.5, 8.6, 29.4], fov: 35, near: 0.1, far: 180 }}
        onPointerMissed={() => onSelect("system")}
      >
        <Suspense fallback={null}>
          <fog attach="fog" args={["#010204", 20, 110]} />

          <ambientLight intensity={0.06} color="#304070" />
          <hemisphereLight intensity={0.1} color="#203050" groundColor="#010204" />
          <directionalLight position={[-28, 18, -18]} intensity={0.3} color="#7090ff" />
          <pointLight position={[0, 0, 0]} intensity={480} distance={120} color="#ff9933" />
          <pointLight position={[14, 8, 26]} intensity={14} distance={86} color="#4060ff" />
          <pointLight position={[-22, -3, 18]} intensity={10} distance={70} color="#10c0a0" />
          <pointLight position={[10, -15, -25]} intensity={18} distance={90} color="#8a2be2" />

          <CameraControls
            ref={controlsRef}
            makeDefault
            minDistance={6}
            maxDistance={58}
            truckSpeed={0.6}
            dollySpeed={0.7}
            azimuthRotateSpeed={0.62}
            polarRotateSpeed={0.52}
            minPolarAngle={Math.PI / 8}
            maxPolarAngle={Math.PI / 1.12}
            smoothTime={1}
            draggingSmoothTime={0.12}
          />

          <CameraRig
            controlsRef={controlsRef}
            bodyPositions={bodyPositions}
            selectedId={selectedId}
            resetToken={resetToken}
          />

          <SolarSystem
            selectedId={selectedId}
            reducedMotion={reducedMotion}
            onSelect={onSelect}
            onPositionUpdate={(id, position) => {
              const stored = bodyPositions.current[id] ?? new THREE.Vector3();
              stored.copy(position);
              bodyPositions.current[id] = stored;
            }}
          />

          <EffectComposer multisampling={0}>
            <Bloom
              intensity={1.35}
              mipmapBlur
              luminanceThreshold={0.45}
              luminanceSmoothing={0.18}
              radius={0.65}
            />
            <Vignette eskil={false} offset={0.2} darkness={0.72} />
            <Noise opacity={0.012} premultiply />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
