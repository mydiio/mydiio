import {
  colors,
  DURATION,
  EASE_CSS,
  fontFamily,
  letterSpacing,
  lineHeight,
  spacing,
  typeScale,
} from "@/design";

const HERO_IMAGE = "/assets/city-awakens.webp";

export function OpeningSequence() {
  return (
    <section
      aria-labelledby="atlas-opening-title"
      style={{
        position: "relative",
        minHeight: "100svh",
        overflow: "hidden",
        background: colors.ink,
        color: colors.white,
      }}
    >
      <style>{`
        @keyframes atlas-image-reveal {
          from {
            opacity: 0;
            transform: scale(1.08);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes atlas-rise {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes atlas-scroll-pulse {
          0%, 100% {
            opacity: 0.35;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
            transform: translateY(8px);
          }
        }

        .atlas-opening-image {
          animation:
            atlas-image-reveal 3s ${EASE_CSS} both;
        }

        .atlas-opening-kicker {
          animation:
            atlas-rise ${DURATION.lg}s ${EASE_CSS} 0.55s both;
        }

        .atlas-opening-line-one {
          animation:
            atlas-rise ${DURATION.lg}s ${EASE_CSS} 0.8s both;
        }

        .atlas-opening-line-two {
          animation:
            atlas-rise ${DURATION.lg}s ${EASE_CSS} 1.05s both;
        }

        .atlas-opening-line-three {
          animation:
            atlas-rise ${DURATION.lg}s ${EASE_CSS} 1.3s both;
        }

        .atlas-opening-caption {
          animation:
            atlas-rise ${DURATION.md}s ${EASE_CSS} 1.7s both;
        }

        .atlas-opening-scroll {
          animation:
            atlas-rise ${DURATION.md}s ${EASE_CSS} 2.15s both;
        }

        .atlas-opening-scroll-line {
          animation:
            atlas-scroll-pulse 2.4s ${EASE_CSS} 2.6s infinite;
        }

        @media (max-width: 720px) {
          .atlas-opening-content {
            padding-inline: ${spacing[5]};
            padding-bottom: ${spacing[7]};
          }

          .atlas-opening-title {
            max-width: 8ch !important;
          }

          .atlas-opening-caption {
            max-width: 26ch !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .atlas-opening-image,
          .atlas-opening-kicker,
          .atlas-opening-line-one,
          .atlas-opening-line-two,
          .atlas-opening-line-three,
          .atlas-opening-caption,
          .atlas-opening-scroll,
          .atlas-opening-scroll-line {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <img
        className="atlas-opening-image"
        src={HERO_IMAGE}
        alt="Colombo beginning to move at dawn"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.38) 48%, rgba(0,0,0,0.08) 100%)",
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.06) 54%, rgba(0,0,0,0.58) 100%)",
        }}
      />

      <header
        style={{
          position: "absolute",
          zIndex: 2,
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: `${spacing[5]} clamp(${spacing[5]}, 5vw, ${spacing[9]})`,
        }}
      >
        <a
          href="/v2"
          aria-label="mydiio Atlas home"
          style={{
            color: colors.white,
            fontFamily: fontFamily.body,
            fontSize: typeScale.body,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            textDecoration: "none",
          }}
        >
          mydiio
        </a>

        <span
          style={{
            fontFamily: fontFamily.mono,
            fontSize: typeScale.micro,
            letterSpacing: letterSpacing.eyebrow,
            textTransform: "uppercase",
            opacity: 0.72,
          }}
        >
          Colombo
        </span>
      </header>

      <div
        className="atlas-opening-content"
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100svh",
          width: "100%",
          maxWidth: "1400px",
          marginInline: "auto",
          paddingInline: `clamp(${spacing[5]}, 7vw, ${spacing[10]})`,
          paddingTop: spacing[10],
          paddingBottom: spacing[8],
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-start",
        }}
      >
        <div
          className="atlas-opening-kicker"
          style={{
            marginBottom: spacing[5],
            fontFamily: fontFamily.mono,
            fontSize: typeScale.caption,
            letterSpacing: letterSpacing.eyebrow,
            textTransform: "uppercase",
            color: colors.amber,
          }}
        >
          Every city has a rhythm
        </div>

        <h1
          id="atlas-opening-title"
          className="atlas-opening-title"
          style={{
            margin: 0,
            maxWidth: "9ch",
            fontFamily: fontFamily.display,
            fontSize: typeScale.displayXL,
            fontWeight: 400,
            lineHeight: lineHeight.displayXL,
            letterSpacing: letterSpacing.display,
          }}
        >
          <span
            className="atlas-opening-line-one"
            style={{
              display: "block",
            }}
          >
            Millions
          </span>

          <span
            className="atlas-opening-line-two"
            style={{
              display: "block",
            }}
          >
            of journeys.
          </span>

          <span
            className="atlas-opening-line-three"
            style={{
              display: "block",
              color: colors.amber,
            }}
          >
            One network.
          </span>
        </h1>

        <p
          className="atlas-opening-caption"
          style={{
            margin: `${spacing[6]} 0 0`,
            maxWidth: "34ch",
            fontFamily: fontFamily.body,
            fontSize: typeScale.bodyLead,
            lineHeight: lineHeight.bodyLead,
            color: "rgba(255,255,255,0.82)",
          }}
        >
          Sri Lanka&apos;s connected passenger network begins with the journeys Colombo already
          makes.
        </p>

        <div
          className="atlas-opening-scroll"
          aria-hidden="true"
          style={{
            marginTop: spacing[7],
            display: "flex",
            alignItems: "center",
            gap: spacing[3],
            fontFamily: fontFamily.mono,
            fontSize: typeScale.micro,
            letterSpacing: letterSpacing.eyebrow,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.68)",
          }}
        >
          Scroll to follow the journey
          <span
            className="atlas-opening-scroll-line"
            style={{
              display: "block",
              width: "1px",
              height: spacing[6],
              background: colors.amber,
            }}
          />
        </div>
      </div>
    </section>
  );
}
