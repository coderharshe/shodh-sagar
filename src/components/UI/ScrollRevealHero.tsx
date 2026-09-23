"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView, animate } from "framer-motion";
import HeroBook from "@/components/Canvas/HeroBook";
import Image from "next/image";

// ── Count-up hook ─────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1.6, inView = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.floor(v)),
    });
    return controls.stop;
  }, [inView, target, duration]);
  return value;
}

// ── Stat card item ────────────────────────────────────────────────────────────
function StatItem({
  target,
  suffix,
  label,
  inView,
  delay,
}: {
  target: number;
  suffix: string;
  label: string;
  inView: boolean;
  delay: number;
}) {
  const count = useCountUp(target, 1.4, inView);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center"
    >
      <span className="text-3xl md:text-4xl font-serif font-bold text-[#005b5c] leading-none">
        {count}{suffix}
      </span>
      <span className="mt-1 text-[9px] md:text-[10px] font-sans font-bold uppercase tracking-wider text-[#c5982f]">
        {label}
      </span>
    </motion.div>
  );
}

// ── Image mosaic tiles ────────────────────────────────────────────────────────
const mosaicImages = [
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    alt: "University library with tall bookshelves",
  },
  {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
    alt: "Researchers collaborating on a project",
  },
  {
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
    alt: "Academic conference lecture hall",
  },
  {
    src: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop",
    alt: "Open research journals and books",
  },
];

