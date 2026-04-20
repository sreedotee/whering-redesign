"use client";

import React from "react";
import SectionHeader from "@/components/SectionHeader";
import {
  ToDesktopCardQuote,
  ToDesktopFloatingGlass,
  DeelNestedPersona,
  DeelScatteredProblem,
  ToDesktopFeatureGrid,
  DeelInlineMetricRow,
  DeelDataTable,
  DeelFluidAvatars,
  ToDesktopHeroGradient,
  DeelStackedCards,
  DeelMobileBanner,
  DeelChatBubbleTimeline,
  ToDesktopOSTabCard,
  EaseHealthBentoStats,
  EaseHealthEyebrowTag,
  ToDesktopFullChecklistShell,
  ToDesktopFullMagnifierShell,
  ToDesktopAutoAppDockShell,
} from "@/components/ReferencePatterns";
import { LayoutGrid, CloudLightning, Shield, Key } from "lucide-react";
import RecentCaptures from "@/components/RecentCaptures";

export default function PatternsPreview() {
  return (
    <main className="min-h-screen bg-white pb-32">
      <div className="container-standard pt-20 mb-16">
        <h1 className="text-4xl font-bold text-[#1F1F1F] tracking-tight mb-4 text-balance">
          Modular Design Patterns Library
        </h1>
        <p className="text-xl text-[#6B6B6B] max-w-2xl leading-relaxed">
          Pixel-perfect reconstructed components based on exact spacing, typography, and box-shadow mechanics from Deel and ToDesktop captures.
        </p>
      </div>

      <div className="container-standard flex flex-col gap-24">
        {/* Pattern 1 */}
        <section>
           <SectionHeader number="01" title="ToDesktop: Floating Glass Diagram" />
           <p className="text-sm text-[#6B6B6B] mb-8">Uses p-10 (40px) padding, complex drop-shadow layers, and rounded-24 outer shell.</p>
           <ToDesktopFloatingGlass 
             title="Visual App Architecture" 
             subtitle="Seamlessly construct spatial layers using our high-fidelity floating panels over a massive, clean canvas."
           >
             <div className="w-full h-full flex items-center justify-center text-[#6B6B6B] px-8 text-center text-sm font-medium">
                [ Inner UI Layer with backdrop-blur-md ]
             </div>
           </ToDesktopFloatingGlass>
        </section>

        {/* Pattern 2 */}
        <section>
           <SectionHeader number="02" title="ToDesktop: Seamless Quote Card" />
           <p className="text-sm text-[#6B6B6B] mb-8">Strict from-zinc-50 to-zinc-100 gradient, interlocking avatars with white negative space.</p>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
             <ToDesktopCardQuote 
                quote="This pattern establishes immense credibility using tightly packed 40px internal padding and sophisticated dotted link underlines for secondary actions."
                author="Sarah O'Connor"
                role="Head of Product"
                companyUrl="#"
                avatarUrl="https://i.pravatar.cc/150?u=sarah"
                logoUrl="https://picsum.photos/seed/company1/200/200"
             />
             <ToDesktopCardQuote 
                quote="We can utilize this exact 1:1 format to replace our older blockquotes when we want to visually embed a core stakeholder identity."
                author="Alex Chen"
                role="Senior Engineer"
                companyUrl="#"
                avatarUrl="https://i.pravatar.cc/150?u=alex"
                logoUrl="https://picsum.photos/seed/company2/200/200"
             />
           </div>
        </section>

        {/* Pattern 3 */}
        <section>
           <SectionHeader number="03" title="Deel: Nested Persona Elevation" />
           <p className="text-sm text-[#6B6B6B] mb-8">Absolute positioned grid-breaking flags, precise inner shadow casings, horizontal action pill.</p>
           <div className="flex gap-6 flex-wrap">
             <DeelNestedPersona 
               name="Emily Sanders"
               role="Corporate Buyer"
               badgeText="HIGH INTENT"
               avatar="https://i.pravatar.cc/150?u=emily"
             />
             <DeelNestedPersona 
               name="Marcus L."
               role="Casual Browser"
               badgeText="AT RISK"
               avatar="https://i.pravatar.cc/150?u=marcus"
             />
           </div>
        </section>

        {/* Pattern 4 */}
        <section>
           <SectionHeader number="04" title="Deel: Bounded Scattered Chaos" />
           <p className="text-sm text-[#6B6B6B] mb-8">Absolute coordinates via percentage, strictly bounded rotations (-rotated-2, rotate-3) mapping interconnected nodes.</p>
           <DeelScatteredProblem 
             icons={[
               <LayoutGrid key="0" size={24} className="text-[#3D2B4C]" />,
               <CloudLightning key="1" size={24} className="text-[#AF554D]" />,
               <Shield key="2" size={24} className="text-[#5E7162]" />,
               <Key key="3" size={24} className="text-[#B37D56]" />,
               <LayoutGrid key="4" size={24} className="text-[#3D2B4C]" />
             ]}
           />
        </section>

        {/* Pattern 5 */}
        <section>
           <SectionHeader number="05" title="ToDesktop: Continuous Thin-Stroke Grid" />
           <p className="text-sm text-[#6B6B6B] mb-8">No backgrounds or shadows. Relies purely on overlapping 1px border strokes with aligned SVG anchors.</p>
           <div className="bg-white border border-black/5 rounded-2xl overflow-hidden mt-8">
             <ToDesktopFeatureGrid 
               features={[
                 {
                   title: "Native API support.",
                   desc: "Integrate deeply into the OS ecosystem using native APIs.",
                   icon: <CloudLightning size={22} className="text-[#B37D56]" />
                 },
                 {
                   title: "Auto-rebuilds.",
                   desc: "Trigger pipelines effortlessly on any CI/CD environment seamlessly.",
                   icon: <LayoutGrid size={22} className="text-[#3D2B4C]" />
                 },
                 {
                   title: "Maximum Security.",
                   desc: "All certificates and artifacts securely stored inside HSM.",
                   icon: <Shield size={22} className="text-[#5E7162]" />
                 }
               ]}
             />
           </div>
        </section>

        {/* Pattern 6 */}
        <section>
           <SectionHeader number="06" title="Deel: Inline Metric Row" />
           <p className="text-sm text-[#6B6B6B] mb-8">Replaces standard stat columns with isolated horizontal floating rows. bg-[#FBFBFC], px-6 py-4.</p>
           <div className="flex flex-col gap-4">
             <DeelInlineMetricRow label="Total Value" value="$12,450.00" status="success" />
             <DeelInlineMetricRow label="Churn Risk" value="4.2%" status="warning" />
           </div>
        </section>

        {/* Pattern 7 */}
        <section>
           <SectionHeader number="07" title="Deel: Data Table Inline" />
           <p className="text-sm text-[#6B6B6B] mb-8">Acme Inc. tabular arrays with strict tracking-wider uppercase headers and 1px rgba borders.</p>
           <DeelDataTable 
             rows={[
               { name: "Acme Corp USA", cost: "$4,200.00", flag: "🇺🇸" },
               { name: "Acme EMEA", cost: "$8,150.00", flag: "🇬🇧" },
               { name: "Acme LATAM", cost: "$1,200.00", flag: "🇧🇷" }
             ]}
           />
        </section>

        {/* Pattern 8 */}
        <section>
           <SectionHeader number="08" title="Deel: Fluid Avatars" />
           <p className="text-sm text-[#6B6B6B] mb-8">Overlocking (-space-x-3) profiles carving out neighbors via border-2 border-white.</p>
           <DeelFluidAvatars 
             avatars={[
               "https://i.pravatar.cc/150?u=a",
               "https://i.pravatar.cc/150?u=b",
               "https://i.pravatar.cc/150?u=c",
               "https://i.pravatar.cc/150?u=d"
             ]}
             overflowCount={6}
           />
        </section>

        {/* Pattern 9 */}
        <section>
           <SectionHeader number="09" title="ToDesktop: Seamless Header Bleed" />
           <p className="text-sm text-[#6B6B6B] mb-8">Massive padded container (rounded-[32px]) backed by linear-gradient(114.58deg, #D1E9FF...).</p>
           <ToDesktopHeroGradient 
             title="Convert your web app to a desktop app in naturally minutes."
             badge="App Builder 2.0"
           >
             <button className="bg-gray-900 text-white rounded-full px-8 py-3 font-medium hover:bg-gray-800">
               Get Started Free
             </button>
           </ToDesktopHeroGradient>
        </section>

        {/* Pattern 10 */}
        <section>
           <SectionHeader number="10" title="Deel: Stacked Layer Cards" />
           <p className="text-sm text-[#6B6B6B] mb-8">Using scale and z-index to physically stagger components downward in a green shell.</p>
           <DeelStackedCards mainTitle="Find and hire anyone, anywhere." />
        </section>

        {/* Pattern 11 */}
        <section>
           <SectionHeader number="11" title="Deel: Mobile Prototype Banner" />
           <p className="text-sm text-[#6B6B6B] mb-8">Utilizes absolute anchoring to the bottom frame of a min-h-[480px] bound. Perfect for app previews.</p>
           <DeelMobileBanner 
             title="Run payroll globally, simply." 
             subtitle="Everything from localized compliance to automated payments securely integrated into a single interface." 
           />
        </section>

        {/* Pattern 12 */}
        <section>
           <SectionHeader number="12" title="Deel: Chat Bubble Timeline" />
           <p className="text-sm text-[#6B6B6B] mb-8">Dialogic layout utilizing dynamic border-radius truncation (rounded-br-sm) for sequential dialogue logic.</p>
           <DeelChatBubbleTimeline 
             messages={[
               { text: "Can you approve the invoices for the Q3 contractors?", align: "left" },
               { text: "Just reviewed and approved. They will be paid in their local currencies.", align: "right" },
               { text: "Excellent, everything synced seamlessly with accounting.", align: "left" }
             ]}
           />
        </section>

        {/* Pattern 13 */}
        <section>
           <SectionHeader number="13" title="ToDesktop: Seamless OS Toggle Card" />
           <p className="text-sm text-[#6B6B6B] mb-8">Integrated control pills inside black/5 nested padding mimicking pure native OS preferences.</p>
           <div className="flex flex-col gap-4">
             <ToDesktopOSTabCard osName="MacOS" />
             <ToDesktopOSTabCard osName="Windows" />
           </div>
        </section>

        {/* Pattern 14 */}
        <section>
           <SectionHeader number="14" title="EaseHealth: Bento Stats Grid" />
           <p className="text-sm text-[#6B6B6B] mb-8">Utilizes extreme font scaling and strict rgb(15, 62, 23) text coloration to deliver heavy KPI impact.</p>
           <EaseHealthBentoStats 
             quote="“Clinical documentation has always been the part everyone dreads; Ease finally took that pain off our plate.”"
             quoteAuthor="Dr. Richard Hoffman, PhD"
             quoteRole="Clinical Director & Founder"
             logoUrl="https://picsum.photos/seed/ease/120/40"
             imageUrl="https://picsum.photos/seed/clinic/600/400"
             stats={[
               { metric: "5 mins", desc: "Average time to onboard a new clinician" },
               { metric: "50%", desc: "Estimated reduction in time spent on notes" }
             ]}
           />
        </section>

        {/* Pattern 15 */}
        <section>
           <SectionHeader number="15" title="EaseHealth: Eyebrow Tag Header" />
           <p className="text-sm text-[#6B6B6B] mb-8">Pill-shaped eyebrow leading into a balanced text layout, mapping directly to EaseHealth's DOM styling.</p>
           <EaseHealthEyebrowTag 
             tag="The Solution"
             heading="Instead of bouncing between CRM, EHR, and RCM systems, Ease provides one AI-powered system for referrals, clinical notes, and billing."
           />
        </section>

        {/* Pattern 16 */}
        <section>
           <SectionHeader number="16" title="ToDesktop: Full Integrated Persona Composition" />
           <p className="text-sm text-[#6B6B6B] mb-8">Not just isolated blocks—this replicates ToDesktop's entire structural block including massive text gaps, the OS pill, and the absolute floating glass overlays combining together exactly as seen in `persona concept`.</p>
           <div className="bg-white border rounded-[32px] py-16 flex justify-center shadow-inner overflow-hidden">
             <ToDesktopFullChecklistShell />
           </div>
        </section>

        {/* Pattern 17 */}
        <section>
           <SectionHeader number="17" title="ToDesktop: Full Diagram Composition" />
           <p className="text-sm text-[#6B6B6B] mb-8">Replicates the `mininal` super-layout demonstrating how ToDesktop blends extreme gradient fade-offs with z-index magnification diagrams next to tight textual content.</p>
           <div className="bg-white border rounded-[32px] p-4 flex justify-center shadow-inner overflow-hidden">
             <ToDesktopFullMagnifierShell />
           </div>
        </section>

        {/* Pattern 18 */}
        <section>
           <SectionHeader number="18" title="ToDesktop: Auto App Dock Shell" />
           <p className="text-sm text-[#6B6B6B] mb-8">Extracted from the end of the `mininal` HTML capture: Rebuilds the complex macOS-style floating dock overlaying an application wrapper complete with system control buttons and input fields.</p>
           <div className="bg-white border rounded-[32px] p-4 flex justify-center shadow-inner overflow-hidden mb-12">
             <ToDesktopAutoAppDockShell />
           </div>
        </section>

        {/* RECENT CAPTURES */}
        <RecentCaptures />
      </div>
    </main>
  );
}
