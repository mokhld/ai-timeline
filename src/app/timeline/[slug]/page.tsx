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

      <article>
        <header className="mb-8">
          <a href={`/year/${milestone.year}`} className="hover:underline">
            <time dateTime={String(milestone.year)} className="text-primary-light font-mono text-lg">
              {milestone.year}
            </time>
          </a>
          <h1 className="text-4xl md:text-5xl font-bold mt-2">
            {milestone.title}
          </h1>
          <div className="flex flex-wrap gap-2 mt-4">
            <a
              href={`/category/${milestone.category}`}
              className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary-light hover:bg-primary/30"
            >
              {categoryLabel(milestone.category)}
            </a>
            <span
              className="text-xs px-3 py-1 rounded-full bg-white/5 text-[var(--color-text-muted)]"
              aria-label={`Impact: ${milestone.impactLevel} out of 5`}
            >
              Impact: {"★".repeat(milestone.impactLevel)}
              {"☆".repeat(5 - milestone.impactLevel)}
            </span>
          </div>
        </header>

        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">What Happened</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              {milestone.description}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Why It Mattered</h2>
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
                    className="text-sm px-3 py-1 rounded-full bg-surface border border-white/10"
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
                    className="text-sm px-3 py-1 rounded-full bg-surface border border-white/10"
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
            {related.map((m) => (
              <a
                key={m.id}
                href={`/timeline/${m.id}`}
                className="block p-4 rounded-lg border border-white/10 bg-surface hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm text-primary-light font-mono">
                    {m.year}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary-light">
                    {categoryLabel(m.category)}
                  </span>
                </div>
                <h3 className="font-semibold mt-1">{m.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] mt-1 line-clamp-2">
                  {m.description}
                </p>
              </a>
            ))}
          </div>
        </section>
      )}
      <section className="mt-16 pt-12 border-t border-white/10">
        <NewsletterSignup />
      </section>
    </main>
  );
}
