// src/motion/useMounted.ts
// Returns false during SSR and the first client render, true afterwards.
// Use it to gate browser-only trees (WebGL canvases) so they never run on the
// Cloudflare Worker and never cause a hydration mismatch.

import { useEffect, useState } from "react";

export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
