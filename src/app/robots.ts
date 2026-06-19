import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/structured-data";

// Generative Engine Optimization (GEO): AI answer engines can only cite a
// source they are allowed to read. We explicitly welcome the crawlers that
// power ChatGPT, Claude, Perplexity, Gemini, Copilot, and Apple Intelligence,
// while keeping non-content routes (API + health) out of scope for everyone.
const ANSWER_ENGINE_BOTS = [
  // OpenAI
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic
  "ClaudeBot",
  "anthropic-ai",
  "Claude-Web",
  "Claude-User",
  "Claude-SearchBot",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Google (Gemini / AI Overviews grounding)
  "Google-Extended",
  // Apple Intelligence
  "Applebot-Extended",
  // Common Crawl (feeds many open models)
  "CCBot",
  // Others
  "Amazonbot",
  "meta-externalagent",
  "Bytespider",
];

export default function robots(): MetadataRoute.Robots {
  const offLimits = ["/api/", "/health"];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: offLimits,
      },
      // AI Timeline is a public educational reference. We want AI search engines
      // and assistants to crawl, index, and cite the site, so the crawlers that
      // power those products are explicitly allowed.
      {
        userAgent: ANSWER_ENGINE_BOTS,
        allow: "/",
        disallow: offLimits,
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
