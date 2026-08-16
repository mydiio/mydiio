import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { useReducedMotion } from "@/motion/useReducedMotion";

type SectionProgressOptions = {
  disabled?: boolean;
};

type SectionProgressResult<T extends HTMLElement> = {
  ref: RefObject<T | null>;
  progress: number;
  reducedMotion: boolean;
};

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function useSectionProgress<T extends HTMLElement = HTMLElement>(
  options: SectionProgressOptions = {},
): SectionProgressResult<T> {
  const ref = useRef<T>(null);
  const reducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(reducedMotion ? 1 : 0);

  const disabled = options.disabled === true || reducedMotion;

  const update = useCallback(() => {
    const section = ref.current;

    if (!section || disabled) {
      setProgress(1);
      return;
    }

    const rect = section.getBoundingClientRect();
    const scrollDistance = section.offsetHeight - window.innerHeight;

    if (scrollDistance <= 0) {
      setProgress(rect.top <= 0 ? 1 : 0);
      return;
    }

    setProgress(clamp(-rect.top / scrollDistance));
  }, [disabled]);

  useEffect(() => {
    if (disabled) {
      setProgress(1);
      return;
    }

    let frame = 0;

    const requestUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    requestUpdate();

    window.addEventListener("scroll", requestUpdate, {
      passive: true,
    });

    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", requestUpdate);

      window.removeEventListener("resize", requestUpdate);
    };
  }, [disabled, update]);

  return {
    ref,
    progress,
    reducedMotion,
  };
}
