"use client";

import { motion } from "framer-motion";
import SectionHeader from "../SectionHeader";
import { fadeInUp } from "@/styles/animations";

const terms = [
  {
    term: "Creator",
    def: "A person whose taste becomes a discovery path.",
    role: "Creators give outfits social context and make taste followable.",
  },
  {
    term: "Outfit",
    def: "A composed look that can expose the items behind it.",
    role: "Outfits are not static images; they are entry points into reusable wardrobe behavior.",
  },
  {
    term: "Item",
    def: "A single garment or accessory that can be saved, styled, and reused.",
    role: "Items are the modular unit that connects discovery to personal wardrobe action.",
  },
  {
    term: "Collection",
    def: "A flexible saved group for outfits, items, moodboards, lookbooks, or contexts.",
    role: "One model replaces several overlapping concepts and lets users name the meaning themselves.",
  },
];

export default function DesignLanguage() {
  return (
    <section id="language" className="py-10 bg-white">
      <div className="container-standard">
        <SectionHeader number="07" title="Product Language" />

        <motion.p {...fadeInUp} className="narrative-body mb-8 max-w-2xl">
          The redesign reduces conceptual duplication by clarifying the nouns in the system.
          Moodboards, lookbooks, collections, and saved references all pointed to the same deeper behavior:
          collecting fashion meaning for later use.
        </motion.p>
      </div>

      <div className="container-standard">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {terms.map((t, i) => (
            <motion.div
              key={t.term}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-white border border-black/5 shadow-sm overflow-hidden flex flex-row"
            >
              <div className="aspect-square self-stretch shrink-0 bg-surface border-r border-black/5 flex items-center justify-center p-6 w-[120px]">
                <div className="w-12 h-12 rounded-lg bg-white border border-black/5 shadow-sm flex items-center justify-center card-microlabel text-plum/30">
                  {t.term.slice(0, 1)}
                </div>
              </div>
              <div className="flex flex-col gap-1.5 px-6 py-5 justify-center min-w-0">
                <h3 className="card-heading">{t.term}</h3>
                <p className="card-body text-primary font-medium">{t.def}</p>
                <p className="card-supporting italic">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
