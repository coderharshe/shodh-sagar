"use client";

import { Canvas } from "@react-three/fiber";
import AcademicObjects from "./AcademicObjects";
import { Suspense } from "react";

export default function Scene() {
  return (
    <div className="fixed inset-0 -z-10 w-full h-screen bg-brand-navy">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 45 }}
        dpr={[1, 2]} // Cap DPR to 2 for performance, but don't drop to 0
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={["#0B666A"]} />
          
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#D4AF37" />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ffffff" />
          
          {/* Forced High-End Crazy 3D element */}
          <AcademicObjects />
          
        </Suspense>
      </Canvas>
    </div>
  );
}
