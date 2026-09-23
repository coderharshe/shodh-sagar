"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, GraduationCap, Award, Users, FileText,
  Globe, Microscope, Scale, HeartPulse, Zap, ArrowUpRight,
  ChevronRight,
} from "lucide-react";

// ── All real services extracted from shodhsagar.org ────────────────────────
const categories = [
  {
    id: "journals",
    label: "Research Journals",
    Icon: BookOpen,
    color: "#005b5c",
    bg: "#e6f4f4",
    description:
      "25+ peer-reviewed, open-access journals spanning science, humanities, law, technology, medicine, commerce and more. All indexed and globally accessible.",
    cta: "Browse All Journals",
    ctaLink: "/journals",
    stat: "25+ Journals",
    services: [
      { name: "AI & Machine Learning",       url: "https://jaiml.shodhsagar.org/index.php/j",                    tag: "Technology" },
      { name: "Medical Research",             url: "https://mra.shodhsagar.com/index.php/j",                      tag: "Health" },
      { name: "Law",                          url: "https://law.shodhsagar.com/index.php/j",                      tag: "Legal" },
      { name: "Commerce & Economics",         url: "https://jce.shodhsagar.co.in/index.php/ssjce",               tag: "Business" },
      { name: "Quantum Science & Technology", url: "https://jqst.mindsynk.org/index.php/j",                      tag: "Science" },
      { name: "Renewable Energy",             url: "https://energy.shodhsagar.co.in/index.php/ijre/index",       tag: "Energy" },
      { name: "Ayurveda & Alternative Med.",  url: "https://jaam.shodhsagar.org/index.php/j",                    tag: "Health" },
      { name: "Language, Arts & Culture",     url: "https://jlacf.shodhsagar.org/index.php/j",                   tag: "Humanities" },
      { name: "Metaverse & Blockchain",       url: "https://sjmbt.com/index.php/j",                              tag: "Technology" },
      { name: "Electric Vehicles",            url: "https://jev.shodhsagar.org/index.php/ssjev",                 tag: "Engineering" },
      { name: "Physics",                      url: "https://physics.moderndynamics.in",                           tag: "Science" },
      { name: "Sustainable Solutions",        url: "https://jss.thewriters.in/index.php/jss/index",              tag: "Environment" },
    ],
  },
  {
    id: "grants",
    label: "Research Grants",
    Icon: GraduationCap,
    color: "#c5982f",
    bg: "#fdf4e3",
    description:
      "Funding 70+ research projects and 150+ studies, assisting over 350 researchers in publishing their work. Support was expanded during COVID-19 to promote innovation.",
    cta: "Apply for a Grant",
    ctaLink: "https://events.shodhsagar.org/index.php/research_projects/apply_research_grant",
    stat: "70+ Projects Funded",
    services: [
      { name: "Research Project Funding",    url: "https://events.shodhsagar.org/index.php/research_projects/apply_research_grant", tag: "Funding" },
      { name: "COVID-19 Innovation Support", url: "https://events.shodhsagar.org/index.php/research_projects/apply_research_grant", tag: "Special" },
      { name: "Publication Assistance",      url: "https://events.shodhsagar.org/index.php/research_projects/apply_research_grant", tag: "Support" },
      { name: "Study Support Grants",        url: "https://events.shodhsagar.org/index.php/research_projects/apply_research_grant", tag: "Funding" },
    ],
  },
  {
    id: "books",
    label: "Book Publication",
    Icon: FileText,
    color: "#005b5c",
    bg: "#e6f4f4",
    description:
      "A dedicated platform for book publication with ISBN, enabling authors, scholars, and researchers to publish original academic work in a recognized format since 2021.",
    cta: "Publish Your Book",
    ctaLink: "https://books.shodhsagar.org/index.php/books",
    stat: "200+ Titles",
    services: [
      { name: "ISBN-Assigned Publication",   url: "https://books.shodhsagar.org/index.php/books", tag: "Publication" },
      { name: "Edited Volume Chapters",      url: "https://books.shodhsagar.org/index.php/books", tag: "Contribution" },
      { name: "Monographs",                  url: "https://books.shodhsagar.org/index.php/books", tag: "Research" },
      { name: "Academic Textbooks",          url: "https://books.shodhsagar.org/index.php/books", tag: "Education" },
    ],
  },
  {
    id: "awards",
    label: "Research Awards",
    Icon: Award,
    color: "#c5982f",
    bg: "#fdf4e3",
    description:
      "Recognizing excellence in research, innovation, and academic contributions through awards across multiple categories honoring outstanding researchers globally.",
    cta: "View Award Categories",
    ctaLink: "https://events.shodhsagar.org/index.php/awards/index",
    stat: "Multiple Categories",
    services: [
      { name: "Best Researcher Award",       url: "https://events.shodhsagar.org/index.php/awards/index", tag: "Research" },
      { name: "Innovation Award",            url: "https://events.shodhsagar.org/index.php/awards/index", tag: "Innovation" },
      { name: "Young Scholar Award",         url: "https://events.shodhsagar.org/index.php/awards/index", tag: "Academic" },
      { name: "Lifetime Achievement",        url: "https://events.shodhsagar.org/index.php/awards/index", tag: "Excellence" },
    ],
  },
  {
    id: "conferences",
    label: "Seminars & Conferences",
    Icon: Users,
    color: "#005b5c",
    bg: "#e6f4f4",
    description:
      "Organizing international seminars, conferences, and workshops creating platforms for academic discussion, knowledge sharing, and professional development globally.",
    cta: "Explore Events",
    ctaLink: "/conferences",
    stat: "Global Reach",
    services: [
      { name: "International Conferences",   url: "/conferences", tag: "Events" },
      { name: "Academic Seminars",           url: "/conferences", tag: "Events" },
      { name: "Research Workshops",          url: "/conferences", tag: "Workshop" },
      { name: "Webinars & Online Events",    url: "/conferences", tag: "Online" },
    ],
  },
];

