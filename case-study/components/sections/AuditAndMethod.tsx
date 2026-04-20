"use client";

import { motion } from "framer-motion";
import SectionHeader from "../SectionHeader";
import { fadeInUp } from "@/styles/animations";

const auditFindings = [
  {
    stat: "12+",
    label: "Competing actions",
    body: "Across Discover, item detail, canvas, calendar, and profile, primary actions overlapped: style them, style outfit, add item, send to creator, save, like, and plan.",
  },
  {
    stat: "4",
    label: "Calendar CTAs",
    body: "A single day view exposed four equal paths. The core job should be storing what I want to wear on a day, with suggestions as support.",
  },
  {
    stat: "3",
    label: "Collection types",
    body: "Wishlist, moodboards, and lookbooks are useful distinctions, but they behave like collection variants rather than separate mental models.",
  },
];

const methodSteps = [
  "Mapped Whering's product promise to the user behaviors the interface needs to support.",
  "Split the parent matrix into casual-user and power-user needs to separate activation from depth.",
  "Audited each flow for primary action clarity, object-model consistency, and hidden affordances.",
  "Clustered related actions into a cleaner navigation model and core interaction loop.",
];

export default function AuditAndMethod() {
  return (
    <section id="research" className="py-10 bg-white">
      <div className="container-standard">
        <SectionHeader number="02" title="Audit & Method" subtitle="From product promise to structure" />

        <motion.p {...fadeInUp} className="narrative-body mb-10 max-w-2xl">
          After understanding what makes Whering emotionally strong, I used behavior mapping to
          make the redesign accountable. The goal was to translate the product promise into
          information architecture decisions: what deserves primary navigation, what belongs deeper,
          and where progressive disclosure should protect the first-time experience.
          I paid special attention to places where the interface changed intent without warning:
          a creator profile leading to "style them," an outfit flow ending in "send to Maria,"
          and a try-on canvas where add-item controls were visually buried.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12"
        >
          {auditFindings.map((finding) => (
            <div key={finding.label} className="rounded-2xl bg-surface border border-black/5 p-7">
              <p className="text-4xl font-semibold text-plum mb-3">{finding.stat}</p>
              <p className="card-microlabel mb-3">{finding.label}</p>
              <p className="card-body">{finding.body}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-primary text-white p-8 md:p-10"
        >
          <p className="card-microlabel !text-white/50 mb-5">Method</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {methodSteps.map((step, index) => (
              <div key={step} className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center shrink-0 card-microlabel !text-white">
                  {index + 1}
                </span>
                <p className="card-body !text-white/75">{step}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
