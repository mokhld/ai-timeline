import ImmersiveTimeline from "@/components/ImmersiveTimeline";
import { websiteJsonLd, itemListJsonLd } from "@/lib/structured-data";
import { milestones, eras } from "@/data/timeline";

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
