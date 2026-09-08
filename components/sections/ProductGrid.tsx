"use client";

import { LightboxImage } from "@/components/ui/LightboxImage";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { PRODUCTS, PRODUCT_CATEGORIES } from "@/lib/content";
import { EASE_OUT_EXPO } from "@/lib/motion";

/** Filterable product/solutions grid with an animated layout + shared active pill. */
export function ProductGrid() {
  const [active, setActive] =
    useState<(typeof PRODUCT_CATEGORIES)[number]>("All");

  const items =
    active === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === active);

  // The lightbox steps through whatever the filter is showing.
  const gallery = items.map((p) => ({
    src: p.image,
    alt: p.name,
    caption: `${p.name} — ${p.category} · ${p.spec}`,
  }));

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-shell px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {PRODUCT_CATEGORIES.map((cat) => {
            const isActive = cat === active;
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`relative overflow-hidden rounded-full px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.12em] transition-colors duration-300 ${
                  isActive ? "text-white" : "text-ink/70 hover:text-ink"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-green"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {!isActive && (
                  <span className="absolute inset-0 rounded-full border border-ink/15" />
                )}
                <span className="relative">{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {items.map((p) => (
              <motion.article
                key={p.name}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                className="group relative overflow-hidden bg-ink"
              >
                <div className="relative aspect-3/4 overflow-hidden">
                  <LightboxImage
                    src={p.image}
                    alt={p.name}
                    caption={`${p.name} — ${p.category} · ${p.spec}`}
                    gallery={gallery}
                    quality={100}
                    sizes="(max-width: 640px) 65vw, (max-width: 1024px) 42vw, 30vw"
                    className="object-cover group-hover:scale-110"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink via-ink/10 to-transparent" />
                  <span className="pointer-events-none absolute left-4 top-4 bg-green px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                    {p.category}
                  </span>
                  <span className="pointer-events-none absolute right-4 top-4 font-display text-sm font-bold text-white/80">
                    {p.spec}
                  </span>
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-display text-lg font-bold leading-tight text-white">
                    {p.name}
                  </h3>
                  <span className="mt-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-sage opacity-0 transition-all duration-500 group-hover:opacity-100">
                    View spec →
                  </span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
