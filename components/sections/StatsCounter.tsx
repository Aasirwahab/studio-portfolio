"use client";

import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";

const STATS = [
  { to: 84, suffix: "", decimals: 0, label: "Brands launched" },
  { to: 12, suffix: "+", decimals: 0, label: "Years in the studio" },
  { to: 11, suffix: "", decimals: 0, label: "Awards & features" },
  { to: 6, suffix: "", decimals: 0, label: "Countries shipped to" },
];

export function StatsCounter() {
  return (
    <section className="bg-ink text-white">
      <div className="mx-auto max-w-shell px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4 lg:gap-8">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="group">
              <div className="flex items-center gap-3">
                <span className="h-[3px] w-8 bg-sage transition-all duration-500 group-hover:w-12" />
                <span className="text-xs uppercase tracking-[0.2em] text-white/60">
                  0{i + 1}
                </span>
              </div>
              <p className="mt-5 font-display text-4xl font-extrabold tracking-tightest text-sage sm:text-5xl lg:text-6xl">
                <CountUp
                  to={s.to}
                  suffix={s.suffix}
                  decimals={s.decimals}
                />
              </p>
              <p className="mt-3 max-w-[14ch] text-sm leading-snug text-white/60">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
