import type { Variants } from "framer-motion";

type Bezier = [number, number, number, number];

export const EASE_OUT_EXPO: Bezier = [0.16, 1, 0.3, 1];
export const EASE_IN_OUT: Bezier = [0.65, 0, 0.35, 1];

/** Stagger container for word/line reveals */
export const staggerContainer = (stagger = 0.06, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

/** A single word/line rising up from a clipped mask */
export const riseItem: Variants = {
  hidden: { y: "120%" },
  show: {
    y: "0%",
    transition: { duration: 0.9, ease: EASE_OUT_EXPO },
  },
};

/** Generic fade + lift used for cards and blocks */
export const fadeUp = (y = 28, duration = 0.8): Variants => ({
  hidden: { opacity: 0, y },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: EASE_OUT_EXPO },
  },
});

/** Clip-path reveal for photos (top-down wipe) */
export const clipReveal: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)", scale: 1.12 },
  show: {
    clipPath: "inset(0 0 0% 0)",
    scale: 1,
    transition: { duration: 1.1, ease: EASE_OUT_EXPO },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};
