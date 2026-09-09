"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useAnimationFrame } from "framer-motion";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Wraps the app in Lenis smooth scroll. On route change it snaps Lenis back
 * to the top (immediately, while the transition curtain hides the swap) so
 * new pages always start at the top.
 *
 * Smoothing runs for everyone, including visitors who prefer reduced motion —
 * `respectReducedMotion: false` is required for that, because Lenis disables
 * itself on that preference by default.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const pathname = usePathname();

  // Lenis runs its own requestAnimationFrame loop by default, separate from
  // the one Framer Motion drives useScroll/useTransform on. Two loops means
  // the scroll-linked parallax in ProcessSteps and GiantNumeral can read a
  // scroll position Lenis has already moved past, so those elements judder
  // against the page. Driving Lenis from Motion's loop puts the write and
  // every read in one ordered frame. Requires autoRaf={false} below.
  useAnimationFrame((time) => {
    lenisRef.current?.lenis?.raf(time);
  });

  // Reset scroll position on navigation (covered by the page-transition curtain).
  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      autoRaf={false}
      options={{
        // Lenis smooths via EITHER lerp OR duration+easing, and duration wins
        // when both are set — the previous config passed both, so its lerp was
        // dead and the glide came from a fixed 1.2s ramp per wheel event.
        // Lerp alone is frame-rate independent and carries momentum better:
        // lower is heavier, 0.1 is the default, below ~0.06 feels seasick.
        lerp: 0.09,
        smoothWheel: true,
        wheelMultiplier: 1,
        // Let in-page anchor links glide instead of jumping.
        anchors: true,
        respectReducedMotion: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
