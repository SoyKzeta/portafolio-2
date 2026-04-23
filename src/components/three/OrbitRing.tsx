"use client";

import { useMemo } from "react";
import { Line } from "@react-three/drei";
import * as THREE from "three";

type OrbitRingProps = {
  radius: number;
  color: string;
};

export function OrbitRing({ radius, color }: OrbitRingProps) {
  const points = useMemo(() => {
    const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, Math.PI * 2, false, 0);
    return curve
      .getPoints(220)
      .map((point) => new THREE.Vector3(point.x, 0, point.y));
  }, [radius]);

  return (
    <group>
      <Line
        points={points}
        color={color}
        transparent
        opacity={0.22}
        lineWidth={0.65}
      />
      <Line
        points={points}
        color="#ffffff"
        transparent
        opacity={0.035}
        lineWidth={0.22}
      />
    </group>
  );
}
