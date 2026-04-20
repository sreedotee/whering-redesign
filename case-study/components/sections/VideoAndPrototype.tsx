"use client";

import { motion } from "framer-motion";
import EmojiImage from "../EmojiImage";
import { fadeInUp } from "@/styles/animations";

const chapters = [
  { time: "0:00", name: "Introduction" },
  { time: "0:30", name: "9+ action audit" },
  { time: "1:00", name: "Promise-to-behavior matrix" },
  { time: "1:45", name: "Tab clustering and Collection model" },
  { time: "2:30", name: "Connected discovery loop" },
];

const protoFlows = [
  "Browse a creator and open an outfit",
  "Move from outfit to item detail",
  "Save items into a Collection",
  "Use saved inspiration in Wardrobe and Studio",
];

export default function VideoAndPrototype() {
  return (
    <>
      {/* Video Block */}
      <div className="py-10 bg-white">
        <div className="container-standard">
          <h3 className="narrative-para-heading mb-2">Demo Video</h3>

          <motion.p {...fadeInUp} className="narrative-body mb-8 max-w-2xl">
            Watch a short walkthrough of the audit, redesign logic, and final prototype.
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-4">
            {/* Video Box */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div
                className="w-full aspect-video rounded-2xl bg-primary flex items-center justify-center relative overflow-hidden shadow-sm"
                style={{
                  background: "linear-gradient(135deg, #1D1A1C 0%, #3D2B4C 100%)",
                }}
              >
                <div className="text-center text-white p-8">
                  <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-6 cursor-pointer hover:bg-white/20 transition-all border border-white/20">
                    <svg className="w-10 h-10 ml-1.5" viewBox="0 0 24 24" fill="white">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                  <p className="card-heading !text-white mb-2">Video Walkthrough</p>
                  <p className="card-body !text-white/60">
                    Loom or YouTube walkthrough embed
                  </p>
                </div>
                <div className="absolute bottom-6 right-8 card-microlabel !text-white/40">3:24</div>
              </div>
            </motion.div>

            {/* Chapters Box */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-clip py-8 px-8 h-full flex flex-col bg-surface border border-black/5"
            >
              <h4 className="card-microlabel mb-6 !opacity-100 !text-primary">
                Chapters
              </h4>
              <div className="space-y-6">
                {chapters.map((c) => (
                  <div key={c.time} className="flex items-start gap-4">
                    <span className="card-supporting font-mono !text-[11px] !text-plum bg-plum/5 px-2 py-0.5 rounded-md shrink-0 border border-plum/10">
                      {c.time}
                    </span>
                    <p className="card-body !leading-snug">{c.name}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Video Caption — below video only */}
            <div className="lg:col-span-2 mt-2">
              <p className="card-supporting text-center italic opacity-60">
                Full prototype walkthrough: creator -&gt; outfit -&gt; item -&gt; collection -&gt; wardrobe -&gt; new outfit
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Prototype Block */}
      <div className="py-10 bg-white">
        <div className="container-standard">
          <h3 className="narrative-para-heading mb-2">Interactive Prototype</h3>

          <motion.p {...fadeInUp} className="narrative-body mb-8 max-w-2xl">
            Try the interactive prototype yourself. Click through the discovery and wardrobe loop.
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Figma embed placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div
                className="w-full aspect-video rounded-2xl bg-surface border-2 border-dashed border-black/10 flex items-center justify-center"
              >
                <div className="text-center p-10">
                  <div className="mb-6 mx-auto w-16 h-16 bg-white rounded-2xl shadow-sm border border-black/5 flex items-center justify-center">
                    <EmojiImage name="palette" size={32} />
                  </div>
                  <p className="card-heading mb-2">
                    Figma Prototype
                  </p>
                  <p className="card-body max-w-xs mx-auto">
                    Replace this placeholder with your Figma embed code for the full experience.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="rounded-2xl overflow-clip py-8 px-8 bg-surface border border-black/5">
                <h4 className="card-microlabel mb-6 !opacity-100 !text-primary">
                  Try these flows:
                </h4>
                <div className="space-y-6">
                  {protoFlows.map((flow, i) => (
                    <div key={flow} className="flex items-start gap-4">
                      <span className="w-7 h-7 rounded-xl bg-plum text-white flex items-center justify-center card-microlabel !text-inherit !opacity-100 shrink-0 shadow-sm shadow-plum/20">
                        {i + 1}
                      </span>
                      <p className="card-body !leading-snug">{flow}</p>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="#"
                className="block w-full py-4 text-center bg-primary text-white rounded-2xl card-heading !text-inherit !text-sm hover:translate-y-[-2px] transition-all shadow-md shadow-black/10"
              >
                Open in Figma -&gt;
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
