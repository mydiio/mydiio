import { colors } from "@/design";

type PioneerSceneProps = {
  progress: number;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function PioneerDesktop({ progress }: PioneerSceneProps) {
  const eyebrowProgress = clamp(progress / 0.14);
  const headingProgress = clamp((progress - 0.06) / 0.2);
  const bodyProgress = clamp((progress - 0.2) / 0.18);
  const positionsProgress = clamp((progress - 0.34) / 0.42);
  const ctaProgress = clamp((progress - 0.76) / 0.16);

  const filledPositions = Math.round(positionsProgress * 10);

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100svh",
        overflow: "hidden",
        background: colors.ink,
        color: colors.cream,
        fontFamily: '"Space Grotesk", system-ui, -apple-system, sans-serif',
      }}
    >
      <style>{`
        @media (max-width: 820px) {
          .atlas-pioneer-layout {
            grid-template-columns: 1fr !important;
            gap: 34px !important;
          }

          .atlas-pioneer-positions {
            justify-content: flex-start !important;
          }
        }

        @media (max-width: 560px) {
          .atlas-pioneer-actions {
            align-items: stretch !important;
          }

          .atlas-pioneer-actions a {
            width: 100% !important;
          }
        }
      `}</style>

      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-18%",
            top: "-28%",
            width: "68vw",
            height: "68vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(245,166,35,0.18), rgba(245,166,35,0.04) 38%, transparent 68%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: "-22%",
            bottom: "-40%",
            width: "64vw",
            height: "64vw",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(245,166,35,0.08), transparent 66%)",
          }}
        />
      </div>

      <div
        className="atlas-pioneer-layout"
        style={{
          position: "relative",
          zIndex: 2,
          width: "min(1360px, calc(100% - 112px))",
          height: "100%",
          marginInline: "auto",
          padding: "clamp(48px, 6vh, 76px) 0",
          boxSizing: "border-box",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(360px, 0.68fr)",
          gap: "clamp(48px, 5.5vw, 88px)",
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              display: "inline-flex",
              gap: "11px",
              marginBottom: "22px",
              color: colors.amber,
              fontSize: "var(--atlas-eyebrow-size)",
              fontWeight: "var(--atlas-eyebrow-weight)",
              letterSpacing: "var(--atlas-eyebrow-tracking)",
              textTransform: "uppercase",
              opacity: eyebrowProgress,
              transform: `translateY(${(1 - eyebrowProgress) * 10}px)`,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: "30px",
                height: "1px",
              }}
            />
            Pioneer
          </div>

          <h2
            className="atlas-commercial-heading"
            style={{
              margin: 0,
              maxWidth: "12ch",
              fontSize: "clamp(48px, 5.1vw, 78px)",
              fontWeight: 600,
              lineHeight: 0.98,
              letterSpacing: "-0.055em",
              opacity: headingProgress,
              transform: `translateY(${(1 - headingProgress) * 24}px)`,
            }}
          >
            Ten active Pioneer places.
            <br />
            Available as places open.
          </h2>

          <p
            className="atlas-section-copy atlas-section-copy-light"
            style={{
              margin: "clamp(24px, 3vh, 34px) 0 0",
              maxWidth: "52ch",
              color: "rgba(253,250,243,0.72)",
              fontSize: "clamp(16px, 1.25vw, 20px)",
              lineHeight: 1.55,
              opacity: bodyProgress,
              transform: `translateY(${(1 - bodyProgress) * 16}px)`,
            }}
          >
            Up to ten advertisers can hold active Pioneer places. Vacated places may be offered
            again. Your monthly price is protected for twelve months from activation.
          </p>

          <div
            style={{
              display: "grid",
              gap: 0,
              maxWidth: "620px",
              marginTop: "clamp(28px, 3.8vh, 42px)",
              borderTop: "1px solid rgba(253,250,243,0.12)",
              opacity: bodyProgress,
              transform: `translateY(${(1 - bodyProgress) * 14}px)`,
            }}
          >
            {[
              ["Rate", "Monthly package price protected for 12 months."],
              ["Category", "No category exclusivity included."],
              ["Coverage", "Agreed live coverage; expansion priced separately."],
              ["Status", "Permanent recognition as one of ten founding partners."],
            ].map(([label, value]) => (
              <div
                key={label}
                style={{
                  display: "grid",
                  gridTemplateColumns: "120px minmax(0, 1fr)",
                  gap: "22px",
                  padding: "15px 0",
                  borderBottom: "1px solid rgba(253,250,243,0.09)",
                }}
              >
                <span
                  style={{
                    color: colors.amber,
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  {label}
                </span>

                <span
                  style={{
                    color: "rgba(253,250,243,0.76)",
                    fontWeight: 550,
                    lineHeight: 1.45,
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minWidth: 0,
            paddingLeft: "clamp(28px, 3.5vw, 48px)",
            borderLeft: "1px solid rgba(253,250,243,0.1)",
          }}
        >
          <div
            style={{
              color: "rgba(253,250,243,0.46)",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              opacity: bodyProgress,
            }}
          >
            Founding positions
          </div>

          <div
            style={{
              alignItems: "baseline",
              gap: "10px",
              marginTop: "14px",
              opacity: bodyProgress,
            }}
          >
            <span
              style={{
                color: colors.cream,
                fontSize: "clamp(72px, 7vw, 112px)",
                fontWeight: 600,
                lineHeight: 0.88,
                letterSpacing: "-0.075em",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              10
            </span>

            <span
              style={{
                color: colors.amber,
                fontSize: "clamp(18px, 1.7vw, 26px)",
                fontWeight: 650,
              }}
            >
              active places
            </span>
          </div>

          <div
            className="atlas-pioneer-positions"
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
              marginTop: "28px",
            }}
          >
            {Array.from({ length: 10 }).map((_, index) => {
              const active = index < filledPositions;

              return (
                <div
                  key={index}
                  style={{
                    position: "relative",
                    flex: "1 1 0",
                    maxWidth: "38px",
                    aspectRatio: "1 / 1",
                    borderRadius: "50%",
                    border: active
                      ? `1px solid ${colors.amber}`
                      : "1px solid rgba(253,250,243,0.16)",
                    background: active ? "rgba(245,166,35,0.15)" : "rgba(253,250,243,0.025)",
                    boxShadow: active ? "0 0 0 3px rgba(245,166,35,0.045)" : "none",
                    opacity: 0.24 + positionsProgress * 0.76,
                    transform: active ? "scale(1)" : "scale(0.96)",
                    transition:
                      "background 0.45s ease, border 0.45s ease, transform 0.45s ease",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      inset: "50% auto auto 50%",
                      color: active ? colors.amber : "rgba(253,250,243,0.28)",
                      fontSize: "10px",
                      fontWeight: 700,
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                      fontVariantNumeric: "tabular-nums",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              );
            })}
          </div>

          <div
            style={{
              marginTop: "26px",
              paddingTop: "24px",
              borderTop: "1px solid rgba(253,250,243,0.12)",
              color: "rgba(253,250,243,0.54)",
              fontSize: "14px",
              lineHeight: 1.5,
              opacity: positionsProgress,
            }}
          >
            Limited to ten active Pioneer advertisers. Availability is confirmed before booking.
          </div>

          <div
            className="atlas-pioneer-actions"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "13px",
              marginTop: "32px",
              opacity: ctaProgress,
              transform: `translateY(${(1 - ctaProgress) * 12}px)`,
            }}
          >
            <a href="/advertise/apply?tier=pioneer" className="atlas-button-amber">
              Apply for Pioneer
            </a>

            <span
              style={{
                color: "rgba(253,250,243,0.42)",
                fontSize: "12px",
              }}
            >
              Subject to campaign suitability and availability.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
