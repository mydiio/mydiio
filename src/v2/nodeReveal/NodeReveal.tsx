import { useEffect, useRef, useState } from "react";
import { colors } from "@/design";
import { useMediaQuery } from "@/v2/hooks";
import { NodeRevealScene } from "./components/NodeRevealScene";

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function mapProgress(rawProgress: number) {
  const holdBefore = 0.05;
  const holdAfter = 0.95;

  return clamp((rawProgress - holdBefore) / (holdAfter - holdBefore));
}

export function NodeReveal() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);

  const isMobile = useMediaQuery("(max-width: 700px)");

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

      setProgress(mapProgress(clamp(-rect.top / scrollDistance)));
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
      data-atlas-node-reveal
      style={{
        position: "relative",
        height: isMobile ? "285svh" : "265svh",
        background: colors.cream,
      }}
    >
      <NodeRevealScene progress={progress} />
    </section>
  );
}
