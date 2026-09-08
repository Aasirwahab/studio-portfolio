"use client";

import { motion, type Variants } from "framer-motion";
import { useLayout } from "@/context/LayoutContext";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { LogoMark } from "./Logo";

const EASE_IN_OUT_SOFT = [0.7, 0, 0.3, 1] as const;

/** Seconds. The hold between them lives in LayoutContext (REVEAL_HOLD_MS). */
export const COVER_DURATION = 1.0;
export const REVEAL_DURATION = 0.9;

/**
 * Route-change iris, driven by the LayoutContext state machine.
 *
 *   cover  → an accent disc opens from the point you clicked until it fills
 *            the screen; the route swaps underneath once it has.
 *   reveal → the disc closes back to that same point, uncovering the new page.
 *
 * One element and two clip-path animations — nothing dropping, nothing
 * staggered — and the motion starts where your pointer is.
 */
export function PageTransition() {
  const { phase, origin, onCovered, onRevealed } = useLayout();
  const reduced = usePrefersReducedMotion();

  // Radius that reaches the farthest corner from the origin.
  const x = origin?.x ?? 0;
  const y = origin?.y ?? 0;
  const vw = typeof window === "undefined" ? 0 : window.innerWidth;
  const vh = typeof window === "undefined" ? 0 : window.innerHeight;
  const r = Math.ceil(Math.hypot(Math.max(x, vw - x), Math.max(y, vh - y))) + 8;

  const iris: Variants = {
    idle: { clipPath: `circle(0px at ${x}px ${y}px)`, transition: { duration: 0 } },
    // A soft in-out on both halves: an out-only curve here covered most of
    // the screen in the first 200ms and read as a snap.
    cover: {
      clipPath: `circle(${r}px at ${x}px ${y}px)`,
      transition: { duration: reduced ? 0.01 : COVER_DURATION, ease: EASE_IN_OUT_SOFT },
    },
    reveal: {
      clipPath: `circle(0px at ${x}px ${y}px)`,
      transition: { duration: reduced ? 0.01 : REVEAL_DURATION, ease: EASE_IN_OUT_SOFT },
    },
  };

  return (
    // Keyed on the origin: a new click point remounts the layer already
    // centred there, so the disc opens from the pointer instead of sliding in
    // from wherever the previous idle state left it.
    <motion.div
      key={`${x}-${y}`}
      data-phase={phase}
      className={`fixed inset-0 z-120 bg-green ${phase === "idle" ? "pointer-events-none" : "pointer-events-auto"}`}
      style={{ willChange: "clip-path" }}
      variants={iris}
      initial="idle"
      animate={phase}
      onAnimationComplete={(def) => {
        if (def === "cover") onCovered();
        else if (def === "reveal") onRevealed();
      }}
      aria-hidden
    >
      {/* The mark turns a quarter while the screen is covered. Centred by
          the grid, not a translate — framer writes its own transform for the
          rotation, which would drop a translate on the same element. */}
      <div className="absolute inset-0 grid place-items-center">
      <motion.div
        initial={false}
        animate={
          phase === "cover"
            ? { opacity: 1, scale: 1, rotate: 90 }
            : { opacity: 0, scale: 0.7, rotate: 0 }
        }
        transition={{
          duration: phase === "cover" ? 0.9 : 0.35,
          ease: EASE_OUT_EXPO,
          delay: phase === "cover" ? 0.25 : 0,
        }}
      >
        <LogoMark className="h-12 w-12" primary="fill-paper" secondary="fill-sage" />
      </motion.div>
      </div>
    </motion.div>
  );
}
