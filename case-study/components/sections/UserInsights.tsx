"use client";

import { motion } from "framer-motion";
import SectionHeader from "../SectionHeader";
import { fadeInUp } from "@/styles/animations";

const personas = [
  {
    initial: "C",
    name: "Casual User",
    segment: "Needs a clear starting point",
    description: "Wants style inspiration and wardrobe value without managing a complex system.",
    behaviors: [
      "Browses inspiration passively",
      "Needs obvious next actions",
      "Benefits from lightweight saving and styling",
    ],
    job: "Understand what Whering does quickly and get to useful outfit behavior with low effort.",
  },
  {
    initial: "P",
    name: "Power User",
    segment: "Needs depth without clutter",
    description: "Uses planning, stats, packing, organization, and wardrobe intelligence more deeply.",
    behaviors: [
      "Maintains more items and outfits",
      "Cares about usage, planning, and organization",
      "Needs advanced tools after the core loop is established",
    ],
    job: "Access deeper wardrobe intelligence without forcing that complexity onto every new user.",
  },
  {
    initial: "S",
    name: "Social Explorer",
    segment: "Finds taste through people",
    description: "Discovers creators, outfits, and items through public taste signals.",
    behaviors: [
      "Follows creators for style context",
      "Saves outfits or items for later use",
      "Turns inspiration into personal styling behavior",
    ],
    job: "Move from creator inspiration to items, collections, and new outfits without hitting a dead end.",
  },
];

export default function UserInsights() {
  return (
    <section id="user-insights" className="py-20 bg-white">
      <div className="container-standard">
        <SectionHeader number="05" title="User Modes & Strategic Jobs" tight />

        <motion.p
          {...fadeInUp}
          className="narrative-body mb-10 max-w-2xl"
        >
          Splitting the matrix into casual and power-user views made the navigation problem clearer:
          not every valuable feature deserves equal visibility on day one.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {personas.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-surface border border-black/5 p-6 flex flex-col gap-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white border border-black/10 shadow-sm flex items-center justify-center card-heading shrink-0">
                  {p.initial}
                </div>
                <div>
                  <p className="card-heading leading-tight mb-0.5">{p.name}</p>
                  <p className="card-supporting">{p.segment}</p>
                </div>
              </div>

              <p className="card-body">{p.description}</p>

              <div>
                <p className="card-microlabel mb-2.5">Behaviors</p>
                <ul className="space-y-2">
                  {p.behaviors.map((b) => (
                    <li key={b} className="card-supporting flex gap-2">
                      <span className="text-plum/40 font-bold">-</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-black/10 mt-auto">
                <p className="card-microlabel mb-1.5">Primary Job</p>
                <p className="card-body font-medium text-primary leading-snug">{p.job}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
