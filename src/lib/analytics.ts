"use client";

import { track } from "@vercel/analytics";

type AnalyticsValue = string | number | boolean | null | undefined;
type AnalyticsPayload = Record<string, AnalyticsValue>;

function trackEvent(name: string, properties?: AnalyticsPayload): void {
  try {
    track(name, properties);
  } catch {
    // Ignore analytics failures so user flows still complete.
  }
}

export function trackHeroCtaClick(cta: string): void {
  trackEvent("hero_cta_click", {
    cta,
    location: "hero",
  });
}

export function trackKnowledgeGraphCtaClick(source: string): void {
  trackEvent("knowledge_graph_cta_click", { source });
}

export function trackMilestoneDetailClick(
  source: string,
  milestoneId: string
): void {
  trackEvent("milestone_detail_click", {
    source,
    milestone_id: milestoneId,
  });
}

export function trackExploreGraphVisit(): void {
  trackEvent("explore_graph_visit", {
    page: "explore",
  });
}

export function trackMilestonePageView(milestoneId: string): void {
  trackEvent("milestone_page_view", {
    milestone_id: milestoneId,
  });
}

export function trackNewsletterEvent(params: {
  status: "submit" | "success" | "error";
  source: string;
  variant: string;
  path?: string;
}): void {
  trackEvent(`newsletter_${params.status}`, {
    source: params.source,
    variant: params.variant,
    path: params.path,
  });
}

export function trackExploreSearchUsed(queryLength: number): void {
  trackEvent("explore_search_used", {
    query_length: queryLength,
  });
}

export function trackExploreFilterUsed(params: {
  filterType: "era" | "category";
  filterValue: string;
  active: boolean;
}): void {
  trackEvent("explore_filter_used", {
    filter_type: params.filterType,
    filter_value: params.filterValue,
    active: params.active,
  });
}
