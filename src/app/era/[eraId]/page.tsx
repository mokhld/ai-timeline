import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { eras } from "@/data/timeline";
import { getEraById, getMilestonesByEra } from "@/lib/timeline-utils";
import { eraJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";

interface Props {
  params: { eraId: string };
}

export async function generateStaticParams() {
  return eras.map((e) => ({ eraId: e.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const era = getEraById(params.eraId);
  if (!era) return {};

  return {
    title: `${era.name} (${era.yearStart}–${era.yearEnd}) — AI History`,
    description: era.description.slice(0, 160),
    openGraph: {
      title: `${era.name} (${era.yearStart}–${era.yearEnd}) — AI History | AI World`,
      description: era.description,
    },
  };
}

export default function EraPage({ params }: Props) {
  const era = getEraById(params.eraId);
  if (!era) notFound();

  const eraMilestones = getMilestonesByEra(params.eraId);

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(eraJsonLd(era, eraMilestones.length)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "AI World", url: "https://aiworld.com" },
              { name: era.name, url: `https://aiworld.com/era/${era.id}` },
            ])
          ),
        }}
      />

      <nav className="text-sm text-[var(--color-text-muted)] mb-8 flex gap-2">
        <a href="/" className="hover:text-primary-light">
          Home
        </a>
        <span>/</span>
        <span className="text-[var(--color-text)]">{era.name}</span>
      </nav>

      <header className="mb-12">
        <div
          className="w-4 h-4 rounded-full mb-4"
          style={{ backgroundColor: era.color }}
        />
        <h1 className="text-4xl md:text-5xl font-bold">{era.name}</h1>
        <p className="text-xl text-[var(--color-text-muted)] mt-2">
          {era.yearStart}–{era.yearEnd} · {eraMilestones.length} milestones
        </p>
        <p className="text-[var(--color-text-muted)] mt-4 leading-relaxed">
          {era.description}
        </p>
      </header>

      <section>
        <h2 className="text-2xl font-bold mb-8">Milestones</h2>
        <div className="space-y-6">
          {eraMilestones.map((m) => (
            <a
              key={m.id}
              href={`/timeline/${m.id}`}
              className="block border-l-2 border-white/20 hover:border-primary pl-6 py-2 transition-colors"
            >
              <time className="text-sm text-primary-light font-mono">
                {m.year}
              </time>
              <h3 className="text-lg font-semibold mt-1">{m.title}</h3>
              <p className="text-sm text-[var(--color-text-muted)] mt-1 line-clamp-2">
                {m.description}
              </p>
              <span className="text-xs text-[var(--color-text-muted)] mt-1 inline-block">
                {"★".repeat(m.impactLevel)}{"☆".repeat(5 - m.impactLevel)}
              </span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
