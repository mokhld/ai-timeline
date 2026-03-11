"use client";

import { motion } from "framer-motion";
import { milestones, type AIEraInfo } from "@/data/timeline";
import MilestoneCard from "./MilestoneCard";

export default function EraSection({ era }: { era: AIEraInfo }) {
  const eraMilestones = milestones
    .filter((m) => m.era === era.id)
    .sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return (a.month ?? 0) - (b.month ?? 0);
    });

  return (
    <section
      id={`era-${era.id}`}
      className="relative py-16 sm:py-24"
    >
      {/* Era background glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          background: `radial-gradient(ellipse at 30% 20%, ${era.color} 0%, transparent 60%)`,
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4">
        {/* Era intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-3 h-3 rounded-full shadow-lg"
              style={{
                backgroundColor: era.color,
                boxShadow: `0 0 12px ${era.color}60`,
              }}
            />
            <span className="text-sm font-mono text-[#475569]">
              {era.yearStart}–{era.yearEnd}
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            style={{ color: era.color }}
          >
            {era.name}
          </h2>

          <p className="text-lg text-[#94a3b8] max-w-2xl leading-relaxed">
            {era.description}
          </p>

          <div className="mt-4 text-sm text-[#475569] font-mono">
            {eraMilestones.length} milestone
            {eraMilestones.length !== 1 ? "s" : ""}
          </div>
        </motion.div>

        {/* Milestones */}
        <div className="space-y-0">
          {eraMilestones.map((milestone, index) => (
            <MilestoneCard
              key={milestone.id}
              milestone={milestone}
              index={index}
              eraColor={era.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