// ── Main Component ─────────────────────────────────────────────────────────────
export default function ScrollRevealHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-40px" });

  // Unified scroll progress tracking across the entire hero + book sequence
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 1. Hero Content animations (starts rock solid, gently fades out as book ascends)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.10, 0.24], [1, 1, 0], { clamp: true });
  const heroY       = useTransform(scrollYProgress, [0.10, 0.24], [0, -60], { clamp: true });
  const heroScale   = useTransform(scrollYProgress, [0.10, 0.24], [1, 0.96], { clamp: true });
  const heroDisplay = useTransform(scrollYProgress, (v) => (v > 0.25 ? "none" : "flex"));
  const heroPointerEvents = useTransform(scrollYProgress, (v) => (v > 0.22 ? "none" : "auto"));

  // 2. Hero Background cross-fade ("and then background hero section removed")
  const heroBgOpacity = useTransform(scrollYProgress, [0.12, 0.26], [1, 0], { clamp: true });
  const heroBgDisplay = useTransform(scrollYProgress, (v) => (v > 0.27 ? "none" : "block"));

  // 3. 3D Book entrance ("just the books came up from 2nd section")
  const bookY          = useTransform(scrollYProgress, [0.06, 0.25], ["65vh", "0vh"], { clamp: true });
  const bookOpacity    = useTransform(scrollYProgress, [0.06, 0.16], [0, 1], { clamp: true });
  const bookScale      = useTransform(scrollYProgress, [0.06, 0.25], [0.9, 1], { clamp: true });

  // 4. Book Opening: finishes at 0.92, right as the next section starts showing
  const bookOpenProgress = useTransform(scrollYProgress, [0.26, 0.92], [0, 1], { clamp: true });
  const bookExitY      = useTransform(scrollYProgress, [0.88, 1.0], [0, -40], { clamp: true });

  // Subtle parallax for mosaic images
  const mosaicY = useTransform(scrollYProgress, [0, 0.24], [0, -25], { clamp: true });

  // Scroll hints with strict clamping
  const heroHintOp = useTransform(scrollYProgress, [0, 0.06], [1, 0], { clamp: true });
  const heroHintDisplay = useTransform(scrollYProgress, (v) => (v > 0.08 ? "none" : "flex"));
  const bookHintOp = useTransform(scrollYProgress, [0.26, 0.34, 0.80, 0.88], [0, 1, 1, 0], { clamp: true });
  const bookHintDisplay = useTransform(scrollYProgress, (v) => (v < 0.24 || v > 0.90 ? "none" : "flex"));

  // Stagger timing for initial hero entrance
  const stagger = (i: number) => ({
    delay: 0.2 + i * 0.12,
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  });

  return (
    <section
      ref={containerRef}
      className="relative h-[260vh]"
      style={{ zIndex: 10 }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-brand-section">
        {/* ── Background Layer: Cream hero background that smoothly dissolves ── */}
        <motion.div
          style={{ opacity: heroBgOpacity, display: heroBgDisplay }}
          className="absolute inset-0 bg-[#fffdf7] z-0 pointer-events-none"
        />

        {/* ── 3D Book Layer: Rises up from below, centers, and hinges open ── */}
        <motion.div
          style={{
            y: bookY,
            opacity: bookOpacity,
            scale: bookScale,
          }}
          className="absolute inset-0 z-10 pointer-events-none"
        >
          <motion.div style={{ y: bookExitY }} className="w-full h-full">
            <HeroBook progress={bookOpenProgress} />
          </motion.div>
        </motion.div>

        {/* ── Hero Content Layer: Left text & Right image mosaic ── */}
        <motion.div
          style={{
            opacity: heroOpacity,
            y: heroY,
            scale: heroScale,
            display: heroDisplay,
            pointerEvents: heroPointerEvents,
          }}
          className="absolute inset-0 z-20"
        >
          {/* ── LEFT PANEL ── */}
          <div className="relative w-full md:w-[50%] flex flex-col justify-center px-8 md:px-14 lg:px-20 z-10">
            {/* Eyebrow label */}
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={stagger(0)}
              className="text-[#005b5c] font-bold uppercase tracking-[0.2em] text-[11px] md:text-xs mb-6 block font-sans"
            >
              Research that connects ideas, disciplines &amp; a changing world
            </motion.span>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={stagger(1)}
              className="text-5xl md:text-6xl lg:text-[4.5rem] font-serif text-[#223534] leading-[1.06] mb-6"
            >
              Where{" "}
              <span className="text-[#c5982f] italic">research</span>
              <br />
              meets knowledge.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={stagger(2)}
              className="text-base md:text-lg font-sans text-[#667573] leading-relaxed max-w-md mb-10"
            >
              A multidisciplinary academic platform for original studies,
              critical inquiry and meaningful intellectual exchange across
              diverse fields.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={stagger(3)}
              className="flex flex-wrap gap-3"
            >
              <motion.a
                href="/journals"
                whileHover={{ scale: 1.03, boxShadow: "0 8px 28px rgba(0,91,92,0.28)" }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-3.5 bg-[#005b5c] text-white rounded-full font-sans font-medium text-[15px] shadow-md transition-colors hover:bg-[#003f40]"
              >
                Explore Journals →
              </motion.a>
              <motion.a
                href="#services"
                whileHover={{ scale: 1.03, borderColor: "#005b5c", color: "#005b5c" }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-3.5 bg-white border border-[#d9d6c9] text-[#223534] rounded-full font-sans font-medium text-[15px] shadow-sm transition-all"
              >
                About Us
              </motion.a>
            </motion.div>

            {/* Gold accent rule */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.9, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ originX: 0 }}
              className="absolute bottom-10 left-8 md:left-14 lg:left-20 w-16 h-[2px] bg-[#c5982f] rounded-full"
            />
          </div>

          {/* ── RIGHT PANEL — Image Mosaic ── */}
          <div className="hidden md:flex relative w-[50%] h-full items-center justify-center px-8 py-12">
            <motion.div
              style={{ y: mosaicY }}
              className="relative w-full max-w-[460px] h-[400px] grid grid-cols-2 grid-rows-2 gap-2 rounded-2xl overflow-hidden shadow-[0_16px_60px_rgba(0,0,0,0.10)]"
            >
              {mosaicImages.map((img, i) => (
                <motion.div
                  key={img.alt}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="relative overflow-hidden"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 0px, 25vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  {/* Subtle teal tint */}
                  <div className="absolute inset-0 bg-[#005b5c]/15" />
                </motion.div>
              ))}

              {/* ── Floating glass stats card ── */}
              <motion.div
                ref={statsRef}
                initial={{ opacity: 0, scale: 0.92, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                           bg-white/85 backdrop-blur-xl rounded-xl shadow-[0_6px_30px_rgba(0,0,0,0.14)]
                           border border-white/60 px-4 py-3 z-20
                           flex items-center gap-4"
              >
                <StatItem target={25}  suffix="+" label="Journals"           inView={statsInView} delay={0.0} />
                <div className="w-px h-7 bg-[#d9d6c9]" />
                <StatItem target={70}  suffix="+" label="Projects Funded"    inView={statsInView} delay={0.1} />
                <div className="w-px h-7 bg-[#d9d6c9]" />
                <StatItem target={350} suffix="+" label="Researchers Helped" inView={statsInView} delay={0.2} />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Scroll Hint: Initial Hero ── */}
        <motion.div
          style={{ opacity: heroHintOp, display: heroHintDisplay }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 pointer-events-none z-30"
        >
          <span className="text-[#86868b] font-sans text-[10px] font-medium tracking-widest uppercase">
            Scroll to open book
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-[#86868b] to-transparent" />
        </motion.div>

        {/* ── Scroll Hint: While reading book ── */}
        <motion.div
          style={{ opacity: bookHintOp, display: bookHintDisplay }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 pointer-events-none z-30"
        >
          <span className="text-[#667573] font-sans text-[10px] font-medium tracking-widest uppercase">
            Keep scrolling to read
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-[#667573] to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
