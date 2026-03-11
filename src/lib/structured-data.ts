import type { AITimelineMilestone, AIEraInfo } from "@/data/timeline";

const BASE_URL = "https://aiworld.com";

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AI World",
    url: BASE_URL,
    description:
      "The complete history of artificial intelligence from 1943 to today.",
    inLanguage: "en-US",
    publisher: {
      "@type": "Organization",
      name: "AI World",
      url: BASE_URL,
    },
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
      url: BASE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/timeline/${milestone.id}`,
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
      url: BASE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/era/${era.id}`,
    },
    about: {
      "@type": "Thing",
      name: era.name,
      description: `${milestoneCount} milestones from the ${era.name} era of artificial intelligence.`,
    },
  };
}

export function itemListJsonLd(
  name: string,
  description: string,
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

export function categoryPageJsonLd(
  label: string,
  category: string,
  milestoneCount: number
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${label} in AI History`,
    description: `${milestoneCount} ${label.toLowerCase()} milestones across the history of artificial intelligence.`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/category/${category}`,
    },
    publisher: {
      "@type": "Organization",
      name: "AI World",
      url: BASE_URL,
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

export function tagPageJsonLd(
  label: string,
  tag: string,
  milestoneCount: number
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${label} in AI History`,
    description: `${milestoneCount} AI milestones related to ${label.toLowerCase()}.`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/tag/${tag}`,
    },
    publisher: {
      "@type": "Organization",
      name: "AI World",
      url: BASE_URL,
    },
  };
}

export function personJsonLd(
  name: string,
  milestones: { title: string; id: string; year: number }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    knowsAbout: "Artificial Intelligence",
    subjectOf: milestones.map((m) => ({
      "@type": "Article",
      headline: m.title,
      url: `${BASE_URL}/timeline/${m.id}`,
      datePublished: String(m.year),
    })),
  };
}
