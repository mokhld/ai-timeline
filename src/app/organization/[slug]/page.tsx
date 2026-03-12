import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import MilestoneListCard from "@/components/MilestoneListCard";
import {
  getAllOrganizationEntities,
  getOrganizationEntityBySlug,
} from "@/lib/entities";
import { getEraById, truncateAtWord } from "@/lib/timeline-utils";
import {
  breadcrumbJsonLd,
  itemListJsonLd,
  ogImageUrl,
  organizationJsonLd,
} from "@/lib/structured-data";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllOrganizationEntities().map((organization) => ({
    slug: organization.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const organization = getOrganizationEntityBySlug(params.slug);
  if (!organization) return {};

  const description = truncateAtWord(organization.summary, 155);

  return {
    title: `${organization.name} AI History`,
    description,
    alternates: {
      canonical: `/organization/${organization.slug}`,
    },
    openGraph: {
      title: `${organization.name} — AI Timeline Organization Profile`,
      description,
      images: [
        {
          url: ogImageUrl({
            title: organization.name,
            subtitle: `${organization.milestoneCount} milestone${organization.milestoneCount > 1 ? "s" : ""} · ${organization.yearRange.start}${organization.yearRange.start === organization.yearRange.end ? "" : `–${organization.yearRange.end}`}`,
            type: "organization",
          }),
          width: 1200,
          height: 630,
          alt: `${organization.name} — AI Timeline`,
        },
      ],
    },
  };
}

export default function OrganizationPage({ params }: Props) {
  const organization = getOrganizationEntityBySlug(params.slug);
  if (!organization) notFound();

  const relatedOrganizations = organization.relatedOrganizations.slice(0, 8);
  const relatedPeople = organization.relatedPeople.slice(0, 8);

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            organizationJsonLd(
              organization.name,
              organization.milestones.map((milestone) => ({
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
              `${organization.name} on AI Timeline`,
              organization.summary,
              organization.milestones.map((milestone) => ({
                name: milestone.title,
                url: `https://aitimeline.com/timeline/${milestone.id}`,
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
              { name: "AI Timeline", url: "https://aitimeline.com" },
              {
                name: "Organizations",
                url: "https://aitimeline.com/organizations",
              },
              {
                name: organization.name,
                url: `https://aitimeline.com/organization/${organization.slug}`,
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
        <Link href="/organizations" className="hover:text-primary-light">
          Organizations
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text)]">{organization.name}</span>
      </nav>

      <header className="mb-12 relative">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full pointer-events-none opacity-20 blur-3xl bg-indigo-400/30" />
        <div className="w-4 h-4 rounded-full mb-4 relative bg-indigo-400 shadow-[0_0_12px_rgba(129,140,248,0.45)]" />
        <h1 className="text-4xl md:text-5xl font-bold relative">
          {organization.name}
        </h1>
        <p className="text-xl text-[var(--color-text-muted)] mt-2">
          {organization.milestoneCount} milestone
          {organization.milestoneCount > 1 ? "s" : ""} ·{" "}
          {organization.yearRange.start}
          {organization.yearRange.start === organization.yearRange.end
            ? ""
            : `–${organization.yearRange.end}`}
        </p>
        <p className="text-[var(--color-text-muted)] mt-4 leading-relaxed max-w-3xl">
          {organization.summary}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {organization.eras.slice(0, 3).map((era) => (
            <a
              key={era.id}
              href={`/era/${era.id}`}
              className="text-xs px-3 py-1 rounded-full border border-white/10 text-[var(--color-text-muted)] hover:border-indigo-400/40 hover:text-indigo-300 transition-colors"
            >
              {era.label} ({era.count})
            </a>
          ))}
          {organization.categories.slice(0, 3).map((category) => (
            <a
              key={category.id}
              href={`/category/${category.id}`}
              className="text-xs px-3 py-1 rounded-full border border-white/10 text-[var(--color-text-muted)] hover:border-indigo-400/40 hover:text-indigo-300 transition-colors"
            >
              {category.label} ({category.count})
            </a>
          ))}
        </div>
      </header>

      <section>
        <h2 className="text-2xl font-bold mb-6">Chronology</h2>
        <div className="space-y-4">
          {organization.milestones.map((milestone, index) => {
            const era = getEraById(milestone.era);
            return (
              <MilestoneListCard
                key={milestone.id}
                milestone={milestone}
                eraColor={era?.color ?? "#818cf8"}
                index={index}
                showYear={true}
                showCategory={true}
              />
            );
          })}
        </div>
      </section>

      {relatedOrganizations.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-4">Related Organizations</h2>
          <div className="flex flex-wrap gap-2">
            {relatedOrganizations.map((related) => (
              <a
                key={related.slug}
                href={`/organization/${related.slug}`}
                className="text-sm px-3 py-1 rounded-full border border-white/10 hover:border-indigo-400/40 hover:text-indigo-300 transition-colors"
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

      {relatedPeople.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-4">Related People</h2>
          <div className="flex flex-wrap gap-2">
            {relatedPeople.map((person) => (
              <a
                key={person.slug}
                href={`/person/${person.slug}`}
                className="text-sm px-3 py-1 rounded-full border border-white/10 hover:border-indigo-400/40 hover:text-indigo-300 transition-colors"
              >
                {person.name}{" "}
                <span className="text-[var(--color-text-muted)]">
                  ({person.count})
                </span>
              </a>
            ))}
          </div>
        </section>
      )}

      {organization.tags.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-4">Frequent Topics</h2>
          <div className="flex flex-wrap gap-2">
            {organization.tags.slice(0, 8).map((tag) => (
              <a
                key={tag.id}
                href={`/tag/${tag.id}`}
                className="text-sm px-3 py-1 rounded-full border border-white/10 hover:border-indigo-400/40 hover:text-indigo-300 transition-colors"
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
