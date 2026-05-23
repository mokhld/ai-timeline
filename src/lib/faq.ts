import type { AITimelineMilestone, AIEraInfo } from "@/data/timeline";
import { categoryLabel } from "@/lib/timeline-utils";

export interface FaqItem {
  question: string;
  answer: string;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function formatMilestoneDate(milestone: {
  year: number;
  month?: number;
  day?: number;
}): string {
  const month =
    milestone.month && milestone.month >= 1 && milestone.month <= 12
      ? MONTHS[milestone.month - 1]
      : undefined;

  if (month && milestone.day) {
    return `${month} ${milestone.day}, ${milestone.year}`;
  }
  if (month) {
    return `${month} ${milestone.year}`;
  }
  return String(milestone.year);
}

function joinList(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

const IMPACT_DESCRIPTIONS: Record<number, string> = {
  5: "a landmark, field-defining moment",
  4: "a major breakthrough",
  3: "a significant development",
  2: "a notable step",
  1: "an early or incremental step",
};

/**
 * Self-contained Q&A pairs for a milestone. Every answer is derived directly
 * from the dataset (no inferred claims) so it can be safely cited by both
 * search rich results and generative answer engines.
 */
export function getMilestoneFaqs(
  milestone: AITimelineMilestone,
  era?: AIEraInfo
): FaqItem[] {
  const faqs: FaqItem[] = [];
  const date = formatMilestoneDate(milestone);

  faqs.push({
    question: `When did ${milestone.title} happen?`,
    answer: `${milestone.title} took place in ${date}.`,
  });

  const contributors: string[] = [];
  if (milestone.people.length > 0) {
    contributors.push(
      `key people included ${joinList(milestone.people)}`
    );
  }
  if (milestone.organizations.length > 0) {
    contributors.push(
      `organizations involved were ${joinList(milestone.organizations)}`
    );
  }
  if (contributors.length > 0) {
    const lead = joinList(contributors);
    faqs.push({
      question: `Who was behind ${milestone.title}?`,
      answer: `For ${milestone.title}, ${lead}.`,
    });
  }

  faqs.push({
    question: `Why was ${milestone.title} important?`,
    answer: milestone.impact,
  });

  if (era) {
    faqs.push({
      question: `Which era of AI history does ${milestone.title} belong to?`,
      answer: `${milestone.title} is part of the ${era.name} era (${era.yearStart}–${era.yearEnd}) — ${IMPACT_DESCRIPTIONS[milestone.impactLevel]} in the ${categoryLabel(milestone.category).toLowerCase()} category.`,
    });
  }

  return faqs;
}

export function getEraFaqs(
  era: AIEraInfo,
  eraMilestones: AITimelineMilestone[]
): FaqItem[] {
  const faqs: FaqItem[] = [];

  faqs.push({
    question: `When was the ${era.name} era of AI?`,
    answer: `The ${era.name} era of artificial intelligence spans ${era.yearStart} to ${era.yearEnd}.`,
  });

  faqs.push({
    question: `What defined the ${era.name} era?`,
    answer: era.description,
  });

  const topMilestones = [...eraMilestones]
    .sort((a, b) => b.impactLevel - a.impactLevel)
    .slice(0, 4)
    .map((m) => `${m.title} (${m.year})`);

  if (topMilestones.length > 0) {
    faqs.push({
      question: `What are the key milestones of the ${era.name} era?`,
      answer: `This era includes ${eraMilestones.length} milestones, among the most impactful: ${joinList(topMilestones)}.`,
    });
  }

  return faqs;
}
