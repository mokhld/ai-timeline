import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getMilestonesByTag,
  getAllTags,
  tagLabel,
  getEraById,
  categoryLabel,
} from "@/lib/timeline-utils";
import {
  breadcrumbJsonLd,
  itemListJsonLd,
  tagPageJsonLd,
} from "@/lib/structured-data";

interface Props {
  params: { tag: string };
}

export async function generateStaticParams() {
  return getAllTags().map((t) => ({ tag: t }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const label = tagLabel(params.tag);
  const tagMilestones = getMilestonesByTag(params.tag);
  if (tagMilestones.length === 0) return {};

  return {
    title: `${label} — AI Timeline & Milestones`,
    description: `Explore ${tagMilestones.length} artificial intelligence milestone${tagMilestones.length > 1 ? "s" : ""} related to ${label.toLowerCase()}, from the 1940s to today.`,
    alternates: {
      canonical: `/tag/${params.tag}`,
    },
    openGraph: {
      title: `${label} — AI Timeline & Milestones | AI Timeline`,
      description: `${tagMilestones.length} AI milestones related to ${label.toLowerCase()}.`,
    },
  };
}

export default function TagPage({ params }: Props) {
  const tagMilestones = getMilestonesByTag(params.tag);
  if (tagMilestones.length === 0) notFound();

  const label = tagLabel(params.tag);
  const otherTags = getAllTags()
    .filter((t) => t !== params.tag)
    .filter((t) => {
      const shared = tagMilestones.some((m) => m.tags.includes(t));
      return shared;
    })
    .slice(0, 12);

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            tagPageJsonLd(label, params.tag, tagMilestones.length)
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            itemListJsonLd(
              `${label} in AI History`,
              `${tagMilestones.length} milestones related to ${label.toLowerCase()}.`,
              tagMilestones.map((m) => ({
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
                url: `https://aitimeline.com/tag/${params.tag}`,
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
          {tagMilestones.length} milestone
          {tagMilestones.length > 1 ? "s" : ""} in AI history
        </p>
      </header>

      <section>
        <div className="space-y-6">
          {tagMilestones.map((m) => {
            const era = getEraById(m.era);
            return (
              <a
                key={m.id}
                href={`/timeline/${m.id}`}
                className="block border-l-2 border-white/20 hover:border-primary pl-6 py-2 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <time
                    dateTime={String(m.year)}
                    className="text-sm text-primary-light font-mono"
                  >
                    {m.year}
                  </time>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary-light">
                    {categoryLabel(m.category)}
                  </span>
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

      {otherTags.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold mb-4">Related Topics</h2>
          <div className="flex flex-wrap gap-2">
            {otherTags.map((t) => (
              <a
                key={t}
                href={`/tag/${t}`}
                className="text-sm px-3 py-1 rounded-full border border-white/10 hover:border-primary/50 transition-colors"
              >
                {tagLabel(t)}
              </a>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
