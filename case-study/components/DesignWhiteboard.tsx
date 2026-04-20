"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { decisions, decisionsByMode } from "@/data/decisions";
import DecisionModal from "./DecisionModal";
import SectionHeader from "./SectionHeader";
import { stickyRotations } from "@/styles/animations";
import EmojiImage from "./EmojiImage";

interface DesignWhiteboardProps {
  mode: "mode1" | "mode2" | "mode3" | "system";
  sectionNumber: string;
  title: string;
  subtitle: string;
  description: string;
  bg?: string;
}

const modeDecisionIds: Record<string, string[]> = {
  mode1: decisionsByMode.mode1,
  mode2: decisionsByMode.mode2,
  mode3: decisionsByMode.mode3,
  system: decisionsByMode.system,
};

export default function DesignWhiteboard({
  mode,
  sectionNumber,
  title,
  subtitle,
  description,
  bg = "bg-white",
}: DesignWhiteboardProps) {
  const [openDecisionId, setOpenDecisionId] = useState<string | null>(null);

  const decisionIds = modeDecisionIds[mode] || [];
  const currentIndex = openDecisionId ? decisionIds.indexOf(openDecisionId) : -1;

  const openModal = (id: string) => setOpenDecisionId(id);
  const closeModal = () => setOpenDecisionId(null);

  const prevDecision = () => {
    if (currentIndex > 0) {
      setOpenDecisionId(decisionIds[currentIndex - 1]);
    } else {
      setOpenDecisionId(decisionIds[decisionIds.length - 1]);
    }
  };

  const nextDecision = () => {
    if (currentIndex < decisionIds.length - 1) {
      setOpenDecisionId(decisionIds[currentIndex + 1]);
    } else {
      setOpenDecisionId(decisionIds[0]);
    }
  };

  const cols = mode === "system" ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2 md:grid-cols-3";

  return (
    <section className={`py-4 ${bg}`} id={`decisions-${mode}`}>
      <div className="container-standard">
        <SectionHeader number={sectionNumber} title={title} subtitle={subtitle} />

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="narrative-body mb-16 max-w-2xl"
        >
          {description}
        </motion.p>

        {/* Whiteboard */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="whiteboard-bg rounded-2xl p-10 border border-black/5"
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-10">
            <EmojiImage name="palette" size={24} alt="palette" />
            <div>
              <h3 className="card-heading">
                Design Decisions
              </h3>
              <p className="card-supporting">
                Click any sticky note to explore the decision rationale
              </p>
            </div>
          </div>

          {/* Sticky notes grid */}
          <div className={`grid ${cols} gap-4`}>
            {decisionIds.map((id, i) => {
              const decision = decisions[id];
              if (!decision) return null;

              const rotation = stickyRotations[i % stickyRotations.length];

              return (
                <motion.button
                  key={id}
                  onClick={() => openModal(id)}
                  className="sticky-note group"
                  style={{ transform: `rotate(${rotation}deg)` }}
                  whileHover={{
                    rotate: 0,
                    scale: 1.05,
                    zIndex: 10,
                  }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  {/* Category label */}
                  <span className="card-microlabel !text-[#7D767A]">
                    {decision.category}
                  </span>
                  {/* Title */}
                  <span className="card-heading !text-[13px] mt-2 block">
                    {decision.title}
                  </span>
                  {/* Body / summary */}
                  {decision.summary && (
                    <span className="card-supporting mt-2 block italic !leading-tight !text-primary/60">
                      {decision.summary}
                    </span>
                  )}

                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Decision Modal */}
      <DecisionModal
        decision={openDecisionId ? decisions[openDecisionId] : null}
        isOpen={!!openDecisionId}
        onClose={closeModal}
        onPrev={prevDecision}
        onNext={nextDecision}
        currentIndex={currentIndex}
        total={decisionIds.length}
      />
    </section>
  );
}
