"use client";

import { motion } from "framer-motion";
import SectionHeader from "../SectionHeader";

const metricColumns = [
  {
    label: "USER METRICS",
    metrics: [
      { name: "Save rate", target: "60%+ save ≥1 item/week" },
      { name: "Try-on usage", target: "40%+ before purchase" },
      { name: "Return reduction", target: "15% vs control" },
    ],
  },
  {
    label: "BUSINESS METRICS",
    metrics: [
      { name: "Conversion lift", target: "8–12% increase" },
      { name: "Average order value", target: "20%+ higher (outfits)" },
      { name: "Retention", target: "45% MAU" },
    ],
  },
  {
    label: "TECHNICAL METRICS",
    metrics: [
      { name: "Generation time", target: "<5s latency" },
      { name: "AI accuracy", target: "90%+ realistic" },
      { name: "Link parsing", target: "95%+ success" },
    ],
  },
];

export default function ImpactMetrics() {
  return (
    <section id="impact" className="py-10 bg-white">
      <div className="container-standard">
        <SectionHeader number="09" title="Success Metrics" />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-base font-medium text-[#6B6B6B] leading-[27.2px] mb-8 max-w-2xl"
        >
          If this were real, success would be measured across user adoption, business
          outcomes, and technical performance.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {metricColumns.map((col, i) => (
            <motion.div
              key={col.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <p className="card-microlabel mb-8">
                {col.label}
              </p>
              <div className="flex flex-col gap-5">
                {col.metrics.map((metric) => (
                  <div key={metric.name} className="narrative-body flex gap-2 items-start">
                    <span className="narrative-body-bold shrink-0">{metric.name}</span>
                    <span className="text-plum/30">—</span>
                    <span className="opacity-80">{metric.target}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
