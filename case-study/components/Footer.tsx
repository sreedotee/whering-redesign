"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/styles/animations";
import EmojiImage from "./EmojiImage";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-[#1D1A1C] text-white pt-20 pb-10">
      <div className="container-standard">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <motion.div {...fadeInUp}>
            <h2 className="narrative-section-heading !text-white !mb-2">Whering</h2>
            <p className="narrative-body !text-white opacity-60 mb-6">
              Reframing a Digital Wardrobe
            </p>
            <div className="flex flex-wrap gap-4 card-supporting !text-white opacity-40">
              <span>3 days</span>
              <span>/</span>
              <span>Solo redesign study</span>
              <span>/</span>
              <span>Promise-to-behavior matrix</span>
              <span>/</span>
              <span>Discovery loop</span>
            </div>
          </motion.div>

          <motion.div {...fadeInUp}>
            <h3 className="card-microlabel !text-white !opacity-40 mb-6">Let&apos;s Connect</h3>
            <div className="space-y-4">
              {[
                { icon: "email", label: "Email", href: "mailto:your@email.com" },
                { icon: "briefcase", label: "LinkedIn", href: "#" },
                { icon: "bird", label: "Twitter", href: "#" },
                { icon: "basketball", label: "Dribbble", href: "#" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-3 card-body !text-white opacity-60 hover:opacity-100 transition-opacity"
                >
                  <EmojiImage name={link.icon} size={20} alt={link.label} />
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
            <p className="mt-8 card-supporting !text-plum bg-plum/10 px-4 py-2.5 rounded-xl inline-block border border-plum/20">
              Open to full-time product design opportunities
            </p>
          </motion.div>

          <motion.div {...fadeInUp}>
            <h3 className="card-microlabel !text-white !opacity-40 mb-6">More Work</h3>
            <div className="space-y-4">
              {[
                { label: "Next Project ->", href: "#" },
                { label: "All Projects", href: "#" },
                { label: "About Me", href: "#" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block card-body !text-white opacity-60 hover:opacity-100 transition-opacity"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="border-t border-white/5 pt-10 flex flex-wrap items-center justify-between gap-6">
          <p className="card-supporting !text-white opacity-30">
            2026 Sreenandan. Built with Next.js & TypeScript.
          </p>
          <button
            onClick={scrollToTop}
            className="card-microlabel !text-white opacity-40 hover:opacity-100 transition-opacity flex items-center gap-2"
          >
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
