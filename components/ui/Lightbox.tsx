"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { AppImage } from "./AppImage";
import { useLightbox } from "@/context/LightboxContext";
import { EASE_OUT_EXPO } from "@/lib/motion";

/**
 * Global lightbox overlay. Rendered once; it reads the active item from
 * LightboxContext. When the item was opened as part of a gallery, prev/next
 * buttons and the arrow keys step through it. Closes on backdrop click, the
 * ✕ button, or Escape. Locks scroll while open.
 */
export function Lightbox() {
  const { item, items, index, close, next, prev } = useLightbox();
  const many = items.length > 1;

  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (many && e.key === "ArrowRight") next();
      else if (many && e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    // Lock scroll (Lenis honours .lenis-stopped → overflow: clip)
    const html = document.documentElement;
    html.classList.add("lenis-stopped");
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      html.classList.remove("lenis-stopped");
      document.body.style.overflow = prevOverflow;
    };
  }, [item, many, close, next, prev]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-115 grid place-items-center p-4 pb-24 sm:p-8 sm:pb-8"
          initial="hidden"
          animate="show"
          exit="hidden"
        >
          {/* Backdrop */}
          <motion.div
            onClick={close}
            className="absolute inset-0 bg-black/85 backdrop-blur-xs"
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
            transition={{ duration: 0.3 }}
          />

          {/* Stage — one frame per item so stepping crossfades instead of
              swapping the source under a single element. */}
          <motion.div
            className="relative z-10 h-[72vh] w-full max-w-5xl sm:h-[80vh]"
            variants={{
              hidden: { opacity: 0, scale: 0.94, y: 14 },
              show: { opacity: 1, scale: 1, y: 0 },
            }}
            transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={item.id}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
              >
                {item.preview && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.preview}
                    alt=""
                    aria-hidden
                    className="absolute inset-0 h-full w-full object-contain drop-shadow-2xl"
                  />
                )}
                <AppImage
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="92vw"
                  className="object-contain drop-shadow-2xl"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Caption + counter */}
          <motion.div
            className="absolute bottom-5 left-0 right-0 z-10 flex flex-col items-center gap-3 px-6 text-center"
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ delay: 0.15, ease: EASE_OUT_EXPO }}
          >
            {item.caption && (
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-white/80">
                {item.caption}
              </p>
            )}
            {many && (
              <div className="flex items-center gap-5 sm:hidden">
                <NavButton dir="prev" onClick={prev} />
                <Counter index={index} total={items.length} />
                <NavButton dir="next" onClick={next} />
              </div>
            )}
            {many && (
              <span className="hidden sm:block">
                <Counter index={index} total={items.length} />
              </span>
            )}
          </motion.div>

          {/* Prev / next — at the edges on wider screens */}
          {many && (
            <>
              <motion.span
                className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 sm:block lg:left-8"
                variants={{ hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0 } }}
                transition={{ delay: 0.2 }}
              >
                <NavButton dir="prev" onClick={prev} />
              </motion.span>
              <motion.span
                className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 sm:block lg:right-8"
                variants={{ hidden: { opacity: 0, x: 8 }, show: { opacity: 1, x: 0 } }}
                transition={{ delay: 0.2 }}
              >
                <NavButton dir="next" onClick={next} />
              </motion.span>
            </>
          )}

          {/* Close */}
          <motion.button
            onClick={close}
            aria-label="Close"
            className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white transition-colors hover:border-sage hover:text-sage"
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
            transition={{ delay: 0.15 }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M2 2l12 12M14 2L2 14"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Counter({ index, total }: { index: number; total: number }) {
  return (
    <span className="text-xs font-semibold tabular-nums tracking-[0.2em] text-white/70">
      {String(index + 1).padStart(2, "0")}
      <span className="mx-1.5 text-white/40">/</span>
      {String(total).padStart(2, "0")}
    </span>
  );
}

function NavButton({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous image" : "Next image"}
      data-lightbox-nav={dir}
      className="group grid h-12 w-12 place-items-center rounded-full border border-white/30 text-white transition-colors duration-300 hover:border-sage hover:bg-sage hover:text-ink"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        aria-hidden
        className={`transition-transform duration-500 ease-out-expo ${
          dir === "prev" ? "group-hover:-translate-x-0.5" : "rotate-180 group-hover:translate-x-0.5"
        }`}
      >
        <path d="M11.5 3L5.5 9l6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
