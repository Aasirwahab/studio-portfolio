"use client";

import { motion } from "framer-motion";

interface SliderControlsProps {
  onPrev: () => void;
  onNext: () => void;
  /** Optional index/length for the "01 / 04" counter. */
  index?: number;
  total?: number;
  tone?: "dark" | "light";
  className?: string;
}

/** PREV / NEXT slider controls with a thin divider, mirroring the screenshot. */
export function SliderControls({
  onPrev,
  onNext,
  index,
  total,
  tone = "dark",
  className = "",
}: SliderControlsProps) {
  const color = tone === "dark" ? "text-ink" : "text-white";
  const divider = tone === "dark" ? "bg-ink/25" : "bg-white/30";

  return (
    <div className={`flex items-center gap-5 sm:gap-7 ${color} ${className}`}>
      <Control label="PREV" dir="prev" onClick={onPrev} />
      <span className={`h-8 w-px ${divider}`} />
      <Control label="NEXT" dir="next" onClick={onNext} />
      {typeof index === "number" && typeof total === "number" && (
        <span className="ml-1 whitespace-nowrap text-sm tabular-nums opacity-60">
          {String(index + 1).padStart(2, "0")}{" "}
          <span className="opacity-50">/ {String(total).padStart(2, "0")}</span>
        </span>
      )}
    </div>
  );
}

function Control({
  label,
  dir,
  onClick,
}: {
  label: string;
  dir: "prev" | "next";
  onClick: () => void;
}) {
  const isNext = dir === "next";
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="group flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em]"
    >
      {!isNext && <Chevron dir="prev" />}
      <span className="relative">
        {label}
        <span className="absolute -bottom-1 left-0 h-px w-full origin-center scale-x-0 bg-current transition-transform duration-400 ease-out-expo group-hover:scale-x-100" />
      </span>
      {isNext && <Chevron dir="next" />}
    </button>
  );
}

function Chevron({ dir }: { dir: "prev" | "next" }) {
  return (
    <motion.svg
      width="22"
      height="12"
      viewBox="0 0 22 12"
      fill="none"
      aria-hidden
      className={
        dir === "next"
          ? "transition-transform duration-400 ease-out-expo group-hover:translate-x-1.5"
          : "transition-transform duration-400 ease-out-expo group-hover:-translate-x-1.5"
      }
      style={dir === "prev" ? { transform: "scaleX(-1)" } : undefined}
    >
      <path
        d="M0 6h19M14 1l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}
