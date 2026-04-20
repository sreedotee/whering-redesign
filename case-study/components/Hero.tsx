"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const FIGMA_URL = "#";

const stats = [
  { label: "Role", value: "Product Designer" },
  { label: "Duration", value: "3 days" },
  { label: "Scope", value: "Solo redesign study" },
];

export default function Hero() {
  return (
    <section id="hero" className="relative bg-white py-12 md:py-20 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Contained Hero Card — ToDesktop Inspired Pattern */}
        <div 
          className="rounded-[32px] relative overflow-hidden border border-black/5 shadow-sm p-8 md:p-16 lg:p-24"
          style={{ 
            backgroundImage: "linear-gradient(114.58deg, #D1E9FF -1.34%, rgba(255, 222, 253, 0.56) 24.05%, #F7F7F7 74.82%)" 
          }}
        >
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_320px] lg:gap-16 relative z-10">
            <div className="flex flex-col items-start text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-8"
              >
                <div className="narrative-microlabel !opacity-100 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-black/5 shadow-sm inline-block">
                  Mobile App Redesign | 2026
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="hero-title mb-6 max-w-2xl"
              >
                Whering | <span className="text-plum">Reframing a Digital Wardrobe</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="narrative-body !text-lg !leading-snug text-primary/80 mb-12 max-w-xl"
              >
                I loved Whering&apos;s promise: fall back in love with what you already own. This
                redesign explores how the app could make that promise easier to act on through
                clearer navigation, a simpler Collection model, and a stronger discovery loop.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mb-12 flex flex-wrap gap-x-12 gap-y-6"
              >
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="card-microlabel mb-1 !opacity-100 !text-primary">
                      {stat.label}
                    </p>
                    <p className="card-heading !text-[15px]">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="#overview"
                  className="cursor-pointer bg-[#1F1F1F] px-8 py-3.5 rounded-full text-[15px] font-bold text-white no-underline transition-all hover:bg-[#0a0a0a] shadow-md hover:shadow-lg"
                >
                  Read Case Study
                </a>
                <a
                  href="#designs"
                  className="cursor-pointer border border-[#E8E5E6] bg-white px-8 py-3.5 rounded-full text-[15px] font-bold text-[#1F1F1F] no-underline transition-all hover:border-[#1F1F1F] shadow-sm"
                >
                  View Screens
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center lg:justify-end"
            >
              <motion.a
                href={FIGMA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block no-underline"
              >
                <div className="absolute inset-x-10 bottom-0 h-12 rounded-full bg-[#3D2B4C]/20 blur-3xl opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="relative transition-transform duration-500 group-hover:-translate-y-2">
                  <div className="relative h-[480px] w-[240px] overflow-hidden rounded-[36px] border-[6px] border-[#2A1E36] bg-[#3D2B4C] shadow-[0_32px_64px_rgba(0,0,0,0.2)]">
                    <Image
                      src="/images/placeholder-iphone.svg"
                      alt="Project splash screen mockup"
                      fill
                      priority
                      className="object-cover"
                    />
                    <div className="absolute left-1/2 top-0 z-10 h-6 w-24 -translate-x-1/2 rounded-b-[18px] bg-[#2A1E36]" />
                  </div>

                  <div
                    className="absolute -right-6 top-16 flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/40 shadow-lg text-lg backdrop-blur-md"
                    style={{ rotate: "12deg" }}
                  >
                    UX
                  </div>
                  <div
                    className="absolute -left-6 bottom-20 flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/40 shadow-lg text-lg backdrop-blur-md"
                    style={{ rotate: "-10deg" }}
                  >
                    IA
                  </div>
                </div>
                <p className="mt-6 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#6B6B6B] group-hover:text-[#3D2B4C] transition-colors">
                  Open Interactive Figma
                </p>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
