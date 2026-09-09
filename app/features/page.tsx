import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { FeatureRows } from "@/components/sections/FeatureRows";
import { StudioTeam } from "@/components/sections/StudioTeam";
import { StatsCounter } from "@/components/sections/StatsCounter";
import { CTABanner } from "@/components/sections/CTABanner";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Studio — Atelier Nord",
  description:
    "How Atelier Nord works — colour-led design, hands-on art direction, and the three founding partners who run every launch from mood board to final frame.",
};

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Studio"
        title="How we work"
        intro="Every project is led by colour, craft and character — and delivered by one team that never hands you off."
        image={IMAGES.pageStudio}
        imageAlt="Inside the Atelier Nord studio"
        numeral="01"
      />
      <FeatureRows />
      <StudioTeam />
      <StatsCounter />
      <CTABanner />
    </>
  );
}
