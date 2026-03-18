import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import MilestoneListCard from "@/components/MilestoneListCard";
import NewsletterSignup from "@/components/NewsletterSignup";
import {
  getAllEditorialPages,
  getEditorialPageBySlug,
  getEditorialPageMilestones,
} from "@/data/editorial-pages";
import { getEraById, tagLabel, truncateAtWord } from "@/lib/timeline-utils";
import {
  breadcrumbJsonLd,
  editorialPageJsonLd,
  itemListJsonLd,
  ogImageUrl,
} from "@/lib/structured-data";

interface Props {
  params: { slug: string };
}

function getEntityHref(type: "person" | "organization", slug: string) {
  return type === "person" ? `/person/${slug}` : `/organization/${slug}`;
}

export async function generateStaticParams() {
  return getAllEditorialPages().map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getEditorialPageBySlug(params.slug);
  if (!page) return {};

  return {
    title: page.title,
    description: truncateAtWord(page.description, 155),
    alternates: {
      canonical: page.canonicalPath,
    },
    openGraph: {
      title: `${page.title} — AI Timeline`,
      description: page.description,
      type: "article",
      images: [
        {
          url: ogImageUrl({
            title: page.title,
            subtitle: `${page.featuredMilestoneIds.length} linked milestones`,
            type: "history",
          }),
          width: 1200,
          height: 630,
          alt: `${page.title} — AI Timeline`,
        },
      ],
    },
  };
}

export default function HistoryDetailPage({ params }: Props) {
  const page = getEditorialPageBySlug(params.slug);
  if (!page) notFound();

  const featuredMilestones = getEditorialPageMilestones(page);

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            editorialPageJsonLd({
              title: page.title,
              description: page.description,
              path: page.canonicalPath,
              keywords: page.relatedTags,
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            itemListJsonLd(
              `${page.title} chronology`,
              `Featured milestones for ${page.title}.`,
              featuredMilestones.map((milestone) => ({
                name: `${milestone.title} (${milestone.year})`,
                url: `https://aitimeline.world/timeline/${milestone.id}`,
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
              { name: "AI Timeline", url: "https://aitimeline.world" },
              { name: "History", url: "https://aitimeline.world/history" },
              {
                name: page.title,
                url: `https://aitimeline.world${page.canonicalPath}`,
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
        <Link href="/history" className="hover:text-primary-light">
          History
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text)]">{page.title}</span>
      </nav>

      <article>
        <header className="mb-12">
          <p className="text-xs font-mono uppercase tracking-[0.32em] text-[#22d3ee] mb-4">
            Editorial Guide
          </p>
          <h1 className="text-4xl md:text-5xl font-bold">{page.title}</h1>
          <p className="text-xl text-[var(--color-text-muted)] mt-4 max-w-3xl leading-relaxed">
            {page.intro}
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-3 mb-14">
          <div className="rounded-2xl border border-white/10 bg-[#0f172a]/50 p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-[#64748b] mb-2">
              Summary
            </p>
            <p className="text-sm text-[#cbd5e1] leading-relaxed">
              {page.description}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#0f172a]/50 p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-[#64748b] mb-2">
              Timeline span
            </p>
            <p className="text-sm text-[#cbd5e1] leading-relaxed">
              {featuredMilestones[0]?.year} to{" "}
              {featuredMilestones[featuredMilestones.length - 1]?.year} across{" "}
              {featuredMilestones.length} featured milestones.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#0f172a]/50 p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-[#64748b] mb-2">
              Explore next
            </p>
            <p className="text-sm text-[#cbd5e1] leading-relaxed">
              Jump into related tags, entity pages, and the full chronology below.
            </p>
          </div>
        </section>

        <section className="space-y-8 mb-16">
          {page.sections.map((section) => (
            <div
              key={section.heading}
              className="rounded-2xl border border-white/10 bg-[#0f172a]/45 p-6"
            >
              <h2 className="text-2xl font-semibold mb-4">{section.heading}</h2>
              <div className="space-y-4">
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-[var(--color-text-muted)] leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              {section.links && section.links.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-5">
                  {section.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="text-sm px-3 py-1.5 rounded-full border border-white/10 text-[#cbd5e1] hover:border-[#818cf8]/40 hover:text-[#f8fafc] transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>

        <section className="mb-16">
          <div className="flex flex-col gap-2 mb-6">
            <h2 className="text-2xl font-bold">Milestone chronology</h2>
            <p className="text-[var(--color-text-muted)]">
              The essential timeline behind this guide, ordered chronologically.
            </p>
          </div>
          <div className="space-y-4">
            {featuredMilestones.map((milestone, index) => {
              const era = getEraById(milestone.era);

              return (
                <MilestoneListCard
                  key={milestone.id}
                  milestone={milestone}
                  eraColor={era?.color ?? "#6366f1"}
                  index={index}
                  showYear={true}
                  showCategory={true}
                  showEraName={era?.name}
                />
              );
            })}
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2 mb-16">
          <div className="rounded-2xl border border-white/10 bg-[#0f172a]/45 p-6">
            <h2 className="text-xl font-semibold mb-4">Related topics</h2>
            <div className="flex flex-wrap gap-2">
              {page.relatedTags.map((tag) => (
                <a
                  key={tag}
                  href={`/tag/${tag}`}
                  className="text-sm px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#cbd5e1] hover:border-[#22d3ee]/40 hover:text-[#f8fafc] transition-colors"
                >
                  {tagLabel(tag)}
                </a>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#0f172a]/45 p-6">
            <h2 className="text-xl font-semibold mb-4">Related entities</h2>
            <div className="flex flex-wrap gap-2">
              {page.relatedEntities.map((entity) => (
                <a
                  key={`${entity.type}-${entity.slug}`}
                  href={getEntityHref(entity.type, entity.slug)}
                  className="text-sm px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#cbd5e1] hover:border-[#818cf8]/40 hover:text-[#f8fafc] transition-colors"
                >
                  {entity.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      </article>

      <section className="pt-12 border-t border-white/10">
        <NewsletterSignup
          source={`history-${page.slug}`}
          title="Get the next major AI milestone in your inbox"
          description="Short updates when new milestones or evergreen explainers are added to AI Timeline."
          benefitCopy="Good for staying current without losing the long-term historical thread."
          buttonLabel="Subscribe"
        />
      </section>
    </main>
  );
}
