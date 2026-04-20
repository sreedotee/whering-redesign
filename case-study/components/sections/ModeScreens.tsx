"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import ModeDesigns from "@/components/sections/ModeDesigns";
import SectionHeader from "@/components/SectionHeader";

interface Screen {
  title: string;
  caption: string;
  bg: string;
  icon: string;
  imageSrc?: string;
  scrollable?: boolean;
  slideshow?: string[];
}

interface ModeData {
  modeTitle: string;
  subtitle: string;
  microlabel: string;
  intro: string;
  screens: Screen[];
  feature?: { icon: string; title: string; text: string };
  flowSteps?: string[];
}

interface ModeScreensProps {
  mode1Data: ModeData;
  mode2Data: ModeData;
  mode3Data: ModeData;
}

type ModeKey = "mode1" | "mode2" | "mode3";

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
                layoutId="mode-screens-pill"
                className="absolute inset-0 bg-[#1F1F1F] rounded-xl z-0"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className={`relative z-10 card-body ${isActive ? '!text-white' : ''}`}>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function ModeScreens({
  mode1Data,
  mode2Data,
  mode3Data,
}: ModeScreensProps) {
  const [activeMode, setActiveMode] = useState<ModeKey>("mode1");

  const modeConfig = useMemo<Record<ModeKey, ModeData>>(() => ({
    mode1: mode1Data,
    mode2: mode2Data,
    mode3: mode3Data,
  }), [mode1Data, mode2Data, mode3Data]);

  const activeConfig = modeConfig[activeMode];

  return (
    <section className="py-10 bg-white">
      <div className="container-standard">
        <SectionHeader
          number="05"
          title="Prototype Screens"
          subtitle="The redesigned system in screens"
        />

        {/* Segmented Control */}
        <div className="mb-8">
          <SegmentedControl
            items={useMemo(() => (Object.entries(modeConfig) as [ModeKey, ModeData][]).map(
              ([modeKey, config]) => ({
                key: modeKey,
                label: (config.modeTitle.split(": ")[1] || config.modeTitle).replace(" GENERATION", ""),
              })
            ), [modeConfig])}
            activeKey={activeMode}
            onSelect={(key) => setActiveMode(key as ModeKey)}
          />
        </div>

        {/* Content with smooth transition */}
        <div className="mt-8">
          <ModeDesigns
            id={`mode-${activeMode}-designs`}
            sectionNumber=""
            modeTitle={activeConfig.modeTitle}
            subtitle={activeConfig.subtitle}
            intro={activeConfig.intro}
            screens={activeConfig.screens}
            feature={activeConfig.feature}
            flowSteps={activeConfig.flowSteps}
          />
        </div>
      </div>
    </section>
  );
}
