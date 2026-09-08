"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/** Oversized faded numeral that parallaxes as it scrolls through the viewport. */
export function GiantNumeral({
  value,
  className = "",
  tone = "light",
}: {
  value: string;
  className?: string;
  tone?: "light" | "dark";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["35%", "-35%"]);
  const color = tone === "light" ? "text-white/15" : "text-ink/6";

  return (
    <div ref={ref} className={`pointer-events-none select-none ${className}`}>
      <motion.span
        style={{ y }}
        className={`block font-display text-[9rem] font-extrabold leading-none tracking-tightest sm:text-[12rem] lg:text-[15rem] ${color}`}
      >
        {value}
      </motion.span>
    </div>
  );
}
