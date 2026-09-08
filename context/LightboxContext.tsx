"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface LightboxItem {
  /** Stable, unique id for the item. */
  id: string;
  src: string;
  alt: string;
  caption?: string;
  /** The already-loaded thumbnail, shown instantly while the full image arrives. */
  preview?: string;
}

interface LightboxState {
  /** The item on screen, or null when closed. */
  item: LightboxItem | null;
  /** Every item reachable with prev/next — one entry when opened alone. */
  items: LightboxItem[];
  index: number;
  /** Open one image, optionally inside a gallery it belongs to. */
  open: (item: LightboxItem, gallery?: LightboxItem[]) => void;
  close: () => void;
  next: () => void;
  prev: () => void;
}

const LightboxContext = createContext<LightboxState | null>(null);

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<LightboxItem[]>([]);
  const [index, setIndex] = useState(0);

  const open = useCallback((item: LightboxItem, gallery?: LightboxItem[]) => {
    const list = gallery && gallery.length ? gallery : [item];
    const at = Math.max(0, list.findIndex((g) => g.id === item.id));
    setItems(list);
    setIndex(at);
  }, []);
  const close = useCallback(() => setItems([]), []);
  const next = useCallback(
    () => setIndex((i) => (items.length ? (i + 1) % items.length : 0)),
    [items.length],
  );
  const prev = useCallback(
    () => setIndex((i) => (items.length ? (i - 1 + items.length) % items.length : 0)),
    [items.length],
  );

  const value = useMemo(
    () => ({ item: items[index] ?? null, items, index, open, close, next, prev }),
    [items, index, open, close, next, prev],
  );

  return (
    <LightboxContext.Provider value={value}>
      {children}
    </LightboxContext.Provider>
  );
}

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error("useLightbox must be used within <LightboxProvider>");
  return ctx;
}
