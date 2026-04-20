"use client";

import { motion } from "framer-motion";
import SectionHeader from "../SectionHeader";
import { fadeInUp } from "@/styles/animations";

const auditSteps = [
  "Audited Whering's promise: dress better, reduce waste, shop smarter, and organize the wardrobe",
  "Counted 9+ competing primary actions on the first screen",
  "Mapped each major feature to the behaviors needed to make the promise true",
];

const synthesisSteps = [
  "Split the matrix into casual-user and power-user views",
  "Used recurrence across the matrix as a heuristic for navigation weight",
  "Clustered related actions to derive the tabs that actually needed to exist",
];

export default function ResearchApproach() {
  return (
    <section id="research" className="py-10 bg-white">
      <div className="container-standard">
        <SectionHeader number="02" title="Research & Approach" tight />

        <motion.p {...fadeInUp} className="narrative-body mb-10 max-w-2xl">
          I built a promise-to-behavior matrix to connect Whering&apos;s brand promise with the user behaviors the product needs to support.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="narrative-body-bold mb-4">Product Audit</p>
            <ul className="space-y-4">
              {auditSteps.map((point) => (
                <li key={point} className="narrative-body flex gap-3">
                  <span className="text-plum/30 shrink-0 font-bold">-</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <p className="narrative-body-bold mb-4">Synthesis Method</p>
            <ul className="space-y-4">
              {synthesisSteps.map((point) => (
                <li key={point} className="narrative-body flex gap-3">
                  <span className="text-plum/30 shrink-0 font-bold">-</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
