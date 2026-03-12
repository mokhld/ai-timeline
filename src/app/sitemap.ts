import type { MetadataRoute } from "next";
import { milestones, eras } from "@/data/timeline";
import { getAllCategories, getAllYears, getAllTags } from "@/lib/timeline-utils";
import {
  getAllOrganizationEntities,
  getAllPeopleEntities,
} from "@/lib/entities";
import { getAllEditorialPages } from "@/data/editorial-pages";

// Use a fixed build date so sitemap cache isn't invalidated on every request.
// Update this when content changes.
const LAST_UPDATED = new Date("2026-03-11");

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://aitimeline.com";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/explore`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/history`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.8,
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
    lastModified: LAST_UPDATED,
    changeFrequency: "monthly" as const,
    priority: impactPriority[m.impactLevel] ?? 0.6,
  }));

  const eraPages: MetadataRoute.Sitemap = eras.map((e) => ({
    url: `${baseUrl}/era/${e.id}`,
    lastModified: LAST_UPDATED,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const categoryPages: MetadataRoute.Sitemap = getAllCategories().map((c) => ({
    url: `${baseUrl}/category/${c}`,
    lastModified: LAST_UPDATED,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const yearPages: MetadataRoute.Sitemap = getAllYears().map((y) => ({
    url: `${baseUrl}/year/${y}`,
    lastModified: LAST_UPDATED,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const tagPages: MetadataRoute.Sitemap = getAllTags().map((t) => ({
    url: `${baseUrl}/tag/${t}`,
    lastModified: LAST_UPDATED,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const peoplePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/people`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...getAllPeopleEntities().map((person) => ({
      url: `${baseUrl}/person/${person.slug}`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  const organizationPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/organizations`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...getAllOrganizationEntities().map((organization) => ({
      url: `${baseUrl}/organization/${organization.slug}`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  const editorialPages: MetadataRoute.Sitemap = getAllEditorialPages().map(
    (page) => ({
      url: `${baseUrl}${page.canonicalPath}`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })
  );

  return [
    ...staticPages,
    ...eraPages,
    ...milestonePages,
    ...categoryPages,
    ...yearPages,
    ...tagPages,
    ...peoplePages,
    ...organizationPages,
    ...editorialPages,
  ];
}
