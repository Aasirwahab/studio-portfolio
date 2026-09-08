import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

import { LayoutProvider } from "@/context/LayoutContext";
import { LightboxProvider } from "@/context/LightboxContext";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { SocialRail } from "@/components/layout/SocialRail";
import { PageTransition } from "@/components/layout/PageTransition";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { ShareModal } from "@/components/layout/ShareModal";
import { Lightbox } from "@/components/ui/Lightbox";

// A soft, high-contrast serif for the headlines — the atelier voice.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display-src",
  display: "swap",
  axes: ["opsz"],
});

// Clean geometric sans for everything else.
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body-src",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Atelier Nord — Creative Studio for Fashion & Beauty Brands",
  description:
    "Atelier Nord is a New York creative studio shaping fashion, beauty and lifestyle brands — identity, campaign and editorial from first mood board to launch.",
  metadataBase: new URL("https://ateliernord.com"),
};

export const viewport: Viewport = {
  themeColor: "#2242F5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <head>
        {/* every photo comes from here — open the connection before the first one is requested */}
        <link rel="preconnect" href="https://assets.lummi.ai" crossOrigin="" />
      </head>
      <body className="font-body antialiased">
        <LayoutProvider>
          <LightboxProvider>
            <SmoothScroll>
              <a
                href="#main"
                className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-200 focus:bg-green focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
              >
                Skip to content
              </a>
              <Nav />
              <SocialRail />
              {/* Reserve the right-edge rail's width so no content hides beneath it */}
              <div className="lg:pr-[84px]">
                <main id="main">{children}</main>
                <Footer />
              </div>
            </SmoothScroll>
            <SearchOverlay />
            <ShareModal />
            <PageTransition />
            <Lightbox />
          </LightboxProvider>
        </LayoutProvider>
      </body>
    </html>
  );
}
