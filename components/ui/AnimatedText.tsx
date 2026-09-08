"use client";

import { motion } from "framer-motion";
import { staggerContainer, riseItem } from "@/lib/motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  /** Tag to render the wrapper as. */
  as?: "h1" | "h2" | "h3" | "p" | "span";
  stagger?: number;
  delay?: number;
  /** Run once on enter (default) or every time it enters viewport. */
  once?: boolean;
}

/**
 * Splits a string into words wrapped in clip masks that rise up in a stagger
 * when scrolled into view. Each word sits in an overflow-hidden line box so
 * the rise reads as a clean reveal. Honours reduced motion via the global CSS
 * rule which collapses transition/animation durations to ~0.
 */
export function AnimatedText({
  text,
  className,
  as = "span",
  stagger = 0.05,
  delay = 0,
  once = true,
}: AnimatedTextProps) {
  const Tag = motion[as];
  const words = text.split(" ");

  return (
    <Tag
      className={className}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          // Padding enlarges the clip box so ascenders/descenders aren't cut
          // by the tight line-height; the negative margins keep layout tight.
          style={{
            marginRight: i < words.length - 1 ? "0.26em" : 0,
            paddingTop: "0.12em",
            paddingBottom: "0.22em",
            marginTop: "-0.12em",
            marginBottom: "-0.22em",
          }}
          aria-hidden
        >
          <motion.span variants={riseItem} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