// ── Tag color map ────────────────────────────────────────────────────────────
const tagColors: Record<string, { bg: string; text: string }> = {
  Technology:   { bg: "#e6f4f4", text: "#005b5c" },
  Health:       { bg: "#fce8ec", text: "#b0344d" },
  Legal:        { bg: "#ede8f8", text: "#5b3fa0" },
  Business:     { bg: "#fdf4e3", text: "#c5982f" },
  Science:      { bg: "#e8f0fc", text: "#2b5fc2" },
  Energy:       { bg: "#e6f9ee", text: "#1a7a46" },
  Humanities:   { bg: "#fef0e8", text: "#b55d24" },
  Engineering:  { bg: "#eef2f7", text: "#3a5a80" },
  Environment:  { bg: "#e9f5e9", text: "#2d6a2d" },
  Funding:      { bg: "#fdf4e3", text: "#c5982f" },
  Special:      { bg: "#ffe8e8", text: "#b02020" },
  Support:      { bg: "#e6f4f4", text: "#005b5c" },
  Publication:  { bg: "#e6f4f4", text: "#005b5c" },
  Contribution: { bg: "#eef2f7", text: "#3a5a80" },
  Research:     { bg: "#e6f4f4", text: "#005b5c" },
  Education:    { bg: "#ede8f8", text: "#5b3fa0" },
  Innovation:   { bg: "#fdf4e3", text: "#c5982f" },
  Academic:     { bg: "#fef0e8", text: "#b55d24" },
  Excellence:   { bg: "#fdf4e3", text: "#c5982f" },
  Events:       { bg: "#e6f4f4", text: "#005b5c" },
  Workshop:     { bg: "#eef2f7", text: "#3a5a80" },
  Online:       { bg: "#e8f0fc", text: "#2b5fc2" },
  Contribution2:{ bg: "#eef2f7", text: "#3a5a80" },
};

function Tag({ label }: { label: string }) {
  const c = tagColors[label] ?? { bg: "#f0ece0", text: "#667573" };
  return (
    <span
      className="inline-block text-[10px] font-bold uppercase tracking-widest font-sans px-2 py-0.5 rounded-full"
      style={{ background: c.bg, color: c.text }}
    >
      {label}
    </span>
  );
}

