import {
  eras,
  milestones,
  type AIEra,
  type AITimelineMilestone,
  type MilestoneCategory,
} from "@/data/timeline";
import { categoryLabel, tagLabel } from "@/lib/timeline-utils";

export type TimelineEntityType = "person" | "organization";

export interface EntityCount<T extends string> {
  id: T;
  count: number;
  label: string;
}

export interface EntityRelationship {
  slug: string;
  name: string;
  count: number;
  milestoneIds: string[];
}

export interface TimelineEntity {
  type: TimelineEntityType;
  slug: string;
  name: string;
  milestoneCount: number;
  milestones: AITimelineMilestone[];
  yearRange: {
    start: number;
    end: number;
  };
  categories: EntityCount<MilestoneCategory>[];
  eras: EntityCount<AIEra>[];
  tags: EntityCount<string>[];
  relatedPeople: EntityRelationship[];
  relatedOrganizations: EntityRelationship[];
  summary: string;
}

export interface DerivedEntityIndex {
  people: TimelineEntity[];
  organizations: TimelineEntity[];
  peopleBySlug: Record<string, TimelineEntity>;
  organizationsBySlug: Record<string, TimelineEntity>;
}

const unicodeSlugReplacements: Record<string, string> = {
  "ß": "ss",
  "Æ": "AE",
  "æ": "ae",
  "Ø": "O",
  "ø": "o",
  "Œ": "OE",
  "œ": "oe",
  "Ð": "D",
  "ð": "d",
  "Þ": "TH",
  "þ": "th",
  "Ł": "L",
  "ł": "l",
};

interface EntityBucket {
  type: TimelineEntityType;
  slug: string;
  names: Set<string>;
  milestones: AITimelineMilestone[];
  categoryCounts: Map<MilestoneCategory, number>;
  eraCounts: Map<AIEra, number>;
  tagCounts: Map<string, number>;
  relatedPeople: Map<string, Set<string>>;
  relatedOrganizations: Map<string, Set<string>>;
}

function compareMilestones(a: AITimelineMilestone, b: AITimelineMilestone) {
  return (
    a.year - b.year ||
    (a.month ?? 0) - (b.month ?? 0) ||
    (a.day ?? 0) - (b.day ?? 0) ||
    a.title.localeCompare(b.title)
  );
}

