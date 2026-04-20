"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { href: "#overview", label: "Overview" },
  { href: "#research", label: "Research" },
  { href: "#framework", label: "Framework" },
  { href: "#decisions", label: "Decisions" },
  { href: "#designs", label: "Designs" },
  { href: "#validation", label: "Validation" },
  { href: "#reflection", label: "Reflection" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-[0_2px_8px_rgba(0,0,0,0.05)]"
          : "bg-transparent"
      }`}
      style={{ height: 64 }}
    >
      <div className="container-standard h-full flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="heading text-[#3D2B4C]"
        >
          Whering
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#5C5759] hover:text-[#3D2B4C] relative group transition-colors"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#3D2B4C] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <Link
            href="/typography"
            className="text-sm font-medium text-[#5C5759] hover:text-[#3D2B4C] relative group transition-colors"
          >
            Typography
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#3D2B4C] group-hover:w-full transition-all duration-300" />
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {/* Mobile menu button */}
          <button
            className="md:hidden w-9 h-9 rounded-full flex items-center justify-center bg-[#E8E5E6]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white border-t border-[#E8E5E6] px-6 py-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-sm font-medium text-[#5C5759] hover:text-[#3D2B4C] border-b border-[#E8E5E6]"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/typography"
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-sm font-medium text-[#5C5759] hover:text-[#3D2B4C]"
            >
              Typography
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
