import { colors } from "@/design";
import { packageTiers } from "../packageData";

type PackagesMobileProps = {
  progress: number;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

export function PackagesMobile({ progress }: PackagesMobileProps) {
  const safeProgress = clamp(progress);

  const copyProgress = Math.max(0.96, easeOutCubic(clamp(safeProgress / 0.12)));

  const cardsProgress = clamp((safeProgress - 0.15) / 0.72);

  const stagePosition =
    cardsProgress < 0.5
      ? cardsProgress * 4
      : cardsProgress < 0.76
        ? 2 + (cardsProgress - 0.5) * 3.15
        : 2.82 + (cardsProgress - 0.76) * 4.92;

  const activeIndex = Math.min(packageTiers.length - 1, Math.floor(stagePosition));

  const activeTier = packageTiers[activeIndex];

  const localProgress = clamp(stagePosition - activeIndex);

  const cardProgress = easeOutCubic(localProgress);

  const cardEntrance = activeIndex === 0 && cardsProgress < 0.01 ? 1 : cardProgress;

  const finalProgress = easeOutCubic(clamp((safeProgress - 0.91) / 0.06));

  const isPioneer = activeTier.name === "Pioneer";

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        height: "100svh",
        overflow: "hidden",
        background: colors.cream,
        color: colors.ink,
        fontFamily: '"DM Sans", system-ui, sans-serif',
      }}
    >
      <div
        style={{
          width: "calc(100% - 36px)",
          height: "100%",
          marginInline: "auto",
          padding: "20px 0 16px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <header
          style={{
            flex: "0 0 auto",
            opacity: copyProgress,
            transform: `translateY(${(1 - copyProgress) * 14}px)`,
          }}
        >
          <div
            style={{
              marginBottom: "9px",
              color: colors.amberDeep,
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            CAMPAIGNS
          </div>

          <h2
            style={{
              margin: 0,
              maxWidth: "8.8ch",
              fontSize: "clamp(38px, 11vw, 48px)",
              fontWeight: 600,
              lineHeight: 0.91,
              letterSpacing: "-0.064em",
            }}
          >
            One network.
            <br />
            Four ways to grow.
          </h2>

          <p
            style={{
              margin: "12px 0 0",
              maxWidth: "34ch",
              color: "rgba(26,26,24,0.6)",
              fontSize: "13px",
              lineHeight: 1.42,
              letterSpacing: "-0.018em",
            }}
          >
            Whether you're testing your first campaign or scaling across Colombo, there's a path
            built for your brand.
          </p>

          <div
            style={{
              marginTop: "10px",
              color: colors.ink,
              fontSize: "11px",
              fontWeight: 700,
            }}
          >
            Campaigns from LKR 25,000 a month
          </div>
        </header>

        <div
          style={{
            position: "relative",
            flex: 1,
            minHeight: 0,
            marginTop: "12px",
            display: "grid",
            placeItems: "start center",
            paddingTop: "clamp(22px, 4svh, 34px)",
            boxSizing: "border-box",
          }}
        >
          <div
            key={activeTier.id}
            style={{
              width: "100%",
              minHeight: "clamp(285px, 38svh, 330px)",
              padding: "22px",
              boxSizing: "border-box",
              borderRadius: "25px",
              display: "flex",
              flexDirection: "column",
              background: isPioneer
                ? "linear-gradient(155deg, #171714 0%, #171714 65%, #4b3518 100%)"
                : "rgba(255,255,255,0.94)",
              color: isPioneer ? colors.cream : colors.ink,
              border: isPioneer
                ? "1px solid rgba(245,166,35,0.34)"
                : "1px solid rgba(26,26,24,0.07)",
              boxShadow: isPioneer
                ? "0 28px 60px -34px rgba(26,26,24,0.72)"
                : "0 28px 60px -36px rgba(26,26,24,0.28)",
              opacity: 0.72 + cardEntrance * 0.28,
              transform: `translateY(${
                (1 - cardEntrance) * 12
              }px) scale(${0.985 + cardEntrance * 0.015})`,
              willChange: "opacity, transform",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
              }}
            >
              <div
                style={{
                  color: colors.amberDeep,
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                }}
              >
                {String(activeIndex + 1).padStart(2, "0")}
              </div>

              {activeTier.emphasis ? (
                <div
                  style={{
                    padding: "7px 10px",
                    borderRadius: "999px",
                    background: isPioneer ? "rgba(245,166,35,0.15)" : "rgba(245,166,35,0.1)",
                    color: colors.amber,
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {activeTier.emphasis}
                </div>
              ) : null}
            </div>

            <div
              style={{
                marginTop: "30px",
                color: isPioneer ? "rgba(253,250,243,0.5)" : "rgba(26,26,24,0.44)",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              {activeTier.label}
            </div>

            <div
              style={{
                marginTop: "10px",
                fontSize: "clamp(38px, 11vw, 48px)",
                fontWeight: 650,
                lineHeight: 0.94,
                letterSpacing: "-0.06em",
              }}
            >
              {activeTier.name}
            </div>

            <div
              style={{
                marginTop: "14px",
                maxWidth: "30ch",
                color: isPioneer ? "rgba(253,250,243,0.62)" : "rgba(26,26,24,0.56)",
                fontSize: "13px",
                lineHeight: 1.42,
              }}
            >
              {activeTier.description}
            </div>

            <div
              style={{
                marginTop: "16px",
                color: isPioneer ? colors.amber : colors.ink,
                fontSize: "15px",
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              {activeTier.price}
            </div>

            <div
              style={{
                display: "grid",
                marginTop: "14px",
                borderTop: `1px solid ${
                  isPioneer
                    ? "rgba(253,250,243,0.12)"
                    : "rgba(26,26,24,0.08)"
                }`,
              }}
            >
              {activeTier.specs.map((spec) => (
                <div
                  key={spec.label}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr)",
                    gap: "12px",
                    padding: "9px 0",
                    borderBottom: `1px solid ${
                      isPioneer
                        ? "rgba(253,250,243,0.09)"
                        : "rgba(26,26,24,0.065)"
                    }`,
                  }}
                >
                  <span
                    style={{
                      color: isPioneer
                        ? "rgba(253,250,243,0.42)"
                        : "rgba(26,26,24,0.42)",
                      fontSize: "9px",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {spec.label}
                  </span>

                  <span
                    style={{
                      color: isPioneer
                        ? "rgba(253,250,243,0.88)"
                        : colors.ink,
                      fontSize: "11px",
                      fontWeight: 650,
                      lineHeight: 1.3,
                      textAlign: "right",
                    }}
                  >
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: "auto",
                paddingTop: "16px",
                borderTop: `1px solid ${
                  isPioneer ? "rgba(253,250,243,0.12)" : "rgba(26,26,24,0.08)"
                }`,
                color: isPioneer ? colors.amber : colors.ink,
                fontSize: "14px",
                fontWeight: 700,
              }}
            >
              {activeTier.footer}
            </div>
          </div>
        </div>

        <div
          style={{
            flex: "0 0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "7px",
            marginTop: "12px",
          }}
        >
          {packageTiers.map((tier, index) => {
            const active = index === activeIndex;

            const past = index < activeIndex;

            return (
              <div
                key={tier.id}
                style={{
                  minWidth: 0,
                  height: "3px",
                  overflow: "hidden",
                  borderRadius: "999px",
                  background: "rgba(26,26,24,0.08)",
                }}
              >
                <div
                  style={{
                    width:
                      finalProgress > 0.05
                        ? "100%"
                        : past
                          ? "100%"
                          : active
                            ? `${localProgress * 100}%`
                            : "0%",
                    height: "100%",
                    borderRadius: "inherit",
                    background: colors.amber,
                  }}
                />
              </div>
            );
          })}
        </div>

        <div
          style={{
            flex: "0 0 auto",
            display: "flex",
            justifyContent: "center",
            minHeight: "38px",
            marginTop: "10px",
            opacity: finalProgress,
            transform: `translateY(${
              (1 - finalProgress) * 9
            }px) scale(${0.97 + finalProgress * 0.03})`,
            willChange: "opacity, transform",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              padding: "8px 13px",
              borderRadius: "999px",
              border: "1px solid rgba(232,146,10,0.4)",
              background: "rgba(255,255,255,0.94)",
              color: colors.ink,
              fontSize: "11px",
              fontWeight: 700,
              boxShadow: "0 14px 30px -24px rgba(26,26,24,0.34)",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: colors.amber,
              }}
            />
            Every package includes GPS-verified reporting.
          </div>
        </div>
      </div>
    </div>
  );
}
