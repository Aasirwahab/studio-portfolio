"use client";

import {
  AppImage,
  HERO_IMAGE_QUALITY,
  HERO_IMAGE_SIZES,
} from "@/components/ui/AppImage";
import { motion } from "framer-motion";
import { IMAGES } from "@/lib/images";
import { VIDEOS } from "@/lib/videos";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { PanelVideo } from "@/components/ui/PanelVideo";
import { PlayButton } from "@/components/ui/PlayButton";
import { SliderControls } from "@/components/ui/SliderControls";
import { EASE_OUT_EXPO } from "@/lib/motion";
import lummiLoader from "@/lib/lummi-loader";
import { useState } from "react";

/**
 * A `poster` is a plain attribute, so it never passes through next/image and
 * its loader — a bare Lummi URL would serve the full-resolution master into
 * the largest element on the page. Ask the CDN for a sized frame directly.
 */
const POSTER_WIDTH = 1080;
const posterFor = (src: string) =>
  lummiLoader({ src, width: POSTER_WIDTH, quality: HERO_IMAGE_QUALITY });

/**
 * Stagger for the hero's rising lines, matching the Framer `staggerContainer`
 * this replaced: a 0.1s lead-in, then 0.08s between each child.
 */
const RISE_DELAY = (i: number) => 0.1 + i * 0.08;

type Slide = {
  headline: string[];
  eyebrow: string;
  /** Left-panel still, and the poster frame when the slide carries a video. */
  image: string;
  alt: string;
  panel: string;
  /** Optional left-panel background video; the slide falls back to `image`. */
  video?: string;
};

const SLIDES: Slide[] = [
  {
    headline: ["Brands With", "Presence"],
    eyebrow:
      "Atelier Nord is a creative studio shaping fashion, beauty and lifestyle brands people fall for.",
    image: IMAGES.hero1,
    alt: "An editorial fashion portrait in bold colour",
    panel: IMAGES.panel1,
    video: VIDEOS.heroColdOpen,
  },
  {
    headline: ["Colour, Craft,", "Character"],
    eyebrow:
      "Every identity starts with a feeling — then we art-direct every frame to deliver exactly that.",
    image: IMAGES.hero2,
    alt: "A beauty campaign frame against a pastel backdrop",
    panel: IMAGES.panel2,
  },
  {
    headline: ["From Idea", "To Runway"],
    eyebrow:
      "Strategy, design and production under one roof — nothing outsourced, nothing lost in between.",
    image: IMAGES.hero3,
    alt: "A styled still life from a recent launch",
    panel: IMAGES.panel3,
  },
];

/**
 * The split-panel hero recreated from the north-star screenshot:
 *  • left full-bleed photo panel that wipes between slides with PREV/NEXT
 *  • right off-white floating card holding the heavy headline + green underline
 *  • a green CTA block and a video panel (faded "02" + play button) beneath
 */
