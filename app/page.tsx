import { HeroSplit } from "@/components/sections/HeroSplit";
import { IntroSplit } from "@/components/sections/IntroSplit";
import { StatsCounter } from "@/components/sections/StatsCounter";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { CTABanner } from "@/components/sections/CTABanner";

export default function HomePage() {
  return (
    <>
      <HeroSplit />
      <IntroSplit />
      <StatsCounter />
      <ServicesGrid />
      <ProcessSteps />
      <FeaturedProjects />
      <LogoMarquee />
      <TestimonialCarousel />
      <CTABanner />
    </>
  );
}
