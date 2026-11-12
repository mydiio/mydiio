import { useEffect, useRef, useState } from "react";

type SmoothSectionProgressOptions = {
  holdBefore?: number;
  holdAfter?: number;
  damping?: number;
  snapToEnd?: boolean;
  entryProgress?: boolean;
  entryDistance?: number;
  entryLead?: number;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function useSmoothSectionProgress({
  holdBefore = 0,
  holdAfter = 1,
  damping = 12,
  snapToEnd = true,
  entryProgress = false,
  entryDistance = 1,
  entryLead = 0,
}: SmoothSectionProgressOptions = {}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const previousTimeRef = useRef<number | null>(null);
  const initialisedRef = useRef(false);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const mapProgress = (rawProgress: number) => {
      const mapped = clamp((rawProgress - holdBefore) / (holdAfter - holdBefore));

      return snapToEnd && mapped >= 0.985 ? 1 : mapped;
    };

    const measureTarget = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollDistance = section.offsetHeight - window.innerHeight;

      const entranceOffset = window.innerHeight * entryLead;

      const rawProgress = entryProgress
        ? clamp((window.innerHeight - rect.top) / (window.innerHeight * entryDistance))
        : scrollDistance > 0
          ? clamp((entranceOffset - rect.top) / (scrollDistance + entranceOffset))
          : clamp((window.innerHeight - rect.top) / window.innerHeight);

      targetRef.current = mapProgress(rawProgress);

      if (!initialisedRef.current || reducedMotion.matches) {
        initialisedRef.current = true;
        currentRef.current = targetRef.current;
        setProgress(targetRef.current);
      }
    };

    const animate = (time: number) => {
      const previousTime = previousTimeRef.current ?? time;
      const deltaSeconds = Math.min((time - previousTime) / 1000, 0.05);

      previousTimeRef.current = time;

      const target = targetRef.current;
      const current = currentRef.current;

      const interpolation = 1 - Math.exp(-damping * deltaSeconds);
      const next = current + (target - current) * interpolation;

      if (Math.abs(target - next) < 0.0001) {
        currentRef.current = target;
        setProgress(target);
        frameRef.current = null;
        previousTimeRef.current = null;
        return;
      }

      currentRef.current = next;
      setProgress(next);
      frameRef.current = window.requestAnimationFrame(animate);
    };

    const requestUpdate = () => {
      measureTarget();

      if (reducedMotion.matches) return;
      if (frameRef.current !== null) return;

      previousTimeRef.current = null;
      frameRef.current = window.requestAnimationFrame(animate);
    };

    measureTarget();

    window.addEventListener("scroll", requestUpdate, {
      passive: true,
    });

    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [damping, entryDistance, entryLead, entryProgress, holdAfter, holdBefore, snapToEnd]);

  return {
    sectionRef,
    progress,
  };
}
