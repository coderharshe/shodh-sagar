"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import { Menu, X, Search, ArrowUpRight, BookOpen, ExternalLink } from "lucide-react";

// ── Featured journals for the mega-dropdown ─────────────────────────────────
const featuredJournals = [
  {
    title: "Artificial Intelligence & Machine Learning",
    tag: "Technology",
    url: "https://jaiml.shodhsagar.org/index.php/j",
    color: "#005b5c",
  },
  {
    title: "Medical Research Advancement",
    tag: "Health",
    url: "https://mra.shodhsagar.com/index.php/j",
    color: "#c5982f",
  },
  {
    title: "Commerce & Economics",
    tag: "Business",
    url: "https://jce.shodhsagar.co.in/index.php/ssjce",
    color: "#005b5c",
  },
  {
    title: "Language, Arts, Culture & Film",
    tag: "Humanities",
    url: "https://jlacf.shodhsagar.org/index.php/j",
    color: "#c5982f",
  },
  {
    title: "Quantum Science & Technology",
    tag: "Science",
    url: "https://jqst.mindsynk.org/index.php/j",
    color: "#005b5c",
  },
  {
    title: "Sustainable Solutions",
    tag: "Environment",
    url: "https://jss.thewriters.in/index.php/jss/index",
    color: "#c5982f",
  },
];

// ── Magnetic link wrapper ────────────────────────────────────────────────────
function MagneticLink({
  href,
  children,
  className,
  onHover,
  isActive,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onHover?: (id: string | null) => void;
  isActive?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.25);
    y.set((e.clientY - cy) * 0.25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    onHover?.(null);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onHover?.(href)}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.a>
  );
}

