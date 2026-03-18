import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import MilestoneListCard from "@/components/MilestoneListCard";
import {
  getAllPeopleEntities,
  getPersonEntityBySlug,
} from "@/lib/entities";
import { getEraById, truncateAtWord } from "@/lib/timeline-utils";
import {
  breadcrumbJsonLd,
  itemListJsonLd,
  ogImageUrl,
  personJsonLd,
} from "@/lib/structured-data";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllPeopleEntities().map((person) => ({ slug: person.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const person = getPersonEntityBySlug(params.slug);
  if (!person) return {};

  const description = truncateAtWord(person.summary, 155);

  return {
    title: `${person.name} Contributions to AI`,
    description,
    alternates: {
      canonical: `/person/${person.slug}`,
    },
    openGraph: {
      title: `${person.name} — AI Timeline Person Profile`,
      description,
      images: [
        {
          url: ogImageUrl({
            title: person.name,
            subtitle: `${person.milestoneCount} milestone${person.milestoneCount > 1 ? "s" : ""} · ${person.yearRange.start}${person.yearRange.start === person.yearRange.end ? "" : `–${person.yearRange.end}`}`,
            type: "person",
          }),
          width: 1200,
          height: 630,
          alt: `${person.name} — AI Timeline`,
        },
      ],
    },
  };
}

export default function PersonPage({ params }: Props) {
  const person = getPersonEntityBySlug(params.slug);
  if (!person) notFound();

  const relatedPeople = person.relatedPeople.slice(0, 8);
  const relatedOrganizations = person.relatedOrganizations.slice(0, 8);

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            personJsonLd(
              person.name,
              person.milestones.map((milestone) => ({
                title: milestone.title,
                id: milestone.id,
                year: milestone.year,
              }))
            )
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            itemListJsonLd(
              `${person.name} on AI Timeline`,
              person.summary,
              person.milestones.map((milestone) => ({
                name: milestone.title,
                url: `https://aitimeline.world/timeline/${milestone.id}`,
              }))
            )
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "AI Timeline", url: "https://aitimeline.world" },
              { name: "People", url: "https://aitimeline.world/people" },
              {
                name: person.name,
                url: `https://aitimeline.world/person/${person.slug}`,
              },
            ])
          ),
        }}
      />

      <BackButton />

      <nav
        aria-label="Breadcrumb"
        className="text-sm text-[var(--color-text-muted)] mb-8 flex gap-2"
      >
        <Link href="/" className="hover:text-primary-light">
          Home
        </Link>
        <span>/</span>
        <Link href="/people" className="hover:text-primary-light">
          People
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text)]">{person.name}</span>
      </nav>

      <header className="mb-12 relative">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full pointer-events-none opacity-20 blur-3xl bg-cyan-400/30" />
        <div className="w-4 h-4 rounded-full mb-4 relative bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.45)]" />
        <h1 className="text-4xl md:text-5xl font-bold relative">{person.name}</h1>
        <p className="text-xl text-[var(--color-text-muted)] mt-2">
          {person.milestoneCount} milestone
          {person.milestoneCount > 1 ? "s" : ""} · {person.yearRange.start}
          {person.yearRange.start === person.yearRange.end
            ? ""
            : `–${person.yearRange.end}`}
        </p>
        <p className="text-[var(--color-text-muted)] mt-4 leading-relaxed max-w-3xl">
          {person.summary}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {person.eras.slice(0, 3).map((era) => (
            <a
              key={era.id}
              href={`/era/${era.id}`}
              className="text-xs px-3 py-1 rounded-full border border-white/10 text-[var(--color-text-muted)] hover:border-cyan-400/40 hover:text-cyan-300 transition-colors"
            >
              {era.label} ({era.count})
            </a>
          ))}
          {person.categories.slice(0, 3).map((category) => (
            <a
              key={category.id}
              href={`/category/${category.id}`}
              className="text-xs px-3 py-1 rounded-full border border-white/10 text-[var(--color-text-muted)] hover:border-cyan-400/40 hover:text-cyan-300 transition-colors"
            >
              {category.label} ({category.count})
            </a>
          ))}
        </div>
      </header>

      <section>
        <h2 className="text-2xl font-bold mb-6">Chronology</h2>
        <div className="space-y-4">
          {person.milestones.map((milestone, index) => {
            const era = getEraById(milestone.era);
            return (
              <MilestoneListCard
                key={milestone.id}
                milestone={milestone}
                eraColor={era?.color ?? "#22d3ee"}
                index={index}
                showYear={true}
                showCategory={true}
              />
            );
          })}
        </div>
      </section>

      {relatedPeople.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-4">Related People</h2>
          <div className="flex flex-wrap gap-2">
            {relatedPeople.map((related) => (
              <a
                key={related.slug}
                href={`/person/${related.slug}`}
                className="text-sm px-3 py-1 rounded-full border border-white/10 hover:border-cyan-400/40 hover:text-cyan-300 transition-colors"
              >
                {related.name}{" "}
                <span className="text-[var(--color-text-muted)]">
                  ({related.count})
                </span>
              </a>
            ))}
          </div>
        </section>
      )}

      {relatedOrganizations.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-4">Related Organizations</h2>
          <div className="flex flex-wrap gap-2">
            {relatedOrganizations.map((organization) => (
              <a
                key={organization.slug}
                href={`/organization/${organization.slug}`}
                className="text-sm px-3 py-1 rounded-full border border-white/10 hover:border-cyan-400/40 hover:text-cyan-300 transition-colors"
              >
                {organization.name}{" "}
                <span className="text-[var(--color-text-muted)]">
                  ({organization.count})
                </span>
              </a>
            ))}
          </div>
        </section>
      )}

      {person.tags.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-4">Frequent Topics</h2>
          <div className="flex flex-wrap gap-2">
            {person.tags.slice(0, 8).map((tag) => (
              <a
                key={tag.id}
                href={`/tag/${tag.id}`}
                className="text-sm px-3 py-1 rounded-full border border-white/10 hover:border-cyan-400/40 hover:text-cyan-300 transition-colors"
              >
                {tag.label}{" "}
                <span className="text-[var(--color-text-muted)]">
                  ({tag.count})
                </span>
              </a>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
