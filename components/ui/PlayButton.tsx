"use client";

import { motion } from "framer-motion";

/** Pulsing video play button overlay, as seen on the hero video panel. */
export function PlayButton({
  className = "",
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      aria-label="Play video"
      className={`group relative grid h-16 w-16 place-items-center rounded-full border border-white/80 text-white backdrop-blur-xs sm:h-20 sm:w-20 ${className}`}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
    >
      <span className="pointer-events-none absolute inset-0 rounded-full border border-white/70 motion-safe:animate-pulse-ring" />
      <svg width="18" height="20" viewBox="0 0 18 20" fill="none" aria-hidden>
        <path d="M0 0l18 10L0 20V0z" fill="currentColor" />
      </svg>
    </motion.button>
  );
}
