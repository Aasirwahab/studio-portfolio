"use client";

import NextImage, { type ImageProps } from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

/** Default encoder quality — the Lummi loader caps this; see lib/lummi-loader.ts. */
export const IMAGE_QUALITY = 82;

/** Above-the-fold hero photography. */
export const HERO_IMAGE_QUALITY = 85;

/**
 * Sizes hint for the hero's left panel: full width on small screens, then the
 * 38% column it actually occupies.
 */
export const HERO_IMAGE_SIZES = "(max-width: 1024px) 100vw, 40vw";

type Visibility = "pending" | "instant" | "fade";

/**
 * Project-wide wrapper around next/image.
 *
 * An image that is already in the browser cache when it mounts is shown at
 * once, with no transition — decided in a layout effect, before the first
 * paint, so nothing flickers. Only an image whose bytes arrive *after* mount
 * fades up, over whatever tint its container carries. Fading everything, as
 * this did before, made even cached images look slow.
 */
export function AppImage({
  quality = IMAGE_QUALITY,
  className = "",
  onLoad,
  ...props
}: ImageProps) {
  const ref = useRef<HTMLImageElement>(null);
  const [vis, setVis] = useState<Visibility>("pending");

  useLayoutEffect(() => {
    const el = ref.current;
    if (el?.complete && el.naturalWidth > 0) setVis("instant");
  }, []);

  const transition =
    vis === "fade"
      ? "transition-[opacity,transform] duration-400 ease-out-expo"
      : "transition-transform duration-700 ease-out-expo";

  return (
    <NextImage
      ref={ref}
      quality={quality}
      onLoad={(e) => {
        setVis((v) => (v === "instant" ? v : "fade"));
        onLoad?.(e);
      }}
      className={`${transition} ${vis === "pending" ? "opacity-0" : "opacity-100"} ${className}`}
      {...props}
    />
  );
}

export default AppImage;
