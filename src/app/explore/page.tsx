import type { Metadata } from "next";
import dynamic from "next/dynamic";
import PageVisitTracker from "@/components/PageVisitTracker";
import { eras, milestones } from "@/data/timeline";
import {
  BASE_URL,
  ogImageUrl,
  breadcrumbJsonLd,
} from "@/lib/structured-data";

const ExploreGraph = dynamic(() => import("@/components/ExploreGraph"), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-full flex items-center justify-center bg-[#030712]">
      <div className="text-center space-y-3">
        <div className="w-8 h-8 border-2 border-[#6366f1] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-[#64748b]">Loading knowledge graph…</p>
      </div>
    </div>
  ),
});

export const metadata: Metadata = {
  title: "Explore the AI Knowledge Graph",
  description:
    "Visually explore how AI milestones, eras, and breakthroughs connect in an interactive knowledge graph spanning 1943 to today.",
  alternates: { canonical: `${BASE_URL}/explore` },
  openGraph: {
    title: "Explore the AI Knowledge Graph",
    description:
      "Interactive visualization of connections between AI milestones across 80+ years of artificial intelligence history.",
    url: `${BASE_URL}/explore`,
    images: [
      {
        url: ogImageUrl({
          title: "AI Knowledge Graph",
          subtitle: "Explore connections between milestones",
          type: "explore",
        }),
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore the AI Knowledge Graph",
    description:
      "Interactive visualization of connections between AI milestones.",
  },
};

export default function ExplorePage() {
  return (
    <main className="min-h-screen">
      <PageVisitTracker page="explore" />
      <div className="sr-only">
        <h1>Explore the AI Knowledge Graph</h1>
        <p>
          Search, filter, and browse AI milestones through the interactive graph
          and the keyboard-friendly milestone list.
        </p>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", url: BASE_URL },
              { name: "Explore", url: `${BASE_URL}/explore` },
            ])
          ),
        }}
      />

      <ExploreGraph />

      {/* Noscript fallback for crawlers */}
      <noscript>
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold mb-8">
            AI Knowledge Graph — Explore Connections
          </h1>
          <p className="text-[#94a3b8] mb-8">
            This interactive knowledge graph visualizes connections between{" "}
            {milestones.length} AI milestones across {eras.length} eras.
            JavaScript is required for the interactive experience.
          </p>
          <h2 className="text-xl font-bold mb-4">Browse by Era</h2>
          <ul className="space-y-2 mb-8">
            {eras.map((era) => (
              <li key={era.id}>
                <a
                  href={`/era/${era.id}`}
                  className="text-primary-light hover:underline"
                >
                  {era.name} ({era.yearStart}–{era.yearEnd})
                </a>
              </li>
            ))}
          </ul>
          <h2 className="text-xl font-bold mb-4">Key Milestones</h2>
          <ul className="space-y-1">
            {milestones
              .filter((m) => m.impactLevel >= 4)
              .map((m) => (
                <li key={m.id}>
                  <a
                    href={`/timeline/${m.id}`}
                    className="text-primary-light hover:underline"
                  >
                    {m.title} ({m.year})
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </noscript>
    </main>
  );
}
