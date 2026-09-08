"use client";

import { LightboxImage } from "@/components/ui/LightboxImage";
import { motion } from "framer-motion";
import { FEATURES } from "@/lib/content";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { clipReveal, fadeUp, EASE_OUT_EXPO } from "@/lib/motion";

/** Alternating image/text feature rows with clip-reveal imagery. */
export function FeatureRows() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-shell px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="space-y-24 lg:space-y-36">
          {FEATURES.map((f, i) => {
            const flip = i % 2 === 1;
            return (
              <div
                key={f.no}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                {/* Image */}
                <motion.div
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-10% 0px" }}
                  className={`relative aspect-4/3 overflow-hidden bg-ink/5 ${flip ? "lg:order-2" : ""}`}
                >
                  <motion.div variants={clipReveal} className="absolute inset-0">
                  <LightboxImage
                    src={f.image}
                    eager
                    alt={f.title}
                    caption={f.title}
                    quality={100}
                    sizes="(max-width: 1024px) 100vw, 52vw"
                    className="object-cover"
                  />
                  </motion.div>
                  <span className="pointer-events-none absolute left-4 top-2 select-none font-display text-7xl font-extrabold leading-none text-white/30">
                    {f.no}
                  </span>
                </motion.div>

                {/* Text */}
                <div className={flip ? "lg:order-1" : ""}>
                  <motion.div
                    variants={fadeUp(0)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="mb-5 flex items-center gap-4"
                  >
                    <span className="h-[3px] w-12 bg-green" />
                    <span className="text-xs font-semibold uppercase tracking-[0.28em] text-green-700">
                      Feature {f.no}
                    </span>
                  </motion.div>
                  <AnimatedText
                    as="h2"
                    text={f.title}
                    className="font-display text-3xl font-extrabold leading-tight tracking-tightest text-ink sm:text-4xl lg:text-5xl"
                  />
                  <motion.p
                    variants={fadeUp(20)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                    className="mt-6 max-w-md text-base leading-relaxed text-ink/70"
                  >
                    {f.body}
                  </motion.p>
                  <ul className="mt-8 flex flex-wrap gap-3">
                    {f.bullets.map((b, bi) => (
                      <motion.li
                        key={b}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + bi * 0.08, ease: EASE_OUT_EXPO }}
                        className="border border-ink/15 px-4 py-2 text-sm font-medium text-ink/70"
                      >
                        {b}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
