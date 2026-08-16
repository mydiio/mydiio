import { colors } from "@/design";
import { useSmoothSectionProgress } from "@/v2/hooks";

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

function mapRange(value: number, start: number, end: number) {
  return clamp((value - start) / (end - start));
}

function formatCount(value: number) {
  return Math.round(value).toLocaleString();
}

export function ActTwo() {
  const { sectionRef: heroRef, progress: heroProgress } = useSmoothSectionProgress({
    damping: 12,
    snapToEnd: true,
  });

  const headlineProgress = Math.max(0.96, easeOutCubic(mapRange(heroProgress, 0, 0.22)));

  const counterProgress = easeOutCubic(mapRange(heroProgress, 0.3, 0.9));

  const supportingProgress = easeOutCubic(mapRange(heroProgress, 0.52, 0.84));

  const handoffProgress = easeOutCubic(mapRange(heroProgress, 0.72, 1));

  const count = formatCount(320000 * counterProgress);

  return (
    <section
      data-atlas-act-two
      data-v2-act="act-two"
      data-atlas-tone="light"
      style={{
        position: "relative",
        height: "130svh",
        background: colors.cream,
        color: colors.ink,
        fontFamily: '"Space Grotesk", system-ui, -apple-system, sans-serif',
        overflow: "hidden",
      }}
    >
      <style>{`
        .atlas-act-two-hero-inner {
          width: min(1380px, calc(100% - 72px));
        }

        .atlas-act-two-scale-grid {
          display: grid;
          grid-template-columns:
            minmax(0, 1.2fr)
            minmax(280px, 0.55fr);
          gap: clamp(46px, 7vw, 110px);
          align-items: end;
        }

        .atlas-act-two-statement-copy {
          font-size: clamp(52px, 7vw, 112px);
        }

        @media (max-width: 760px) {
          .atlas-act-two-hero-inner {
            width: calc(100% - 36px);
          }

          .atlas-act-two-scale-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .atlas-act-two-hero-inner {
            padding-top: 34px !important;
            padding-bottom: 28px !important;
          }

          .atlas-act-two-statement-copy {
            font-size: clamp(42px, 12vw, 58px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .atlas-act-two-motion {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <section
        ref={heroRef}
        style={{
          position: "relative",
          height: "100svh",
          background: colors.cream,
        }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100svh",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            background: colors.cream,
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "50%",
              bottom: "-34vw",
              width: "74vw",
              height: "74vw",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(245,166,35,0.12), rgba(245,166,35,0.025) 42%, transparent 70%)",
              opacity: handoffProgress,
              transform: "translateX(-50%)",
              pointerEvents: "none",
            }}
          />

          <div
            className="atlas-act-two-hero-inner"
            style={{
              position: "relative",
              zIndex: 1,
              marginInline: "auto",
              padding: "88px 0 48px",
              boxSizing: "border-box",
            }}
          >
            <div
              className="atlas-act-two-motion"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "18px",
                color: colors.amberDeep,
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                opacity: headlineProgress,
                transform: `translateY(${(1 - headlineProgress) * 12}px)`,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: `${18 + headlineProgress * 22}px`,
                  height: "1px",
                  background: colors.amber,
                }}
              />
              The connected network
            </div>

            <h2
              className="atlas-act-two-motion"
              style={{
                margin: 0,
                maxWidth: "11ch",
                fontSize: "clamp(48px, 7.5vw, 112px)",
                fontWeight: 600,
                lineHeight: 0.91,
                letterSpacing: "-0.066em",
                opacity: 1,
                transform: `
                  translateY(${handoffProgress * -22}px)
                  scale(${1 - handoffProgress * 0.06})
                `,
                transformOrigin: "left top",
              }}
            >
              Every vehicle becomes one connected point.
            </h2>

            <div
              className="atlas-act-two-scale-grid"
              style={{
                marginTop: "clamp(30px, 4.5vh, 52px)",
              }}
            >
              <div
                className="atlas-act-two-motion"
                style={{
                  opacity: counterProgress,
                  transform: `translateY(${(1 - counterProgress) * 24}px)`,
                }}
              >
                <div
                  style={{
                    color: "rgba(26,26,24,0.82)",
                    fontSize: "clamp(66px, 10.4vw, 138px)",
                    fontWeight: 650,
                    lineHeight: 0.8,
                    letterSpacing: "-0.08em",
                    fontVariantNumeric: "tabular-nums",
                    whiteSpace: "nowrap",
                  }}
                >
                  {count}
                </div>

                <div
                  style={{
                    marginTop: "20px",
                    maxWidth: "18ch",
                    color: colors.ink,
                    fontSize: "clamp(20px, 2vw, 30px)",
                    fontWeight: 520,
                    lineHeight: 1.08,
                    letterSpacing: "-0.038em",
                  }}
                >
                  tuk-tuks operating across Colombo every day.
                </div>
              </div>

              <div
                className="atlas-act-two-motion"
                style={{
                  paddingBottom: "8px",
                  opacity: 0.72 + supportingProgress * 0.28,
                  transform: `translateY(${(1 - supportingProgress) * 10}px)`,
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "3px",
                    marginBottom: "18px",
                    borderRadius: "999px",
                    background: colors.amber,
                  }}
                />

                <p
                  style={{
                    margin: 0,
                    maxWidth: "25ch",
                    color: "rgba(26,26,24,0.62)",
                    fontSize: "clamp(18px, 1.55vw, 25px)",
                    fontWeight: 500,
                    lineHeight: 1.36,
                    letterSpacing: "-0.026em",
                  }}
                >
                  We don't build a new network. We connect the one Colombo already uses every day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
