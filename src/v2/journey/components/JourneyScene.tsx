import { colors } from "@/design";

type JourneySceneProps = {
  progress: number;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function range(value: number, start: number, end: number) {
  return clamp((value - start) / (end - start));
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

function easeInOutCubic(value: number) {
  return value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function TabletFrame({
  entrance,
  passenger,
  campaign,
  verification,
  exit,
}: {
  entrance: number;
  passenger: number;
  campaign: number;
  verification: number;
  exit: number;
}) {
  const campaignVisibility = campaign * (1 - verification * 0.72);

  return (
    <div
      className="journey-device journey-motion"
      style={{
        position: "absolute",
        zIndex: 8,
        left: "50%",
        top: "50%",
        width: "clamp(290px, 34vw, 500px)",
        aspectRatio: "1.52 / 1",
        padding: "10px",
        boxSizing: "border-box",
        overflow: "hidden",
        borderRadius: "clamp(21px, 2.1vw, 30px)",
        background: colors.ink,
        opacity: entrance * (1 - exit),
        transform: `translate(-50%, -50%) scale(${0.92 + entrance * 0.08 - exit * 0.12})`,
        boxShadow: `
          0 34px 96px -44px rgba(26,26,24,0.62),
          0 0 ${verification * 52}px rgba(245,166,35,${verification * 0.14})
        `,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          borderRadius: "clamp(13px, 1.35vw, 20px)",
          background: colors.cream,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            padding: "clamp(15px, 1.55vw, 23px)",
            boxSizing: "border-box",
            opacity: passenger * (1 - campaignVisibility),
            transform: `translateY(${(1 - passenger) * 14}px)`,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              <div
                style={{
                  color: colors.ink,
                  fontSize: "clamp(19px, 2vw, 29px)",
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: "-0.05em",
                }}
              >
                10:42 AM
              </div>

              <div
                style={{
                  marginTop: "5px",
                  color: "rgba(26,26,24,0.48)",
                  fontSize: "clamp(7px, 0.65vw, 10px)",
                  fontWeight: 600,
                }}
              >
                Monday, 21 April
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  color: "rgba(26,26,24,0.5)",
                  fontSize: "clamp(7px, 0.65vw, 10px)",
                  fontWeight: 600,
                }}
              >
                Colombo
              </div>

              <div
                style={{
                  marginTop: "3px",
                  color: colors.ink,
                  fontSize: "clamp(18px, 1.8vw, 26px)",
                  fontWeight: 700,
                }}
              >
                28°
              </div>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "clamp(7px, 0.8vw, 11px)",
              marginTop: "clamp(14px, 1.4vw, 20px)",
            }}
          >
            {[
              ["News", "Morning headlines"],
              ["Nearby", "Places along the route"],
              ["Community", "Updates and events"],
            ].map(([title, body], index) => {
              const itemProgress = easeOutCubic(
                range(passenger, index * 0.12, 0.55 + index * 0.12),
              );

              return (
                <div
                  key={title}
                  style={{
                    minHeight: "clamp(68px, 7vw, 100px)",
                    padding: "clamp(9px, 0.9vw, 13px)",
                    boxSizing: "border-box",
                    borderRadius: "clamp(9px, 0.9vw, 13px)",
                    border: "1px solid rgba(26,26,24,0.09)",
                    background: "rgba(255,255,255,0.74)",
                    opacity: itemProgress,
                    transform: `translateY(${(1 - itemProgress) * 11}px)`,
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      width: "8px",
                      height: "8px",
                      marginBottom: "9px",
                      borderRadius: "50%",
                      border: `1px solid ${colors.amber}`,
                      background: "rgba(245,166,35,0.12)",
                    }}
                  />

                  <div
                    style={{
                      color: colors.ink,
                      fontSize: "clamp(7px, 0.68vw, 10px)",
                      fontWeight: 700,
                    }}
                  >
                    {title}
                  </div>

                  <div
                    style={{
                      marginTop: "4px",
                      color: "rgba(26,26,24,0.48)",
                      fontSize: "clamp(5px, 0.52vw, 8px)",
                      fontWeight: 600,
                      lineHeight: 1.3,
                    }}
                  >
                    {body}
                  </div>
                </div>
              );
            })}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "clamp(9px, 1vw, 14px)",
              padding: "clamp(9px, 0.9vw, 12px)",
              borderRadius: "clamp(8px, 0.85vw, 11px)",
              border: "1px solid rgba(245,166,35,0.34)",
              background: "rgba(245,166,35,0.075)",
            }}
          >
            <span
              style={{
                flex: "0 0 auto",
                width: "9px",
                height: "9px",
                borderRadius: "50%",
                background: colors.amber,
              }}
            />

            <div>
              <div
                style={{
                  color: colors.ink,
                  fontSize: "clamp(7px, 0.68vw, 10px)",
                  fontWeight: 700,
                }}
              >
                Journey information
              </div>

              <div
                style={{
                  marginTop: "2px",
                  color: "rgba(26,26,24,0.48)",
                  fontSize: "clamp(5px, 0.52vw, 8px)",
                  fontWeight: 600,
                }}
              >
                Useful content throughout the ride
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            padding: "clamp(20px, 2.4vw, 34px)",
            boxSizing: "border-box",
            background: "linear-gradient(145deg, #1A1A18, #2B2925)",
            opacity: campaignVisibility,
            transform: `scale(${0.96 + campaignVisibility * 0.04})`,
          }}
        >
          <div
            style={{
              width: "100%",
              textAlign: "center",
            }}
          >
            <div
              style={{
                color: colors.amber,
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
              }}
            >
              Now playing
            </div>

            <div
              style={{
                marginTop: "clamp(14px, 1.7vw, 23px)",
                color: colors.cream,
                fontSize: "clamp(32px, 4vw, 58px)",
                fontWeight: 600,
                lineHeight: 0.95,
                letterSpacing: "-0.055em",
              }}
            >
              Your business,
              <br />
              already in motion.
            </div>

            <div
              style={{
                width: "54%",
                height: "3px",
                margin: "clamp(22px, 2.3vw, 32px) auto 0",
                overflow: "hidden",
                borderRadius: "999px",
                background: "rgba(253,250,243,0.12)",
              }}
            >
              <div
                style={{
                  width: `${campaignVisibility * 100}%`,
                  height: "100%",
                  borderRadius: "inherit",
                  background: colors.amber,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MovingRoute({ progress, fade }: { progress: number; fade: number }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1000 520"
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        zIndex: 2,
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: progress * (1 - fade),
      }}
    >
      <path
        d="
          M100 360
          C230 265 320 335 425 260
          C535 182 635 248 730 175
          C800 121 860 128 915 96
        "
        fill="none"
        stroke="rgba(26,26,24,0.1)"
        strokeWidth="2"
        strokeDasharray="7 10"
      />

      <path
        d="
          M100 360
          C230 265 320 335 425 260
          C535 182 635 248 730 175
          C800 121 860 128 915 96
        "
        fill="none"
        stroke={colors.amber}
        strokeWidth="3"
        pathLength="1"
        strokeDasharray={`${progress} 1`}
        strokeLinecap="round"
      />

      <circle
        cx={100 + progress * 815}
        cy={360 - progress * 264 + Math.sin(progress * Math.PI * 3) * 24}
        r="8"
        fill={colors.amber}
        style={{
          filter: "drop-shadow(0 0 14px rgba(245,166,35,0.48))",
        }}
      />
    </svg>
  );
}

