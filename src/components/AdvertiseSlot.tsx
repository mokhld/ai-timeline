const ADVERTISE_EMAIL = "hello@astracloudlabs.space";
const ADVERTISE_MAILTO = `mailto:${ADVERTISE_EMAIL}?subject=Advertising%20on%20AI%20Timeline`;

export default function AdvertiseSlot() {
  return (
    <aside
      aria-label="Advertising"
      className="rounded-2xl border border-dashed border-white/15 bg-[#0f172a]/40 p-6 text-center"
    >
      <p className="text-xs font-mono uppercase tracking-[0.32em] text-[#f59e0b] mb-3">
        Ad spot available
      </p>
      <p className="text-sm text-[#94a3b8] leading-relaxed">
        If you want to advertise here, contact{" "}
        <a
          href={ADVERTISE_MAILTO}
          className="text-[#22d3ee] hover:text-[#67e8f9] underline underline-offset-4 transition-colors"
        >
          {ADVERTISE_EMAIL}
        </a>
      </p>
    </aside>
  );
}
