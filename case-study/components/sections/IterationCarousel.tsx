'use client';

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Iteration {
  id: string;
  version: string;
  title: string;
  description: string;
  details?: React.ReactNode;
  imageSrc?: string;
  imagePlaceholder?: string;
}

interface IterationCarouselProps {
  title: string;
  description?: string;
  iterations: Iteration[];
}

export default function IterationCarousel({
  iterations,
}: IterationCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIteration = iterations[activeIndex];
  const count = iterations.length;
  const offsetPct = `${100 / (2 * count)}%`;

  return (
    <div className="container-standard">
      {/* Horizontal timeline */}
      <div className="relative mb-8">
        {/* Line — spans from first dot center to last dot center */}
        <div
          className="absolute top-3 h-px bg-[#E8E5E6]"
          style={{ left: offsetPct, right: offsetPct }}
        />

        <div className="flex justify-between relative">
          {iterations.map((iter, index) => (
            <button
              key={iter.id}
              onClick={() => setActiveIndex(index)}
              className="flex flex-col items-center gap-3 group relative"
              style={{ flex: 1 }}
            >
              {/* Dot */}
              <div
                className={`w-6 h-6 rounded-full border-2 transition-all relative ${
                  index === activeIndex
                    ? 'border-primary'
                    : index < activeIndex
                    ? 'bg-surface border-surface'
                    : 'bg-white border-surface'
                }`}
              >
                {index === activeIndex && (
                  <motion.div
                    layoutId="iteration-dot-pill"
                    className="absolute inset-0 bg-primary rounded-full"
                    transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
                  />
                )}
              </div>
              {/* Label */}
              <span
                className={`card-microlabel !opacity-100 transition-colors ${
                  index === activeIndex
                    ? '!text-primary'
                    : '!text-tertiary'
                }`}
              >
                {iter.version}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content card */}
      <div className="relative overflow-hidden rounded-2xl bg-black/[0.03] border border-black/5 p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIteration.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <h3 className="card-heading mb-2">
              {activeIteration.title}
            </h3>
            <p className="card-body mb-8 max-w-2xl">
              {activeIteration.description}
            </p>

            {activeIteration.imageSrc && (
              <div className="mb-8 w-fit mx-auto overflow-hidden rounded-xl">
                <Image
                  src={activeIteration.imageSrc}
                  alt={activeIteration.title}
                  className="max-w-full h-auto"
                  width={1200}
                  height={800}
                  style={{ objectFit: 'contain' }}
                  unoptimized
                />
              </div>
            )}

            {!activeIteration.imageSrc && activeIteration.imagePlaceholder && (
              <div
                className="mb-8 w-full aspect-video rounded-2xl flex flex-col items-center justify-center gap-3 bg-white border border-black/5 px-8"
              >
                <p className="card-microlabel !text-inherit opacity-40">Image Placeholder</p>
                <p className="card-body text-center max-w-sm !text-inherit opacity-40">{activeIteration.imagePlaceholder}</p>
              </div>
            )}

            {activeIteration.details && (
              <div>{activeIteration.details}</div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
