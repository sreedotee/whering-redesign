"use client";

import { motion } from "framer-motion";
import SectionHeader from "../SectionHeader";
import { fadeInUp } from "@/styles/animations";

const directions = [
  {
    title: "Cleaner Navigation",
    label: "Navigation model",
    body: "Cluster repeated actions into durable destinations: Discover, Explore, Studio, Calendar, and Wardrobe.",
  },
  {
    title: "Collection Taxonomy",
    label: "Object model",
    body: "Keep wishlist, moodboards, and lookbooks as recognizable collection types, but make them part of one consistent saved-object system.",
  },
  {
    title: "Canvas-First Creation",
    label: "Core loop",
    body: "Move try-on remixing into one playful canvas with clear add-item, save, and plan actions instead of splitting Dress Me and Canvas into competing modes.",
  },
];

const journeys = [
  {
    title: "Discover to outfit journey",
    before: ["open Discover", "tap creator", "see style them", "open item", "unclear next step"],
    after: ["open Discover", "tap outfit", "inspect items", "remix in Canvas", "save to Collection"],
  },
  {
    title: "Canvas creation journey",
    before: ["style outfit", "enter canvas", "hunt for add items", "switch among 3 sources", "save then send"],
    after: ["open Try On", "add from saved context", "simplify item filters", "save outfit", "plan or share"],
  },
  {
    title: "Calendar planning journey",
    before: ["open day", "choose among 4 CTAs", "open month icon", "mode unclear"],
    after: ["open day", "store planned outfit", "get suggestions", "review month view"],
  },
  {
    title: "Saved object journey",
    before: ["wishlist", "moodboard", "lookbook", "saved posts", "separate places"],
    after: ["Collections", "choose type", "save item or outfit", "reuse in Canvas"],
  },
];

const loop = ["discover", "outfit", "item", "canvas", "collection", "calendar"];

function FlowLine({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map((item, index) => (
        <div key={`${item}-${index}`} className="flex items-center gap-2">
          <span className="rounded-full bg-white border border-black/5 px-3 py-1.5 card-supporting !text-primary">
            {item}
          </span>
          {index < items.length - 1 && (
            <span className="card-supporting !text-plum/40">-&gt;</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default function RedesignDirection() {
  return (
    <section id="solution" className="py-10 bg-white">
      <div className="container-standard">
        <SectionHeader number="03" title="Redesign Direction" subtitle="What changed and why" />

        <motion.p {...fadeInUp} className="narrative-body mb-10 max-w-2xl">
          The redesign does not try to make Whering smaller. It reduces cognitive load at the
          surface while preserving depth through progressive disclosure. The result is a clearer
          path to value for casual users and a stronger system model for power users.
          The main shift is not removing depth. It is making each destination declare its job:
          Discover inspires, Studio creates, Calendar stores planned wear, and Wardrobe manages
          items, outfits, and collection types.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {directions.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-surface border border-black/5 p-7"
            >
              <p className="card-microlabel mb-3">{item.label}</p>
              <h3 className="card-heading !text-lg mb-3">{item.title}</h3>
              <p className="card-body">{item.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-black/5 bg-white p-7 md:p-8 mb-8"
        >
          <p className="card-microlabel mb-5">Core loop</p>
          <div className="flex flex-wrap items-center gap-3">
            {loop.map((item, index) => (
              <div key={item} className="flex items-center gap-3">
                <span className="rounded-full bg-plum/5 border border-plum/10 px-4 py-2 card-body !text-primary">
                  {item}
                </span>
                {index < loop.length - 1 && (
                  <span className="card-supporting !text-plum/40">-&gt;</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-surface border border-black/5 p-7 md:p-8"
        >
          <p className="card-microlabel mb-6">Journey shifts</p>
          <div className="space-y-8">
            {journeys.map((journey) => (
              <div key={journey.title} className="border-b border-black/5 last:border-0 pb-7 last:pb-0">
                <h3 className="card-heading !text-base mb-4">{journey.title}</h3>
                <div className="grid grid-cols-1 lg:grid-cols-[110px_1fr] gap-3 mb-3 items-start">
                  <p className="card-microlabel pt-2">Before</p>
                  <FlowLine items={journey.before} />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-[110px_1fr] gap-3 items-start">
                  <p className="card-microlabel pt-2 !text-plum !opacity-100">After</p>
                  <FlowLine items={journey.after} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
