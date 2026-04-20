"use client";

import SectionHeader from "../SectionHeader";
import TimelineSection from "./TimelineSection";

export default function ProblemEvolution() {
  const timelineSteps = [
    {
      id: "01-input-problem",
      label: "Discovery",
      title: "The Input Problem",
      status: "complete" as const,
      summary: "Getting items from any website into the try-on flow was the main friction point. Manual upload was slow (about 60 seconds) and broke momentum.",
      details: `<strong>Breakthrough:</strong> Switched to automatic link parsing. Reduced save time to about 5 seconds and matched existing behavior, since users already share links.`,
    },
    {
      id: "02-research-questions",
      label: "Research",
      title: "Key Questions Identified",
      status: "complete" as const,
      summary: "Through user research, four critical questions emerged that would shape the final product design.",
      details: `
        <ul style="list-style: none; padding: 0; margin: 0;">
          <li style="margin-bottom: 12px;">• Do users organize by occasion or by item type?</li>
          <li style="margin-bottom: 12px;">• At what stage does try-on add the most value in the shopping journey?</li>
          <li style="margin-bottom: 12px;">• What do users do after generation: save, retry, or discard?</li>
          <li>• Should unsuccessful results be stored or removed?</li>
        </ul>
        <p style="margin-top: 16px; font-style: italic; color: #707070;">These answers led to occasion-based collections and keeping history, including unsuccessful results.</p>
      `,
    },
  ];

  return (
    <section id="problem-evolution" className="py-10 bg-white">
      <div className="container-standard">
        <SectionHeader number="12" title="Problem Evolution" subtitle="Finding the Right Problem" />
        <p className="text-base font-medium text-[#6B6B6B] leading-[27.2px] mb-8 max-w-2xl">
          The brief was simple: &ldquo;AI virtual try-on.&rdquo; But the real challenge was
          identifying where this technology creates meaningful value.
        </p>
      </div>

      <TimelineSection
        title=""
        steps={timelineSteps}
      />
    </section>
  );
}
