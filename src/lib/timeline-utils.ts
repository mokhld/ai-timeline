import { milestones, eras, type AITimelineMilestone, type AIEraInfo } from "@/data/timeline";

export function getMilestoneBySlug(slug: string): AITimelineMilestone | undefined {
  return milestones.find((m) => m.id === slug);
}

export function getMilestonesByEra(eraId: string): AITimelineMilestone[] {
  return milestones.filter((m) => m.era === eraId);
}

export function getMilestonesByCategory(category: string): AITimelineMilestone[] {
  return milestones.filter((m) => m.category === category);
}

export function getMilestonesByYear(year: number): AITimelineMilestone[] {
  return milestones.filter((m) => m.year === year);
}

export function getEraById(eraId: string): AIEraInfo | undefined {
  return eras.find((e) => e.id === eraId);
}

export function getRelatedMilestones(
  milestone: AITimelineMilestone,
  limit = 5
): AITimelineMilestone[] {
  return milestones
    .filter((m) => m.id !== milestone.id)
    .map((m) => {
      let score = 0;
      if (m.era === milestone.era) score += 2;
      if (m.category === milestone.category) score += 3;
      const sharedTags = m.tags.filter((t) => milestone.tags.includes(t)).length;
      score += sharedTags * 2;
      const sharedOrgs = m.organizations.filter((o) =>
        milestone.organizations.includes(o)
      ).length;
      score += sharedOrgs * 2;
      const yearDiff = Math.abs(m.year - milestone.year);
      if (yearDiff <= 2) score += 2;
      else if (yearDiff <= 5) score += 1;
      return { milestone: m, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.milestone);
}

export function getAdjacentEras(
  eraId: string
): { prev: AIEraInfo | null; next: AIEraInfo | null } {
  const idx = eras.findIndex((e) => e.id === eraId);
  return {
    prev: idx > 0 ? eras[idx - 1] : null,
    next: idx < eras.length - 1 ? eras[idx + 1] : null,
  };
}

export function getAllCategories(): string[] {
  return [...new Set(milestones.map((m) => m.category))];
}

export function getAllYears(): number[] {
  return [...new Set(milestones.map((m) => m.year))].sort((a, b) => a - b);
}

export function getAllTags(): string[] {
  return [...new Set(milestones.flatMap((m) => m.tags))].sort();
}

export function getMilestonesByTag(tag: string): AITimelineMilestone[] {
  return milestones.filter((m) => m.tags.includes(tag));
}

export function tagLabel(tag: string): string {
  return tag
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function getAdjacentYears(
  year: number
): { prev: number | null; next: number | null } {
  const years = getAllYears();
  const idx = years.indexOf(year);
  return {
    prev: idx > 0 ? years[idx - 1] : null,
    next: idx < years.length - 1 ? years[idx + 1] : null,
  };
}

export function categoryLabel(category: string): string {
  const labels: Record<string, string> = {
    research: "Research Breakthroughs",
    product: "Product Launches",
    cultural: "Cultural Moments",
    regulation: "Regulation & Policy",
    infrastructure: "Infrastructure & Compute",
    competition: "Competitions & Benchmarks",
    "open-source": "Open Source",
  };
  return labels[category] ?? category;
}
