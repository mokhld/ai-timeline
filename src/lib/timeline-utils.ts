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
    .filter(
      (m) =>
        m.id !== milestone.id &&
        (m.era === milestone.era ||
          m.category === milestone.category ||
          m.tags.some((t) => milestone.tags.includes(t)))
    )
    .slice(0, limit);
}

export function getAllCategories(): string[] {
  return [...new Set(milestones.map((m) => m.category))];
}

export function getAllYears(): number[] {
  return [...new Set(milestones.map((m) => m.year))].sort((a, b) => a - b);
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
