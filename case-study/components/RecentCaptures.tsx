import React from "react";
import SectionHeader from "./SectionHeader";
import Image from "next/image";

const NEW_CAPTURES = [
  {
    domain: "clickup.com",
    name: "Effects",
    src: "/reference-images/clickup.com-effects.png",
  },
  {
    domain: "clickup.com",
    name: "Middle Symbol",
    src: "/reference-images/clickup.com-middle symbol atelia.png",
  },
  {
    domain: "clickup.com",
    name: "People and Cards",
    src: "/reference-images/clickup.com-people and cards.png",
  },
  {
    domain: "clickup.com",
    name: "Scattered Screenshots",
    src: "/reference-images/clickup.com-scattered screenshots.png",
  },
  {
    domain: "www.campsite.com",
    name: "Integrate",
    src: "/reference-images/www.campsite.com-integrate.png",
  },
  {
    domain: "www.glideapps.com",
    name: "Avatars",
    src: "/reference-images/www.glideapps.com-avatars.png",
  },
  {
    domain: "www.glideapps.com",
    name: "Circle Layout",
    src: "/reference-images/www.glideapps.com-cicrcle.png",
  },
  {
    domain: "www.glideapps.com",
    name: "Flow Tab Icons",
    src: "/reference-images/www.glideapps.com-flow tab icons.png",
  },
];

export default function RecentCaptures() {
  return (
    <div className="container-standard py-24">
      <SectionHeader number="RAW" title="Newly Added Captures" subtitle="Raw screenshots waiting for reconstruction sweep." />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {NEW_CAPTURES.map((cap, i) => (
          <div key={i} className="group border border-black/5 rounded-3xl overflow-hidden bg-[#F9F9FA] hover:shadow-xl transition-all duration-500">
            <div className="p-6 border-b border-black/5 bg-white flex justify-between items-center">
               <div>
                 <p className="card-microlabel mb-1.5">{cap.domain}</p>
                 <h4 className="card-heading !text-sm">{cap.name}</h4>
               </div>
               <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden">
               <Image 
                 src={cap.src} 
                 alt={cap.name} 
                 fill 
                 className="object-cover group-hover:scale-105 transition-transform duration-700" 
                 unoptimized
               />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
