import { useEffect, useRef, useState } from "react";
import { colors } from "@/design";

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

export function FundingStatement() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      frameRef.current = null;

      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();

      const nextProgress = clamp((window.innerHeight - rect.top) / (window.innerHeight * 0.72));

      setProgress(nextProgress);
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
  }, []);

  const panelProgress = easeOutCubic(clamp(progress / 0.52));

  const copyProgress = easeOutCubic(clamp((progress - 0.24) / 0.5));

  const supportingProgress = easeOutCubic(clamp((progress - 0.48) / 0.38));

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "108svh",
        overflow: "hidden",
        display: "grid",
        placeItems: "center",
        padding: "110px 24px 78px",
        boxSizing: "border-box",
        borderRadius: "34px 34px 0 0",
        background: colors.ink,
        color: colors.cream,
        boxShadow: "0 -34px 90px -52px rgba(26,26,24,0.72)",
        opacity: 0.84 + panelProgress * 0.16,
        transform: `translateY(${(1 - panelProgress) * 72}px)`,
        transformOrigin: "center bottom",
        fontFamily: '"DM Sans", system-ui, sans-serif',
      }}
    >
      <style>{`
        .atlas-funding-headline {
          font-size: clamp(52px, 7vw, 112px);
        }

        .atlas-funding-supporting {
          font-size: clamp(17px, 1.45vw, 21px);
        }

        @media (max-width: 760px) {
          .atlas-funding-headline {
            font-size: clamp(42px, 12vw, 58px);
          }

          .atlas-funding-supporting {
            font-size: 15px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .atlas-funding-motion {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          top: "48%",
          width: "min(900px, 110vw)",
          height: "min(900px, 110vw)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(245,166,35,0.13), rgba(245,166,35,0.025) 38%, transparent 69%)",
          opacity: copyProgress,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="atlas-funding-motion"
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "1260px",
          textAlign: "center",
          opacity: copyProgress,
          transform: `translateY(${(1 - copyProgress) * 28}px)`,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "9px",
            marginBottom: "24px",
            color: colors.amber,
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: "26px",
              height: "1px",
              background: colors.amber,
            }}
          />
          The commercial engine
          <span
            aria-hidden="true"
            style={{
              width: "26px",
              height: "1px",
              background: colors.amber,
            }}
          />
        </div>

        <h2
          className="atlas-funding-headline"
          style={{
            margin: 0,
            color: colors.cream,
            fontWeight: 600,
            lineHeight: 0.94,
            letterSpacing: "-0.062em",
          }}
        >
          Advertising funds the network.
          <br />
          <span style={{ color: colors.amber }}>People give it purpose.</span>
        </h2>

        <p
          className="atlas-funding-supporting atlas-funding-motion"
          style={{
            margin: "34px auto 0",
            maxWidth: "650px",
            color: "rgba(253,250,243,0.66)",
            fontWeight: 500,
            lineHeight: 1.5,
            letterSpacing: "-0.025em",
            opacity: supportingProgress,
            transform: `translateY(${(1 - supportingProgress) * 14}px)`,
          }}
        >
          Businesses fund connected vehicles, driver income and useful passenger information. Every
          campaign helps the network grow.
        </p>
      </div>
    </section>
  );
}