function scoreDisplayName(name: string) {
  const trimmed = name.trim();
  const hasNonAscii = /[^\u0000-\u007F]/.test(trimmed);
  const hasRichPunctuation = /[&().,'’]/.test(trimmed);

  return (
    (hasNonAscii ? 100 : 0) +
    (hasRichPunctuation ? 10 : 0) +
    trimmed.length
  );
}

function chooseDisplayName(names: Iterable<string>) {
  return [...names].sort((a, b) => {
    const scoreDiff = scoreDisplayName(b) - scoreDisplayName(a);
    if (scoreDiff !== 0) return scoreDiff;
    return a.localeCompare(b);
  })[0];
}

function sortCounts<T extends string>(
  items: Iterable<[T, number]>,
  getLabel: (id: T) => string
): EntityCount<T>[] {
  return [...items]
    .map(([id, count]) => ({ id, count, label: getLabel(id) }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

function sortRelationships(
  relationships: Map<string, Set<string>>,
  namesBySlug: Map<string, string>,
  milestonesById: Map<string, AITimelineMilestone>
): EntityRelationship[] {
  return [...relationships.entries()]
    .map(([slug, milestoneIds]) => ({
      slug,
      name: namesBySlug.get(slug) ?? slug,
      count: milestoneIds.size,
      milestoneIds: [...milestoneIds].sort((a, b) =>
        compareMilestones(
          milestonesById.get(a) as AITimelineMilestone,
          milestonesById.get(b) as AITimelineMilestone
        )
      ),
    }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

function createBucket(type: TimelineEntityType, slug: string): EntityBucket {
  return {
    type,
    slug,
    names: new Set<string>(),
    milestones: [],
    categoryCounts: new Map<MilestoneCategory, number>(),
    eraCounts: new Map<AIEra, number>(),
    tagCounts: new Map<string, number>(),
    relatedPeople: new Map<string, Set<string>>(),
    relatedOrganizations: new Map<string, Set<string>>(),
  };
}

function addRelationship(
  relationships: Map<string, Set<string>>,
  slug: string,
  milestoneId: string
) {
  const milestoneIds = relationships.get(slug) ?? new Set<string>();
  milestoneIds.add(milestoneId);
  relationships.set(slug, milestoneIds);
}

function pushCount<T extends string>(counts: Map<T, number>, id: T) {
  counts.set(id, (counts.get(id) ?? 0) + 1);
}

function uniqueEntityEntries(names: string[]) {
  const entries = new Map<string, Set<string>>();

  for (const name of names) {
    const slug = slugifyEntityName(name);
    const variants = entries.get(slug) ?? new Set<string>();
    variants.add(name.trim());
    entries.set(slug, variants);
  }

  return [...entries.entries()].map(([slug, variants]) => ({
    slug,
    name: chooseDisplayName(variants),
  }));
}

function buildEntitySummary(entity: TimelineEntity) {
  const leadMilestone = entity.milestones[0];
  const primaryEra = entity.eras[0]?.label;
  const primaryCategory = entity.categories[0]?.label.toLowerCase();
  const entityNoun =
    entity.type === "person" ? "contributions to AI" : "role in AI history";

  if (entity.milestoneCount === 1) {
    const eraPhrase = primaryEra ? ` during ${primaryEra}` : "";
    return `${entity.name} is featured for ${entityNoun} through ${leadMilestone.title} in ${leadMilestone.year}${eraPhrase}.`;
  }

  const range =
    entity.yearRange.start === entity.yearRange.end
      ? `in ${entity.yearRange.start}`
      : `from ${entity.yearRange.start} to ${entity.yearRange.end}`;
  const topicPhrase = primaryCategory ? `, with the strongest concentration in ${primaryCategory}` : "";

  return `Explore ${entity.name}'s ${entityNoun} across ${entity.milestoneCount} milestones ${range}${topicPhrase}.`;
}

function finalizeBuckets(
  buckets: Map<string, EntityBucket>,
  peopleNamesBySlug: Map<string, string>,
  organizationNamesBySlug: Map<string, string>,
  milestonesById: Map<string, AITimelineMilestone>
) {
  return [...buckets.values()]
    .map((bucket): TimelineEntity => {
      const name = chooseDisplayName(bucket.names);
      const entity: TimelineEntity = {
        type: bucket.type,
        slug: bucket.slug,
        name,
        milestoneCount: bucket.milestones.length,
        milestones: [...bucket.milestones].sort(compareMilestones),
        yearRange: {
          start: Math.min(...bucket.milestones.map((milestone) => milestone.year)),
          end: Math.max(...bucket.milestones.map((milestone) => milestone.year)),
        },
        categories: sortCounts(bucket.categoryCounts.entries(), categoryLabel),
        eras: sortCounts(
          bucket.eraCounts.entries(),
          (eraId) => eras.find((era) => era.id === eraId)?.name ?? eraId
        ),
        tags: sortCounts(bucket.tagCounts.entries(), tagLabel),
        relatedPeople: sortRelationships(
          bucket.relatedPeople,
          peopleNamesBySlug,
          milestonesById
        ),
        relatedOrganizations: sortRelationships(
          bucket.relatedOrganizations,
          organizationNamesBySlug,
          milestonesById
        ),
        summary: "",
      };

      entity.summary = buildEntitySummary(entity);
      return entity;
    })
    .sort((a, b) => b.milestoneCount - a.milestoneCount || a.name.localeCompare(b.name));
}

export function slugifyEntityName(name: string) {
  const slug = name
    .replace(/[ßÆæØøŒœÐðÞþŁł]/g, (character) =>
      unicodeSlugReplacements[character] ?? character
    )
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/['’]/g, "")
    .replace(/\+/g, " plus ")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .toLowerCase();

  return slug || "entity";
}

export function deriveEntities(
  sourceMilestones: AITimelineMilestone[]
): DerivedEntityIndex {
  const peopleBuckets = new Map<string, EntityBucket>();
  const organizationBuckets = new Map<string, EntityBucket>();

  const orderedMilestones = [...sourceMilestones].sort(compareMilestones);

  for (const milestone of orderedMilestones) {
    const people = uniqueEntityEntries(milestone.people);
    const organizations = uniqueEntityEntries(milestone.organizations);

    for (const person of people) {
      const bucket =
        peopleBuckets.get(person.slug) ?? createBucket("person", person.slug);

      bucket.names.add(person.name);
      bucket.milestones.push(milestone);
      pushCount(bucket.categoryCounts, milestone.category);
      pushCount(bucket.eraCounts, milestone.era);

      for (const tag of milestone.tags) {
        pushCount(bucket.tagCounts, tag);
      }

      peopleBuckets.set(person.slug, bucket);
    }

    for (const organization of organizations) {
      const bucket =
        organizationBuckets.get(organization.slug) ??
        createBucket("organization", organization.slug);

      bucket.names.add(organization.name);
      bucket.milestones.push(milestone);
      pushCount(bucket.categoryCounts, milestone.category);
      pushCount(bucket.eraCounts, milestone.era);

      for (const tag of milestone.tags) {
        pushCount(bucket.tagCounts, tag);
      }

      organizationBuckets.set(organization.slug, bucket);
    }

    for (const person of people) {
      const bucket = peopleBuckets.get(person.slug);
      if (!bucket) continue;

      for (const otherPerson of people) {
        if (otherPerson.slug === person.slug) continue;
        addRelationship(bucket.relatedPeople, otherPerson.slug, milestone.id);
      }

      for (const organization of organizations) {
        addRelationship(
          bucket.relatedOrganizations,
          organization.slug,
          milestone.id
        );
      }
    }

    for (const organization of organizations) {
      const bucket = organizationBuckets.get(organization.slug);
      if (!bucket) continue;

      for (const person of people) {
        addRelationship(bucket.relatedPeople, person.slug, milestone.id);
      }

      for (const otherOrganization of organizations) {
        if (otherOrganization.slug === organization.slug) continue;
        addRelationship(
          bucket.relatedOrganizations,
          otherOrganization.slug,
          milestone.id
        );
      }
    }
  }

  const peopleNamesBySlug = new Map(
    [...peopleBuckets.entries()].map(([slug, bucket]) => [slug, chooseDisplayName(bucket.names)])
  );
  const organizationNamesBySlug = new Map(
    [...organizationBuckets.entries()].map(([slug, bucket]) => [
      slug,
      chooseDisplayName(bucket.names),
    ])
  );
  const milestonesById = new Map(
    orderedMilestones.map((milestone) => [milestone.id, milestone])
  );

  const people = finalizeBuckets(
    peopleBuckets,
    peopleNamesBySlug,
    organizationNamesBySlug,
    milestonesById
  );
  const organizations = finalizeBuckets(
    organizationBuckets,
    peopleNamesBySlug,
    organizationNamesBySlug,
    milestonesById
  );

  return {
    people,
    organizations,
    peopleBySlug: Object.fromEntries(
      people.map((entity) => [entity.slug, entity])
    ),
    organizationsBySlug: Object.fromEntries(
      organizations.map((entity) => [entity.slug, entity])
    ),
  };
}

const entityIndex = deriveEntities(milestones);

export function getAllPeopleEntities() {
  return entityIndex.people;
}

export function getAllOrganizationEntities() {
  return entityIndex.organizations;
}

export function getPersonEntityBySlug(slug: string) {
  return entityIndex.peopleBySlug[slug];
}

export function getOrganizationEntityBySlug(slug: string) {
  return entityIndex.organizationsBySlug[slug];
}
