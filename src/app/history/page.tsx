import type { Metadata } from "next";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import NewsletterSignup from "@/components/NewsletterSignup";
import { getAllEditorialPages } from "@/data/editorial-pages";
import {
  breadcrumbJsonLd,
  collectionPageJsonLd,
  itemListJsonLd,
  ogImageUrl,
} from "@/lib/structured-data";

const editorialPages = getAllEditorialPages();

export const metadata: Metadata = {
  title: "AI History Guides — Curated Editorial Pages",
  description:
    "Read curated AI history guides that connect major milestones into evergreen narratives across labs, paradigms, and turning points.",
  alternates: {
    canonical: "/history",
  },
  openGraph: {
    title: "AI History Guides — Curated Editorial Pages",
    description:
      "Evergreen AI history guides covering OpenAI, AI agents, and the milestones that changed the field.",
    images: [
      {
        url: ogImageUrl({
          title: "AI History Guides",
          subtitle: `${editorialPages.length} curated editorial pages`,
          type: "history",
        }),
        width: 1200,
        height: 630,
        alt: "AI History Guides — AI Timeline",
      },
    ],
  },
};

export default function HistoryHubPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            collectionPageJsonLd({
              name: "AI History Guides",
              description:
                "Curated editorial pages that connect major AI milestones into evergreen histories.",
              path: "/history",
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            itemListJsonLd(
              "AI History Guides",
              "Curated editorial pages that connect major AI milestones into evergreen histories.",
              editorialPages.map((page) => ({
                name: page.title,
                url: `https://aitimeline.world${page.canonicalPath}`,
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
        <span className="text-[var(--color-text)]">History</span>
      </nav>

      <header className="mb-12">
        <p className="text-xs font-mono uppercase tracking-[0.32em] text-[#22d3ee] mb-4">
          Editorial Guides
        </p>
        <h1 className="text-4xl md:text-5xl font-bold">AI History Guides</h1>
        <p className="text-xl text-[var(--color-text-muted)] mt-3 max-w-3xl leading-relaxed">
          Curated evergreen pages that connect the raw timeline into bigger
          narratives, from frontier labs to the rise of agents.
        </p>
      </header>

      <section className="grid gap-5 md:grid-cols-3">
        {editorialPages.map((page) => (
          <a
            key={page.slug}
            href={page.canonicalPath}
            className="rounded-2xl border border-white/10 bg-[#0f172a]/55 p-6 hover:border-[#818cf8]/30 hover:bg-[#0f172a]/75 transition-colors"
          >
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="text-xs font-mono uppercase tracking-[0.22em] text-[#22d3ee]">
                History
              </span>
              <span className="text-xs text-[#64748b]">
                {page.featuredMilestoneIds.length} milestones
              </span>
            </div>
            <h2 className="text-xl font-semibold text-[#f8fafc] mb-3">
              {page.title}
            </h2>
            <p className="text-sm text-[#94a3b8] leading-relaxed mb-4">
              {page.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {page.relatedTags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] px-2.5 py-1 rounded-full border border-white/10 text-[#cbd5e1]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </section>

      <section className="mt-16 pt-12 border-t border-white/10">
        <NewsletterSignup
          source="history-hub"
          title="Get new AI history guides and milestone updates"
          description="A concise email when new evergreen explainers or major timeline additions go live."
          benefitCopy="Useful if you want the narrative context, not just the latest headline."
          buttonLabel="Join the list"
        />
      </section>
    </main>
  );
}