export function HeroSplit() {
  // [current, previous] — the previous slide is the one wiping out.
  const [[index, prev], setSlide] = useState<[number, number | null]>([0, null]);
  const slide = SLIDES[index];
  const go = (d: number) =>
    setSlide(([i]) => [(i + d + SLIDES.length) % SLIDES.length, i]);


  return (
    <section className="relative min-h-svh w-full bg-paper pt-20 lg:pt-0">
      <div className="grid min-h-svh grid-cols-1 lg:grid-cols-[38%_1fr]">
        {/* LEFT — full-bleed photo panel that swaps with the slider */}
        <div className="relative h-[42vh] min-h-[320px] overflow-hidden bg-ink/5 lg:h-auto">
          {SLIDES.map((s, i) => {
            const state = i === index ? "active" : i === prev ? "exit" : "idle";
            return (
              <motion.div
                key={s.headline.join(" ")}
                initial={false}
                animate={state}
                variants={{
                  idle: { clipPath: "inset(0 0 0 100%)", zIndex: 0, transition: { duration: 0 } },
                  active: { clipPath: "inset(0 0 0 0%)", zIndex: 2, transition: { duration: 1, ease: EASE_OUT_EXPO } },
                  exit: { clipPath: "inset(0 100% 0 0)", zIndex: 1, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
                }}
                className="absolute inset-0 overflow-hidden"
              >
                {/* Slight overscan avoids transform-scale blur during the wipe */}
                <div className="absolute inset-[-6%]">
                  {s.video ? (
                    <PanelVideo
                      src={s.video}
                      poster={posterFor(s.image)}
                      active={i === index}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <AppImage
                      src={s.image}
                      alt={s.alt}
                      fill
                      priority={i === 0}
                      loading={i === 0 ? undefined : "eager"}
                      quality={HERO_IMAGE_QUALITY}
                      sizes={HERO_IMAGE_SIZES}
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
              </motion.div>
            );
          })}

          <div
            className="absolute bottom-7 left-7 z-10 animate-fade-up"
            style={{ animationDelay: "1s" }}
          >
            <SliderControls
              onPrev={() => go(-1)}
              onNext={() => go(1)}
              index={index}
              total={SLIDES.length}
              tone="light"
            />
          </div>
        </div>

        {/* RIGHT — content */}
        <div className="flex flex-col">
          {/* Headline card */}
          <div className="flex flex-1 flex-col justify-center px-6 pb-10 pt-12 sm:px-10 lg:px-16 lg:pt-32">
            <div key={index}>
              <h1 className="font-display text-[2.25rem] font-extrabold leading-[0.95] tracking-tightest text-ink sm:text-6xl sm:leading-[0.92] md:text-7xl lg:text-[5.5rem]">
                {slide.headline.map((line, i) => (
                  <span
                    key={line}
                    className="block overflow-hidden"
                    // Enlarge the clip box so the tight leading doesn't cut
                    // glyph tops/descenders; negative margins keep it tight.
                    style={{
                      paddingTop: "0.12em",
                      paddingBottom: "0.22em",
                      marginTop: "-0.12em",
                      marginBottom: "-0.22em",
                    }}
                  >
                    <span
                      className="block animate-rise-in"
                      style={{ animationDelay: `${RISE_DELAY(i)}s` }}
                    >
                      {line}
                    </span>
                  </span>
                ))}
              </h1>

              <div className="mt-8 flex max-w-xl items-start gap-5">
                <span
                  className="mt-3 hidden h-[3px] w-14 shrink-0 animate-rise-in bg-green sm:block"
                  style={{
                    animationDelay: `${RISE_DELAY(slide.headline.length)}s`,
                  }}
                />
                <p
                  className="animate-rise-in text-base leading-relaxed text-ink/70 sm:text-lg"
                  style={{
                    animationDelay: `${RISE_DELAY(slide.headline.length + 1)}s`,
                  }}
                >
                  {slide.eyebrow}
                </p>
              </div>
            </div>
          </div>

          {/* Lower row — green CTA + video panel */}
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <div
              className="animate-fade-up flex flex-col justify-between gap-7 bg-green px-6 py-9 text-white sm:px-10 sm:py-11"
              style={{ animationDelay: "0.9s" }}
            >
              <div className="space-y-3">
                <h2 className="text-sm font-bold uppercase tracking-[0.14em]">
                  Selected work · 2022—2026
                </h2>
                <p className="max-w-xs text-[15px] leading-relaxed text-white/90">
                  Identities, campaigns and editorial for brands across New
                  York, Paris and beyond.
                </p>
              </div>
              <ArrowLink href="/product" tone="light">
                View work
              </ArrowLink>
            </div>

            <div
              className="animate-fade-up relative min-h-[220px] overflow-hidden bg-green-700"
              style={{ animationDelay: "1s" }}
            >
              {SLIDES.map((s, i) => (
                <motion.div
                  key={s.headline.join(" ")}
                  initial={false}
                  animate={{ opacity: i === index ? 1 : 0 }}
                  transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
                  className="absolute inset-0 overflow-hidden"
                >
                  <div className="absolute inset-[-5%]">
                    <AppImage
                      src={s.panel}
                      alt=""
                      fill
                      loading="eager"
                      quality={HERO_IMAGE_QUALITY}
                      sizes="(max-width: 640px) 100vw, 32vw"
                      className="object-cover"
                    />
                  </div>
                </motion.div>
              ))}
              <div className="absolute inset-0 bg-green/55 mix-blend-multiply" />
              <span className="pointer-events-none absolute right-5 top-4 select-none font-display text-7xl font-extrabold leading-none text-white/60 sm:text-8xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="absolute inset-0 grid place-items-center">
                <PlayButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
