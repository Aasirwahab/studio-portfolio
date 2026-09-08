/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Imagery is served straight from Lummi's CDN at each srcset width — see
    // lib/lummi-loader.ts. Nothing is proxied through /_next/image.
    loader: "custom",
    loaderFile: "./lib/lummi-loader.ts",
    // 82 is AppImage's default and the cap in the Lummi loader; 85 is the
    // hero. Next 16 enforces this list and coerces anything missing.
    qualities: [75, 80, 82, 85, 90, 95, 100],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
    imageSizes: [32, 48, 64, 96, 128, 192, 256, 384, 512],
  },
};

export default nextConfig;
