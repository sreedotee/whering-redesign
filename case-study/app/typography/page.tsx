"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ─── Type scale data ──────────────────────────────────────────────────────────

const displayScale = [
  { name: "Hero XL",         baseSize: 200, weight: 500, lineHeight: 0.9,  usage: "Hero title — desktop" },
  { name: "Hero LG",         baseSize: 120, weight: 500, lineHeight: 0.9,  usage: "Hero title — tablet" },
  { name: "Hero SM",         baseSize: 72,  weight: 500, lineHeight: 1.0,  usage: "Hero title — mobile" },
  { name: "Section Title",   baseSize: 48,  weight: 600, lineHeight: 1.1,  usage: "Section h2 — desktop (text-5xl)" },
  { name: "Section Title S", baseSize: 36,  weight: 600, lineHeight: 1.1,  usage: "Section h2 — mobile (text-4xl)" },
  { name: "Subtitle LG",     baseSize: 25,  weight: 400, lineHeight: 1.3,  usage: "Section subtitle — desktop" },
  { name: "Subtitle",        baseSize: 24,  weight: 400, lineHeight: 1.3,  usage: "Section subtitle — text-2xl" },
  { name: "Card Heading",    baseSize: 24,  weight: 500, lineHeight: 1.3,  usage: "Block / card headings — text-2xl" },
  { name: "Card Heading S",  baseSize: 20,  weight: 500, lineHeight: 1.3,  usage: "Block / card headings — text-xl" },
  { name: "Card Heading XS", baseSize: 18,  weight: 500, lineHeight: 1.3,  usage: "Block / card headings — text-lg" },
];

const bodyScale = [
  { name: "Body XL",  baseSize: 20, weight: 400, lineHeight: 1.65, usage: "Body copy — desktop (text-[20px])" },
  { name: "Body LG",  baseSize: 18, weight: 400, lineHeight: 1.65, usage: "Body copy — text-lg" },
  { name: "Body",     baseSize: 17, weight: 400, lineHeight: 1.65, usage: "Body copy — text-[17px]" },
  { name: "Body SM",  baseSize: 16, weight: 400, lineHeight: 1.6,  usage: "Default body — text-base" },
  { name: "Body XS",  baseSize: 14, weight: 400, lineHeight: 1.5,  usage: "Small body — text-sm" },
  { name: "Nav",      baseSize: 14, weight: 500, lineHeight: 1.0,  usage: "Navigation links — text-sm font-medium" },
  { name: "Label",    baseSize: 13, weight: 400, lineHeight: 1.4,  usage: "Values / data labels — text-[13px]" },
  { name: "Caption",  baseSize: 12, weight: 400, lineHeight: 1.4,  usage: "Captions — text-xs" },
  { name: "Micro",    baseSize: 11, weight: 400, lineHeight: 1.4,  usage: "Timeline labels — text-[11px]" },
  { name: "Nano",     baseSize: 10, weight: 500, lineHeight: 1.4,  usage: "Uppercase badge labels — text-[10px]" },
];

const WEIGHT_LABELS: Record<number, string> = {
  400: "Regular",
  500: "Medium",
  600: "Semibold",
  700: "Bold",
};

const PREVIEW_TEXT = "The quick brown fox jumps";
const PREVIEW_LONG = "Designing AI-powered experiences that feel natural and effortlessly personal.";

// ─── Main page ────────────────────────────────────────────────────────────────

