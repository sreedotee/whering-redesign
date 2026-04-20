"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Shield, CloudLightning } from "lucide-react";

/**
 * 1. ToDesktop: Card Quote (Exact 1:1)
 * Extracted Physics: p-10 (40px padding), text-2xl (24px quote), rounded-[15px], bg-gradient-to-br from-zinc-50 to-zinc-100
 */
export function ToDesktopCardQuote({
  quote,
  author,
  role,
  companyUrl,
  avatarUrl,
  logoUrl,
}: {
  quote: React.ReactNode;
  author: string;
  role: string;
  companyUrl?: string;
  avatarUrl: string;
  logoUrl: string;
}) {
  return (
    <div className="flex flex-col justify-between gap-10 rounded-[15px] bg-gradient-to-br from-zinc-50 to-zinc-100 p-10 h-full border border-black/5 hover:from-red-50 hover:via-purple-50 hover:to-yellow-50 transition-colors duration-500">
      <div className="flex flex-col gap-10">
        <div className="text-lg">
          <span className="absolute -ml-4 text-2xl leading-5 text-gray-400">&ldquo;</span>
          <span className="text-gray-900 leading-relaxed">{quote}</span>
          <span className="pl-1 text-2xl leading-5 text-gray-400">&rdquo;</span>
        </div>
      </div>
      
      <div className="flex gap-4">
        <div className="flex items-center">
          <div className="relative -mr-3 flex h-[48px] w-[48px] items-center justify-start overflow-hidden rounded-full">
            <div className="absolute mx-auto h-fit w-fit">
              <Image className="h-[60px] w-full max-w-[60px] aspect-square object-cover" src={logoUrl} alt="" width={60} height={60} unoptimized />
            </div>
          </div>
          <Image className="z-10 h-[48px] w-[48px] max-w-[48px] aspect-square rounded-full border border-white object-cover" src={avatarUrl} alt="" width={48} height={48} unoptimized />
        </div>
        <div>
          <div className="font-semibold text-[#1F1F1F]">{author}</div>
          <div className="text-gray-700 text-sm">
            {companyUrl ? (
              <a href="#" className="border-b border-dotted border-gray-400 hover:border-solid hover:border-gray-500">{role}</a>
            ) : (
              role
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 2. ToDesktop: Subtle Floating Glass Direction (Exact 1:1)
 * Extracted Physics: Vast outer padding, shadow-[0_8px_8px_-3px_...], backdrop-blur-md, rounded-[20px] inside rounded-[24px] shell
 */
export function ToDesktopFloatingGlass({ children, title, subtitle }: { children: React.ReactNode, title: string, subtitle: string }) {
  return (
    <div className="bg-[#F9F9FA] rounded-[24px] relative overflow-hidden flex flex-col justify-between h-[600px] border border-black/5">
      {/* Absolute Floating Graphic Layer */}
      <div className="absolute inset-0 w-full h-full flex justify-center pt-16">
        <div 
          className="w-[456px] h-[344px] rounded-[20px] backdrop-blur-md bg-white/60 border border-white/20 relative"
          style={{ boxShadow: "0px 12px 24px -3px rgba(0,0,0,0.08), 0px 6px 6px -3px rgba(0,0,0,0.04), 0px 0px 0px 1px rgba(255,255,255,0.4)" }}
        >
          {children}
        </div>
      </div>
      {/* Lower Title Layer */}
      <div className="pb-12 text-center relative px-10 mt-auto z-10 w-full bg-gradient-to-t from-[#F9F9FA] via-[#F9F9FA]/80 to-transparent pt-32">
        <div className="text-lg font-medium text-gray-900">{title}</div>
        <div className="max-w-[272px] mx-auto h-px my-5 bg-gray-200" />
        <p className="text-base text-gray-500 leading-relaxed">{subtitle}</p>
      </div>
    </div>
  );
}

/**
 * 3. Deel: Nested Avatar Persona (Exact 1:1)
 * Extracted Physics: Dom depth absolute clipping, rounded-full pill buttons (px-6 py-2.5), badge overlapping avatar at -bottom-1 -right-1
 */
export function DeelNestedPersona({ name, role, badgeText, avatar }: { name: string, role: string, badgeText: string, avatar: string }) {
  return (
    <div className="rounded-2xl bg-[#E7F3EA] border border-[#CBDCCA] p-[10px] pb-0 flex flex-col w-[318px]">
      <div className="bg-[#F5FBF6] rounded-[14px] p-6 shadow-sm flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <Image src={avatar} alt="" className="w-16 h-16 rounded-full border border-black/5 object-cover" width={64} height={64} unoptimized />
            <div className="absolute -bottom-1 -right-1 w-[26px] h-[26px] rounded-full bg-white flex items-center justify-center shadow-sm">
              <span className="text-[10px]">🇫🇷</span>
            </div>
          </div>
          <div>
            <h3 className="text-[18px] font-medium text-[#1F1F1F] tracking-tight">{name}</h3>
            <p className="text-sm text-[#6B6B6B]">{role}</p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <span className="text-[10px] font-bold px-3 py-1 rounded-full border border-[#D92D20] text-[#D92D20] uppercase tracking-wider bg-white">
            {badgeText}
          </span>
        </div>
      </div>
      <div className="py-4 flex justify-center border-t border-[#CBDCCA]/50 mt-[10px]">
        <button className="rounded-full px-[24px] py-[10px] bg-[#E1EDCE] text-[#3D5220] text-[15px] font-medium flex items-center gap-2 hover:bg-[#D4E4BA] transition-colors">
          <ShieldCheck size={18} /> Update Classification
        </button>
      </div>
    </div>
  );
}

/**
 * 4. Deel: Scattered Absolute Grid (Exact 1:1)
 * Extracted Physics: Absolute % placement (top:20%, left:25%), strict rotate(-2deg) to rotate(3deg), bounded 350px width container.
 */
export function DeelScatteredProblem({ icons }: { icons: React.ReactNode[] }) {
  const positions = [
    { top: "15%", left: "10%", rotation: "-rotate-2" },
    { top: "45%", left: "20%", rotation: "rotate-3" },
    { top: "25%", left: "60%", rotation: "rotate-2" },
    { top: "65%", left: "55%", rotation: "-rotate-2" },
    { top: "80%", left: "30%", rotation: "rotate-3" }
  ];

  return (
    <div className="relative overflow-hidden w-full max-w-[350px] aspect-[1.6/1] bg-[#DFE2EB] rounded-[20px] shadow-inner">
      {icons.map((icon, idx) => (
        <motion.div
          key={idx}
          className={`absolute ${positions[idx].top} ${positions[idx].left} shadow-md rounded-[14px] bg-white p-3 ${positions[idx].rotation}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.1 }}
          style={{ top: positions[idx].top, left: positions[idx].left }}
        >
          {icon}
        </motion.div>
      ))}
    </div>
  );
}

/**
 * 5. ToDesktop: Clean Feature Grid (Exact 1:1)
 * Extracted Physics: px-12 outmost, items p-32 pr-18 gap-12. md-max:border-t-0, relies entirely on 1px stroke not background cards.
 */
export function ToDesktopFeatureGrid({ features }: { features: { title: string, desc: string, icon: React.ReactNode }[] }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 mx-auto border-t border-l border-gray-200">
      {features.map((feat, idx) => (
        <div key={idx} className="p-[32px] pr-[18px] flex gap-[12px] border-b border-r border-gray-200">
          <div className="text-gray-500 w-[22px] h-[22px] shrink-0">
            {feat.icon}
          </div>
          <div className="flex-1 -mt-1">
            <span className="font-semibold text-gray-900 mr-2">{feat.title}</span>
            <span className="text-gray-500 text-[15px] leading-[24px]">{feat.desc}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * 6. Deel: Inline Metric Row
 * Extracted Physics: bg-[#FBFBFC], px-6 py-4, rounded-[12px], highly saturated success/warning icon, uppercase text-[10px] tracking-widest
 */
export function DeelInlineMetricRow({ label, value, status }: { label: string; value: string; status: "success" | "warning" }) {
  return (
    <div className="flex justify-between items-center bg-[#FBFBFC] rounded-[12px] px-6 py-4 border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] w-full w-max-[400px]">
      <span className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-[0.1em]">{label}</span>
      <div className="flex items-center gap-2">
        <span className="font-semibold text-lg text-gray-900">{value}</span>
        {status === "success" ? (
          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <span className="text-[10px]">↑</span>
          </div>
        ) : (
          <div className="w-5 h-5 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
            <span className="text-[10px]">!</span>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * 7. Deel: Data Table Inline
 * Extracted Physics: Acme Inc rows, border-b 1px solid rgba(0,0,0,0.05), strict tabular grid alignments.
 */
export function DeelDataTable({ rows }: { rows: { name: string; cost: string; flag: string }[] }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden w-full max-w-md">
      <div className="bg-gray-50 border-b border-black/5 px-6 py-4 flex justify-between">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Entity</span>
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</span>
      </div>
      <div className="divide-y divide-black/5">
        {rows.map((r, i) => (
          <div key={i} className="flex justify-between items-center px-6 py-4 hover:bg-gray-50/50 transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-xl">{r.flag}</span>
              <span className="font-medium text-gray-900">{r.name}</span>
            </div>
            <span className="font-semibold text-gray-900">{r.cost}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * 8. Deel: Fluid Avatars
 * Extracted Physics: flex -space-x-3, border-2 border-white carving negative space, closing with exact dimension bg-[#D4EDDA] text-[#28A745] badge
 */
export function DeelFluidAvatars({ avatars, overflowCount }: { avatars: string[]; overflowCount: number }) {
  return (
    <div className="flex items-center -space-x-3">
      {avatars.map((url, i) => (
        <Image key={i} src={url} alt="" className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm bg-gray-100" width={40} height={40} unoptimized />
      ))}
      <div className="w-10 h-10 rounded-full border-2 border-white bg-[#D4EDDA] text-[#28A745] flex items-center justify-center text-sm font-bold z-10 shadow-sm">
        +{overflowCount}
      </div>
    </div>
  );
}

/**
 * 9. ToDesktop: Hero Gradient Bleed
 * Extracted Physics: rounded-[32px], linear-gradient(114.58deg, rgb(209, 233, 255)...), massive inner p-24 sm:p-40 padding.
 */
export function ToDesktopHeroGradient({ title, badge, children }: { title: string; badge: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[32px] p-10 sm:p-24 lg:p-40 relative overflow-hidden" style={{ backgroundImage: "linear-gradient(114.58deg, #D1E9FF -1.34%, rgba(255, 222, 253, 0.56) 24.05%, #F7F7F7 74.82%)" }}>
      <div className="flex justify-center mb-8">
        <span className="px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-sm text-sm font-semibold tracking-wide border border-black/5 shadow-sm text-gray-800">
          {badge}
        </span>
      </div>
      <h1 className="text-4xl md:text-5xl lg:text-6xl text-center font-bold tracking-tight text-gray-900 mb-12 text-balance leading-tight">
        {title}
      </h1>
      <div className="w-full flex justify-center">
        {children}
      </div>
    </div>
  );
}

/**
 * 10. Deel: Stacked Layer Cards
 * Extracted Physics: Green background with 3 staggered overlapping cards, simulating a UI stack via transform-y and z-index.
 */
export function DeelStackedCards({ mainTitle }: { mainTitle: string }) {
  return (
    <div className="bg-[#12A052] rounded-[24px] p-12 min-h-[400px] flex flex-col pt-16 relative overflow-hidden text-center text-white">
      <h2 className="text-3xl font-bold tracking-tight mb-12 z-20 relative text-balance">{mainTitle}</h2>
      
      <div className="relative mx-auto w-full max-w-[280px] h-[200px] z-10">
        <div className="absolute top-12 scale-90 w-full h-[120px] bg-white/40 rounded-[14px] backdrop-blur-sm" />
        <div className="absolute top-6 scale-95 w-full h-[140px] bg-white/80 rounded-[14px] backdrop-blur-md shadow-lg" />
        <div className="absolute top-0 w-full bg-white rounded-[16px] shadow-xl border border-black/10 p-5 flex flex-col gap-3">
          <div className="flex gap-3 items-center">
            <div className="w-10 h-10 rounded-full bg-gray-200" />
            <div className="flex flex-col gap-1 w-full">
               <div className="w-2/3 h-2 bg-gray-200 rounded-full" />
               <div className="w-1/3 h-2 bg-gray-100 rounded-full" />
            </div>
          </div>
          <div className="w-full h-[1px] bg-gray-100 my-2" />
          <div className="flex justify-between items-center">
             <div className="w-1/4 h-6 bg-gray-100 rounded-md" />
             <div className="px-4 py-1.5 bg-blue-100 text-blue-600 rounded-full text-xs font-bold w-max">Active</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 14. EaseHealth: Bento Stats Grid
 * Extracted Physics: Massive text scaling, rgb(15, 62, 23) deep green color mapping, 14.08px border radius using inset clipping.
 */
export function EaseHealthBentoStats({ stats, quote, quoteAuthor, quoteRole, logoUrl, imageUrl }: { 
  stats: { metric: string; desc: string }[];
  quote: string;
  quoteAuthor: string;
  quoteRole: string;
  logoUrl: string;
  imageUrl: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full" style={{ color: "rgb(15, 62, 23)" }}>
      {/* Left Column: Massive Quote Node (span 1, row span 2 conceptually if we built complex grid, but flex handles it) */}
      <div className="bg-[#E7F3EA] rounded-[14.08px] p-8 flex flex-col justify-between h-full border border-black/5 row-span-2">
        <h4 className="text-xl md:text-2xl font-medium leading-snug mb-12">
          {quote}
        </h4>
        <div className="flex justify-between items-end">
          <div>
            <div className="font-bold text-sm">{quoteAuthor}</div>
            <div className="text-xs opacity-70 mb-4">{quoteRole}</div>
            <Image src={logoUrl} alt="" className="h-6 object-contain" width={100} height={24} unoptimized />
          </div>
          <div className="w-12 h-12 bg-gray-200 rounded-full flex shrink-0" />
        </div>
      </div>

      {/* Right Column Top: Feature Image Wrapper */}
      <div className="bg-gray-100 rounded-[14.08px] overflow-hidden border border-black/5 h-[200px] md:h-auto">
        <Image src={imageUrl} alt="" className="w-full h-full object-cover" width={600} height={400} unoptimized />
      </div>

      {/* Right Column Bottom: Split Stats Array */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#E7F3EA] rounded-[14.08px] p-6 flex flex-col justify-center border border-black/5 text-[#0F3E17]">
            <div className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">
              {stat.metric}
            </div>
            <div className="text-xs md:text-sm opacity-80 leading-snug">
              {stat.desc}
            </div>
          </div>
        ))}
      </div>
      
      {/* Action Button Row */}
      <div className="md:col-span-2 bg-[#E7F3EA] rounded-[14.08px] p-6 flex justify-between items-center border border-black/5 hover:bg-[#D4E4BA] transition-colors cursor-pointer group">
         <div className="text-lg md:text-xl font-medium text-[#0F3E17]">Read Case Study</div>
         <div className="group-hover:translate-x-2 transition-transform">
           <svg width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M1.06445 11.7065L24.5893 11.7065" stroke="currentColor" strokeWidth="2.12844" strokeLinecap="round"></path>
             <path d="M14.4219 1.06421L25.0641 11.7064L14.4219 22.3487" stroke="currentColor" strokeWidth="2.12844" strokeLinecap="round"></path>
           </svg>
         </div>
      </div>
    </div>
  );
}

/**
 * 15. EaseHealth: Eyebrow Tag Layout
 * Extracted Physics: Delicate tag component wrapping h3 block. Tag uses white variant and subtle animation delay structures.
 */
export function EaseHealthEyebrowTag({ tag, heading }: { tag: string; heading: string }) {
  return (
    <div className="max-w-xl w-full">
      <div className="mb-6">
        <div className="inline-block px-3 py-1 bg-white border border-[#0F3E17]/10 rounded-full text-xs font-semibold text-[#0F3E17] tracking-widest uppercase shadow-sm">
          {tag}
        </div>
      </div>
      <h3 className="text-2xl md:text-3xl font-medium leading-normal text-[#0F3E17] text-balance">
        {heading}
      </h3>
    </div>
  );
}

/**
 * 16. ToDesktop Full Composition: The Checklist & OS Shell ("persona concept")
 * Extracted Physics: Recreates the ENTIRE capture section, combining the tabs, absolute nesting, glassmorphic checklist rows, and massive text separation.
 */
export function ToDesktopFullChecklistShell() {
  return (
    <div className="w-full max-w-md mx-auto pt-16 flex flex-col items-center">
      {/* Target Container */}
      <div className="w-full max-w-[400px] relative px-3">
        {/* OS Tabs */}
        <div className="flex w-full rounded-[10px] bg-black/5 p-1.5 mb-10 md:mb-16">
          <div className="flex flex-1 justify-center items-center py-2 text-sm text-gray-500 font-medium">❖ Windows</div>
          <div className="flex flex-1 justify-center items-center py-2 text-sm text-gray-500 font-medium">🐧 Linux</div>
          <div className="flex flex-1 justify-center items-center py-2 text-sm bg-white rounded-[8px] text-gray-900 shadow-sm font-semibold">⌘ MacOS</div>
        </div>
        
        {/* Floating Stack */}
        <div className="relative mt-8">
          {/* Main Background block */}
          <div className="h-[260px] top-0 left-0 bg-[#F5F5F7] rounded-[16px] w-full absolute -z-10" />
          
          {/* Main Checkbox Callout placed absolutely overlapping the base */}
          <div className="flex gap-5 items-center absolute -top-4 left-0 p-6 z-10 w-full">
            <div className="bg-white w-12 h-12 flex items-center justify-center rounded-[12px] shadow-[0_12px_24px_-3px_rgba(0,0,0,0.05),0_3px_3px_-1.5px_rgba(0,0,0,0.02)]">
               <ShieldCheck className="text-green-500" size={24} />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900 mb-0.5">All checks passed!</div>
              <div className="text-xs text-gray-500">3 out of 3 checks have passed</div>
            </div>
          </div>

          {/* Glassmorphic Checklist Block offset heavily from top */}
          <div className="pt-24 px-4 w-full relative z-20">
             <div className="p-6 rounded-[14px] bg-white/80 backdrop-blur-md shadow-[0_12px_24px_-3px_rgba(0,0,0,0.08),0_3px_3px_-1.5px_rgba(0,0,0,0.04)] grid gap-6">
                {[
                  "Successfully launched app",
                  "Successfully updated app",
                  "Successfully retrieved smoke test logs"
                ].map((text, i) => (
                  <div key={i} className="flex gap-4 items-center w-full">
                     <div className="w-[18px] h-[18px] bg-green-500 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-white text-[10px]">✓</span>
                     </div>
                     <span className="text-[13px] text-gray-800 font-medium tracking-tight truncate">{text}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>

      {/* Baseline Text Callout */}
      <div className="text-center mt-32 px-10">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Focus on your app, not plumbing</h3>
        <div className="max-w-[272px] mx-auto h-[1px] my-5 bg-gray-200" />
        <p className="text-gray-500 text-sm leading-relaxed">
          Eliminate developer frustration by letting us handle the infrastructure. Build your Electron app on Mac, Windows, and Linux with confidence.
        </p>
      </div>
    </div>
  );
}

/**
 * 17. ToDesktop Full Composition: Magnifier Feature ("mininal")
 * Extracted Physics: Recreates the exact overlapping architecture of the massive ToDesktop diagram panels, proving absolute depth handling.
 */
export function ToDesktopFullMagnifierShell() {
  return (
    <div className="w-full max-w-4xl mx-auto rounded-[24px] bg-[#F9F9FA] relative overflow-hidden flex flex-col md:flex-row items-center border border-black/5">
       {/* Left/Top Diagram Layer */}
       <div className="w-full h-[300px] md:h-[400px] relative px-6 flex justify-center items-center">
          {/* Main App Window Fake */}
          <div className="w-64 md:w-80 h-48 bg-white/20 backdrop-blur-md rounded-[20px] shadow-[0_12px_24px_-3px_rgba(0,0,0,0.05)] border border-white relative overflow-hidden flex flex-col items-center p-6">
              <div className="w-full h-4 bg-gray-200 rounded-full mb-4 opacity-50" />
              <div className="w-3/4 h-4 bg-gray-200 rounded-full opacity-50" />
          </div>
          
          {/* Absolute Magnifier Overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-4 -translate-y-4 w-32 h-32 rounded-full border-[8px] border-gray-900 bg-white shadow-2xl flex items-center justify-center overflow-hidden z-20">
             <div className="text-3xl font-mono text-red-500 font-bold">&lt;/&gt;</div>
          </div>
          {/* Magnifier Stick */}
          <div className="absolute top-1/2 left-1/2 translate-x-8 translate-y-12 w-4 h-16 bg-gray-900 rotate-[45deg] rounded-b-full z-10" />
       </div>

       {/* Right/Bottom Feature Copy Layer */}
       <div className="w-full justify-center p-12 text-center relative z-20 bg-gradient-to-t md:bg-gradient-to-l from-[#F9F9FA] via-[#F9F9FA]/80 to-transparent flex flex-col items-center">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 tracking-tight text-balance">
            Identify code vulnerabilities
          </h3>
          <div className="max-w-[200px] w-full mx-auto h-[1px] my-5 bg-gray-200" />
          <p className="text-gray-500 text-sm leading-relaxed max-w-xs text-balance">
            We analyze your Electron app’s source code to find and rank issues by severity. Quickly resolve vulnerabilities with confidence.
          </p>
       </div>
    </div>
  );
}

/**
 * 11. Deel: Mobile Prototype Banner
 * Extracted Physics: min-h-[480px] strictly height-bounded, rounded-[20px] and utilizes absolute bottom-0 anchoring for floating mobile frames inside the container.
 */
export function DeelMobileBanner({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="bg-[#15357A] rounded-[24px] relative overflow-hidden flex flex-col items-center justify-between min-h-[480px] pt-16 px-10 text-white w-full">
      <div className="flex flex-col items-center text-center max-w-sm z-10">
        <h2 className="text-3xl font-bold tracking-tight mb-4">{title}</h2>
        <p className="text-[#A3B8E8] text-base leading-relaxed">{subtitle}</p>
      </div>
      
      {/* Phone Mockup Absolute anchoring */ }
      <div className="relative w-[280px] h-[260px] mt-10 z-0 flex justify-center">
        <div className="absolute top-0 w-full h-[400px] bg-white rounded-t-[32px] border-[6px] border-black shadow-2xl p-4 flex flex-col gap-4">
           {/* Mobile Header */}
           <div className="w-1/3 h-1 bg-gray-300 rounded-full mx-auto" />
           {/* App Content Blocks */}
           <div className="w-full h-12 bg-gray-100 rounded-lg mt-4" />
           <div className="w-full h-16 bg-blue-50 rounded-lg" />
           <div className="w-full h-12 bg-gray-100 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

/**
 * 12. Deel: Chat Bubble Timeline
 * Extracted Physics: Consecutive overlapping dialog rows, drop-shadow mapped to tailing pointers, strict vertical gap scaling.
 */
export function DeelChatBubbleTimeline({ messages }: { messages: { text: string; align: "left" | "right" }[] }) {
  return (
    <div className="flex flex-col gap-4 max-w-md w-full bg-[#F5F5F7] p-8 rounded-2xl border border-black/5 mx-auto">
      {messages.map((msg, idx) => (
        <div key={idx} className={`flex w-full ${msg.align === "right" ? "justify-end" : "justify-start"}`}>
          <div className={`
            relative px-5 py-3 max-w-[85%] text-sm leading-relaxed shadow-sm
            ${msg.align === "left" 
                ? "bg-white text-gray-800 border border-black/5 rounded-[18px] rounded-bl-sm" 
                : "bg-blue-600 text-white rounded-[18px] rounded-br-sm"}
          `}>
            {msg.text}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * 13. ToDesktop: Multi-Tab OS Card ("Persona Concept")
 * Extracted Physics: Black/4 nested pill container for Mac/Windows OS toggles, dynamic hidden SVGs based on grid arrays.
 */
export function ToDesktopOSTabCard({ osName }: { osName: "MacOS" | "Windows" | "Linux" }) {
  return (
    <div className="rounded-[24px] bg-[#F5F5F7] border border-black/5 p-4 flex justify-center items-start w-full">
      <div className="flex w-full max-w-[400px] rounded-[10px] bg-black/5 p-1.5 relative">
        <button className={`flex items-center justify-center flex-1 gap-2 py-3 text-xs md:text-sm transition-all rounded-[8px] font-medium
            ${osName === "Windows" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
          <span className="text-[16px]">❖</span> Windows
        </button>
        <button className={`flex items-center justify-center flex-1 gap-2 py-3 text-xs md:text-sm transition-all rounded-[8px] font-medium
            ${osName === "Linux" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
          <span className="text-[18px]">🐧</span> Linux
        </button>
        <button className={`flex items-center justify-center flex-1 gap-2 py-3 text-xs md:text-sm transition-all rounded-[8px] font-medium
            ${osName === "MacOS" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
          <span className="text-[18px]">⌘</span> MacOS
        </button>
      </div>
    </div>
  );
}

/**
 * 18. ToDesktop Full Composition: Auto App Dock ("features-auto")
 * Extracted Physics: Recreates the final segment from `mininal` showing the Mac-like desktop dock overlaying an absolute floating app window wrapper.
 */
export function ToDesktopAutoAppDockShell() {
  return (
    <div className="w-full max-w-4xl mx-auto rounded-[24px] bg-[#F9F9FA] relative overflow-hidden flex flex-col md:flex-row items-center border border-black/5 mt-10">
      {/* Top Absolute App Container */}
      <div className="w-full h-[400px] md:h-[500px] relative px-6 flex justify-center items-start pt-10 md:pt-20">
         {/* The App Window Floating Layer */}
         <div className="bg-white rounded-[14px] md:rounded-[20px] shadow-[0_12px_24px_-3px_rgba(0,0,0,0.05),0_3px_3px_-1.5px_rgba(0,0,0,0.02)] border border-black/5 w-full max-w-lg overflow-hidden flex flex-col relative z-10 transition-transform hover:-translate-y-2">
            
            {/* Header / Nav Title */}
            <div className="py-2.5 px-4 flex items-center border-b border-gray-100 bg-white z-20">
              <div className="flex gap-2 mr-4">
                 <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                 <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                 <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
              </div>
              <div className="flex items-center text-xs font-medium tracking-tight text-gray-800">
                 <span className="mr-1">ChatSphere</span>
                 <span className="text-gray-400">5</span>
              </div>
            </div>

            {/* Inner Content App Face */}
            <div className="p-8 pb-10 w-full flex flex-col justify-center items-center gap-6 bg-gradient-to-b from-white to-gray-50/50">
               <div className="w-24 h-24 rounded-full border border-gray-100 bg-white shadow-sm flex items-center justify-center">
                 <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
               </div>
               
               {/* Message Input Bottom Wrapper */}
               <div className="w-[85%] border border-gray-200 rounded-[12px] p-2 flex justify-between items-center bg-white shadow-sm">
                  <span className="text-xs text-gray-400 pl-2">Message ChatSphere...</span>
                  <div className="bg-gray-100 p-1.5 rounded-lg">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                  </div>
               </div>
            </div>
         </div>

         {/* The Dock Base absolute anchored lower */}
         <div className="absolute bottom-12 md:bottom-20 left-1/2 -translate-x-1/2 w-[300px] h-[52px] bg-white/60 backdrop-blur-xl border border-white/40 shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1)] rounded-[16px] z-20 flex justify-center items-end pb-2 gap-4">
             {/* Fake Dock Icons mimicking hover states */}
             <div className="w-8 h-8 rounded-lg bg-gray-200 shadow-inner"></div>
             <div className="w-10 h-10 rounded-lg bg-blue-500 shadow-md"></div>
             <div className="w-12 h-12 rounded-lg bg-gradient-to-tr from-purple-500 to-pink-500 shadow-lg -translate-y-2 ring-2 ring-white/50"></div>
             <div className="w-10 h-10 rounded-lg bg-green-400 shadow-md"></div>
             <div className="w-8 h-8 rounded-lg bg-yellow-400 shadow-inner"></div>
         </div>
      </div>

      {/* Right/Bottom Feature Copy Layer */}
      <div className="w-full justify-center p-12 text-center relative z-20 bg-gradient-to-t md:bg-gradient-to-l from-[#F9F9FA] via-[#F9F9FA]/80 to-transparent flex flex-col items-center">
         <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 tracking-tight text-balance">
           Streamline your updates
         </h3>
         <div className="max-w-[200px] w-full mx-auto h-[1px] my-5 bg-gray-200" />
         <p className="text-gray-500 text-sm leading-relaxed max-w-xs text-balance">
           Keep your customers' apps up-to-date and safely test new releases on a subset of users before rolling out to everyone.
         </p>
      </div>
    </div>
  );
}

/**
 * 19. ToDesktop: Purple Gradient Heading Block ("purple gradient bg with my colours")
 * Extracted Physics: 32px border radius, completely custom `linear-gradient` extracting `rgb(209, 233, 255)`, `rgba(255, 222, 253, 0.56)`, and `rgb(247, 247, 247)`. Sub-element tracking at `[-1%]`.
 */
export function ToDesktopGradientHeading({ heading, highlight, features }: { heading: string, highlight: string, features: string[] }) {
  return (
    <div 
      className="relative overflow-hidden rounded-[32px] w-full"
      style={{
        outline: "1px solid #3737370A",
        outlineOffset: "-1px",
        backgroundImage: "linear-gradient(114.58deg, rgb(209, 233, 255) -1.34%, rgba(255, 222, 253, 0.56) 24.05%, rgb(247, 247, 247) 74.82%)"
      }}
    >
      <div className="relative z-10 p-6 sm:p-10 lg:p-16 lg:pl-20 max-w-3xl">
        <div className="mb-4 inline-flex items-center justify-center gap-2 rounded-full px-3 py-2 bg-black/5 text-[11px] font-mono text-gray-500 uppercase tracking-widest w-max">
          Code Optional
        </div>
        
        <div className="max-w-[516px] mt-4">
          <h2 className="text-[28px] md:text-[36px] leading-tight md:leading-[44px] text-balance tracking-[-1%] text-gray-900 font-bold mb-1">
            {heading}
          </h2>
          <h2 className="text-[28px] md:text-[36px] leading-tight md:leading-[44px] tracking-[-1%] text-gray-900 font-bold flex items-center">
            <span className="w-11 h-11 rounded-[8px] bg-black inline-flex items-center justify-center mr-3 shrink-0">
              <span className="text-white text-lg">TD</span>
            </span>
            {highlight}
          </h2>
        </div>

        <p className="mt-8 max-w-[516px] text-gray-500 text-[16px] leading-relaxed">
          Our visual UI will take your existing web app and turn it into a cross-platform desktop app in just a few minutes. No Electron setup required.
        </p>

        <ul className="mt-12 grid max-w-lg gap-x-6 gap-y-6 text-gray-600 sm:grid-cols-2">
          {features.map((feat, i) => (
             <li key={i} className="flex items-start gap-4">
                <span className="mt-0.5 flex h-5 w-5 items-center justify-center text-gray-400 shrink-0">
                  <svg fill="none" height="18" viewBox="0 0 22 22" width="18" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" d="M3.5 6C3.5 4.61929 4.61929 3.5 6 3.5H16C17.3807 3.5 18.5 4.61929 18.5 6V16C18.5 17.3807 17.3807 18.5 16 18.5H6C4.61929 18.5 3.5 17.3807 3.5 16V6ZM8.5 15.1667C8.03976 15.1667 7.66667 14.7936 7.66667 14.3333C7.66667 13.8731 8.03976 13.5 8.5 13.5H13.5C13.9602 13.5 14.3333 13.8731 14.3333 14.3333C14.3333 14.7936 13.9602 15.1667 13.5 15.1667H8.5ZM13.2559 10.7559L11.5893 12.4226C11.2638 12.748 10.7362 12.748 10.4107 12.4226L8.74408 10.7559C8.41864 10.4305 8.41864 9.90285 8.74408 9.57741C9.06951 9.25197 9.59715 9.25197 9.92259 9.57741L10.1667 9.82149V7.66667C10.1667 7.20643 10.5398 6.83333 11 6.83333C11.4602 6.83333 11.8333 7.20643 11.8333 7.66667V9.82149L12.0774 9.57741C12.4028 9.25197 12.9305 9.25197 13.2559 9.57741C13.5814 9.90285 13.5814 10.4305 13.2559 10.7559Z" fill="currentColor" fillRule="evenodd"></path>
                  </svg>
                </span>
                <span className="text-[15px]">{feat}</span>
             </li>
          ))}
        </ul>

        <div className="mt-14 flex flex-wrap items-center gap-4">
          <button className="rounded-full bg-gray-900 text-white font-medium px-6 py-3.5 hover:bg-gray-800 transition-colors text-[15px]">
            More information →
          </button>
          <button className="rounded-full bg-white border border-gray-200 text-gray-900 font-medium px-6 py-3.5 hover:bg-gray-50 transition-colors text-[15px]">
            Compare with CLI
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * 20. ToDesktop: Gradient Quote Card ("card quote")
 * Extracted Physics: `linear-gradient(to right bottom, rgb(250, 250, 250), rgb(244, 244, 245))` base, hovering to a massive tri-stop red-purple text glow. Has an absolute `-ml-4` leading quote mark.
 */
export function ToDesktopQuoteCard({ author, company, quote }: { author: string, company: string, quote: string }) {
  return (
    <div 
      className="flex flex-col justify-between gap-6 rounded-[15px] p-8 lg:p-10 transition-all duration-300 border border-gray-100 cursor-default hover:-translate-y-1 shadow-sm hover:shadow-md group w-full max-w-lg"
      style={{
        backgroundImage: "linear-gradient(to right bottom, rgb(250, 250, 250), rgb(244, 244, 245))"
      }}
    >
      <div className="flex flex-col gap-6 lg:gap-10">
        <div className="flex gap-3 lg:flex-col lg:gap-4 items-start">
          <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white shrink-0 shadow-inner">
            <Shield size={20} />
          </div>
          <div className="font-bold text-2xl tracking-tight text-gray-900 font-display">Native APIs</div>
        </div>
        
        <div className="text-lg leading-[28px] text-gray-800 relative z-10 w-full pl-6">
          <span className="absolute left-0 -top-2 text-[48px] leading-[10px] text-gray-300 font-serif w-max">“</span>
          <span className="relative z-10">{quote}</span>
          <span className="pl-1 text-2xl leading-5 text-gray-300 font-serif inline-block translate-y-1">”</span>
        </div>
      </div>

      <div className="flex gap-4 items-center mt-6 z-10 relative">
         <div className="flex -mr-2">
            {/* Avatar Stack simulation */}
            <div className="relative w-[48px] h-[48px] overflow-hidden rounded-full border-2 border-white shadow-sm z-0">
               <div className="w-full h-full bg-gray-200"></div>
            </div>
            <div className="relative w-[48px] h-[48px] overflow-hidden rounded-full border-2 border-white shadow-sm z-10 -ml-3">
               <div className="w-full h-full bg-gray-400"></div>
            </div>
         </div>
         <div className="flex flex-col ml-1">
            <div className="font-semibold text-gray-900 tracking-tight text-[16px]">{author}</div>
            <div className="text-sm text-gray-600 border-b border-dotted border-gray-400 hover:border-solid hover:border-gray-600 transition-all w-max inline-block cursor-pointer mt-0.5">
              {company}
            </div>
         </div>
      </div>
      
      {/* On Hover: The intense glow gradient border effect proxy overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-purple-500/0 to-yellow-500/0 group-hover:from-red-500/5 group-hover:via-purple-500/5 group-hover:to-yellow-500/5 rounded-[15px] pointer-events-none transition-all duration-300 z-0" />
    </div>
  );
}

/**
 * 21. ToDesktop: App Store Features List ("looks nice")
 * Extracted Physics: Split 3-column dense grid. Recreations include extreme `--body-stroke-lighter` separation lines, bounding SVG scales, and inline layout alignments.
 */
export function ToDesktopFeaturesList() {
  const features = [
    { title: "App store support.", desc: "Build for Microsoft and Mac App Store" },
    { title: "Native installers.", desc: "Boost download rates with efficient installers." },
    { title: "Native modules.", desc: "Auto-rebuilds for Windows, Mac, and Linux modules." },
    { title: "CI/CD support.", desc: "Integrate toDesktop build in your pipelines" },
    { title: "Teams.", desc: "Collaborate on builds and releases together." },
    { title: "Maximum security.", desc: "Certs and secrets stored on FIPS 140-2 Level 3 HSM." },
  ];

  return (
    <div className="w-full max-w-[960px] mx-auto border border-[#0808080F] rounded-[24px] bg-white overflow-hidden shadow-sm relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#0808080F]">
         {/* Top Row */}
         {features.slice(0, 3).map((feat, i) => (
           <div key={`top-${i}`} className="p-8 flex gap-4 bg-white hover:bg-gray-50/50 transition-colors">
              <CloudLightning className="text-gray-400 w-5 h-5 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="text-[15px] font-semibold text-gray-900 mr-2 inline-block">
                  {feat.title}
                </span>
                <span className="text-[14px] text-gray-500 leading-relaxed block mt-1">
                  {feat.desc}
                </span>
              </div>
           </div>
         ))}
      </div>
      
      {/* Divider */}
      <div className="w-full h-[1px] bg-[#0808080F] hidden md:block" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#0808080F]">
         {/* Bottom Row */}
         {features.slice(3, 6).map((feat, i) => (
           <div key={`bottom-${i}`} className="p-8 flex gap-4 bg-white hover:bg-gray-50/50 transition-colors">
              <CloudLightning className="text-gray-400 w-5 h-5 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="text-[15px] font-semibold text-gray-900 mr-2 inline-block">
                  {feat.title}
                </span>
                <span className="text-[14px] text-gray-500 leading-relaxed block mt-1">
                  {feat.desc}
                </span>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
}
