"use client";
import React from "react";

import { motion } from "framer-motion";
import SectionHeader from "../SectionHeader";
import { fadeInUp } from "@/styles/animations";

const sections = [
  {
    label: "Product Signals",
    points: [
      "The first screen exposed 9+ primary actions at once",
      "High-value actions were mixed with secondary or power-user actions",
      "Several concepts described the same underlying behavior",
      "Discovery content did not always connect back to wardrobe action",
    ],
  },
  {
    label: "Strategic Tension",
    points: [
      "The promise was sharper than the hierarchy",
      "New users needed guidance before advanced tools",
      "Power users still needed depth, stats, planning, and organization",
      "Social discovery needed to create more than passive scrolling",
    ],
  },
  {
    label: "Why This Direction",
    intro: "The redesign needed to protect Whering's feature depth while making the core loop easier to read:",
    points: [
      "Promote universal behaviors into primary navigation",
      "Move power-user behaviors into progressive surfaces",
      "Merge duplicated concepts into one flexible Collection model",
      "Make inspiration reusable through items, collections, and outfit creation",
    ],
    outro: "This is why the redesign is about hierarchy and product logic, not visual polish alone.",
  },
];

export default function StrategicOpportunity() {
  return (
    <section id="opportunity" className="py-10 bg-white">
      <div className="container-standard">
        <SectionHeader number="04" title="Product Context" tight />

        <motion.p {...fadeInUp} className="narrative-body mb-10 max-w-2xl">
          Three signals shaped the redesign: action overload, duplicated concepts, and a broken inspiration-to-wardrobe loop.
        </motion.p>

        <div className="space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
             <div className="flex flex-col items-start text-left">
               <h3 className="narrative-para-heading">{sections[0].label}</h3>
             </div>
             <div className="flex-col items-start text-left hidden md:flex">
               <h3 className="narrative-para-heading">{sections[1].label}</h3>
             </div>

             {[0, 1, 2, 3].map((idx) => (
                <React.Fragment key={idx}>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    className="narrative-body flex gap-3 text-left"
                  >
                    <span className="text-plum/30 font-bold shrink-0">-</span>
                    <span>{sections[0].points[idx]}</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 + 0.1 }}
                    viewport={{ once: true }}
                    className="narrative-body flex gap-3 text-left"
                  >
                    <span className="text-plum/30 font-bold shrink-0">-</span>
                    <span>{sections[1].points[idx]}</span>
                  </motion.div>
                </React.Fragment>
             ))}

            <div className="hidden md:block absolute left-1/2 top-10 bottom-4 w-px bg-black/[0.08]" />
          </div>

          <div className="h-px bg-black/[0.08] w-full" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-start text-left"
          >
            <h3 className="narrative-para-heading">{sections[2].label}</h3>
            {sections[2].intro && (
              <p className="narrative-body mb-6 max-w-lg opacity-80">{sections[2].intro}</p>
            )}
             <ul className="space-y-4">
               {sections[2].points.map((point) => (
                  <li key={point} className="narrative-body flex gap-3 text-left">
                   <span className="text-plum/30 font-bold shrink-0">-</span>
                   <span className="max-w-xl">{point}</span>
                 </li>
               ))}
             </ul>
            {sections[2].outro && (
              <p className="narrative-body-bold mt-6">{sections[2].outro}</p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
