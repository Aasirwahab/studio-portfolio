"use client";

import { motion } from "framer-motion";
import { LightboxImage } from "@/components/ui/LightboxImage";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { IMAGES } from "@/lib/images";
import { clipReveal } from "@/lib/motion";

const POINTS = [
  "Brand, campaign & editorial under one roof",
  "80+ launches across fashion, beauty & lifestyle",
  "Led hands-on by the founding partners, start to finish",
];

/** "Who we are" split — full-bleed photo with a floating green stat tile,
 *  paired with the heading + green underline + key points. */
export function IntroSplit() {
  return (
    <section className="bg-paper">
      <div className="mx-auto grid max-w-shell items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-28">
        {/* Image with floating stat tile */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="relative aspect-5/4 overflow-hidden bg-ink/5"
        >
          {/* variants only — it takes "show" from the wrapper above, which the
              observer can actually see */}
          <motion.div variants={clipReveal} className="absolute inset-0">
          <LightboxImage
            src={IMAGES.studio}
            eager
            alt="The Atelier Nord studio interior"
            caption="Inside the Atelier Nord studio"
            quality={100}
            sizes="(max-width: 1024px) 100vw, 52vw"
            className="object-cover"
          />
          <div className="pointer-events-none absolute bottom-0 left-0 bg-green px-6 py-5 text-white sm:px-8 sm:py-6">
            <p className="font-display text-4xl font-extrabold leading-none tracking-tightest sm:text-5xl">
              12+
            </p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/85">
              Years in the studio
            </p>
          </div>
          </motion.div>
        </motion.div>

        {/* Text */}
        <div>
          <Reveal className="mb-6 flex items-center gap-4">
            <span className="h-[3px] w-12 bg-green" />
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-green-700">
              Who we are
            </span>
          </Reveal>
          <AnimatedText
            as="h2"
            text="Brands with a pulse, built to last"
            className="font-display text-4xl font-extrabold leading-[0.98] tracking-tightest text-ink sm:text-5xl lg:text-[3.5rem]"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/70 sm:text-lg">
              Atelier Nord is a New York creative studio for fashion, beauty
              and lifestyle brands. We shape identities, art-direct campaigns
              and see every launch through from first mood board to final frame.
            </p>
          </Reveal>
          <ul className="mt-8 space-y-4">
            {POINTS.map((p, i) => (
              <Reveal key={p} delay={0.15 + i * 0.08}>
                <li className="flex items-start gap-3 text-[15px] leading-relaxed text-ink/75">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-green" />
                  {p}
                </li>
              </Reveal>
            ))}
          </ul>
          <div className="mt-9">
            <ArrowLink href="/features">Inside the studio</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
