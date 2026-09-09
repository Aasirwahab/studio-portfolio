"use client";

import { useEffect, useRef } from "react";

interface PanelVideoProps {
  src: string;
  /** Shown until the first frame decodes. */
  poster: string;
  /** Only the active slide decodes frames; the rest stay paused. */
  active: boolean;
  className?: string;
}

/**
 * Background video for a hero panel. Muted, looping and inline so browsers
 * start it without a gesture, and paused whenever its slide is not the active
 * one so the other slides never decode frames.
 *
 * This autoplays regardless of prefers-reduced-motion: the hero is meant to
 * open on moving footage, and that was the call made for this build.
 */
export function PanelVideo({
  src,
  poster,
  active,
  className = "",
}: PanelVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (active) {
      // play() rejects when autoplay is blocked or the tab is backgrounded.
      // The poster stays up in that case, which is the fallback we want.
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [active]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      // The poster carries first paint, so the video itself never blocks LCP.
      preload="metadata"
      aria-hidden
      tabIndex={-1}
      className={className}
    />
  );
}
