"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface CountUpProps {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  /** Offset the start so a row of counters ticks in sequence. */
  delay?: number;
}

/** Counts up to `to` once it scrolls into view (or jumps instantly if reduced). */
export function CountUp({
  to,
  suffix = "",
  prefix = "",
  duration = 1.8,
  decimals = 0,
  delay = 0,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setValue(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      delay,
      // Quad-out, not the site's expo-out. Expo reaches 75% of the value in
      // the first 20% of the duration, so the number blurs to ~63 and then
      // crawls to 84 for the remaining 1.4s — it reads as a glitch, not a
      // count. This spends real time in the middle and still lands softly.
      ease: [0.5, 1, 0.89, 1],
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, to, duration, delay, reduced]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
