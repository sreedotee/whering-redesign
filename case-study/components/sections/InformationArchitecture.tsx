"use client";

import { motion } from "framer-motion";
import SectionHeader from "../SectionHeader";
import { fadeInUp } from "@/styles/animations";

const architectureColumns = [
  {
    title: "HOME",
    children: ["Curated feed", "Followed creators", "Recent inspiration"],
  },
  {
    title: "EXPLORE",
    children: ["Search", "Creators", "Outfits", "Items"],
  },
  {
    title: "STUDIO",
    children: ["Create outfit", "Use saved items", "AI styling"],
  },
  {
    title: "INBOX",
    children: ["Feedback", "Likes", "Follows", "Messages"],
  },
  {
    title: "WARDROBE",
    children: ["Items", "Outfits", "Collections", "Stats"],
  },
];

export default function InformationArchitecture() {
  return (
    <section id="information-architecture" className="py-10 bg-white">
      <div className="container-standard">
        <SectionHeader number="10" title="Information Architecture" />

        <motion.p {...fadeInUp} className="narrative-body mb-8 max-w-2xl">
          The matrix suggested a five-tab structure with a centered creation hub. Passive inspiration,
          active discovery, creation, social feedback, and wardrobe management each get a clear destination.
          Power-user tools remain accessible without dominating the first screen.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-clip py-10 px-8 mb-8 overflow-x-auto bg-surface border border-black/5"
        >
          <div className="flex justify-center mb-4">
            <div className="px-10 py-4 bg-primary !text-white rounded-2xl card-heading">
              WHERING
            </div>
          </div>
          <div className="flex justify-center mb-4">
            <div className="w-px h-8 bg-black/10" />
          </div>

          <div className="grid grid-cols-5 gap-4 min-w-[760px] mx-auto mb-4">
            {architectureColumns.map((column) => (
              <div
                key={column.title}
                className="px-4 py-3 bg-plum !text-white rounded-2xl card-body text-center"
              >
                {column.title}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-5 gap-4 min-w-[760px] mx-auto mb-4">
            {architectureColumns.map((column) => (
              <div key={column.title} className="flex justify-center">
                <div className="w-px h-6 bg-plum/10" />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-5 gap-4 min-w-[760px] mx-auto">
            {architectureColumns.map((column) => (
              <div key={column.title} className="space-y-2">
                {column.children.map((item) => (
                <div
                  key={item}
                  className="px-3 py-2 bg-white rounded-xl card-supporting font-medium text-center"
                  style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
                >
                  {item}
                </div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
