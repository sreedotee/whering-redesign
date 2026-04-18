# KB: Mobile Navigation Science & Logic

## 1. The Reachability Matrix (Ergonomics)
On modern large screens (6.1" to 6.9"), navigation must follow the **Thumb Zone** theory:
- **Natural Zone (Bottom 1/3):** This is where **Bottom Tab Bars** live. Core High-Frequency Actions must be here.
- **Stretch Zone (Middle 1/3):** Secondary actions (Filtering, Sorting).
- **Ow Zone (Top 1/3):** Destructive actions (Delete, Close) or purely Informational elements (Title).
- **Rule:** Never put a "Save" or "Next" button in the Top Right corner if it's part of a frequent flow.

## 2. The Bottom Tab Bar (The "Core Hub")
How to decide what gets a tab:
- **Persistent Access:** Does the user need to switch to this feature *while they are in the middle of another task*? (e.g., checking a closet item while styling).
- **Frequency:** Is it used in >70% of sessions?
- **Cognitive Load:** Keep to **3-5 tabs**. 
    - 3 tabs: Extremely clear, maximum focus.
    - 5 tabs: High utility, requires distinctive icons.
    - >5 tabs: Fatal error. Use a "More" menu or refactor IA.

## 3. Navigation Models
- **Flat Navigation:** User can move between hubs without losing state. Best for Whering (Closet <-> Styling <-> Calendar).
- **Hierarchical Navigation:** Deep nesting. Best for Settings or complex Catalog browsing.

## 4. Interaction Timing (Performance UX)
For a "Premium" feel:
- **Feedback Loop:** Every tap must have a response within **100ms** (visual state change).
- **Transition Duration:** UI transitions should be **200ms - 300ms**. Faster feels "abrupt," slower feels "laggy."

---
*Sources derived from: Apple HIG, Material Design 3, NN/g Research, Baymard Institute.*
