"use client";

import SectionHeader from "../SectionHeader";

export default function CardSorting() {
  return (
    <section id="card-sorting" className="py-10 bg-white">
      <div className="container-standard">
        <SectionHeader number="06" title="Card Sorting Results" />

        <p className="text-base text-[#6B6B6B] leading-relaxed max-w-2xl">
          All 5 participants organized items by <strong style={{ color: '#1F1F1F' }}>occasion or context</strong> (vacation, work, night out) rather than by item type. This finding directly informed the collections-based information architecture.
        </p>
      </div>
    </section>
  );
}
