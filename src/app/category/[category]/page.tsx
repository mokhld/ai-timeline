import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { milestones } from "@/data/timeline";
import {
  getMilestonesByCategory,
  getAllCategories,
  categoryLabel,
  getEraById,
} from "@/lib/timeline-utils";
import {
  breadcrumbJsonLd,
  itemListJsonLd,
  categoryPageJsonLd,
} from "@/lib/structured-data";

interface Props {
  params: { category: string };
}

export async function generateStaticParams() {
  return getAllCategories().map((c) => ({ category: c }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const label = categoryLabel(params.category);
  const count = milestones.filter(
    (m) => m.category === params.category
  ).length;

  return {
    title: `${label} in AI History — Timeline & Milestones`,
    description: `Explore ${count} ${label.toLowerCase()} across the history of artificial intelligence, from the 1940s to today.`,
    alternates: {
      canonical: `/category/${params.category}`,
    },
    openGraph: {
      title: `${label} in AI History — Timeline & Milestones | AI World`,
      description: `${count} milestones in ${label.toLowerCase()} across AI history.`,
    },
  };
}

export default function CategoryPage({ params }: Props) {
  const catMilestones = getMilestonesByCategory(params.category);
  if (catMilestones.length === 0) notFound();

  const label = categoryLabel(params.category);
  const otherCategories = getAllCategories().filter(
    (c) => c !== params.category
  );

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            categoryPageJsonLd(label, params.category, catMilestones.length)
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            itemListJsonLd(
              `${label} in AI History`,
              `${catMilestones.length} milestones in ${label.toLowerCase()} across AI history.`,
              catMilestones.map((m) => ({
                name: m.title,
                url: `https://aiworld.com/timeline/${m.id}`,
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
              { name: "AI World", url: "https://aiworld.com" },
              {
                name: label,
                url: `https://aiworld.com/category/${params.category}`,
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
        <span className="text-[var(--color-text)]">{label}</span>
      </nav>

      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">{label}</h1>
        <p className="text-xl text-[var(--color-text-muted)] mt-2">
          {catMilestones.length} milestones in AI history
        </p>
      </header>

      <section>
        <div className="space-y-6">
          {catMilestones.map((m) => {
            const era = getEraById(m.era);
            return (
              <a
                key={m.id}
                href={`/timeline/${m.id}`}
                className="block border-l-2 border-white/20 hover:border-primary pl-6 py-2 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <time className="text-sm text-primary-light font-mono">
                    {m.year}
                  </time>
                  {era && (
                    <span className="text-xs text-[var(--color-text-muted)]">
                      · {era.name}
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

      {otherCategories.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold mb-4">Other Categories</h2>
          <div className="flex flex-wrap gap-2">
            {otherCategories.map((c) => (
              <a
                key={c}
                href={`/category/${c}`}
                className="text-sm px-3 py-1 rounded-full border border-white/10 hover:border-primary/50 transition-colors"
              >
                {categoryLabel(c)}
              </a>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
