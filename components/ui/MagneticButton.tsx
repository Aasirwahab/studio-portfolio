"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  type HTMLMotionProps,
} from "framer-motion";
import { useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  /** How far the element is pulled toward the cursor (px at edge). */
  strength?: number;
}

/**
 * A button that magnetically eases toward the cursor while hovered, then
 * springs back on leave. Falls back to a plain button under reduced motion.
 */
export function MagneticButton({
  children,
  strength = 18,
  className,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduced = usePrefersReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 250, damping: 22, mass: 0.4 });

  function handleMove(e: React.MouseEvent<HTMLButtonElement>) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set((relX / rect.width) * strength * 2);
    y.set((relY / rect.height) * strength * 2);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}
