"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useLayout } from "@/context/LayoutContext";
import { EASE_OUT_EXPO } from "@/lib/motion";

const SUGGESTIONS = ["Identity", "Campaign", "Editorial", "Packaging", "Studio"];

/** Full-screen search overlay toggled from the nav search icon. */
export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useLayout();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 200);
      const onKey = (e: KeyboardEvent) =>
        e.key === "Escape" && setSearchOpen(false);
      window.addEventListener("keydown", onKey);
      return () => {
        clearTimeout(t);
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [searchOpen, setSearchOpen]);

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          className="fixed inset-0 z-110 flex flex-col bg-ink/95 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-start px-5 pt-28 sm:justify-center sm:px-6 sm:pt-0">
            <motion.label
              className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-sage"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, ease: EASE_OUT_EXPO }}
            >
              <span className="h-px w-8 bg-sage" /> Search
            </motion.label>
            <motion.input
              ref={inputRef}
              type="search"
              placeholder="What are you looking for?"
              className="w-full border-b border-white/20 bg-transparent pb-4 font-display text-2xl font-bold text-white placeholder:text-white/30 focus:border-sage focus:outline-hidden sm:pb-6 sm:text-4xl md:text-5xl"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, ease: EASE_OUT_EXPO }}
            />
            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSearchOpen(false)}
                  className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/70 transition-colors hover:border-sage hover:text-sage"
                >
                  {s}
                </button>
              ))}
            </motion.div>
          </div>
          <button
            onClick={() => setSearchOpen(false)}
            className="absolute right-4 top-4 z-10 flex items-center gap-2 px-2 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white/70 hover:text-sage sm:right-6 sm:top-6"
          >
            Close <span aria-hidden>✕</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
