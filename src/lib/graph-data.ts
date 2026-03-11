import { milestones, eras, type AITimelineMilestone, type AIEraInfo } from "@/data/timeline";

export interface GraphNode {
  id: string;
  title: string;
  year: number;
  era: string;
  eraName: string;
  eraColor: string;
  category: string;
  impactLevel: number;
  tags: string[];
  val: number; // node size
}

export interface GraphLink {
  source: string;
  target: string;
  weight: number;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

const eraMap = new Map<string, AIEraInfo>(eras.map((e) => [e.id, e]));

export function computeRelatednessScore(
  a: AITimelineMilestone,
  b: AITimelineMilestone
): number {
  let score = 0;
  if (a.era === b.era) score += 2;
  if (a.category === b.category) score += 3;
  const sharedTags = a.tags.filter((t) => b.tags.includes(t)).length;
  score += sharedTags * 2;
  const sharedOrgs = a.organizations.filter((o) =>
    b.organizations.includes(o)
  ).length;
  score += sharedOrgs * 2;
  const yearDiff = Math.abs(a.year - b.year);
  if (yearDiff <= 2) score += 2;
  else if (yearDiff <= 5) score += 1;
  return score;
}

export function buildGraphData(): GraphData {
  const nodes: GraphNode[] = milestones.map((m) => {
    const era = eraMap.get(m.era);
    return {
      id: m.id,
      title: m.title,
      year: m.year,
      era: m.era,
      eraName: era?.name ?? m.era,
      eraColor: era?.color ?? "#6366f1",
      category: m.category,
      impactLevel: m.impactLevel,
      tags: m.tags,
      val: m.impactLevel * 2,
    };
  });

  // For each milestone, find top 3 related with score >= 3
  const linkSet = new Map<string, GraphLink>();

  for (let i = 0; i < milestones.length; i++) {
    const scored: { idx: number; score: number }[] = [];
    for (let j = 0; j < milestones.length; j++) {
      if (i === j) continue;
      const score = computeRelatednessScore(milestones[i], milestones[j]);
      if (score >= 3) scored.push({ idx: j, score });
    }
    scored.sort((a, b) => b.score - a.score);
    const top = scored.slice(0, 3);

    for (const { idx, score } of top) {
      const a = milestones[i].id;
      const b = milestones[idx].id;
      const key = a < b ? `${a}--${b}` : `${b}--${a}`;
      const existing = linkSet.get(key);
      if (!existing || score > existing.weight) {
        linkSet.set(key, { source: a, target: b, weight: score });
      }
    }
  }

  return { nodes, links: Array.from(linkSet.values()) };
}
