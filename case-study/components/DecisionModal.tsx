"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Decision } from "@/data/decisions";

interface DecisionModalProps {
  decision: Decision | null;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  total: number;
}

export default function DecisionModal({
  decision,
  isOpen,
  onClose,
  onPrev,
  onNext,
  currentIndex,
  total,
}: DecisionModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [isOpen, onClose, onPrev, onNext]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!decision) return null;

  const categoryColors: Record<string, { bg: string; text: string; dot: string }> = {
    "Navigation & IA":       { bg: "#EAF0F7", text: "#3A5A80", dot: "#3A5A80" },
    "Interaction Patterns":  { bg: "#EAF2EC", text: "#3A6349", dot: "#3A6349" },
    "Visual Design":         { bg: "#EFE9F5", text: "#6B4A8A", dot: "#6B4A8A" },
    "Product Decisions":     { bg: "#F5EEE5", text: "#8A5A30", dot: "#8A5A30" },
    "Product Strategy":      { bg: "#F5E9ED", text: "#8A3E55", dot: "#8A3E55" },
  };

  const cat = categoryColors[decision.category] ?? { bg: "#F0F0F0", text: "#555", dot: "#555" };

  const rows = [
    {
      label: "Problem",
      icon: "↯",
      iconColor: "#C14B4B",
      iconBg: "#FEF0F0",
      text: decision.problem ?? decision.context,
    },
    {
      label: "Decision",
      icon: "✓",
      iconColor: "#2E7D52",
      iconBg: "#EAF5EF",
      text: decision.decision ?? (decision.options.find((o) => o.chosen)?.text ?? ""),
    },
    {
      label: "Outcome",
      icon: "→",
      iconColor: "#3D2B4C",
      iconBg: "#EFE9F5",
      text: decision.outcome ?? decision.impact,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8"
          onClick={(e) => e.target === e.currentTarget && onClose()}
          style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(6px)" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-2xl w-full shadow-2xl flex flex-col"
            style={{ maxWidth: 560 }}
          >
            {/* Progress bar */}
            <div className="h-1 bg-[#E8E5E6] rounded-t-2xl shrink-0">
              <motion.div
                className="h-1 bg-[#3D2B4C] rounded-t-2xl"
                initial={{ width: 0 }}
                animate={{ width: `${((currentIndex + 1) / total) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Header */}
            <div className="shrink-0 px-6 pt-5 pb-4 border-b border-[#E8E5E6] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={onPrev}
                  className="w-8 h-8 rounded-full border border-[#E8E5E6] flex items-center justify-center text-[#5C5759] hover:bg-[#3D2B4C] hover:text-white hover:border-[#3D2B4C] transition-all"
                  aria-label="Previous decision"
                >
                  ←
                </button>
                <button
                  onClick={onNext}
                  className="w-8 h-8 rounded-full border border-[#E8E5E6] flex items-center justify-center text-[#5C5759] hover:bg-[#3D2B4C] hover:text-white hover:border-[#3D2B4C] transition-all"
                  aria-label="Next decision"
                >
                  →
                </button>
                <span className="card-supporting !text-xs ml-2">
                  {currentIndex + 1} of {total}
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#E8E5E6] flex items-center justify-center text-[#5C5759] hover:bg-[#3D2B4C] hover:text-white transition-all text-lg"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="px-6 pt-6 pb-7 flex flex-col gap-5">
              {/* Category badge */}
              <span
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full self-start"
                style={{ background: cat.bg, color: cat.text }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: cat.dot }}
                />
                {decision.category}
              </span>

              {/* Title */}
              <div>
                <h3 className="card-heading !text-xl mb-1">
                  {decision.title}
                </h3>
                {decision.summary && (
                  <p className="card-supporting italic">
                    {decision.summary}
                  </p>
                )}
              </div>

              {/* Divider */}
              <div className="h-px bg-[#F0EDEF]" />

              {/* Problem / Decision / Outcome rows */}
              <div className="flex flex-col gap-4">
                {rows.map((row) => (
                  <div key={row.label} className="flex gap-3 items-start">
                    {/* Icon */}
                    <span
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-sm font-bold mt-0.5"
                      style={{ background: row.iconBg, color: row.iconColor }}
                    >
                      {row.icon}
                    </span>
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="card-microlabel mb-1 opacity-60">
                        {row.label}
                      </p>
                      <p className="card-body !text-primary transform -translate-y-0.5">
                        {row.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="shrink-0 px-6 py-4 border-t border-[#E8E5E6] flex items-center justify-between">
              <div className="flex gap-3">
                <button
                  onClick={onPrev}
                  className="card-supporting font-medium hover:text-[#3D2B4C] transition-colors"
                >
                  ← Previous
                </button>
                <button
                  onClick={onNext}
                  className="card-supporting font-medium hover:text-[#3D2B4C] transition-colors"
                >
                  Next →
                </button>
              </div>
              <p className="card-supporting !text-xs">Use ← → keys to navigate</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
