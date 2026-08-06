import { colors } from "@/design";

type PioneerMobileProps = {
  progress: number;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

export function PioneerMobile({ progress }: PioneerMobileProps) {
  const safeProgress = clamp(progress);

  const introProgress = easeOutCubic(clamp(safeProgress / 0.18));

  const positionsProgress = easeOutCubic(clamp((safeProgress - 0.2) / 0.48));

  const ctaProgress = easeOutCubic(clamp((safeProgress - 0.7) / 0.2));

  const filledPositions = Math.round(positionsProgress * 10);

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        height: "100svh",
        overflow: "hidden",
        background: colors.ink,
        color: colors.cream,
        fontFamily: '"DM Sans", system-ui, sans-serif',
      }}
    >
      <div
        aria-hidden="true"
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
            top: "-8%",
            right: "-48%",
            width: "105vw",
            height: "105vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(245,166,35,0.18), rgba(245,166,35,0.04) 40%, transparent 70%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "-40%",
            left: "-42%",
            width: "110vw",
            height: "110vw",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(245,166,35,0.08), transparent 68%)",
          }}
        />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "calc(100% - 36px)",
          height: "100%",
          marginInline: "auto",
          padding: "22px 0 16px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <header
          style={{
            flex: "0 0 auto",
            opacity: introProgress,
            transform: `translateY(${(1 - introProgress) * 16}px)`,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              gap: "9px",
              marginBottom: "13px",
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
                width: "24px",
                height: "1px",
              }}
            />
            Pioneer
          </div>

          <h2
            className="atlas-commercial-heading"
            style={{
              margin: 0,
              maxWidth: "8.5ch",
              fontSize: "clamp(42px, 12vw, 52px)",
              fontWeight: 600,
              lineHeight: 0.9,
              letterSpacing: "-0.068em",
            }}
          >
            Ten founding partners.
            <br />
            Never more.
          </h2>

          <p
            className="atlas-section-copy atlas-section-copy-light"
            style={{
              margin: "15px 0 0",
              maxWidth: "33ch",
              color: "rgba(253,250,243,0.62)",
              fontSize: "13px",
              lineHeight: 1.45,
              letterSpacing: "-0.018em",
            }}
          >
            The first ten businesses receive permanent founding recognition and launch benefits that
            will not be offered again as the network grows.
          </p>
        </header>

        <div
          style={{
            position: "relative",
            flex: 1,
            minHeight: 0,
            marginTop: "18px",
            padding: "20px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            borderRadius: "var(--atlas-panel-radius)",
            background: "linear-gradient(155deg, rgba(255,255,255,0.045), rgba(245,166,35,0.055))",
            border: "1px solid rgba(245,166,35,0.2)",
            boxShadow: "0 30px 70px -44px rgba(0,0,0,0.88)",
            opacity: positionsProgress,
            transform: `translateY(${
              (1 - positionsProgress) * 18
            }px) scale(${0.98 + positionsProgress * 0.02})`,
          }}
        >
          <div
            style={{
              color: "rgba(253,250,243,0.44)",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Founding positions
          </div>

          <div
            style={{
              display: "grid",
              gap: 0,
              marginTop: "14px",
              borderTop: "1px solid rgba(253,250,243,0.1)",
            }}
          >
            {[
              ["Rate", "Fixed for subscription life"],
              ["Category", "12-month corridor exclusivity"],
              ["Coverage", "Priority across the full fleet"],
              ["Status", "One of ten founding partners"],
            ].map(([label, value]) => (
              <div
                key={label}
                style={{
                  display: "grid",
                  gridTemplateColumns: "82px minmax(0, 1fr)",
                  gap: "10px",
                  padding: "8px 0",
                  borderBottom: "1px solid rgba(253,250,243,0.075)",
                }}
              >
                <span
                  style={{
                    color: colors.amber,
                    fontSize: "8px",
                    fontWeight: 700,
                    letterSpacing: "0.09em",
                    textTransform: "uppercase",
                  }}
                >
                  {label}
                </span>

                <span
                  style={{
                    color: "rgba(253,250,243,0.74)",
                    fontSize: "10px",
                    fontWeight: 600,
                    lineHeight: 1.3,
                    textAlign: "right",
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              alignItems: "baseline",
              gap: "9px",
              marginTop: "12px",
            }}
          >
            <div
              style={{
                color: colors.cream,
                fontSize: "clamp(76px, 23vw, 96px)",
                fontWeight: 600,
                lineHeight: 0.86,
                letterSpacing: "-0.08em",
              }}
            >
              10
            </div>

            <div
              style={{
                color: colors.amber,
                fontSize: "20px",
                fontWeight: 650,
                lineHeight: 1,
              }}
            >
              spots ever
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
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
                    aspectRatio: "1 / 1",
                    borderRadius: "50%",
                    border: active
                      ? `1px solid ${colors.amber}`
                      : "1px solid rgba(253,250,243,0.14)",
                    background: active ? "rgba(245,166,35,0.15)" : "rgba(253,250,243,0.025)",
                    boxShadow: active ? "0 0 0 5px rgba(245,166,35,0.045)" : "none",
                    opacity: active ? 1 : 0.4,
                    transform: active ? "scale(1)" : "scale(0.88)",
                    transition: "background 0.3s ease, border 0.3s ease, transform 0.35s ease",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      color: active ? colors.amber : "rgba(253,250,243,0.3)",
                      fontSize: "9px",
                      fontWeight: 700,
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
              marginTop: "auto",
              paddingTop: "17px",
              borderTop: "1px solid rgba(253,250,243,0.1)",
              color: "rgba(253,250,243,0.54)",
              fontSize: "12px",
              lineHeight: 1.45,
            }}
          >
            Ten positions only. When all ten are taken, Pioneer closes permanently.
          </div>
        </div>

        <div
          style={{
            flex: "0 0 auto",
            marginTop: "12px",
            opacity: ctaProgress,
            transform: `translateY(${(1 - ctaProgress) * 12}px)`,
          }}
        >
          <a
            href="/advertise/apply"
            className="atlas-button-amber"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            Apply for Pioneer
          </a>

          <div
            style={{
              marginTop: "8px",
              color: "rgba(253,250,243,0.4)",
              fontSize: "10px",
              lineHeight: 1.35,
              textAlign: "center",
            }}
          >
            Subject to campaign suitability and availability.
          </div>
        </div>
      </div>
    </div>
  );
}
