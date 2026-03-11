"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { milestones, eras } from "@/data/timeline";
import { categoryColors, categoryLabels } from "@/lib/colors";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const categoryCounts: Record<string, number> = {};
  milestones.forEach((m) => {
    categoryCounts[m.category] = (categoryCounts[m.category] || 0) + 1;
  });

  useGSAP(
    () => {
      if (!footerRef.current) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Closing message - scale up dramatically
        gsap.fromTo(
          closingRef.current,
          { scale: 0.7, opacity: 0, filter: "blur(4px)" },
          {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: closingRef.current,
              start: "top 85%",
              end: "top 50%",
              scrub: 1,
            },
          }
        );

        // Category cards - stagger from bottom with scale
        if (gridRef.current) {
          gsap.fromTo(
            gridRef.current.children,
            { y: 40, opacity: 0, scale: 0.9 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.6,
              stagger: 0.08,
              ease: "back.out(1.5)",
              scrollTrigger: {
                trigger: gridRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([closingRef.current], {
          opacity: 1,
          scale: 1,
          filter: "none",
        });
        if (gridRef.current) {
          gsap.set(gridRef.current.children, {
            opacity: 1,
            y: 0,
            scale: 1,
          });
        }
      });
    },
    { scope: footerRef }
  );

  return (
    <footer ref={footerRef} className="relative py-24 sm:py-32">
      {/* Gradient top edge */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#818cf8]/30 to-transparent" />

      <div className="max-w-4xl mx-auto px-4">
        {/* Closing message */}
        <div ref={closingRef} className="text-center mb-16" style={{ opacity: 0 }}>
          <p className="text-2xl sm:text-3xl font-bold text-[#f1f5f9] mb-3">
            The story continues...
          </p>
          <p className="text-[#475569] font-mono text-sm">
            Last updated: March 2026
          </p>
        </div>

        {/* Category summary — linked for crawlability */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-16"
        >
          {Object.entries(categoryCounts)
            .sort(([, a], [, b]) => b - a)
            .map(([category, count]) => (
              <a
                key={category}
                href={`/category/${category}`}
                className="bg-[#0f172a]/60 border border-white/5 hover:border-white/20 rounded-lg p-4 text-center transition-colors block"
                style={{ opacity: 0 }}
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
              </a>
            ))}
        </div>

        {/* Era navigation for site-wide crawlability */}
        <nav aria-label="AI Eras" className="mb-12">
          <h2 className="text-sm font-semibold text-[#94a3b8] uppercase tracking-wider mb-4 text-center">
            Explore by Era
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {eras.map((era) => (
              <a
                key={era.id}
                href={`/era/${era.id}`}
                className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-[#94a3b8] hover:border-white/30 hover:text-[#f1f5f9] transition-colors"
              >
                {era.name}
              </a>
            ))}
          </div>
        </nav>

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

        {/* Tip jar */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <a
            href="https://buymeacoffee.com/shordle"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[#ff5e5b]/10 hover:bg-[#ff5e5b]/20 text-[#ff5e5b] border border-[#ff5e5b]/20 rounded-lg transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311z"/>
            </svg>
            Support this project
          </a>
        </div>

        {/* Bottom line */}
        <div className="text-center text-xs text-[#475569]">
          <p>AI Timeline — An immersive journey through the history of artificial intelligence</p>
        </div>
      </div>
    </footer>
  );
}
