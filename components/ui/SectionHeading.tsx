"use client";

import { AnimatedText } from "./AnimatedText";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}

/** The recurring green-underline eyebrow + heavy headline + intro block. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const titleColor = tone === "dark" ? "text-ink" : "text-white";
  const introColor = tone === "dark" ? "text-ink/70" : "text-white/70";
  const ruleColor = tone === "dark" ? "bg-green" : "bg-sage";
  const eyebrowColor = tone === "dark" ? "text-green-700" : "text-sage";

  return (
    <div
      className={`flex flex-col gap-5 ${isCenter ? "items-center text-center" : "items-start"} ${className}`}
    >
      {eyebrow && (
        <Reveal className="flex items-center gap-4">
          <span className={`h-[3px] w-12 ${ruleColor}`} />
          <span className={`text-xs font-semibold uppercase tracking-[0.28em] ${eyebrowColor}`}>
            {eyebrow}
          </span>
        </Reveal>
      )}
      <AnimatedText
        as="h2"
        text={title}
        className={`max-w-4xl font-display text-4xl font-extrabold leading-[0.95] tracking-tightest sm:text-5xl lg:text-6xl ${titleColor}`}
      />
      {intro && (
        <Reveal delay={0.1}>
          <p
            className={`max-w-xl text-base leading-relaxed sm:text-lg ${introColor} ${isCenter ? "mx-auto" : ""}`}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
