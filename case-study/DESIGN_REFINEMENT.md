# DESIGN_REFINEMENT.md

**Source of truth for the Atelia structural pass.** Translates structural DNA from `/ref-captures` (Deel + ToDesktop) into the existing Atelia token system. Implementation agent: execute the *Surgical Steps* in each section verbatim.

---

## Operating Principles (Read First)

These principles were extracted from the references and override default instincts during implementation:

1. **Flatten before nesting.** Reference cards from ToDesktop achieve hierarchy with horizontal rules and section borders, *not* by nesting a white card inside a gray shell. We over-nest. Default to a single surface with internal `border-t border-black/5` dividers; only nest when two things are at genuinely different hierarchy levels.
2. **Promote the highest-value element.** Quotes, friction statements, and stats are the *primary content* — they should not live at the bottom of a sub-card. The claim is the headline; the evidence (quote / stat / friction) should be sized and placed like a pull quote, not a footnote.
3. **Metadata belongs in fixed columns or footer chips, not bulleted prose.** Deel's interview/Acme card uses a two-column ledger (label-left fixed-width, value-right) with row dividers. Adopt this for any list of named attributes (age/role, behaviors, evidence items). Bullets are for prose, not data.
4. **Outer shells (`bg-[#F5F5F7]`) earn their weight only at the hero level.** Apply them to the ONE primary item in any group; peers should be plain white cards with `border border-black/5`. The current uniform F5F5F7 grid flattens hierarchy.
5. **Identity vs. Attributes split.** Deel persona cards split the *who* (photo, name, role, badge) from the *what* (data). Mirror this with a left-column identity / right-column data-sheet layout for any "subject + properties" content.

---

## Section 1 — User Personas

**File:** `components/sections/UserPersonas.tsx`

### Reference Insight
Deel's persona card pattern (André Fabron / Michel B. captures) splits identity (photo + name + role + status badge) from a separate action/data zone with a horizontal rule between them, creating a *data-sheet* feel where identity is scanned and attributes are read.

### Grouping Declaration

**Primary Persona (Sarah)**
- **Outer Shell** (`rounded-[32px] bg-[#F5F5F7] p-8 border border-black/5`):
  - LEFT column: Identity cluster (avatar, tag pill, name, title, mini age/role table)
  - RIGHT column: Data-sheet (quote → behaviors ledger → pain point callout)
- **Inner Card** (single `rounded-2xl bg-white border border-black/5 shadow-sm`): houses the entire right-column data-sheet. *No nested sub-cards inside* — sections are separated by `border-t border-black/5` only.

**Secondary Personas (Maya, Jade)**
- **No outer shell.** Each is a single flat white card (`rounded-2xl bg-white border border-black/5 shadow-sm p-6`) — they are peers to each other and subordinate to Sarah.
- Internal layout: horizontal — avatar left, identity stack center, need/pain right, separated by a thin vertical divider.

### Layout Classes

```
Primary outer:    grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8
Primary inner:    flex flex-col divide-y divide-black/5
Secondary grid:   grid grid-cols-1 md:grid-cols-2 gap-4
Secondary card:   grid grid-cols-[64px_1fr_1.2fr] gap-5 items-start
```

### Surgical Steps

