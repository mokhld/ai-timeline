import type { AITimelineMilestone, AIEraInfo } from "@/data/timeline";

export const BASE_URL = "https://aitimeline.com";

export function ogImageUrl(params: {
  title: string;
  subtitle?: string;
  type?: string;
}): string {
  const url = new URL(`${BASE_URL}/api/og`);
  url.searchParams.set("title", params.title);
  if (params.subtitle) url.searchParams.set("subtitle", params.subtitle);
  if (params.type) url.searchParams.set("type", params.type);
  return url.toString();
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AI Timeline",
    url: BASE_URL,
    description:
      "The complete history of artificial intelligence from 1943 to today.",
    inLanguage: "en-US",
    publisher: {
      "@type": "Organization",
      name: "AI Timeline",
      url: BASE_URL,
      logo: { "@type": "ImageObject", url: `${BASE_URL}/favicon.svg` },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function milestoneJsonLd(milestone: AITimelineMilestone) {
  const dateStr = `${milestone.year}-${String(milestone.month ?? 1).padStart(2, "0")}-${String(milestone.day ?? 1).padStart(2, "0")}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: milestone.title,
    description: milestone.description,
    datePublished: dateStr,
    ...(milestone.imageUrl && {
      image: {
        "@type": "ImageObject",
        url: milestone.imageUrl,
        ...(milestone.imageAlt && { caption: milestone.imageAlt }),
      },
    }),
    author: milestone.people.length > 0
      ? milestone.people.map((p) => ({ "@type": "Person", name: p }))
      : { "@type": "Organization", name: "AI Timeline" },
    publisher: {
      "@type": "Organization",
      name: "AI Timeline",
      url: BASE_URL,
      logo: { "@type": "ImageObject", url: `${BASE_URL}/favicon.svg` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/timeline/${milestone.id}`,
    },
    inLanguage: "en-US",
    keywords: milestone.tags.join(", "),
    about: {
      "@type": "Event",
      name: milestone.title,
      startDate: dateStr,
      description: milestone.impact,
      ...(milestone.organizations.length > 0 && {
        organizer: milestone.organizations.map((o) => ({
          "@type": "Organization",
          name: o,
        })),
      }),
    },
  };
}

export function eraJsonLd(era: AIEraInfo, milestoneCount: number) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${era.name} (${era.yearStart}–${era.yearEnd})`,
    description: era.description,
    inLanguage: "en-US",
    publisher: {
      "@type": "Organization",
      name: "AI Timeline",
      url: BASE_URL,
      logo: { "@type": "ImageObject", url: `${BASE_URL}/favicon.svg` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/era/${era.id}`,
    },
    image: ogImageUrl({
      title: era.name,
      subtitle: `${era.yearStart}–${era.yearEnd} · ${milestoneCount} milestones`,
      type: "era",
    }),
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
      name: "AI Timeline",
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
      name: "AI Timeline",
      url: BASE_URL,
    },
  };
}

export function yearPageJsonLd(
  year: number,
  milestoneCount: number
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `AI Developments in ${year}`,
    description: `${milestoneCount} artificial intelligence milestones from ${year}.`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/year/${year}`,
    },
    publisher: {
      "@type": "Organization",
      name: "AI Timeline",
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
