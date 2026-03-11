"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { AITimelineMilestone } from "@/data/timeline";

const categoryColors: Record<string, string> = {
  research: "#818cf8",
  product: "#22d3ee",
  cultural: "#fbbf24",
  regulation: "#f87171",
  infrastructure: "#34d399",
  competition: "#fb923c",
  "open-source": "#a78bfa",
};

const categoryLabels: Record<string, string> = {
  research: "Research",
  product: "Product",
  cultural: "Cultural",
  regulation: "Regulation",
  infrastructure: "Infrastructure",
  competition: "Competition",
  "open-source": "Open Source",
};

function ImpactStars({ level }: { level: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Impact level ${level} of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          className={`w-1.5 h-1.5 rounded-full ${
            i < level ? "bg-[#fbbf24]" : "bg-[#1e293b]"
          }`}
        />
      ))}
    </div>
  );
}

export default function MilestoneCard({
  milestone,
  index,
  eraColor,
}: {
  milestone: AITimelineMilestone;
  index: number;
  eraColor: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const isLandmark = milestone.impactLevel === 5;

  return (
    <motion.article
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      className={`group relative ${isLandmark ? "col-span-full" : ""}`}
    >
      <div className="flex gap-4 sm:gap-6">
        {/* Timeline spine */}
        <div className="flex flex-col items-center shrink-0">
          <div
            className={`rounded-full border-2 transition-all duration-300 ${
              isLandmark
                ? "w-4 h-4 shadow-lg"
                : "w-3 h-3 group-hover:w-3.5 group-hover:h-3.5"
            }`}
            style={{
              borderColor: eraColor,
              backgroundColor: isLandmark ? eraColor : "transparent",
              boxShadow: isLandmark ? `0 0 12px ${eraColor}60` : "none",
            }}
          />
          <div
            className="w-px flex-1 min-h-[20px]"
            style={{ backgroundColor: `${eraColor}30` }}
          />
        </div>

        {/* Card content */}
        <div
          onClick={() => setExpanded(!expanded)}
          onKeyDown={(e) => e.key === "Enter" && setExpanded(!expanded)}
          role="button"
          tabIndex={0}
          className={`flex-1 rounded-xl border transition-all duration-300 cursor-pointer mb-4 ${
            isLandmark
              ? "bg-gradient-to-br from-[#0f172a] to-[#1e293b] border-white/20 p-5 sm:p-6"
              : "bg-[#0f172a]/60 border-white/5 p-4 sm:p-5 hover:border-white/15 hover:bg-[#0f172a]/80"
          }`}
          style={
            isLandmark
              ? { boxShadow: `0 0 30px ${eraColor}15, inset 0 1px 0 ${eraColor}20` }
              : undefined
          }
        >
          {/* Header row */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-3">
              <time
                className="text-sm font-mono shrink-0"
                style={{ color: eraColor }}
              >
                {milestone.year}
                {milestone.month &&
                  `.${String(milestone.month).padStart(2, "0")}`}
              </time>
              <ImpactStars level={milestone.impactLevel} />
            </div>
            <span
              className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border shrink-0"
              style={{
                color: categoryColors[milestone.category],
                borderColor: `${categoryColors[milestone.category]}40`,
              }}
            >
              {categoryLabels[milestone.category]}
            </span>
          </div>

          <h3
            className={`font-semibold mb-2 ${
              isLandmark ? "text-xl sm:text-2xl text-[#f1f5f9]" : "text-base sm:text-lg text-[#e2e8f0]"
            }`}
          >
            {milestone.title}
          </h3>

          <p
            className={`text-[#94a3b8] text-sm leading-relaxed ${
              expanded ? "" : "line-clamp-2"
            }`}
          >
            {milestone.description}
          </p>

          {/* Expanded content */}
          <motion.div
            initial={false}
            animate={{
              height: expanded ? "auto" : 0,
              opacity: expanded ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-3 mt-3 border-t border-white/5">
              <p className="text-sm text-[#22d3ee] italic mb-3">
                {milestone.impact}
              </p>

              {milestone.people.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {milestone.people.map((person) => (
                    <span
                      key={person}
                      className="text-[11px] bg-[#1e293b] text-[#94a3b8] px-2 py-0.5 rounded-md"
                    >
                      {person}
                    </span>
                  ))}
                </div>
              )}

              {milestone.organizations.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {milestone.organizations.map((org) => (
                    <span
                      key={org}
                      className="text-[11px] bg-[#1e293b] text-[#818cf8] px-2 py-0.5 rounded-md"
                    >
                      {org}
                    </span>
                  ))}
                </div>
              )}

              {milestone.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {milestone.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] text-[#475569] font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Expand hint */}
          {!expanded && (
            <div className="mt-2 text-[10px] text-[#475569] group-hover:text-[#94a3b8] transition-colors">
              Click to expand
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
