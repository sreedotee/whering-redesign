"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type HeadingFont = "clash" | "georgia" | "sans";
type BodyFont    = "sans" | "georgia" | "system";
type Weight      = "400" | "500" | "600" | "700";
type Tab         = "style" | "sizes";
type PresetKey   = "compact" | "default" | "large" | "a11y";

interface SizeConfig {
  heroTitle:    number;
  pageTitle:    number;
  sectionTitle: number;
  heading:      number;
  bodyLarge:    number;
  body:         number;
  caption:      number;
  micro:        number;
  cardValue:    number;
  listText:     number;
}

type SizeKey = keyof SizeConfig;

interface Config {
  headingFont: HeadingFont;
  bodyFont:    BodyFont;
  weight:      Weight;
  sizes:       SizeConfig;
  locked:      boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const HEADING_FONTS: Record<HeadingFont, string> = {
  clash:   "var(--font-clash)",
  georgia: "'Georgia', 'Times New Roman', serif",
  sans:    "var(--font-dm-sans)",
};

const BODY_FONTS: Record<BodyFont, string> = {
  sans:    "var(--font-dm-sans)",
  georgia: "'Georgia', 'Times New Roman', serif",
  system:  "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
};

interface SizeDef {
  key:     SizeKey;
  label:   string;
  min:     number;
  max:     number;
  def:     number;
  lh:      number;
  isHead:  boolean;
  preview: string;
  cssVar:  string;
}

const SIZE_DEFS: SizeDef[] = [
  { key: "heroTitle",    label: "Hero Title",    min: 32, max: 120, def: 120, lh: 1.05, isHead: true,  preview: "Atelia",                              cssVar: "--hero-title-size"    },
  { key: "pageTitle",    label: "Page Title",    min: 24, max: 64,  def: 40,  lh: 1.1,  isHead: true,  preview: "AI Try-On Platform",                  cssVar: "--page-title-size"    },
  { key: "sectionTitle", label: "Section Title", min: 20, max: 48,  def: 24,  lh: 1.2,  isHead: true,  preview: "Typography System",                   cssVar: "--section-title-size" },
  { key: "heading",      label: "Heading",       min: 16, max: 32,  def: 20,  lh: 1.3,  isHead: true,  preview: "Card Heading",                        cssVar: "--heading-size"       },
  { key: "bodyLarge",    label: "Body Large",    min: 14, max: 24,  def: 18,  lh: 1.6,  isHead: false, preview: "Shoppers browse across many stores.",  cssVar: "--body-large-size"    },
  { key: "body",         label: "Body",          min: 12, max: 20,  def: 16,  lh: 1.5,  isHead: false, preview: "Shoppers browse across many stores.",  cssVar: "--body-size"          },
  { key: "caption",      label: "Caption",       min: 10, max: 16,  def: 12,  lh: 1.4,  isHead: false, preview: "Supporting caption text for context", cssVar: "--caption-size"       },
  { key: "micro",        label: "Micro",         min: 8,  max: 14,  def: 11,  lh: 1.4,  isHead: false, preview: "Label / Eyebrow",                     cssVar: "--micro-size"         },
  { key: "cardValue",   label: "Card Value",    min: 10, max: 18,  def: 13,  lh: 1.4,  isHead: false, preview: "Aspirational/social",                  cssVar: "--card-value-size"    },
  { key: "listText",    label: "List Text",     min: 10, max: 18,  def: 14,  lh: 1.5,  isHead: false, preview: "Saved = universal library of items",   cssVar: "--list-text-size"     },
];

const DEFAULT_SIZES: SizeConfig = {
  heroTitle: 120, pageTitle: 40, sectionTitle: 24, heading: 20,
  bodyLarge: 18, body: 16, caption: 12, micro: 11,
  cardValue: 13, listText: 14,
};

const PRESETS: Record<PresetKey, { label: string; sizes: SizeConfig }> = {
  compact: { label: "Compact", sizes: { heroTitle: 48, pageTitle: 28, sectionTitle: 22, heading: 17, bodyLarge: 15, body: 13, caption: 11, micro: 9,  cardValue: 11, listText: 12 } },
  default: { label: "Default", sizes: DEFAULT_SIZES },
  large:   { label: "Large",   sizes: { heroTitle: 80, pageTitle: 52, sectionTitle: 36, heading: 26, bodyLarge: 20, body: 18, caption: 14, micro: 12, cardValue: 15, listText: 16 } },
  a11y:    { label: "A11y",    sizes: { heroTitle: 88, pageTitle: 56, sectionTitle: 40, heading: 28, bodyLarge: 22, body: 19, caption: 15, micro: 13, cardValue: 16, listText: 17 } },
};

const DEFAULT: Config = {
  headingFont: "clash",
  bodyFont:    "sans",
  weight:      "500",
  sizes:       DEFAULT_SIZES,
  locked:      false,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function applyConfig(cfg: Config) {
  const r = document.documentElement;
  r.style.setProperty("--heading-font",   HEADING_FONTS[cfg.headingFont]);
  r.style.setProperty("--body-font",      BODY_FONTS[cfg.bodyFont]);
  r.style.setProperty("--heading-weight", cfg.weight);
  for (const d of SIZE_DEFS) {
    r.style.setProperty(d.cssVar, `${cfg.sizes[d.key]}px`);
  }
}

function fillPct(val: number, min: number, max: number) {
  return ((val - min) / (max - min)) * 100;
}

function sizesMatch(a: SizeConfig, b: SizeConfig) {
  return SIZE_DEFS.every((d) => a[d.key] === b[d.key]);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return <p className="micro text-[#7D767A] mb-2">{children}</p>;
}

function SectionDivider({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#B0A5B8", whiteSpace: "nowrap" }}>
        {children}
      </span>
      <div className="flex-1 h-px" style={{ background: "#F0ECF2" }} />
    </div>
  );
}

function FontChip({ active, fontFamily, label, previewChar = "Ag", onClick }: {
  active: boolean; fontFamily: string; label: string; previewChar?: string; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl border transition-all ${
        active
          ? "border-[#3D2B4C] bg-[#3D2B4C]/6 text-[#3D2B4C]"
          : "border-[#E8E5E6] text-[#5C5759] hover:border-[#3D2B4C]/40 hover:text-[#3D2B4C]"
      }`}
    >
      <span style={{ fontFamily, fontSize: 22, lineHeight: 1, fontWeight: 500, display: "block" }}>{previewChar}</span>
      <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</span>
    </button>
  );
}

function WeightChip({ active, label, weight, onClick }: {
  active: boolean; label: string; weight: string; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-2 rounded-lg border transition-all ${
        active
          ? "border-[#3D2B4C] bg-[#3D2B4C]/6 text-[#3D2B4C]"
          : "border-[#E8E5E6] text-[#7D767A] hover:border-[#3D2B4C]/40 hover:text-[#3D2B4C]"
      }`}
      style={{ fontFamily: "var(--font-clash)", fontSize: 13, fontWeight: Number(weight) }}
    >
      {label}
    </button>
  );
}

// ─── SizeSlider ───────────────────────────────────────────────────────────────

function ResetIcon({ active }: { active: boolean }) {
  const c = active ? "#3D2B4C" : "#D0CAD4";
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
      <path d="M4.5 1.5A3 3 0 1 0 7.5 4.5" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 1.5H7.5V3" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SizeSlider({ def, value, headingFont, bodyFont, headingWeight, onChange, onReset }: {
  def:           SizeDef;
  value:         number;
  headingFont:   string;
  bodyFont:      string;
  headingWeight: number;
  onChange:      (key: SizeKey, val: number) => void;
  onReset:       (key: SizeKey) => void;
}) {
  const pct       = fillPct(value, def.min, def.max);
  const isChanged = value !== def.def;
  const fontFamily = def.isHead ? headingFont : bodyFont;
  const fontWeight = def.isHead ? headingWeight : (def.key === "micro" ? 500 : 400);
  // Cap preview height so large headings don't blow out the panel
  const previewMaxH = Math.min(Math.ceil(value * def.lh) + 2, 56);

  return (
    <div className="space-y-1.5">
      {/* Row: label · px value · reset */}
      <div className="flex items-center justify-between">
        <span style={{ fontSize: 12, fontWeight: 500, color: isChanged ? "#3D2B4C" : "#5C5759" }}>
          {def.label}
        </span>
        <div className="flex items-center gap-1.5">
          <span style={{ fontSize: 11, fontWeight: 600, color: isChanged ? "#3D2B4C" : "#7D767A", minWidth: 28, textAlign: "right" }}>
            {value}px
          </span>
          <button
            onClick={() => onReset(def.key)}
            disabled={!isChanged}
            title="Reset to default"
            style={{
              width: 18, height: 18, borderRadius: "50%",
              background: isChanged ? "#F0ECF2" : "transparent",
              border: "none", cursor: isChanged ? "pointer" : "default",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, transition: "background 0.15s ease",
            }}
          >
            <ResetIcon active={isChanged} />
          </button>
        </div>
      </div>

      {/* Track */}
      <input
        type="range"
        min={def.min}
        max={def.max}
        step={1}
        value={value}
        onChange={(e) => onChange(def.key, Number(e.target.value))}
        className="w-full appearance-none h-1.5 rounded-full outline-none cursor-pointer"
        style={{ background: `linear-gradient(to right, #3D2B4C ${pct}%, #E8E5E6 ${pct}%)` }}
      />

      {/* Live preview clipped to a sensible height */}
      <div style={{ overflow: "hidden", maxHeight: previewMaxH, transition: "max-height 0.12s ease" }}>
        <span style={{
          fontFamily,
          fontSize:      value,
          fontWeight,
          lineHeight:    def.lh,
          color:         def.isHead ? "#1D1A1C" : "#5C5759",
          letterSpacing: def.key === "micro" ? "0.08em" : undefined,
          textTransform: def.key === "micro" ? "uppercase" : undefined,
          whiteSpace:    "nowrap",
          display:       "block",
          transition:    "font-size 0.1s ease",
        }}>
          {def.preview}
        </span>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function TypographyPanel() {
  const [open,         setOpen]         = useState(false);
  const [cfg,          setCfg]          = useState<Config>(DEFAULT);
  const [tab,          setTab]          = useState<Tab>("style");
  const [showImport,   setShowImport]   = useState(false);
  const [importText,   setImportText]   = useState("");
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [showHelp,     setShowHelp]     = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Restore saved config on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem("typography-config");
      if (raw) {
        const saved = JSON.parse(raw) as Config;
        setCfg(saved);
        applyConfig(saved);
      }
    } catch {}
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  function commit(next: Config) {
    setCfg(next);
    applyConfig(next);
    localStorage.setItem("typography-config", JSON.stringify(next));
  }

  function update(partial: Partial<Config>) {
    commit({ ...cfg, ...partial });
  }

  function updateSize(key: SizeKey, newVal: number) {
    if (!cfg.locked) {
      commit({ ...cfg, sizes: { ...cfg.sizes, [key]: newVal } });
      return;
    }
    // Proportional: scale every other size by the same ratio
    const oldVal = cfg.sizes[key];
    if (oldVal === 0 || oldVal === newVal) return;
    const ratio = newVal / oldVal;
    const newSizes = {} as SizeConfig;
    for (const d of SIZE_DEFS) {
      if (d.key === key) {
        newSizes[d.key] = newVal;
      } else {
        const scaled = Math.round(cfg.sizes[d.key] * ratio);
        newSizes[d.key] = Math.min(d.max, Math.max(d.min, scaled));
      }
    }
    commit({ ...cfg, sizes: newSizes });
  }

  function resetSize(key: SizeKey) {
    const def = SIZE_DEFS.find((d) => d.key === key)!;
    commit({ ...cfg, sizes: { ...cfg.sizes, [key]: def.def } });
  }

  function resetAll() {
    commit({ ...DEFAULT, headingFont: cfg.headingFont, bodyFont: cfg.bodyFont, weight: cfg.weight });
    // Full reset including fonts:
    commit(DEFAULT);
    localStorage.removeItem("typography-config");
  }

  function applyPreset(key: PresetKey) {
    commit({ ...cfg, sizes: PRESETS[key].sizes, locked: false });
  }

  function handleExport() {
    navigator.clipboard.writeText(JSON.stringify(cfg, null, 2)).then(() => {
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 1800);
    });
  }

  function handleImport() {
    try {
      const parsed = JSON.parse(importText) as Config;
      commit(parsed);
      setShowImport(false);
      setImportText("");
    } catch {
      // keep textarea open so user can fix the JSON
    }
  }

  const isDefaultFonts =
    cfg.headingFont === DEFAULT.headingFont &&
    cfg.bodyFont    === DEFAULT.bodyFont    &&
    cfg.weight      === DEFAULT.weight;

  const isDefaultAll = isDefaultFonts && sizesMatch(cfg.sizes, DEFAULT_SIZES);

  const activePreset = (Object.keys(PRESETS) as PresetKey[]).find(
    (k) => sizesMatch(cfg.sizes, PRESETS[k].sizes)
  );

  const headingFontFamily = HEADING_FONTS[cfg.headingFont];
  const bodyFontFamily    = BODY_FONTS[cfg.bodyFont];
  const headingWeight     = Number(cfg.weight);

  return (
    <>
    {/* ── Floating FAB ── */}
    <motion.button
      onClick={() => setOpen((v) => !v)}
      title="Customize typography"
      className="fixed bottom-6 right-6 z-[490] flex items-center gap-2.5 px-5 rounded-full shadow-[0_4px_24px_rgba(61,43,76,0.35)] text-white"
      style={{ height: 52, background: open ? "#2A1D38" : "#3D2B4C" }}
      whileHover={{ scale: 1.04, boxShadow: "0 6px 32px rgba(61,43,76,0.45)" }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.12 }}
    >
      <span style={{ fontFamily: "var(--font-clash)", fontWeight: 600, fontSize: 20, lineHeight: 1 }}>Aa</span>
      <span style={{ fontSize: 14, fontWeight: 500, letterSpacing: "0.01em" }}>Fonts &amp; Scale</span>
      {!isDefaultAll && (
        <span className="w-2 h-2 rounded-full bg-[#C8B4D8] absolute -top-0.5 -right-0.5 border-2 border-white" />
      )}
    </motion.button>

    <div className="relative" ref={wrapRef}>

      {/* ── Nav trigger ── */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`h-9 px-4 rounded-full flex items-center gap-2 font-medium transition-all shadow-sm ${
          open
            ? "bg-[#3D2B4C] text-white shadow-md"
            : "bg-[#3D2B4C] text-white hover:bg-[#4E3660] hover:shadow-md"
        }`}
      >
        <span style={{ fontFamily: "var(--font-clash)", fontWeight: 600, fontSize: 15, lineHeight: 1, letterSpacing: "-0.01em" }}>Aa</span>
        <span style={{ fontSize: 13, fontWeight: 500, letterSpacing: "0.01em" }}>Customize Type</span>
        {!isDefaultAll && <span className="w-1.5 h-1.5 rounded-full bg-white/70" />}
      </button>

      {/* ── Panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="fixed bottom-[72px] right-6 bg-white border border-[#E8E5E6] rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.18)] z-[500] flex flex-col"
            style={{ width: 360, maxHeight: "calc(100vh - 100px)" }}
          >

            {/* ── Header ── */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#E8E5E6] flex-shrink-0">
              <span className="micro text-[#3D2B4C]">Type Configurator</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowHelp((v) => !v)}
                  title="Show help"
                  className="transition-colors"
                  style={{
                    width: 18, height: 18, borderRadius: "50%",
                    border: `1.5px solid ${showHelp ? "#3D2B4C" : "#C8C2CC"}`,
                    background: showHelp ? "#3D2B4C" : "transparent",
                    color: showHelp ? "#fff" : "#7D767A",
                    fontSize: 11, fontWeight: 700,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, cursor: "pointer",
                  }}
                >
                  ?
                </button>
                <button
                  onClick={resetAll}
                  disabled={isDefaultAll}
                  className={`text-[11px] font-medium transition-colors ${
                    isDefaultAll ? "text-[#C8C2CC] cursor-default" : "text-[#7D767A] hover:text-[#3D2B4C]"
                  }`}
                >
                  Reset All
                </button>
              </div>
            </div>

            {/* ── Tabs ── */}
            <div className="flex border-b border-[#E8E5E6] flex-shrink-0">
              {(["style", "sizes"] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="flex-1 py-2.5 relative transition-colors"
                  style={{
                    fontSize: 12,
                    fontWeight: tab === t ? 600 : 500,
                    color: tab === t ? "#3D2B4C" : "#7D767A",
                  }}
                >
                  {t === "style" ? "Style" : "Sizes"}
                  {tab === t && (
                    <motion.div
                      layoutId="tab-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3D2B4C]"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* ── Help overlay ── */}
            <AnimatePresence>
              {showHelp && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="overflow-hidden flex-shrink-0 border-b border-[#E8E5E6]"
                  style={{ background: "#FAFAFA" }}
                >
                  <div className="px-4 py-3 space-y-3">
                    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#B0A5B8" }}>Quick Reference</p>
                    <div className="space-y-1">
                      {[
                        { tab: "Style", label: "Heading Font", desc: "Clash Display / Georgia / DM Sans" },
                        { tab: "Style", label: "Body Font", desc: "DM Sans / Georgia / System UI" },
                        { tab: "Style", label: "Heading Weight", desc: "Regular → Bold, affects all headings" },
                        { tab: "Style", label: "Live Preview", desc: "Shows font + weight in real time" },
                        { tab: "Sizes", label: "Presets", desc: "Compact / Default / Large / A11y — sets all 8 sizes at once" },
                        { tab: "Sizes", label: "Lock Proportions", desc: "Dragging one slider scales all others by the same ratio" },
                        { tab: "Sizes", label: "Heading Sizes", desc: "Hero Title · Page Title · Section Title · Heading" },
                        { tab: "Sizes", label: "Body Sizes", desc: "Body Large · Body · Caption · Micro" },
                        { tab: "Sizes", label: "Per-slider reset", desc: "Circular ↺ button — enabled only when value changed" },
                        { tab: "Sizes", label: "Export", desc: "Copies full JSON config to clipboard" },
                        { tab: "Sizes", label: "Import", desc: "Paste JSON → Apply to load a saved config" },
                        { tab: "Both", label: "Reset All", desc: "Header button — restores every default; disabled when unchanged" },
                        { tab: "Both", label: "Persistence", desc: "Config saved to localStorage on every change" },
                      ].map(({ tab: t, label, desc }) => (
                        <div key={label} className="flex items-start gap-2">
                          <span style={{
                            fontSize: 9, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
                            color: t === "Style" ? "#9B7BB8" : t === "Sizes" ? "#5C9B7B" : "#7D767A",
                            background: t === "Style" ? "rgba(155,123,184,0.1)" : t === "Sizes" ? "rgba(92,155,123,0.1)" : "rgba(125,118,122,0.1)",
                            borderRadius: 4, padding: "1px 5px", flexShrink: 0, marginTop: 1,
                          }}>
                            {t}
                          </span>
                          <div>
                            <span style={{ fontSize: 11, fontWeight: 600, color: "#3D2B4C" }}>{label}</span>
                            <span style={{ fontSize: 11, color: "#7D767A" }}> — {desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Scrollable body ── */}
            <div className="overflow-y-auto flex-1" style={{ overscrollBehavior: "contain" }}>

              {/* ════ STYLE TAB ════ */}
              {tab === "style" && (
                <div className="p-4 space-y-4">

                  <div>
                    <Label>Heading Font</Label>
                    <div className="flex gap-1.5">
                      <FontChip active={cfg.headingFont === "clash"}   fontFamily={HEADING_FONTS.clash}   label="Clash"   onClick={() => update({ headingFont: "clash" })} />
                      <FontChip active={cfg.headingFont === "georgia"} fontFamily={HEADING_FONTS.georgia} label="Serif"   onClick={() => update({ headingFont: "georgia" })} />
                      <FontChip active={cfg.headingFont === "sans"}    fontFamily={HEADING_FONTS.sans}    label="DM Sans" onClick={() => update({ headingFont: "sans" })} />
                    </div>
                  </div>

                  <div>
                    <Label>Body Font</Label>
                    <div className="flex gap-1.5">
                      <FontChip active={cfg.bodyFont === "sans"}    fontFamily={BODY_FONTS.sans}    label="DM Sans" previewChar="Ag" onClick={() => update({ bodyFont: "sans" })} />
                      <FontChip active={cfg.bodyFont === "georgia"} fontFamily={BODY_FONTS.georgia} label="Serif"   previewChar="Ag" onClick={() => update({ bodyFont: "georgia" })} />
                      <FontChip active={cfg.bodyFont === "system"}  fontFamily={BODY_FONTS.system}  label="System"  previewChar="Ag" onClick={() => update({ bodyFont: "system" })} />
                    </div>
                  </div>

                  <div>
                    <Label>Heading Weight</Label>
                    <div className="flex gap-1.5">
                      <WeightChip active={cfg.weight === "400"} weight="400" label="Regular"  onClick={() => update({ weight: "400" })} />
                      <WeightChip active={cfg.weight === "500"} weight="500" label="Medium"   onClick={() => update({ weight: "500" })} />
                      <WeightChip active={cfg.weight === "600"} weight="600" label="Semibold" onClick={() => update({ weight: "600" })} />
                      <WeightChip active={cfg.weight === "700"} weight="700" label="Bold"     onClick={() => update({ weight: "700" })} />
                    </div>
                  </div>

                  {/* Live preview */}
                  <div className="rounded-xl border border-[#E8E5E6] px-4 py-3 space-y-2" style={{ background: "#FAFAFA" }}>
                    <p style={{ fontFamily: headingFontFamily, fontSize: cfg.sizes.pageTitle, fontWeight: headingWeight, lineHeight: 1.1, color: "#1D1A1C", transition: "all 0.15s ease" }}>
                      Atelia — AI Try-On
                    </p>
                    <p style={{ fontFamily: headingFontFamily, fontSize: cfg.sizes.sectionTitle, fontWeight: headingWeight, lineHeight: 1.2, color: "#3D2B4C", transition: "all 0.15s ease" }}>
                      Typography System
                    </p>
                    <p style={{ fontFamily: bodyFontFamily, fontSize: cfg.sizes.body, lineHeight: 1.55, color: "#5C5759", transition: "all 0.15s ease" }}>
                      Shoppers browse across many stores but can&apos;t visualize how clothes will look on them.
                    </p>
                  </div>

                </div>
              )}

              {/* ════ SIZES TAB ════ */}
              {tab === "sizes" && (
                <div className="p-4 space-y-4">

                  {/* Presets */}
                  <div>
                    <Label>Presets</Label>
                    <div className="flex gap-1.5">
                      {(Object.keys(PRESETS) as PresetKey[]).map((k) => (
                        <button
                          key={k}
                          onClick={() => applyPreset(k)}
                          className="flex-1 py-1.5 rounded-lg border text-center transition-all"
                          style={{
                            fontSize: 11, fontWeight: activePreset === k ? 600 : 500,
                            borderColor: activePreset === k ? "#3D2B4C" : "#E8E5E6",
                            background:  activePreset === k ? "rgba(61,43,76,0.06)" : "transparent",
                            color:       activePreset === k ? "#3D2B4C" : "#7D767A",
                          }}
                        >
                          {PRESETS[k].label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Proportional lock toggle */}
                  <button
                    onClick={() => update({ locked: !cfg.locked })}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl border transition-all"
                    style={{
                      borderColor: cfg.locked ? "#3D2B4C" : "#E8E5E6",
                      background:  cfg.locked ? "rgba(61,43,76,0.04)" : "transparent",
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      {/* Lock icon */}
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <rect x="2" y="6" width="10" height="7" rx="1.5" stroke={cfg.locked ? "#3D2B4C" : "#B0A5B8"} strokeWidth="1.5" />
                        {cfg.locked
                          ? <path d="M4.5 6V4.5a2.5 2.5 0 0 1 5 0V6" stroke="#3D2B4C" strokeWidth="1.5" strokeLinecap="round" />
                          : <path d="M4.5 6V4a2.5 2.5 0 0 1 5 0" stroke="#B0A5B8" strokeWidth="1.5" strokeLinecap="round" />
                        }
                        <circle cx="7" cy="9.5" r="1" fill={cfg.locked ? "#3D2B4C" : "#B0A5B8"} />
                      </svg>
                      <span style={{ fontSize: 12, fontWeight: 500, color: cfg.locked ? "#3D2B4C" : "#5C5759" }}>
                        {cfg.locked ? "Proportional scaling on" : "Lock proportions"}
                      </span>
                    </div>
                    {/* Pill toggle */}
                    <div
                      className="relative rounded-full transition-all flex-shrink-0"
                      style={{ width: 32, height: 18, background: cfg.locked ? "#3D2B4C" : "#E8E5E6" }}
                    >
                      <div
                        className="absolute top-1 rounded-full bg-white transition-all"
                        style={{ width: 14, height: 14, left: cfg.locked ? 15 : 2 }}
                      />
                    </div>
                  </button>

                  {/* ── Heading sliders ── */}
                  <div className="space-y-4">
                    <SectionDivider>Heading Sizes — Clash Display</SectionDivider>
                    {SIZE_DEFS.filter((d) => d.isHead).map((d) => (
                      <SizeSlider
                        key={d.key}
                        def={d}
                        value={cfg.sizes[d.key]}
                        headingFont={headingFontFamily}
                        bodyFont={bodyFontFamily}
                        headingWeight={headingWeight}
                        onChange={updateSize}
                        onReset={resetSize}
                      />
                    ))}
                  </div>

                  {/* ── Body sliders ── */}
                  <div className="space-y-4">
                    <SectionDivider>Body Sizes — DM Sans</SectionDivider>
                    {SIZE_DEFS.filter((d) => !d.isHead && d.key !== "cardValue" && d.key !== "listText").map((d) => (
                      <SizeSlider
                        key={d.key}
                        def={d}
                        value={cfg.sizes[d.key]}
                        headingFont={headingFontFamily}
                        bodyFont={bodyFontFamily}
                        headingWeight={headingWeight}
                        onChange={updateSize}
                        onReset={resetSize}
                      />
                    ))}
                  </div>

                  {/* ── Component text sliders ── */}
                  <div className="space-y-4">
                    <SectionDivider>Component Text</SectionDivider>
                    {SIZE_DEFS.filter((d) => d.key === "cardValue" || d.key === "listText").map((d) => (
                      <SizeSlider
                        key={d.key}
                        def={d}
                        value={cfg.sizes[d.key]}
                        headingFont={headingFontFamily}
                        bodyFont={bodyFontFamily}
                        headingWeight={headingWeight}
                        onChange={updateSize}
                        onReset={resetSize}
                      />
                    ))}
                  </div>

                  {/* ── Export / Import ── */}
                  <div className="pt-2 border-t border-[#F0ECF2] space-y-2">
                    <div className="flex gap-2">
                      <button
                        onClick={handleExport}
                        className="flex-1 py-2 rounded-lg border border-[#E8E5E6] transition-all hover:border-[#3D2B4C]/40 hover:text-[#3D2B4C]"
                        style={{ fontSize: 12, fontWeight: 500, color: copyFeedback ? "#3D2B4C" : "#5C5759" }}
                      >
                        {copyFeedback ? "Copied to clipboard!" : "Export config"}
                      </button>
                      <button
                        onClick={() => setShowImport((v) => !v)}
                        className="flex-1 py-2 rounded-lg border transition-all"
                        style={{
                          fontSize: 12, fontWeight: 500,
                          borderColor: showImport ? "#3D2B4C" : "#E8E5E6",
                          color:       showImport ? "#3D2B4C" : "#5C5759",
                        }}
                      >
                        Import config
                      </button>
                    </div>

                    {showImport && (
                      <div className="space-y-2">
                        <textarea
                          value={importText}
                          onChange={(e) => setImportText(e.target.value)}
                          placeholder="Paste exported config JSON…"
                          className="w-full rounded-xl border border-[#E8E5E6] p-3 resize-none outline-none focus:border-[#3D2B4C]/50 transition-colors"
                          style={{ fontSize: 11, fontFamily: "monospace", height: 84, color: "#1D1A1C" }}
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={handleImport}
                            className="flex-1 py-2 rounded-lg bg-[#3D2B4C] text-white transition-opacity hover:opacity-90"
                            style={{ fontSize: 12, fontWeight: 500 }}
                          >
                            Apply
                          </button>
                          <button
                            onClick={() => { setShowImport(false); setImportText(""); }}
                            className="flex-1 py-2 rounded-lg border border-[#E8E5E6] transition-colors hover:text-[#3D2B4C]"
                            style={{ fontSize: 12, fontWeight: 500, color: "#7D767A" }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
}
