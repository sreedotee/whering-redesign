"use client";

import { motion } from "framer-motion";
import SectionHeader from "../SectionHeader";
import { fadeInUp } from "@/styles/animations";

export default function BriefChallenge() {
  return (
    <section id="brief" className="py-10 bg-white">
      <div className="container-standard">
        <SectionHeader number="02" title="The Brief & Challenge" />

        <motion.div {...fadeInUp} className="mb-8 max-w-3xl">
          <p className="text-base font-medium text-[#6B6B6B] leading-[27.2px]">
            The starting point was simple:{" "}
            <em>"Create a mobile app that uses AI to generate outfit visualizations from clothing items."</em>
          </p>
          <p className="text-base font-medium text-[#6B6B6B] leading-[27.2px] mt-4">
            But the real challenge was strategic:{" "}
            <strong className="text-[#1F1F1F]">
              Where does this technology create the most value?
            </strong>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "The Question",
              content:
                "Virtual try-on technology exists—but for what purpose? Where does it solve real problems?",
              highlight: false,
            },
            {
              title: "My Approach",
              content:
                "Research existing solutions → Identify use case gaps → Define strategic opportunity → Design for that context",
              highlight: true,
            },
            {
              title: "The Outcome",
              content:
                "A shopping companion that helps users make confident purchase decisions across any retailer.",
              highlight: false,
            },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              viewport={{ once: true }}
              className={`rounded-2xl overflow-clip py-6 px-8 ${
                card.highlight ? "bg-[#3D2B4C] text-white" : ""
              }`}
              style={card.highlight ? {} : { backgroundColor: '#00000008' }}
            >
              <h3
                className={`heading mb-4 ${
                  card.highlight ? "text-white" : "text-[#1F1F1F]"
                }`}
              >
                {card.title}
              </h3>
              <p
                className={`leading-relaxed ${
                  card.highlight ? "text-purple-200" : "text-[#6B6B6B]"
                }`}
              >
                {card.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
