import dynamic from "next/dynamic";
import { websiteJsonLd } from "@/lib/structured-data";

const ImmersiveTimeline = dynamic(
  () => import("@/components/ImmersiveTimeline"),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd()),
        }}
      />
      <ImmersiveTimeline />
    </main>
  );
}
