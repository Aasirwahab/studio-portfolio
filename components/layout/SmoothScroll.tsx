"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Wraps the app in Lenis smooth scroll. Disabled entirely when the user
 * prefers reduced motion so the page falls back to native scrolling. On route
 * change it snaps Lenis back to the top (immediately, while the transition
 * curtain hides the swap) so new pages always start at the top.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (reduced) lenis?.stop();
    else lenis?.start();
  }, [reduced]);

  // Reset scroll position on navigation (covered by the page-transition curtain).
  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  if (reduced) return <>{children}</>;

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
      }}
    >
      {children}
    </ReactLenis>
  );
}
