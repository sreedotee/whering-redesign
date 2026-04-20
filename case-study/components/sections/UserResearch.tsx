"use client";

import { motion } from "framer-motion";
import SectionHeader from "../SectionHeader";
import { fadeInUp } from "@/styles/animations";

const findings = [
  {
    label: "9+",
    title: "Primary actions on the first screen",
    text: "Too many actions were competing at the same level, making the product promise harder to understand quickly.",
  },
  {
    label: "4",
    title: "Promises used as product requirements",
    text: "Dress better, reduce waste, shop smarter, and organize wardrobe became the columns for the promise-to-behavior matrix.",
  },
  {
    label: "2",
    title: "User views split from the parent matrix",
    text: "Casual-user and power-user views separated universal needs from advanced workflows.",
  },
  {
    label: "1",
    title: "Flexible Collection model",
    text: "Moodboard, lookbook, collection, and saved references were consolidated into one clearer mental model.",
  },
];

export default function UserResearch() {
  return (
    <section id="user-research" className="py-20 bg-white">
      <div className="container-standard">
        <SectionHeader number="03" title="Product Audit Findings" tight />

        <motion.p
          {...fadeInUp}
          className="text-base font-medium text-secondary leading-relaxed mb-12 max-w-3xl"
        >
          The audit focused on what the current structure was asking users to understand:
          which actions were primary, which concepts were duplicated, and where the loop stopped.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {findings.map((finding, i) => (
            <motion.div
              key={finding.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-surface border border-black/5 p-7 flex flex-col gap-4"
            >
              <div className="text-4xl font-semibold text-plum tracking-tight">{finding.label}</div>
              <h3 className="card-heading">{finding.title}</h3>
              <p className="card-body">{finding.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
