import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { milestones, eras } from "@/data/timeline";
import {
  getMilestonesByCategory,
  getAllCategories,
  categoryLabel,
  getEraById,
  tagLabel,
} from "@/lib/timeline-utils";
import { categoryColors } from "@/lib/colors";
import MilestoneListCard from "@/components/MilestoneListCard";
import {
  breadcrumbJsonLd,
  itemListJsonLd,
  categoryPageJsonLd,
  ogImageUrl,
} from "@/lib/structured-data";

interface Props {
  params: { category: string };
}

export async function generateStaticParams() {
  return getAllCategories().map((c) => ({ category: c }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const label = categoryLabel(params.category);
  const catMilestones = milestones.filter(
    (m) => m.category === params.category
  );
  const count = catMilestones.length;
  const years = catMilestones.map((m) => m.year);
  const earliest = Math.min(...years);
  const latest = Math.max(...years);
  const description = `Explore ${count} ${label.toLowerCase()} milestones in AI history. From ${earliest} to ${latest}, track every major ${label.toLowerCase().replace(/ &.*/, "")} that shaped artificial intelligence.`;

  return {
    title: `${label} in AI History — Timeline & Milestones`,
    description,
    alternates: {
      canonical: `/category/${params.category}`,
    },
    openGraph: {
      title: `${label} in AI History — Timeline & Milestones`,
      description,
      images: [
        {
          url: ogImageUrl({
            title: `${label} in AI History`,
            subtitle: `${count} milestones · ${earliest}–${latest}`,
            type: "category",
          }),
          width: 1200,
          height: 630,
          alt: `${label} in AI History — AI Timeline`,
        },
      ],
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
              {
                name: label,
                url: `https://aitimeline.com/category/${params.category}`,
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

      <header className="mb-12 relative">
        <div
          className="absolute -top-12 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full pointer-events-none opacity-20 blur-3xl"
          style={{ backgroundColor: categoryColors[params.category] }}
        />
        <h1 className="text-4xl md:text-5xl font-bold relative">{label}</h1>
        <p className="text-xl text-[var(--color-text-muted)] mt-2 relative">
          {catMilestones.length} milestones in AI history
        </p>
      </header>

      <section>
        {eras
          .filter((era) =>
            catMilestones.some((m) => m.era === era.id)
          )
          .map((era) => {
            const eraMilestones = catMilestones.filter(
              (m) => m.era === era.id
            );
            return (
              <div key={era.id} className="mb-12">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor: era.color,
                      boxShadow: `0 0 8px ${era.color}60`,
                    }}
                  />
                  <a
                    href={`/era/${era.id}`}
                    className="hover:text-primary-light transition-colors"
                  >
                    {era.name}{" "}
                    <span className="text-[var(--color-text-muted)] font-normal text-sm">
                      ({era.yearStart}–{era.yearEnd})
                    </span>
                  </a>
                </h2>
                <div className="space-y-4">
                  {eraMilestones.map((m, i) => (
                    <MilestoneListCard
                      key={m.id}
                      milestone={m}
                      eraColor={era.color}
                      index={i}
                      showYear={true}
                      showCategory={false}
                    />
                  ))}
                </div>
              </div>
            );
          })}
      </section>

      {(() => {
        const tagCounts = new Map<string, number>();
        catMilestones.forEach((m) =>
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