export default function ServicesSection() {
  const [activeId, setActiveId] = useState<string>("journals");
  const active = categories.find((c) => c.id === activeId)!;

  return (
    <section
      id="services"
      className="relative w-full bg-[#faf8f2] overflow-hidden"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}
    >
      {/* Background orb */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-[#005b5c]/5 blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#c5982f]/5 blur-3xl pointer-events-none translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto w-full px-6 py-16 relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <span className="text-[#005b5c] font-bold uppercase tracking-[0.2em] text-xs font-sans mb-3 block">
            What we offer
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-3xl md:text-4xl font-serif text-[#223534] font-medium leading-tight max-w-lg">
              All Services, at a Glance.
            </h2>
            <p className="text-[#667573] font-sans text-sm md:text-base max-w-sm leading-relaxed">
              Everything Shodh Sagar offers — journals, grants, books, awards, and events — in one place.
            </p>
          </div>
        </motion.div>

        {/* ── Tab bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {categories.map((cat) => {
            const isActive = cat.id === activeId;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveId(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-sans text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "text-white shadow-md"
                    : "bg-white text-[#667573] hover:text-[#223534] border border-[#e8e4d9] hover:border-[#c9c5bc]"
                }`}
                style={isActive ? { background: cat.color } : {}}
              >
                <cat.Icon className="w-4 h-4" />
                {cat.label}
              </button>
            );
          })}
        </motion.div>

        {/* ── Active panel ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid md:grid-cols-3 gap-5"
          >
            {/* Left: Description card */}
            <div
              className="md:col-span-1 rounded-2xl p-7 flex flex-col justify-between gap-6"
              style={{ background: active.color }}
            >
              <div>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: "rgba(255,255,255,0.15)" }}
                >
                  <active.Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-serif font-semibold text-white mb-3 leading-tight">
                  {active.label}
                </h3>
                <p className="text-white/80 font-sans text-sm leading-relaxed">
                  {active.description}
                </p>
              </div>

              <div>
                <div className="border-t border-white/20 pt-5 mb-5">
                  <span className="text-white/60 font-sans text-xs uppercase tracking-widest">At a glance</span>
                  <p className="text-2xl font-serif font-bold text-white mt-1">{active.stat}</p>
                </div>
                <a
                  href={active.ctaLink}
                  target={active.ctaLink.startsWith("http") ? "_blank" : "_self"}
                  rel={active.ctaLink.startsWith("http") ? "noopener noreferrer" : ""}
                  className="inline-flex items-center gap-2 bg-white rounded-full px-5 py-2.5 text-sm font-sans font-semibold transition-opacity hover:opacity-85"
                  style={{ color: active.color }}
                >
                  {active.cta}
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right: Service grid */}
            <div className="md:col-span-2 grid sm:grid-cols-2 gap-3 content-start">
              {active.services.map((svc, i) => (
                <motion.a
                  key={svc.name}
                  href={svc.url}
                  target={svc.url.startsWith("http") ? "_blank" : "_self"}
                  rel={svc.url.startsWith("http") ? "noopener noreferrer" : ""}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="group bg-white rounded-xl p-4 flex items-center justify-between gap-3 border border-[#ede9e0] hover:border-[#005b5c]/40 hover:shadow-[0_4px_20px_rgba(0,91,92,0.1)] transition-all duration-200"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center"
                      style={{ background: active.bg }}
                    >
                      <active.Icon className="w-4 h-4" style={{ color: active.color }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-sans font-semibold text-[#223534] group-hover:text-[#005b5c] transition-colors truncate">
                        {svc.name}
                      </p>
                      <Tag label={svc.tag} />
                    </div>
                  </div>
                  <ChevronRight
                    className="w-4 h-4 text-[#c9c5bc] group-hover:text-[#005b5c] group-hover:translate-x-0.5 transition-all flex-shrink-0"
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Bottom strip: quick-access to all categories ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 pt-8 border-t border-[#e8e4d9] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveId(cat.id)}
              className="group flex flex-col items-center gap-2 p-4 rounded-xl bg-white border border-[#ede9e0] hover:border-[#005b5c]/40 hover:shadow-md transition-all text-center"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                style={{ background: activeId === cat.id ? cat.color : cat.bg }}
              >
                <cat.Icon
                  className="w-5 h-5 transition-colors"
                  style={{ color: activeId === cat.id ? "#fff" : cat.color }}
                />
              </div>
              <span className="text-xs font-sans font-semibold text-[#223534] leading-tight">{cat.label}</span>
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
