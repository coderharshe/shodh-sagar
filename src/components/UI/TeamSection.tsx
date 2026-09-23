"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Globe, Mail } from "lucide-react";

const teamMembers = [
  {
    name: "Dr. (Adv.) Diwan Sher Singla",
    role: "CEO, Shodh Sagar",
    image: "/team/member_1.png", 
  },
  {
    name: "Dr. Meenu",
    role: "Assistant Professor",
    image: "/team/member_2.png", 
  },
  {
    name: "Ashutosh Singla",
    role: "Director",
    image: "/team/member_3.png", 
  },
  {
    name: "Arun Singla",
    role: "Director",
    image: "/team/member_4.png", 
  }
];

export default function TeamSection() {
  return (
    <section className="relative w-full py-16 bg-brand-section overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-sans font-bold text-[#1d1d1f] tracking-tight mb-6">
            Our Team.
          </h2>
          <p className="text-[#86868b] font-sans text-xl max-w-2xl mx-auto">
            Meet the dedicated professionals and scholars behind Shodh Sagar who are committed to advancing global research.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-[2rem] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.04)] group"
            >
              <div className="relative h-80 w-full overflow-hidden bg-[#e5e5ea]">
                <Image 
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              <div className="p-6 text-center">
                <h3 className="text-xl font-sans font-semibold text-[#1d1d1f] tracking-tight mb-1">
                  {member.name}
                </h3>
                <p className="text-[#005b5c] font-sans text-sm font-medium">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
