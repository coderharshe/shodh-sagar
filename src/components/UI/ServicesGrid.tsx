"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Award, GraduationCap, Users, ArrowUpRight } from "lucide-react";

const services = [
  {
    number: "01",
    title: "Research Grants",
    shortTitle: "Grants",
    Icon: GraduationCap,
    stat: "70+ Projects",
    description:
      "Funding over 70 projects and 150 research studies, assisting around 350 researchers in publishing their work. Expanded support during COVID-19 to promote innovation.",
    actionText: "Apply for Grants",
    actionLink: "https://events.shodhsagar.org/index.php/research_projects/apply_research_grant",
    color: "#005b5c",
    bg: "#e6f4f4",
  },
  {
    number: "02",
    title: "Book Publication",
    shortTitle: "Books",
    Icon: BookOpen,
    stat: "200+ Titles",
    description:
      "Platform for book publication with ISBN, enabling authors, scholars, and researchers to publish original work in a recognized format since 2021.",
    actionText: "Publish with ISBN",
    actionLink: "https://books.shodhsagar.org/index.php/books",
    color: "#c5982f",
    bg: "#fdf4e3",
  },
  {
    number: "03",
    title: "Research Awards",
    shortTitle: "Awards",
    Icon: Award,
    stat: "Multiple Categories",
    description:
      "Recognizing excellence in research, innovation, and academic contributions through awards across multiple categories honoring outstanding researchers.",
    actionText: "View Categories",
    actionLink: "https://events.shodhsagar.org/index.php/awards/index",
    color: "#005b5c",
    bg: "#e6f4f4",
  },
  {
    number: "04",
    title: "Conferences",
    shortTitle: "Events",
    Icon: Users,
    stat: "Global Reach",
    description:
      "Organizing seminars, conferences, and workshops creating platforms for academic discussion, knowledge sharing, and professional development.",
    actionText: "Explore Events",
    actionLink: "/conferences",
    color: "#c5982f",
    bg: "#fdf4e3",
  },
];

export default function ServicesGrid() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="relative w-full bg-brand-section overflow-hidden"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}
    >
      {/* Subtle green orb */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] orb-green pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full px-6 py-12 relative z-10 flex flex-col gap-7">

        {/* ── Header row ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <div>
            <span className="text-[#005b5c] font-bold uppercase tracking-widest text-xs font-sans mb-2 block">
              What we do
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#223534] font-medium leading-tight">
              Our Key Initiatives.
            </h2>
          </div>
          <p className="text-[#667573] font-sans text-sm md:text-base max-w-sm leading-relaxed">
            Supporting the global research community through funding, publication, recognition, and collaboration.
          </p>
        </motion.div>

        {/* ── Four compact columns ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              onHoverStart={() => setActive(i)}
              onHoverEnd={() => setActive(null)}
              className="relative bg-white rounded-2xl overflow-hidden cursor-pointer shadow-[0_2px_16px_rgba(0,0,0,0.04)] group"
              style={{ minHeight: "320px" }}
            >
              {/* Colored top bar */}
              <div
                className="h-1 w-full transition-all duration-300"
                style={{ background: active === i ? service.color : "#d9d6c9" }}
              />

              <div className="p-6 flex flex-col h-full gap-4">
                {/* Number + Icon row */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-sans text-[#d9d6c9] tracking-widest">
                    {service.number}
                  </span>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300"
                    style={{
                      background: active === i ? service.color : service.bg,
                    }}
                  >
                    <service.Icon
                      className="w-5 h-5 transition-colors duration-300"
                      style={{ color: active === i ? "#fff" : service.color }}
                    />
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-lg md:text-xl font-sans font-semibold text-[#223534] mb-1">
                    {service.title}
                  </h3>
                  <span
                    className="text-sm font-sans font-bold uppercase tracking-widest"
                    style={{ color: service.color }}
                  >
                    {service.stat}
                  </span>
                </div>

                {/* Description — always visible */}
                <p className="text-[#667573] font-sans text-sm md:text-base leading-relaxed">
                  {service.description}
                </p>

                {/* CTA */}
                <div className="mt-auto pt-4">
                  <a
                    href={service.actionLink}
                    target={service.actionLink.startsWith("http") ? "_blank" : "_self"}
                    rel={service.actionLink.startsWith("http") ? "noopener noreferrer" : ""}
                    className="inline-flex items-center gap-1 text-sm md:text-base font-sans font-semibold transition-colors duration-200 hover:opacity-80"
                    style={{ color: service.color }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {service.actionText}
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
