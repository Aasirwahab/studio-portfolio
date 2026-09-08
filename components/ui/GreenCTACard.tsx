"use client";

import { motion } from "framer-motion";
import { ArrowLink } from "./ArrowLink";
import { fadeUp } from "@/lib/motion";

interface GreenCTACardProps {
  kicker: string;
  body: string;
  href?: string;
  cta?: string;
  className?: string;
}

/** Solid-green CTA block with kicker, body and a VIEW MORE arrow link. */
export function GreenCTACard({
  kicker,
  body,
  href = "/product",
  cta = "VIEW MORE",
  className = "",
}: GreenCTACardProps) {
  return (
    <motion.div
      variants={fadeUp(24)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      className={`relative flex flex-col justify-between gap-8 overflow-hidden bg-green p-8 text-white sm:p-10 ${className}`}
    >
      <span className="pointer-events-none absolute -right-8 -top-10 select-none font-display text-[8rem] font-extrabold leading-none text-white/10">
        ✦
      </span>
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-[0.16em]">
          {kicker}
        </h3>
        <p className="max-w-sm text-[15px] leading-relaxed text-white/90">
          {body}
        </p>
      </div>
      <ArrowLink href={href} tone="light">
        {cta}
      </ArrowLink>
    </motion.div>
  );
}
