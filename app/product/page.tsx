import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { CTABanner } from "@/components/sections/CTABanner";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Work — Atelier Nord",
  description:
    "Selected work by Atelier Nord — identities, campaigns, editorial and packaging for fashion, beauty and lifestyle brands.",
};

export default function ProductPage() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        title="Selected work"
        intro="A filterable look at recent identities, campaigns and editorial — designed and produced end to end."
        image={IMAGES.pageWork}
        imageAlt="A frame from a recent campaign"
        numeral="02"
      />
      <ProductGrid />
      <FeaturedProjects />
      <CTABanner />
    </>
  );
}