// ── Mega Dropdown ─────────────────────────────────────────────────────────────
function JournalsMegaMenu({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");

  const filtered = featuredJournals.filter((j) =>
    j.title.toLowerCase().includes(query.toLowerCase()) ||
    j.tag.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -12, scaleY: 0.96 }}
      animate={{ opacity: 1, y: 0, scaleY: 1 }}
      exit={{ opacity: 0, y: -12, scaleY: 0.96 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: "top center" }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[780px] max-w-[95vw] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-[#e8e4d9] overflow-hidden z-50"
      onMouseLeave={onClose}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#f0ece0] bg-[#faf8f2]">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#005b5c]" />
          <span className="font-sans font-semibold text-[#223534] text-sm">Our Journals</span>
          <span className="text-xs bg-[#e6f4f4] text-[#005b5c] font-bold px-2 py-0.5 rounded-full font-sans">25+</span>
        </div>
        {/* Live search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#667573]" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search journals…"
            className="pl-8 pr-4 py-1.5 text-sm font-sans bg-white border border-[#d9d6c9] rounded-full outline-none focus:border-[#005b5c] transition-colors w-52 text-[#223534] placeholder:text-[#a9a49a]"
          />
        </div>
      </div>

      {/* Journal grid */}
      <div className="p-5 grid grid-cols-2 gap-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((journal, i) => (
            <motion.a
              key={journal.url}
              href={journal.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ delay: i * 0.04 }}
              onClick={onClose}
              className="group flex items-start gap-3 p-3 rounded-xl hover:bg-[#f5f3ed] transition-colors cursor-pointer"
            >
              <div
                className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5"
                style={{ background: journal.color + "18" }}
              >
                <BookOpen className="w-4 h-4" style={{ color: journal.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-sans font-medium text-[#223534] leading-snug group-hover:text-[#005b5c] transition-colors line-clamp-2">
                  {journal.title}
                </p>
                <span
                  className="inline-block mt-1 text-[10px] font-bold uppercase tracking-widest font-sans"
                  style={{ color: journal.color }}
                >
                  {journal.tag}
                </span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-[#c5982f] opacity-0 group-hover:opacity-100 transition-opacity mt-1 flex-shrink-0" />
            </motion.a>
          ))}
        </AnimatePresence>
        {filtered.length === 0 && (
          <p className="col-span-2 text-center text-sm text-[#667573] py-6 font-sans">
            No journals match &ldquo;{query}&rdquo;
          </p>
        )}
      </div>

      {/* Footer CTA */}
      <div className="px-5 pb-4">
        <Link
          href="/journals"
          onClick={onClose}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-[#d9d6c9] text-[#005b5c] font-sans text-sm font-semibold hover:bg-[#005b5c] hover:text-white hover:border-[#005b5c] transition-all group"
        >
          View all journals
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}

// ── Main Navbar ───────────────────────────────────────────────────────────────
export default function CustomNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [journalsOpen, setJournalsOpen] = useState(false);
  const pathname = usePathname();

  // Scroll progress + scroll-aware state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      const doc = document.documentElement;
      const scrollTop = window.scrollY;
      const docHeight = doc.scrollHeight - doc.clientHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Conferences", href: "/conferences" },
  ];

  return (
    <>
      {/* ── Reading progress bar ─────────────────────────────────────── */}
      <div className="fixed top-0 left-0 w-full h-[3px] z-[60] bg-transparent pointer-events-none">
        <motion.div
          className="h-full rounded-r-full"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #005b5c 0%, #c5982f 60%, #e8b84b 100%)",
            boxShadow: "0 0 8px rgba(197,152,47,0.6)",
          }}
          transition={{ ease: "linear" }}
        />
      </div>

      {/* ── Navbar ───────────────────────────────────────────────────── */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-2xl shadow-[0_2px_24px_rgba(0,0,0,0.07)] border-b border-[#d9d6c9]/60 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group relative z-10">
            <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
              <Image
                src="/logo.png"
                alt="Shodh Sagar Logo"
                width={180}
                height={60}
                className="object-contain h-10 w-auto"
              />
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-1 items-center relative">
            {/* Shared sliding underline pill */}
            <AnimatePresence>
              {hoveredLink && (
                <motion.div
                  layoutId="nav-hover-pill"
                  className="absolute inset-0 rounded-lg bg-[#005b5c]/8 pointer-events-none"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
            </AnimatePresence>

            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <div key={link.name} className="relative">
                  <MagneticLink
                    href={link.href}
                    onHover={setHoveredLink}
                    isActive={isActive}
                    className={`relative px-4 py-2 text-[15px] font-sans font-medium transition-colors rounded-lg block ${
                      isActive ? "text-[#005b5c]" : "text-[#223534] hover:text-[#005b5c]"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="active-dot"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#005b5c]"
                      />
                    )}
                  </MagneticLink>
                </div>
              );
            })}

            {/* Journals trigger (with mega dropdown) */}
            <div
              className="relative"
              onMouseEnter={() => setJournalsOpen(true)}
              onMouseLeave={() => setJournalsOpen(false)}
            >
              <button
                onClick={() => setJournalsOpen(!journalsOpen)}
                className={`relative px-4 py-2 text-[15px] font-sans font-medium transition-colors rounded-lg flex items-center gap-1.5 ${
                  pathname === "/journals" ? "text-[#005b5c]" : "text-[#223534] hover:text-[#005b5c]"
                }`}
              >
                Our Journals
                <motion.span
                  animate={{ rotate: journalsOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-[#005b5c] opacity-60"
                >
                  ▾
                </motion.span>
                {pathname === "/journals" && (
                  <motion.span
                    layoutId="active-dot"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#005b5c]"
                  />
                )}
              </button>

              <AnimatePresence>
                {journalsOpen && (
                  <JournalsMegaMenu onClose={() => setJournalsOpen(false)} />
                )}
              </AnimatePresence>
            </div>

            {/* Contact CTA */}
            <motion.a
              href="#about"
              whileHover={{ scale: 1.04, boxShadow: "0 4px 20px rgba(0,91,92,0.3)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="ml-3 px-5 py-2 rounded-full bg-[#005b5c] text-white font-sans text-[15px] font-medium shadow-sm relative overflow-hidden group"
            >
              <span className="relative z-10">Contact</span>
              <motion.div
                className="absolute inset-0 bg-[#003f40]"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              />
            </motion.a>
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            className="md:hidden text-[#223534] w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#005b5c]/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden md:hidden border-t border-[#d9d6c9]/60 bg-white/95 backdrop-blur-xl"
            >
              <div className="px-6 py-6 flex flex-col gap-2">
                {[...navLinks, { name: "Our Journals", href: "/journals" }].map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl font-sans font-medium text-lg transition-colors ${
                          isActive
                            ? "bg-[#e6f4f4] text-[#005b5c]"
                            : "text-[#223534] hover:bg-[#f5f3ed] hover:text-[#005b5c]"
                        }`}
                      >
                        {link.name}
                        <ArrowUpRight className="w-4 h-4 opacity-40" />
                      </Link>
                    </motion.div>
                  );
                })}
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.21, duration: 0.3 }}
                  href="#about"
                  className="mt-2 px-6 py-3.5 rounded-full bg-[#005b5c] text-white text-center font-medium font-sans text-base shadow-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
