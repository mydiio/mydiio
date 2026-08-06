import { colors } from "@/design";

type ClosingSceneProps = {
  progress: number;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function ClosingScene({ progress }: ClosingSceneProps) {
  const eyebrowProgress = clamp(progress / 0.13);
  const headingProgress = clamp((progress - 0.05) / 0.22);
  const proofProgress = clamp((progress - 0.22) / 0.2);
  const bodyProgress = clamp((progress - 0.38) / 0.16);
  const actionsProgress = clamp((progress - 0.55) / 0.18);
  const footerProgress = clamp((progress - 0.76) / 0.16);
  const glowProgress = clamp((progress - 0.08) / 0.78);

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100svh",
        overflow: "hidden",
        background: colors.cream,
        color: colors.ink,
        fontFamily: '"DM Sans", system-ui, sans-serif',
      }}
    >
      <style>{`
        .atlas-closing-actions a,
        .atlas-closing-footer a {
          transition:
            transform 0.25s cubic-bezier(0.22,1,0.36,1),
            opacity 0.25s ease,
            background 0.25s ease;
        }

        .atlas-closing-actions a:hover {
          transform: translateY(-2px);
        }

        .atlas-closing-footer a:hover {
          opacity: 0.68;
        }

        .atlas-closing-actions a:focus-visible,
        .atlas-closing-footer a:focus-visible {
          outline: 2px solid #F5A623;
          outline-offset: 4px;
        }

        @media (max-width: 760px) {
          .atlas-closing-shell {
            padding-top: 38px !important;
            padding-bottom: 18px !important;
          }

          .atlas-closing-actions {
            margin-top: 32px !important;
          }

          .atlas-closing-actions {
            flex-direction: column !important;
            align-items: stretch !important;
          }

          .atlas-closing-actions a {
            width: 100% !important;
          }

          .atlas-closing-proof {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
            text-align: left !important;
          }

          .atlas-closing-footer {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>

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
            left: "50%",
            top: "46%",
            width: "72vw",
            height: "72vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(245,166,35,0.14), rgba(245,166,35,0.04) 34%, transparent 68%)",
            opacity: 0.45 + glowProgress * 0.55,
            transform: `translate(-50%, -50%) scale(${0.72 + glowProgress * 0.28})`,
            transformOrigin: "center",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "min(760px, 70vw)",
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(232,146,10,0.42), transparent)",
            transform: `translateX(-50%) scaleX(${actionsProgress})`,
            transformOrigin: "center",
          }}
        />
      </div>

      <div
        className="atlas-closing-shell"
        style={{
          position: "relative",
          zIndex: 2,
          width: "min(1360px, calc(100% - 96px))",
          height: "100%",
          marginInline: "auto",
          padding: "clamp(54px, 7vh, 82px) 0 28px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "grid",
            placeItems: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "960px",
              marginInline: "auto",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "11px",
                marginBottom: "20px",
                color: colors.amberDeep,
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
                  width: "28px",
                  height: "1px",
                  background: colors.amber,
                }}
              />
              The network is moving
              <span
                aria-hidden="true"
                style={{
                  width: "28px",
                  height: "1px",
                  background: colors.amber,
                }}
              />
            </div>

            <h2
              className="atlas-commercial-heading"
              style={{
                margin: 0,
                color: colors.ink,
                fontSize: "clamp(56px, 7.4vw, 116px)",
                fontWeight: 600,
                lineHeight: 0.88,
                letterSpacing: "-0.075em",
                opacity: headingProgress,
                transform: `translateY(${(1 - headingProgress) * 26}px)`,
              }}
            >
              The future of passenger advertising
              <br />
              is already moving.
            </h2>

            <div
              className="atlas-closing-proof"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: "clamp(18px, 3vw, 42px)",
                maxWidth: "840px",
                margin: "clamp(30px, 4vh, 46px) auto 0",
                padding: "20px 0",
                borderTop: "1px solid var(--atlas-border-light)",
                borderBottom: "1px solid var(--atlas-border-light)",
                opacity: proofProgress,
                transform: `translateY(${(1 - proofProgress) * 18}px)`,
              }}
            >
              {[
                ["Every journey", "Measured."],
                ["Every campaign", "Verified."],
                ["Every play", "Accounted for."],
              ].map(([label, value]) => (
                <div key={label}>
                  <div
                    style={{
                      color: "rgba(26,26,24,0.43)",
                      fontSize: "10px",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    {label}
                  </div>

                  <div
                    style={{
                      marginTop: "7px",
                      fontSize: "clamp(18px, 1.65vw, 25px)",
                      fontWeight: 650,
                      letterSpacing: "-0.035em",
                    }}
                  >
                    {value}
                  </div>
                </div>
              ))}
            </div>

            <p
              className="atlas-commercial-copy"
              style={{
                maxWidth: "58ch",
                margin: "clamp(22px, 2.8vh, 32px) auto 0",
                color: "var(--atlas-copy-dark)",
                fontSize: "clamp(15px, 1.18vw, 19px)",
                lineHeight: 1.55,
                opacity: bodyProgress,
                transform: `translateY(${(1 - bodyProgress) * 16}px)`,
              }}
            >
              Launch GPS-verified campaigns across Colombo today, or join the driver network helping
              build Sri Lanka&apos;s first connected passenger network.
            </p>

            <div
              className="atlas-closing-actions atlas-closing-paths"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "14px",
                marginTop: "clamp(42px, 5.5vh, 60px)",
                opacity: actionsProgress,
                transform: `translateY(${(1 - actionsProgress) * 14}px)`,
              }}
            >
              <a href="/advertise/apply" className="atlas-button-primary">
                Advertise with mydiio
              </a>

              <a href="/drive" className="atlas-button-secondary">
                Join the driver network
              </a>
            </div>
          </div>
        </div>

        <footer
          className="atlas-closing-footer"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) auto minmax(0, 1fr)",
            gap: "34px",
            alignItems: "end",
            paddingTop: "24px",
            borderTop: "1px solid var(--atlas-border-light)",
            opacity: footerProgress,
            transform: `translateY(${(1 - footerProgress) * 10}px)`,
          }}
        >
          <div
            aria-label="mydiio"
            style={{
              display: "inline-flex",
              color: colors.ink,
              fontSize: "24px",
              fontWeight: 750,
              letterSpacing: "-0.055em",
            }}
          >
            <span>myd</span>
            <span style={{ color: colors.amber }}>ii</span>
            <span>o</span>
          </div>

          <nav
            aria-label="Footer"
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "22px",
            }}
          >
            {[
              ["Advertise", "/advertise"],
              ["Drive", "/drive"],
              ["Investors", "/investors"],
              ["About", "/about"],
              ["Contact", "/contact"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                style={{
                  color: "rgba(26,26,24,0.58)",
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                {label}
              </a>
            ))}
          </nav>

          <div
            aria-label="© 2026 mydiio"
            style={{
              justifySelf: "end",
              color: "rgba(26,26,24,0.42)",
              fontSize: "12px",
              textAlign: "right",
            }}
          >
            © 2026 myd
            <span style={{ color: colors.amberDeep }}>ii</span>o
          </div>
        </footer>
      </div>
    </div>
  );
}
