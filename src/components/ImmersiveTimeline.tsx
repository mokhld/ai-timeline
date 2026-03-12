"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { eras, milestones, timelineStats } from "@/data/timeline";
import { getHomepageStartingPoints } from "@/lib/homepage";
import { categoryColors } from "@/lib/colors";
import { categoryLabel } from "@/lib/timeline-utils";
import { trackKnowledgeGraphCtaClick } from "@/lib/analytics";
import HeroScene from "./HeroScene";
import TimelineNavigator from "./TimelineNavigator";
import EraSection from "./EraSection";
import Footer from "./Footer";
import NewsletterSignup from "./NewsletterSignup";

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
  const desktopStartPanelId = useId();
  const desktopGraphPanelId = useId();
  const mobileSheetTitleId = useId();
  const mobileStartTabId = useId();
  const mobileGraphTabId = useId();
  const mobileStartPanelId = useId();
  const mobileGraphPanelId = useId();
  const timelineEntryRef = useRef<HTMLDivElement>(null);
  const desktopStartTriggerRef = useRef<HTMLButtonElement>(null);
  const desktopGraphTriggerRef = useRef<HTMLButtonElement>(null);
  const activeDesktopTriggerRef = useRef<HTMLButtonElement | null>(null);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileSheetRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [showUtilities, setShowUtilities] = useState(false);
  const [desktopPanel, setDesktopPanel] = useState<"start" | "graph" | null>(
    null
  );
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const [mobilePanel, setMobilePanel] = useState<"start" | "graph">("start");

  useEffect(() => {
    const entry = timelineEntryRef.current;
    if (!entry) return;

    const updateVisibility = () => {
      const entryTop = entry.getBoundingClientRect().top;
      setShowUtilities(entryTop <= 0);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  useEffect(() => {
    const opener = mobileTriggerRef.current;
    const previousOverflow = document.body.style.overflow;
    if (!mobileSheetOpen) {
      document.body.style.overflow = previousOverflow;
      return;
    }

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileSheetOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const sheet = mobileSheetRef.current;
      if (!sheet) return;

      const focusableElements = sheet.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleBreakpointChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setMobileSheetOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    mediaQuery.addEventListener("change", handleBreakpointChange);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      mediaQuery.removeEventListener("change", handleBreakpointChange);
      if (opener?.isConnected) {
        opener.focus();
      }
    };
  }, [mobileSheetOpen]);

  const openMobilePanel = (panel: "start" | "graph") => {
    setMobilePanel(panel);
    setMobileSheetOpen(true);
  };

  const closeDesktopPanel = () => {
    setDesktopPanel(null);
    activeDesktopTriggerRef.current?.focus();
  };

  const handleMobileTabKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    panel: "start" | "graph"
  ) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

    event.preventDefault();
    const nextPanel = panel === "start" ? "graph" : "start";
    setMobilePanel(nextPanel);

    const nextTab =
      nextPanel === "start"
        ? document.getElementById(mobileStartTabId)
        : document.getElementById(mobileGraphTabId);

    (nextTab as HTMLButtonElement | null)?.focus();
  };

  const renderStartHereContent = () => (
    <div className="space-y-5">
      <div>
        <h3 className="text-sm font-semibold text-[#f8fafc]">
          Quick shortcuts
        </h3>
        <p className="mt-1 text-xs text-[#94a3b8] leading-relaxed">
          Use these to jump around the site, but the main experience is still
          the full timeline underneath.
        </p>
      </div>

      <div>
        <p className="mb-2 text-[11px] font-mono uppercase tracking-[0.22em] text-[#64748b]">
          By era
        </p>
        <div className="grid gap-2">
          {eraHighlights.slice(0, 6).map((era) => (
            <Link
              key={era.id}
              href={`/era/${era.id}`}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 transition-colors hover:border-white/20 hover:bg-white/[0.06]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium" style={{ color: era.color }}>
                  {era.name}
                </span>
                <span className="text-[11px] font-mono text-[#64748b]">
                  {era.count}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-[11px] font-mono uppercase tracking-[0.22em] text-[#64748b]">
          By category
        </p>
        <div className="flex flex-wrap gap-2">
          {categoryHighlights.slice(0, 5).map((category) => (
            <Link
              key={category.category}
              href={`/category/${category.category}`}
              className="rounded-full border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-white/5"
              style={{
                borderColor: `${categoryColors[category.category]}40`,
                color: categoryColors[category.category],
              }}
            >
              {category.label}
            </Link>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-[11px] font-mono uppercase tracking-[0.22em] text-[#64748b]">
          Landmark starts
        </p>
        <div className="grid gap-2">
          {featuredStartingPoints.slice(0, 3).map((milestone) => (
            <Link
              key={milestone.id}
              href={`/timeline/${milestone.id}`}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 transition-colors hover:border-[#818cf8]/30 hover:bg-white/[0.06]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-[#f8fafc]">
                  {milestone.title}
                </span>
                <span className="text-[11px] font-mono text-[#22d3ee]">
                  {milestone.year}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-[11px] font-mono uppercase tracking-[0.22em] text-[#64748b]">
          Curated reads
        </p>
        <div className="grid gap-2">
          {historyHighlights.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 transition-colors hover:border-[#22d3ee]/30 hover:bg-white/[0.06]"
            >
              <h4 className="text-sm font-medium text-[#f8fafc]">
                {guide.title}
              </h4>
              <p className="mt-1 text-xs text-[#94a3b8] leading-relaxed">
                {guide.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  const renderGraphContent = () => (
    <div className="space-y-5">
      <div>
        <h3 className="text-sm font-semibold text-[#f8fafc]">
          Explore the knowledge graph
        </h3>
        <p className="mt-1 text-xs text-[#94a3b8] leading-relaxed">
          Follow how breakthroughs, products, and eras connect across the
          history of AI without leaving the timeline context too early.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#020617]/70 p-4">
        <div className="relative h-36 rounded-xl border border-white/5 bg-[radial-gradient(circle_at_20%_25%,rgba(99,102,241,0.25),transparent_35%),radial-gradient(circle_at_70%_35%,rgba(34,211,238,0.22),transparent_40%),radial-gradient(circle_at_45%_75%,rgba(129,140,248,0.18),transparent_35%),linear-gradient(180deg,rgba(15,23,42,0.95),rgba(2,6,23,0.95))]">
          <div className="absolute inset-0">
            {[
              "left-[14%] top-[22%]",
              "left-[30%] top-[58%]",
              "left-[44%] top-[28%]",
              "left-[59%] top-[67%]",
              "left-[72%] top-[33%]",
              "left-[84%] top-[53%]",
            ].map((position, index) => (
              <span
                key={position}
                className={`absolute h-3 w-3 rounded-full ${
                  index % 2 === 0 ? "bg-[#818cf8]" : "bg-[#22d3ee]"
                } ${position}`}
              />
            ))}
            <span className="absolute left-[18%] top-[28%] h-px w-28 rotate-[18deg] bg-white/15" />
            <span className="absolute left-[35%] top-[58%] h-px w-24 -rotate-[24deg] bg-white/15" />
            <span className="absolute left-[52%] top-[38%] h-px w-24 rotate-[28deg] bg-white/15" />
          </div>
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#020617] to-transparent" />
        </div>
        <div className="mt-3 flex items-center justify-between gap-3 text-[11px] text-[#94a3b8]">
          <span>{timelineStats.totalMilestones} connected nodes</span>
          <span>{timelineStats.eras} eras</span>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-xs font-mono uppercase tracking-[0.22em] text-[#64748b]">
          Explain
        </p>
        <p className="mt-2 text-sm text-[#cbd5e1] leading-relaxed">
          The graph is useful when you want to see adjacency rather than
          chronology: which milestones cluster together, which eras overlap in
          influence, and how ideas travel across the timeline.
        </p>
      </div>

      <Link
        href="/explore"
        onClick={() => trackKnowledgeGraphCtaClick("timeline_utility")}
        className="inline-flex items-center justify-center rounded-full bg-[#6366f1] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#4f46e5]"
      >
        Explore the knowledge graph
      </Link>
    </div>
  );

  return (
    <>
      <HeroScene />
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
      {showUtilities && (
        <>
          <div className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:flex">
            <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#020617]/85 p-3 shadow-2xl shadow-black/30 backdrop-blur-md">
              <button
                ref={desktopStartTriggerRef}
                type="button"
                onClick={() => {
                  activeDesktopTriggerRef.current = desktopStartTriggerRef.current;
                  setDesktopPanel((current) =>
                    current === "start" ? null : "start"
                  );
                }}
                aria-expanded={desktopPanel === "start"}
                aria-controls={desktopStartPanelId}
                className={`w-44 rounded-2xl border px-4 py-3 text-left transition-colors ${
                  desktopPanel === "start"
                    ? "border-[#22d3ee]/40 bg-[#22d3ee]/12"
                    : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
                }`}
              >
                <span className="block text-xs font-mono uppercase tracking-[0.24em] text-[#67e8f9]">
                  Start Here
                </span>
                <span className="mt-2 block text-sm font-semibold text-[#f8fafc]">
                  Quick shortcuts
                </span>
                <span className="mt-1 block text-xs text-[#94a3b8]">
                  Era, topic, landmark, and guide entry points.
                </span>
              </button>

              <button
                ref={desktopGraphTriggerRef}
                type="button"
                onClick={() => {
                  activeDesktopTriggerRef.current = desktopGraphTriggerRef.current;
                  setDesktopPanel((current) =>
                    current === "graph" ? null : "graph"
                  );
                }}
                aria-expanded={desktopPanel === "graph"}
                aria-controls={desktopGraphPanelId}
                className={`w-44 rounded-2xl border px-4 py-3 text-left transition-colors ${
                  desktopPanel === "graph"
                    ? "border-[#818cf8]/40 bg-[#818cf8]/12"
                    : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
                }`}
              >
                <span className="block text-xs font-mono uppercase tracking-[0.24em] text-[#818cf8]">
                  Knowledge Graph
                </span>
                <div className="mt-2 flex items-center gap-2">
                  <span className="relative block h-8 w-12 overflow-hidden rounded-lg border border-white/10 bg-[radial-gradient(circle_at_20%_25%,rgba(99,102,241,0.35),transparent_35%),radial-gradient(circle_at_70%_35%,rgba(34,211,238,0.28),transparent_40%),linear-gradient(180deg,rgba(15,23,42,0.95),rgba(2,6,23,0.95))]">
                    <span className="absolute left-[18%] top-[32%] h-2 w-2 rounded-full bg-[#818cf8]" />
                    <span className="absolute left-[46%] top-[58%] h-2 w-2 rounded-full bg-[#22d3ee]" />
                    <span className="absolute left-[70%] top-[28%] h-2 w-2 rounded-full bg-[#818cf8]" />
                    <span className="absolute left-[25%] top-[40%] h-px w-6 rotate-[20deg] bg-white/15" />
                    <span className="absolute left-[48%] top-[48%] h-px w-5 -rotate-[25deg] bg-white/15" />
                  </span>
                  <span className="text-xs text-[#94a3b8]">
                    Explore how milestones connect.
                  </span>
                </div>
              </button>
            </div>

            {desktopPanel && (
              <div
                id={
                  desktopPanel === "start"
                    ? desktopStartPanelId
                    : desktopGraphPanelId
                }
                role="region"
                aria-label={
                  desktopPanel === "start"
                    ? "Start Here shortcuts"
                    : "Knowledge Graph"
                }
                className="ml-3 w-80 max-h-[70vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#0f172a]/92 p-5 shadow-2xl shadow-black/40 backdrop-blur-md"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-mono uppercase tracking-[0.24em] text-[#64748b]">
                      Utility
                    </p>
                    <h2 className="mt-1 text-lg font-semibold text-[#f8fafc]">
                      {desktopPanel === "start"
                        ? "Start Here shortcuts"
                        : "Knowledge Graph"}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={closeDesktopPanel}
                    className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-[#94a3b8] transition-colors hover:border-white/20 hover:text-white"
                  >
                    Close
                  </button>
                </div>
                {desktopPanel === "start"
                  ? renderStartHereContent()
                  : renderGraphContent()}
              </div>
            )}
          </div>

          <div className="fixed bottom-5 right-4 z-40 lg:hidden">
            <button
              ref={mobileTriggerRef}
              type="button"
              onClick={() => setMobileSheetOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0f172a]/92 px-4 py-2.5 text-sm font-medium text-[#f8fafc] shadow-2xl shadow-black/35 backdrop-blur-md transition-colors hover:border-white/20"
            >
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#22d3ee]" />
              Explore tools
            </button>
          </div>

          {mobileSheetOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <button
                type="button"
                aria-label="Close utility sheet"
                onClick={() => setMobileSheetOpen(false)}
                className="absolute inset-0 bg-[#020617]/70 backdrop-blur-sm"
              />
              <div
              ref={mobileSheetRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={mobileSheetTitleId}
                className="absolute inset-x-0 bottom-0 rounded-t-[2rem] border-t border-white/10 bg-[#0f172a] px-5 pb-6 pt-4 shadow-2xl shadow-black"
              >
                <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-white/15" />
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h2
                    id={mobileSheetTitleId}
                    className="text-sm font-semibold text-[#f8fafc]"
                  >
                    Explore tools
                  </h2>
                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={() => setMobileSheetOpen(false)}
                    className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-[#94a3b8] transition-colors hover:border-white/20 hover:text-white"
                  >
                    Close
                  </button>
                </div>
                <div
                  role="tablist"
                  aria-label="Timeline utility tools"
                  className="mb-4 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-1"
                >
                  <button
                    id={mobileStartTabId}
                    type="button"
                    onClick={() => openMobilePanel("start")}
                    onKeyDown={(event) => handleMobileTabKeyDown(event, "start")}
                    role="tab"
                    aria-selected={mobilePanel === "start"}
                    aria-controls={mobileStartPanelId}
                    tabIndex={mobilePanel === "start" ? 0 : -1}
                    className={`flex-1 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                      mobilePanel === "start"
                        ? "bg-[#22d3ee]/14 text-[#67e8f9]"
                        : "text-[#94a3b8]"
                    }`}
                  >
                    Start Here
                  </button>
                  <button
                    id={mobileGraphTabId}
                    type="button"
                    onClick={() => openMobilePanel("graph")}
                    onKeyDown={(event) => handleMobileTabKeyDown(event, "graph")}
                    role="tab"
                    aria-selected={mobilePanel === "graph"}
                    aria-controls={mobileGraphPanelId}
                    tabIndex={mobilePanel === "graph" ? 0 : -1}
                    className={`flex-1 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                      mobilePanel === "graph"
                        ? "bg-[#818cf8]/14 text-[#a5b4fc]"
                        : "text-[#94a3b8]"
                    }`}
                  >
                    Knowledge Graph
                  </button>
                </div>
                <div
                  id={
                    mobilePanel === "start"
                      ? mobileStartPanelId
                      : mobileGraphPanelId
                  }
                  role="tabpanel"
                  aria-labelledby={
                    mobilePanel === "start" ? mobileStartTabId : mobileGraphTabId
                  }
                  className="max-h-[55vh] overflow-y-auto pr-1"
                >
                  {mobilePanel === "start"
                    ? renderStartHereContent()
                    : renderGraphContent()}
                </div>
              </div>
            </div>
          )}
        </>
      )}
      <div
        ref={timelineEntryRef}
        id="timeline-journey"
        className="scroll-mt-24"
      >
        <TimelineNavigator />
      </div>
      {eras.map((era, index) => (
        <EraSection key={era.id} era={era} eraIndex={index} />
      ))}
      <Footer />
    </>
  );
}
