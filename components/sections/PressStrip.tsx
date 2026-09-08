"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GiantNumeral } from "@/components/ui/GiantNumeral";
import { PRESS } from "@/lib/content";

/** Three pull-quotes from print, on ink, above the publication marquee. */
export function PressStrip() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <GiantNumeral value="“" tone="light" className="absolute right-0 top-1/2 hidden -translate-y-1/2 lg:block" />
      <div className="relative mx-auto max-w-shell px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <SectionHeading eyebrow="In the press" title="Kind words, in print" tone="light" />
        <div className="mt-14 grid gap-12 lg:grid-cols-3 lg:gap-10">
          {PRESS.map((p, i) => (
            <Reveal key={p.outlet} delay={i * 0.1} className="border-t border-white/15 pt-7">
              <p className="font-display text-3xl font-extrabold tracking-tightest text-sage sm:text-4xl">
                {p.outlet}
              </p>
              <blockquote className="mt-5 font-display text-lg font-medium leading-snug text-white/90 sm:text-xl">
                “{p.quote}”
              </blockquote>
              <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">{p.meta}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
