"use client";

import { AppImage } from "@/components/ui/AppImage";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { TESTIMONIALS } from "@/lib/content";
import { SliderControls } from "@/components/ui/SliderControls";
import { GiantNumeral } from "@/components/ui/GiantNumeral";
import { EASE_OUT_EXPO } from "@/lib/motion";

export function TestimonialCarousel() {
  const [[index], setState] = useState<[number, number]>([0, 0]);
  const t = TESTIMONIALS[index];
  const paginate = (d: number) =>
    setState(([i]) => [
      (i + d + TESTIMONIALS.length) % TESTIMONIALS.length,
      d,
    ]);

  return (
    <section className="relative overflow-hidden bg-ink">
      <GiantNumeral
        value="“"
        tone="light"
        className="absolute left-0 top-1/2 hidden -translate-y-1/2 lg:block"
      />
      <div className="mx-auto max-w-shell px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center lg:gap-16">
          {/* Avatar stage — every portrait stays mounted, so switching is an
              instant crossfade rather than a fresh request and a fade-in. */}
          <div className="relative mx-auto aspect-square w-56 sm:w-72 lg:mx-0 lg:w-full lg:max-w-sm">
            {TESTIMONIALS.map((item, i) => {
              const active = i === index;
              return (
                <motion.div
                  key={item.name}
                  initial={false}
                  animate={{
                    opacity: active ? 1 : 0,
                    scale: active ? 1 : 0.94,
                    rotate: active ? 0 : i < index ? -4 : 4,
                  }}
                  transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                  aria-hidden={!active}
                  className={`absolute inset-0 overflow-hidden bg-ink/5 ${active ? "z-10" : "pointer-events-none z-0"}`}
                >
                  <AppImage
                    src={item.avatar}
                    alt={item.name}
                    fill
                    loading="eager"
                    quality={85}
                    sizes="(max-width: 1024px) 20rem, 26rem"
                    className="object-cover"
                  />
                  <span className="absolute inset-x-0 bottom-0 h-1.5 bg-sage" />
                </motion.div>
              );
            })}
            <span className="absolute -right-3 -top-3 z-20 grid h-14 w-14 place-items-center bg-sage font-display text-xl font-extrabold text-ink">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Quote */}
          <div>
            <div className="mb-7 flex items-center gap-4">
              <span className="h-[3px] w-12 bg-white/70" />
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-white/80">
                What partners say
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
              >
                <p className="font-display text-2xl font-bold leading-snug tracking-tight text-white sm:text-3xl lg:text-[2.5rem] lg:leading-[1.1]">
                  “{t.quote}”
                </p>
                <footer className="mt-8">
                  <p className="font-display text-lg font-bold text-white">
                    {t.name}
                  </p>
                  <p className="text-sm uppercase tracking-[0.16em] text-white/70">
                    {t.role}
                  </p>
                </footer>
              </motion.blockquote>
            </AnimatePresence>

            <div className="mt-10">
              <SliderControls
                onPrev={() => paginate(-1)}
                onNext={() => paginate(1)}
                index={index}
                total={TESTIMONIALS.length}
                tone="light"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
