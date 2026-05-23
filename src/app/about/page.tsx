import type { Metadata } from "next";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import NewsletterSignup from "@/components/NewsletterSignup";
import { milestones, eras } from "@/data/timeline";
import {
  siteOrganizationJsonLd,
  aboutPageJsonLd,
  faqPageJsonLd,
  breadcrumbJsonLd,
  ogImageUrl,
  BASE_URL,
} from "@/lib/structured-data";
import type { FaqItem } from "@/lib/faq";

const firstYear = Math.min(...milestones.map((m) => m.year));
const lastYear = Math.max(...milestones.map((m) => m.year));

const faqs: FaqItem[] = [
  {
    question: "What is AI Timeline?",
    answer: `AI Timeline is an independent, continuously updated reference documenting the history of artificial intelligence — ${milestones.length} milestones across ${eras.length} eras, from ${firstYear} to ${lastYear}. Each entry records what happened, who was involved, why it mattered, and how impactful it was.`,
  },
  {
    question: "How are milestones selected?",
    answer:
      "Milestones are chosen for their lasting effect on the field: research breakthroughs, product launches, cultural moments, regulation, infrastructure, competitions, and open-source releases that measurably changed the direction, capability, or public understanding of AI. The goal is a defensible shortlist of moments that bent the curve, not an exhaustive log of every release.",
  },
  {
    question: "What does the impact score mean?",
    answer:
      "Every milestone is rated 1–5. A 5 marks a landmark, field-defining moment (for example AlexNet, the Transformer, or ChatGPT); 4 is a major breakthrough; 3 a significant development; 2 a notable step; and 1 an early or incremental step. The score reflects how much an event shifted the trajectory of AI.",
  },
  {
    question: "How current is the timeline?",
    answer: `The timeline currently runs through ${lastYear} and is updated as significant new milestones occur. Page-level structured data carries a last-modified date so search engines and answer engines can see how fresh the content is.`,
  },
  {
    question: "Can I cite or reuse AI Timeline?",
    answer: `Yes. Facts on AI Timeline are free to cite with attribution to "AI Timeline" and a link to the relevant page (${BASE_URL}). The site is built to be machine-readable, with schema.org structured data on every page and an llms.txt index for AI answer engines.`,
  },
];

export const metadata: Metadata = {
  title: "About AI Timeline — Methodology & Sourcing",
  description:
    "How AI Timeline is built: how milestones are selected and scored, how current the data is, and how to cite the project.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About AI Timeline — Methodology & Sourcing",
    description:
      "How AI Timeline selects, scores, and sources the milestones that shaped artificial intelligence.",
    type: "website",
    images: [
      {
        url: ogImageUrl({
          title: "About AI Timeline",
          subtitle: "Methodology, sourcing & how to cite",
          type: "default",
        }),
        width: 1200,
        height: 630,
        alt: "About AI Timeline",
      },
    ],
  },
};

const impactScale = [
  { level: 5, label: "Landmark, field-defining moment" },
  { level: 4, label: "Major breakthrough" },
  { level: 3, label: "Significant development" },
  { level: 2, label: "Notable step" },
  { level: 1, label: "Early or incremental step" },
];

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(siteOrganizationJsonLd()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutPageJsonLd(faqs)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageJsonLd(faqs)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "AI Timeline", url: BASE_URL },
              { name: "About", url: `${BASE_URL}/about` },
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
        <span className="text-[var(--color-text)]">About</span>
      </nav>

      <article className="space-y-10">
        <header>
          <h1 className="text-4xl md:text-5xl font-bold">About AI Timeline</h1>
          <p className="text-xl text-[var(--color-text-muted)] mt-4 leading-relaxed">
            AI Timeline is an independent, continuously updated reference to the
            history of artificial intelligence — {milestones.length} milestones
            across {eras.length} eras, from {firstYear} to {lastYear}.
          </p>
        </header>

        <section>
          <h2 className="text-2xl font-semibold mb-3">What this is</h2>
          <p className="text-[var(--color-text-muted)] leading-relaxed">
            Every milestone page answers four questions: what happened, who was
            involved, why it mattered, and how impactful it was. Milestones are
            cross-linked by{" "}
            <Link href="/people" className="text-primary-light hover:underline">
              people
            </Link>
            ,{" "}
            <Link
              href="/organizations"
              className="text-primary-light hover:underline"
            >
              organizations
            </Link>
            , eras, categories, tags, and years, so the timeline reads as a
            connected graph rather than a flat list.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">How milestones are selected</h2>
          <p className="text-[var(--color-text-muted)] leading-relaxed">
            Inclusion is editorial and deliberately selective. A milestone earns
            a place if it measurably changed the direction, capability, or public
            understanding of AI — across research, products, culture, regulation,
            infrastructure, competitions, and open-source releases. The aim is a
            defensible shortlist of moments that bent the curve, not an
            exhaustive log of every model or paper.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">The impact scale</h2>
          <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">
            Each milestone is rated 1–5 for how much it shifted the trajectory of
            the field.
          </p>
          <dl className="space-y-2">
            {impactScale.map((item) => (
              <div key={item.level} className="flex gap-3 text-sm">
                <dt className="font-mono text-primary-light w-6 shrink-0">
                  {item.level}
                </dt>
                <dd className="text-[var(--color-text-muted)]">{item.label}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Citing and reuse</h2>
          <p className="text-[var(--color-text-muted)] leading-relaxed">
            Facts here are free to cite with attribution to “AI Timeline” and a
            link to the relevant page. The site is built to be machine-readable:
            schema.org structured data on every page, a full{" "}
            <a href="/sitemap.xml" className="text-primary-light hover:underline">
              sitemap
            </a>
            , and an{" "}
            <a href="/llms.txt" className="text-primary-light hover:underline">
              llms.txt
            </a>{" "}
            index for AI answer engines.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Frequently asked questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="rounded-xl border border-white/5 bg-[#0f172a]/40 p-5 group"
              >
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center gap-4">
                  {faq.question}
                  <span className="text-[#64748b] transition-transform group-open:rotate-45 shrink-0">
                    +
                  </span>
                </summary>
                <p className="text-[var(--color-text-muted)] leading-relaxed mt-3">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </article>

      <section className="mt-16 pt-12 border-t border-white/10">
        <NewsletterSignup source="about" />
      </section>
    </main>
  );
}
