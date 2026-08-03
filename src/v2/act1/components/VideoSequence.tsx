import { useEffect, useRef, useState } from "react";
import { colors } from "@/design";
import { moments } from "../lib/moments";
import { AtlasPlayer } from "./AtlasPlayer";

export function VideoSequence() {
  const [activeIndex, setActiveIndex] = useState(0);
  const triggerRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const observers = triggerRefs.current.map((element, index) => {
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(index);
          }
        },
        {
          rootMargin: "-46% 0px -46% 0px",
          threshold: 0,
        },
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <main
      style={{
        position: "relative",
        background: colors.ink,
      }}
    >
      <AtlasPlayer
        moments={moments}
        activeIndex={activeIndex}
      />

      <div
        aria-label="Act one timeline"
        style={{
          position: "relative",
          marginTop: "-100svh",
        }}
      >
        {moments.map((moment, index) => (
          <section
            key={moment.id}
            ref={(element) => {
              triggerRefs.current[index] = element;
            }}
            style={{
              minHeight: index === 0 ? "88svh" : "52svh",
            }}
          />
        ))}
      </div>
    </main>
  );
}
