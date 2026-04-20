"use client";

import { motion } from "framer-motion";
import SectionHeader from "../SectionHeader";

const checks = [
  {
    label: "First-screen load",
    signal: "9+ primary actions",
    result: "Actions were grouped into clearer destinations instead of competing as equal choices.",
  },
  {
    label: "Promise coverage",
    signal: "4 product promises",
    result: "Each promise was translated into behaviors the interface should support.",
  },
  {
    label: "Navigation weight",
    signal: "Matrix recurrence",
    result: "Repeated behaviors across casual and power-user views earned higher IA priority.",
  },
  {
    label: "Loop continuity",
    signal: "Creator -> outfit -> item -> collection -> wardrobe -> new outfit",
    result: "Discovery became connected to saving, wardrobe use, and styling.",
  },
];

const stressTests = [
  "Can a new user understand where to start without reading instructions?",
  "Can a power user still find deeper wardrobe tools without crowding the first screen?",
  "Can inspiration from discovery become something reusable, not just something liked?",
  "Can similar concepts be described through one stable product model?",
];

export default function Validation() {
  return (
    <section id="validation" className="py-10 bg-white">
      <div className="container-standard">
        <SectionHeader number="12" title="Validation & Checks" />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="narrative-body mb-10 max-w-2xl"
        >
          Because this was an independent redesign, I did not invent participant metrics. I
          validated the direction through product logic checks: action count, promise coverage,
          matrix recurrence, mental-model consolidation, and loop walkthroughs.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14"
        >
          {checks.map((check) => (
            <div key={check.label} className="rounded-2xl bg-surface border border-black/5 p-7">
              <p className="card-microlabel mb-3">{check.label}</p>
              <h3 className="card-heading !text-lg mb-3">{check.signal}</h3>
              <p className="card-body">{check.result}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-black/5 pt-10"
        >
          <h3 className="narrative-para-heading mb-5">Stress Test Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stressTests.map((item) => (
              <div key={item} className="rounded-2xl bg-white border border-black/5 p-6">
                <p className="card-body !text-primary">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
