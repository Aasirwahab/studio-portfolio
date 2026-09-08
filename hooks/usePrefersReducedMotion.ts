"use client";

import { useEffect, useState } from "react";

/**
 * Reactive `prefers-reduced-motion` hook. Returns true when the user has
 * requested reduced motion so callers can skip / shorten animations.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
