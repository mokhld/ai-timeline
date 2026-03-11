export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-primary-light mb-4">404</h1>
      <p className="text-xl text-[var(--color-text-muted)] mb-8">
        This page doesn&apos;t exist in the AI timeline.
      </p>
      <a
        href="/"
        className="px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors"
      >
        Back to AI Timeline
      </a>
    </main>
  );
}
