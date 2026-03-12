import type { AITimelineMilestone } from "@/data/timeline";

export const homepageStartingPointIds = [
  "turing-test-1950",
  "alexnet-2012",
  "transformer-2017",
  "chatgpt-2022",
] as const;

export function getHomepageStartingPoints(
  allMilestones: AITimelineMilestone[]
): AITimelineMilestone[] {
  return homepageStartingPointIds
    .map((id) => allMilestones.find((milestone) => milestone.id === id))
    .filter(
      (milestone): milestone is AITimelineMilestone => Boolean(milestone)
    );
}
