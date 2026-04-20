"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import DesignWhiteboard from "@/components/DesignWhiteboard";
import SectionHeader from "@/components/SectionHeader";

type ModeKey = "mode1" | "mode2" | "mode3" | "system";

const MODES: Record<ModeKey, { microlabel: string; label: string }> = {
  mode1: { microlabel: "Promise and hierarchy", label: "AUDIT" },
  mode2: { microlabel: "Navigation and mental models", label: "STRUCTURE" },
  mode3: { microlabel: "Discovery and wardrobe loop", label: "LOOP" },
  system: { microlabel: "Cross-Cutting Choices", label: "SYSTEM" },
};

function SegmentedControl({
  items,
  activeKey,
  onSelect,
}: {
  items: { key: string; label: string }[];
  activeKey: string;
  onSelect: (key: string) => void;
}) {
  return (
    <div className="flex gap-0 rounded-2xl p-1 w-fit" style={{ backgroundColor: "#F0F0F0" }}>
      {items.map((item) => {
        const isActive = item.key === activeKey;
        return (
          <button
            key={item.key}
            onClick={() => onSelect(item.key)}
            className="relative w-28 py-2.5 text-sm font-medium rounded-xl transition-colors duration-200 text-center"
            style={{
              color: isActive ? "#FFFFFF" : "#6B6B6B",
            }}
          >
            {isActive && (
              <motion.div
                layoutId="mode-decisions-pill"
                className="absolute inset-0 bg-[#1F1F1F] rounded-xl z-0"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10 card-body">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function ModeDecisions() {
  const [activeMode, setActiveMode] = useState<ModeKey>("mode1");
  const activeConfig = MODES[activeMode];
  const isSystem = activeMode === "system";

  return (
    <section className="py-10 bg-white">
      <div className="container-standard">
        <SectionHeader
          number="05"
          title="Design Decisions"
          subtitle={`Mode: ${activeConfig.label}`}
        />

        {/* Segmented Control */}
        <div className="mb-6">
          <SegmentedControl
            items={(Object.entries(MODES) as [ModeKey, typeof MODES[ModeKey]][]).map(
              ([modeKey, config]) => ({
                key: modeKey,
                label: config.label,
              })
            )}
            activeKey={activeMode}
            onSelect={(key) => setActiveMode(key as ModeKey)}
          />
        </div>

        {/* Content */}
        <DesignWhiteboard
          mode={activeMode}
          sectionNumber=""
          title="Design Decisions"
          subtitle={
            isSystem ? "System-Level Decisions" : `Mode: ${activeConfig.label}`
          }
          description={
            isSystem
              ? "System-level decisions that shaped the app's structure, terminology, and strategic positioning. These choices defined how discovery, collections, wardrobe, and creation relate."
              : `Key choices that shaped the ${activeConfig.microlabel.toLowerCase()} experience. Click any sticky note to explore the rationale, options considered, and impact of each decision.`
          }
        />
      </div>
    </section>
  );
}
