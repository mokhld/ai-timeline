import Link from "next/link";
import { eras } from "@/data/timeline";
import { getAllCategories, categoryLabel } from "@/lib/timeline-utils";

export default function NotFound() {
  const categories = getAllCategories();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-primary-light mb-4">404</h1>
      <p className="text-xl text-[var(--color-text-muted)] mb-8">
        This page doesn&apos;t exist in the AI timeline.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors mb-12"
      >
        Back to AI Timeline
      </Link>

      <nav aria-label="Explore" className="max-w-2xl w-full">
        <h2 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-4">
          Explore by Era
        </h2>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {eras.map((era) => (
            <Link
              key={era.id}
              href={`/era/${era.id}`}
              className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-[var(--color-text-muted)] hover:border-primary/50 hover:text-primary-light transition-colors"
            >
              {era.name}
            </Link>
          ))}
        </div>

        <h2 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-4">
          Browse by Category
        </h2>
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/category/${cat}`}
              className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-[var(--color-text-muted)] hover:border-primary/50 hover:text-primary-light transition-colors"
            >
              {categoryLabel(cat)}
            </Link>
          ))}
        </div>
      </nav>
    </main>
  );
}
