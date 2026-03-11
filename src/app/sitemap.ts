import type { MetadataRoute } from "next";
import { milestones, eras } from "@/data/timeline";
import { getAllCategories, getAllYears, getAllTags } from "@/lib/timeline-utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://aitimeline.com";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  const impactPriority: Record<number, number> = {
    5: 0.9,
    4: 0.8,
    3: 0.7,
    2: 0.6,
    1: 0.5,
  };

  const milestonePages: MetadataRoute.Sitemap = milestones.map((m) => ({
    url: `${baseUrl}/timeline/${m.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: impactPriority[m.impactLevel] ?? 0.6,
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

  const yearPages: MetadataRoute.Sitemap = getAllYears().map((y) => ({
    url: `${baseUrl}/year/${y}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const tagPages: MetadataRoute.Sitemap = getAllTags().map((t) => ({
    url: `${baseUrl}/tag/${t}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    ...staticPages,
    ...eraPages,
    ...milestonePages,
    ...categoryPages,
    ...yearPages,
    ...tagPages,
  ];
}
