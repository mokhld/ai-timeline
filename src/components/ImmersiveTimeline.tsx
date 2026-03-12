"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { eras, milestones, timelineStats } from "@/data/timeline";
import { getHomepageStartingPoints } from "@/lib/homepage";
import { categoryColors } from "@/lib/colors";
import { categoryLabel } from "@/lib/timeline-utils";
import HeroScene from "./HeroScene";
import TimelineNavigator from "./TimelineNavigator";
import EraSection from "./EraSection";
import Footer from "./Footer";
import NewsletterSignup from "./NewsletterSignup";

const KnowledgeGraphPreview = dynamic(() => import("./KnowledgeGraphPreview"), {
  ssr: false,
});

const featuredStartingPoints = getHomepageStartingPoints(milestones);

const eraHighlights = eras.map((era) => ({
  ...era,
  count: milestones.filter((milestone) => milestone.era === era.id).length,
}));

const categoryHighlights = timelineStats.categories.map((category) => ({
  category,
  label: categoryLabel(category),
  count: milestones.filter((milestone) => milestone.category === category)
    .length,
}));

const historyHighlights = [
  {
    href: "/history/history-of-openai",
    title: "History of OpenAI",
    description:
      "A curated guide to the lab that turned GPT into a mainstream platform.",
  },
  {
    href: "/history/history-of-ai-agents",
    title: "History of AI Agents",
    description:
      "The longer arc from early autonomy ideas to tool-using systems.",
  },
  {
    href: "/history/most-important-ai-milestones",
    title: "Most Important AI Milestones",
    description:
      "A shortlist of the moments that most changed the direction of the field.",
  },
];

export default function ImmersiveTimeline() {
  return (
    <>
      <HeroScene />
      <section
        id="homepage-discovery"
        className="px-4 py-10 md:py-14 scroll-mt-24"
      >
        <div className="max-w-6xl mx-auto rounded-[2rem] border border-white/10 bg-[#0f172a]/65 backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/20">
          <div className="border-b border-white/5 px-6 py-6 md:px-8">
            <p className="text-xs font-mono uppercase tracking-[0.32em] text-[#22d3ee] mb-3">
              Start Here
            </p>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <h2 className="text-2xl md:text-3xl font-bold text-[#f8fafc] mb-2">
                  Pick a path into the history of AI
                </h2>
                <p className="text-sm md:text-base text-[#94a3b8]">
                  The immersive scroll stays intact, but you can now jump in by
                  era, browse the major categories, or open a landmark milestone
                  when you want a faster way to orient yourself.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-mono text-[#cbd5e1]">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                  {timelineStats.totalMilestones} milestones
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                  {timelineStats.eras} eras
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                  {timelineStats.categories.length} categories
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                  {timelineStats.impactLevel5Count} landmark moments
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-6 px-6 py-6 md:px-8 lg:grid-cols-3">
            <section
              id="homepage-eras"
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 scroll-mt-24"
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-[#f8fafc]">
                    Browse by era
                  </h3>
                  <p className="text-sm text-[#94a3b8]">
                    Jump to the chapter that matches your level of context.
                  </p>
                </div>
              </div>
              <div className="grid gap-2">
                {eraHighlights.map((era) => (
                  <Link
                    key={era.id}
                    href={`/era/${era.id}`}
                    className="group rounded-xl border border-white/10 bg-[#020617]/40 px-4 py-3 transition-colors hover:border-white/20 hover:bg-[#020617]/70"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className="text-sm font-semibold"
                        style={{ color: era.color }}
                      >
                        {era.name}
                      </span>
                      <span className="text-[11px] font-mono text-[#64748b]">
                        {era.count}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[#64748b]">
                      {era.yearStart}-{era.yearEnd}
                    </p>
                  </Link>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-[#f8fafc]">
                  Browse by category
                </h3>
                <p className="text-sm text-[#94a3b8]">
                  Follow the breakthroughs, products, policy shifts, and
                  cultural moments that shaped the field.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {categoryHighlights.map((category) => (
                  <Link
                    key={category.category}
                    href={`/category/${category.category}`}
                    className="rounded-full border px-3 py-2 text-xs font-medium transition-colors hover:bg-white/5"
                    style={{
                      borderColor: `${categoryColors[category.category]}40`,
                      color: categoryColors[category.category],
                    }}
                  >
                    {category.label}{" "}
                    <span className="text-[#94a3b8]">({category.count})</span>
                  </Link>
                ))}
              </div>
            </section>

            <section
              id="homepage-landmarks"
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 scroll-mt-24"
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-[#f8fafc]">
                  Start with landmark milestones
                </h3>
                <p className="text-sm text-[#94a3b8]">
                  Four high-signal entry points if you want the fastest route to
                  the biggest turning points.
                </p>
              </div>
              <div className="grid gap-3">
                {featuredStartingPoints.map((milestone) => (
                  <Link
                    key={milestone.id}
                    href={`/timeline/${milestone.id}`}
                    className="rounded-xl border border-white/10 bg-[#020617]/40 px-4 py-3 transition-colors hover:border-[#818cf8]/30 hover:bg-[#020617]/70"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold text-[#f8fafc]">
                        {milestone.title}
                      </span>
                      <span className="text-[11px] font-mono text-[#22d3ee]">
                        {milestone.year}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[#94a3b8]">
                      {categoryLabel(milestone.category)}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          <section className="border-t border-white/5 px-6 py-6 md:px-8">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-lg font-semibold text-[#f8fafc]">
                  Read curated guides
                </h3>
                <p className="text-sm text-[#94a3b8]">
                  Jump from the raw timeline into longer-form explainers and
                  evergreen reading paths.
                </p>
              </div>
              <Link
                href="/history"
                className="text-sm text-[#22d3ee] hover:text-[#67e8f9] transition-colors"
              >
                View all guides
              </Link>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {historyHighlights.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="rounded-xl border border-white/10 bg-[#020617]/40 px-4 py-4 transition-colors hover:border-[#22d3ee]/30 hover:bg-[#020617]/70"
                >
                  <h4 className="text-sm font-semibold text-[#f8fafc]">
                    {guide.title}
                  </h4>
                  <p className="mt-2 text-xs text-[#94a3b8] leading-relaxed">
                    {guide.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </section>
      <KnowledgeGraphPreview />
      <div
        id="homepage-newsletter"
        className="py-16 px-4 bg-gradient-to-b from-transparent to-[#0f172a]/30 scroll-mt-24"
      >
        <NewsletterSignup
          source="homepage"
          title="Get the next major AI milestone in your inbox"
          description="A concise update when new milestones, launches, and agent-era shifts are added to the timeline."
          buttonLabel="Get updates"
        />
      </div>
      <TimelineNavigator />
      {eras.map((era, index) => (
        <EraSection key={era.id} era={era} eraIndex={index} />
      ))}
      <Footer />
    </>
  );
}
