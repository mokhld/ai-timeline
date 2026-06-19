import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/health"],
      },
      // AI Timeline is a public educational reference. We want AI search engines
      // and assistants to crawl, index, and cite the site, so the crawlers that
      // power those products are explicitly allowed.
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/", "/health"],
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/api/", "/health"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/api/", "/health"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/api/", "/health"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/api/", "/health"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/api/", "/health"],
      },
      {
        userAgent: "CCBot",
        allow: "/",
        disallow: ["/api/", "/health"],
      },
    ],
    sitemap: "https://aitimeline.world/sitemap.xml",
    host: "https://aitimeline.world",
  };
}
