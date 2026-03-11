"use client";

import { eras } from "@/data/timeline";
import HeroScene from "./HeroScene";
import TimelineNavigator from "./TimelineNavigator";
import EraSection from "./EraSection";
import Footer from "./Footer";

export default function ImmersiveTimeline() {
  return (
    <>
      <HeroScene />
      <TimelineNavigator />
      {eras.map((era) => (
        <EraSection key={era.id} era={era} />
      ))}
      <Footer />
    </>
  );
}
