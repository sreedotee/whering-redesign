"use client";

import SectionHeader from "../SectionHeader";
import IterationCarousel from "./IterationCarousel";

export default function Iterations() {
  const iterations = [
    {
      id: "audit",
      version: "Step 1",
      title: "Product Audit",
      description:
        "I started by auditing the first screen, navigation, and repeated concepts. The clearest signal was that 9+ primary actions were competing before the user understood the core loop.",
      details: (
        <div className="space-y-4">
          <div>
            <p className="card-microlabel mb-2">What I Noticed</p>
            <ul className="space-y-1.5 card-supporting leading-relaxed">
              <li>- 9+ actions appeared as first-level choices</li>
              <li>- Wardrobe, discovery, creation, and organization were fighting for priority</li>
              <li>- Similar saved-fashion concepts appeared under different names</li>
              <li>- Discovery did not always lead cleanly into wardrobe action</li>
            </ul>
          </div>
          <div className="border-t border-black/10 pt-4">
            <p className="card-microlabel mb-2">What Carried Forward</p>
            <p className="card-body italic">
              The problem was not lack of features. It was hierarchy, language, and loop continuity.
            </p>
          </div>
        </div>
      ),
      imageSrc: "/images/input-problem.svg",
    },
    {
      id: "matrix",
      version: "Step 2",
      title: "Promise-to-Behavior Matrix",
      description:
        "I mapped Whering's promises to the behaviors the product needs to enable: dress better, reduce waste, shop smarter, and organize wardrobe.",
      details: (
        <div className="space-y-4">
          <div>
            <p className="card-microlabel mb-2">What I Built</p>
            <ul className="space-y-1.5 card-supporting leading-relaxed">
              <li>- A parent matrix across features and promises</li>
              <li>- A casual user view for broad activation needs</li>
              <li>- A power user view for deeper wardrobe management</li>
              <li>- A recurrence heuristic to identify navigation weight</li>
            </ul>
          </div>
          <div className="border-t border-black/10 pt-4">
            <p className="card-microlabel mb-2">What It Clarified</p>
            <p className="card-body italic">
              The most repeated behaviors deserved primary navigation. Lower-frequency power tools could stay accessible but move deeper.
            </p>
          </div>
        </div>
      ),
      imageSrc: "/images/crosstab-nav.svg",
    },
    {
      id: "clustering",
      version: "Step 3",
      title: "Clustering into Tabs",
      description:
        "Related actions were clustered into destinations instead of being treated as separate first-level actions.",
      details: (
        <div className="space-y-4">
          <div>
            <p className="card-microlabel mb-2">What Changed</p>
            <ul className="space-y-1.5 card-supporting leading-relaxed">
              <li>- Passive inspiration moved to Home</li>
              <li>- Active search moved to Explore</li>
              <li>- Outfit creation moved to Studio</li>
              <li>- Items, outfits, collections, and stats moved into Wardrobe</li>
            </ul>
          </div>
          <div className="border-t border-black/10 pt-4">
            <p className="card-microlabel mb-2">What It Fixed</p>
            <p className="card-body italic">
              The app could still be deep, but users no longer needed to parse every capability at once.
            </p>
          </div>
        </div>
      ),
      imageSrc: "/images/wardrobe-nav.svg",
    },
    {
      id: "loop",
      version: "Step 4",
      title: "Connected Discovery Loop",
      description:
        "The final redesign connected creator, outfit, item, collection, wardrobe, and new outfit creation into one continuous behavior.",
      details: (
        <div className="space-y-4">
          <div>
            <p className="card-microlabel mb-2">Final Loop</p>
            <ul className="space-y-1.5 card-supporting leading-relaxed">
              <li>- Creator leads to outfit</li>
              <li>- Outfit exposes reusable items</li>
              <li>- Items can be saved into collections</li>
              <li>- Collections feed wardrobe and new outfit creation</li>
            </ul>
          </div>
          <div className="border-t border-black/10 pt-4">
            <p className="card-microlabel mb-2">What It Created</p>
            <p className="card-body italic">
              Discovery stopped being a passive feed and became a loop users can browse, save, reuse, and style from.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="iterations" className="py-10 bg-white">
      <div className="container-standard">
        <SectionHeader
          number="11"
          title="Product Evolution"
          subtitle="How the redesign moved from audit to structure to loop"
        />
        <p className="narrative-body mb-8 max-w-2xl">
          The redesign evolved through four moves: audit the overload, turn the promise into
          behavior, cluster actions into destinations, and close the loop between discovery and
          wardrobe use.
        </p>
      </div>

      <IterationCarousel title="" iterations={iterations} />
    </section>
  );
}
