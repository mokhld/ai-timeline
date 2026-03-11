import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { eras } from "@/data/timeline";
import {
  getEraById,
  getMilestonesByEra,
  getAdjacentEras,
  categoryLabel,
  tagLabel,
} from "@/lib/timeline-utils";
import {
  eraJsonLd,
  breadcrumbJsonLd,
  itemListJsonLd,
} from "@/lib/structured-data";

interface Props {
  params: { eraId: string };
}

export async function generateStaticParams() {
  return eras.map((e) => ({ eraId: e.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const era = getEraById(params.eraId);
  if (!era) return {};

  return {
    title: `${era.name} (${era.yearStart}–${era.yearEnd}) — AI History`,
    description: era.description.slice(0, 160),
    alternates: {
      canonical: `/era/${era.id}`,
    },
    openGraph: {
      title: `${era.name} (${era.yearStart}–${era.yearEnd}) — AI History | AI Timeline`,
      description: era.description,
    },
  };
}

export default function EraPage({ params }: Props) {
  const era = getEraById(params.eraId);
  if (!era) notFound();

  const eraMilestones = getMilestonesByEra(params.eraId);
  const { prev, next } = getAdjacentEras(params.eraId);
  const eraCategories = [...new Set(eraMilestones.map((m) => m.category))];

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(eraJsonLd(era, eraMilestones.length)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            itemListJsonLd(
              `${era.name} Milestones`,
              `${eraMilestones.length} milestones from the ${era.name} era of AI.`,
              eraMilestones.map((m) => ({
                name: m.title,
                url: `https://aitimeline.com/timeline/${m.id}`,
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
              { name: era.name, url: `https://aitimeline.com/era/${era.id}` },
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
        <span className="text-[var(--color-text)]">{era.name}</span>
      </nav>

      <header className="mb-12">
        <div
          className="w-4 h-4 rounded-full mb-4"
          style={{ backgroundColor: era.color }}
        />
        <h1 className="text-4xl md:text-5xl font-bold">{era.name}</h1>
        <p className="text-xl text-[var(--color-text-muted)] mt-2">
          {era.yearStart}–{era.yearEnd} · {eraMilestones.length} milestones
        </p>
        <p className="text-[var(--color-text-muted)] mt-4 leading-relaxed">
          {era.description}
        </p>
      </header>

      <section>
        <h2 className="text-2xl font-bold mb-8">Milestones</h2>
        <div className="space-y-6">
          {eraMilestones.map((m) => (
            <a
              key={m.id}
              href={`/timeline/${m.id}`}
              className="block border-l-2 border-white/20 hover:border-primary pl-6 py-2 transition-colors"
            >
              <time dateTime={String(m.year)} className="text-sm text-primary-light font-mono">
                {m.year}
              </time>
              <h3 className="text-lg font-semibold mt-1">{m.title}</h3>
              <p className="text-sm text-[var(--color-text-muted)] mt-1 line-clamp-2">
                {m.description}
              </p>
              <span
                className="text-xs text-[var(--color-text-muted)] mt-1 inline-block"
                aria-label={`Impact: ${m.impactLevel} out of 5`}
              >
                {"★".repeat(m.impactLevel)}
                {"☆".repeat(5 - m.impactLevel)}
              </span>
            </a>
          ))}
        </div>
      </section>

      {eraCategories.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-4">Categories in this Era</h2>
          <div className="flex flex-wrap gap-2">
            {eraCategories.map((c) => (
              <a
                key={c}
                href={`/category/${c}`}
                className="text-sm px-3 py-1 rounded-full bg-primary/20 text-primary-light hover:bg-primary/30 transition-colors"
              >
                {categoryLabel(c)}
              </a>
            ))}
          </div>
        </section>
      )}

      {(() => {
        const tagCounts = new Map<string, number>();
        eraMilestones.forEach((m) =>
          m.tags.forEach((t) => tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1))
        );
        const popularTags = [...tagCounts.entries()]
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10);
        return popularTags.length > 0 ? (
          <section className="mt-12">
            <h2 className="text-xl font-bold mb-4">Popular Topics</h2>
            <div className="flex flex-wrap gap-2">
              {popularTags.map(([tag, count]) => (
                <a
                  key={tag}
                  href={`/tag/${tag}`}
                  className="text-sm px-3 py-1 rounded-full border border-white/10 hover:border-primary/50 transition-colors"
                >
                  {tagLabel(tag)}{" "}
                  <span className="text-[var(--color-text-muted)]">
                    ({count})
                  </span>
                </a>
              ))}
            </div>
          </section>
        ) : null;
      })()}

      <nav className="mt-16 flex justify-between items-center border-t border-white/10 pt-8">
        {prev ? (
          <a href={`/era/${prev.id}`} className="group flex flex-col">
            <span className="text-xs text-[var(--color-text-muted)] group-hover:text-primary-light">
              Previous Era
            </span>
            <span className="font-semibold group-hover:text-primary-light transition-colors">
              {prev.name}
            </span>
          </a>
        ) : (
          <div />
        )}
        {next ? (
          <a
            href={`/era/${next.id}`}
            className="group flex flex-col text-right"
          >
            <span className="text-xs text-[var(--color-text-muted)] group-hover:text-primary-light">
              Next Era
            </span>
            <span className="font-semibold group-hover:text-primary-light transition-colors">
              {next.name}
            </span>
          </a>
        ) : (
          <div />
        )}
      </nav>
    </main>
  );
}
