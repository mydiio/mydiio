import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/v2/hooks";
import { JourneyScene } from "./components/JourneyScene";

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function mapProgress(rawProgress: number) {
  const holdBefore = 0.06;
  const holdAfter = 0.94;

  return clamp((rawProgress - holdBefore) / (holdAfter - holdBefore));
}

export function Journey() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);

  const isMobile = useMediaQuery("(max-width: 560px)");

  useEffect(() => {
    const update = () => {
      frameRef.current = null;

      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollDistance = section.offsetHeight - window.innerHeight;

      if (scrollDistance <= 0) {
        setProgress(0);
        return;
      }

      const rawProgress = clamp(-rect.top / scrollDistance);

      setProgress(mapProgress(rawProgress));
    };

    const requestUpdate = () => {
      if (frameRef.current !== null) return;

      frameRef.current = window.requestAnimationFrame(update);
    };

    update();

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
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      data-v2-act="journey"
      style={{
        position: "relative",
        height: isMobile ? "360svh" : "340svh",
        background: "#181715",
      }}
    >
      <JourneyScene progress={progress} />
    </section>
  );
}
