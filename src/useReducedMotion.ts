// src/motion/useReducedMotion.ts
// SSR-safe reduced-motion signal. On the server it reports `true` so markup ships
// in its final, visible state (no hidden content without JS, no hydration flash).
// After hydration it flips to the user's real preference.

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void): () => void {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getSnapshot(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return true;
  return window.matchMedia(QUERY).matches;
}

// Server default: reduced. Safest baseline, content renders in final state.
function getServerSnapshot(): boolean {
  return true;
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
