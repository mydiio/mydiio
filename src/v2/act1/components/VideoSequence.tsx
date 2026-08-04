import { useEffect, useRef, useState } from "react";
import { colors } from "@/design";
import { moments } from "../lib/moments";
import { AtlasPlayer } from "./AtlasPlayer";

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function VideoSequence() {
  const sequenceRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [sequenceProgress, setSequenceProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      frameRef.current = null;

      const element = sequenceRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const scrollDistance = element.offsetHeight - window.innerHeight;

      if (scrollDistance <= 0) {
        setSequenceProgress(0);
        return;
      }

      const travelled = -rect.top;
      setSequenceProgress(clamp(travelled / scrollDistance));
    };

    const requestUpdate = () => {
      if (frameRef.current !== null) return;

      frameRef.current = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();

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
  }, []);

  return (
    <main
      ref={sequenceRef}
      data-atlas-act-one
      style={{
        position: "relative",
        height: "260svh",
        background: colors.ink,
      }}
    >
      <AtlasPlayer
        moments={moments}
        sequenceProgress={sequenceProgress}
      />
    </main>
  );
}
