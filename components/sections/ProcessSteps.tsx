"use client";

import { useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { AppImage } from "@/components/ui/AppImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { clipReveal, EASE_OUT_EXPO } from "@/lib/motion";
import { IMAGES } from "@/lib/images";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const STEPS = [
  {
    no: "01",
    title: "Brief",
    body: "We listen — to your brand, your customer, your season and your ambition.",
    image: IMAGES.feature3,
    alt: "The studio in conversation at the start of a project",
  },
  {
    no: "02",
    title: "Concept",
    body: "Mood, palette, type and casting studies until the idea feels unmistakably yours.",
    image: IMAGES.feature1,
    alt: "Colour and palette studies laid out on the bench",
  },
  {
    no: "03",
    title: "Design",
    body: "Identity, campaign and editorial systems resolved down to the last detail.",
    image: IMAGES.work7,
    alt: "A finished identity applied across a product shoot",
  },
  {
    no: "04",
    title: "Launch",
    body: "We run production and rollout with you, protecting the work to the final frame.",
    image: IMAGES.work8,
    alt: "The campaign out in the world on launch day",
  },
];

/**
 * The rail's route through the section, in a normalised 100×100 box that is
 * stretched to whatever height the stages end up. The path and the markers
 * share these coordinates, so they stay locked together however the rows grow.
 *
 * It weaves left and right of centre, staying inside the gutter between the
 * image column and the text column so it never runs under a photo edge-on.
 */
const NODE_Y = [12.5, 37.5, 62.5, 87.5];

/** Wide screens: a shallow weave inside the gutter between the two columns. */
const NODE_X_WIDE = [44, 56, 44, 56];
/** Narrow screens: the same route, swinging the full width of the left rail. */
const NODE_X_NARROW = [20, 80, 20, 80];

/** Threads the four stage points together with smooth S-bends. */
function railPath(x: number[]) {
  return (
    `M${x[0]},0 L${x[0]},${NODE_Y[0]} ` +
    `C${x[0]},24 ${x[1]},26 ${x[1]},${NODE_Y[1]} ` +
    `C${x[1]},49 ${x[2]},51 ${x[2]},${NODE_Y[2]} ` +
    `C${x[2]},74 ${x[3]},76 ${x[3]},${NODE_Y[3]} L${x[3]},100`
  );
}

const RAIL_PATH_WIDE = railPath(NODE_X_WIDE);
const RAIL_PATH_NARROW = railPath(NODE_X_NARROW);

const VIEWPORT = { once: true, margin: "-10% 0px" } as const;

/**
 * Reduced-motion counterpart to `clipReveal` — the same end state, reached with
 * no clip or scale animation.
 *
 * This has to stay a real variant pair rather than `undefined`. The parent sets
 * `initial="hidden"`, and `usePrefersReducedMotion` only reports true *after*
 * mount: dropping the variants on that second render left the hidden state
 * (`inset(0 0 100% 0)`) stranded as an inline style with nothing left to
 * resolve `show` against, so the photo stayed clipped to nothing forever.
 */
const clipRevealStatic: Variants = {
  hidden: { clipPath: "inset(0 0 0% 0)", scale: 1 },
  show: { clipPath: "inset(0 0 0% 0)", scale: 1, transition: { duration: 0 } },
};

/**
 * "How we work" — the four stages as a journey down the page, threaded by a
 * single flowing rail.
 *
 * The rail's progress is bound to scroll rather than fired once on entry, so
 * the reader draws it themselves: a faint track shows the whole route ahead,
 * and cobalt fills in behind them as they go. It passes *behind* the imagery,
 * so the line disappears and re-emerges between stages.
 */
export function ProcessSteps() {
  const reduced = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);

  // Bound straight to scroll: the line tracks the reader 1:1, with no spring
  // easing it along afterwards. Nothing here moves on its own, so it stays on
  // under reduced motion — unlike the stage photos and copy below, which do
  // animate autonomously and are still gated on `reduced`.
  const { scrollYProgress: drawn } = useScroll({
    target: trackRef,
    offset: ["start 0.8", "end 0.6"],
  });

  return (
    <section className="border-t border-ink/10 bg-paper">
      <div className="mx-auto max-w-shell px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <SectionHeading
          eyebrow="How we work"
          title="From mood board to launch"
          intro="A clear four-stage process that keeps every project calm, considered and on track."
        />

        <div ref={trackRef} className="relative mt-16 lg:mt-24">
          {/* ── The rail. It weaves the section's full width on desktop, and
               swings within the left gutter on narrow screens. ── */}
          <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
            {/* Narrow screens — confined to the gutter the stages indent past. */}
            <div className="absolute inset-y-0 left-0 w-10 lg:hidden">
              <Rail path={RAIL_PATH_NARROW} progress={drawn} />
              <div className="absolute inset-0 z-20">
                {STEPS.map((s, i) => (
                  <RailNode
                    key={s.no}
                    progress={drawn}
                    index={i}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${NODE_X_NARROW[i]}%`,
                      top: `${NODE_Y[i]}%`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* lg and up */}
            <div className="absolute inset-0 hidden lg:block">
              <Rail path={RAIL_PATH_WIDE} progress={drawn} />

              {/* Markers sit above the photography so the stages stay legible. */}
              <div className="absolute inset-0 z-20">
                {STEPS.map((s, i) => (
                  <RailNode
                    key={s.no}
                    progress={drawn}
                    index={i}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${NODE_X_WIDE[i]}%`,
                      top: `${NODE_Y[i]}%`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <ol className="relative z-10 space-y-16 lg:space-y-0">
            {STEPS.map((s, i) => {
              const flip = i % 2 === 1;
              return (
                <li
                  key={s.no}
                  className="relative grid items-center gap-8 pl-10 lg:min-h-[420px] lg:grid-cols-12 lg:gap-16 lg:pl-0"
                >
                  <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={VIEWPORT}
                    className={`relative aspect-4/5 overflow-hidden bg-ink/5 lg:col-span-5 ${
                      flip ? "lg:col-start-8" : "lg:col-start-1"
                    }`}
                  >
                    <motion.div
                      variants={reduced ? clipRevealStatic : clipReveal}
                      className="absolute inset-0"
                    >
                      <AppImage
                        src={s.image}
                        alt={s.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 38vw"
                        className="object-cover"
                      />
                    </motion.div>
                  </motion.div>

                  <div
                    className={`lg:col-span-4 ${
                      flip ? "lg:col-start-2 lg:row-start-1" : "lg:col-start-8"
                    }`}
                  >
                    <StepBody step={s} reduced={reduced} />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** The viewBox is square; the SVG is then stretched to whatever height it needs. */
const RAIL_VIEWBOX = 100;

/**
 * The path's length *as rendered*, in CSS pixels.
 *
 * `getTotalLength()` reports user units, but `vector-effect: non-scaling-stroke`
 * makes the stroke — and therefore its dash pattern — resolve in screen space.
 * With `preserveAspectRatio="none"` the two axes scale by different factors, so
 * neither user units nor a uniform ratio converts between them. Walking the
 * path and summing the scaled segments is the only reliable measure.
 */
function renderedLength(
  path: SVGPathElement,
  scaleX: number,
  scaleY: number,
  samples = 300,
) {
  const total = path.getTotalLength();
  let length = 0;
  let prev = path.getPointAtLength(0);

  for (let i = 1; i <= samples; i++) {
    const point = path.getPointAtLength((i / samples) * total);
    length += Math.hypot(
      (point.x - prev.x) * scaleX,
      (point.y - prev.y) * scaleY,
    );
    prev = point;
  }
  return length;
}

/**
 * The faint route ahead, plus the cobalt line the reader draws over it.
 *
 * The track is what gets measured: it always exists, so the drawn path can
 * mount already knowing its dash length instead of flashing in fully drawn.
 */
function Rail({
  path,
  progress,
}: {
  path: string;
  progress: MotionValue<number>;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const trackRef = useRef<SVGPathElement>(null);
  const [length, setLength] = useState(0);

  useLayoutEffect(() => {
    const svg = svgRef.current;
    const track = trackRef.current;
    if (!svg || !track) return;

    const measure = () => {
      const { width, height } = svg.getBoundingClientRect();
      if (!width || !height) return;
      setLength(
        renderedLength(
          track,
          width / RAIL_VIEWBOX,
          height / RAIL_VIEWBOX,
        ),
      );
    };

    measure();
    // The stages grow and shrink with the viewport, and so does the rail.
    const observer = new ResizeObserver(measure);
    observer.observe(svg);
    return () => observer.disconnect();
    // Re-measure when the route itself changes at a breakpoint.
  }, [path]);

  const dashoffset = useTransform(progress, (v) => length * (1 - v));

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 h-full w-full"
      viewBox={`0 0 ${RAIL_VIEWBOX} ${RAIL_VIEWBOX}`}
      preserveAspectRatio="none"
      fill="none"
    >
      {/* The route ahead — always fully visible. */}
      <path
        ref={trackRef}
        d={path}
        className="stroke-ink/15"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
      {/* The distance covered — drawn by the reader's scroll. */}
      {length > 0 && (
        <motion.path
          d={path}
          className="stroke-green"
          strokeWidth={1.5}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          strokeDasharray={length}
          style={{ strokeDashoffset: dashoffset }}
        />
      )}
    </svg>
  );
}

/**
 * A stage marker. It wakes up as the drawn line reaches its position, so the
 * stages light up in turn instead of all sitting there from the start.
 */
function RailNode({
  progress,
  index,
  className = "",
  style,
}: {
  progress: MotionValue<number>;
  index: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const reach = NODE_Y[index] / 100;
  const opacity = useTransform(progress, [reach - 0.08, reach + 0.02], [0.2, 1]);
  const scale = useTransform(progress, [reach - 0.08, reach + 0.02], [0.5, 1]);

  return (
    <motion.span
      aria-hidden
      className={`h-[11px] w-[11px] bg-green ring-4 ring-paper ${className}`}
      style={{ ...style, opacity, scale }}
    />
  );
}

function StepBody({
  step,
  reduced,
}: {
  step: (typeof STEPS)[number];
  reduced: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{
        // Reduced motion collapses the duration rather than dropping the
        // animation props — the hook only reports `true` after mount, so
        // removing `whileInView` would strand this at its hidden state.
        duration: reduced ? 0 : 0.8,
        ease: EASE_OUT_EXPO,
      }}
    >
      <span
        aria-hidden
        className="block font-display text-6xl font-extrabold leading-none tracking-tightest text-ink/30"
      >
        {step.no}
      </span>
      <h3 className="mt-5 font-display text-3xl font-bold tracking-tightest text-ink">
        {step.title}
      </h3>
      <p className="mt-4 max-w-[34ch] text-base leading-relaxed text-ink/70">
        {step.body}
      </p>
    </motion.div>
  );
}
