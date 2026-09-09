/**
 * Centralized video catalogue — mirrors lib/images.ts, but these are served
 * from /public rather than a CDN. Add a file to public/videos and give it an
 * entry here; nothing else needs to know the path.
 */

export const VIDEOS = {
  // Hero — the left panel's cold open (9:16, 10s, silent)
  heroColdOpen: "/videos/studio-cold-open.mp4",
} as const;
