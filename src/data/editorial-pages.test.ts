import { describe, expect, test } from "vitest";
import { milestones } from "@/data/timeline";
import {
  getAllOrganizationEntities,
  getAllPeopleEntities,
} from "@/lib/entities";
import { getAllCategories, getAllTags } from "@/lib/timeline-utils";
import { editorialPages } from "@/data/editorial-pages";

describe("editorialPages", () => {
  test("exposes a stable unique slug registry with canonical history paths", () => {
    expect(editorialPages).toHaveLength(3);

    const slugs = editorialPages.map((page) => page.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs).toEqual([
      "history-of-openai",
      "history-of-ai-agents",
      "most-important-ai-milestones",
    ]);

    for (const page of editorialPages) {
      expect(page.canonicalPath).toBe(`/history/${page.slug}`);
    }
  });

  test("only references milestone ids that exist in the timeline dataset", () => {
    const milestoneIds = new Set(milestones.map((milestone) => milestone.id));

    for (const page of editorialPages) {
      expect(page.featuredMilestoneIds.length).toBeGreaterThan(0);

      for (const milestoneId of page.featuredMilestoneIds) {
        expect(milestoneIds.has(milestoneId)).toBe(true);
      }
    }
  });

  test("only references valid tags, entities, and internal guide links", () => {
    const validTags = new Set(getAllTags());
    const validPeople = new Set(getAllPeopleEntities().map((entity) => entity.slug));
    const validOrganizations = new Set(
      getAllOrganizationEntities().map((entity) => entity.slug)
    );
    const validMilestones = new Set(milestones.map((milestone) => milestone.id));
    const validCategories = new Set(getAllCategories());
    const validHistoryPages = new Set(editorialPages.map((page) => page.canonicalPath));
    const validEras = new Set<string>(milestones.map((milestone) => milestone.era));

    for (const page of editorialPages) {
      for (const tag of page.relatedTags) {
        expect(validTags.has(tag)).toBe(true);
      }

      for (const entity of page.relatedEntities) {
        if (entity.type === "person") {
          expect(validPeople.has(entity.slug)).toBe(true);
        } else {
          expect(validOrganizations.has(entity.slug)).toBe(true);
        }
      }

      for (const section of page.sections) {
        for (const link of section.links ?? []) {
          const historyMatch = link.href.match(/^\/history\/.+/);
          const timelineMatch = link.href.match(/^\/timeline\/(.+)$/);
          const tagMatch = link.href.match(/^\/tag\/(.+)$/);
          const personMatch = link.href.match(/^\/person\/(.+)$/);
          const organizationMatch = link.href.match(/^\/organization\/(.+)$/);
          const eraMatch = link.href.match(/^\/era\/(.+)$/);
          const categoryMatch = link.href.match(/^\/category\/(.+)$/);

          if (historyMatch) {
            expect(validHistoryPages.has(link.href as `/history/${string}`)).toBe(
              true
            );
            continue;
          }

          if (timelineMatch) {
            expect(validMilestones.has(timelineMatch[1])).toBe(true);
            continue;
          }

          if (tagMatch) {
            expect(validTags.has(tagMatch[1])).toBe(true);
            continue;
          }

          if (personMatch) {
            expect(validPeople.has(personMatch[1])).toBe(true);
            continue;
          }

          if (organizationMatch) {
            expect(validOrganizations.has(organizationMatch[1])).toBe(true);
            continue;
          }

          if (eraMatch) {
            expect(validEras.has(eraMatch[1])).toBe(true);
            continue;
          }

          if (categoryMatch) {
            expect(validCategories.has(categoryMatch[1])).toBe(true);
            continue;
          }

          throw new Error(`Unexpected editorial link target: ${link.href}`);
        }
      }
    }
  });
});
