"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CLIENTS } from "@/lib/content";
import { CLIENT_LOGOS } from "@/lib/logos";
import { fadeUp } from "@/lib/motion";

/** Every launch to date — each brand's mark over its category and year. */
export function ClientIndex() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-shell px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Client index" title="Brands we've launched" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/70">
            {CLIENTS.length} launches · 2022 — 2026
          </p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-3 lg:grid-cols-4">
          {CLIENTS.map((c, i) => (
            <motion.div
              key={c.name}
              variants={fadeUp(16)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-6% 0px" }}
              transition={{ delay: (i % 4) * 0.06 }}
              className="group flex min-h-[170px] flex-col justify-between bg-paper p-5 text-ink transition-colors duration-500 hover:bg-sage sm:min-h-[190px] sm:p-7"
            >
              <span
                role="img"
                aria-label={c.name}
                className="block [&>svg]:h-7 [&>svg]:w-auto [&>svg]:max-w-full sm:[&>svg]:h-8"
                dangerouslySetInnerHTML={{ __html: CLIENT_LOGOS[i % CLIENT_LOGOS.length] }}
              />
              <div className="flex items-end justify-between gap-3 text-[11px] font-semibold uppercase tracking-[0.18em]">
                <span className="text-green-700 transition-colors duration-500 group-hover:text-ink">
                  {c.category}
                </span>
                <span className="text-ink/65 transition-colors duration-500 group-hover:text-ink">
                  {c.year}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
