"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";

interface Section {
  id: string;
  label: string;
  number: string;
  nested?: boolean;
}

const SECTIONS: Section[] = [
  { id: "overview",   label: "Overview",               number: "01" },
  { id: "research",   label: "Audit & Method",         number: "02" },
  { id: "solution",   label: "Redesign Direction",     number: "03" },
  { id: "designs",    label: "Prototype Screens",      number: "04" },
  { id: "reflection", label: "Reflection & Learnings", number: "05" },
];

// All DOM section IDs in page order, mapped to their visible SECTIONS index.
// Hidden sections map back to the nearest visible parent so its dot stays active.
const SCROLL_MAP: { id: string; visibleIndex: number }[] = [
  { id: "overview",   visibleIndex: 0 },
  { id: "research",   visibleIndex: 1 },
  { id: "solution",   visibleIndex: 2 },
  { id: "designs",    visibleIndex: 3 },
  { id: "reflection", visibleIndex: 4 },
];

// Dot sizes: main 13px, nested 9px
// Dot wrapper: w-4 (16px) so center is 8px from wrapper edge
// Button: pr-4 (16px) → dot center = 16+8 = 24px from sidebar right edge
// Line positioned at right: 23px (centers 2px line at 24px from right)
const LINE_RIGHT = 23;

const accent = "#3D2B4C";
const track  = "#DDD9DE";

function SectionDot({
  isCompleted,
  isCurrent,
  dotSize,
  progress,
}: {
  isCompleted: boolean;
  isCurrent: boolean;
  dotSize: number;
  progress: ReturnType<typeof useSpring>;
}) {
  const r = dotSize / 2;
  const svgSize = dotSize + 4;
  const cx = svgSize / 2;
  const cy = svgSize / 2;
  const circ = 2 * Math.PI * r;
  const dashOffset = useTransform(progress, (p) => circ - circ * Math.max(0.04, p));

  return (
    <AnimatePresence mode="wait">
      {isCompleted && (
        <motion.div
          key="done"
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.3, opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="rounded-full flex items-center justify-center translate-x-[-0.5px]"
          style={{ width: dotSize, height: dotSize, backgroundColor: accent }}
        >
          <svg
            width={Math.round(dotSize * 0.7)}
            height={Math.round(dotSize * 0.7)}
            viewBox="0 0 12 12"
            fill="none"
          >
            <motion.path
              d="M2.5 6L5 8.5L9.5 3.5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.28 }}
            />
          </svg>
        </motion.div>
      )}

      {isCurrent && (
        <motion.svg
          key="active"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.2 }}
          width={svgSize}
          height={svgSize}
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          style={{ transform: "rotate(-90deg)" }}
        >
          <circle cx={cx} cy={cy} r={r} fill="none" stroke={track} strokeWidth="1.5" />
          <motion.circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={accent}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={circ}
            style={{ strokeDashoffset: dashOffset }}
          />
        </motion.svg>
      )}

      {!isCompleted && !isCurrent && (
        <motion.div
          key="upcoming"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="rounded-full"
          style={{ width: dotSize, height: dotSize, border: `1.5px solid ${track}` }}
        />
      )}
    </AnimatePresence>
  );
}

