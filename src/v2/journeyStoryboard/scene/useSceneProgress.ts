import type { RefObject } from "react";
import { useEffect, useState } from "react";

const clamp = (value: number, minimum = 0, maximum = 1) =>
  Math.min(maximum, Math.max(minimum, value));

export function useSceneProgress(sectionRef: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frameId = 0;

    const update = () => {
      frameId = 0;

      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const availableScroll = Math.max(1, rect.height - viewportHeight);

      setProgress(clamp(-rect.top / availableScroll));
    };

    const requestUpdate = () => {
      if (frameId !== 0) {
        return;
      }

      frameId = window.requestAnimationFrame(update);
    };

    update();

    window.addEventListener("scroll", requestUpdate, { passive: true });

    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);

      window.removeEventListener("resize", requestUpdate);

      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [sectionRef]);

  return {
    progress,

    /*
     * Discovery holds briefly, then overlaps Journey.
     */
    discovery: clamp(progress / 0.30),

    /*
     * Travelling signal begins before Discovery fully exits.
     */
    journey: clamp((progress - 0.12) / 0.54),

    /*
     * Tablet begins emerging during Journey's final beat.
     */
    reveal: clamp((progress - 0.48) / 0.38),
  };
}
