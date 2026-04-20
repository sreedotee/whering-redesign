"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  number: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  doubleGap?: boolean;
  tight?: boolean;
}

export default function SectionHeader({
  number,
  title,
  subtitle,
  centered = false,
  className = "",
  doubleGap = false,
  tight = false,
}: SectionHeaderProps) {
  const marginClass = doubleGap ? "mb-16" : tight ? "mb-4" : "mb-8";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-100px" }}
      className={`${marginClass} ${className} ${centered ? "text-center" : ""}`}
    >
      {number && (
        <span className="narrative-microlabel mb-2 block">
          {number}
        </span>
      )}
      <h2 className="narrative-section-heading">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 narrative-body">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
