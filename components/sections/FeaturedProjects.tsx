"use client";

import { AppImage } from "@/components/ui/AppImage";
import { LightboxImage } from "@/components/ui/LightboxImage";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { PROJECTS } from "@/lib/content";
import { caseStudyByName } from "@/lib/case-studies";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SliderControls } from "@/components/ui/SliderControls";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { EASE_OUT_EXPO } from "@/lib/motion";

export function FeaturedProjects() {
  const [[index, prev], setState] = useState<[number, number | null]>([0, null]);
  const project = PROJECTS[index];
  const study = caseStudyByName(project.title);
  const select = (i: number) => setState(([cur]) => (i === cur ? [cur, prev] : [i, cur]));
  const go = (d: number) =>
    setState(([i]) => [(i + d + PROJECTS.length) % PROJECTS.length, i]);

  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="mx-auto max-w-shell px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <SectionHeading
          eyebrow="Selected work"
          title="Featured work"
          tone="light"
          intro="A look at recent launches — identities, campaigns and editorial designed and produced end to end."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-stretch">
          {/* Stage */}
          <div className="relative aspect-16/11 min-w-0 overflow-hidden bg-ink/20 lg:aspect-auto lg:min-h-[440px]">
            {PROJECTS.map((p, i) => {
              const state = i === index ? "active" : i === prev ? "exit" : "idle";
              return (
                <motion.div
                  key={p.no}
                  initial={false}
                  animate={state}
                  variants={{
                    idle: { clipPath: "inset(0 0 0 100%)", zIndex: 0, transition: { duration: 0 } },
                    active: { clipPath: "inset(0 0 0 0%)", zIndex: 2, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
                    exit: { clipPath: "inset(0 100% 0 0)", zIndex: 1, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
                  }}
                  className="absolute inset-0"
                >
                  <LightboxImage
                    src={p.image}
                    alt={p.title}
                    caption={`${p.title} — ${p.location}`}
                    quality={85}
                    sizes="(max-width: 1024px) 100vw, 62vw"
                    className="object-cover"
                  />
                </motion.div>
              );
            })}
            <span className="pointer-events-none absolute bottom-2 right-4 select-none font-display text-[7rem] font-extrabold leading-none text-white/25 sm:text-[9rem]">
              {project.no}
            </span>
          </div>

          {/* Details */}
          <div className="flex min-w-0 flex-col justify-between bg-paper p-7 sm:p-10 lg:p-8 xl:p-10">
            <div>
              <span className="inline-block bg-green px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                {project.tag}
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={project.no}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                >
                  <h3 className="mt-6 font-display text-3xl font-extrabold leading-tight tracking-tightest text-ink sm:text-4xl">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm uppercase tracking-[0.18em] text-ink/65">
                    {project.location}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Thumbnail picker with shared-element active marker */}
            <div className="mt-8 flex flex-wrap gap-3">
              {PROJECTS.map((p, i) => (
                <button
                  key={p.no}
                  onClick={() => select(i)}
                  aria-label={p.title}
                  className={`relative h-14 w-14 shrink-0 overflow-hidden transition-opacity duration-500 sm:h-16 sm:w-16 lg:h-13 lg:w-13 xl:h-16 xl:w-16 ${
                    i === index ? "opacity-100" : "opacity-50 hover:opacity-80"
                  }`}
                >
                  <AppImage
                    src={p.image}
                    alt=""
                    fill
                    loading="eager"
                    sizes="192px"
                    className={`object-cover ${i === index ? "scale-100" : "scale-105"}`}
                  />
                  {i === index && (
                    <motion.span
                      layoutId="project-active"
                      className="absolute inset-0 border-2 border-sage"
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
              {study ? (
                <ArrowLink href={`/product/${study.slug}`}>
                  View case study
                </ArrowLink>
              ) : (
                <ArrowLink href="/product">See all work</ArrowLink>
              )}
              <SliderControls
                onPrev={() => go(-1)}
                onNext={() => go(1)}
                index={index}
                total={PROJECTS.length}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
