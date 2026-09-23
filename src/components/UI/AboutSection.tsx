"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="relative w-full py-32 bg-[#ffffff]">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-sans font-bold text-[#1d1d1f] mb-8 tracking-tight leading-tight">
              Welcome to <br />
              <span className="text-[#0071e3]">Shodh Sagar Publications.</span>
            </h2>
            <p className="text-[#86868b] text-xl leading-relaxed mb-6 font-sans">
              <strong><em className="text-[#1d1d1f] not-italic">Shodh Sagar</em></strong> is a multidisciplinary academic platform dedicated to fostering research, critical inquiry, and intellectual exchange across diverse fields of knowledge. True to its name—literally meaning “Ocean of Research”—the journal provides a space where scholars, educators, and practitioners can contribute original studies, analytical papers, and innovative ideas that deepen understanding of contemporary issues while preserving the spirit of scholarly tradition.
            </p>
            <p className="text-[#86868b] text-xl leading-relaxed font-sans">
              The journal’s aim is to encourage rigorous research and provide visibility to groundbreaking discoveries.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#f5f5f7] p-10 rounded-3xl border border-[#d2d2d7]/50 shadow-sm"
          >
            <h3 className="text-2xl font-sans font-semibold text-[#1d1d1f] mb-6">Our Vision</h3>
            <ul className="space-y-6 font-sans text-[#86868b] text-lg">
              <li className="flex gap-4 items-start">
                <span className="text-[#0071e3] text-2xl leading-none">&bull;</span>
                <span>Promote multidisciplinary collaboration across all academic fields.</span>
              </li>
              <li className="flex gap-4 items-start">
                <span className="text-[#0071e3] text-2xl leading-none">&bull;</span>
                <span>Maintain the highest standards of peer-reviewed academic integrity.</span>
              </li>
              <li className="flex gap-4 items-start">
                <span className="text-[#0071e3] text-2xl leading-none">&bull;</span>
                <span>Provide a globally recognized platform for emerging and established scholars.</span>
              </li>
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
