import type { ImageLoaderProps } from "next/image";

/**
 * next/image loader for Lummi. Lummi's CDN resizes and re-encodes on the fly,
 * so it is handed each srcset width directly. The default optimizer would
 * proxy every request through /_next/image, re-fetching the full master each
 * time — and time out on the larger ones.
 */
export default function lummiLoader({ src, width, quality }: ImageLoaderProps): string {
  const url = new URL(src);
  url.searchParams.set("auto", "format");
  url.searchParams.set("w", String(width));
  // 82 is visually indistinguishable from 100 on photography and ~a third the bytes.
  url.searchParams.set("q", String(Math.min(quality ?? 82, 82)));
  return url.toString();
}
