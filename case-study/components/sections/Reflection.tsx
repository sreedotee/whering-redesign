"use client";

import { motion } from "framer-motion";
import SectionHeader from "../SectionHeader";

const learnings = [
  "The critique lands better when it starts from what the product already gets right.",
  "A product promise can become an information architecture tool when it is translated into behavior.",
  "Primary actions need context. Try on, send to creator, save, collect, and plan cannot all be treated as the main next step.",
  "Language is product architecture. Wishlist, moodboard, lookbook, collection, and saved all shape the user's mental model.",
];

const nextTime = [
  "Test the redesigned navigation with new and existing Whering users.",
  "Compare like, save, remix, and collection-add behavior to understand which signals best predict actual wardrobe reuse.",
  "Validate whether wishlist, moodboards, and lookbooks should remain named collection types or collapse further for first-time users.",
  "Prototype the calendar around planned outfits first, then test suggestion entry points as secondary support.",
];

export default function Reflection() {
  return (
    <section id="reflection" className="py-20 bg-white">
      <div className="container-standard">
        <SectionHeader number="06" title="Reflection & Learnings" tight />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="narrative-body mb-12 max-w-3xl"
        >
          This project sharpened how I think about consumer product design: the best redesigns do
          not start by trying to prove the product wrong. They understand why people love it, then
          make that love easier to act on.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-2xl p-8 md:p-10 bg-surface border border-black/5">
            <h3 className="card-heading !text-plum mb-8">Reflection</h3>
            <div className="space-y-6">
              {learnings.map((item) => (
                <div key={item} className="flex gap-4 items-start">
                  <span className="text-plum/30 font-bold shrink-0 mt-[1px]">-</span>
                  <p className="card-supporting !text-primary">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl p-8 md:p-10 bg-surface border border-black/5">
            <h3 className="card-heading !text-plum mb-8">
              What I&apos;d Validate Next
            </h3>
            <div className="space-y-6">
              {nextTime.map((item) => (
                <div key={item} className="flex gap-4 items-start">
                  <span className="text-plum/30 font-bold shrink-0 mt-[1px]">-</span>
                  <p className="card-supporting !text-primary">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
