import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteWall } from "@/components/sections/QuoteWall";
import { ResultsBand } from "@/components/sections/ResultsBand";
import { PressStrip } from "@/components/sections/PressStrip";
import { ClientIndex } from "@/components/sections/ClientIndex";
import { CTABanner } from "@/components/sections/CTABanner";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Voices — Atelier Nord",
  description:
    "What founders, brand leads and the press say about launching with Atelier Nord — with the numbers behind the quotes.",
};

export default function TestimonialPage() {
  return (
    <>
      <PageHero
        eyebrow="Voices"
        title="In our clients' words"
        intro="The founders, directors and brands who trusted us to shape how they show up — and what happened next."
        image={IMAGES.pageVoices}
        imageAlt="On set with the Atelier Nord team"
        numeral="03"
      />
      <QuoteWall />
      <ResultsBand />
      <PressStrip />
      <ClientIndex />
      <CTABanner />
    </>
  );
}
