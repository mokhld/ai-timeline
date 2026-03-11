import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { milestones } from "@/data/timeline";
import {
  getMilestoneBySlug,
  getRelatedMilestones,
  getMilestonesByEra,
  getEraById,
  categoryLabel,
  tagLabel,
  truncateAtWord,
} from "@/lib/timeline-utils";
import {
  milestoneJsonLd,
  breadcrumbJsonLd,
  personJsonLd,
  ogImageUrl,
} from "@/lib/structured-data";
import NewsletterSignup from "@/components/NewsletterSignup";
import MilestoneHeroImage from "@/components/MilestoneHeroImage";
import MilestoneListCard from "@/components/MilestoneListCard";
import ImpactDots from "@/components/ImpactDots";
import { categoryColors } from "@/lib/colors";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return milestones.map((m) => ({ slug: m.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const milestone = getMilestoneBySlug(params.slug);
  if (!milestone) return {};

  return {
    title: `${milestone.title} (${milestone.year}) — AI Timeline`,
    description: truncateAtWord(`${milestone.description} Learn about the impact of ${milestone.title} on the history of artificial intelligence.`, 155),
    alternates: {
      canonical: `/timeline/${milestone.id}`,
    },
    openGraph: {
      title: `${milestone.title} (${milestone.year})`,
      description: milestone.description,
      type: "article",
      images: [
        {
          url: ogImageUrl({
            title: milestone.title,
            subtitle: `${milestone.year} · ${categoryLabel(milestone.category)}`,
            type: "milestone",
          }),
          width: 1200,
          height: 630,
          alt: `${milestone.title} (${milestone.year}) — AI Timeline`,
        },
      ],
    },
  };
}

export default function MilestonePage({ params }: Props) {
  const milestone = getMilestoneBySlug(params.slug);
  if (!milestone) notFound();

  const era = getEraById(milestone.era);
  const related = getRelatedMilestones(milestone);

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(milestoneJsonLd(milestone)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "AI Timeline", url: "https://aitimeline.com" },
              {
                name: era?.name ?? "Timeline",
                url: `https://aitimeline.com/era/${milestone.era}`,
              },
              {
                name: milestone.title,
                url: `https://aitimeline.com/timeline/${milestone.id}`,
              },
            ])
          ),
        }}
      />

      {milestone.people.map((person) => (
        <script
          key={person}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              personJsonLd(person, [
                {
                  title: milestone.title,
                  id: milestone.id,
                  year: milestone.year,
                },
              ])
            ),
          }}
        />
      ))}

      <nav
        aria-label="Breadcrumb"
        className="text-sm text-[var(--color-text-muted)] mb-8 flex gap-2"
      >
        <a href="/" className="hover:text-primary-light">
          Home
        </a>
        <span>/</span>
        <a
          href={`/era/${milestone.era}`}
          className="hover:text-primary-light"
        >
          {era?.name}
        </a>
        <span>/</span>
        <span className="text-[var(--color-text)]">{milestone.title}</span>
      </nav>

      {milestone.imageUrl && (
        <MilestoneHeroImage
          src={milestone.imageUrl}
          alt={milestone.imageAlt ?? milestone.title}
          eraColor={era?.color ?? "#6366f1"}
        />
      )}

      <article>
        <header className="mb-8">
          {/* Era-colored accent bar */}
          <div
            className="w-12 h-1 rounded-full mb-4"
            style={{ backgroundColor: era?.color ?? "#6366f1" }}
          />
          <a href={`/year/${milestone.year}`} className="hover:underline">
            <time dateTime={String(milestone.year)} className="font-mono text-lg" style={{ color: era?.color ?? "#6366f1" }}>
              {milestone.year}
            </time>
          </a>
          <h1 className="text-4xl md:text-5xl font-bold mt-2">
            {milestone.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <a
              href={`/category/${milestone.category}`}
              className="text-xs px-3 py-1 rounded-full border shrink-0"
              style={{
                color: categoryColors[milestone.category],
                borderColor: `${categoryColors[milestone.category]}40`,
              }}
            >
              {categoryLabel(milestone.category)}
            </a>
            {era && (
              <a
                href={`/era/${era.id}`}
                className="text-xs px-3 py-1 rounded-full border border-white/10 text-[#94a3b8] hover:border-white/30 transition-colors"
              >
                {era.name}
              </a>
            )}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#64748b]">Impact</span>
              <ImpactDots level={milestone.impactLevel} />
            </div>
          </div>
        </header>

        <section className="space-y-6">
          <div className="rounded-xl border border-white/5 bg-[#0f172a]/40 p-5">
            <h2 className="text-xl font-semibold mb-2">What Happened</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              {milestone.description}
            </p>
          </div>

          <div className="rounded-xl border border-white/5 bg-[#0f172a]/40 p-5">
            <h2 className="text-xl font-semibold mb-2 text-[#22d3ee]">Why It Mattered</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              {milestone.impact}
            </p>
          </div>

          {milestone.people.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Key People</h2>
              <ul className="flex flex-wrap gap-2">
                {milestone.people.map((p) => (
                  <li
                    key={p}
                    className="text-sm px-3 py-1 rounded-md bg-[#1e293b] text-[#94a3b8]"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {milestone.organizations.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Organizations</h2>
              <ul className="flex flex-wrap gap-2">
                {milestone.organizations.map((o) => (
                  <li
                    key={o}
                    className="text-sm px-3 py-1 rounded-md bg-[#1e293b] text-[#818cf8] border border-[#818cf8]/10"
                  >
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {milestone.tags.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Tags</h2>
              <ul className="flex flex-wrap gap-2">
                {milestone.tags.map((tag) => (
                  <li key={tag}>
                    <a
                      href={`/tag/${tag}`}
                      className="text-xs px-3 py-1 rounded-full bg-white/5 text-[var(--color-text-muted)] border border-white/10 hover:border-primary/50 hover:text-primary-light transition-colors inline-block"
                    >
                      {tagLabel(tag)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {era && (
            <div className="pt-4 border-t border-white/10">
              <p className="text-sm text-[var(--color-text-muted)]">
                Part of the{" "}
                <a
                  href={`/era/${era.id}`}
                  className="text-primary-light hover:underline"
                >
                  {era.name} ({era.yearStart}–{era.yearEnd})
                </a>{" "}
                era · Browse{" "}
                <a
                  href={`/category/${milestone.category}`}
                  className="text-primary-light hover:underline"
                >
                  all {categoryLabel(milestone.category).toLowerCase()}
                </a>{" "}
                · View{" "}
                <a
                  href={`/year/${milestone.year}`}
                  className="text-primary-light hover:underline"
                >
                  all {milestone.year} milestones
                </a>
              </p>
            </div>
          )}
        </section>
      </article>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Milestones</h2>
          <div className="space-y-4">
            {related.map((m, i) => {
              const relatedEra = getEraById(m.era);
              return (
                <MilestoneListCard
                  key={m.id}
                  milestone={m}
                  eraColor={relatedEra?.color ?? "#6366f1"}
                  index={i}
                  showYear={true}
                  showCategory={true}
                />
              );
            })}
          </div>
        </section>
      )}
      <section className="mt-16 pt-12 border-t border-white/10">
        <NewsletterSignup />
      </section>
    </main>
  );
}