1. **Replace the primary persona block (lines ~89–146).** New structure:
   ```jsx
   <div className="rounded-[32px] p-8 bg-[#F5F5F7] border border-black/5 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
     {/* LEFT: Identity cluster */}
     <div className="flex flex-col gap-5">
       <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center border border-black/5 shadow-sm text-2xl font-medium text-[#181925]">
         {primaryPersona.name[0]}
       </div>
       <div className="space-y-2">
         <span className="text-[10px] font-bold text-[#3D2B4C] uppercase tracking-widest px-2 py-0.5 rounded-full bg-white border border-[#3D2B4C]/10 inline-block">
           {primaryPersona.tag}
         </span>
         <h3 className="text-[28px] leading-tight font-medium text-[#181925]">{primaryPersona.name}</h3>
         <p className="text-sm text-[#5F5A5D]">{primaryPersona.title}</p>
       </div>
       {/* Mini ledger: Age / Role */}
       <div className="mt-2 pt-4 border-t border-black/10 space-y-2.5">
         <div className="grid grid-cols-[60px_1fr] items-center">
           <span className="text-[10px] font-bold text-[#3D2B4C]/50 uppercase tracking-widest font-mono">Age</span>
           <span className="text-sm font-medium text-[#181925]">{primaryPersona.age} yrs</span>
         </div>
         <div className="grid grid-cols-[60px_1fr] items-center">
           <span className="text-[10px] font-bold text-[#3D2B4C]/50 uppercase tracking-widest font-mono">Role</span>
           <span className="text-sm font-medium text-[#181925]">{primaryPersona.occupation}</span>
         </div>
       </div>
     </div>

     {/* RIGHT: Data-sheet (single white card, internal dividers only) */}
     <div className="rounded-2xl bg-white border border-black/5 shadow-sm flex flex-col">
       {/* Quote — top section */}
       <div className="p-6">
         <p className="text-[10px] font-bold text-[#3D2B4C]/50 uppercase tracking-widest font-mono mb-3">In Their Words</p>
         <p className="text-[20px] leading-snug font-medium text-[#181925] italic">
           &ldquo;{primaryPersona.quote}&rdquo;
         </p>
       </div>
       {/* Behaviors — ledger style with row separators */}
       <div className="px-6 py-5 border-t border-black/5">
         <p className="text-[10px] font-bold text-[#3D2B4C]/50 uppercase tracking-widest font-mono mb-3">Behaviors</p>
         <div className="divide-y divide-black/5">
           {primaryPersona.behaviors.map((b) => (
             <div key={b} className="py-2.5 grid grid-cols-[24px_1fr] items-start gap-2">
               <span className="text-[10px] font-mono text-[#3D2B4C]/40 mt-0.5">0{primaryPersona.behaviors.indexOf(b) + 1}</span>
               <span className="text-sm text-[#5F5A5D] leading-relaxed">{b}</span>
             </div>
           ))}
         </div>
       </div>
       {/* Pain Point — highlighted callout, accent left border */}
       <div className="px-6 py-5 border-t border-black/5 bg-[#FBF7F7] rounded-b-2xl border-l-2 border-l-[#E04D4D]/40">
         <p className="text-[10px] font-bold text-[#E04D4D]/70 uppercase tracking-widest font-mono mb-2">Pain Point</p>
         <p className="text-sm leading-relaxed text-[#5F5A5D] italic">{primaryPersona.painPoint}</p>
       </div>
     </div>
   </div>
   ```

2. **Replace the secondary personas block (lines ~149–193).** Each card becomes a flat horizontal chip — no F5F5F7 shell, no nested white card, no `m-1 p-2` doubled padding:
   ```jsx
   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
     {secondaryPersonas.map((persona, i) => (
       <motion.div
         key={persona.name}
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         transition={{ delay: i * 0.1, duration: 0.5 }}
         viewport={{ once: true }}
         className="rounded-2xl bg-white border border-black/5 shadow-sm p-6 grid grid-cols-[56px_1fr] gap-5 items-start"
       >
         <div className="w-14 h-14 rounded-full bg-[#F5F5F7] flex items-center justify-center border border-black/5 text-lg font-medium text-[#181925]">
           {persona.name[0]}
         </div>
         <div className="space-y-3 min-w-0">
           <div className="flex items-center gap-2 flex-wrap">
             <span className="text-[10px] font-bold text-[#3D2B4C]/70 uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#F5F5F7] border border-black/5">
               {persona.tag}
             </span>
             <span className="text-[10px] font-mono text-[#3D2B4C]/40">{persona.age} · {persona.occupation}</span>
           </div>
           <h3 className="text-[20px] font-medium text-[#181925] leading-tight">{persona.name}</h3>
           <p className="text-sm text-[#181925] font-medium leading-snug">{persona.needs}</p>
           <p className="text-xs text-[#5F5A5D] leading-relaxed pt-3 border-t border-black/5 italic">
             {persona.painPoint}
           </p>
         </div>
       </motion.div>
     ))}
   </div>
   ```

3. **Delete** the unused `space-y-6` and double-padded `m-1 rounded-2xl` patterns from the old secondary card.

---

## Section 2 — User Research

**File:** `components/sections/UserResearch.tsx`

### Reference Insight
ToDesktop's "Native APIs" quote card (`/ref-captures/www.todesktop.com/card quote`) — and Deel's Acme ledger card — both place the *evidence* (quote / data row) as the primary middle layer of the card, not buried in a nested sub-card; the structure reads claim → evidence → attribution as a single flow.

### Grouping Declaration

- **Outer Shell** is the entire card (no F5F5F7 → white nesting): a single `rounded-2xl bg-white border border-black/5 shadow-sm` surface. *Exception:* the **first card only** uses a subtle gradient (`bg-gradient-to-br from-[#FAFAFA] to-[#F4F4F5]`) to create a "lead finding" anchor, mirroring ToDesktop's card-quote treatment.
- **Inner sections** (separated by `border-t border-black/5`, no nested cards):
  1. Header zone: insight pill + title + lead text
  2. **Quote zone** (the new primary layer): large italic blockquote, treated like a pull quote
  3. Footer ledger: kicker stat (large numeral) on the left + evidence items as inline chips on the right

