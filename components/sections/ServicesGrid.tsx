"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SERVICES } from "@/lib/content";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { AppImage } from "@/components/ui/AppImage";
import { fadeUp } from "@/lib/motion";

export function ServicesGrid() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-shell px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="What we do"
            title="One studio, every surface"
            intro="From a single logo to a full campaign, we design and produce across brand, digital, print and film."
          />
        </div>

        <div className="mt-14 grid gap-px overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.no}
              variants={fadeUp(24)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ delay: i * 0.08 }}
              className="group relative flex min-h-[280px] flex-col overflow-hidden bg-paper p-7 transition-colors duration-500 hover:bg-green"
            >
              {/* Texture only. The photo tints the blue rather than replacing
                  it — capped at 14% so white type keeps ~5:1 contrast even
                  against a blown-out frame, with no scrim to tune per image. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-[0.14]"
              >
                <AppImage
                  src={s.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="scale-105 object-cover group-hover:scale-100"
                />
              </div>
              {/* Fixed gap under the numeral — `justify-between` here would let a
                  shorter body push the title down, misaligning it across cards. */}
              <span className="relative z-10 mb-6 font-display text-5xl font-extrabold tracking-tightest text-ink/15 transition-colors duration-500 group-hover:text-white/70">
                {s.no}
              </span>
              <div className="relative z-10">
                <h3 className="font-display text-xl font-bold text-ink transition-colors duration-500 group-hover:text-white">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70 transition-colors duration-500 group-hover:text-white/90">
                  {s.body}
                </p>
              </div>
              <div className="relative z-10 mt-auto pt-6 opacity-0 transition-all duration-500 group-hover:opacity-100">
                <ArrowLink href="/features" tone="light">
                  Explore
                </ArrowLink>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
