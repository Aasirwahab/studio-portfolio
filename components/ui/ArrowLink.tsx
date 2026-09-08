"use client";

import { motion } from "framer-motion";
import { TransitionLink } from "./TransitionLink";

interface ArrowLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** Color theme of the arrow track. */
  tone?: "dark" | "light";
}

/**
 * "VIEW MORE →" style CTA. On hover the arrow slides right and a fresh arrow
 * slides in behind it (overflow-clipped track), plus an animated underline.
 */
export function ArrowLink({
  href,
  children,
  className = "",
  tone = "dark",
}: ArrowLinkProps) {
  const color = tone === "dark" ? "text-ink" : "text-white";

  return (
    <TransitionLink
      href={href}
      className={`group inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] ${color} ${className}`}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 ease-out-expo group-hover:scale-x-100" />
      </span>
      <span className="relative h-4 w-7 overflow-hidden">
        <motion.span
          className="absolute inset-0 flex items-center"
          initial={false}
        >
          <Arrow className="transition-transform duration-500 ease-out-expo group-hover:translate-x-9" />
          <Arrow className="absolute -translate-x-9 transition-transform duration-500 ease-out-expo group-hover:translate-x-0" />
        </motion.span>
      </span>
    </TransitionLink>
  );
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="28"
      height="12"
      viewBox="0 0 28 12"
      fill="none"
      aria-hidden
    >
      <path
        d="M0 6h25M20 1l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
