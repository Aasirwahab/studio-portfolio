"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface PanelVideoProps {
  src: string;
  /** Shown before the first frame decodes, and instead of it when reduced. */
  poster: string;
  /** Only the active slide decodes frames; the rest stay paused. */
  active: boolean;
  className?: string;
}

/**
 * Decorative background video for a hero panel. It is muted, looping and
 * inline so mobile browsers will start it without a gesture, and it holds on
 * the poster frame entirely when the visitor has asked for reduced motion.
 */
export function PanelVideo({
  src,
  poster,
  active,
  className = "",
}: PanelVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (active && !reduced) {
      // play() rejects when autoplay is blocked or the tab is backgrounded.
      // The poster stays up in that case, which is the fallback we want.
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [active, reduced]);

  return (
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
  );
}
