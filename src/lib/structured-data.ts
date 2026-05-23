import type { AITimelineMilestone, AIEraInfo } from "@/data/timeline";
import type { FaqItem } from "@/lib/faq";

export const BASE_URL = "https://aitimeline.world";

// Date the site's content/structure was last reviewed. Used as a freshness
// signal (dateModified) for crawlers and answer engines. Update on releases.
export const SITE_UPDATED = "2026-05-23";

const ORGANIZATION_ID = `${BASE_URL}/#organization`;

// Canonical publisher used across schemas. It is self-contained (so every
// independently-indexed page carries a complete publisher) while also carrying
// the stable @id that resolves to the full Organization node on the home and
// about pages — consolidating the site to one citeable entity.
const publisherRef = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: "AI Timeline",
  url: BASE_URL,
  logo: { "@type": "ImageObject", url: `${BASE_URL}/favicon.svg` },
} as const;

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
    publisher: publisherRef,
  };
}

// Sitewide Organization entity. Rendered on the home and about pages so every
// publisher reference across the site resolves to one identifiable, citeable
// source — important for both knowledge-graph entity recognition and the
// source attribution that generative answer engines rely on.
export function siteOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "AI Timeline",
    url: BASE_URL,
    description:
      "An independent, continuously updated reference charting the complete history of artificial intelligence — from the 1943 origins of computational theory to the present agentic era.",
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/favicon.svg`,
    },
    sameAs: [
      "https://x.com/aitimeline",
      "https://buymeacoffee.com/mokhld",
    ],
  };
}

export function faqPageJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function aboutPageJsonLd(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About AI Timeline",
    url: `${BASE_URL}/about`,
    description:
      "How AI Timeline is built: editorial methodology, impact scoring, sourcing, and how to cite the project.",
    inLanguage: "en-US",
    mainEntity: publisherRef,
    ...(faqs.length > 0 && {
      mentions: faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    }),
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
    dateModified: SITE_UPDATED,
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
    publisher: publisherRef,
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
    dateModified: SITE_UPDATED,
    inLanguage: "en-US",
    publisher: publisherRef,
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
    publisher: publisherRef,
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
    publisher: publisherRef,
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
    publisher: publisherRef,
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
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}${params.path}`,
    },
    publisher: publisherRef,
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
    dateModified: SITE_UPDATED,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}${params.path}`,
    },
    ...(params.keywords && params.keywords.length > 0
      ? { keywords: params.keywords.join(", ") }
      : {}),
    publisher: publisherRef,
    inLanguage: "en-US",
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

export function organizationJsonLd(
  name: string,
  milestones: { title: string; id: string; year: number }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
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
