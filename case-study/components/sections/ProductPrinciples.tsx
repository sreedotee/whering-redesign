"use client";

import { motion } from "framer-motion";
import SectionHeader from "../SectionHeader";
import { fadeInUp } from "@/styles/animations";

const principles = [
  {
    title: "Use Try On As The Active Verb",
    label: "Interaction language",
    body: "Try on feels immediate and embodied. It tells users they can experiment with an outfit now, while styling feels more passive and advisory.",
  },
  {
    title: "Make Calendar A Planned-Wear Space",
    label: "Calendar intent",
    body: "A calendar day should store what I want to wear, what I wore, and what the system suggests. Suggestions support the plan instead of becoming four equal CTAs.",
  },
  {
    title: "Treat Saves As Collection Types",
    label: "Object model",
    body: "Wishlist, moodboards, and lookbooks can remain meaningful labels, like liked videos or watchlists, but they should share one underlying collection model.",
  },
  {
    title: "Give The Canvas Spatial Memory",
    label: "Creative surface",
    body: "The canvas should feel like a playful dress-up board: visible item adding, simple source switching, and clear save, plan, and share outcomes.",
  },
  {
    title: "Keep Social Signals Secondary",
    label: "Action hierarchy",
    body: "Likes, flags, and sends should not compete with the stronger product signals: save, try on, remix, collect, and plan.",
  },
];

export default function ProductPrinciples() {
  return (
    <section id="principles" className="py-10 bg-white">
      <div className="container-standard">
        <SectionHeader number="04" title="Product Principles" subtitle="Decisions that shaped the redesign" />

        <motion.p {...fadeInUp} className="narrative-body mb-10 max-w-2xl">
          These principles translate the audit into design direction. They keep the redesign
          grounded in product behavior, not just cleaner screens.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {principles.map((principle, index) => (
            <motion.article
              key={principle.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06, duration: 0.45 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-surface border border-black/5 p-7"
            >
              <p className="card-microlabel mb-3">{principle.label}</p>
              <h3 className="card-heading !text-lg mb-3">{principle.title}</h3>
              <p className="card-body">{principle.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