export default function TypographyPage() {
  const [scale, setScale] = useState(1);
  const [displayMult, setDisplayMult] = useState(1);
  const [bodyMult, setBodyMult] = useState(1);
  const [showLong, setShowLong] = useState(false);
  const [tab, setTab] = useState<"all" | "display" | "body">("all");
  const [panelOpen, setPanelOpen] = useState(true);

  const applyScale = useCallback(
    (base: number, category: "display" | "body") => {
      const mult = category === "display" ? displayMult : bodyMult;
      return Math.round(base * scale * mult);
    },
    [scale, displayMult, bodyMult]
  );

  const isModified = scale !== 1 || displayMult !== 1 || bodyMult !== 1;
  const preview = showLong ? PREVIEW_LONG : PREVIEW_TEXT;

  return (
    <div className="min-h-screen bg-[#FAF9FA]">

      {/* ── Nav bar ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#E8E5E6]"
        style={{ height: 64 }}
      >
        <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
          <Link href="/" className="font-clash text-2xl font-semibold text-[#3D2B4C]">
            Atelia
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {[
              { href: "/#overview",   label: "Overview" },
              { href: "/#research",   label: "Research" },
              { href: "/#framework",  label: "Framework" },
              { href: "/#decisions",  label: "Decisions" },
              { href: "/#designs",    label: "Designs" },
              { href: "/#validation", label: "Validation" },
              { href: "/#reflection", label: "Reflection" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#5C5759] hover:text-[#3D2B4C] relative group transition-colors"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#3D2B4C] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <span className="text-sm font-semibold text-[#3D2B4C] border-b border-[#3D2B4C] pb-[1px]">
              Typography
            </span>
          </nav>

          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-[#5C5759] hover:text-[#3D2B4C] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back
          </Link>
        </div>
      </header>

      {/* ── Page content ── */}
      <main className="max-w-[1200px] mx-auto px-6 pt-[96px] pb-32">

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#3D2B4C]/60 mb-3">
            Design System
          </p>
          <h1 className="font-clash text-5xl font-semibold text-[#1D1A1C] mb-4">
            Typography
          </h1>
          <p className="text-lg text-[#5C5759] max-w-xl">
            All font sizes and weights used across the site. Use the{" "}
            <button
              onClick={() => setPanelOpen(true)}
              className="text-[#3D2B4C] font-medium underline underline-offset-2 hover:no-underline"
            >
              Customise panel
            </button>{" "}
            to preview different scales.
          </p>
        </motion.div>

        {/* Tabs + preview toggle */}
        <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
          <div className="flex gap-1 p-1 bg-[#F0EDF1] rounded-lg">
            {(["all", "display", "body"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-all ${
                  tab === t
                    ? "bg-white shadow-sm text-[#3D2B4C]"
                    : "text-[#5C5759] hover:text-[#3D2B4C]"
                }`}
              >
                {t === "all" ? "All" : t === "display" ? "Clash Display" : "DM Sans"}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Scale badge */}
            {isModified && (
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-[11px] font-medium px-2.5 py-1 bg-[#3D2B4C]/10 text-[#3D2B4C] rounded-full"
              >
                {Math.round(scale * 100)}% global
              </motion.span>
            )}

            {/* Long preview toggle */}
            <button
              onClick={() => setShowLong(!showLong)}
              className="text-xs text-[#5C5759] hover:text-[#3D2B4C] flex items-center gap-1.5 transition-colors"
            >
              <span className={`inline-block w-7 h-4 rounded-full transition-colors ${showLong ? "bg-[#3D2B4C]" : "bg-[#E8E5E6]"}`}>
                <span className={`block w-3 h-3 bg-white rounded-full mt-0.5 transition-transform ${showLong ? "translate-x-3.5" : "translate-x-0.5"}`} />
              </span>
              Long preview
            </button>
          </div>
        </div>

        {/* Clash Display specimens */}
        {(tab === "all" || tab === "display") && (
          <section className="mb-12">
            {tab === "all" && (
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3D2B4C]/50">
                  Clash Display
                </span>
                <div className="flex-1 h-px bg-[#E8E5E6]" />
              </div>
            )}
            <div className="space-y-1">
              {displayScale.map((item, i) => {
                const size = applyScale(item.baseSize, "display");
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03, duration: 0.35 }}
                    className="group border border-transparent hover:border-[#E8E5E6] hover:bg-white rounded-xl px-4 py-4 transition-all"
                  >
                    <div className="flex items-start gap-4 mb-2">
                      <div className="min-w-[180px]">
                        <p className="text-xs font-medium text-[#3D2B4C] mb-0.5">{item.name}</p>
                        <p className="text-[11px] text-[#9C9599]">
                          {size}px · {WEIGHT_LABELS[item.weight]} · {item.lineHeight}lh
                        </p>
                      </div>
                      <p className="text-[11px] text-[#9C9599] pt-0.5 hidden sm:block truncate max-w-xs">
                        {item.usage}
                      </p>
                    </div>
                    <p
                      className="font-clash text-[#1D1A1C] overflow-hidden"
                      style={{ fontSize: `${size}px`, fontWeight: item.weight, lineHeight: item.lineHeight }}
                    >
                      {size > 60 ? "Atelia" : preview}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </section>
        )}

        {/* DM Sans specimens */}
        {(tab === "all" || tab === "body") && (
          <section className="mb-20">
            {tab === "all" && (
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3D2B4C]/50">
                  DM Sans
                </span>
                <div className="flex-1 h-px bg-[#E8E5E6]" />
              </div>
            )}
            <div className="space-y-1">
              {bodyScale.map((item, i) => {
                const size = applyScale(item.baseSize, "body");
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 + 0.1, duration: 0.35 }}
                    className="group border border-transparent hover:border-[#E8E5E6] hover:bg-white rounded-xl px-4 py-4 transition-all"
                  >
                    <div className="flex items-start gap-4 mb-2">
                      <div className="min-w-[180px]">
                        <p className="text-xs font-medium text-[#3D2B4C] mb-0.5">{item.name}</p>
                        <p className="text-[11px] text-[#9C9599]">
                          {size}px · {WEIGHT_LABELS[item.weight]} · {item.lineHeight}lh
                        </p>
                      </div>
                      <p className="text-[11px] text-[#9C9599] pt-0.5 hidden sm:block truncate max-w-xs">
                        {item.usage}
                      </p>
                    </div>
                    <p
                      className="text-[#1D1A1C]"
                      style={{ fontSize: `${size}px`, fontWeight: item.weight, lineHeight: item.lineHeight }}
                    >
                      {preview}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </section>
        )}

        {/* Weight specimens */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3D2B4C]/50">
              Weight specimens
            </span>
            <div className="flex-1 h-px bg-[#E8E5E6]" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white border border-[#E8E5E6] rounded-2xl p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-[#3D2B4C]/50 mb-5">Clash Display</p>
              <div className="space-y-4">
                {[400, 500, 600, 700].map((w) => (
                  <div key={w}>
                    <p className="font-clash text-[28px] text-[#1D1A1C]" style={{ fontWeight: w }}>
                      Atelia Design
                    </p>
                    <p className="text-[11px] text-[#9C9599] mt-0.5">{WEIGHT_LABELS[w]} · {w}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white border border-[#E8E5E6] rounded-2xl p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-[#3D2B4C]/50 mb-5">DM Sans</p>
              <div className="space-y-4">
                {[400, 500, 600].map((w) => (
                  <div key={w}>
                    <p className="text-[28px] text-[#1D1A1C]" style={{ fontWeight: w }}>
                      The quick brown fox
                    </p>
                    <p className="text-[11px] text-[#9C9599] mt-0.5">{WEIGHT_LABELS[w]} · {w}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Colour hierarchy */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3D2B4C]/50">
              Text colour hierarchy
            </span>
            <div className="flex-1 h-px bg-[#E8E5E6]" />
          </div>
          <div className="bg-white border border-[#E8E5E6] rounded-2xl p-8 space-y-6">
            {[
              { label: "Primary",   color: "#1D1A1C", sample: "Section headings, main body copy" },
              { label: "Secondary", color: "#5C5759", sample: "Navigation, captions, supporting text" },
              { label: "Tertiary",  color: "#7D767A", sample: "Placeholders, disabled states" },
              { label: "Subtle",    color: "#9C9599", sample: "Metadata, timestamps, micro labels" },
              { label: "Accent",    color: "#3D2B4C", sample: "Links, brand elements, active states" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-5">
                <div className="w-8 h-8 rounded-lg shrink-0" style={{ backgroundColor: item.color }} />
                <div className="min-w-[100px]">
                  <p className="text-xs font-medium text-[#3D2B4C]">{item.label}</p>
                  <p className="text-[11px] text-[#9C9599] font-mono">{item.color}</p>
                </div>
                <p className="text-lg" style={{ color: item.color }}>
                  {item.sample}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ── Fixed floating customiser panel ────────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

        {/* Panel */}
        <AnimatePresence>
          {panelOpen && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="w-72 bg-white border border-[#E8E5E6] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-[#F0EDF1]">
                <div>
                  <h2 className="font-clash text-base font-semibold text-[#1D1A1C]">Customise</h2>
                  <p className="text-[11px] text-[#9C9599] mt-0.5">Drag sliders to adjust scale</p>
                </div>
                <button
                  onClick={() => setPanelOpen(false)}
                  className="w-7 h-7 rounded-full bg-[#F0EDF1] flex items-center justify-center text-[#5C5759] hover:bg-[#E8E5E6] transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Sliders */}
              <div className="px-5 py-5 space-y-5">
                <SliderField
                  label="Global scale"
                  value={scale}
                  min={0.5}
                  max={1.5}
                  step={0.01}
                  onChange={setScale}
                  display={`${Math.round(scale * 100)}%`}
                  accent="#3D2B4C"
                />

                <div className="h-px bg-[#F0EDF1]" />

                <SliderField
                  label="Clash Display offset"
                  value={displayMult}
                  min={0.5}
                  max={1.5}
                  step={0.01}
                  onChange={setDisplayMult}
                  display={`${Math.round(displayMult * 100)}%`}
                  accent="#6633a0"
                />

                <div className="h-px bg-[#F0EDF1]" />

                <SliderField
                  label="DM Sans offset"
                  value={bodyMult}
                  min={0.5}
                  max={1.5}
                  step={0.01}
                  onChange={setBodyMult}
                  display={`${Math.round(bodyMult * 100)}%`}
                  accent="#2b6cb0"
                />
              </div>

              {/* Footer */}
              <div className="px-5 pb-5">
                <button
                  onClick={() => { setScale(1); setDisplayMult(1); setBodyMult(1); }}
                  disabled={!isModified}
                  className={`w-full py-2 rounded-lg border text-sm font-medium transition-all ${
                    isModified
                      ? "border-[#3D2B4C]/30 text-[#3D2B4C] hover:bg-[#3D2B4C]/5"
                      : "border-[#E8E5E6] text-[#9C9599] cursor-not-allowed"
                  }`}
                >
                  Reset to defaults
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle button */}
        <motion.button
          onClick={() => setPanelOpen(!panelOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2 px-4 h-10 rounded-full shadow-[0_4px_16px_rgba(61,43,76,0.25)] text-sm font-medium text-white transition-colors ${
            panelOpen ? "bg-[#3D2B4C]/70" : "bg-[#3D2B4C]"
          }`}
        >
          {/* Sliders icon */}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
            <circle cx="9" cy="6" r="2" fill="white" stroke="white" />
            <circle cx="15" cy="12" r="2" fill="white" stroke="white" />
            <circle cx="10" cy="18" r="2" fill="white" stroke="white" />
          </svg>
          Customise
          {isModified && (
            <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
          )}
        </motion.button>
      </div>

    </div>
  );
}

// ─── SliderField ──────────────────────────────────────────────────────────────

function SliderField({
  label, value, min, max, step, onChange, display, accent,
}: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; display: string; accent: string;
}) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-2">
        <label className="text-xs font-medium text-[#1D1A1C]">{label}</label>
        <span className="text-xs font-semibold tabular-nums" style={{ color: accent }}>
          {display}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, ${accent} 0%, ${accent} ${
            ((value - min) / (max - min)) * 100
          }%, #E8E5E6 ${((value - min) / (max - min)) * 100}%, #E8E5E6 100%)`,
          accentColor: accent,
        }}
      />
      <div className="flex justify-between text-[10px] text-[#9C9599] mt-1">
        <span>{Math.round(min * 100)}%</span>
        <span>{Math.round(max * 100)}%</span>
      </div>
    </div>
  );
}
