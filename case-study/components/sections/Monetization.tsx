"use client";

import { motion } from "framer-motion";
import SectionHeader from "../SectionHeader";
import { fadeInUp } from "@/styles/animations";

const impactAreas = [
  {
    title: "Activation",
    body: "A clearer first screen gives new users fewer decisions before they understand what Whering is for.",
  },
  {
    title: "Retention",
    body: "Collections and wardrobe context give users a reason to return after the first discovery session.",
  },
  {
    title: "Creator Discovery",
    body: "Creator -> outfit -> item paths make people easier to follow through taste, not just profile metadata.",
  },
  {
    title: "Shopping Intent",
    body: "Item-level actions make inspiration more actionable because users can save, compare, and style individual pieces.",
  },
];

export default function Monetization() {
  return (
    <section id="monetization" className="py-10 bg-white">
      <div className="container-standard">
        <SectionHeader number="13" title="Business Impact" subtitle="Why this product structure matters" />

        <motion.p
          {...fadeInUp}
          className="text-base font-medium text-[#6B6B6B] leading-[27.2px] mb-8 max-w-2xl"
        >
          This redesign is not just a cleanup exercise. A stronger loop can help Whering turn
          inspiration into repeated behavior: browse, save, organize, style, and return.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10"
        >
          {impactAreas.map((area) => (
            <div key={area.title} className="rounded-2xl bg-surface border border-black/5 p-7">
              <p className="card-microlabel mb-3">{area.title}</p>
              <p className="card-body !text-primary">{area.body}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-primary text-white p-8 md:p-10"
        >
          <p className="card-microlabel !text-white/50 mb-4">Core Business Hypothesis</p>
          <h3 className="narrative-para-heading !text-white mb-4">
            If discovery becomes reusable, it can support more than engagement.
          </h3>
          <p className="narrative-body !text-white/70 max-w-3xl">
            It can feed wardrobe digitization, creator following, outfit creation, item saving,
            shopping decisions, and long-term organization. That is the loop the redesign is built
            around.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
