"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { milestones, type AIEraInfo } from "@/data/timeline";
import MilestoneCard from "./MilestoneCard";

gsap.registerPlugin(ScrollTrigger);

export default function EraSection({
  era,
  eraIndex,
}: {
  era: AIEraInfo;
  eraIndex: number;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLSpanElement>(null);
  const countRef = useRef<HTMLDivElement>(null);
  const milestonesRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  const eraMilestones = milestones
    .filter((m) => m.era === era.id)
    .sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return (a.month ?? 0) - (b.month ?? 0);
    });

  // Alternate reveal direction per era
  const isEven = eraIndex % 2 === 0;
  const revealX = isEven ? -80 : 80;

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Era background glow - parallax float
        if (glowRef.current) {
          gsap.to(glowRef.current, {
            yPercent: -30,
            scale: 1.3,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          });
        }

        // Cinematic era title reveal - scale up from small + blur clear
        const headerTl = gsap.timeline({
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            end: "top 40%",
            scrub: 1,
          },
        });

        // Dot expands and glows
        headerTl.fromTo(
          dotRef.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2)" },
          0
        );

        // Year label slides in from the side
        headerTl.fromTo(
          yearRef.current,
          { x: revealX * 0.5, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4 },
          0.1
        );

        // Title: dramatic scale + slide reveal
        headerTl.fromTo(
          titleRef.current,
          {
            scale: 0.6,
            opacity: 0,
            x: revealX,
            rotateZ: isEven ? -2 : 2,
            filter: "blur(8px)",
          },
          {
            scale: 1,
            opacity: 1,
            x: 0,
            rotateZ: 0,
            filter: "blur(0px)",
            duration: 0.6,
            ease: "power3.out",
          },
          0.15
        );

        // Description fades up
        headerTl.fromTo(
          descRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4 },
          0.35
        );

        // Milestone count
        headerTl.fromTo(
          countRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3 },
          0.45
        );

        // Milestone cards - staggered reveal with alternating directions
        if (milestonesRef.current) {
          const cards = milestonesRef.current.children;
          if (cards.length > 0) {
            Array.from(cards).forEach((card, i) => {
              // Alternate individual card directions for visual variety
              const cardDirection = i % 3 === 0 ? 1 : i % 3 === 1 ? -1 : 0;
              const xOffset = cardDirection * 60;
              const yOffset = cardDirection === 0 ? 40 : 20;
              const rotation = cardDirection * 1.5;

              gsap.fromTo(
                card,
                {
                  x: xOffset,
                  y: yOffset,
                  opacity: 0,
                  scale: 0.95,
                  rotateZ: rotation,
                },
                {
                  x: 0,
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  rotateZ: 0,
                  duration: 0.8,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                    end: "top 60%",
                    scrub: 0.8,
                  },
                }
              );
            });
          }
        }

        // Era divider line animation
        if (dividerRef.current) {
          gsap.fromTo(
            dividerRef.current,
            { scaleX: 0, opacity: 0 },
            {
              scaleX: 1,
              opacity: 1,
              duration: 1,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: dividerRef.current,
                start: "top 90%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });

      // Reduced motion: instant reveal, no transforms
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            dotRef.current,
            yearRef.current,
            titleRef.current,
            descRef.current,
            countRef.current,
          ],
          { opacity: 1, x: 0, y: 0, scale: 1, filter: "none", rotateZ: 0 }
        );
        if (milestonesRef.current) {
          gsap.set(milestonesRef.current.children, {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotateZ: 0,
          });
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id={`era-${era.id}`} className="relative py-16 sm:py-24">
      {/* Era background glow - parallax */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          background: `radial-gradient(ellipse at ${isEven ? "30% 20%" : "70% 20%"}, ${era.color} 0%, transparent 60%)`,
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4">
        {/* Era intro */}
        <div ref={headerRef} className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div
              ref={dotRef}
              className="w-3 h-3 rounded-full shadow-lg"
              style={{
                backgroundColor: era.color,
                boxShadow: `0 0 12px ${era.color}60`,
                opacity: 0,
              }}
            />
            <span
              ref={yearRef}
              className="text-sm font-mono text-[#475569]"
              style={{ opacity: 0 }}
            >
              {era.yearStart}–{era.yearEnd}
            </span>
          </div>

          <h2
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            style={{ color: era.color, opacity: 0 }}
          >
            {era.name}
          </h2>

          <p
            ref={descRef}
            className="text-lg text-[#94a3b8] max-w-2xl leading-relaxed"
            style={{ opacity: 0 }}
          >
            {era.description}
          </p>

          <div
            ref={countRef}
            className="mt-4 text-sm text-[#475569] font-mono"
            style={{ opacity: 0 }}
          >
            {eraMilestones.length} milestone
            {eraMilestones.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Milestones */}
        <div ref={milestonesRef} className="space-y-0">
          {eraMilestones.map((milestone, index) => (
            <MilestoneCard
              key={milestone.id}
              milestone={milestone}
              index={index}
              eraColor={era.color}
            />
          ))}
        </div>

        {/* Explore era link */}
        <div className="mt-10 text-center">
          <a
            href={`/era/${era.id}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:brightness-125"
            style={{ color: era.color }}
          >
            Explore {era.name}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Era divider */}
        <div
          ref={dividerRef}
          className="mt-16 h-px origin-left"
          style={{
            background: `linear-gradient(to right, transparent, ${era.color}40, transparent)`,
            opacity: 0,
          }}
        />
      </div>
    </section>
  );
}
