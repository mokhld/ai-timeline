"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import dynamic from "next/dynamic";
import { milestones, eras } from "@/data/timeline";

gsap.registerPlugin(ScrollTrigger);

const MatrixRain = dynamic(() => import("./MatrixRain"), { ssr: false });

export default function HeroScene() {
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
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden"
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
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        >
          <span className="bg-gradient-to-r from-[#818cf8] via-[#22d3ee] to-[#818cf8] bg-clip-text text-transparent">
            AI
          </span>{" "}
          <span className="text-[#f1f5f9]">Timeline</span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-[#94a3b8] max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          The Complete History of Artificial Intelligence
        </motion.p>

        <motion.div
          className="flex items-center justify-center gap-3 text-sm sm:text-base text-[#94a3b8] font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <span className="text-[#22d3ee]">{milestones.length}</span> milestones
          <span className="text-[#475569]">&middot;</span>
          <span className="text-[#818cf8]">{eras.length}</span> eras
          <span className="text-[#475569]">&middot;</span>
          <span className="text-[#34d399]">1943&ndash;2026</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        ref={scrollHintRef}
        className="absolute bottom-8 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <span className="text-xs text-[#475569] uppercase tracking-widest">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
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
