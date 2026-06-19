import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
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
  organizationJsonLd,
  faqPageJsonLd,
  ogImageUrl,
} from "@/lib/structured-data";
import { getMilestoneFaqs, formatMilestoneDate } from "@/lib/faq";
import NewsletterSignup from "@/components/NewsletterSignup";
import MilestoneHeroImage from "@/components/MilestoneHeroImage";
import MilestoneListCard from "@/components/MilestoneListCard";
import ImpactDots from "@/components/ImpactDots";
import BackButton from "@/components/BackButton";
import PageVisitTracker from "@/components/PageVisitTracker";
import { categoryColors } from "@/lib/colors";
import { slugifyEntityName } from "@/lib/entities";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return milestones.map((m) => ({ slug: m.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const milestone = getMilestoneBySlug(params.slug);
  if (!milestone) return {};

  const description = truncateAtWord(`${milestone.description} Learn about the impact of ${milestone.title} on the history of artificial intelligence.`, 155);
  const ogImage = ogImageUrl({
    title: milestone.title,
    subtitle: `${milestone.year} · ${categoryLabel(milestone.category)}`,
    type: "milestone",
  });

  return {
    title: `${milestone.title} (${milestone.year})`,
    description,
    alternates: {
      canonical: `/timeline/${milestone.id}`,
    },
    openGraph: {
      title: `${milestone.title} (${milestone.year})`,
      description: milestone.description,
      type: "article",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${milestone.title} (${milestone.year}) — AI Timeline`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${milestone.title} (${milestone.year})`,
      description: milestone.description,
      images: [ogImage],
    },
  };
}

export default function MilestonePage({ params }: Props) {
  const milestone = getMilestoneBySlug(params.slug);
  if (!milestone) notFound();

  const era = getEraById(milestone.era);
  const related = getRelatedMilestones(milestone);
  const faqs = getMilestoneFaqs(milestone, era);

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <PageVisitTracker page="milestone" milestoneId={milestone.id} />
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
              { name: "AI Timeline", url: "https://aitimeline.world" },
              {
                name: era?.name ?? "Timeline",
                url: `https://aitimeline.world/era/${milestone.era}`,
              },
              {
                name: milestone.title,
                url: `https://aitimeline.world/timeline/${milestone.id}`,
              },
            ])
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageJsonLd(faqs)),
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
      {milestone.organizations.map((organization) => (
        <script
          key={organization}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              organizationJsonLd(organization, [
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

      <BackButton />

      <nav
        aria-label="Breadcrumb"
        className="text-sm text-[var(--color-text-muted)] mb-8 flex gap-2"
      >
        <Link href="/" className="hover:text-primary-light">
          Home
        </Link>
        <span>/</span>
        <Link
          href={`/era/${milestone.era}`}
          className="hover:text-primary-light"
        >
          {era?.name}
        </Link>
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

        <section className="rounded-xl border border-white/5 bg-[#0f172a]/40 p-5 mb-6">
          <h2 className="text-xl font-semibold mb-3">At a glance</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <div>
              <dt className="text-[#64748b] uppercase tracking-wide text-xs mb-0.5">Date</dt>
              <dd className="text-[var(--color-text)]">{formatMilestoneDate(milestone)}</dd>
            </div>
            {era && (
              <div>
                <dt className="text-[#64748b] uppercase tracking-wide text-xs mb-0.5">Era</dt>
                <dd className="text-[var(--color-text)]">
                  {era.name} ({era.yearStart}–{era.yearEnd})
                </dd>
              </div>
            )}
            <div>
              <dt className="text-[#64748b] uppercase tracking-wide text-xs mb-0.5">Category</dt>
              <dd className="text-[var(--color-text)]">{categoryLabel(milestone.category)}</dd>
            </div>
            <div>
              <dt className="text-[#64748b] uppercase tracking-wide text-xs mb-0.5">Impact</dt>
              <dd className="text-[var(--color-text)]">{milestone.impactLevel} / 5</dd>
            </div>
            {milestone.people.length > 0 && (
              <div className="sm:col-span-2">
                <dt className="text-[#64748b] uppercase tracking-wide text-xs mb-0.5">Key people</dt>
                <dd className="text-[var(--color-text)]">{milestone.people.join(", ")}</dd>
              </div>
            )}
            {milestone.organizations.length > 0 && (
              <div className="sm:col-span-2">
                <dt className="text-[#64748b] uppercase tracking-wide text-xs mb-0.5">Organizations</dt>
                <dd className="text-[var(--color-text)]">{milestone.organizations.join(", ")}</dd>
              </div>
            )}
          </dl>
        </section>

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
                  <li key={p}>
                    <a
                      href={`/person/${slugifyEntityName(p)}`}
                      className="text-sm px-3 py-1 rounded-md bg-[#1e293b] text-[#94a3b8] hover:text-cyan-300 transition-colors inline-block"
                    >
                      {p}
                    </a>
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
                  <li key={o}>
                    <a
                      href={`/organization/${slugifyEntityName(o)}`}
                      className="text-sm px-3 py-1 rounded-md bg-[#1e293b] text-[#818cf8] border border-[#818cf8]/10 hover:border-[#818cf8]/30 transition-colors inline-block"
                    >
                      {o}
                    </a>
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

      {faqs.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Frequently asked questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="rounded-xl border border-white/5 bg-[#0f172a]/40 p-5 group"
              >
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center gap-4">
                  {faq.question}
                  <span className="text-[#64748b] transition-transform group-open:rotate-45 shrink-0">
                    +
                  </span>
                </summary>
                <p className="text-[var(--color-text-muted)] leading-relaxed mt-3">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      )}

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
