"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeader from "../SectionHeader";
import { fadeInUp } from "@/styles/animations";

const modes = [
  {
    title: "PROMISE",
    subtitle: "Promise to Behavior",
    details: [
      { label: "Input", value: "Whering's stated value: dress better, reduce waste, shop smarter, organize" },
      { label: "Method", value: "Translate each promise into behaviors the product must enable" },
      { label: "Output", value: "Parent matrix of features against behavioral value" },
    ],
    implication: "Design decisions start from product value, not isolated screens.",
    illustrationSrc: "/images/three-modes/before.svg",
    imageBg: "#F5EDE3",
  },
  {
    title: "HIERARCHY",
    subtitle: "Casual vs Power User",
    details: [
      { label: "Input", value: "Parent matrix split into two user maturity views" },
      { label: "Signal", value: "Repeated appearances across views suggested navigation weight" },
      { label: "Output", value: "Primary vs secondary surfaces" },
    ],
    implication: "Universal behaviors become tabs; advanced workflows move deeper.",
    illustrationSrc: "/images/three-modes/during.svg",
    imageBg: "#EAF0EB",
  },
  {
    title: "LOOP",
    subtitle: "Discovery to Wardrobe Action",
    details: [
      { label: "Input", value: "Creators, outfits, items, collections, wardrobe, styling" },
      { label: "Problem", value: "These pieces did not always connect into one obvious loop" },
      { label: "Output", value: "creator -> outfit -> item -> collection -> wardrobe -> new outfit" },
    ],
    implication: "Inspiration becomes reusable product behavior instead of a static feed.",
    illustrationSrc: "/images/three-modes/after.svg",
    imageBg: "#E8EBF5",
  },
];

export default function ThreeModes() {
  return (
    <section id="framework" className="py-10 bg-white">
      <div className="container-standard">
        <SectionHeader number="06" title="Redesign Framework" />

        <motion.p {...fadeInUp} className="narrative-body mb-8 max-w-2xl">
          The redesign moved through three layers: product promise, navigation hierarchy, and reusable discovery loops.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modes.map((mode, i) => (
            <motion.div
              key={mode.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-clip flex flex-col bg-black/5"
            >
              <div
                className="relative h-44 w-full overflow-hidden"
                style={{ backgroundColor: mode.imageBg }}
              >
                <Image
                  src={mode.illustrationSrc}
                  alt={mode.title}
                  fill
                  unoptimized
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>

              <div className="p-6 flex flex-col items-start text-left flex-1 gap-6">
                <h3 className="card-heading">{mode.subtitle}</h3>

                <div className="space-y-4 flex-1">
                  {mode.details.map((d) => (
                    <div key={d.label}>
                      <p className="card-microlabel mb-1">{d.label}</p>
                      <p className="card-supporting">{d.value}</p>
                    </div>
                  ))}
                </div>

                <div className="w-full rounded-xl bg-white p-4 shadow-sm border border-black/5">
                  <p className="card-microlabel mb-1.5">Design Implication</p>
                  <p className="card-body leading-snug">{mode.implication}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
