import { colors } from "@/design";

type ClosingSceneProps = {
  progress: number;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function ClosingScene({
  progress,
}: ClosingSceneProps) {
  const eyebrowProgress = clamp(progress / 0.14);
  const headingProgress = clamp((progress - 0.06) / 0.22);
  const bodyProgress = clamp((progress - 0.22) / 0.18);
  const actionsProgress = clamp((progress - 0.48) / 0.22);
  const footerProgress = clamp((progress - 0.7) / 0.2);

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
            transform: "translate(-50%, -50%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "min(760px, 70vw)",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(232,146,10,0.42), transparent)",
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
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                opacity: eyebrowProgress,
                transform: `translateY(${
                  (1 - eyebrowProgress) * 10
                }px)`,
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

              Start here

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
              style={{
                margin: 0,
                color: colors.ink,
                fontSize: "clamp(56px, 7.4vw, 116px)",
                fontWeight: 600,
                lineHeight: 0.88,
                letterSpacing: "-0.075em",
                opacity: headingProgress,
                transform: `translateY(${
                  (1 - headingProgress) * 26
                }px)`,
              }}
            >
              Put your campaign in motion.
            </h2>

            <p
              style={{
                maxWidth: "52ch",
                margin: "clamp(26px, 3.4vh, 38px) auto 0",
                color: "rgba(26,26,24,0.6)",
                fontSize: "clamp(17px, 1.35vw, 21px)",
                lineHeight: 1.55,
                opacity: bodyProgress,
                transform: `translateY(${
                  (1 - bodyProgress) * 16
                }px)`,
              }}
            >
              Reach passengers across Colombo with GPS-verified advertising,
              or join the driver network helping move the city.
            </p>

            <div
              className="atlas-closing-actions"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "14px",
                marginTop: "clamp(42px, 5.5vh, 60px)",
                opacity: actionsProgress,
                transform: `translateY(${
                  (1 - actionsProgress) * 14
                }px)`,
              }}
            >
              <a
                href="/advertise/apply"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "54px",
                  padding: "0 25px",
                  borderRadius: "999px",
                  background: colors.ink,
                  color: colors.cream,
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: 750,
                  letterSpacing: "-0.015em",
                  boxShadow:
                    "0 20px 46px -28px rgba(26,26,24,0.38)",
                }}
              >
                Advertise with mydiio
              </a>

              <a
                href="/drive"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "54px",
                  padding: "0 25px",
                  borderRadius: "999px",
                  border: "1px solid rgba(26,26,24,0.14)",
                  background: "rgba(255,255,255,0.56)",
                  color: colors.ink,
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: 700,
                  letterSpacing: "-0.015em",
                }}
              >
                Drive with mydiio
              </a>
            </div>
          </div>
        </div>

        <footer
          className="atlas-closing-footer"
          style={{
            display: "grid",
            gridTemplateColumns:
              "minmax(0, 1fr) auto minmax(0, 1fr)",
            gap: "34px",
            alignItems: "end",
            paddingTop: "24px",
            borderTop: "1px solid rgba(26,26,24,0.1)",
            opacity: footerProgress,
            transform: `translateY(${
              (1 - footerProgress) * 10
            }px)`,
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
            <span style={{ color: colors.amberDeep }}>ii</span>
            o
          </div>
        </footer>
      </div>
    </div>
  );
}
