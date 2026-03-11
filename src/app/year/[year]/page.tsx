import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getMilestonesByYear,
  getAllYears,
  getEraById,
  categoryLabel,
  getAdjacentYears,
} from "@/lib/timeline-utils";
import { breadcrumbJsonLd, itemListJsonLd, yearPageJsonLd } from "@/lib/structured-data";

interface Props {
  params: { year: string };
}

export async function generateStaticParams() {
  return getAllYears().map((y) => ({ year: String(y) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const year = parseInt(params.year, 10);
  const yearMilestones = getMilestonesByYear(year);
  if (yearMilestones.length === 0) return {};

  return {
    title: `AI in ${year} — Timeline & Key Developments`,
    description: `Explore ${yearMilestones.length} artificial intelligence milestone${yearMilestones.length > 1 ? "s" : ""} from ${year}, including ${yearMilestones
      .slice(0, 3)
      .map((m) => m.title)
      .join(", ")}.`,
    alternates: {
      canonical: `/year/${year}`,
    },
    openGraph: {
      title: `AI in ${year} — Timeline & Key Developments | AI Timeline`,
      description: `${yearMilestones.length} AI milestone${yearMilestones.length > 1 ? "s" : ""} from ${year}.`,
    },
  };
}

export default function YearPage({ params }: Props) {
  const year = parseInt(params.year, 10);
  const yearMilestones = getMilestonesByYear(year);
  if (yearMilestones.length === 0) notFound();

  const { prev, next } = getAdjacentYears(year);
  const yearCategories = [...new Set(yearMilestones.map((m) => m.category))];

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            yearPageJsonLd(year, yearMilestones.length)
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
                name: String(year),
                url: `https://aitimeline.com/year/${year}`,
              },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            itemListJsonLd(
              `AI Developments in ${year}`,
              `${yearMilestones.length} artificial intelligence milestones from ${year}.`,
              yearMilestones.map((m) => ({
                name: m.title,
                url: `https://aitimeline.com/timeline/${m.id}`,
              }))
            )
          ),
        }}
      />

      <nav aria-label="Breadcrumb" className="text-sm text-[var(--color-text-muted)] mb-8 flex gap-2">
        <a href="/" className="hover:text-primary-light">
          Home
        </a>
        <span>/</span>
        <span className="text-[var(--color-text)]">{year}</span>
      </nav>

      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">AI in {year}</h1>
        <p className="text-xl text-[var(--color-text-muted)] mt-2">
          {yearMilestones.length} milestone
          {yearMilestones.length > 1 ? "s" : ""} in artificial intelligence
        </p>
      </header>

      <section>
        <div className="space-y-6">
          {yearMilestones.map((m) => {
            const era = getEraById(m.era);
            return (
              <a
                key={m.id}
                href={`/timeline/${m.id}`}
                className="block border-l-2 border-white/20 hover:border-primary pl-6 py-2 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary-light">
                    {categoryLabel(m.category)}
                  </span>
                  {era && (
                    <span className="text-xs text-[var(--color-text-muted)]">
                      · <span>{era.name}</span>
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold mt-1">{m.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] mt-1 line-clamp-2">
                  {m.description}
                </p>
              </a>
            );
          })}
        </div>
      </section>

      {yearCategories.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-4">Categories in {year}</h2>
          <div className="flex flex-wrap gap-2">
            {yearCategories.map((c) => (
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

      <nav className="mt-16 flex justify-between items-center border-t border-white/10 pt-8">
        {prev ? (
          <a href={`/year/${prev}`} className="group flex flex-col">
            <span className="text-xs text-[var(--color-text-muted)] group-hover:text-primary-light">
              Previous Year
            </span>
            <span className="font-semibold group-hover:text-primary-light transition-colors">
              {prev}
            </span>
          </a>
        ) : (
          <div />
        )}
        {next ? (
          <a
            href={`/year/${next}`}
            className="group flex flex-col text-right"
          >
            <span className="text-xs text-[var(--color-text-muted)] group-hover:text-primary-light">
              Next Year
            </span>
            <span className="font-semibold group-hover:text-primary-light transition-colors">
              {next}
            </span>
          </a>
        ) : (
          <div />
        )}
      </nav>
    </main>
  );
}
