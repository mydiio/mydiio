import { colors } from "@/design";

type AtlasEndCardProps = {
  progress: number;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

export function AtlasEndCard({
  progress,
}: AtlasEndCardProps) {
  const cardOpacity = clamp(progress);

  const firstReveal = easeOutCubic(
    clamp((progress - 0.14) / 0.34),
  );

  const secondReveal = easeOutCubic(
    clamp((progress - 0.22) / 0.34),
  );

  const thirdReveal = easeOutCubic(
    clamp((progress - 0.3) / 0.34),
  );

  const taglineOpacity = easeOutCubic(
    clamp((progress - 0.52) / 0.32),
  );

  return (
    <div
      aria-hidden={cardOpacity < 0.01}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 6,
        display: "grid",
        placeItems: "center",
        overflow: "hidden",
        background: colors.cream,
        opacity: cardOpacity,
        pointerEvents: "none",
        willChange: "opacity",
      }}
    >
      <style>{`
        @media (max-width: 760px) {
          .atlas-end-wordmark {
            font-size: clamp(72px, 24vw, 112px) !important;
          }

          .atlas-end-tagline {
            font-size: 20px !important;
          }
        }
      `}</style>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          paddingInline: "24px",
          textAlign: "center",
        }}
      >
        <div
          className="atlas-end-wordmark"
          aria-label="mydiio"
          style={{
            display: "inline-flex",
            alignItems: "baseline",
            color: colors.ink,
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: "clamp(92px, 12vw, 190px)",
            fontWeight: 750,
            lineHeight: 0.86,
            letterSpacing: "-0.082em",
          }}
        >
          <span
            style={{
              opacity: firstReveal,
              transform: `translateY(${
                (1 - firstReveal) * 18
              }px)`,
              willChange: "opacity, transform",
            }}
          >
            myd
          </span>

          <span
            style={{
              color: colors.amber,
              opacity: secondReveal,
              transform: `translateY(${
                (1 - secondReveal) * 18
              }px)`,
              willChange: "opacity, transform",
            }}
          >
            ii
          </span>

          <span
            style={{
              opacity: thirdReveal,
              transform: `translateY(${
                (1 - thirdReveal) * 18
              }px)`,
              willChange: "opacity, transform",
            }}
          >
            o
          </span>
        </div>

        <div
          className="atlas-end-tagline"
          style={{
            marginTop: "clamp(24px, 3vh, 34px)",
            color: "rgba(26,26,24,0.64)",
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: "clamp(20px, 2vw, 30px)",
            fontWeight: 500,
            lineHeight: 1.2,
            letterSpacing: "-0.035em",
            opacity: taglineOpacity,
            transform: `translateY(${
              (1 - taglineOpacity) * 12
            }px)`,
            willChange: "opacity, transform",
          }}
        >
          Every Journey Connected
        </div>
      </div>
    </div>
  );
}
