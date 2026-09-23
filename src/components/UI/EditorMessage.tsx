"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function EditorMessage() {
  return (
    <section className="relative w-full py-16 bg-brand-warm overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#f5f5f7] p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden"
        >
          {/* Subtle gold orb decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-40" style={{ background: 'radial-gradient(circle, rgba(197,152,47,0.2) 0%, transparent 70%)' }} />
          
          <div className="relative z-10">
            <h2 className="text-sm text-[#86868b] font-sans font-bold uppercase tracking-[0.2em] mb-4">
              From the Editor's Desk
            </h2>
            <h3 className="text-4xl md:text-5xl font-sans text-[#1d1d1f] font-bold tracking-tight mb-10 leading-tight">
              A Welcome to the Shodh Sagar Community.
            </h3>

            <div className="space-y-6 text-[#1d1d1f] font-sans text-xl leading-relaxed">
              <p>
                Dear Readers and Researchers,
              </p>
              <p>
                It gives me great pleasure to welcome you to Shodh Sagar — a platform built on the belief that meaningful research is not defined by boundaries, but by curiosity, integrity, and collaboration.
              </p>
              <p className="text-[#86868b]">
                Our work extends beyond publication — we engage in research discussions, thematic studies, and knowledge exchange that address real-world challenges. Guided by values of integrity, inclusivity, and intellectual independence, Shodh Sagar continues to serve as a living platform where ideas flow freely and meaningfully.
              </p>
              <p className="text-[#86868b]">
                Our mission is simple: to provide a space where ideas can flow freely, responsibly, and inclusively. Every submission, whether it comes from an emerging scholar or an established academic, is treated with the same respect for originality and thought. We remain committed to maintaining high editorial standards, rigorous peer review, and transparent publishing practices.
              </p>
            </div>

            <div className="mt-14 pt-10 border-t border-[#d2d2d7] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <p className="text-[#1d1d1f] font-sans text-xl font-bold">Dr. Diwan Sher Singla</p>
                <p className="text-[#86868b] font-sans text-base">Editor-in-Chief, Shodh Sagar</p>
              </div>
              
              <a 
                href="mailto:info@shodhsagar.com" 
                className="inline-flex items-center gap-2 text-base text-[#223534] hover:text-[#005b5c] transition-colors bg-white px-5 py-3 rounded-full shadow-sm hover:shadow-md border border-[#d9d6c9]"
              >
                <Mail size={18} className="text-[#005b5c]" />
                info@shodhsagar.com
              </a>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
