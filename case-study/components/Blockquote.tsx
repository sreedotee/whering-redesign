import React from "react";

interface BlockquoteProps {
  quote: string;
  attribution?: string;
  className?: string;
}

export default function Blockquote({
  quote,
  attribution,
  className = "",
}: BlockquoteProps) {
  return (
    <div className={`px-7 py-6 bg-[#FBFBFC] ${className}`.trim()}>
      <span className="block text-[28px] leading-none font-serif text-[#3D2B4C]/30 mb-2">
        &ldquo;
      </span>
      <p className="text-[17px] leading-snug font-medium text-[#1F1F1F] italic -mt-1">
        {quote}
      </p>
      {attribution && (
        <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-[#3D2B4C]/50">
          — {attribution}
        </p>
      )}
    </div>
  );
}
