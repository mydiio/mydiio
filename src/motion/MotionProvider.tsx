import React, { createContext, useContext, useEffect, useRef, ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { useReducedMotion } from './useReducedMotion';
import { useMounted } from './useMounted';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

type ScrollProgressCallback = (progress: number) => void;

interface MotionContextType {
  lenis: Lenis | null;
  scrollProgress: number;
  subscribeToProgress: (callback: ScrollProgressCallback) => () => void;
}

const MotionContext = createContext<MotionContextType | null>(null);

export function MotionProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const subscribers = useRef<Set<ScrollProgressCallback>>(new Set());
  const reducedMotion = useReducedMotion();
  const mounted = useMounted();

  // Initialize Lenis
  useEffect(() => {
    if (!mounted || reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Frame loop
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // Progress subscriber
    const unsub = lenis.on('scroll', (e: any) => {
      const progress = e.progress || 0;
      setScrollProgress(progress);
      subscribers.current.forEach(cb => cb(progress));
    });

    return () => {
      unsub();
      lenis.destroy();
    };
  }, [mounted, reducedMotion]);

  const subscribeToProgress = (callback: ScrollProgressCallback) => {
    subscribers.current.add(callback);
    return () => subscribers.current.delete(callback);
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <MotionContext.Provider
      value={{
        lenis: lenisRef.current,
        scrollProgress,
        subscribeToProgress,
      }}
    >
      {children}
    </MotionContext.Provider>
  );
}

export function useScrollProgress(callback?: ScrollProgressCallback) {
  const context = useContext(MotionContext);
  if (!context) {
    throw new Error('useScrollProgress must be used within MotionProvider');
  }

  React.useEffect(() => {
    if (callback) {
      return context.subscribeToProgress(callback);
    }
  }, [callback, context]);

  return context.scrollProgress;
}
