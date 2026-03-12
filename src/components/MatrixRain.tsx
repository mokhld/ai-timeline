"use client";

import { useEffect, useRef } from "react";

const CHARS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const FONT_SIZE = 14;
const FADE_OPACITY = 0.05;

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let columns = 0;
    let drops: number[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / FONT_SIZE);
      drops = Array.from(
        { length: columns },
        () => (Math.random() * -canvas.height) / FONT_SIZE,
      );
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.fillStyle = `rgba(3, 7, 18, ${FADE_OPACITY})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * FONT_SIZE;
        const y = drops[i] * FONT_SIZE;

        // Occasional red "alert" glyphs
        const isRedGlyph = Math.random() < 0.02;

        if (isRedGlyph) {
          ctx.fillStyle = "#ef4444"; // red accent
          ctx.font = `bold ${FONT_SIZE}px monospace`;
        } else {
          // Brighter head, dimmer trail
          const brightness = Math.random();
          if (brightness > 0.95) {
            ctx.fillStyle = "#ffffff";
            ctx.font = `bold ${FONT_SIZE}px monospace`;
          } else if (brightness > 0.8) {
            ctx.fillStyle = "#22d3ee";
            ctx.font = `${FONT_SIZE}px monospace`;
          } else {
            ctx.fillStyle = `rgba(99, 102, 241, ${0.3 + Math.random() * 0.7})`;
            ctx.font = `${FONT_SIZE}px monospace`;
          }
        }

        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }

      animationId = requestAnimationFrame(draw);
    };

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!prefersReducedMotion) {
      draw();
    } else {
      // Static frame for reduced motion
      ctx.fillStyle = "rgba(3, 7, 18, 1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < columns; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.fillStyle = `rgba(99, 102, 241, ${0.1 + Math.random() * 0.3})`;
        ctx.font = `${FONT_SIZE}px monospace`;
        ctx.fillText(char, i * FONT_SIZE, Math.random() * canvas.height);
      }
    }

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
