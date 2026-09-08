"use client";

import { motion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";

/**
 * App-Router templates re-mount on every navigation, so this gives each page a
 * fresh content enter animation (a soft lift + fade) that plays underneath the
 * PageTransition wipe revealing it.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  );
}