### Layout Classes

```
Grid:           grid grid-cols-1 md:grid-cols-2 gap-6
Card:           rounded-2xl bg-white border border-black/5 shadow-sm flex flex-col
Card sections:  divide-y divide-black/5  (apply on the card)
Footer ledger:  grid grid-cols-[auto_1fr] gap-6 items-center
```

### Surgical Steps

1. **Replace `FindingCard` (lines ~58–109) entirely** with the flattened structure:
   ```jsx
   function FindingCard({ kicker, title, text, quote, evidence, isLead }: {
     kicker: string; title: string; text: string; quote: string; evidence: string[]; isLead?: boolean;
   }) {
     return (
       <div
         className={`rounded-2xl border border-black/5 shadow-sm flex flex-col h-full divide-y divide-black/5 ${
           isLead ? "bg-gradient-to-br from-[#FAFAFA] to-[#F4F4F5]" : "bg-white"
         }`}
       >
         {/* Header zone */}
         <div className="p-7 space-y-4">
           <div className="flex items-center gap-3">
             <span className="text-[10px] font-bold text-[#3D2B4C] uppercase tracking-widest px-2 py-0.5 rounded-full bg-white border border-[#3D2B4C]/10 inline-block">
               Insight
             </span>
             <span className="text-[10px] font-bold text-[#3D2B4C]/50 uppercase tracking-widest font-mono">
               {kicker}
             </span>
           </div>
           <h3 className="text-[22px] font-medium text-[#181925] leading-tight">{title}</h3>
           <p className="text-sm leading-relaxed text-[#5F5A5D] max-w-[42ch]">{text}</p>
         </div>

         {/* Quote zone — promoted to primary evidence */}
         <div className="px-7 py-6 bg-[#FBFBFC]">
           <span className="block text-[28px] leading-none font-serif text-[#3D2B4C]/30 mb-2">&ldquo;</span>
           <p className="text-[17px] leading-snug font-medium text-[#181925] italic -mt-1">
             {quote}
           </p>
         </div>

         {/* Footer ledger — evidence as inline chips, not bullets */}
         <div className="px-7 py-5 mt-auto">
           <p className="text-[10px] font-bold text-[#3D2B4C]/50 uppercase tracking-widest font-mono mb-3">
             Evidence
           </p>
           <div className="flex flex-wrap gap-1.5">
             {evidence.map((item) => (
               <span
                 key={item}
                 className="text-[11px] font-medium text-[#5F5A5D] px-2.5 py-1 rounded-md bg-[#F5F5F7] border border-black/5"
               >
                 {item}
               </span>
             ))}
           </div>
         </div>
       </div>
     );
   }
   ```

2. **Pass `isLead`** to the first finding card in the map (line ~136):
   ```jsx
   <FindingCard {...finding} isLead={index === 0} />
   ```

3. **Delete** the old nested `<div className="mt-auto rounded-2xl bg-white p-6 ...">` block entirely. The white-on-gray nesting is what we're removing.

4. **Keep** the section header, intro paragraph, and grid wrapper as-is.

---

## Section 3 — Competitive Landscape

**File:** `components/sections/CompetitiveLandscape.tsx`

### Reference Insight
ToDesktop's `looks nice` capture (`grid-template-columns: 312px 312px 312px`) and the `subtle card bg direction` capture both demonstrate that peer-weight feature cards work *better* as flat surfaces with internal dividers than as nested shell-and-card structures — the friction/claim is the headline, and apps are footnote metadata.

### Grouping Declaration

- **No outer shell.** Each pattern card is a single flat surface (`rounded-2xl bg-white border border-black/5 shadow-sm`).
- **Internal sections** (separated by `border-t border-black/5`):
  1. Header: pattern number pill + icon (right-aligned)
  2. Title + **promoted friction line** (the friction text moves up to body position — it is the most important information per pattern)
  3. Footer metadata: "EXAMPLES" microlabel + app chips (footnote, not mid-content)
- **Drop the existing inner white "Friction" sub-card entirely.**

### Layout Classes

```
Grid:          grid grid-cols-1 md:grid-cols-3 gap-6
Card:          rounded-2xl bg-white border border-black/5 shadow-sm flex flex-col
               min-h-[300px] divide-y divide-black/5
Header row:    flex items-start justify-between gap-3
Body section:  px-6 py-6 flex-1 flex flex-col gap-3
Footer:        px-6 py-4
```

