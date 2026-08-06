import { colors } from "@/design";
import { useSmoothSectionProgress } from "@/v2/hooks";

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

export function FundingStatement() {
  const { sectionRef, progress } = useSmoothSectionProgress({
    damping: 12,
    entryProgress: true,
    entryDistance: 1.05,
    snapToEnd: true,
  });

  const panelProgress = easeOutCubic(clamp(progress / 0.28));

  const copyProgress = easeOutCubic(clamp((progress - 0.04) / 0.42));

  const supportingProgress = easeOutCubic(clamp((progress - 0.2) / 0.42));

  return (
    <section
      ref={sectionRef}
      data-v2-act="funding"
      data-atlas-tone="dark"
      style={{
        position: "relative",
        minHeight: "100svh",
        overflow: "hidden",
        display: "grid",
        placeItems: "center",
        padding: "96px 24px 70px",
        boxSizing: "border-box",
        borderRadius: 0,
        background: colors.ink,
        color: colors.cream,
        boxShadow: "none",
        opacity: 1,
        transform: `translateY(${(1 - panelProgress) * 4}px)`,
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
          transform: `translateY(${(1 - copyProgress) * 18}px)`,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "9px",
            marginBottom: "24px",
            color: colors.amber,
            fontSize: "var(--atlas-eyebrow-size)",
            fontWeight: "var(--atlas-eyebrow-weight)",
            letterSpacing: "var(--atlas-eyebrow-tracking)",
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
          How the network grows
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
          className="atlas-funding-headline atlas-section-heading-large"
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
          className="atlas-funding-supporting atlas-funding-motion atlas-section-copy atlas-section-copy-light"
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
          Every campaign supports connected vehicles, driver income and useful passenger
          information. As participation grows, the network grows with it.
        </p>
      </div>
    </section>
  );
}
