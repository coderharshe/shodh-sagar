"use client";

import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, Workflow, Globe2 } from "lucide-react";

const pillars = [
  {
    icon: Lightbulb,
    title: "Continuous Discovery",
    body: "Fostering spaces for reflection, collaboration, and new ideas that push the boundaries of established knowledge.",
  },
  {
    icon: Workflow,
    title: "Multidisciplinary",
    body: "Where the humanities converse with technology and theory meets practice — every perspective matters.",
  },
  {
    icon: Globe2,
    title: "Global Connection",
    body: "Connecting local understanding directly to global challenges, bridging scholarship and society.",
  },
];

export default function ThinkTankSection() {
  return (
    <section className="relative w-full overflow-hidden">

      {/*
       * ── TOP BANNER STRIP ──────────────────────────────────────────────
       * Full-width, short, with the minimal network background image.
       * Acts as a section divider / statement piece.
       */}
      <div
        className="relative w-full py-20 flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('/thinktank-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Warm overlay — reduced opacity so background image breathes */}
        <div className="absolute inset-0 bg-[#fffdf7]/65" />

        {/* ── Decorative SVG graphic layer ── */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 1440 480"
        >
          {/* ── Connection node network (top-left cluster) ── */}
          <g opacity="0.18" stroke="#005b5c" strokeWidth="1.2" fill="none">
            <line x1="60" y1="60" x2="180" y2="130" />
            <line x1="180" y1="130" x2="120" y2="220" />
            <line x1="60" y1="60" x2="120" y2="220" />
            <line x1="180" y1="130" x2="280" y2="80" />
            <line x1="280" y1="80" x2="340" y2="160" />
            <line x1="120" y1="220" x2="260" y2="280" />
            <line x1="340" y1="160" x2="260" y2="280" />
          </g>
          <g fill="#005b5c" opacity="0.25">
            <circle cx="60" cy="60" r="5" />
            <circle cx="180" cy="130" r="4" />
            <circle cx="120" cy="220" r="4" />
            <circle cx="280" cy="80" r="5" />
            <circle cx="340" cy="160" r="3.5" />
            <circle cx="260" cy="280" r="4" />
          </g>

          {/* ── Connection node network (right cluster) ── */}
          <g opacity="0.15" stroke="#c5982f" strokeWidth="1.2" fill="none">
            <line x1="1100" y1="50" x2="1230" y2="120" />
            <line x1="1230" y1="120" x2="1300" y2="60" />
            <line x1="1300" y1="60" x2="1380" y2="150" />
            <line x1="1230" y1="120" x2="1180" y2="230" />
            <line x1="1380" y1="150" x2="1300" y2="280" />
            <line x1="1180" y1="230" x2="1300" y2="280" />
            <line x1="1100" y1="50" x2="1050" y2="170" />
            <line x1="1050" y1="170" x2="1180" y2="230" />
          </g>
          <g fill="#c5982f" opacity="0.3">
            <circle cx="1100" cy="50" r="5" />
            <circle cx="1230" cy="120" r="4" />
            <circle cx="1300" cy="60" r="3.5" />
            <circle cx="1380" cy="150" r="4" />
            <circle cx="1180" cy="230" r="5" />
            <circle cx="1300" cy="280" r="4" />
            <circle cx="1050" cy="170" r="3.5" />
          </g>

          {/* ── Floating hexagons ── */}
          <g fill="none" stroke="#005b5c" strokeWidth="1.5" opacity="0.2">
            {/* large hex top-right */}
            <polygon points="1390,20 1420,38 1420,72 1390,90 1360,72 1360,38" />
            {/* medium hex bottom-left */}
            <polygon points="80,370 104,384 104,412 80,426 56,412 56,384" />
            {/* small hex center-right */}
            <polygon points="900,40 918,50 918,70 900,80 882,70 882,50" />
          </g>
          <g fill="none" stroke="#c5982f" strokeWidth="1.2" opacity="0.2">
            {/* outline hex mid-left */}
            <polygon points="30,180 52,193 52,219 30,232 8,219 8,193" />
            {/* small gold hex bottom-right */}
            <polygon points="1320,390 1338,400 1338,420 1320,430 1302,420 1302,400" />
          </g>

          {/* ── Atom / orbital rings (top-right) ── */}
          <g transform="translate(1380, 380)" opacity="0.18" fill="none" stroke="#005b5c" strokeWidth="1.3">
            <ellipse rx="45" ry="16" transform="rotate(0)" />
            <ellipse rx="45" ry="16" transform="rotate(60)" />
            <ellipse rx="45" ry="16" transform="rotate(120)" />
            <circle r="5" fill="#005b5c" fillOpacity="0.4" />
          </g>
          {/* ── Atom / orbital rings (bottom-left) ── */}
          <g transform="translate(70, 400)" opacity="0.15" fill="none" stroke="#c5982f" strokeWidth="1.3">
            <ellipse rx="38" ry="14" transform="rotate(0)" />
            <ellipse rx="38" ry="14" transform="rotate(60)" />
            <ellipse rx="38" ry="14" transform="rotate(120)" />
            <circle r="4" fill="#c5982f" fillOpacity="0.4" />
          </g>

          {/* ── Triangles (geometric accents) ── */}
          <g opacity="0.14" fill="none" stroke="#005b5c" strokeWidth="1.2">
            <polygon points="480,30 510,75 450,75" />
            <polygon points="960,400 990,445 930,445" />
          </g>
          <g opacity="0.12" fill="#c5982f">
            <polygon points="700,15 716,42 684,42" />
            <polygon points="1200,430 1212,452 1188,452" />
          </g>

          {/* ── DNA helix strokes (far left) ── */}
          <g opacity="0.12" stroke="#005b5c" strokeWidth="1.3" fill="none">
            <path d="M20,80 C35,95 5,110 20,125 C35,140 5,155 20,170 C35,185 5,200 20,215 C35,230 5,245 20,260 C35,275 5,290 20,305 C35,320 5,335 20,350" />
            <path d="M28,80 C13,95 43,110 28,125 C13,140 43,155 28,170 C13,185 43,200 28,215 C13,230 43,245 28,260 C13,275 43,290 28,305 C13,320 43,335 28,350" />
          </g>

          {/* ── DNA helix strokes (far right) ── */}
          <g opacity="0.12" stroke="#c5982f" strokeWidth="1.3" fill="none">
            <path d="M1420,60 C1435,75 1405,90 1420,105 C1435,120 1405,135 1420,150 C1435,165 1405,180 1420,195 C1435,210 1405,225 1420,240" />
            <path d="M1428,60 C1413,75 1443,90 1428,105 C1413,120 1443,135 1428,150 C1413,165 1443,180 1428,195 C1413,210 1443,225 1428,240" />
          </g>

          {/* ── Ink dot clusters ── */}
          <g fill="#005b5c" opacity="0.12">
            <circle cx="600" cy="440" r="30" />
            <circle cx="630" cy="460" r="18" />
            <circle cx="575" cy="458" r="12" />
          </g>
          <g fill="#c5982f" opacity="0.1">
            <circle cx="840" cy="30" r="24" />
            <circle cx="865" cy="48" r="14" />
          </g>

          {/* ── Horizontal dashed rule ── */}
          <line x1="0" y1="478" x2="1440" y2="478" stroke="#c5982f" strokeWidth="1" strokeDasharray="8 12" opacity="0.25" />
        </svg>

        {/* Gold vertical accent bar */}
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-[#c5982f] to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 text-center max-w-4xl mx-auto px-6"
        >
          <span className="inline-block text-[#005b5c] font-bold uppercase tracking-[0.25em] text-xs mb-5 font-sans">
            Shodh Sagar Research Think Tank
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#223534] leading-[1.1] mb-6">
            Where ideas meet collaboration —<br className="hidden md:block" />
            <span className="text-[#c5982f] italic"> and research becomes action.</span>
          </h2>

          <p className="text-lg font-sans text-[#667573] max-w-2xl mx-auto leading-relaxed">
            Shodh Sagar has evolved from a publishing platform into a multidisciplinary think tank,
            bringing together scholars, practitioners, and educators united by a single purpose: to create
            knowledge that informs, inspires, and transforms.
          </p>
        </motion.div>
      </div>


      {/*
       * ── BOTTOM THREE-COLUMN PILLARS ───────────────────────────────────
       * Compact cards below the banner, brand-green tinted background.
       */}
      <div className="w-full bg-brand-warm py-0">
        <div className="max-w-7xl mx-auto px-6">

          {/* Full-width pull quote — sits between banner and cards */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="border-l-4 border-[#c5982f] pl-8 py-6 my-0"
          >
            <p className="text-xl md:text-2xl font-serif text-[#223534] italic leading-relaxed">
              "Together, let us continue to shape Shodh Sagar as a true ocean of research — one that
              nurtures ideas, deepens understanding, and strengthens the bridge between knowledge and society."
            </p>
            <footer className="mt-4 text-sm font-sans text-[#667573] font-medium tracking-wide uppercase not-italic">
              Dr. Diwan Sher Singla — Editor-in-Chief
            </footer>
          </motion.blockquote>

          {/* Divider */}
          <div className="h-px bg-[#d9d6c9]" />

          {/* Three pillars */}
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#d9d6c9]">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-4 px-8 py-7 group hover:bg-[#e6f4f4]/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#e6f4f4] flex items-center justify-center group-hover:bg-[#005b5c] transition-colors">
                  <pillar.icon className="w-6 h-6 text-[#005b5c] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-lg font-sans font-semibold text-[#223534] mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-[#667573] font-sans text-base leading-relaxed">
                    {pillar.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
