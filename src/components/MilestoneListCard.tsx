"use client";

import type { AITimelineMilestone } from "@/data/timeline";
import MilestoneImage from "./MilestoneImage";
import ImpactDots from "./ImpactDots";
import { categoryColors, categoryLabels } from "@/lib/colors";

export default function MilestoneListCard({
  milestone,
  eraColor,
  index,
  showYear = true,
  showCategory = true,
  showEraName,
}: {
  milestone: AITimelineMilestone;
  eraColor: string;
  index: number;
  showYear?: boolean;
  showCategory?: boolean;
  showEraName?: string;
}) {
  return (
    <a
      href={`/timeline/${milestone.id}`}
      className="block rounded-xl border border-white/5 bg-[#0f172a]/60 p-4 sm:p-5 hover:border-white/15 hover:bg-[#0f172a]/80 transition-all duration-300 animate-card-entrance"
      style={{
        animationDelay: `${index * 60}ms`,
        boxShadow: `0 0 0 0 ${eraColor}00`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${eraColor}15`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 0 ${eraColor}00`;
      }}
    >
      <div className="flex gap-4 items-start">
        {milestone.imageUrl && (
          <MilestoneImage
            src={milestone.imageUrl}
            alt={milestone.imageAlt ?? milestone.title}
            eraColor={eraColor}
          />
        )}
        <div className="flex-1 min-w-0">
          {/* Meta row */}
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            {showYear && (
              <time
                dateTime={`${milestone.year}${milestone.month ? `-${String(milestone.month).padStart(2, "0")}` : ""}`}
                className="text-sm font-mono shrink-0"
                style={{ color: eraColor }}
              >
                {milestone.year}
                {milestone.month && `.${String(milestone.month).padStart(2, "0")}`}
              </time>
            )}
            {showCategory && (
              <span
                className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border shrink-0"
                style={{
                  color: categoryColors[milestone.category],
                  borderColor: `${categoryColors[milestone.category]}40`,
                }}
              >
                {categoryLabels[milestone.category]}
              </span>
            )}
            {showEraName && (
              <span className="text-[11px] text-[#64748b]">
                {showEraName}
              </span>
            )}
            <ImpactDots level={milestone.impactLevel} />
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-semibold text-[#e2e8f0] mb-1">
            {milestone.title}
          </h3>

          {/* Description */}
          <p className="text-[#94a3b8] text-sm leading-relaxed line-clamp-2">
            {milestone.description}
          </p>

          {/* People & orgs preview */}
          {(milestone.people.length > 0 || milestone.organizations.length > 0) && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {milestone.people.slice(0, 2).map((person) => (
                <span
                  key={person}
                  className="text-[11px] bg-[#1e293b] text-[#94a3b8] px-2 py-0.5 rounded-md"
                >
                  {person}
                </span>
              ))}
              {milestone.organizations.slice(0, 2).map((org) => (
                <span
                  key={org}
                  className="text-[11px] bg-[#1e293b] text-[#818cf8] px-2 py-0.5 rounded-md border border-[#818cf8]/10"
                >
                  {org}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </a>
  );
}
