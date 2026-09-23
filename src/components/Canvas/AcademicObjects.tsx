"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function AcademicObjects() {
  const booksRef = useRef<THREE.InstancedMesh>(null);
  const papersRef = useRef<THREE.InstancedMesh>(null);
  
  const bookCount = 200;
  const paperCount = 300;

  // Generate random positions and rotations for books
  const booksData = useMemo(() => {
    const data = [];
    for (let i = 0; i < bookCount; i++) {
      data.push({
        x: (Math.random() - 0.5) * 40,
        y: (Math.random() - 0.5) * 60,
        z: (Math.random() - 0.5) * 40,
        rx: Math.random() * Math.PI,
        ry: Math.random() * Math.PI,
        rz: Math.random() * Math.PI,
        scale: 0.5 + Math.random() * 0.8,
        speed: 0.2 + Math.random() * 0.5,
      });
    }
    return data;
  }, []);

  // Generate random positions and rotations for papers
  const papersData = useMemo(() => {
    const data = [];
    for (let i = 0; i < paperCount; i++) {
      data.push({
        x: (Math.random() - 0.5) * 40,
        y: (Math.random() - 0.5) * 60,
        z: (Math.random() - 0.5) * 40,
        rx: Math.random() * Math.PI,
        ry: Math.random() * Math.PI,
        rz: Math.random() * Math.PI,
        scale: 0.5 + Math.random() * 0.5,
        speed: 0.5 + Math.random() * 1.5,
      });
    }
    return data;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Animate Books
    if (booksRef.current) {
      booksData.forEach((data, i) => {
        // Floating upwards and swirling
        const newY = data.y + time * data.speed;
        // Wrap around vertically
        const wrappedY = ((newY + 30) % 60) - 30;
        
        const waveX = Math.sin(time * 0.5 + data.y) * 2;
        const waveZ = Math.cos(time * 0.5 + data.x) * 2;

        dummy.position.set(data.x + waveX, wrappedY, data.z + waveZ);
        dummy.rotation.set(
          data.rx + time * 0.2, 
          data.ry + time * 0.3, 
          data.rz + time * 0.1
        );
        dummy.scale.set(data.scale, data.scale, data.scale);
        dummy.updateMatrix();
        booksRef.current!.setMatrixAt(i, dummy.matrix);
      });
      booksRef.current.instanceMatrix.needsUpdate = true;
    }

    // Animate Papers
    if (papersRef.current) {
      papersData.forEach((data, i) => {
        // Papers float faster and flutter more
        const newY = data.y + time * data.speed;
        const wrappedY = ((newY + 30) % 60) - 30;
        
        const flutterX = Math.sin(time * 2 + data.z) * 3;
        const flutterZ = Math.cos(time * 1.5 + data.x) * 3;

        dummy.position.set(data.x + flutterX, wrappedY, data.z + flutterZ);
        dummy.rotation.set(
          data.rx + time * 0.8, 
          data.ry + Math.sin(time * 2) * 0.5, 
          data.rz + time * 0.5
        );
        dummy.scale.set(data.scale, data.scale, data.scale);
        dummy.updateMatrix();
        papersRef.current!.setMatrixAt(i, dummy.matrix);
      });
      papersRef.current.instanceMatrix.needsUpdate = true;
    }
    
    // Slight camera interaction
    if (booksRef.current && papersRef.current) {
      const mx = (state.pointer.x * Math.PI) / 10;
      const my = (state.pointer.y * Math.PI) / 10;
      
      booksRef.current.rotation.y = THREE.MathUtils.lerp(booksRef.current.rotation.y, mx, 0.05);
      booksRef.current.rotation.x = THREE.MathUtils.lerp(booksRef.current.rotation.x, -my, 0.05);
      
      papersRef.current.rotation.y = THREE.MathUtils.lerp(papersRef.current.rotation.y, mx * 1.2, 0.05);
      papersRef.current.rotation.x = THREE.MathUtils.lerp(papersRef.current.rotation.x, -my * 1.2, 0.05);
    }
  });

  return (
    <group>
      {/* 3D Books */}
      <instancedMesh ref={booksRef} args={[undefined, undefined, bookCount]}>
        <boxGeometry args={[1.5, 2, 0.3]} />
        <meshStandardMaterial color="#0B666A" roughness={0.2} metalness={0.5} />
      </instancedMesh>

      {/* 3D Papers / Manuscripts */}
      <instancedMesh ref={papersRef} args={[undefined, undefined, paperCount]}>
        <boxGeometry args={[1.2, 1.7, 0.02]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.4} metalness={0.8} />
      </instancedMesh>
      
      {/* Add golden trim to books */}
      <instancedMesh args={[undefined, undefined, bookCount]} ref={(mesh) => {
        // Sync dummy mesh for trim
        if (mesh && booksRef.current) {
            mesh.instanceMatrix = booksRef.current.instanceMatrix;
        }
      }}>
        <boxGeometry args={[1.52, 2.02, 0.25]} />
        <meshBasicMaterial color="#D4AF37" wireframe={true} />
      </instancedMesh>
    </group>
  );
}
