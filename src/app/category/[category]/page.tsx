import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { milestones } from "@/data/timeline";
import {
  getMilestonesByCategory,
  getAllCategories,
  categoryLabel,
} from "@/lib/timeline-utils";
import { breadcrumbJsonLd } from "@/lib/structured-data";

interface Props {
  params: { category: string };
}

export async function generateStaticParams() {
  return getAllCategories().map((c) => ({ category: c }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const label = categoryLabel(params.category);
  const count = milestones.filter((m) => m.category === params.category).length;

  return {
    title: `${label} in AI History — Timeline & Milestones`,
    description: `Explore ${count} ${label.toLowerCase()} across the history of artificial intelligence, from the 1940s to today.`,
    openGraph: {
      title: `${label} in AI History — Timeline & Milestones | AI World`,
      description: `${count} milestones in ${label.toLowerCase()} across AI history.`,
    },
  };
}

export default function CategoryPage({ params }: Props) {
  const catMilestones = getMilestonesByCategory(params.category);
  if (catMilestones.length === 0) notFound();

  const label = categoryLabel(params.category);

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "AI World", url: "https://aiworld.com" },
              {
                name: label,
                url: `https://aiworld.com/category/${params.category}`,
              },
            ])
          ),
        }}
      />

      <nav className="text-sm text-[var(--color-text-muted)] mb-8 flex gap-2">
        <a href="/" className="hover:text-primary-light">
          Home
        </a>
        <span>/</span>
        <span className="text-[var(--color-text)]">{label}</span>
      </nav>

      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">{label}</h1>
        <p className="text-xl text-[var(--color-text-muted)] mt-2">
          {catMilestones.length} milestones in AI history
        </p>
      </header>

      <section>
        <div className="space-y-6">
          {catMilestones.map((m) => (
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
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
