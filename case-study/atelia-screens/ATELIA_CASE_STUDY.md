# Whering: Reframing a Digital Wardrobe

**Mobile App Redesign Case Study** | **2026**

---

## Hero Section

### Whering

**Reframing a Digital Wardrobe**

Whering already has a strong promise: help people dress better, reduce waste, shop smarter, and organize their wardrobe. I redesigned the product experience so that promise becomes easier to understand, easier to act on, and easier to repeat.

**Project Details:**
- **Role:** Product Designer
- **Duration:** 3 days
- **Scope:** Solo redesign study

---

## 01. Overview

### The Brief

> Redesign Whering's product experience so its promise feels clearer, lighter, and more connected.

### The Challenge

The app has valuable features, but the hierarchy creates friction. The first screen has 9+ competing primary actions, similar concepts appear under different names, and discovery does not always connect cleanly to wardrobe action.

### My Approach

1. Audit Whering's promise and current app structure
2. Map promises to the behaviors the product needs to enable
3. Split the map into casual user and power user views
4. Use recurrence as a navigation-weight heuristic
5. Cluster related actions into clearer tabs and loops

### The Outcome

A cleaner product structure built around:

**Clearer Hierarchy**
- Reduce first-screen action overload and separate primary behavior from power-user tools

**Unified Mental Model**
- Consolidate moodboards, lookbooks, collections, and saved references into one flexible Collection model

**Connected Discovery Loop**
- Connect creators, outfits, items, collections, wardrobe, and styling into one reusable loop

Final loop:

`creator -> outfit -> item -> collection -> wardrobe -> new outfit`

---

## 02. Product Audit

### What Whering Promises

- Dress better
- Reduce waste
- Shop smarter
- Organize wardrobe

### What I Found

**9+ first-screen actions**

The home experience exposed too many actions at the same level before the core loop was clear.

**Duplicated mental models**

Moodboard, lookbook, collection, and saved references all pointed toward a similar behavior: collecting fashion meaning for later use.

**Broken discovery loop**

Creators, outfits, items, wardrobe actions, collections, and styling had value individually, but did not always connect as one obvious loop.

---

## 03. Promise-to-Behavior Matrix

I built a promise-to-behavior matrix to connect Whering's brand promise with the user behaviors the product needs to support.

### Matrix Inputs

**Core features**
- Digitizing wardrobe
- AI stylist
- Planner
- Stats and wardrobe intelligence

**Core promises**
- Waste reduction
- Style score
- Shop smarter
- Organization

### Why It Helped

The matrix made the redesign less subjective. Every major IA decision could be traced back to a behavior Whering needs to enable.

For example:

- Waste reduction needs repeat-buy prevention, unused item visibility, restyling, and utilization awareness
- Style improvement needs color palettes, cross-matching, outfit creation, and daily style loops
- Smarter shopping needs item gaps, wishlist links, and outfit compatibility
- Organization needs searchable inventory, grouping, tagging, and maintenance flows

---

## 04. Casual vs Power User Views

The parent matrix was split into two smaller views:

### Casual User View

Casual users need the product to feel immediately useful. They should understand where to start without needing to understand every wardrobe-management feature.

Primary needs:
- Save and browse inspiration
- Understand outfits and items
- Get styling help
- Organize enough to find things again

### Power User View

Power users need deeper control without forcing that complexity onto everyone else.

Primary needs:
- Wardrobe utilization
- Seasonal organization
- Cost-per-wear style thinking
- Storage, laundry, donation, and repair tracking

### Key Insight

Not every valuable feature deserves equal visibility on day one. Some features should be tab-level. Others should be contextual.

---

## 05. Navigation Weight

I used recurrence across both matrices as a heuristic for navigation weight.

High recurrence meant a behavior appeared across multiple promises and across both user types. Those behaviors deserved stronger navigational presence.

### Navigation Weight Signals

**Digitizing / Wardrobe**
- Highest recurrence
- Needs tab-level visibility

**AI Styling / Create**
- Strong recurrence
- Needs a clear creation hub

**Marketplace / Shop**
- Medium recurrence
- Should connect through discovery and item details

**Planner**
- Lower recurrence for casual users
- Better as a contextual or profile-side feature

**Stats**
- Strong for power users, weak for casual users
- Should be hidden or delayed until there is enough wardrobe data

---

## 06. Information Architecture

The clustering led to a five-destination model:

### Home

