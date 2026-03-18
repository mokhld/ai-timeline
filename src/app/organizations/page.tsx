import type { Metadata } from "next";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import EntityHubCard from "@/components/EntityHubCard";
import { getAllOrganizationEntities } from "@/lib/entities";
import {
  breadcrumbJsonLd,
  collectionPageJsonLd,
  itemListJsonLd,
  ogImageUrl,
} from "@/lib/structured-data";

const organizations = getAllOrganizationEntities();

export const metadata: Metadata = {
  title: "Organizations in AI History — Labs, Companies & Institutions",
  description: `Explore ${organizations.length} organizations across AI Timeline, from universities and labs to frontier AI companies.`,
  alternates: {
    canonical: "/organizations",
  },
  openGraph: {
    title: "Organizations in AI History — Labs, Companies & Institutions",
    description: `Explore ${organizations.length} organizations across AI Timeline, from universities and labs to frontier AI companies.`,
    images: [
      {
        url: ogImageUrl({
          title: "Organizations in AI History",
          subtitle: `${organizations.length} labs, companies, and institutions`,
          type: "organizations",
        }),
        width: 1200,
        height: 630,
        alt: "Organizations in AI History — AI Timeline",
      },
    ],
  },
};

export default function OrganizationsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            collectionPageJsonLd({
              name: "Organizations in AI History",
              description: `${organizations.length} organizations featured across the AI Timeline.`,
              path: "/organizations",
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            itemListJsonLd(
              "Organizations in AI History",
              `${organizations.length} organizations featured across the AI Timeline.`,
              organizations.map((organization) => ({
                name: organization.name,
                url: `https://aitimeline.world/organization/${organization.slug}`,
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
              {
                name: "Organizations",
                url: "https://aitimeline.world/organizations",
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
        <span className="text-[var(--color-text)]">Organizations</span>
      </nav>

      <header className="mb-12 relative">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full pointer-events-none opacity-20 blur-3xl bg-indigo-400/30" />
        <h1 className="text-4xl md:text-5xl font-bold relative">
          Organizations in AI History
        </h1>
        <p className="text-xl text-[var(--color-text-muted)] mt-2 relative">
          {organizations.length} organizations featured across the timeline
        </p>
        <p className="text-[var(--color-text-muted)] mt-4 max-w-3xl leading-relaxed relative">
          Browse the universities, research labs, companies, and institutions
          that appear across the major milestones in AI history.
        </p>
      </header>

      <section>
        <div className="space-y-4">
          {organizations.map((organization) => (
            <EntityHubCard
              key={organization.slug}
              entity={{
                name: organization.name,
                summary: organization.summary,
                milestoneCount: organization.milestoneCount,
                yearRange: organization.yearRange,
                primaryEraLabel: organization.eras[0]?.label,
                primaryCategoryLabel: organization.categories[0]?.label,
              }}
              href={`/organization/${organization.slug}`}
              accentColor="#818cf8"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
