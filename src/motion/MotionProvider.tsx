// src/motion/MotionProvider.tsx
// The conductor. One instance near the root of the app.
//
// Responsibilities:
//   - initialise Lenis (smooth inertial scroll) on the client only
//   - drive Lenis from the GSAP ticker and push every scroll into ScrollTrigger,
//     so scroll-linked timelines stay in lockstep with the wheel
//   - expose scroll progress (0..1) through a subscribe API that does NOT
//     re-render the tree on every frame
//   - under prefers-reduced-motion: no Lenis, native scroll, parallax frozen
//     (see useParallax), reveals shown in final state (see Reveal)

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { EASE_FN } from "./tokens";
import { useReducedMotion } from "./useReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ProgressListener = (progress: number) => void;

type MotionContextValue = {
  reducedMotion: boolean;
  /** Live Lenis instance, or null under reduced motion / before mount. */
  getLenis: () => Lenis | null;
  /** Current page scroll progress 0..1, read without subscribing. */
  getProgress: () => number;
  /** Subscribe to progress changes. Fires immediately with the current value. */
  subscribe: (fn: ProgressListener) => () => void;
};

const MotionContext = createContext<MotionContextValue | null>(null);

export function MotionProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);
  const progressRef = useRef(0);
  const listeners = useRef(new Set<ProgressListener>());

  const emit = useCallback((p: number) => {
    progressRef.current = p;
    listeners.current.forEach((fn) => fn(p));
  }, []);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;

      // Reduced motion: no smoothing. Track progress off native scroll so
      // consumers still work, but leave animation to the components (frozen).
      if (reducedMotion) {
        const onScroll = () => {
          const doc = document.documentElement;
          const limit = doc.scrollHeight - window.innerHeight;
          emit(limit > 0 ? window.scrollY / limit : 0);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onScroll);
        };
      }

      // Full experience: Lenis on the GSAP ticker, feeding ScrollTrigger.
      const lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
        easing: EASE_FN,
      });
      lenisRef.current = lenis;

      const onLenisScroll = (e: { scroll: number; limit: number }) => {
        ScrollTrigger.update();
        emit(e.limit > 0 ? e.scroll / e.limit : 0);
      };
      lenis.on("scroll", onLenisScroll);

      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      ScrollTrigger.refresh();

      return () => {
        lenis.off("scroll", onLenisScroll);
        lenis.destroy();
        gsap.ticker.remove(tick);
        gsap.ticker.lagSmoothing(500, 33); // restore gsap default
        lenisRef.current = null;
      };
    },
    { dependencies: [reducedMotion] },
  );

  const value = useMemo<MotionContextValue>(
    () => ({
      reducedMotion,
      getLenis: () => lenisRef.current,
      getProgress: () => progressRef.current,
      subscribe: (fn) => {
        listeners.current.add(fn);
        fn(progressRef.current);
        return () => {
          listeners.current.delete(fn);
        };
      },
    }),
    [reducedMotion],
  );

  return (
    <MotionContext.Provider value={value}>{children}</MotionContext.Provider>
  );
}

export function useMotion(): MotionContextValue {
  const ctx = useContext(MotionContext);
  if (!ctx) throw new Error("useMotion must be used inside <MotionProvider>");
  return ctx;
}

/**
 * Read scroll progress (0..1) without re-rendering. The callback runs on every
 * scroll frame. Do your reads and imperative writes inside it.
 *
 *   useScrollProgress((p) => { el.current.style.setProperty("--p", String(p)); });
 */
export function useScrollProgress(onProgress: ProgressListener): void {
  const { subscribe } = useMotion();
  const cb = useRef(onProgress);
  cb.current = onProgress;
  useEffect(() => subscribe((p) => cb.current(p)), [subscribe]);
}
