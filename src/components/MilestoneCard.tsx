"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { AITimelineMilestone } from "@/data/timeline";
import MilestoneImage from "./MilestoneImage";
import ImpactDots from "./ImpactDots";
import { categoryColors, categoryLabels } from "@/lib/colors";
import { trackMilestoneDetailClick } from "@/lib/analytics";

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
  const detailsId = `${milestone.id}-details`;
  const shouldReduceMotion = useReducedMotion();

  return (
    <article
      className={`group relative will-change-transform ${isLandmark ? "col-span-full" : ""}`}
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
          className={`flex-1 rounded-xl border transition-all duration-300 mb-4 ${
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
                dateTime={`${milestone.year}${milestone.month ? `-${String(milestone.month).padStart(2, "0")}` : ""}`}
                className="text-sm font-mono shrink-0"
                style={{ color: eraColor }}
              >
                {milestone.year}
                {milestone.month &&
                  `.${String(milestone.month).padStart(2, "0")}`}
              </time>
              <ImpactDots level={milestone.impactLevel} />
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

          <div className="flex gap-4 items-start">
            {milestone.imageUrl && (
              <MilestoneImage
                src={milestone.imageUrl}
                alt={milestone.imageAlt ?? milestone.title}
                eraColor={eraColor}
                isLandmark={isLandmark}
              />
            )}
            <div className="flex-1 min-w-0">
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
            </div>
          </div>

          {/* Expanded content */}
          <motion.div
            id={detailsId}
            initial={false}
            animate={{
              height: expanded ? "auto" : 0,
              opacity: expanded ? 1 : 0,
            }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
            aria-hidden={!expanded}
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

          <div className="mt-3 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
              aria-controls={detailsId}
              className="inline-flex min-h-9 items-center rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-[#cbd5e1] transition-colors hover:border-white/20 hover:text-white"
            >
              {expanded ? "Collapse details" : "Expand details"}
            </button>
            <Link
              href={`/timeline/${milestone.id}`}
              onClick={() =>
                trackMilestoneDetailClick("immersive_timeline", milestone.id)
              }
              className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-[11px] font-medium text-[#cbd5e1] transition-colors hover:border-[#818cf8]/40 hover:text-white"
            >
              Read full milestone
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
