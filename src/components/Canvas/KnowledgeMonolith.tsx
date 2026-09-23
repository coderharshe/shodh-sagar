"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function KnowledgeMonolith({ performanceTier }: { performanceTier: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  // High count to make sure the background is full and crazy
  const count = 3000;

  const { positions, randoms } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Create a massive dual-vortex structure
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const radius = 8 + Math.random() * 8; // Larger radius to fill the screen
      
      positions[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40; // Spread vertically across the scrolling page
      positions[i * 3 + 2] = radius * Math.sin(theta) * Math.sin(phi);

      randoms[i] = Math.random();
    }

    return { positions, randoms };
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const x = positions[i * 3];
      const y = positions[i * 3 + 1];
      const z = positions[i * 3 + 2];

      // Crazy swirling motion
      const animatedX = x * Math.cos(time * 0.1) - z * Math.sin(time * 0.1);
      const animatedZ = x * Math.sin(time * 0.1) + z * Math.cos(time * 0.1);
      
      const wave = Math.sin(time + y * 0.1) * 2;

      dummy.position.set(animatedX, y + wave, animatedZ);
      
      dummy.rotation.x = time * randoms[i] * 2;
      dummy.rotation.y = time * randoms[i] * 2;
      
      // Pulse size - make them significantly larger than before
      const scale = 0.15 + Math.sin(time * 3 * randoms[i]) * 0.08;
      dummy.scale.set(scale, scale, scale);

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;
    
    // Rotate entire vortex based on mouse for interaction
    const mx = (state.pointer.x * Math.PI) / 4;
    const my = (state.pointer.y * Math.PI) / 4;
    
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, time * 0.05 + mx, 0.05);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -my, 0.05);
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      {/* OctahedronGeometry gives a cool diamond shape */}
      <octahedronGeometry args={[1, 0]} />
      {/* Basic material is incredibly fast to render, preventing lag, wireframe makes it look techy */}
      <meshBasicMaterial color="#D4AF37" wireframe={true} />
    </instancedMesh>
  );
}
