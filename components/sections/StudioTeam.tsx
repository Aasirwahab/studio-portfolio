"use client";

import { motion } from "framer-motion";
import { LightboxImage } from "@/components/ui/LightboxImage";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";
import { PARTNERS, STUDIO_STORY } from "@/lib/content";
import { IMAGES } from "@/lib/images";
import { clipReveal } from "@/lib/motion";

/**
 * The partners, named. A sticky studio photo and the studio's own story on the
 * left; the three partners stacked as an editorial list on the right.
 *
 * Deliberately typographic — we would rather name people and say what they own
 * than put a stock portrait behind a founder's name. Drop a real headshot in by
 * adding a `portrait` to each PARTNERS entry and rendering it in the row.
 */
export function StudioTeam() {
  return (
    <section className="bg-ink text-white">
      <div className="mx-auto max-w-shell px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          {/* Story + photo */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal className="mb-6 flex items-center gap-4">
              <span className="h-[3px] w-12 bg-sage" />
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-sage">
                {STUDIO_STORY.eyebrow}
              </span>
            </Reveal>
            <AnimatedText
              as="h2"
              text={STUDIO_STORY.title}
              className="font-display text-4xl font-extrabold leading-[0.98] tracking-tightest sm:text-5xl"
            />

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-10% 0px" }}
              className="relative mt-10 aspect-4/3 overflow-hidden bg-white/5"
            >
              <motion.div variants={clipReveal} className="absolute inset-0">
                <LightboxImage
                  src={IMAGES.feature3}
                  alt="The Atelier Nord studio floor in SoHo"
                  caption="One floor in SoHo — nine people, no account layer"
                  quality={90}
                  sizes="(max-width: 1024px) 100vw, 38vw"
                  className="object-cover"
                />
              </motion.div>
            </motion.div>

            <div className="mt-8 space-y-5">
              {STUDIO_STORY.body.map((p, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p className="max-w-md text-base leading-relaxed text-white/70">
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>

            <dl className="mt-9 space-y-4 border-t border-white/15 pt-7">
              {STUDIO_STORY.facts.map((f, i) => (
                <Reveal key={f.label} delay={0.1 + i * 0.06}>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sage">
                      {f.label}
                    </dt>
                    <dd className="text-sm text-white/80">{f.value}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>

          {/* Partners */}
          <ul className="divide-y divide-white/15 border-t border-white/15">
            {PARTNERS.map((p, i) => (
              <li key={p.name}>
                <Reveal delay={i * 0.08} className="py-10 lg:py-12">
                  <div className="flex items-baseline gap-5">
                    <span className="font-display text-2xl font-extrabold leading-none text-white/25">
                      {p.no}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-3xl font-extrabold leading-[1.02] tracking-tightest sm:text-4xl">
                        {p.name}
                      </h3>
                      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-sage">
                        {p.role}
                      </p>
                    </div>
                  </div>
                  <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 lg:pl-12">
                    {p.bio}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-3 lg:pl-12">
                    {p.leads.map((l) => (
                      <li
                        key={l}
                        className="border border-white/20 px-4 py-2 text-sm font-medium text-white/70"
                      >
                        {l}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
