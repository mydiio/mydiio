import { useEffect, useRef, useState } from "react";
import { colors } from "@/design";
import { ClosingScene } from "./components/ClosingScene";

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function mapProgress(rawProgress: number) {
  const holdBefore = 0.05;
  const holdAfter = 0.92;

  const mapped = clamp(
    (rawProgress - holdBefore) /
      (holdAfter - holdBefore),
  );

  return mapped >= 0.985 ? 1 : mapped;
}

export function ActEight() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      frameRef.current = null;

      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollDistance =
        section.offsetHeight - window.innerHeight;

      if (scrollDistance <= 0) {
        setProgress(0);
        return;
      }

      const rawProgress = clamp(
        -rect.top / scrollDistance,
      );

      setProgress(mapProgress(rawProgress));
    };

    const requestUpdate = () => {
      if (frameRef.current !== null) return;

      frameRef.current =
        window.requestAnimationFrame(update);
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
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        height: "220svh",
        background: colors.cream,
      }}
    >
      <ClosingScene progress={progress} />
    </section>
  );
}
