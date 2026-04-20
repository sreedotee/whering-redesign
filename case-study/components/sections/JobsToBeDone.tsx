"use client";

import { motion } from "framer-motion";
import SectionHeader from "../SectionHeader";
import { fadeInUp } from "@/styles/animations";

const jobs = [
  {
    number: "01",
    title: "Save & Organize",
    label: "Build a personal wardrobe memory",
    quote:
      "When I see clothes I like online, I want to save them somewhere organized, so I can find them when I'm ready to buy.",
  },
  {
    number: "02",
    title: "Visualize Fit",
    label: "Reduce uncertainty before purchase",
    quote:
      "When I'm considering a purchase, I want to see how items look on my body, so I can decide with confidence without asking friends.",
  },
  {
    number: "03",
    title: "Mix & Match",
    label: "Plan outfits across stores and contexts",
    quote:
      "When I have items from different stores, I want to visualize them together, so I can see if they work as an outfit.",
  },
];

export default function JobsToBeDone() {
  return (
    <section id="jobs" className="py-10 bg-white">
      <div className="container-standard">
        <SectionHeader number="05" title="Jobs-to-be-Done" />

        <motion.p
          {...fadeInUp}
          className="narrative-body mb-10 max-w-2xl"
        >
          Based on the research, three recurring jobs stood out. These were not feature requests.
          They were the underlying outcomes users were trying to achieve while shopping online.
        </motion.p>
      </div>

      <div className="container-standard">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {jobs.map((job, i) => (
            <motion.div
              key={job.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col group"
            >
              {/* TOP CARD: The Quote Block */}
              <div 
                className="relative flex flex-col justify-center rounded-t-[20px] border border-black/5 p-10 h-full transition-all duration-500 overflow-hidden bg-surface"
              >
                <div className="relative pl-5 z-10">
                  <span className="absolute left-0 -top-1.5 text-[24px] text-gray-300 font-serif select-none transition-colors duration-500 group-hover:text-gray-400">
                    &ldquo;
                  </span>
                  <p className="card-body italic text-primary font-medium">
                    {job.quote}
                    <span className="inline-block translate-x-1 text-[24px] text-gray-300 font-serif">&rdquo;</span>
                  </p>
                </div>
              </div>

              {/* BOTTOM CARD: The Job Metadata (Attached) */}
              <div className="relative z-10 border-x border-b border-black/5 rounded-b-[20px] bg-white p-6 shadow-sm group-hover:shadow-md transition-all duration-500">
                <div className="space-y-1">
                   <p className="card-microlabel mb-1.5 opacity-40">Job {job.number}</p>
                   <h3 className="card-heading !text-lg mb-1">
                     {job.title}
                   </h3>
                   <p className="card-supporting !text-primary font-medium">
                     {job.label}
                   </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="container-standard">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center narrative-body italic opacity-60"
        >
          These jobs became the foundation for the feature set and the three behavioral modes.
        </motion.p>
      </div>
    </section>
  );
}
