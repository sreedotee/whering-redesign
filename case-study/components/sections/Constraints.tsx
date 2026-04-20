"use client";

import { motion } from "framer-motion";
import SectionHeader from "../SectionHeader";
import { fadeInUp } from "@/styles/animations";

const categories = [
  {
    label: "Product",
    items: [
      {
        title: "Existing feature depth",
        implication:
          "The redesign needed to simplify hierarchy without making the product feel less capable.",
      },
      {
        title: "Duplicated concepts",
        implication:
          "Moodboards, lookbooks, collections, and saved references were consolidated into one flexible model.",
      },
      {
        title: "Personal taste is hard to predict",
        implication:
          "Discovery was redesigned to expose more options per scroll instead of relying on one perfect recommendation.",
      },
    ],
  },
  {
    label: "User Experience",
    items: [
      {
        title: "Casual users need a clear start",
        implication:
          "Primary navigation focuses on universal behaviors before power-user tools.",
      },
      {
        title: "Power users still need depth",
        implication:
          "Stats, wardrobe maintenance, and advanced organization stay available deeper in context.",
      },
      {
        title: "Brand charm already works",
        implication:
          "The redesign preserves Whering's soft fashion world while tightening product logic.",
      },
    ],
  },
  {
    label: "Research",
    items: [
      {
        title: "No internal analytics",
        implication:
          "The case study uses visible product evidence, action counts, and heuristic reasoning.",
      },
      {
        title: "Independent redesign",
        implication:
          "Recommendations are framed as hypotheses that should be validated with Whering's real data.",
      },
      {
        title: "Limited timeline",
        implication:
          "The work prioritizes high-leverage IA, loop, and mental-model changes over edge-case polish.",
      },
    ],
  },
];

export default function Constraints() {
  return (
    <section id="constraints" className="py-10 bg-white">
      <div className="container-standard">
        <SectionHeader number="14" title="Constraints" subtitle="Design within a real product" />

        <motion.p
          {...fadeInUp}
          className="narrative-body mb-8 max-w-2xl"
        >
          This was a speculative redesign, so the constraints were about honesty: preserve what
          already works, avoid fake certainty, and make product decisions that could be validated by
          the team later.
        </motion.p>
      </div>

      <div className="container-standard">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-clip border border-black/5 bg-surface"
        >
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-black/[0.02] border-b border-black/5">
                {categories.map((cat, index) => (
                  <th
                    key={cat.label}
                    className={`px-8 py-5 text-left card-microlabel !text-primary !opacity-100 ${
                      index < categories.length - 1 ? "border-r border-black/5" : ""
                    }`}
                  >
                    {cat.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {Array.from({
                length: Math.max(...categories.map((c) => c.items.length)),
              }).map((_, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="bg-white/50 border-b border-black/5 last:border-0"
                >
                  {categories.map((cat, index) => (
                    <td
                      key={`${cat.label}-${rowIndex}`}
                      className={`px-8 align-top ${
                        cat.items[rowIndex] ? "py-6" : "py-0"
                      } ${
                        index < categories.length - 1 ? "border-r border-black/5" : ""
                      }`}
                    >
                      {cat.items[rowIndex] ? (
                        <div className="flex flex-col gap-2">
                          <p className="card-heading !text-sm">
                            {cat.items[rowIndex].title}
                          </p>
                          <p className="card-body">
                            {cat.items[rowIndex].implication}
                          </p>
                        </div>
                      ) : null}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 py-10 border-t border-black/5"
        >
          <h3 className="narrative-para-heading mb-4">
            Why Constraints Matter
          </h3>
          <p className="narrative-body max-w-3xl">
            The work is intentionally framed as a product hypothesis. The strongest next step would
            be testing the proposed loop against Whering's activation, creator discovery, save, and
            repeat-use data.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
