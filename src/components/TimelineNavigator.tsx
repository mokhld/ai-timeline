"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { eras, type AIEraInfo } from "@/data/timeline";

export default function TimelineNavigator() {
  const [activeEra, setActiveEra] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Intersection observer for sticky behavior
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const stickyObserver = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0 }
    );
    stickyObserver.observe(sentinel);

    // Scroll spy for active era
    const handleScroll = () => {
      const sections = eras.map((era) => ({
        id: era.id,
        element: document.getElementById(`era-${era.id}`),
      }));

      const viewportCenter = window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i].element;
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= viewportCenter) {
            setActiveEra(sections[i].id);
            return;
          }
        }
      }
      setActiveEra(null);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      stickyObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToEra = (eraId: string) => {
    const el = document.getElementById(`era-${eraId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const activeEraInfo = eras.find((e) => e.id === activeEra);

  return (
    <>
      {/* Sentinel — when this scrolls out of view, the nav becomes sticky */}
      <div ref={sentinelRef} className="h-0" aria-hidden="true" />

      <nav
        className={`z-50 transition-all duration-300 ${
          isSticky
            ? "fixed top-0 left-0 right-0 bg-[#030712]/80 backdrop-blur-xl border-b border-white/5"
            : "relative bg-transparent"
        }`}
        aria-label="Timeline navigation"
      >
        <div className="max-w-6xl mx-auto px-4 py-3">
          {/* Era bar */}
          <div className="flex items-center gap-1">
            {eras.map((era) => {
              const isActive = activeEra === era.id;
              return (
                <button
                  key={era.id}
                  onClick={() => scrollToEra(era.id)}
                  className="relative flex-1 group"
                  aria-label={`${era.name} (${era.yearStart}–${era.yearEnd})`}
                  aria-current={isActive ? "true" : undefined}
                >
                  {/* Bar segment */}
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isActive
                        ? "scale-y-150 shadow-lg"
                        : "opacity-40 group-hover:opacity-70"
                    }`}
                    style={{
                      backgroundColor: era.color,
                      boxShadow: isActive
                        ? `0 0 12px ${era.color}80`
                        : "none",
                    }}
                  />

                  {/* Tooltip on hover */}
                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    <div className="bg-[#1e293b] border border-white/10 rounded-lg px-3 py-2 text-xs shadow-xl">
                      <div className="font-semibold text-[#f1f5f9]">
                        {era.name}
                      </div>
                      <div className="text-[#94a3b8] font-mono">
                        {era.yearStart}–{era.yearEnd}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Year markers */}
          <div className="flex justify-between mt-1.5 text-[10px] font-mono text-[#475569]">
            <span>1943</span>
            <span>1970</span>
            <span>1990</span>
            <span>2010</span>
            <span>2026</span>
          </div>

          {/* Active era label (only when sticky) */}
          <AnimatePresence>
            {isSticky && activeEraInfo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-1 text-center"
              >
                <span
                  className="text-xs font-semibold"
                  style={{ color: activeEraInfo.color }}
                >
                  {activeEraInfo.name}
                </span>
                <span className="text-[10px] text-[#475569] ml-2 font-mono">
                  {activeEraInfo.yearStart}–{activeEraInfo.yearEnd}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
}
