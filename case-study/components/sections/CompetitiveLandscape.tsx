"use client";

import { motion } from "framer-motion";
import SectionHeader from "../SectionHeader";
import { fadeInUp } from "@/styles/animations";

export default function CompetitiveLandscape() {
  return (
    <section id="competitive-landscape" className="py-10 bg-white">
      <div className="container-standard">
        <SectionHeader number="" title="Competitive Landscape" />

        <motion.p {...fadeInUp} className="text-base font-medium text-[#6B6B6B] leading-[27.2px] mb-3 max-w-2xl">
          I analyzed existing patterns in the market. While all solve real problems,{" "}
          <strong className="text-[#1F1F1F]">none combined three essentials:</strong>{" "}
          cross-retailer capture + AI try-on + layered organization.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-[#E8E5E6] mt-8"
        >
          <p className="text-[10px] font-bold text-[#3D2B4C]/40 uppercase tracking-widest mb-3 block">
            The Opportunity
          </p>
          <p className="text-base font-medium text-[#6B6B6B] leading-[27px]">
            <span className="text-[#1F1F1F]">No existing app lets you capture from any retailer, try on in one place, and keep archive plus Saved legible.</span>{" "}
            That&apos;s the gap Atelia fills — a unified, cross-retailer wardrobe brain.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
