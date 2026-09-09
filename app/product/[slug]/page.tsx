import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { CaseStudyBody } from "@/components/sections/CaseStudyBody";
import { CTABanner } from "@/components/sections/CTABanner";
import { CASE_STUDIES, caseStudyBySlug, nextCaseStudy } from "@/lib/case-studies";

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudyBySlug(slug);
  if (!study) return {};
  return {
    title: `${study.name} — ${study.tag} — Atelier Nord`,
    description: study.summary,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudyBySlug(slug);
  if (!study) notFound();

  return (
    <>
      <PageHero
        eyebrow={`${study.tag} · ${study.location}`}
        title={study.name}
        intro={study.summary}
        image={study.hero}
        imageAlt={study.heroAlt}
        numeral={study.year}
      />
      <CaseStudyBody study={study} next={nextCaseStudy(study.slug)} />
      <CTABanner />
    </>
  );
}
