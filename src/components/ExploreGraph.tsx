"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { eras } from "@/data/timeline";
import { categoryColors, categoryLabels } from "@/lib/colors";
import { buildGraphData } from "@/lib/graph-data";

const KnowledgeGraph = dynamic(() => import("./KnowledgeGraph"), { ssr: false });

export default function ExploreGraph() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ width: 0, height: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  const [activeEra, setActiveEra] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [legendOpen, setLegendOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [hintsVisible, setHintsVisible] = useState(true);

  const graphData = useMemo(() => buildGraphData(), []);

  const categories = useMemo(() => Object.entries(categoryLabels), []);

  // Auto-dismiss hints after 8 seconds
  useEffect(() => {
    if (!hintsVisible) return;
    const t = setTimeout(() => setHintsVisible(false), 8000);
    return () => clearTimeout(t);
  }, [hintsVisible]);

  // Responsive sizing
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      setDims({
        width: el.clientWidth,
        height: window.innerHeight,
      });
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const handleNodeClick = useCallback(
    (slug: string) => {
      router.push(`/timeline/${slug}`);
    },
    [router]
  );

  const toggleEra = (eraId: string) => {
    setActiveEra((prev) => (prev === eraId ? null : eraId));
    setActiveCategory(null);
  };

  const toggleCategory = (cat: string) => {
    setActiveCategory((prev) => (prev === cat ? null : cat));
    setActiveEra(null);
  };

  const hasActiveFilter = activeEra || activeCategory;

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#030712] overflow-hidden">
      {/* Graph canvas */}
      {dims.width > 0 && (
        <KnowledgeGraph
          width={dims.width}
          height={dims.height}
          interactive
          onNodeClick={handleNodeClick}
          highlightEra={activeEra}
          highlightCategory={activeCategory}
          searchQuery={searchQuery}
        />
      )}

      {/* Back button — top left */}
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 z-20 inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0f172a]/80 backdrop-blur-md border border-white/10 text-sm text-[#94a3b8] hover:text-white transition-colors group"
      >
        <svg
          className="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back
      </button>

      {/* Centered search bar — top center */}
      <div className="absolute top-4 inset-x-0 z-20 flex justify-center pointer-events-none">
        <div className="pointer-events-auto w-full max-w-sm mx-16 sm:mx-auto">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search milestones or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0f172a]/80 backdrop-blur-md border border-white/10 text-sm text-white placeholder-[#64748b] outline-none focus:border-[#6366f1]/50 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filters toggle — top right */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <div className="px-3 py-1.5 rounded-lg bg-[#0f172a]/60 backdrop-blur-sm border border-white/5 text-xs text-[#64748b]">
          {graphData.nodes.length} milestones
        </div>
        <button
          onClick={() => setFiltersOpen((v) => !v)}
          className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm transition-all border ${
            filtersOpen || hasActiveFilter
              ? "bg-[#6366f1]/20 border-[#6366f1]/30 text-white"
              : "bg-[#0f172a]/80 backdrop-blur-md border-white/10 text-[#94a3b8] hover:text-white"
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters
          {hasActiveFilter && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1]" />
          )}
        </button>
      </div>

      {/* Filter panel — slides down from top right */}
      {filtersOpen && (
        <div className="absolute top-16 right-4 z-20 w-80 max-h-[70vh] overflow-y-auto p-4 rounded-xl bg-[#0f172a]/90 backdrop-blur-md border border-white/10 space-y-4">
          {/* Era filters */}
          <div>
            <p className="text-xs font-medium text-[#64748b] mb-2 uppercase tracking-wide">Eras</p>
            <div className="flex flex-wrap gap-1.5">
              {eras.map((era) => (
                <button
                  key={era.id}
                  onClick={() => toggleEra(era.id)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-all border ${
                    activeEra === era.id
                      ? "bg-white/15 border-white/20 text-white"
                      : "border-white/5 text-[#94a3b8] hover:border-white/15 hover:text-white"
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: era.color }}
                  />
                  <span className="hidden sm:inline">{era.name}</span>
                  <span className="sm:hidden">
                    {era.yearStart}–{era.yearEnd.toString().slice(2)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Category filters */}
          <div>
            <p className="text-xs font-medium text-[#64748b] mb-2 uppercase tracking-wide">Categories</p>
            <div className="flex flex-wrap gap-1.5">
              {categories.map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => toggleCategory(key)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-all border ${
                    activeCategory === key
                      ? "bg-white/15 border-white/20 text-white"
                      : "border-white/5 text-[#94a3b8] hover:border-white/15 hover:text-white"
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: categoryColors[key] }}
                  />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Clear filters */}
          {hasActiveFilter && (
            <button
              onClick={() => {
                setActiveEra(null);
                setActiveCategory(null);
              }}
              className="text-xs text-[#6366f1] hover:text-[#818cf8] transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      {/* Guidance hints — center of screen, auto-dismiss */}
      {hintsVisible && (
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="pointer-events-auto max-w-xs text-center space-y-3 p-6 rounded-2xl bg-[#0f172a]/80 backdrop-blur-md border border-white/10">
            <h3 className="text-white font-semibold text-base">How to explore</h3>
            <ul className="text-sm text-[#94a3b8] space-y-2 text-left">
              <li className="flex items-start gap-2">
                <span className="text-[#6366f1] mt-0.5 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                </span>
                <span><strong className="text-white">Hover</strong> over a node to see how it connects to others</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#6366f1] mt-0.5 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </span>
                <span><strong className="text-white">Scroll</strong> to zoom in and out</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#6366f1] mt-0.5 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                  </svg>
                </span>
                <span><strong className="text-white">Drag</strong> to pan around the graph</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#6366f1] mt-0.5 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </span>
                <span><strong className="text-white">Click</strong> a node to visit that milestone</span>
              </li>
            </ul>
            <button
              onClick={() => setHintsVisible(false)}
              className="text-xs text-[#64748b] hover:text-white transition-colors mt-2"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Bottom bar — back + legend */}
      <div className="absolute bottom-4 left-4 z-20">
        <a
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0f172a]/80 backdrop-blur-md border border-white/10 text-sm text-[#94a3b8] hover:text-white transition-colors"
        >
          Home
        </a>
      </div>

      {/* Legend toggle */}
      <div className="absolute bottom-4 right-4 z-20">
        <button
          onClick={() => setLegendOpen((v) => !v)}
          className="px-4 py-2 rounded-xl bg-[#0f172a]/80 backdrop-blur-md border border-white/10 text-sm text-[#94a3b8] hover:text-white transition-colors"
        >
          {legendOpen ? "Hide Legend" : "Legend"}
        </button>

        {legendOpen && (
          <div className="absolute bottom-12 right-0 w-64 p-4 rounded-xl bg-[#0f172a]/90 backdrop-blur-md border border-white/10 text-xs space-y-3">
            <div>
              <p className="text-[#64748b] mb-1.5 font-medium">Node Color = Era</p>
              <div className="grid grid-cols-2 gap-1">
                {eras.map((era) => (
                  <div key={era.id} className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: era.color }}
                    />
                    <span className="text-[#94a3b8] truncate">
                      {era.yearStart}s
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[#64748b] mb-1 font-medium">Node Size = Impact Level</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white/40" />
                <span className="text-[#94a3b8]">Low</span>
                <span className="w-4 h-4 rounded-full bg-white/40" />
                <span className="text-[#94a3b8]">High</span>
              </div>
            </div>
            <div>
              <p className="text-[#64748b] mb-1 font-medium">Line Thickness = Relatedness</p>
              <p className="text-[#94a3b8]">Thicker connections = more related</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
