"use client";

import { useState } from "react";

function upscaleUrl(url: string): string {
  return url.replace(/\/(\d+)px-/, "/500px-");
}

export default function MilestoneHeroImage({
  src,
  alt,
  eraColor,
}: {
  src: string;
  alt: string;
  eraColor: string;
}) {
  const [error, setError] = useState(false);

  if (error) return null;

  return (
    <div className="relative w-full rounded-xl overflow-hidden mb-8 animate-hero-entrance">
      {/* Era-colored radial glow */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: `radial-gradient(ellipse at top center, ${eraColor}20 0%, transparent 60%)`,
        }}
      />
      {/* Bottom gradient fade to page bg */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-t from-[#030712] via-transparent to-transparent" />
      {/* Bottom edge glow line */}
      <div
        className="absolute bottom-0 inset-x-0 h-px z-20"
        style={{
          background: `linear-gradient(to right, transparent, ${eraColor}40, transparent)`,
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={upscaleUrl(src)}
        alt={alt}
        className="w-full h-48 sm:h-64 object-cover"
        onError={() => setError(true)}
        loading="eager"
      />
    </div>
  );
}
