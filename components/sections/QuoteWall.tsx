"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VOICES } from "@/lib/content";
import { fadeUp } from "@/lib/motion";

/** Six client voices in a hairline grid; a card inverts to ink on hover. */
export function QuoteWall() {
  return (
    <section className="border-t border-ink/10 bg-paper">
      <div className="mx-auto max-w-shell px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <SectionHeading
          eyebrow="Client voices"
          title="What it's like to work with us"
          intro="From the founders, brand leads and creative directors on the other side of the table."
        />
        <div className="mt-14 grid gap-px overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          {VOICES.map((v, i) => (
            <motion.figure
              key={v.name}
              variants={fadeUp(24)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ delay: (i % 3) * 0.08 }}
              className="group flex min-h-[300px] flex-col justify-between bg-paper p-7 transition-colors duration-500 hover:bg-ink hover:text-white sm:p-8"
            >
              <div>
                <span aria-hidden className="block font-display text-6xl leading-[0.6] text-green transition-colors duration-500 group-hover:text-sage">
                  “
                </span>
                <blockquote className="mt-6 font-display text-xl font-semibold leading-snug tracking-tight sm:text-[1.35rem]">
                  {v.quote}
                </blockquote>
              </div>
              <figcaption className="mt-8 flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-bold">{v.name}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.16em] opacity-60">{v.role}</p>
                </div>
                <span className="shrink-0 bg-green px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition-colors duration-500 group-hover:bg-sage group-hover:text-ink">
                  {v.brand}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
