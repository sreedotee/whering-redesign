# Whering Redesign: Design Thinking & Process

## Core Philosophy: UX-First Design
While visual excellence is required, **User Experience (UX) is the primary driver of this redesign.** Every aesthetic choice must be grounded in solving a specific user problem, reducing friction, or enhancing the "Digital Closet" mental model.

## Project Vision
A strategic redesign of the Whering app, moving from its current state to a more premium, user-centric experience.
**Vision Statement:** "Helping the user dress better—both aesthetically (style) and economically (waste reduction)."

## Redesign Strategy Phases

### Phase 1: Feature Matrix & North Star Selection [COMPLETE]
- **The Goal:** Define the app's core purpose (Organize vs. Style vs. Shop).
- **The Method:** Create a matrix of existing features vs. potential North Stars. Identify "Junk" features that don't reinforce the goal.
- **Outcome:** A prioritized list of features that justify their existence.

### Phase 2: User Segmentation & Real Estate
- **The Goal:** Solve the "Power User Clutter" problem.
- **The Method:** Group features by user level (Novice vs. Power User). Reallocate screen real estate (Primary vs. Secondary visibility).
- **Outcome:** Navigation structure that feels light for beginners but powerful for experts.

### Phase 3: Layout Execution
- **Order:** Discover (Main) -> Profile -> Middle Tabs.
- **The Method:** Apply the design system to the defined IA.

## Working Notes: North Star Candidates
1. **The Optimizer:** Reduce waste, shop smarter, maintain a circular e-wardrobe.
2. **The Stylist:** Inspiration-based discovery and outfit creation.
3. **The Librarian:** Focus on organization, calendar, and stats.

## Current App Structure (Audit 2026-04-16)
- **Tab 1: Thoughts** (Feed - Inspiration focus)
- **Tab 2: Planner** (Calendar - Future focus)
- **Tab 3: Styling** (W-Pick/Canvas - Creation hub)
- **Tab 4: Shop** (Marketplace - Acquisition focus)
- **Tab 5: Your Wardrobe** (Closet - Inventory focus)
- **Center Action:** (+) Green Button (Entry portal)

## Phase 2: Layout & IA (The Symmetric 5 Pivot)

### The "Symmetric 5" Power User Model
We have pivoted from the 3-tab minimalist model to a **Symmetric 5-tab system**. This acknowledges that for a "Digital Stylist," Search and Social Feedback are high-intensity activities that deserve dedicated, reachable destinations.

1.  **Tab 1: Home (The Curator Feed)**
    *   **Intent:** Passive Inspiration.
    *   **UI:** Clean, magazine-style feed of followed creators. No Search bar clutter.

* **Attribute vs. Context IA (The "Cluster" Model):**
    * **Decision:** Removed redundant "Occasion" tags from the ingestion flow.
    * **Logic:** If an Outfit is pinned to a "Work" Cluster, the "Work" tag is redundant. Context is now handled entirely by **Clusters** (Folders), while **Tags** are reserved strictly for "Ingredients" (Attributes: Color, Material, Category).
    * **Second-Order Effect:** Search remains robust by indexing Cluster names, but user friction is reduced during upload by eliminating secondary tagging choices.

2.  **Tab 2: Explore (The Hunter/Discovery Hub)**
    *   **Intent:** Active Scout.
    *   **UI:** **The Global Search Engine.** Search bar at top for People, Brands, and Collections. Trending categories below.
    *   **Goal:** Outbound discovery and commercial intent.

3.  **Tab 3: Studio (+) (The Action Hub)**
    *   **Intent:** Active Synthesis.
    *   **Ergonomics:** Centered for maximal thumb reach. The "Creation" portal (Try On Canvas).

4.  **Tab 4: Inbox (The Social Feedback Loop)**
    *   **Intent:** Reactive Social.
    *   **UI:** Notifications, Likes, Follows, and Messages.

5.  **Tab 5: Wardrobe (The Asset Vault)**
    *   **Intent:** Administrative Mastery.
    *   **Feature:** **Occasion Folders** (Items + Outfits).
    *   **Identity:** Personal stats and curated Lookbooks.

### Decision Rationale: Semantic Separation
*   **Active vs. Passive:** Separating Search (Active) from Home (Passive) solves the "Semantic Noise" problem.
*   **Scalability:** A dedicated Explore tab allows for future "Commercial" growth (Shopping/Brands) without crowding the home experience.
*   **Symmetry:** 5 tabs allow for a centered "Action" button, a staple of high-end consumer apps (Instagram, TikTok).

### Final North Star: "The Digital Stylist"
- **Purpose:** To help the user dress better—both **aesthetically** (dopamine/style) and **economically** (ROI/waste reduction).

## Initial Brainstorming: Resources for Knowledge Base
*   *Refactoring UI* (Visual hierarchy and UI polish)
*   *About Face: The Essentials of Interaction Design* (Deep UX methodology)
*   *Apple Human Interface Guidelines (HIG)* (Mobile-first navigation standards)
*   *Growth.design Case Studies* (Psychology-based UX patterns)
*   *Lineicons v5.1* (Primary iconography library)

## Phase 3: Engagement & Scaling (The "Connection" Model)

### Feed Logic: "Curation as Contribution"
- **Mechanism**: Posting is passive. Organizing an outfit into a *Public Folder* creates a "Connection Event" on the feed.
- **Card Metadata**:
    - **Bottom-Left Pill**: Dark translucent blur pill with `[Avatar] [Username] in [Collection Name]`.
    - **Right Action Strip**: Vertical overlay with `(+) Connect`, `(Heart) Like`, and `(Chat) Message`.
- **Feed Aesthetics**: Image-first masonry grid. Collection posts use a "Stack Layout" (3-layer image pile).

### The "Manual Entry" Solution (Applying UX Laws)
- **The Problem:** The app is Discovery-first. Forcing a clunky "Upload Link/Image" flow on the primary creative surface (Studio) or structural nav violates focus.
- **The Application of Cognitive Laws:**
    - **Progressive Disclosure:** Instead of putting "Upload Item" tiles in the grid, we tucked it behind a Floating Action Button (FAB).
    - **Ergonomics (Thumb Zone):** Placed the FAB at the bottom right of the Profile view—perfect striking distance for thumbs, staying entirely out of the "Ow Zone".
    - **Modal Scrim Aesthetics:** Discarded standard Material Black 40% scrims for a `16px Glassmorphism Blur (white, 70% opacity)`. This aligns with the 'Premium Spatial iOS' aesthetic. The soft white blur maintains the editorial airy feel while isolating focus entirely on the floating cluster menu.
