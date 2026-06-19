import { describe, expect, test } from "vitest";
import type { AITimelineMilestone, AIEraInfo } from "@/data/timeline";
import { formatMilestoneDate, getMilestoneFaqs, getEraFaqs } from "@/lib/faq";

function makeMilestone(
  overrides: Partial<AITimelineMilestone> &
    Pick<AITimelineMilestone, "id" | "year">
): AITimelineMilestone {
  return {
    id: overrides.id,
    year: overrides.year,
    title: overrides.title ?? overrides.id,
    category: overrides.category ?? "research",
    people: overrides.people ?? [],
    organizations: overrides.organizations ?? [],
    description: overrides.description ?? "Description",
    impact: overrides.impact ?? "It mattered.",
    impactLevel: overrides.impactLevel ?? 3,
    era: overrides.era ?? "transformer",
    tags: overrides.tags ?? [],
    month: overrides.month,
    day: overrides.day,
  };
}

const transformerEra: AIEraInfo = {
  id: "transformer",
  name: "The Transformer Era",
  yearStart: 2018,
  yearEnd: 2021,
  description: "Attention reshaped the field.",
  color: "#000",
};

describe("formatMilestoneDate", () => {
  test("formats year only when no month is present", () => {
    expect(formatMilestoneDate({ year: 2017 })).toBe("2017");
  });

  test("formats month and year", () => {
    expect(formatMilestoneDate({ year: 2022, month: 11 })).toBe(
      "November 2022"
    );
  });

  test("formats full date when day is present", () => {
    expect(formatMilestoneDate({ year: 2022, month: 11, day: 30 })).toBe(
      "November 30, 2022"
    );
  });

  test("ignores out-of-range month values", () => {
    expect(formatMilestoneDate({ year: 2020, month: 13 })).toBe("2020");
  });
});

describe("getMilestoneFaqs", () => {
  test("derives grounded answers from milestone data", () => {
    const faqs = getMilestoneFaqs(
      makeMilestone({
        id: "transformer-2017",
        title: "The Transformer",
        year: 2017,
        month: 6,
        people: ["Ashish Vaswani", "Noam Shazeer"],
        organizations: ["Google"],
        impact: "It became the backbone of modern AI.",
        category: "research",
      }),
      transformerEra
    );

    const questions = faqs.map((f) => f.question);
    expect(questions).toContain("When did The Transformer happen?");
    expect(questions).toContain("Who was behind The Transformer?");
    expect(questions).toContain("Why was The Transformer important?");
    expect(questions).toContain(
      "Which era of AI history does The Transformer belong to?"
    );

    const when = faqs.find((f) => f.question.startsWith("When"));
    expect(when?.answer).toContain("June 2017");

    const who = faqs.find((f) => f.question.startsWith("Who"));
    expect(who?.answer).toContain("Ashish Vaswani and Noam Shazeer");
    expect(who?.answer).toContain("Google");

    const why = faqs.find((f) => f.question.startsWith("Why"));
    expect(why?.answer).toBe("It became the backbone of modern AI.");
  });

  test("omits the contributor question when no people or organizations exist", () => {
    const faqs = getMilestoneFaqs(
      makeMilestone({ id: "x", title: "Mystery Event", year: 1970 })
    );
    expect(faqs.some((f) => f.question.startsWith("Who"))).toBe(false);
  });

  test("omits the era question when no era is supplied", () => {
    const faqs = getMilestoneFaqs(
      makeMilestone({ id: "x", title: "Event", year: 1970 })
    );
    expect(faqs.some((f) => f.question.includes("era"))).toBe(false);
  });
});

describe("getEraFaqs", () => {
  test("summarizes span, definition, and top milestones", () => {
    const faqs = getEraFaqs(transformerEra, [
      makeMilestone({ id: "a", title: "BERT", year: 2018, impactLevel: 4 }),
      makeMilestone({ id: "b", title: "GPT-2", year: 2019, impactLevel: 5 }),
    ]);

    const when = faqs.find((f) => f.question.includes("When was"));
    expect(when?.answer).toContain("2018 to 2021");

    const key = faqs.find((f) => f.question.includes("key milestones"));
    expect(key?.answer).toContain("GPT-2 (2019)");
    expect(key?.answer).toContain("2 milestones");
  });
});
