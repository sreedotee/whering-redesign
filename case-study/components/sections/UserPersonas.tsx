"use client";

import { motion } from "framer-motion";
import SectionHeader from "../SectionHeader";
import { fadeInUp } from "@/styles/animations";

const personas = [
  {
    name: "Sarah",
    title: "The Cross-Store Shopper",
    tag: "Primary User",
    age: "28",
    occupation: "Marketing Manager",
    painPoint:
      "Disorganized saving across screenshots, browser tabs, wishlists, and Pinterest boards.",
    needs:
      "One place to save from anywhere, then decide with confidence before buying.",
    behaviors: [
      "Browses 5+ retailers per shopping trip",
      "Screenshots items and sends them to friends",
      "Uses 3-4 different platforms to save items",
    ],
    quote:
      "I can't find saved items when I need them, and I waste time searching through multiple apps.",
  },
  {
    name: "Maya",
    title: "The Occasion Planner",
    tag: "Secondary User",
    age: "25",
    occupation: "Event Coordinator",
    painPoint:
      "Organizes by occasion but cannot visualize complete outfits before ordering.",
    needs:
      "Occasion-based organization and a way to preview complete looks together.",
    behaviors: [
      "Creates Pinterest boards for different events",
      "Orders multiple sizes and returns what doesn't work",
      "Sends outfit photos to trusted friends before committing",
    ],
    quote:
      "I can't tell if items will work together until they arrive. High return rate due to visual uncertainty.",
  },
  {
    name: "Jade",
    title: "The Experimental Player",
    tag: "Tertiary User",
    age: "30",
    occupation: "Freelance Creative",
    painPoint:
      "Has lots of saved items but struggles to test combinations across them mentally.",
    needs:
      "A playful way to mix and match across everything already saved.",
    behaviors: [
      "Collects interesting items impulsively",
      "Loves trying different combinations",
      "Shares outfit inspirations on social media",
    ],
    quote:
      "Hard to mentally combine items across all my saves. Can't easily test combinations without physical try-on.",
  },
];

export default function UserPersonas() {
  const primaryPersona = personas[0];
  const secondaryPersonas = personas.slice(1);

  return (
    <section id="user-personas" className="py-10 bg-white">
      <div className="container-standard">
        <SectionHeader number="" title="User Personas & Primary Users" tight />

        <motion.p
          {...fadeInUp}
          className="text-base font-medium text-[#6B6B6B] leading-[27.2px] mb-8 max-w-2xl"
        >
          Based on research interviews and card sorting, I identified three
          distinct user types. Atelia is designed primarily for Sarah, but serves
          all three personas.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-10"
        >
          {/* Primary Persona */}
          <div className="rounded-[32px] p-8 bg-[#F5F5F7] border border-black/5 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            {/* LEFT: Identity cluster */}
            <div className="flex flex-col gap-5">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center border border-black/5 shadow-sm text-2xl font-medium text-[#1F1F1F]">
                {primaryPersona.name[0]}
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-[#3D2B4C] uppercase tracking-widest px-2 py-0.5 rounded-full bg-white border border-[#3D2B4C]/10 inline-block">
                  {primaryPersona.tag}
                </span>
                <h3 className="text-[28px] leading-tight font-medium text-[#1F1F1F]">{primaryPersona.name}</h3>
                <p className="text-sm text-[#6B6B6B]">{primaryPersona.title}</p>
              </div>
              {/* Mini ledger: Age / Role */}
              <div className="mt-2 pt-4 border-t border-black/10 space-y-2.5">
                <div className="grid grid-cols-[60px_1fr] items-center">
                  <span className="text-[10px] font-bold text-[#3D2B4C]/50 uppercase tracking-widest">Age</span>
                  <span className="text-sm font-medium text-[#1F1F1F]">{primaryPersona.age} yrs</span>
                </div>
                <div className="grid grid-cols-[60px_1fr] items-center">
                  <span className="text-[10px] font-bold text-[#3D2B4C]/50 uppercase tracking-widest">Role</span>
                  <span className="text-sm font-medium text-[#1F1F1F]">{primaryPersona.occupation}</span>
                </div>
              </div>
            </div>

            {/* RIGHT: Data-sheet (single white card, internal dividers only) */}
            <div className="rounded-2xl bg-white border border-black/5 shadow-sm flex flex-col h-full overflow-hidden">
              {/* Quote — top section */}
              <div className="p-6">
                <p className="text-[10px] font-bold text-[#3D2B4C]/50 uppercase tracking-widest mb-3">In Their Words</p>
                <p className="text-[20px] leading-snug font-medium text-[#1F1F1F] italic">
                  &ldquo;{primaryPersona.quote}&rdquo;
                </p>
              </div>
              {/* Behaviors — ledger style with row separators */}
              <div className="px-6 py-5 border-t border-black/5">
                <p className="text-[10px] font-bold text-[#3D2B4C]/50 uppercase tracking-widest mb-3">Behaviors</p>
                <div className="divide-y divide-black/5">
                  {primaryPersona.behaviors.map((b, idx) => (
                    <div key={b} className="py-2.5 grid grid-cols-[24px_1fr] items-start gap-2">
                      <span className="text-[10px] text-[#3D2B4C]/40 mt-0.5">0{idx + 1}</span>
                      <span className="text-sm text-[#6B6B6B] leading-relaxed">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Pain Point — highlighted callout, accent left border */}
              <div className="px-6 py-5 mt-auto border-t border-black/5 bg-[#FBF7F7] border-l-2 border-l-[#E04D4D]/40">
                <p className="text-[10px] font-bold text-[#E04D4D]/70 uppercase tracking-widest mb-2">Pain Point</p>
                <p className="text-sm leading-relaxed text-[#6B6B6B] italic">{primaryPersona.painPoint}</p>
              </div>
            </div>
          </div>

          {/* Secondary Personas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {secondaryPersonas.map((persona, i) => (
              <motion.div
                key={persona.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-white border border-black/5 shadow-sm p-6 grid grid-cols-[56px_1fr] gap-5 items-start h-full"
              >
                <div className="w-14 h-14 rounded-full bg-[#F5F5F7] flex items-center justify-center border border-black/5 text-lg font-medium text-[#1F1F1F]">
                  {persona.name[0]}
                </div>
                <div className="space-y-3 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold text-[#3D2B4C]/50 uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#F5F5F7] border border-black/5">
                      {persona.tag}
                    </span>
                    <span className="text-[10px] text-[#3D2B4C]/40">{persona.age} · {persona.occupation}</span>
                  </div>
                  <h3 className="text-xl font-medium text-[#1F1F1F] leading-tight">{persona.name}</h3>
                  <p className="text-sm text-[#1F1F1F] font-medium leading-snug">{persona.needs}</p>
                  <p className="text-xs text-[#6B6B6B] leading-relaxed pt-3 border-t border-black/5 italic">
                    {persona.painPoint}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-8 pt-6 border-t border-[#E8E5E6] text-sm leading-relaxed text-[#6B6B6B]"
        >
          All three personas share the same underlying tension: they are making purchase decisions
          without enough visual confidence. Sarah is the clearest primary user, while Maya validates
          occasion-based organization and Jade points toward experimentation and future sharing behavior.
        </motion.p>
      </div>
    </section>
  );
}