### Surgical Steps

1. **Replace the cards block (lines ~43–96)** with the flattened version:
   ```jsx
   <div className="container-standard grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
     {approaches.map((a, i) => (
       <motion.div
         key={a.title}
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         transition={{ delay: i * 0.1, duration: 0.5 }}
         viewport={{ once: true }}
         className="rounded-2xl bg-white border border-black/5 shadow-sm flex flex-col min-h-[300px] divide-y divide-black/5"
       >
         {/* Header */}
         <div className="px-6 pt-6 pb-5 flex items-start justify-between gap-3">
           <span className="text-[10px] font-bold text-[#3D2B4C] uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#F5F5F7] border border-[#3D2B4C]/10 inline-block">
             Pattern 0{i + 1}
           </span>
           <div className="w-9 h-9 rounded-full bg-[#F5F5F7] flex items-center justify-center border border-black/5 shrink-0">
             <EmojiImage name={a.emoji} size={20} alt={a.title} />
           </div>
         </div>

         {/* Body — title + PROMOTED friction line */}
         <div className="px-6 py-6 flex-1 flex flex-col gap-3">
           <h3 className="text-[20px] font-medium text-[#181925] leading-tight">
             {a.title}
           </h3>
           <p className="text-sm text-[#5F5A5D] leading-relaxed">
             {a.problem}
           </p>
         </div>

         {/* Footer metadata — apps as footnote chips */}
         <div className="px-6 py-4">
           <p className="text-[10px] font-bold text-[#3D2B4C]/50 uppercase tracking-widest font-mono mb-2">
             Examples
           </p>
           <div className="flex flex-wrap gap-1.5">
             {a.apps.map((app) => (
               <span
                 key={app}
                 className="text-[11px] font-medium text-[#181925] px-2.5 py-1 rounded-md bg-[#F5F5F7] border border-black/5"
               >
                 {app}
               </span>
             ))}
           </div>
         </div>
       </motion.div>
     ))}
   </div>
   ```

2. **Delete** the old inner-card block:
   ```jsx
   <div className="rounded-2xl bg-white p-5 border border-black/5 shadow-sm">
     <div className="flex items-center gap-2 mb-2">
       <div className="w-1.5 h-1.5 rounded-full bg-[#E04D4D]/60" />
       <span className="text-[10px] font-bold text-[#3D2B4C] uppercase tracking-widest">The Friction</span>
     </div>
     ...
   </div>
   ```
   The friction text is now the body of the card, not a nested sub-card with its own label. The label "The Friction" is *implied* by position — this is the same trick ToDesktop uses on the feature grid.

3. **Keep** the section header, intro paragraph, and the "Opportunity" callout block at the bottom unchanged. They are working.

---

## Token Compliance Checklist

Every new card produced by these specs must satisfy:

- [ ] Outer surface uses `rounded-[32px]` (hero shell) OR `rounded-2xl` (peer/flat card) — never invent new radii
- [ ] Background is `bg-[#F5F5F7]` (hero shell) OR `bg-white` (default) OR `bg-gradient-to-br from-[#FAFAFA] to-[#F4F4F5]` (lead-card accent only)
- [ ] Border is always `border border-black/5`; shadow is `shadow-sm` or none
- [ ] Padding: outer shells `p-8` (32px); inner sections `p-6` to `p-7` (24–28px)
- [ ] Microlabels: `text-[10px] font-bold uppercase tracking-widest font-mono`, color `text-[#3D2B4C]/50` for muted, `text-[#3D2B4C]` for active
- [ ] Section dividers: `border-t border-black/5` or `divide-y divide-black/5` — **never** nest a white card inside another white area to fake a divider
- [ ] Body text: `text-sm text-[#5F5A5D] leading-relaxed`
- [ ] Card titles: `text-[20px]` to `text-[28px] font-medium leading-tight`, color `text-[#181925]`

## Anti-Patterns Removed by This Pass

These patterns appeared in the old code and should not return:

1. **Gray-shell + white-card-inside + section-divider trinity** — pick one mechanism (shell *or* nested card *or* divider), not all three.
2. **Bulleted lists of named data** — if it has labels, use a ledger. Bullets are reserved for prose.
3. **Important content at the bottom of a nested sub-card** — promote it to the body.
4. **Uniform F5F5F7 outer shells across all peer cards** — only the hero/lead item earns the shell; peers stay flat white.
5. **Doubled padding (`m-1` + `p-2` + inner `p-6`)** — collapse to a single padding value.
