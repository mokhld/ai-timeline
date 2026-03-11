import type { AITimelineMilestone, AIEraInfo } from "@/data/timeline";

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AI World",
    url: "https://aiworld.com",
    description:
      "The complete history of artificial intelligence from 1943 to today.",
  };
}

export function milestoneJsonLd(milestone: AITimelineMilestone) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: milestone.title,
    description: milestone.description,
    datePublished: `${milestone.year}-${String(milestone.month ?? 1).padStart(2, "0")}-${String(milestone.day ?? 1).padStart(2, "0")}`,
    author: milestone.people.map((p) => ({
      "@type": "Person",
      name: p,
    })),
    publisher: {
      "@type": "Organization",
      name: "AI World",
      url: "https://aiworld.com",
    },
    keywords: milestone.tags.join(", "),
    about: {
      "@type": "Thing",
      name: milestone.title,
      description: milestone.impact,
    },
  };
}

export function eraJsonLd(era: AIEraInfo, milestoneCount: number) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${era.name} (${era.yearStart}–${era.yearEnd})`,
    description: era.description,
    publisher: {
      "@type": "Organization",
      name: "AI World",
      url: "https://aiworld.com",
    },
    about: {
      "@type": "Thing",
      name: era.name,
      description: `${milestoneCount} milestones from the ${era.name} era of artificial intelligence.`,
    },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
