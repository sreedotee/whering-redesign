"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import SectionHeader from "../SectionHeader";
import { fadeInUp } from "@/styles/animations";
import EmojiImage from "../EmojiImage";

import Image from "next/image";

interface Screen {
  title: string;
  caption: string;
  bg: string;
  icon: string;
  imageSrc?: string;
  scrollable?: boolean;
  slideshow?: string[];
}

interface ModeDesignsProps {
  sectionNumber: string;
  id: string;
  modeTitle: string;
  subtitle: string;
  intro: string;
  screens: Screen[];
  feature?: { icon: string; title: string; text: string };
  flowSteps?: string[];
  bg?: string;
}

function PhoneScreen({ screen }: { screen: Screen }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    if (!screen.slideshow) return;
    const interval = setInterval(() => {
      setSlideIndex((i) => (i + 1) % screen.slideshow!.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [screen.slideshow]);

  const handleMouseEnter = () => {
    if (screen.scrollable && containerRef.current && imgRef.current) {
      const dist = imgRef.current.offsetHeight - containerRef.current.offsetHeight;
      setScrollY(dist > 0 ? -dist : 0);
    }
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setScrollY(0);
    setHovered(false);
  };

  const activeSrc = screen.slideshow ? screen.slideshow[slideIndex] : screen.imageSrc;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="relative mb-4 overflow-clip rounded-[32px] hover:shadow-xl transition-shadow duration-300">
        {/* Phone screen area */}
        <div
          ref={containerRef}
          className="w-full aspect-[393/852] overflow-hidden"
          style={activeSrc ? {} : { background: screen.bg }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {screen.slideshow ? (
            <Image
              src={activeSrc!}
              alt={screen.title}
              className="w-full h-full object-cover"
              width={393}
              height={852}
              unoptimized
            />
          ) : activeSrc ? (
            screen.scrollable ? (
              <motion.img
                ref={imgRef}
                src={activeSrc}
                alt={screen.title}
                className="w-full h-auto block"
                animate={{ y: hovered ? scrollY : 0 }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />
            ) : (
              <Image
                src={activeSrc}
                alt={screen.title}
                className="w-full h-full object-cover"
                width={393}
                height={852}
                unoptimized
              />
            )
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-6">
              <EmojiImage name={screen.icon} size={60} alt={screen.title} />
              <p className="heading text-white text-center">{screen.title}</p>
              <div className="space-y-2 w-full">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-2 rounded bg-white/20" style={{ width: `${70 + i * 10}%` }} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="text-center px-1">
        <p className="card-heading !text-sm mb-0.5">{screen.title}</p>
        <p className="card-supporting">{screen.caption}</p>
      </div>
    </motion.div>
  );
}

export default function ModeDesigns({
  sectionNumber,
  id,
  modeTitle,
  subtitle,
  intro,
  screens,
  feature,
  flowSteps,
  bg = "bg-white",
}: ModeDesignsProps) {
  return (
    <section id={id} className={`py-4 ${bg}`}>
      <div className="w-full">
        <SectionHeader number={sectionNumber} title={modeTitle} subtitle={subtitle} />

        <motion.p {...fadeInUp} className="narrative-body mb-8 max-w-2xl">
          {intro}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {screens.map((screen) => (
            <PhoneScreen key={screen.title} screen={screen} />
          ))}
        </div>

        {feature && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-clip py-5 px-6 flex items-center gap-6 mb-8 bg-surface border border-black/5"
          >
            <div className="p-3 bg-white rounded-xl shadow-sm border border-black/5">
              <EmojiImage name={feature.icon} size={28} />
            </div>
            <div>
              <h4 className="card-heading mb-1">
                {feature.title}
              </h4>
              <p className="card-body">{feature.text}</p>
            </div>
          </motion.div>
        )}

        {flowSteps && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-clip py-5 px-6 bg-surface border border-black/5"
          >
            <h4 className="card-microlabel mb-4">
              User Flow
            </h4>
            <div className="flex flex-wrap items-center gap-3">
              {flowSteps.map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <span className="px-4 py-2 bg-white rounded-xl card-supporting font-medium" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                    {step}
                  </span>
                  {i < flowSteps.length - 1 && (
                    <span className="text-plum/30 font-bold">→</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
