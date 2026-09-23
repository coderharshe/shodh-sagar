"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { MotionValue } from "framer-motion";

// --- Generate page texture with text painted onto a canvas ---
function createPageTexture(
  side: "left" | "right",
  width = 1024,
  height = 1400
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;

  // Warm paper background
  const bg = ctx.createLinearGradient(0, 0, width, height);
  bg.addColorStop(0, "#fffef8");
  bg.addColorStop(1, "#f8f4e8");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  // Subtle page lines
  ctx.strokeStyle = "rgba(0,91,92,0.06)";
  ctx.lineWidth = 1;
  for (let y = 140; y < height - 80; y += 52) {
    ctx.beginPath();
    ctx.moveTo(60, y);
    ctx.lineTo(width - 60, y);
    ctx.stroke();
  }

  // Inner crease shadow for realistic book spine depth
  const creaseGradient = side === "left" 
    ? ctx.createLinearGradient(width - 140, 0, width, 0)
    : ctx.createLinearGradient(0, 0, 140, 0);
  
  if (side === "left") {
    creaseGradient.addColorStop(0, "rgba(0,0,0,0)");
    creaseGradient.addColorStop(1, "rgba(10, 20, 20, 0.18)"); // darker at the right edge (spine)
    ctx.fillStyle = creaseGradient;
    ctx.fillRect(width - 140, 0, 140, height);
  } else {
    creaseGradient.addColorStop(0, "rgba(10, 20, 20, 0.18)"); // darker at the left edge (spine)
    creaseGradient.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = creaseGradient;
    ctx.fillRect(0, 0, 140, height);
  }

  // Left margin line for right page
  if (side === "right") {
    ctx.strokeStyle = "rgba(197,152,47,0.25)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(100, 60);
    ctx.lineTo(100, height - 60);
    ctx.stroke();
  }

  ctx.fillStyle = "#005b5c";
  ctx.font = "bold 28px Georgia, serif";
  ctx.letterSpacing = "4px";

  if (side === "left") {
    // Left page: Title page style
    ctx.fillStyle = "rgba(0,91,92,0.15)";
    ctx.fillRect(60, 60, width - 120, 6);

    ctx.fillStyle = "#005b5c";
    ctx.font = "bold 32px Arial, sans-serif";
    ctx.letterSpacing = "6px";
    ctx.fillText("SHODH SAGAR", 60, 130);

    ctx.fillStyle = "#c5982f";
    ctx.fillRect(60, 155, 120, 3);

    ctx.fillStyle = "#223534";
    ctx.font = "italic bold 90px Georgia, serif";
    ctx.letterSpacing = "0px";
    const lines = ["Welcome", "to"];
    lines.forEach((line, i) => {
      ctx.fillText(line, 60, 280 + i * 100);
    });

    ctx.fillStyle = "#005b5c";
    ctx.font = "bold 90px Georgia, serif";
    ctx.fillText("Shodh", 60, 480);
    ctx.fillText("Sagar", 60, 580);

    ctx.fillStyle = "rgba(197,152,47,0.3)";
    ctx.fillRect(60, 610, width - 120, 2);

    ctx.fillStyle = "#667573";
    ctx.font = "24px Arial, sans-serif";
    ctx.letterSpacing = "2px";
    const tagline = "Ocean of Research";
    ctx.fillText(tagline, 60, 670);

    ctx.fillStyle = "#223534";
    ctx.font = "30px Arial, sans-serif";
    ctx.letterSpacing = "0px";
    const bodyLines = [
      "A multidisciplinary academic",
      "platform dedicated to fostering",
      "research, critical inquiry, and",
      "meaningful intellectual exchange",
      "across diverse fields.",
    ];
    bodyLines.forEach((line, i) => {
      ctx.fillText(line, 60, 750 + i * 46);
    });

    // Bottom decoration
    ctx.fillStyle = "rgba(0,91,92,0.1)";
    ctx.fillRect(60, height - 120, width - 120, 2);

    ctx.fillStyle = "#c5982f";
    ctx.font = "bold 14px Arial, sans-serif";
    ctx.letterSpacing = "3px";
    ctx.fillText("ESTABLISHED 2010", 60, height - 80);

    ctx.fillStyle = "#005b5c";
    ctx.font = "14px Arial";
    ctx.letterSpacing = "0px";
    ctx.fillText("www.shodhsagar.org", 60, height - 50);

  } else {
    // Right page: About content
    ctx.fillStyle = "#005b5c";
    ctx.font = "bold 24px Arial, sans-serif";
    ctx.letterSpacing = "4px";
    ctx.fillText("ABOUT US", 130, 100);

    ctx.fillStyle = "#c5982f";
    ctx.fillRect(130, 118, 80, 3);

    ctx.fillStyle = "#223534";
    ctx.font = "bold 52px Georgia, serif";
    ctx.letterSpacing = "0px";
    ctx.fillText("A Trusted Home", 130, 210);
    ctx.fillText("for Rigorous", 130, 280);
    ctx.fillStyle = "#005b5c";
    ctx.fillText("Inquiry.", 130, 350);

    ctx.fillStyle = "#667573";
    ctx.font = "34px Arial, sans-serif";
    const aboutLines = [
      "Based in India, Shodh Sagar curates",
      "international research journals and",
      "creates a credible platform for",
      "researchers, academics, educators",
      "and practitioners worldwide.",
      "",
      "We champion academic integrity,",
      "thoughtful peer review, and open",
      "access to knowledge.",
    ];
    aboutLines.forEach((line, i) => {
      ctx.fillText(line, 130, 440 + i * 54);
    });

    // Stats
    ctx.fillStyle = "rgba(0,91,92,0.12)";
    ctx.fillRect(130, 820, width - 180, 1);

    const stats = [
      { val: "25+", label: "Journals" },
      { val: "70+", label: "Projects" },
      { val: "350+", label: "Researchers" },
    ];
    stats.forEach((s, i) => {
      const x = 130 + i * 260;
      ctx.fillStyle = "#005b5c";
      ctx.font = "bold 56px Georgia, serif";
      ctx.fillText(s.val, x, 910);
      ctx.fillStyle = "#667573";
      ctx.font = "20px Arial";
      ctx.letterSpacing = "2px";
      ctx.fillText(s.label.toUpperCase(), x, 950);
    });

    // CTA arrow
    ctx.fillStyle = "#005b5c";
    ctx.font = "bold 24px Arial";
    ctx.letterSpacing = "0px";
    ctx.fillText("Explore our Journals →", 130, height - 80);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 16;
  return tex;
}

// --- Generate premium dark cover texture ---
function createCoverTexture(width = 1024, height = 1400): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;

  // Deep green gradient
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, "#003f40");
  grad.addColorStop(0.5, "#005b5c");
  grad.addColorStop(1, "#002e2f");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Subtle texture pattern
  ctx.strokeStyle = "rgba(255,255,255,0.03)";
  ctx.lineWidth = 1;
  for (let y = 0; y < height; y += 30) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Gold border frame
  const margin = 40;
  ctx.strokeStyle = "rgba(197,152,47,0.6)";
  ctx.lineWidth = 2;
  ctx.strokeRect(margin, margin, width - margin * 2, height - margin * 2);

  // Inner thin border
  ctx.strokeStyle = "rgba(197,152,47,0.25)";
  ctx.lineWidth = 1;
  ctx.strokeRect(margin + 12, margin + 12, width - (margin + 12) * 2, height - (margin + 12) * 2);

  // Title at top
  ctx.fillStyle = "rgba(197,152,47,0.9)";
  ctx.font = "bold 32px Arial, sans-serif";
  ctx.letterSpacing = "8px";
  ctx.textAlign = "center";
  ctx.fillText("SHODH SAGAR", width / 2, 200);

  // Gold divider line
  ctx.fillStyle = "rgba(197,152,47,0.5)";
  ctx.fillRect(margin + 40, 225, width - (margin + 40) * 2, 1);

  // Large decorative text
  ctx.fillStyle = "rgba(255,255,255,0.92)";
  ctx.font = "bold italic 100px Georgia, serif";
  ctx.letterSpacing = "-2px";
  ctx.fillText("Ocean", width / 2, 500);

  ctx.fillStyle = "rgba(197,152,47,0.85)";
  ctx.font = "bold 36px Georgia, serif";
  ctx.letterSpacing = "4px";
  ctx.fillText("OF RESEARCH", width / 2, 570);

  // Decorative ornament
  ctx.fillStyle = "rgba(197,152,47,0.4)";
  ctx.font = "80px serif";
  ctx.letterSpacing = "0px";
  ctx.fillText("❧", width / 2, 700);

  // Tagline
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.font = "22px Arial";
  ctx.letterSpacing = "3px";
  ctx.fillText("Advancing Knowledge Since 2010", width / 2, 820);

  // Bottom
  ctx.fillStyle = "rgba(197,152,47,0.5)";
  ctx.fillRect(margin + 40, height - 250, width - (margin + 40) * 2, 1);

  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.font = "20px Arial";
  ctx.letterSpacing = "2px";
  ctx.fillText("www.shodhsagar.org", width / 2, height - 180);

  ctx.fillStyle = "rgba(197,152,47,0.6)";
  ctx.font = "bold 20px Arial";
  ctx.letterSpacing = "6px";
  ctx.fillText("RESEARCH · INTEGRITY · KNOWLEDGE", width / 2, height - 120);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 16;
  return tex;
}

