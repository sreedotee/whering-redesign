export interface DecisionOption {
  id: string;
  letter: string;
  text: string;
  pros?: string;
  cons?: string;
  chosen: boolean;
}

export interface Decision {
  id: string;
  title: string;
  category: string;
  context: string;
  options: DecisionOption[];
  rationale: string;
  impact: string;
  figmaUrl?: string;
  screensUrl?: string;
  mode: "mode1" | "mode2" | "mode3" | "system";
  summary?: string;
  evidence?: string[];
  imageUrl?: string;
  problem?: string;
  decision?: string;
  outcome?: string;
}

export const decisions: Record<string, Decision> = {
  "promise-behavior-matrix": {
    id: "promise-behavior-matrix",
    title: "Map Promise to Behavior",
    category: "Product Strategy",
    context:
      "Whering's promise is strong, but the product structure needed a clearer link between the promise and the behaviors that make it true.",
    mode: "mode1",
    options: [
      {
        id: "a",
        letter: "A",
        text: "Redesign from visual taste",
        pros: "Fast and expressive",
        cons: "Does not explain why the IA should change",
        chosen: false,
      },
      {
        id: "b",
        letter: "B",
        text: "Map each promise to the behaviors the product must support",
        pros: "Creates a clear product rationale",
        chosen: true,
      },
    ],
    rationale:
      "The matrix made the redesign accountable to Whering's own goals: dress better, reduce waste, shop smarter, and organize a wardrobe.",
    impact:
      "Created a grounded basis for navigation, hierarchy, and feature consolidation.",
    summary: "Turned brand promise into product requirements",
    problem: "The app promise felt clearer than the app hierarchy.",
    decision: "Build a promise-to-behavior matrix across the core product goals.",
    outcome: "Every IA decision could be traced back to a behavior Whering needs to enable.",
  },

  "casual-power-split": {
    id: "casual-power-split",
    title: "Split Casual and Power Needs",
    category: "Product Decisions",
    context:
      "A valuable wardrobe app has to work for someone opening it casually and for someone deeply managing clothes, outfits, and stats.",
    mode: "mode1",
    options: [
      {
        id: "a",
        letter: "A",
        text: "Expose every feature equally",
        pros: "Everything is visible",
        cons: "Creates first-screen overload",
        chosen: false,
      },
      {
        id: "b",
        letter: "B",
        text: "Separate casual and power-user views",
        pros: "Reveals what belongs in primary navigation",
        chosen: true,
      },
    ],
    rationale:
      "The split made it obvious which behaviors were universal and which should stay available but deeper in the product.",
    impact:
      "Reduced navigation pressure while preserving depth for committed wardrobe users.",
    summary: "Protected new users without flattening the product",
    problem: "Casual and power-user tools were competing for the same level of attention.",
    decision: "Use casual and power-user matrices to separate universal needs from advanced depth.",
    outcome: "Primary navigation could serve the broadest behavior without hiding valuable tools completely.",
  },

  "recurrence-navigation-weight": {
    id: "recurrence-navigation-weight",
    title: "Use Recurrence as Navigation Weight",
    category: "Navigation & IA",
    context:
      "Some behaviors appeared repeatedly across both user views, while others mattered only in narrow situations.",
    mode: "mode1",
    options: [
      {
        id: "a",
        letter: "A",
        text: "Choose tabs by feature importance",
        pros: "Easy to justify internally",
        cons: "Can over-promote niche features",
        chosen: false,
      },
      {
        id: "b",
        letter: "B",
        text: "Use recurrence across the matrix as a navigation signal",
        pros: "Promotes universal behaviors",
        chosen: true,
      },
    ],
    rationale:
      "Cell occupancy was used as a heuristic, not a fake science claim. If a behavior appears across both personas and multiple promises, it probably deserves more navigational weight.",
    impact:
      "Helped derive a cleaner tab structure from observed product logic.",
    summary: "Made hierarchy measurable without overclaiming",
    problem: "The app needed a way to decide what deserved tab-level visibility.",
    decision: "Use repeated matrix occupancy as a heuristic for navigation weight.",
    outcome: "Digitizing, styling, discovery, and wardrobe management emerged as stronger primary destinations.",
  },

  "symmetric-five-tabs": {
    id: "symmetric-five-tabs",
    title: "Derive Five Clear Destinations",
    category: "Navigation & IA",
    context:
      "The current first screen had 9+ competing actions, which made the app feel louder than the promise.",
    mode: "mode2",
    options: [
      {
        id: "a",
        letter: "A",
        text: "Keep many first-screen actions",
        pros: "Maximum feature exposure",
        cons: "Weak hierarchy and higher cognitive load",
        chosen: false,
      },
      {
        id: "b",
        letter: "B",
        text: "Group related jobs into five destinations",
        pros: "Clearer start points and cleaner navigation",
        chosen: true,
      },
    ],
    rationale:
      "Passive inspiration, active discovery, creation, social feedback, and wardrobe management each need their own destination.",
    impact:
      "Turned a crowded home experience into a navigable product system.",
    summary: "Replaced action overload with job-based tabs",
    problem: "Too many primary actions were asking for attention at once.",
    decision: "Cluster related actions into Home, Explore, Studio, Inbox, and Wardrobe.",
    outcome: "Users get fewer choices at the top level and more meaningful places to go.",
  },

  "collection-model": {
    id: "collection-model",
    title: "Unify Saved Fashion Objects",
    category: "Product Decisions",
    context:
      "Moodboards, lookbooks, collections, and saved references described overlapping collecting behavior.",
    mode: "mode2",
    options: [
      {
        id: "a",
        letter: "A",
        text: "Keep separate named surfaces",
        pros: "Each feature can have its own flavor",
        cons: "Duplicates the mental model",
        chosen: false,
      },
      {
        id: "b",
        letter: "B",
        text: "Use Collection as the flexible parent model",
        pros: "One model can hold outfits, items, and inspiration",
        chosen: true,
      },
    ],
    rationale:
      "Users can name a collection as a moodboard, lookbook, trip, capsule, or wishlist. The system does not need separate screens for each label.",
    impact:
      "Reduced conceptual fragmentation and made saved inspiration reusable.",
    summary: "One flexible model instead of several similar screens",
    problem: "The same collecting behavior appeared under multiple names.",
    decision: "Consolidate saved references into one flexible Collection concept.",
    outcome: "Collections can support mood, occasion, creator inspiration, shopping, and wardrobe planning.",
  },

  "progressive-power-tools": {
    id: "progressive-power-tools",
    title: "Move Power Tools Deeper",
    category: "Interaction Patterns",
    context:
      "Stats, utilization, seasonal storage, donation flags, and advanced organization are valuable, but not always first-session needs.",
    mode: "mode2",
    options: [
      {
        id: "a",
        letter: "A",
        text: "Show all power tools on primary screens",
        pros: "Signals product depth",
        cons: "Can intimidate casual users",
        chosen: false,
      },
      {
        id: "b",
        letter: "B",
        text: "Keep power tools contextual inside Wardrobe and Profile",
        pros: "Depth appears when relevant",
        chosen: true,
      },
    ],
    rationale:
      "Power features should feel earned by context. A casual user should not have to understand CPW-style stats before they can save an outfit.",
    impact:
      "Preserved product ambition while making activation simpler.",
    summary: "Depth stays available without crowding activation",
    problem: "Advanced wardrobe logic risked overpowering the basic use case.",
    decision: "Keep power-user features deeper and reveal them through wardrobe context.",
    outcome: "The app can serve both quick inspiration and serious wardrobe management.",
  },

  "creator-outfit-item-loop": {
    id: "creator-outfit-item-loop",
    title: "Connect Creator to Wardrobe",
    category: "Product Strategy",
    context:
      "Discovery showed inspiration, but the path from creator to outfit to item to wardrobe action needed to feel continuous.",
    mode: "mode3",
    options: [
      {
        id: "a",
        letter: "A",
        text: "Keep discovery as a static inspiration feed",
        pros: "Simple browsing",
        cons: "Weak connection to styling behavior",
        chosen: false,
      },
      {
        id: "b",
        letter: "B",
        text: "Make every discovery object reusable",
        pros: "Turns inspiration into product behavior",
        chosen: true,
      },
    ],
    rationale:
      "A fashion app should not let inspiration stop at a like. The best loop is creator -> outfit -> item -> collection -> wardrobe -> new outfit.",
    impact:
      "Improves the chance that discovery feeds activation, retention, creator discovery, and shopping intent.",
    summary: "Discovery becomes an action loop",
    problem: "Outfits, items, creators, collections, and styling did not always connect cleanly.",
    decision: "Redesign discovery around a reusable object loop.",
    outcome: "Users can browse, save, reuse, and style from the same path.",
  },

  "masonry-discovery-grid": {
    id: "masonry-discovery-grid",
    title: "Replace Single-Image Discovery",
    category: "Interaction Patterns",
    context:
      "Fashion taste is personal. If the first full-screen outfit misses, the user has to keep swiping before finding signal.",
    mode: "mode3",
    options: [
      {
        id: "a",
        letter: "A",
        text: "One outfit per screen",
        pros: "Immersive and simple",
        cons: "High cost per bad recommendation",
        chosen: false,
      },
      {
        id: "b",
        letter: "B",
        text: "Masonry grid of creators, outfits, and items",
        pros: "More taste surface area per scroll",
        chosen: true,
      },
    ],
    rationale:
      "A grid gives users more options per glance before the recommendation system has enough taste data to be hyper-personal.",
    impact:
      "Makes discovery feel faster, more browsable, and more forgiving.",
    summary: "More taste signal per scroll",
    problem: "A single-card feed asks too much from each recommendation.",
    decision: "Use a masonry-style discovery grid for outfits and items.",
    outcome: "Users can scan more fashion objects quickly and find creators or pieces that match their taste.",
  },

  "actionable-outfit-detail": {
    id: "actionable-outfit-detail",
    title: "Make Outfit Details Modular",
    category: "Product Decisions",
    context:
      "An outfit image becomes more useful when the items inside it can be opened, saved, collected, and restyled.",
    mode: "mode3",
    options: [
      {
        id: "a",
        letter: "A",
        text: "Show outfits as static images",
        pros: "Simple content model",
        cons: "Stops the user at inspiration",
        chosen: false,
      },
      {
        id: "b",
        letter: "B",
        text: "Expose item modules inside outfit detail",
        pros: "Connects discovery to wardrobe and shopping",
        chosen: true,
      },
    ],
    rationale:
      "The outfit is the emotional hook, but items are what users save, shop, and style with.",
    impact:
      "Turns outfit detail into a bridge between creators, wardrobe, and new outfit creation.",
    summary: "Outfits become usable, not just viewable",
    problem: "Static outfits create a dead end after inspiration.",
    decision: "Make outfit cards open into item-level actions and saved-collection flows.",
    outcome: "Users can reuse parts of a look and bring them back into their own wardrobe behavior.",
  },

  "hierarchy-over-feature-count": {
    id: "hierarchy-over-feature-count",
    title: "Prioritize Hierarchy Over Feature Count",
    category: "Product Strategy",
    context:
      "The redesign had to make Whering feel more useful without simply hiding all of its richness.",
    mode: "system",
    options: [
      {
        id: "a",
        letter: "A",
        text: "Remove features aggressively",
        pros: "Very simple",
        cons: "Risks flattening what makes the app valuable",
        chosen: false,
      },
      {
        id: "b",
        letter: "B",
        text: "Preserve depth through clearer hierarchy",
        pros: "Balances simplicity and ambition",
        chosen: true,
      },
    ],
    rationale:
      "The problem was not that Whering had too much value. The problem was that too many things were presented at the same level.",
    impact:
      "Made the redesign sharper without making the product feel smaller.",
    summary: "Keep richness, fix priority",
    problem: "Valuable actions were competing as if they were equally urgent.",
    decision: "Demote, group, and contextualize features rather than removing depth.",
    outcome: "The product feels simpler at the surface and stronger underneath.",
  },

  "collection-language": {
    id: "collection-language",
    title: "Use Language as Architecture",
    category: "Product Decisions",
    context:
      "Names like moodboard, lookbook, saved, and collection shape how users understand the product.",
    mode: "system",
    options: [
      {
        id: "a",
        letter: "A",
        text: "Keep evocative labels everywhere",
        pros: "Fashion-forward personality",
        cons: "Can fragment the model",
        chosen: false,
      },
      {
        id: "b",
        letter: "B",
        text: "Use one flexible term with user-controlled naming",
        pros: "Clear system model",
        chosen: true,
      },
    ],
    rationale:
      "A user can create a collection called Paris trip, autumn moodboard, work capsule, or wishlist. The product model can stay stable.",
    impact:
      "Simplifies learning and keeps the interface flexible.",
    summary: "One product object, many user meanings",
    problem: "Multiple labels made similar actions feel unrelated.",
    decision: "Let Collection be the product object and let users name the intent.",
    outcome: "Saved taste becomes easier to understand, find, and reuse.",
  },

  "inspiration-to-wardrobe": {
    id: "inspiration-to-wardrobe",
    title: "Close the Inspiration Loop",
    category: "Interaction Patterns",
    context:
      "The app's strongest loop should connect what users see with what they own, save, shop, and style.",
    mode: "system",
    options: [
      {
        id: "a",
        letter: "A",
        text: "Treat discovery, wardrobe, and creation separately",
        pros: "Clear feature boundaries",
        cons: "Weak repeat loop",
        chosen: false,
      },
      {
        id: "b",
        letter: "B",
        text: "Connect them as one circular behavior",
        pros: "Makes every action feed the next",
        chosen: true,
      },
    ],
    rationale:
      "The user should feel that discovery gives them material, wardrobe gives them context, and creation gives them a reason to return.",
    impact:
      "Creates a stronger retention and activation story for the redesign.",
    summary: "Every surface feeds the next action",
    problem: "Product surfaces felt useful individually but less connected as a loop.",
    decision: "Design around creator -> outfit -> item -> collection -> wardrobe -> new outfit.",
    outcome: "Discovery, organizing, and styling become one system.",
  },

  "preserve-brand-charm": {
    id: "preserve-brand-charm",
    title: "Preserve the Brand Feeling",
    category: "Visual Design",
    context:
      "The critique was about product structure, not Whering's taste. The brand already had charm, color, and personality.",
    mode: "system",
    options: [
      {
        id: "a",
        letter: "A",
        text: "Redesign into a completely new visual direction",
        pros: "Looks obviously different",
        cons: "Loses what already works",
        chosen: false,
      },
      {
        id: "b",
        letter: "B",
        text: "Keep the airy fashion world while improving structure",
        pros: "Respects the brand and sharpens usability",
        chosen: true,
      },
    ],
    rationale:
      "The product did not need to become more generic. It needed the existing visual charm to be supported by stronger product logic.",
    impact:
      "Made the case study feel constructive rather than like a teardown for teardown's sake.",
    summary: "Sharper structure, same emotional world",
    problem: "A full visual reset would distract from the actual product issue.",
    decision: "Preserve the brand's softness while reorganizing hierarchy and loops.",
    outcome: "The redesign reads as a product evolution, not a rejection of the brand.",
  },
};

export const decisionsByMode: Record<"mode1" | "mode2" | "mode3" | "system", string[]> = {
  mode1: [
    "promise-behavior-matrix",
    "casual-power-split",
    "recurrence-navigation-weight",
  ],
  mode2: [
    "symmetric-five-tabs",
    "collection-model",
    "progressive-power-tools",
  ],
  mode3: [
    "creator-outfit-item-loop",
    "masonry-discovery-grid",
    "actionable-outfit-detail",
  ],
  system: [
    "hierarchy-over-feature-count",
    "collection-language",
    "inspiration-to-wardrobe",
    "preserve-brand-charm",
  ],
};
