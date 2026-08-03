import { useEffect, useRef, useState } from "react";
import {
  colors,
  EASE_CSS,
  fontFamily,
  letterSpacing,
  lineHeight,
  spacing,
  typeScale,
} from "@/design";
import { moments } from "../lib/moments";

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
          rootMargin: "-42% 0px -42% 0px",
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
      <style>{`
        .atlas-act-one-video {
          transition:
            opacity 1.15s ${EASE_CSS},
            transform 2.4s ${EASE_CSS};
        }

        .atlas-act-one-copy {
          transition:
            opacity 0.8s ${EASE_CSS},
            transform 0.8s ${EASE_CSS};
        }

        @media (prefers-reduced-motion: reduce) {
          .atlas-act-one-video,
          .atlas-act-one-copy {
            transition: none !important;
          }
        }
      `}</style>

      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100svh",
          overflow: "hidden",
          background: colors.ink,
        }}
      >
        {moments.map((moment, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={moment.id}
              aria-hidden={!isActive}
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
              }}
            >
              <video
                className="atlas-act-one-video"
                src={moment.src}
                autoPlay
                muted
                loop
                playsInline
                preload={index < 2 ? "auto" : "metadata"}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "scale(1)" : "scale(1.025)",
                }}
              />

              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(26,26,24,0.10) 0%, rgba(26,26,24,0.08) 48%, rgba(26,26,24,0.62) 100%)",
                  opacity: isActive ? 1 : 0,
                  transition: `opacity 1.15s ${EASE_CSS}`,
                }}
              />

              {moment.headline && (
                <div
                  className="atlas-act-one-copy"
                  style={{
                    position: "absolute",
                    left: `clamp(${spacing[5]}, 7vw, ${spacing[10]})`,
                    right: spacing[5],
                    bottom: `clamp(${spacing[7]}, 11vh, ${spacing[10]})`,
                    opacity: isActive ? 1 : 0,
                    transform: isActive
                      ? "translateY(0)"
                      : "translateY(24px)",
                  }}
                >
                  <h1
                    style={{
                      margin: 0,
                      maxWidth: "9ch",
                      color: colors.cream,
                      fontFamily: fontFamily.display,
                      fontSize: typeScale.displayXL,
                      fontWeight: 400,
                      lineHeight: lineHeight.displayXL,
                      letterSpacing: letterSpacing.display,
                    }}
                  >
                    {moment.headline}
                  </h1>
                </div>
              )}
            </div>
          );
        })}

        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            right: spacing[5],
            bottom: spacing[5],
            zIndex: 2,
            fontFamily: fontFamily.mono,
            fontSize: typeScale.micro,
            letterSpacing: letterSpacing.mono,
            color: "rgba(253,250,243,0.66)",
          }}
        >
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(moments.length).padStart(2, "0")}
        </div>
      </div>

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
              minHeight: index === 0 ? "150svh" : "110svh",
            }}
          />
        ))}
      </div>
    </main>
  );
}
