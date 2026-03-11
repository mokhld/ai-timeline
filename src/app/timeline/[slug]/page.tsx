import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { milestones } from "@/data/timeline";
import {
  getMilestoneBySlug,
  getRelatedMilestones,
  getEraById,
  categoryLabel,
} from "@/lib/timeline-utils";
import { milestoneJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";

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
    description: `${milestone.description} ${milestone.impact}`.slice(0, 160),
    alternates: {
      canonical: `/timeline/${milestone.id}`,
    },
    openGraph: {
      title: `${milestone.title} (${milestone.year}) — AI Timeline | AI World`,
      description: milestone.description,
      type: "article",
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
              { name: "AI World", url: "https://aiworld.com" },
              {
                name: era?.name ?? "Timeline",
                url: `https://aiworld.com/era/${milestone.era}`,
              },
              {
                name: milestone.title,
                url: `https://aiworld.com/timeline/${milestone.id}`,
              },
            ])
          ),
        }}
      />

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
            <time className="text-primary-light font-mono text-lg">
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
            <span className="text-xs px-3 py-1 rounded-full bg-white/5 text-[var(--color-text-muted)]">
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
                  <li
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-white/5 text-[var(--color-text-muted)] border border-white/10"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
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
                <span className="text-sm text-primary-light font-mono">
                  {m.year}
                </span>
                <h3 className="font-semibold mt-1">{m.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] mt-1 line-clamp-2">
                  {m.description}
                </p>
              </a>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
