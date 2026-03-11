"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const KnowledgeGraph = dynamic(() => import("./KnowledgeGraph"), { ssr: false });

export default function KnowledgeGraphPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width } = entry.contentRect;
      setDims({ width, height: width < 640 ? 400 : 500 });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="px-4 py-8 md:py-12"
    >
      <div
        ref={containerRef}
        className="relative max-w-6xl mx-auto rounded-2xl border border-white/10 bg-[#0f172a]/60 backdrop-blur-sm overflow-hidden"
      >
        {/* Header */}
        <div className="relative z-10 px-6 pt-6 pb-2 md:px-8 md:pt-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Explore the Knowledge Graph
          </h2>
          <p className="text-sm md:text-base text-[#94a3b8] max-w-xl">
            See how milestones, eras, and breakthroughs connect across the
            history of AI.
          </p>
        </div>

        {/* Graph */}
        <div className="relative" style={{ height: dims.height || 400 }}>
          {dims.width > 0 && (
            <KnowledgeGraph
              width={dims.width}
              height={dims.height || 400}
              interactive={false}
            />
          )}

          {/* Gradient edge overlays */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0f172a]/60 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0f172a] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#0f172a]/60 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#0f172a]/60 to-transparent" />
        </div>

        {/* CTA */}
        <div className="relative z-10 flex justify-center pb-6 -mt-12">
          <a
            href="/explore"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#6366f1] hover:bg-[#4f46e5] text-white font-medium text-sm transition-colors shadow-lg shadow-[#6366f1]/20"
          >
            Explore Full Graph
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </div>
      </div>
    </motion.section>
  );
}
