/**
 * EmojiImage — renders an iOS emoji PNG from /public/images/emojis/{name}.png
 *
 * Dimensions: supply PNG files at 160×160px (Apple's native emoji size).
 * They'll be displayed at whatever `size` you pass (default 24px).
 *
 * File naming — drop files in /public/images/emojis/ using these slugs:
 *
 *   FILE                    EMOJI   USED IN
 *   palette.png             🎨      Design Decisions whiteboard header
 *   sparkles.png            ✨      Hero (floating badge), Mode 2 Try-On Canvas placeholder, Mode 2 feature banner
 *   dress.png               👗      Hero (floating badge), Mode 2 Item Selection placeholder
 *   home.png                🏠      Mode 1 Home screen placeholder
 *   link.png                🔗      Mode 1 Paste Link Preview placeholder
 *   floppy-disk.png         💾      Mode 1 Save to Collection placeholder
 *   card-index-dividers.png 🗂️      Mode 1 Collection Detail placeholder, Overview outcome item
 *   lightning.png           ⚡      Mode 2 Generating... placeholder
 *   party-popper.png        🎉      Mode 2 Post-Generation Result placeholder
 *   clipboard.png           📋      Mode 3 Try-On History placeholder
 *   heart.png               ❤️      Mode 3 Outfit Detail placeholder
 *   magnifying-glass.png    🔍      Mode 3 Item Detail placeholder, Research Approach competitive analysis card
 *   card-file-box.png       🗃️      Mode 3 Collections Grid placeholder
 *   email.png               📧      Footer contact links
 *   briefcase.png           💼      Footer contact links (LinkedIn)
 *   bird.png                🐦      Footer contact links (Twitter)
 *   basketball.png          🏀      Footer contact links (Dribbble)
 *   tshirt.png              👕      Card Sorting — type-based column
 *   high-heel.png           👠      Card Sorting — occasion-based column
 *   handbag.png             👜      Card Sorting — occasion-based column
 *   one-piece-swimsuit.png  🩱      Card Sorting — occasion-based column
 *   speech-bubble.png       💬      Research Approach — User Research card
 *   joker.png               🃏      Research Approach — Card Sorting card
 *   person.png              👤      Strategic Opportunity — Consumer Value column
 *   office.png              🏢      Strategic Opportunity — Retailer Value column
 *   bar-chart.png           📊      Strategic Opportunity — Market Gap column, Reflection improvements
 *   lightbulb.png           💡      Competitive Landscape — The Gap callout
 *   refresh.png             🔄      Reflection — "Test earlier" improvement
 *   locked.png              🔐      Reflection — "Deeper privacy" improvement
 *   triangular-ruler.png    📐      Reflection — "Simplify scope" improvement
 *   mobile-phone.png        📱      Overview outcome item (Universal Saving)
 */

import Image from "next/image";

interface EmojiImageProps {
  /** Slug matching the PNG filename in /public/images/emojis/ */
  name: string;
  /** Display size in px (width & height). Source files should be 160×160px. */
  size?: number;
  alt?: string;
  className?: string;
}

export default function EmojiImage({ name, size = 24, alt = "", className }: EmojiImageProps) {
  return (
    <Image
      src={`/images/emojis/${name}.png`}
      alt={alt}
      width={size}
      height={size}
      className={className}
      style={{ display: "inline-block", objectFit: "contain", flexShrink: 0 }}
    />
  );
}
