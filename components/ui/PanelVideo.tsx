"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { PlayButton } from "@/components/ui/PlayButton";

interface PanelVideoProps {
  src: string;
  /** Shown before the first frame decodes, and until playback starts. */
  poster: string;
  /** Only the active slide decodes frames; the rest stay paused. */
  active: boolean;
  className?: string;
}

/**
 * Background video for a hero panel. It is muted, looping and inline so mobile
 * browsers will start it without a gesture.
 *
 * Reduced motion suppresses the *autoplay*, not the video: rather than leaving
 * a still that reads as a broken image, the panel offers a play control so the
 * visitor can start it deliberately. Same principle as CountUp — the
 * preference should mean less unrequested motion, not missing content.
 */
export function PanelVideo({
  src,
  poster,
  active,
  className = "",
}: PanelVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = usePrefersReducedMotion();
  const [started, setStarted] = useState(false);

  // Reduced motion waits for the play control; everyone else starts on sight.
  const shouldPlay = active && (!reduced || started);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (shouldPlay) {
      // play() rejects when autoplay is blocked or the tab is backgrounded.
      // The poster stays up in that case, which is the fallback we want.
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [shouldPlay]);

  return (
    <>
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        // The poster carries first paint, so the video itself never blocks LCP.
        preload="metadata"
        aria-hidden
        tabIndex={-1}
        className={className}
      />
      {reduced && !started ? (
        // The overscan box this sits in is inset symmetrically, so its centre
        // is still the panel's centre. PlayButton's pulse is motion-safe, so
        // it stays still here.
        <div className="absolute inset-0 grid place-items-center">
          <PlayButton onClick={() => setStarted(true)} />
        </div>
      ) : null}
    </>
  );
}
