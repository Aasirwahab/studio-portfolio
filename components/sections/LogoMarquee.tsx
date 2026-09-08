"use client";

import { motion } from "framer-motion";

const PARTNERS = [
  "VOGUE",
  "DAZED",
  "ELLE",
  "WALLPAPER*",
  "KINFOLK",
  "HYPEBEAST",
];

/** Infinite logo marquee — partners scrolling horizontally. */
export function LogoMarquee() {
  const row = [...PARTNERS, ...PARTNERS];
  return (
    <section className="overflow-hidden border-y border-ink/10 bg-paper py-10">
      <motion.div
        className="flex w-max gap-16 px-8"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 24, ease: "linear", repeat: Infinity }}
      >
        {row.map((p, i) => (
          <span
            key={`${p}-${i}`}
            className="font-display text-2xl font-extrabold tracking-tight text-ink/60"
          >
            {p}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
