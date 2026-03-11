"use client";

import { motion } from "framer-motion";
import { milestones, eras } from "@/data/timeline";

const categoryLabels: Record<string, string> = {
  research: "Research",
  product: "Products",
  cultural: "Cultural",
  regulation: "Regulation",
  infrastructure: "Infrastructure",
  competition: "Competitions",
  "open-source": "Open Source",
};

const categoryColors: Record<string, string> = {
  research: "#818cf8",
  product: "#22d3ee",
  cultural: "#fbbf24",
  regulation: "#f87171",
  infrastructure: "#34d399",
  competition: "#fb923c",
  "open-source": "#a78bfa",
};

export default function Footer() {
  // Count milestones per category
  const categoryCounts: Record<string, number> = {};
  milestones.forEach((m) => {
    categoryCounts[m.category] = (categoryCounts[m.category] || 0) + 1;
  });

  return (
    <footer className="relative py-24 sm:py-32">
      {/* Gradient top edge */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#818cf8]/30 to-transparent" />

      <div className="max-w-4xl mx-auto px-4">
        {/* Closing message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-2xl sm:text-3xl font-bold text-[#f1f5f9] mb-3">
            The story continues...
          </p>
          <p className="text-[#475569] font-mono text-sm">
            Last updated: March 2026
          </p>
        </motion.div>

        {/* Category summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-16"
        >
          {Object.entries(categoryCounts)
            .sort(([, a], [, b]) => b - a)
            .map(([category, count]) => (
              <div
                key={category}
                className="bg-[#0f172a]/60 border border-white/5 rounded-lg p-4 text-center"
              >
                <div
                  className="text-2xl font-bold font-mono mb-1"
                  style={{ color: categoryColors[category] }}
                >
                  {count}
                </div>
                <div className="text-xs text-[#94a3b8]">
                  {categoryLabels[category]}
                </div>
              </div>
            ))}
        </motion.div>

        {/* Stats bar */}
        <div className="flex items-center justify-center gap-6 text-sm text-[#475569] mb-8">
          <span>
            <span className="text-[#f1f5f9] font-mono">
              {milestones.length}
            </span>{" "}
            milestones
          </span>
          <span className="text-[#1e293b]">|</span>
          <span>
            <span className="text-[#f1f5f9] font-mono">{eras.length}</span> eras
          </span>
          <span className="text-[#1e293b]">|</span>
          <span>
            <span className="text-[#f1f5f9] font-mono">83</span> years
          </span>
        </div>

        {/* Bottom line */}
        <div className="text-center text-xs text-[#475569]">
          <p>AI Timeline — An immersive journey through the history of artificial intelligence</p>
        </div>
      </div>
    </footer>
  );
}
