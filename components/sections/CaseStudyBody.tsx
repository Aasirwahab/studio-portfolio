"use client";

import { LightboxImage } from "@/components/ui/LightboxImage";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowLink } from "@/components/ui/ArrowLink";
import type { CaseStudy } from "@/lib/case-studies";

/**
 * Everything below a case study's hero: the meta bar, the brief, the numbered
 * approach rows, the gallery, the outcome numbers, the client quote and the
 * hand-off to the next study.
 */
export function CaseStudyBody({
  study,
  next,
}: {
  study: CaseStudy;
  next: CaseStudy;
}) {
  return (
    <>
      {/* Meta bar */}
      <section className="border-b border-ink/10 bg-paper">
        <dl className="mx-auto grid max-w-shell grid-cols-2 gap-y-8 px-5 py-10 sm:px-8 lg:grid-cols-4 lg:px-12">
          {study.meta.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.06}>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-green-700">
                {m.label}
              </dt>
              <dd className="mt-2 max-w-[22ch] text-sm leading-snug text-ink/80">
                {m.value}
              </dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* The brief */}
      <section className="bg-paper">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
            <SectionHeading eyebrow="The brief" title={study.brief.title} />
            <div className="space-y-6">
              {study.brief.body.map((p, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p className="text-base leading-relaxed text-ink/75 sm:text-lg">
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Approach — alternating rows */}
      <section className="bg-ink">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <SectionHeading
            eyebrow="The work"
            title="What we did"
            tone="light"
          />
          <div className="mt-16 space-y-20 lg:space-y-28">
            {study.approach.map((step, i) => (
              <div
                key={step.no}
                className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
              >
                <Reveal
                  className={i % 2 === 1 ? "lg:order-2" : undefined}
                  delay={0.05}
                >
                  <div className="relative aspect-4/3 overflow-hidden bg-white/5">
                    <LightboxImage
                      src={step.image}
                      alt={step.alt}
                      caption={`${study.name} — ${step.title}`}
                      quality={90}
                      sizes="(max-width: 1024px) 100vw, 46vw"
                      className="object-cover"
                    />
                    <span className="pointer-events-none absolute bottom-1 right-4 select-none font-display text-[6rem] font-extrabold leading-none text-white/25">
                      {step.no}
                    </span>
                  </div>
                </Reveal>
                <Reveal delay={0.12}>
                  <h3 className="font-display text-3xl font-extrabold leading-[0.98] tracking-tightest text-white sm:text-4xl">
                    {step.title}
                  </h3>
                  <p className="mt-6 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
                    {step.body}
                  </p>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-paper">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <SectionHeading eyebrow="The output" title="Selected frames" />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:gap-6">
            {study.gallery.map((g, i) => (
              <Reveal key={g.src + i} delay={(i % 2) * 0.08}>
                <figure>
                  <div className="relative aspect-4/5 overflow-hidden bg-ink/5">
                    <LightboxImage
                      src={g.src}
                      alt={g.alt}
                      caption={g.caption}
                      gallery={study.gallery}
                      quality={90}
                      sizes="(max-width: 640px) 92vw, 46vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 text-xs leading-snug text-ink/55">
                    {g.caption}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Outcome */}
      <section className="bg-paper">
        <div className="mx-auto max-w-shell px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
          <SectionHeading eyebrow="The outcome" title="What happened next" />
          <div className="mt-14 grid grid-cols-2 gap-y-12 lg:grid-cols-3 lg:gap-8">
            {study.results.map((r, i) => (
              <Reveal
                key={r.label}
                delay={i * 0.08}
                className="border-l-2 border-ink/10 pl-5 transition-colors duration-500 hover:border-green sm:pl-6"
              >
                <p className="font-display text-5xl font-extrabold tracking-tightest text-ink sm:text-6xl">
                  <CountUp to={r.to} suffix={r.suffix} decimals={0} />
                </p>
                <p className="mt-4 max-w-[18ch] text-sm leading-snug text-ink/70">
                  {r.label}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <blockquote className="mt-20 border-t border-ink/10 pt-12">
              <p className="max-w-3xl font-display text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl">
                “{study.quote.text}”
              </p>
              <footer className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-green-700">
                {study.quote.name} — {study.quote.role}
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Next study */}
      <section className="border-t border-ink/10 bg-paper">
        <div className="mx-auto flex max-w-shell flex-col gap-6 px-5 py-14 sm:flex-row sm:items-end sm:justify-between sm:px-8 lg:px-12">
          <Reveal>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-green-700">
              Next project
            </span>
            <p className="mt-2 font-display text-3xl font-extrabold tracking-tightest text-ink sm:text-4xl">
              {next.name}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <ArrowLink href={`/product/${next.slug}`}>
              Read the case study
            </ArrowLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