function VerificationCard({ progress, exit }: { progress: number; exit: number }) {
  const rows = [
    ["Vehicle", "MYD-014"],
    ["Location", "Marine Drive"],
    ["Time", "10:42 AM"],
    ["Campaign", "Morning Reach"],
  ];

  return (
    <div
      className="journey-verification journey-motion"
      style={{
        position: "absolute",
        zIndex: 12,
        left: "50%",
        top: "50%",
        width: "clamp(290px, 34vw, 500px)",
        padding: "clamp(20px, 2vw, 29px)",
        boxSizing: "border-box",
        borderRadius: "clamp(21px, 2.1vw, 30px)",
        background: "rgba(255,255,255,0.88)",
        border: "1px solid rgba(26,26,24,0.08)",
        boxShadow: "0 30px 80px -45px rgba(26,26,24,0.42)",
        backdropFilter: "blur(22px) saturate(145%)",
        WebkitBackdropFilter: "blur(22px) saturate(145%)",
        opacity: progress * (1 - easeInOutCubic(range(exit, 0.58, 1))),
        transform: `translate(-50%, -50%) translateY(${
          (1 - progress) * 12
        }px) scale(${0.88 + progress * 0.12 + exit * 0.08})`,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              color: colors.amberDeep,
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Journey verified
          </div>

          <div
            style={{
              marginTop: "7px",
              color: colors.ink,
              fontSize: "clamp(24px, 2.5vw, 35px)",
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: "-0.045em",
            }}
          >
            Play recorded.
          </div>
        </div>

        <div
          style={{
            display: "grid",
            placeItems: "center",
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            background: colors.amber,
            color: colors.ink,
            fontSize: "20px",
            fontWeight: 800,
          }}
        >
          ✓
        </div>
      </div>

      <div
        style={{
          marginTop: "24px",
          borderTop: "1px solid rgba(26,26,24,0.08)",
        }}
      >
        {rows.map(([label, value], index) => {
          const rowProgress = easeOutCubic(range(progress, index * 0.12, 0.54 + index * 0.12));

          return (
            <div
              key={label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "20px",
                padding: "13px 0",
                borderBottom: "1px solid rgba(26,26,24,0.07)",
                opacity: rowProgress,
                transform: `translateY(${(1 - rowProgress) * 8}px)`,
              }}
            >
              <span
                style={{
                  color: "rgba(26,26,24,0.47)",
                  fontSize: "12px",
                  fontWeight: 650,
                }}
              >
                {label}
              </span>

              <span
                style={{
                  color: colors.ink,
                  fontSize: "12px",
                  fontWeight: 700,
                  textAlign: "right",
                }}
              >
                {value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WeeklyReport({ progress, exit }: { progress: number; exit: number }) {
  const reportRows = [
    ["MYD-014", "Marine Drive", "10:42", "Verified"],
    ["MYD-008", "Dehiwala", "11:06", "Verified"],
    ["MYD-021", "Mount Lavinia", "11:18", "Verified"],
  ];

  return (
    <div
      className="journey-report journey-motion"
      style={{
        position: "absolute",
        zIndex: 14,
        left: "50%",
        top: "50%",
        width: "clamp(340px, 46vw, 660px)",
        padding: "clamp(21px, 2.3vw, 32px)",
        boxSizing: "border-box",
        borderRadius: "clamp(22px, 2.2vw, 30px)",
        background: "rgba(255,255,255,0.92)",
        border: "1px solid rgba(26,26,24,0.08)",
        boxShadow: "0 38px 100px -52px rgba(26,26,24,0.48)",
        opacity: progress * (1 - exit),
        transform: `translate(-50%, -50%) translateY(${
          (1 - progress) * 8
        }px) scale(${0.76 + progress * 0.24 - exit * 0.1})`,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: "20px",
        }}
      >
        <div>
          <div
            style={{
              color: colors.amberDeep,
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Monday report
          </div>

          <div
            style={{
              marginTop: "7px",
              color: colors.ink,
              fontSize: "clamp(25px, 2.7vw, 39px)",
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: "-0.048em",
            }}
          >
            Every journey,
            <br />
            accounted for.
          </div>
        </div>

        <div
          style={{
            color: "rgba(26,26,24,0.45)",
            fontSize: "11px",
            fontWeight: 650,
          }}
        >
          Week 17
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "0.8fr 1.4fr 0.8fr 0.9fr",
          gap: "12px",
          marginTop: "26px",
          padding: "0 0 11px",
          borderBottom: "1px solid rgba(26,26,24,0.09)",
          color: "rgba(26,26,24,0.4)",
          fontSize: "9px",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        <span>Vehicle</span>
        <span>Location</span>
        <span>Time</span>
        <span>Status</span>
      </div>

      {reportRows.map((row, index) => {
        const rowProgress = easeOutCubic(range(progress, index * 0.14, 0.6 + index * 0.14));

        return (
          <div
            key={row[0]}
            style={{
              display: "grid",
              gridTemplateColumns: "0.8fr 1.4fr 0.8fr 0.9fr",
              gap: "12px",
              padding: "14px 0",
              borderBottom: "1px solid rgba(26,26,24,0.07)",
              color: colors.ink,
              fontSize: "11px",
              fontWeight: 650,
              opacity: rowProgress,
              transform: `translateY(${(1 - rowProgress) * 9}px)`,
            }}
          >
            <span>{row[0]}</span>
            <span>{row[1]}</span>
            <span>{row[2]}</span>

            <span
              style={{
                color: colors.amberDeep,
              }}
            >
              {row[3]}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function JourneyScene({ progress }: JourneySceneProps) {
  const sceneIn = easeOutCubic(range(progress, 0.0, 0.06));

  const routeIn = easeOutCubic(range(progress, 0.04, 0.18));

  const deviceIn = easeOutCubic(range(progress, 0.07, 0.18));

  const passengerIn = easeOutCubic(range(progress, 0.07, 0.21));

  const campaignIn = easeInOutCubic(range(progress, 0.24, 0.39));

  const verificationIn = easeOutCubic(range(progress, 0.43, 0.56));

  const deviceExit = easeInOutCubic(range(progress, 0.45, 0.57));

  const verificationExit = easeInOutCubic(range(progress, 0.57, 0.67));

  const reportIn = easeOutCubic(range(progress, 0.58, 0.69));

  const reportExit = easeInOutCubic(range(progress, 0.8, 0.87));
  const finalCopyIn = easeOutCubic(range(progress, 0.86, 0.93));

  const headlineOut = easeInOutCubic(range(progress, 0.38, 0.6));

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
        .journey-cinematic-frame {
          width: min(1240px, calc(100% - 56px));
        }

        .journey-cinematic-heading {
          font-size: clamp(40px, 4.3vw, 68px);
        }

        .journey-cinematic-stage {
          width: min(960px, 80vw);
          height: min(535px, 58vh);
        }

        @media (max-width: 700px) {
          .journey-cinematic-frame {
            width: calc(100% - 28px);
          }

          .journey-cinematic-heading {
            font-size: clamp(34px, 9.4vw, 47px);
          }

          .journey-cinematic-stage {
            width: 100%;
            height: min(480px, 55vh);
          }

          .journey-report {
            width: min(94vw, 470px) !important;
          }

          .journey-verification {
            width: min(88vw, 390px) !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .journey-motion {
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
          top: "55%",
          width: "min(980px, 92vw)",
          height: "min(980px, 92vw)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(245,166,35,0.1), rgba(245,166,35,0.02) 43%, transparent 70%)",
          opacity: (0.16 + verificationIn * 0.32) * (1 - finalCopyIn),
          transform: "translate(-50%, -50%)",
        }}
      />

      <div
        className="journey-cinematic-frame"
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          marginInline: "auto",
          padding: "clamp(88px, 9.5vh, 108px) 0 28px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          opacity: sceneIn,
          transform: `translateY(${(1 - sceneIn) * 26}px)`,
        }}
      >
        <header
          className="journey-motion"
          style={{
            position: "relative",
            zIndex: 20,
            textAlign: "center",
            opacity: 1 - headlineOut,
            transform: `translateY(${-headlineOut * 22}px) scale(${1 - headlineOut * 0.05})`,
            transformOrigin: "center top",
          }}
        >
          <div
            style={{
              color: colors.amberDeep,
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            One journey in motion
          </div>

          <h2
            className="journey-cinematic-heading"
            style={{
              margin: "13px auto 0",
              maxWidth: "13ch",
              fontWeight: 600,
              lineHeight: 0.96,
              letterSpacing: "-0.058em",
            }}
          >
            Watch one journey become trusted data.
          </h2>
        </header>

        <div
          className="journey-cinematic-stage"
          style={{
            position: "relative",
            margin: "clamp(16px, 2.4vh, 28px) auto 0",
          }}
        >
          <TabletFrame
            entrance={deviceIn}
            passenger={passengerIn}
            campaign={campaignIn}
            verification={verificationIn}
            exit={deviceExit}
          />

          <VerificationCard progress={verificationIn} exit={verificationExit} />

          <WeeklyReport progress={reportIn} exit={reportExit} />
        </div>

        <div
          className="journey-motion"
          style={{
            position: "absolute",
            zIndex: 30,
            left: "50%",
            top: "50%",
            width: "min(940px, calc(100% - 36px))",
            margin: 0,
            textAlign: "center",
            opacity: finalCopyIn,
            transform: `translate(-50%, -50%) translateY(${
              (1 - finalCopyIn) * 210
            }px) scale(${0.96 + finalCopyIn * 0.04})`,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              color: colors.amberDeep,
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Proof, not estimates.
          </div>

          <p
            style={{
              margin: "16px auto 0",
              maxWidth: "18ch",
              color: colors.ink,
              fontSize: "clamp(42px, 5.2vw, 76px)",
              fontWeight: 600,
              lineHeight: 0.95,
              letterSpacing: "-0.062em",
            }}
          >
            Every journey is recorded,
            <br />
            verified and reported.
          </p>
        </div>
      </div>
    </div>
  );
}
