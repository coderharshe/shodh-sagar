"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function OceanParticles({ count = 5000 }: { count?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  
  // Pre-compute positions and colors
  const { positions, colors, randoms } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const randoms = new Float32Array(count);
    
    const color = new THREE.Color();
    const baseColor = new THREE.Color("#0A192F");
    const highlightColor = new THREE.Color("#D4AF37");

    for (let i = 0; i < count; i++) {
      // Spread particles across a wide "ocean" surface
      const x = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 40;
      const y = (Math.random() - 0.5) * 2; // slight vertical variation

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      randoms[i] = Math.random();

      // Mostly deep blue, occasionally gold
      const mixRatio = Math.random() > 0.95 ? 1 : Math.random() * 0.2;
      color.lerpColors(baseColor, highlightColor, mixRatio);
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, colors, randoms };
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const x = positions[i * 3];
      const z = positions[i * 3 + 2];
      
      // Animate y position using sine waves for ocean-like effect
      const y = positions[i * 3 + 1] + Math.sin(time * 0.5 + x * 0.5) * Math.cos(time * 0.3 + z * 0.5) * 0.5;

      dummy.position.set(x, y, z);
      
      // Rotate slightly
      dummy.rotation.x = time * randoms[i] * 0.5;
      dummy.rotation.y = time * randoms[i] * 0.5;
      
      const scale = 0.05 + Math.sin(time * randoms[i] * 2) * 0.02;
      dummy.scale.set(scale, scale, scale);

      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    
    mesh.current.instanceMatrix.needsUpdate = true;
    
    // Slowly rotate the entire system
    mesh.current.rotation.y = time * 0.02;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <octahedronGeometry args={[1, 0]}>
        <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
      </octahedronGeometry>
      <meshStandardMaterial 
        vertexColors 
        roughness={0.2} 
        metalness={0.8}
        envMapIntensity={1}
      />
    </instancedMesh>
  );
}
