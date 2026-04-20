"use client";

import { motion } from "framer-motion";
import SectionHeader from "../SectionHeader";
import { fadeInUp } from "@/styles/animations";

const strengths = [
  "It makes sustainability feel personal, not preachy.",
  "It turns wardrobe planning into something creative and nostalgic.",
  "It solves a real daily feeling: a full wardrobe and still nothing to wear.",
];

const focusAreas = [
  {
    title: "Clearer feature hierarchy",
    desc: "Reduce competing primary actions across Discover, Calendar, Studio, and Profile so each screen has one obvious job.",
  },
  {
    title: "Cleaner object model",
    desc: "Treat wishlist, moodboards, lookbooks, and saved references as Collection types instead of unrelated destinations.",
  },
  {
    title: "Canvas-first creation loop",
    desc: "Make the playful try-on canvas the center of remixing instead of hiding add-item, save, and plan actions behind multiple flows.",
  },
];

export default function Overview() {
  return (
    <section id="overview" className="py-10 bg-white">
      <div className="container-standard">
        <SectionHeader number="01" title="Overview" doubleGap={true} />

        <div className="space-y-8">
          <motion.div {...fadeInUp}>
            <h3 className="narrative-para-heading">Why Whering Works</h3>
            <p className="narrative-body mb-5 max-w-3xl">
              Whering has a rare emotional starting point: it helps people fall back in love with
              the clothes they already own. It is sustainable, but it also feels playful,
              nostalgic, and personal.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {strengths.map((item) => (
                <div key={item} className="rounded-2xl bg-surface border border-black/5 p-5">
                  <p className="card-body !text-primary">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeInUp}>
            <h3 className="narrative-para-heading">Where I Focused</h3>
            <p className="narrative-body max-w-3xl">
              I did not redesign Whering because the idea was weak. I redesigned the moments where
              a strong promise becomes harder to act on: crowded information architecture,
              competing calls to action, conceptual duplication across saved objects, and a creation
              loop that does not always turn inspiration into wardrobe action.
            </p>
          </motion.div>

          <motion.div {...fadeInUp}>
            <h3 className="narrative-para-heading">The Redesign Hypothesis</h3>
            <p className="narrative-body mb-4">
              Whering&apos;s next leap is not more features. It is making inspiration reusable:
              discover an outfit, remix it with your wardrobe, save it into a collection, and plan
              when to wear it.
            </p>
            <p className="narrative-body-bold mb-5">
              creator -&gt; outfit -&gt; item -&gt; canvas -&gt; collection -&gt; calendar
            </p>
            <ul className="space-y-4">
              {focusAreas.map((item) => (
                <li key={item.title} className="narrative-body flex gap-3">
                  <span className="text-plum/30 font-bold shrink-0">-</span>
                  <p>
                    <span className="narrative-body-bold !text-primary">{item.title}</span>
                    <span className="mx-2 text-plum/30">-</span>
                    <span className="opacity-80">{item.desc}</span>
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
