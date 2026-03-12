import { describe, expect, test } from "vitest";
import type { AITimelineMilestone } from "@/data/timeline";
import { deriveEntities, slugifyEntityName } from "@/lib/entities";

function makeMilestone(
  overrides: Partial<AITimelineMilestone> & Pick<AITimelineMilestone, "id" | "year">
): AITimelineMilestone {
  return {
    id: overrides.id,
    year: overrides.year,
    title: overrides.title ?? overrides.id,
    category: overrides.category ?? "research",
    people: overrides.people ?? [],
    organizations: overrides.organizations ?? [],
    description: overrides.description ?? "Description",
    impact: overrides.impact ?? "Impact",
    impactLevel: overrides.impactLevel ?? 3,
    era: overrides.era ?? "transformer",
    tags: overrides.tags ?? [],
    month: overrides.month,
    day: overrides.day,
    imageUrl: overrides.imageUrl,
    imageAlt: overrides.imageAlt,
  };
}

describe("slugifyEntityName", () => {
  test("normalizes punctuation and diacritics into stable ASCII slugs", () => {
    expect(slugifyEntityName("Jürgen Schmidhuber")).toBe("jurgen-schmidhuber");
    expect(slugifyEntityName("Łukasz Kaiser")).toBe("lukasz-kaiser");
    expect(slugifyEntityName("Blaise Agüera y Arcas")).toBe(
      "blaise-aguera-y-arcas"
    );
    expect(slugifyEntityName("Straße AI")).toBe("strasse-ai");
    expect(slugifyEntityName("AT&T Bell Labs")).toBe("at-and-t-bell-labs");
    expect(slugifyEntityName("MITI (Japan)")).toBe("miti-japan");
    expect(slugifyEntityName("Université de Montréal")).toBe(
      "universite-de-montreal"
    );
  });
});

describe("deriveEntities", () => {
  test("merges duplicate entity spellings that normalize to the same slug", () => {
    const result = deriveEntities([
      makeMilestone({
        id: "a",
        year: 1986,
        people: ["Jürgen Schmidhuber"],
        organizations: ["AT&T Bell Labs"],
      }),
      makeMilestone({
        id: "b",
        year: 1997,
        people: ["Jurgen Schmidhuber"],
        organizations: ["AT and T Bell Labs"],
      }),
    ]);

    expect(result.people).toHaveLength(1);
    expect(result.people[0]).toMatchObject({
      name: "Jürgen Schmidhuber",
      slug: "jurgen-schmidhuber",
      milestoneCount: 2,
    });

    expect(result.organizations).toHaveLength(1);
    expect(result.organizations[0]).toMatchObject({
      name: "AT&T Bell Labs",
      slug: "at-and-t-bell-labs",
      milestoneCount: 2,
    });
  });

  test("aggregates milestone metadata and co-occurrence relationships", () => {
    const result = deriveEntities([
      makeMilestone({
        id: "openai-founded",
        year: 2015,
        category: "infrastructure",
        era: "breakthrough",
        people: ["Sam Altman", "Greg Brockman"],
        organizations: ["OpenAI"],
        tags: ["organization", "founding"],
      }),
      makeMilestone({
        id: "chatgpt",
        year: 2022,
        category: "product",
        era: "generative",
        people: ["Sam Altman"],
        organizations: ["OpenAI"],
        tags: ["consumer", "founding"],
      }),
    ]);

    const samAltman = result.peopleBySlug["sam-altman"];
    expect(samAltman).toBeDefined();
    expect(samAltman?.milestoneCount).toBe(2);
    expect(samAltman?.yearRange).toEqual({ start: 2015, end: 2022 });
    expect(samAltman?.categories).toEqual([
      { id: "infrastructure", count: 1, label: "Infrastructure & Compute" },
      { id: "product", count: 1, label: "Product Launches" },
    ]);
    expect(samAltman?.eras).toEqual([
      { id: "breakthrough", count: 1, label: "Deep Learning Breakthrough" },
      { id: "generative", count: 1, label: "Generative AI Revolution" },
    ]);
    expect(samAltman?.tags).toEqual([
      { id: "founding", count: 2, label: "Founding" },
      { id: "consumer", count: 1, label: "Consumer" },
      { id: "organization", count: 1, label: "Organization" },
    ]);
    expect(samAltman?.relatedPeople).toEqual([
      {
        slug: "greg-brockman",
        name: "Greg Brockman",
        count: 1,
        milestoneIds: ["openai-founded"],
      },
    ]);
    expect(samAltman?.relatedOrganizations).toEqual([
      {
        slug: "openai",
        name: "OpenAI",
        count: 2,
        milestoneIds: ["openai-founded", "chatgpt"],
      },
    ]);
  });
});
