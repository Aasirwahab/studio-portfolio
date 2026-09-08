"use client";

import { motion, type Variants } from "framer-motion";
import { fadeUp } from "@/lib/motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  y?: number;
  once?: boolean;
}

/** Lightweight scroll-into-view wrapper using the shared fadeUp variant. */
export function Reveal({
  children,
  className,
  variants,
  delay = 0,
  y = 28,
  once = true,
}: RevealProps) {
  const v = variants ?? fadeUp(y);
  return (
    <motion.div
      className={className}
      variants={v}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
