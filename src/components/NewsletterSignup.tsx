"use client";

import { useState, FormEvent } from "react";

export default function NewsletterSignup({ variant = "default" }: { variant?: "default" | "sticky" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("https://buttondown.com/api/emails/embed-subscribe/aitimeline", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ email }),
      });

      if (res.ok || res.status === 303) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (variant === "sticky") {
    return (
      <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-[#0f172a]/95 backdrop-blur-sm border-t border-white/10 p-3">
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-lg mx-auto">
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 min-w-0 px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-[#f1f5f9] placeholder:text-[#475569] focus:outline-none focus:border-[#818cf8]/50"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-4 py-2 text-sm font-medium bg-[#818cf8] hover:bg-[#6366f1] text-white rounded-lg transition-colors disabled:opacity-50 whitespace-nowrap"
          >
            {status === "loading" ? "..." : status === "success" ? "Subscribed" : "Subscribe"}
          </button>
        </form>
        {status === "error" && (
          <p className="text-xs text-red-400 text-center mt-1">Something went wrong. Try again.</p>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto text-center">
      <h3 className="text-lg font-semibold text-[#f1f5f9] mb-2">
        Get the latest AI milestones as they happen
      </h3>
      <p className="text-sm text-[#94a3b8] mb-4">
        Join the newsletter. No spam, just signal.
      </p>

      {status === "success" ? (
        <p className="text-[#34d399] font-medium">
          You&apos;re in. Check your inbox to confirm.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 min-w-0 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-[#f1f5f9] placeholder:text-[#475569] focus:outline-none focus:border-[#818cf8]/50 transition-colors"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-5 py-2.5 font-medium bg-[#818cf8] hover:bg-[#6366f1] text-white rounded-lg transition-colors disabled:opacity-50"
          >
            {status === "loading" ? "..." : "Subscribe"}
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="text-xs text-red-400 mt-2">Something went wrong. Try again.</p>
      )}
    </div>
  );
}
