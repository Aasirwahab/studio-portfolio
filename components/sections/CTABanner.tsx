"use client";

import { motion } from "framer-motion";
import { AppImage } from "@/components/ui/AppImage";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useLayout } from "@/context/LayoutContext";
import { IMAGES } from "@/lib/images";
import { COMPANY } from "@/lib/site";
import { fadeUp } from "@/lib/motion";

const DETAILS = [
  { label: "Write to us", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
  { label: "What happens next", value: "A first creative direction within two weeks" },
  { label: "The studio", value: COMPANY.address },
];

/**
 * The closing call-to-action on every page: deep cobalt, a two-tone headline,
 * a photograph on the right and a round butter button bridging the two.
 */
export function CTABanner() {
  const { transitionTo } = useLayout();

  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="mx-auto grid max-w-shell lg:grid-cols-[1.1fr_0.9fr]">
        {/* Copy */}
        <div className="flex flex-col justify-between px-5 pb-14 pt-20 sm:px-8 lg:px-12 lg:py-24">
          <motion.div
            variants={fadeUp(24)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10% 0px" }}
          >
            <div className="flex items-center gap-4">
              <span className="h-[3px] w-12 bg-sage" />
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-sage">
                New project
              </span>
            </div>
            <h2 className="mt-9 max-w-[11ch] font-display text-[2.75rem] font-extrabold leading-[0.92] tracking-tightest sm:text-6xl lg:text-7xl xl:text-[5.75rem]">
              Let&apos;s build your <span className="text-sage">next launch.</span>
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-white/70 sm:text-lg">
              Tell us about your brand and what&apos;s coming next. We read
              every note ourselves and reply with a point of view, not a
              questionnaire.
            </p>
          </motion.div>

          <motion.dl
            variants={fadeUp(16)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ delay: 0.15 }}
            className="mt-16 grid gap-8 border-t border-white/15 pt-8 sm:grid-cols-3 sm:gap-6 lg:mt-20"
          >
            {DETAILS.map((d) => (
              <div key={d.label}>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/65">
                  {d.label}
                </dt>
                <dd className="mt-2 text-sm leading-snug text-white/85">
                  {d.href ? (
                    <a
                      href={d.href}
                      className="underline decoration-sage/60 decoration-1 underline-offset-4 transition-colors hover:text-sage"
                    >
                      {d.value}
                    </a>
                  ) : (
                    d.value
                  )}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Photograph with the round button bridging into the copy column */}
        <div className="relative min-h-[380px] sm:min-h-[460px] lg:min-h-0">
          <AppImage
            src={IMAGES.feature2}
            alt="On set at the studio"
            fill
            loading="eager"
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover object-top"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-32 bg-linear-to-r from-ink to-transparent lg:block" />

          <MagneticButton
            strength={26}
            onClick={(e) => transitionTo("/contact", { x: e.clientX, y: e.clientY })}
            aria-label="Start a project — go to contact"
            className="group absolute bottom-6 left-5 grid h-36 w-36 place-items-center rounded-full bg-sage text-ink transition-colors duration-500 hover:bg-white sm:bottom-8 sm:left-8 sm:h-44 sm:w-44 lg:bottom-auto lg:left-0 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2"
          >
            <span className="flex flex-col items-center gap-2">
              <span className="text-[11px] font-bold uppercase leading-tight tracking-[0.18em] sm:text-xs">
                Start a<br />project
              </span>
              <span
                aria-hidden
                className="font-display text-2xl leading-none transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              >
                ↗
              </span>
            </span>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
