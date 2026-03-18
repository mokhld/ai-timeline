import type { Metadata } from "next";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import EntityHubCard from "@/components/EntityHubCard";
import { getAllPeopleEntities } from "@/lib/entities";
import {
  breadcrumbJsonLd,
  collectionPageJsonLd,
  itemListJsonLd,
  ogImageUrl,
} from "@/lib/structured-data";

const people = getAllPeopleEntities();

export const metadata: Metadata = {
  title: "People in AI History — Key Figures & Milestones",
  description: `Explore ${people.length} people across AI Timeline, from early pioneers to frontier-era leaders.`,
  alternates: {
    canonical: "/people",
  },
  openGraph: {
    title: "People in AI History — Key Figures & Milestones",
    description: `Explore ${people.length} people across AI Timeline, from early pioneers to frontier-era leaders.`,
    images: [
      {
        url: ogImageUrl({
          title: "People in AI History",
          subtitle: `${people.length} notable figures across the timeline`,
          type: "people",
        }),
        width: 1200,
        height: 630,
        alt: "People in AI History — AI Timeline",
      },
    ],
  },
};

export default function PeoplePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            collectionPageJsonLd({
              name: "People in AI History",
              description: `${people.length} notable people featured across the AI Timeline.`,
              path: "/people",
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            itemListJsonLd(
              "People in AI History",
              `${people.length} notable people featured across the AI Timeline.`,
              people.map((person) => ({
                name: person.name,
                url: `https://aitimeline.world/person/${person.slug}`,
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
              { name: "People", url: "https://aitimeline.world/people" },
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
        <span className="text-[var(--color-text)]">People</span>
      </nav>

      <header className="mb-12 relative">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full pointer-events-none opacity-20 blur-3xl bg-cyan-400/30" />
        <h1 className="text-4xl md:text-5xl font-bold relative">
          People in AI History
        </h1>
        <p className="text-xl text-[var(--color-text-muted)] mt-2 relative">
          {people.length} people featured across the timeline
        </p>
        <p className="text-[var(--color-text-muted)] mt-4 max-w-3xl leading-relaxed relative">
          Browse the researchers, founders, policymakers, and cultural figures
          who shaped artificial intelligence across every era on AI Timeline.
        </p>
      </header>

      <section>
        <div className="space-y-4">
          {people.map((person) => (
            <EntityHubCard
              key={person.slug}
              entity={{
                name: person.name,
                summary: person.summary,
                milestoneCount: person.milestoneCount,
                yearRange: person.yearRange,
                primaryEraLabel: person.eras[0]?.label,
                primaryCategoryLabel: person.categories[0]?.label,
              }}
              href={`/person/${person.slug}`}
              accentColor="#22d3ee"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
