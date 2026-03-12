"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import dynamic from "next/dynamic";
import { milestones, eras } from "@/data/timeline";
import { trackHeroCtaClick } from "@/lib/analytics";

gsap.registerPlugin(ScrollTrigger);

const MatrixRain = dynamic(() => import("./MatrixRain"), { ssr: false });

export default function HeroScene() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const matrixRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Parallax depth: content moves up faster, matrix stays back
        gsap.to(contentRef.current, {
          yPercent: -50,
          scale: 0.85,
          opacity: 0,
          filter: "blur(6px)",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        // Matrix rain fades slowly - creates depth
        gsap.to(matrixRef.current, {
          yPercent: -15,
          opacity: 0.3,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });

        // Scroll hint fades out quickly
        gsap.to(scrollHintRef.current, {
          opacity: 0,
          y: -20,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "5% top",
            end: "15% top",
            scrub: true,
          },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center min-h-svh overflow-hidden"
    >
      {/* Matrix rain background */}
      <div
        ref={matrixRef}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <MatrixRain />
        {/* Gradient overlay to make text readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/40 via-[#030712]/20 to-[#030712]" />
      </div>

      {/* Hero content */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-4 will-change-transform"
      >
        <motion.h1
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter mb-6"
          initial={false}
          animate={shouldReduceMotion ? undefined : { scale: 1, opacity: 1 }}
          transition={shouldReduceMotion ? undefined : { duration: 1, ease: "easeOut", delay: 0.5 }}
        >
          <span className="bg-gradient-to-r from-[#818cf8] via-[#22d3ee] to-[#818cf8] bg-clip-text text-transparent">
            AI
          </span>{" "}
          <span className="text-[#f1f5f9]">Timeline</span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-[#94a3b8] max-w-2xl mx-auto mb-8"
          initial={false}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? undefined : { duration: 0.8, delay: 1.2 }}
        >
          The complete history of artificial intelligence, from first principles
          to the agentic era.
        </motion.p>

        <motion.div
          className="flex items-center justify-center gap-3 text-sm sm:text-base text-[#94a3b8] font-mono"
          initial={false}
          animate={shouldReduceMotion ? undefined : { opacity: 1 }}
          transition={shouldReduceMotion ? undefined : { duration: 0.6, delay: 1.8 }}
        >
          <span className="text-[#22d3ee]">{milestones.length}</span> milestones
          <span className="text-[#475569]">&middot;</span>
          <span className="text-[#818cf8]">{eras.length}</span> eras
          <span className="text-[#475569]">&middot;</span>
          <span className="text-[#34d399]">1943&ndash;2026</span>
        </motion.div>

        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
          initial={false}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? undefined : { duration: 0.7, delay: 1.5 }}
        >
          <a
            href="#timeline-journey"
            onClick={() => trackHeroCtaClick("browse_timeline")}
            className="inline-flex items-center justify-center rounded-full bg-[#6366f1] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#4f46e5]"
          >
            Browse the timeline
          </a>
          <Link
            href="/explore"
            onClick={() => trackHeroCtaClick("explore_graph")}
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-[#e2e8f0] transition-colors hover:border-white/20 hover:bg-white/10"
          >
            Explore the graph
          </Link>
          <a
            href="#homepage-newsletter"
            onClick={() => trackHeroCtaClick("newsletter")}
            className="inline-flex items-center justify-center rounded-full border border-[#22d3ee]/20 bg-[#22d3ee]/10 px-5 py-2.5 text-sm font-medium text-[#67e8f9] transition-colors hover:border-[#22d3ee]/40 hover:bg-[#22d3ee]/15"
          >
            Get updates
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        ref={scrollHintRef}
        className="absolute bottom-8 z-10 flex flex-col items-center gap-2"
        initial={false}
        animate={shouldReduceMotion ? undefined : { opacity: 1 }}
        transition={shouldReduceMotion ? undefined : { delay: 2.5 }}
      >
        <span className="text-[10px] text-[#475569] uppercase tracking-[0.32em]">
          Scroll into the chronology
        </span>
        <span className="text-xs text-[#94a3b8] uppercase tracking-[0.28em]">
          Timeline first, tools appear below
        </span>
        <motion.div
          animate={shouldReduceMotion ? undefined : { y: [0, 8, 0] }}
          transition={
            shouldReduceMotion
              ? undefined
              : { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
          }
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-[#818cf8]"
          >
            <path
              d="M7 10L12 15L17 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
