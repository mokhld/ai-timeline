"use client";

import { useId, useState, FormEvent } from "react";
import { trackNewsletterEvent } from "@/lib/analytics";

interface NewsletterSignupProps {
  variant?: "default" | "sticky";
  source?: string;
  title?: string;
  description?: string;
  benefitCopy?: string;
  buttonLabel?: string;
}

export default function NewsletterSignup({
  variant = "default",
  source = "site",
  title = "Get the latest AI milestones as they happen",
  description = "Join the newsletter. No spam, just signal.",
  benefitCopy,
  buttonLabel = "Subscribe",
}: NewsletterSignupProps) {
  const emailInputId = useId();
  const honeypotInputId = useId();
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const statusMessage =
    status === "success"
      ? "You're subscribed for future AI Timeline updates."
      : status === "error"
        ? "Something went wrong. Try again."
        : "";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    const currentPath =
      typeof window === "undefined" ? undefined : window.location.pathname;

    if (website.trim().length > 0) {
      setStatus("success");
      setEmail("");
      return;
    }

    trackNewsletterEvent({
      status: "submit",
      source,
      variant,
      path: currentPath,
    });
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source,
          variant,
          path: currentPath,
          website,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
        trackNewsletterEvent({
          status: "success",
          source,
          variant,
          path: currentPath,
        });
      } else {
        setStatus("error");
        trackNewsletterEvent({
          status: "error",
          source,
          variant,
          path: currentPath,
        });
      }
    } catch {
      setStatus("error");
      trackNewsletterEvent({
        status: "error",
        source,
        variant,
        path: currentPath,
      });
    }
  }

  if (variant === "sticky") {
    return (
      <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-[#0f172a]/95 backdrop-blur-sm border-t border-white/10 p-3">
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-lg mx-auto">
          <div className="hidden" aria-hidden="true">
            <label htmlFor={honeypotInputId}>Website</label>
            <input
              id={honeypotInputId}
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <label htmlFor={emailInputId} className="sr-only">
            Email address
          </label>
          <input
            id={emailInputId}
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="flex-1 min-w-0 px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-[#f1f5f9] placeholder:text-[#475569] focus:outline-none focus:border-[#818cf8]/50"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-4 py-2 text-sm font-medium bg-[#818cf8] hover:bg-[#6366f1] text-white rounded-lg transition-colors disabled:opacity-50 whitespace-nowrap"
          >
            {status === "loading" ? "..." : status === "success" ? "Subscribed" : buttonLabel}
          </button>
        </form>
        {statusMessage && (
          <p
            className={`text-xs text-center mt-1 ${
              status === "error" ? "text-red-400" : "text-[#34d399]"
            }`}
            role={status === "error" ? "alert" : "status"}
            aria-live={status === "error" ? "assertive" : "polite"}
          >
            {statusMessage}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto text-center">
      <h3 className="text-lg font-semibold text-[#f1f5f9] mb-2">
        {title}
      </h3>
      <p className="text-sm text-[#94a3b8] mb-4">
        {description}
      </p>
      {benefitCopy && (
        <p className="text-xs text-[#cbd5e1] mb-4">{benefitCopy}</p>
      )}

      {status === "success" ? (
        <p
          className="text-[#34d399] font-medium"
          role="status"
          aria-live="polite"
        >
          {statusMessage}
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="hidden" aria-hidden="true">
            <label htmlFor={honeypotInputId}>Website</label>
            <input
              id={honeypotInputId}
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <label htmlFor={emailInputId} className="sr-only">
            Email address
          </label>
          <input
            id={emailInputId}
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="flex-1 min-w-0 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-[#f1f5f9] placeholder:text-[#475569] focus:outline-none focus:border-[#818cf8]/50 transition-colors"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-5 py-2.5 font-medium bg-[#818cf8] hover:bg-[#6366f1] text-white rounded-lg transition-colors disabled:opacity-50"
          >
            {status === "loading" ? "..." : buttonLabel}
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="text-xs text-red-400 mt-2" role="alert" aria-live="assertive">
          {statusMessage}
        </p>
      )}
    </div>
  );
}
