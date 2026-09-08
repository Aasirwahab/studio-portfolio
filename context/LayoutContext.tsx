"use client";

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";

type Theme = "light" | "dark";

/** Transition phases: idle → cover (iris opens) → reveal (iris closes). */
export type TransitionPhase = "idle" | "cover" | "reveal";

/** How long the screen stays covered, mark showing, before the iris reopens. */
const REVEAL_HOLD_MS = 320;

/** Viewport point the iris opens from and closes back to. */
export interface TransitionOrigin {
  x: number;
  y: number;
}

interface LayoutState {
  theme: Theme;
  toggleTheme: () => void;

  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  toggleMenu: () => void;

  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;

  shareOpen: boolean;
  setShareOpen: (v: boolean) => void;

  /** True whenever a route transition curtain is on screen. */
  pageTransition: boolean;

  // --- Page-transition state machine ---
  phase: TransitionPhase;
  /** Where the current transition started; null when idle. */
  origin: TransitionOrigin | null;
  /** Navigate through the iris. Pass the click point so it opens from there. */
  transitionTo: (href: string, origin?: TransitionOrigin) => void;
  /** Called by the overlay once the curtain has fully covered the screen. */
  onCovered: () => void;
  /** Called by the overlay once the curtain has fully exited. */
  onRevealed: () => void;
}

/** Compare routes ignoring a trailing slash, so "/work" matches "/work/" on static exports. */
const samePath = (a: string | null | undefined, b: string | null | undefined) =>
  !!a && !!b && (a.replace(/\/+$/, "") || "/") === (b.replace(/\/+$/, "") || "/");

const LayoutContext = createContext<LayoutState | null>(null);

export function LayoutProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [theme, setTheme] = useState<Theme>("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const [origin, setOrigin] = useState<TransitionOrigin | null>(null);

  const pendingHref = useRef<string | null>(null);

  const toggleTheme = useCallback(
    () => setTheme((t) => (t === "light" ? "dark" : "light")),
    [],
  );
  const toggleMenu = useCallback(() => setMenuOpen((m) => !m), []);

  const transitionTo = useCallback(
    (href: string, from?: TransitionOrigin) => {
      if (!href || samePath(href, pathname)) return;
      pendingHref.current = href;
      setMenuOpen(false);
      setSearchOpen(false);
      setShareOpen(false);
      // Default to the centre when there is no pointer (keyboard, programmatic).
      setOrigin(from ?? { x: window.innerWidth / 2, y: window.innerHeight / 2 });
      setPhase("cover");
    },
    [pathname],
  );

  // Once the curtain has fully covered the screen, swap the route underneath it.
  const onCovered = useCallback(() => {
    if (pendingHref.current) router.push(pendingHref.current);
  }, [router]);

  const onRevealed = useCallback(() => {
    setPhase("idle");
    setOrigin(null);
  }, []);

  // When the route actually changes to the pending target, the new page has
  // mounted behind the curtain — scroll to top, then lift the curtain.
  useEffect(() => {
    if (pendingHref.current && samePath(pathname, pendingHref.current)) {
      pendingHref.current = null;
      // Scroll reset is handled by SmoothScroll (via the Lenis instance) so it
      // doesn't fight Lenis. Once the new page has painted, hold a beat with
      // the mark on screen, then open the iris.
      let t: ReturnType<typeof setTimeout>;
      const id = requestAnimationFrame(() => {
        t = setTimeout(() => setPhase("reveal"), REVEAL_HOLD_MS);
      });
      return () => {
        cancelAnimationFrame(id);
        clearTimeout(t);
      };
    }
  }, [pathname]);

  const value = useMemo<LayoutState>(
    () => ({
      theme,
      toggleTheme,
      menuOpen,
      setMenuOpen,
      toggleMenu,
      searchOpen,
      setSearchOpen,
      shareOpen,
      setShareOpen,
      pageTransition: phase !== "idle",
      phase,
      origin,
      transitionTo,
      onCovered,
      onRevealed,
    }),
    [theme, toggleTheme, menuOpen, toggleMenu, searchOpen, shareOpen, phase, origin, transitionTo, onCovered, onRevealed],
  );

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
}

export function useLayout() {
  const ctx = useContext(LayoutContext);
  if (!ctx) throw new Error("useLayout must be used within <LayoutProvider>");
  return ctx;
}
