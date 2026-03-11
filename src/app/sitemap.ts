import type { MetadataRoute } from "next";
import { milestones, eras } from "@/data/timeline";
import { getAllCategories } from "@/lib/timeline-utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://aiworld.com";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  const milestonePages: MetadataRoute.Sitemap = milestones.map((m) => ({
    url: `${baseUrl}/timeline/${m.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: m.impactLevel >= 4 ? 0.9 : 0.7,
  }));

  const eraPages: MetadataRoute.Sitemap = eras.map((e) => ({
    url: `${baseUrl}/era/${e.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const categoryPages: MetadataRoute.Sitemap = getAllCategories().map((c) => ({
    url: `${baseUrl}/category/${c}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...eraPages, ...milestonePages, ...categoryPages];
}
