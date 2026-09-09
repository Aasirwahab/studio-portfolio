/**
 * Centralized video catalogue — mirrors lib/images.ts, but these are served
 * from /public rather than a CDN. Add a file to public/videos and give it an
 * entry here; nothing else needs to know the path.
 *
 * Each poster is that clip's own first frame, extracted with:
 *   ffmpeg -i <clip>.mp4 -frames:v 1 -c:v libwebp -quality 82 <clip>-poster.webp
 * so the still the browser paints before playback starts is the frame the
 * video opens on, rather than an unrelated photograph.
 */

export const VIDEOS = {
  // Hero — the left panel's cold open (9:16, 10s, silent)
  heroColdOpen: {
    src: "/videos/studio-cold-open.mp4",
    poster: "/videos/studio-cold-open-poster.webp",
  },
} as const;
