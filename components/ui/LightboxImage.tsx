"use client";

import { useId, useRef } from "react";
import { AppImage } from "./AppImage";
import { useLightbox, type LightboxItem } from "@/context/LightboxContext";

export type GalleryEntry = Pick<LightboxItem, "src" | "alt" | "caption">;

interface LightboxImageProps {
  src: string;
  alt: string;
  caption?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  /** Fetch before scroll-in (default) so the image is in cache when its section arrives. */
  eager?: boolean;
  /** Classes applied to the inner <Image> (object-fit, hover scale, etc.). */
  className?: string;
  /**
   * The set this image belongs to. When given, the lightbox gets prev/next
   * through every entry (matched to this one by `src`).
   */
  gallery?: GalleryEntry[];
}

/**
 * A `fill` image that opens in the shared lightbox on click. Drop it into any
 * `relative overflow-hidden` box exactly where an <AppImage fill /> would go.
 * It hands the lightbox the variant already on screen, so the overlay has
 * pixels from its first frame.
 */
export function LightboxImage({
  src,
  alt,
  caption,
  sizes,
  priority,
  quality,
  eager = true,
  className = "object-cover",
  gallery,
}: LightboxImageProps) {
  const id = useId();
  const ref = useRef<HTMLButtonElement>(null);
  const { open } = useLightbox();

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => {
        const self: LightboxItem = {
          id,
          src,
          alt,
          caption,
          preview: ref.current?.querySelector("img")?.currentSrc || undefined,
        };
        if (!gallery?.length) return open(self);
        // Each entry borrows the thumbnail already on the page as its preview.
        const list = gallery.map((g) =>
          g.src === src
            ? self
            : {
                id: g.src,
                ...g,
                preview:
                  (document.querySelector(`img[src="${g.src}"], img[alt="${g.alt}"]`) as HTMLImageElement | null)
                    ?.currentSrc || undefined,
              },
        );
        open(self, list);
      }}
      aria-label={`View image: ${alt}`}
      // blush tint shows while the photo is still on its way
      className="absolute inset-0 block cursor-zoom-in overflow-hidden bg-ink/5 p-0"
    >
      <AppImage
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : eager ? "eager" : undefined}
        quality={quality}
        className={className}
      />
    </button>
  );
}
