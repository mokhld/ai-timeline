import { milestones, eras } from "@/data/timeline";

export default function Home() {
  const landmarkMilestones = milestones.filter((m) => m.impactLevel === 5);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          <span className="text-[var(--color-primary-light)]">AI</span> World
        </h1>
        <p className="text-xl md:text-2xl text-[var(--color-text-muted)] max-w-2xl mb-8">
          The complete history of artificial intelligence — from theoretical
          origins to the agentic era.
        </p>
        <p className="text-lg text-[var(--color-text-muted)]">
          {milestones.length} milestones · {eras.length} eras · 1943–2026
        </p>
      </section>

      {/* Era Overview */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">
          The Eras of AI
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {eras.map((era) => {
            const eraCount = milestones.filter(
              (m) => m.era === era.id
            ).length;
            return (
              <div
                key={era.id}
                className="rounded-xl p-6 border border-white/10 bg-[var(--color-surface)] hover:border-[var(--color-primary)]/50 transition-colors"
              >
                <div
                  className="w-3 h-3 rounded-full mb-3"
                  style={{ backgroundColor: era.color }}
                />
                <h3 className="text-xl font-semibold mb-1">{era.name}</h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-3">
                  {era.yearStart}–{era.yearEnd} · {eraCount} milestones
                </p>
                <p className="text-sm text-[var(--color-text-muted)]">
                  {era.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Landmark Milestones */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Landmark Moments
        </h2>
        <div className="space-y-8">
          {landmarkMilestones.map((milestone) => (
            <article
              key={milestone.id}
              className="border-l-2 border-[var(--color-primary)] pl-6 py-2"
            >
              <time className="text-sm text-[var(--color-primary-light)] font-mono">
                {milestone.year}
              </time>
              <h3 className="text-xl font-semibold mt-1">{milestone.title}</h3>
              <p className="text-[var(--color-text-muted)] mt-2">
                {milestone.description}
              </p>
              <p className="text-sm text-[var(--color-text-muted)] mt-2 italic">
                {milestone.impact}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