Passive inspiration, followed creators, recent updates.

### Explore

Active search across creators, outfits, items, and collections.

### Studio

The creation hub for styling, outfit generation, and saved item use.

### Inbox

Social feedback, likes, follows, comments, and creator interactions.

### Wardrobe

Items, outfits, collections, stats, and deeper organization tools.

This structure reduces the need for 9+ first-screen actions because each action has a more natural home.

---

## 07. Collection as the Unified Model

The original mental model felt fragmented:

- Moodboard
- Lookbook
- Collection
- Saved reference

I consolidated these into one flexible model: **Collection**.

The user can still name collections however they want:

- Paris trip
- Summer moodboard
- Work capsule
- Wishlist
- Creator inspiration

The product does not need separate screens for each meaning.

### Why This Matters

One stable product object can support multiple user intents. This makes the interface easier to learn and makes saved inspiration easier to reuse.

---

## 08. Discovery Loop

The discovery experience needed to do more than show static inspiration.

### Problem

Fashion is personal. A single outfit per screen depends heavily on the recommendation being right. If the first few outfits miss, the user has to keep swiping with little reward.

Also, static outfit images do not create a strong next action unless the items inside them can be opened, saved, collected, and restyled.

### Redesign Direction

Make discovery more modular and reusable:

`creator -> outfit -> item -> collection -> wardrobe -> new outfit`

### What Changes

**Creators become taste anchors**
- Users discover people through the outfits and items they curate

**Outfits expose items**
- A look becomes a set of reusable parts

**Items connect to wardrobe**
- Users can save, collect, compare, and style individual pieces

**Collections feed creation**
- Saved inspiration becomes usable context for new outfits

---

## 09. Design Decisions

### 1. Replace action overload with job-based tabs

The first screen should not carry the burden of every feature. Primary navigation should represent durable jobs, not every possible action.

### 2. Move power tools deeper

Stats, wardrobe maintenance, donation flags, and utilization tools are valuable, but they should appear when the user has enough wardrobe context.

### 3. Use Collection as the parent model

Moodboards, lookbooks, saved references, and collections all express collecting behavior. One flexible model reduces cognitive load.

### 4. Make discovery actionable

Discovery should lead into saving, wardrobe use, creator following, shopping intent, and outfit creation.

### 5. Preserve the brand feeling

The critique is about structure, not the brand. The redesign preserves Whering's softness and fashion charm while tightening the product logic.

---

## 10. Validation & Checks

Because this was an independent redesign, I did not invent participant metrics. I validated the direction through product logic checks:

### Action Count Check

Can the first screen reduce from 9+ competing actions into fewer, clearer destinations?

### Promise Coverage Check

Does each product promise connect to behavior?

### Navigation Weight Check

Do repeated behaviors across casual and power-user views get higher IA priority?

### Loop Continuity Check

Can a user move from inspiration into a reusable wardrobe action?

`creator -> outfit -> item -> collection -> wardrobe -> new outfit`

---

## 11. Business Impact

This redesign is not just a cleanup exercise. A stronger loop can support:

**Activation**
- New users understand where to start faster

**Retention**
- Collections and wardrobe context give users a reason to return

**Creator Discovery**
- Users follow taste through creators, outfits, and items

**Shopping Intent**
- Item-level actions make inspiration more actionable

**Wardrobe Value**
- Discovery feeds back into what the user owns, saves, organizes, and styles

---

## 12. Constraints

### No Internal Analytics

The work uses visible product evidence, action counts, heuristic reasoning, and loop walkthroughs.

### Existing Product Depth

The goal was not to make Whering smaller. It was to make the depth easier to understand.

### Brand Equity

Whering already has charm. The redesign should respect that instead of forcing a full visual reset.

### Speculative Redesign

The recommendations should be validated with real user data, save behavior, creator following, retention, and activation metrics.

---

## 13. Reflection

This project clarified how I think about consumer product design.

The strongest redesigns do not just make screens cleaner. They make the product promise easier to understand, repeat, and feel.

### Key Learnings

- A product promise can become an IA tool when translated into behavior
- Numbers make critique sharper than vague statements about clutter
- Language is architecture
- Discovery is stronger when every inspiring object becomes reusable

### What I Would Validate Next

- New-user comprehension of the five-tab structure
- Save rate and creator follow rate in the redesigned discovery loop
- Whether users understand Collection as the parent model
- How power users respond to deeper stats and wardrobe-management placement
