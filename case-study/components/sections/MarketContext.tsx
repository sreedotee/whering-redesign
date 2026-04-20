"use client";

import { motion } from "framer-motion";
import SectionHeader from "../SectionHeader";
import { fadeInUp } from "@/styles/animations";

const stats = [
  {
    number: "78%",
    label: "Browse 5+ different retailers per purchase",
  },
  {
    number: "4.2 locations",
    label: "Average places used to save items",
  },
  {
    number: "64%",
    label: 'Hesitate due to "unsure how it looks on me"',
  },
];

export default function MarketContext() {
  return (
    <section className="py-10 bg-white">
      <div className="container-standard">
        <SectionHeader number="" title="Market Context" />

        <motion.p
          {...fadeInUp}
          className="text-base font-medium text-[#6B6B6B] leading-[27.2px] mb-8 max-w-2xl"
        >
          Before choosing a direction, three signals kept repeating across the market and the research:
          shoppers browse broadly, save inconsistently, and hesitate at the point of purchase.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="pt-5 flex flex-col items-center text-center gap-4 min-h-[148px]"
            >
              <p className="text-[40px] font-semibold text-[#1F1F1F] leading-none tracking-[-0.05em]">
                {s.number}
              </p>
              <p className="text-[15px] font-medium text-[#6B6B6B] leading-relaxed max-w-[16rem]">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
