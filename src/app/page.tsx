import dynamic from "next/dynamic";
import { websiteJsonLd, itemListJsonLd } from "@/lib/structured-data";
import { milestones, eras } from "@/data/timeline";
import { categoryLabel } from "@/lib/timeline-utils";

const ImmersiveTimeline = dynamic(
  () => import("@/components/ImmersiveTimeline"),
  {
    ssr: false,
    loading: () => <HomeFallback />,
  }
);

/**
 * SSR-friendly fallback rendered on the server for search engine crawlers.
 * This content is visible until the client-side ImmersiveTimeline hydrates.
 * Contains the full navigation structure, era listing, and milestone links
 * that crawlers need to discover and index all pages.
 */
function HomeFallback() {
  const categories = [...new Set(milestones.map((m) => m.category))];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <header className="mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          The Complete History of Artificial Intelligence
        </h1>
        <p className="text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto">
          Explore {milestones.length} milestones across {eras.length} eras —
          from the theoretical foundations of the 1940s to the agentic AI era of
          today.
        </p>
      </header>

      {/* Era navigation for crawlers */}
      <nav aria-label="AI Eras" className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Eras of AI</h2>
        <div className="space-y-6">
          {eras.map((era) => {
            const eraMilestones = milestones.filter((m) => m.era === era.id);
            return (
              <section key={era.id}>
                <h3 className="text-lg font-semibold mb-2">
                  <a
                    href={`/era/${era.id}`}
                    className="text-primary-light hover:underline"
                  >
                    {era.name}
                  </a>
                  <span className="text-sm text-[var(--color-text-muted)] font-normal ml-2">
                    {era.yearStart}–{era.yearEnd} · {eraMilestones.length}{" "}
                    milestones
                  </span>
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-3">
                  {era.description}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {eraMilestones.slice(0, 5).map((m) => (
                    <li key={m.id}>
                      <a
                        href={`/timeline/${m.id}`}
                        className="text-xs px-3 py-1 rounded-full border border-white/10 hover:border-primary/50 transition-colors inline-block"
                      >
                        {m.title} ({m.year})
                      </a>
                    </li>
                  ))}
                  {eraMilestones.length > 5 && (
                    <li>
                      <a
                        href={`/era/${era.id}`}
                        className="text-xs px-3 py-1 rounded-full border border-white/10 text-primary-light hover:border-primary/50 transition-colors inline-block"
                      >
                        +{eraMilestones.length - 5} more
                      </a>
                    </li>
                  )}
                </ul>
              </section>
            );
          })}
        </div>
      </nav>

      {/* Category navigation for crawlers */}
      <nav aria-label="Categories" className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Browse by Category</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <a
              key={cat}
              href={`/category/${cat}`}
              className="px-4 py-2 rounded-lg border border-white/10 hover:border-primary/50 transition-colors"
            >
              {categoryLabel(cat)}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            itemListJsonLd(
              "AI Timeline — Complete Milestones",
              `${milestones.length} milestones across the history of artificial intelligence.`,
              [...milestones]
                .sort((a, b) => b.impactLevel - a.impactLevel)
                .slice(0, 50)
                .map((m) => ({
                  name: `${m.title} (${m.year})`,
                  url: `https://aitimeline.com/timeline/${m.id}`,
                }))
            )
          ),
        }}
      />
      <ImmersiveTimeline />
    </main>
  );
}
