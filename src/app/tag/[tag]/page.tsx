import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  getMilestonesByTag,
  getAllTags,
  tagLabel,
  getEraById,
  categoryLabel,
} from "@/lib/timeline-utils";
import MilestoneListCard from "@/components/MilestoneListCard";
import BackButton from "@/components/BackButton";
import {
  breadcrumbJsonLd,
  itemListJsonLd,
  tagPageJsonLd,
  ogImageUrl,
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
    title: `${label} Milestones`,
    description: `Explore ${tagMilestones.length} artificial intelligence milestone${tagMilestones.length > 1 ? "s" : ""} related to ${label.toLowerCase()}, from the 1940s to today.`,
    alternates: {
      canonical: `/tag/${params.tag}`,
    },
    openGraph: {
      title: `${label} — AI Timeline & Milestones`,
      description: `${tagMilestones.length} AI milestones related to ${label.toLowerCase()}.`,
      images: [
        {
          url: ogImageUrl({
            title: label,
            subtitle: `${tagMilestones.length} milestones in AI history`,
            type: "tag",
          }),
          width: 1200,
          height: 630,
          alt: `${label} — AI Timeline`,
        },
      ],
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

      <BackButton />

      <nav
        aria-label="Breadcrumb"
        className="text-sm text-[var(--color-text-muted)] mb-8 flex gap-2"
      >
        <Link href="/" className="hover:text-primary-light">
          Home
        </Link>
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
        <div className="space-y-4">
          {tagMilestones.map((m, i) => {
            const era = getEraById(m.era);
            return (
              <MilestoneListCard
                key={m.id}
                milestone={m}
                eraColor={era?.color ?? "#6366f1"}
                index={i}
                showYear={true}
                showCategory={true}
                showEraName={era?.name}
              />
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
