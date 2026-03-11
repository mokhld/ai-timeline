"use client";

import { eras } from "@/data/timeline";
import HeroScene from "./HeroScene";
import TimelineNavigator from "./TimelineNavigator";
import EraSection from "./EraSection";
import Footer from "./Footer";
import NewsletterSignup from "./NewsletterSignup";

export default function ImmersiveTimeline() {
  return (
    <>
      <HeroScene />
      <div className="py-16 px-4 bg-gradient-to-b from-transparent to-[#0f172a]/30">
        <NewsletterSignup />
      </div>
      <TimelineNavigator />
      {eras.map((era, index) => (
        <EraSection key={era.id} era={era} eraIndex={index} />
      ))}
      <Footer />
      <NewsletterSignup variant="sticky" />
    </>
  );
}
