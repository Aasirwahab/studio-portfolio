"use client";

import { LightboxImage } from "@/components/ui/LightboxImage";
import { motion } from "framer-motion";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { EASE_OUT_EXPO } from "@/lib/motion";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  intro: string;
  image: string;
  imageAlt: string;
  numeral?: string;
}

/**
 * Inner-page hero reusing the split-panel system: an off-white content half
 * with the heavy headline and a full-bleed photo half carrying a faded numeral.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  numeral = "01",
}: PageHeroProps) {
  return (
    <section className="relative bg-paper pt-[72px]">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center px-5 py-14 sm:px-10 lg:px-12 lg:py-28">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45, ease: EASE_OUT_EXPO }}
            className="mb-6 flex items-center gap-4"
          >
            <span className="h-[3px] w-12 bg-green" />
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-green-700">
              {eyebrow}
            </span>
          </motion.div>
          <AnimatedText
            as="h1"
            text={title}
            delay={0.5}
            className="font-display text-5xl font-extrabold leading-[0.92] tracking-tightest text-ink sm:text-6xl lg:text-7xl"
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, ease: EASE_OUT_EXPO }}
            className="mt-8 max-w-md text-base leading-relaxed text-ink/70 sm:text-lg"
          >
            {intro}
          </motion.p>
        </div>

        <div className="relative min-h-[300px] overflow-hidden bg-ink/5 lg:min-h-[60vh]">
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)", scale: 1.12 }}
            animate={{ clipPath: "inset(0 0 0% 0)", scale: 1 }}
            transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay: 0.4 }}
            className="absolute inset-0"
          >
            <LightboxImage
              src={image}
              alt={imageAlt}
              caption={imageAlt}
              priority
              quality={100}
              sizes="(max-width: 1024px) 100vw, 55vw"
              // anchored to the top so a portrait keeps its head in frame
              className="object-cover object-top"
            />
          </motion.div>
          <span className="pointer-events-none absolute bottom-3 right-5 select-none font-display text-[8rem] font-extrabold leading-none text-white/30 sm:text-[11rem]">
            {numeral}
          </span>
        </div>
      </div>
    </section>
  );
}
