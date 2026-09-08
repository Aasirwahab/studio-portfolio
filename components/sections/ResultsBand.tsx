"use client";

import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RESULTS } from "@/lib/content";

/** Outcomes, each attributed to the launch that produced it. */
export function ResultsBand() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-shell px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <SectionHeading
          eyebrow="By the numbers"
          title="Launches that moved the needle"
          intro="Design is the part you see. These are the parts the founders saw afterwards."
        />
        <div className="mt-14 grid grid-cols-2 gap-y-12 lg:grid-cols-4 lg:gap-8">
          {RESULTS.map((r, i) => (
            <Reveal key={r.label} delay={i * 0.08} className="group border-l-2 border-ink/10 pl-5 transition-colors duration-500 hover:border-green sm:pl-6">
              <p className="font-display text-5xl font-extrabold tracking-tightest text-ink sm:text-6xl lg:text-7xl">
                <CountUp to={r.to} suffix={r.suffix} decimals={0} />
              </p>
              <p className="mt-4 max-w-[16ch] text-sm leading-snug text-ink/70">{r.label}</p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-green-700">
                {r.client}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
