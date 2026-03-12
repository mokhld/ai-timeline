export interface EntityHubCardData {
  name: string;
  summary: string;
  milestoneCount: number;
  yearRange: {
    start: number;
    end: number;
  };
  primaryEraLabel?: string;
  primaryCategoryLabel?: string;
}

export default function EntityHubCard({
  entity,
  href,
  accentColor,
}: {
  entity: EntityHubCardData;
  href: string;
  accentColor: string;
}) {
  return (
    <a
      href={href}
      className="block rounded-xl border border-white/5 bg-[#0f172a]/60 p-5 hover:border-white/15 hover:bg-[#0f172a]/80 transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div
            className="w-10 h-1 rounded-full mb-3"
            style={{ backgroundColor: accentColor }}
          />
          <h2 className="text-xl font-semibold text-[#e2e8f0]">{entity.name}</h2>
          <p className="text-sm text-[var(--color-text-muted)] mt-2">
            {entity.summary}
          </p>
        </div>
        <div className="text-right shrink-0">
          <div className="text-2xl font-bold" style={{ color: accentColor }}>
            {entity.milestoneCount}
          </div>
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
            Milestones
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <span className="text-xs px-3 py-1 rounded-full border border-white/10 text-[var(--color-text-muted)]">
          {entity.yearRange.start === entity.yearRange.end
            ? entity.yearRange.start
            : `${entity.yearRange.start}–${entity.yearRange.end}`}
        </span>
        {entity.primaryEraLabel && (
          <span className="text-xs px-3 py-1 rounded-full border border-white/10 text-[var(--color-text-muted)]">
            {entity.primaryEraLabel}
          </span>
        )}
        {entity.primaryCategoryLabel && (
          <span className="text-xs px-3 py-1 rounded-full border border-white/10 text-[var(--color-text-muted)]">
            {entity.primaryCategoryLabel}
          </span>
        )}
      </div>
    </a>
  );
}
