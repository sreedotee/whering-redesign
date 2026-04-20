"use client";

import { motion } from "framer-motion";
import SectionHeader from "../SectionHeader";
import { fadeInUp } from "@/styles/animations";

const colors = [
  { name: "Plum", hex: "#3D2B4C", usage: "Brand primary", text: "white" },
  { name: "Surface", hex: "#FAF9FA", usage: "Background", text: "black" },
  { name: "Text Primary", hex: "#1D1A1C", usage: "Headings, body", text: "white" },
  { name: "Text Secondary", hex: "#5C5759", usage: "Supporting text", text: "white" },
  { name: "Text Tertiary", hex: "#7D767A", usage: "Captions, labels", text: "white" },
  { name: "Gray 200", hex: "#E8E5E6", usage: "Borders, dividers", text: "black" },
];


export default function DesignSystem() {
  return (
    <section id="design-system" className="py-10 bg-white">
      <div className="container-standard">
        <SectionHeader number="11" title="Design System" />

        <motion.p {...fadeInUp} className="text-base font-medium text-[#6B6B6B] leading-[27.2px] mb-8 max-w-2xl">
          Named "Atelia" from "atelier" (design studio), the visual system balances sophistication
          with approachability.
        </motion.p>

        <div className="space-y-8">
          {/* Colors */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="section-title text-[#1F1F1F] mb-8">
              Colors
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {colors.map((c) => (
                <div key={c.name} className="rounded-2xl overflow-clip" style={{ backgroundColor: '#00000008' }}>
                  <div className="h-20 w-full" style={{ background: c.hex }} />
                  <div className="p-3">
                    <p className="font-semibold text-sm text-[#1F1F1F]">{c.name}</p>
                    <p className="text-xs text-[#6B6B6B] font-mono">{c.hex}</p>
                    <p className="text-xs text-[#6B6B6B] mt-0.5">{c.usage}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 py-2">
              <p className="font-medium text-[#1F1F1F] mb-2">Color Evolution</p>
              <p className="text-[#6B6B6B] text-sm leading-relaxed">
                Evolved from purple (commonly associated with AI) to plum for a more approachable,
                consumer-friendly, playful feeling while maintaining sophistication.
              </p>
            </div>
          </motion.div>

          {/* Typography */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="section-title text-[#1F1F1F] mb-8">
              Typography
            </h3>

            <div className="rounded-2xl overflow-clip py-6 px-8 mb-6" style={{ backgroundColor: '#00000008' }}>
              <p className="page-title mb-2 text-[#1F1F1F]">Inter</p>
              <p className="text-sm text-[#6B6B6B]">
                Used throughout for headings, body text, and UI elements. Clean, highly readable,
                with a wide weight range from medium to semibold for clear hierarchy.
              </p>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
