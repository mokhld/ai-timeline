"use client";

import { useState } from "react";

export default function MilestoneImage({
  src,
  alt,
  eraColor,
  isLandmark,
}: {
  src: string;
  alt: string;
  eraColor: string;
  isLandmark?: boolean;
}) {
  const [error, setError] = useState(false);

  if (error) return null;

  const size = isLandmark ? 80 : 56;

  return (
    <div
      className="relative shrink-0 rounded-full overflow-hidden"
      style={{
        width: size,
        height: size,
        boxShadow: `0 0 ${isLandmark ? 20 : 12}px ${eraColor}40, 0 0 ${isLandmark ? 40 : 24}px ${eraColor}15`,
        border: `2px solid ${eraColor}50`,
      }}
    >
      {/* Glow ring */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none z-10"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${eraColor}20 0%, transparent 60%)`,
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="object-cover w-full h-full"
        onError={() => setError(true)}
        loading="lazy"
      />
    </div>
  );
}