export default function SectionTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const progress = useSpring(0, { stiffness: 120, damping: 24, mass: 0.4 });

  // Scroll-based active section tracking + smooth progress within section
  useEffect(() => {
    const update = () => {
      const threshold = window.innerHeight * 0.4;
      let current = 0;
      let currentTop = -Infinity;
      let nextTop = Infinity;
      for (let i = 0; i < SCROLL_MAP.length; i++) {
        const { id, visibleIndex } = SCROLL_MAP[i];
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top - threshold;
        if (top <= 0) {
          current = visibleIndex;
          currentTop = top;
        } else if (top < nextTop) {
          nextTop = top;
        }
      }
      setActiveIndex(current);
      // progress from 0 (just entered) to 1 (next section about to hit threshold)
      const span = nextTop - currentTop;
      const p = span > 0 && isFinite(span) ? Math.min(1, Math.max(0, -currentTop / span)) : 0;
      progress.set(p);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [progress]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <aside className="fixed left-0 top-0 h-screen z-50 w-[260px] hidden lg:flex flex-col bg-white border-r border-[#ECEAED]">

      {/* Brand header */}
      <div className="px-6 pt-7 pb-5 flex-shrink-0">
        <p className="text-[17px] font-semibold text-[#1F1F1F] leading-none tracking-[-0.01em]">
          Whering
        </p>
        <p className="text-[11px] font-medium text-[#8A7E92] mt-[6px] leading-none">
          Product Design Case Study
        </p>
      </div>

      <div className="mx-5 h-px bg-[#ECEAED] flex-shrink-0" />

      {/* Sections — scrollable */}
      <nav
        className="flex-1 overflow-y-auto py-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
      >
        {SECTIONS.map((section, i) => {
          const isCompleted = i < activeIndex;
          const isCurrent  = i === activeIndex;
          const isNested   = !!section.nested;
          const dotSize    = isNested ? 9 : 13;

          // Vertical line coloring
          const topColor    = i <= activeIndex ? accent : track;
          const bottomColor = i  < activeIndex ? accent : track;

          // Text colors
          const numColor = isCurrent
            ? accent
            : isCompleted
            ? "#B0A5B8"
            : "#D0CAD4";

          const nameColor = isCurrent
            ? "#1D1A1C"
            : isCompleted
            ? "#8A7E92"
            : "#C8C2CC";

          return (
            <div key={section.id} className="relative">
              {/* Line: top half (connects from previous dot to center of this dot) */}
              {i > 0 && (
                <div
                  className="absolute w-[2px] top-0"
                  style={{
                    right: LINE_RIGHT,
                    height: "50%",
                    backgroundColor: topColor,
                    transition: "background-color 0.3s",
                  }}
                />
              )}
              {/* Line: bottom half (connects from center of this dot to next dot) */}
              {i < SECTIONS.length - 1 && (
                <div
                  className="absolute w-[2px]"
                  style={{
                    right: LINE_RIGHT,
                    top: "50%",
                    height: "50%",
                    backgroundColor: bottomColor,
                    transition: "background-color 0.3s",
                  }}
                />
              )}

              {/* Row */}
              <button
                onClick={() => scrollTo(section.id)}
                className={`relative w-full flex items-start gap-0 text-left transition-colors duration-150
                  hover:bg-[#F7F5F8]
                  ${isCurrent ? "bg-[#F4F1F6]" : ""}
                  ${isNested ? "pl-8 pr-4 py-[9px]" : "pl-6 pr-4 py-[11px]"}`}
              >
                {/* Text */}
                <div className="flex-1 min-w-0 mr-3">
                  <p
                    className="text-[10px] font-medium tracking-[0.08em] mb-[3px] tabular-nums"
                    style={{ color: numColor, transition: "color 0.25s" }}
                  >
                    {section.number}
                  </p>
                  <p
                    className={`leading-[1.3] tracking-[-0.005em] ${
                      isNested ? "text-[12px]" : "text-[13px]"
                    } ${isCurrent ? "font-semibold" : "font-medium"}`}
                    style={{ color: nameColor, transition: "color 0.25s" }}
                  >
                    {section.label}
                  </p>
                </div>

                {/* Dot (aligned with the number baseline/center) */}
                <div className="relative z-10 flex-shrink-0 w-4 flex items-center justify-center pt-[9.5px]">
                  <SectionDot
                    isCompleted={isCompleted}
                    isCurrent={isCurrent}
                    dotSize={dotSize}
                    progress={progress}
                  />
                </div>
              </button>
            </div>
          );
        })}
      </nav>

      <div className="mx-5 h-px bg-[#ECEAED] flex-shrink-0" />
    </aside>
  );
}