function BookModel({ progress }: { progress: MotionValue<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const frontCoverGroupRef = useRef<THREE.Group>(null);
  const floatRef = useRef(0);

  // Book dimensions (realistic proportions)
  const W = 2.8;  // width
  const H = 4.0;  // height
  const D = 0.55; // depth (thickness)
  const CT = 0.06; // cover thickness

  // Create all textures from canvas
  const coverTexture = useMemo(() => {
    if (typeof window === "undefined") return null;
    return createCoverTexture();
  }, []);

  const leftPageTexture = useMemo(() => {
    if (typeof window === "undefined") return null;
    return createPageTexture("left");
  }, []);

  const rightPageTexture = useMemo(() => {
    if (typeof window === "undefined") return null;
    return createPageTexture("right");
  }, []);

  // Materials
  const spineAndEdgeMat = useMemo(() =>
    new THREE.MeshStandardMaterial({ color: "#002e2f", roughness: 0.6, metalness: 0.05 }), []);

  const coverMat = useMemo(() => coverTexture ? new THREE.MeshStandardMaterial({
    map: coverTexture, roughness: 0.4, metalness: 0.1
  }) : new THREE.MeshStandardMaterial({ color: "#003f40" }), [coverTexture]);

  const insideCoverMat = useMemo(() =>
    new THREE.MeshStandardMaterial({ color: "#f0ece0", roughness: 0.9 }), []);

  const pageBodyMat = useMemo(() =>
    new THREE.MeshStandardMaterial({ color: "#faf8f0", roughness: 0.95 }), []);

  // Per-face materials for pages block
  const pagesBlockMaterials = useMemo(() => [
    // right side (fore-edge): slightly cream with line hints
    new THREE.MeshStandardMaterial({ color: "#f0ece0", roughness: 0.95 }),
    // left side (spine side)
    spineAndEdgeMat,
    // top
    new THREE.MeshStandardMaterial({ color: "#edeae0", roughness: 0.95 }),
    // bottom
    new THREE.MeshStandardMaterial({ color: "#edeae0", roughness: 0.95 }),
    // front face (right open page)
    rightPageTexture ? new THREE.MeshStandardMaterial({ map: rightPageTexture, roughness: 0.9 }) : pageBodyMat,
    // back face
    pageBodyMat,
  ], [rightPageTexture, spineAndEdgeMat, pageBodyMat]);

  // Per-face materials for the front cover
  const frontCoverMaterials = useMemo(() => [
    spineAndEdgeMat, // left edge
    spineAndEdgeMat, // right edge
    spineAndEdgeMat, // top
    spineAndEdgeMat, // bottom
    // front face (outside cover)
    coverMat,
    // back face (inside cover, left page)
    leftPageTexture ? new THREE.MeshStandardMaterial({ map: leftPageTexture, roughness: 0.9 }) : insideCoverMat,
  ], [coverMat, leftPageTexture, spineAndEdgeMat, insideCoverMat]);

  useFrame((state) => {
    if (!groupRef.current || !frontCoverGroupRef.current) return;
    floatRef.current = state.clock.getElapsedTime();

    const p = Math.max(0, Math.min(1, progress.get()));

    // Ease function: cubic ease-out
    const eased = (t: number) => 1 - Math.pow(1 - Math.max(0, Math.min(1, t)), 3);

    // Gentle idle float when closed — diminishes as book opens
    const openAmount = eased(p);
    const floatY = Math.sin(floatRef.current * 0.8) * 0.04 * (1 - openAmount);
    groupRef.current.position.y = floatY;

    // Position: starts naturally centered with a slight angle, settles to perfect center as book opens
    groupRef.current.position.x = THREE.MathUtils.lerp(0.6, 0.2, eased(p));
    groupRef.current.position.z = THREE.MathUtils.lerp(-0.4, 1.6, eased(p));

    // Rotation: initial perspective tilt → flat forward-facing
    groupRef.current.rotation.y = THREE.MathUtils.lerp(-Math.PI / 6, 0.02, eased(p));
    groupRef.current.rotation.x = THREE.MathUtils.lerp(0.12, 0.02, eased(p));

    // Cover hinge: smoothly opens full range as progress goes 0 -> 1
    const coverT = eased(p);
    frontCoverGroupRef.current.rotation.y = THREE.MathUtils.lerp(0, -Math.PI * 0.97, coverT);
  });

  return (
    <group ref={groupRef}>
      {/* === BACK COVER === */}
      <mesh position={[0, 0, -D / 2]} castShadow receiveShadow material={coverMat}>
        <boxGeometry args={[W, H, CT]} />
      </mesh>

      {/* === SPINE === */}
      <mesh position={[-W / 2 - CT / 2, 0, 0]} castShadow receiveShadow material={spineAndEdgeMat}>
        <boxGeometry args={[CT, H, D]} />
      </mesh>

      {/* === PAGES BLOCK (visible right page when open) === */}
      <mesh position={[CT / 2, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[W - CT, H - 0.15, D - CT * 2]} />
        {pagesBlockMaterials.map((mat, i) => (
          <primitive key={i} object={mat} attach={`material-${i}`} />
        ))}
      </mesh>

      {/* === FRONT COVER (hinged) === */}
      {/* Pivot is at spine edge (left side of cover) */}
      <group ref={frontCoverGroupRef} position={[-W / 2, 0, D / 2]}>
        <mesh position={[W / 2, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[W, H, CT]} />
          {frontCoverMaterials.map((mat, i) => (
            <primitive key={i} object={mat} attach={`material-${i}`} />
          ))}
        </mesh>
      </group>
    </group>
  );
}

export default function HeroBook({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="absolute inset-0 z-0" style={{ pointerEvents: "none" }}>
      <Canvas
        shadows
        camera={{ position: [0, 0.5, 9], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        {/* Lighting rig for premium look */}
        <ambientLight intensity={0.4} />
        {/* Key light from upper-left */}
        <directionalLight
          position={[-4, 8, 6]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[2048, 2048]}
          color="#fff8f0"
          shadow-bias={-0.0001}
        />
        {/* Fill light from right */}
        <directionalLight position={[6, 2, 4]} intensity={0.6} color="#c8e8e8" />
        {/* Rim light from behind */}
        <directionalLight position={[0, -2, -6]} intensity={0.3} color="#ffffff" />
        {/* Gold accent point light */}
        <pointLight position={[2, 3, 5]} intensity={0.5} color="#c5982f" distance={10} />

        <ContactShadows
          position={[0, -2.5, 0]}
          opacity={0.4}
          scale={8}
          blur={2}
          far={5}
          color="#001a1a"
        />

        <Environment preset="city" />

        <BookModel progress={progress} />
      </Canvas>
    </div>
  );
}
