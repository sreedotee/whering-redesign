import Hero from "@/components/Hero";
import Overview from "@/components/sections/Overview";
import AuditAndMethod from "@/components/sections/AuditAndMethod";
import RedesignDirection from "@/components/sections/RedesignDirection";
import ProductPrinciples from "@/components/sections/ProductPrinciples";
import ModeScreens from "@/components/sections/ModeScreens";
import Reflection from "@/components/sections/Reflection";
import Footer from "@/components/Footer";
import SectionTimeline from "@/components/SectionTimeline";

export default function Home() {
  const mode1Screens = [
    {
      title: "Home",
      caption: "Passive inspiration without search clutter",
      bg: "linear-gradient(135deg, #3D2B4C 0%, #5a3d6e 100%)",
      icon: "home",
      imageSrc: "/images/Recently Added.svg",
    },
    {
      title: "Explore",
      caption: "Active search across people, outfits, and items",
      bg: "linear-gradient(135deg, #2a1e36 0%, #3D2B4C 100%)",
      icon: "link",
      imageSrc: "/images/Pasted Link (1).svg",
      scrollable: true,
    },
    {
      title: "Studio",
      caption: "Try-on canvas as the main creation surface",
      bg: "linear-gradient(135deg, #4a3560 0%, #6b3fa0 100%)",
      icon: "floppy-disk",
    },
    {
      title: "Wardrobe",
      caption: "Items, outfits, and collection types",
      bg: "linear-gradient(135deg, #3D2B4C 0%, #7b4fb5 100%)",
      icon: "card-index-dividers",
      imageSrc: "/images/Collection-Items.svg",
    },
  ];

  const mode2Screens = [
    {
      title: "Creator Card",
      caption: "Creator taste becomes a discovery path",
      bg: "linear-gradient(135deg, #1a1520 0%, #3D2B4C 100%)",
      icon: "sparkles",
      slideshow: [
        "/images/TryOnCanvas.svg",
        "/images/Bottoms Try On.svg",
        "/images/Outerwear Try On.svg",
        "/images/Footwear Try On.svg",
        "/images/Accessories Try On.svg",
      ],
    },
    {
      title: "Outfit Card",
      caption: "Outfits expose reusable items",
      bg: "linear-gradient(135deg, #2a1e36 0%, #4a3560 100%)",
      icon: "dress",
    },
    {
      title: "Item Detail",
      caption: "Items connect discovery to wardrobe",
      bg: "linear-gradient(135deg, #3D2B4C 0%, #6b3fa0 100%)",
      icon: "lightning",
      imageSrc: "/images/OutfitHistory.svg",
    },
    {
      title: "Collection Detail",
      caption: "Saved taste becomes reusable context",
      bg: "linear-gradient(135deg, #4a3560 0%, #8b5fc0 100%)",
      icon: "party-popper",
      imageSrc: "/images/Post-Generation-Result.svg",
      scrollable: true,
    },
  ];

  const mode3Screens = [
    {
      title: "Promise Matrix",
      caption: "Promise mapped to behavior",
      bg: "linear-gradient(135deg, #1a1520 0%, #2a1e36 100%)",
      icon: "clipboard",
      imageSrc: "/images/OutfitHistory.svg",
    },
    {
      title: "Casual User View",
      caption: "Universal needs separated from depth",
      bg: "linear-gradient(135deg, #2a1e36 0%, #3D2B4C 100%)",
      icon: "heart",
      imageSrc: "/images/ExpandedOutfitDetails.svg",
      scrollable: true,
    },
    {
      title: "Power User View",
      caption: "Advanced workflows moved deeper",
      bg: "linear-gradient(135deg, #3D2B4C 0%, #5a3d6e 100%)",
      icon: "magnifying-glass",
      imageSrc: "/images/ExpandedItemDetails.svg",
      scrollable: true,
    },
    {
      title: "Clustered Tabs",
      caption: "Related actions grouped into destinations",
      bg: "linear-gradient(135deg, #4a3560 0%, #6b3fa0 100%)",
      icon: "card-file-box",
    },
  ];

  return (
    <main className="bg-white min-h-screen lg:ml-[260px]">
      <SectionTimeline />
      <Hero />
      <div className="flex flex-col">
        <Overview />
        <AuditAndMethod />
        <RedesignDirection />
        <ProductPrinciples />

        <div id="designs" />
        <ModeScreens
          mode1Data={{
            modeTitle: "Layer 1: NAVIGATION",
            subtitle: "Action Hierarchy",
            microlabel: "Action Hierarchy",
            intro: "The navigation layer reduces overload by separating passive inspiration, active discovery, try-on creation, calendar planning, and wardrobe management.",
            screens: mode1Screens,
            flowSteps: ["Audit CTAs", "Clarify screen jobs", "Cluster object types", "Derive tabs"],
          }}
          mode2Data={{
            modeTitle: "Layer 2: DISCOVERY LOOP",
            subtitle: "Creator to Wardrobe",
            microlabel: "Creator to Wardrobe",
            intro: "The discovery layer makes inspiration modular. Creators lead to outfits, outfits expose items, items move into try-on remixing, and saved context feeds calendar planning.",
            screens: mode2Screens,
            feature: {
              icon: "sparkles",
              title: "Reusable Inspiration",
              text: "Discovery should not end at a like or static save. Every outfit and item should become a path into remixing, collecting, planning, and returning.",
            },
          }}
          mode3Data={{
            modeTitle: "Layer 3: DECISION MODEL",
            subtitle: "Matrix to Structure",
            microlabel: "Matrix to Structure",
            intro: "The decision model turns the product promise into a practical IA tool. Recurrence across casual and power-user matrices reveals what deserves primary navigation.",
            screens: mode3Screens,
          }}
        />
        <Reflection />
      </div>
      <Footer />
    </main>
  );
}
