import type { AITimelineMilestone, AIEraInfo } from "@/data/timeline";

export const BASE_URL = "https://aitimeline.world";

// Stable identifier for the publishing organization. Pages reference this node by
// @id so the entity is defined once (on the homepage) and linked everywhere else.
export const ORGANIZATION_ID = `${BASE_URL}/#organization`;

// Raster logo for rich results. Google does not process SVG logos, so this points
// at a square PNG that ships in /public.
const ORGANIZATION_LOGO = {
  "@type": "ImageObject" as const,
  url: `${BASE_URL}/android-chrome-512x512.png`,
  width: 512,
  height: 512,
};

const PUBLISHER_REF = {
  "@type": "Organization" as const,
  "@id": ORGANIZATION_ID,
  name: "AI Timeline",
};

export function organizationNodeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "AI Timeline",
    url: BASE_URL,
    description:
      "The complete history of artificial intelligence from 1943 to today.",
    logo: ORGANIZATION_LOGO,
  };
}

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
    "@id": `${BASE_URL}/#website`,
    name: "AI Timeline",
    url: BASE_URL,
    description:
      "The complete history of artificial intelligence from 1943 to today.",
    inLanguage: "en-US",
    publisher: PUBLISHER_REF,
  };
}

// Build an ISO 8601 date at the precision we actually have. Many historical
// milestones only carry a year, so we avoid inventing a fake month/day.
function milestoneDate(milestone: AITimelineMilestone): string {
  if (milestone.month == null) return String(milestone.year);
  const month = String(milestone.month).padStart(2, "0");
  if (milestone.day == null) return `${milestone.year}-${month}`;
  return `${milestone.year}-${month}-${String(milestone.day).padStart(2, "0")}`;
}

export function milestoneJsonLd(milestone: AITimelineMilestone) {
  const dateStr = milestoneDate(milestone);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: milestone.title,
    description: milestone.description,
    url: `${BASE_URL}/timeline/${milestone.id}`,
    datePublished: dateStr,
    dateModified: dateStr,
    ...(milestone.imageUrl && {
      image: {
        "@type": "ImageObject",
        url: milestone.imageUrl,
        ...(milestone.imageAlt && { caption: milestone.imageAlt }),
      },
    }),
    author: milestone.people.length > 0
      ? milestone.people.map((p) => ({ "@type": "Person", name: p }))
      : PUBLISHER_REF,
    publisher: PUBLISHER_REF,
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
    url: `${BASE_URL}/era/${era.id}`,
    datePublished: String(era.yearStart),
    inLanguage: "en-US",
    author: PUBLISHER_REF,
    publisher: PUBLISHER_REF,
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
    url: `${BASE_URL}/category/${category}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/category/${category}`,
    },
    publisher: PUBLISHER_REF,
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
    url: `${BASE_URL}/tag/${tag}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/tag/${tag}`,
    },
    publisher: PUBLISHER_REF,
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
    url: `${BASE_URL}/year/${year}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/year/${year}`,
    },
    publisher: PUBLISHER_REF,
  };
}

export function collectionPageJsonLd(params: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: params.name,
    description: params.description,
    url: `${BASE_URL}${params.path}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}${params.path}`,
    },
    publisher: PUBLISHER_REF,
  };
}

export function editorialPageJsonLd(params: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: params.title,
    description: params.description,
    url: `${BASE_URL}${params.path}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}${params.path}`,
    },
    ...(params.keywords && params.keywords.length > 0
      ? { keywords: params.keywords.join(", ") }
      : {}),
    author: PUBLISHER_REF,
    publisher: PUBLISHER_REF,
    inLanguage: "en-US",
  };
}

export function personJsonLd(
  name: string,
  milestones: { title: string; id: string; year: number }[],
  slug?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    ...(slug && { url: `${BASE_URL}/person/${slug}` }),
    knowsAbout: "Artificial Intelligence",
    subjectOf: milestones.map((m) => ({
      "@type": "Article",
      headline: m.title,
      url: `${BASE_URL}/timeline/${m.id}`,
      datePublished: String(m.year),
    })),
  };
}

export function organizationJsonLd(
  name: string,
  milestones: { title: string; id: string; year: number }[],
  slug?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    ...(slug && { url: `${BASE_URL}/organization/${slug}` }),
    knowsAbout: "Artificial Intelligence",
    subjectOf: milestones.map((m) => ({
      "@type": "Article",
      headline: m.title,
      url: `${BASE_URL}/timeline/${m.id}`,
      datePublished: String(m.year),
    })),
  };
}
