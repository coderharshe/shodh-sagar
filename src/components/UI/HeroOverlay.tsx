"use client";

import React from "react";
import { motion } from "framer-motion";

export default function HeroOverlay() {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center bg-[#f5f5f7] overflow-hidden">
      
      <div className="z-10 text-center px-4 max-w-5xl">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl font-sans font-bold tracking-tight text-[#1d1d1f] mb-6"
        >
          Ocean of Research.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-3xl font-sans text-[#86868b] font-medium max-w-3xl mx-auto mb-10"
        >
          A multidisciplinary platform dedicated to fostering research, critical inquiry, and intellectual exchange.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a 
            href="#explore" 
            className="px-8 py-4 bg-[#0071e3] text-white rounded-full font-sans font-medium text-lg hover:bg-[#0077ED] transition-colors"
          >
            Explore Journals
          </a>
          <a 
            href="#about" 
            className="px-8 py-4 bg-transparent text-[#0071e3] hover:underline rounded-full font-sans font-medium text-lg transition-colors"
          >
            Learn more &gt;
          </a>
        </motion.div>
      </div>

    </section>
  );
}
