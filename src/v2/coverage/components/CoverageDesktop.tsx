import { colors } from "@/design";
import { CoverageRoute } from "./CoverageRoute";

type CoverageSceneProps = {
  progress: number;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function CoverageDesktop({ progress }: CoverageSceneProps) {
  const eyebrowProgress = clamp(progress / 0.1);
  const headingProgress = clamp((progress - 0.04) / 0.16);
  const bodyProgress = clamp((progress - 0.1) / 0.15);
  const stageProgress = clamp((progress - 0.18) / 0.2);
  const routeProgress = clamp((progress - 0.22) / 0.7);
  const finalProgress = clamp((progress - 0.88) / 0.09);

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        height: "100svh",
        overflow: "hidden",
        background: "#F2E7D5",
        color: colors.ink,
        fontFamily: '"DM Sans", system-ui, sans-serif',
      }}
    >
      <style>{`
        @media (max-width: 900px) {
          .atlas-coverage-header {
            grid-template-columns: 1fr !important;
          }

          .atlas-coverage-stage {
            padding: 20px 16px 18px !important;
          }

          .atlas-coverage-route {
            transform: scale(0.84);
            transform-origin: center center;
          }
        }
      `}</style>

      <div
        style={{
          width: "min(1360px, calc(100% - 96px))",
          height: "100%",
          marginInline: "auto",
          padding: "clamp(34px, 4.5vh, 52px) 0 24px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          className="atlas-coverage-header"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 0.96fr) minmax(340px, 0.44fr)",
            gap: "clamp(54px, 7vw, 112px)",
            alignItems: "end",
          }}
        >
          <div>
            <div
              style={{
                marginBottom: "15px",
                color: colors.amberDeep,
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                opacity: eyebrowProgress,
                transform: `translateY(${(1 - eyebrowProgress) * 10}px)`,
              }}
            >
              LIVE TODAY
            </div>

            <h2
              style={{
                margin: 0,
                maxWidth: "11ch",
                color: colors.ink,
                fontSize: "clamp(48px, 5.8vw, 86px)",
                fontWeight: 600,
                lineHeight: 0.93,
                letterSpacing: "-0.062em",
                opacity: headingProgress,
                transform: `translateY(${(1 - headingProgress) * 18}px)`,
              }}
            >
              Campaigns begin in Colombo.
            </h2>
          </div>

          <div
            style={{
              maxWidth: "440px",
              paddingBottom: "7px",
              opacity: bodyProgress,
              transform: `translateY(${(1 - bodyProgress) * 16}px)`,
            }}
          >
            <p
              style={{
                margin: 0,
                color: "rgba(26,26,24,0.62)",
                fontSize: "clamp(16px, 1.18vw, 19px)",
                lineHeight: 1.58,
              }}
            >
              Our first operating corridor serves Colombo. Every campaign starts here while the
              network expands corridor by corridor.
            </p>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "9px",
                marginTop: "18px",
                color: "rgba(26,26,24,0.54)",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: "9px",
                  height: "9px",
                  borderRadius: "50%",
                  background: colors.amber,
                  boxShadow: "0 0 0 5px rgba(245,166,35,0.12)",
                }}
              />
              Live in Colombo
            </div>
          </div>
        </div>

        <div
          className="atlas-coverage-stage"
          style={{
            position: "relative",
            marginTop: "clamp(16px, 2vh, 24px)",
            padding: "18px 28px 16px",
            minHeight: "380px",
            borderRadius: "28px",
            overflow: "hidden",
            background: "linear-gradient(145deg, rgba(255,255,255,0.91), rgba(253,250,243,0.96))",
            border: "1px solid rgba(26,26,24,0.065)",
            boxShadow:
              "0 30px 72px -42px rgba(26,26,24,0.28), 0 8px 22px -16px rgba(26,26,24,0.12)",
            opacity: stageProgress,
            transform: `translateY(${
              (1 - stageProgress) * 22
            }px) scale(${0.985 + stageProgress * 0.015})`,
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.42,
              backgroundImage:
                "linear-gradient(rgba(26,26,24,0.026) 1px, transparent 1px), linear-gradient(90deg, rgba(26,26,24,0.026) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
              maskImage:
                "linear-gradient(to bottom, transparent 0%, black 24%, black 80%, transparent 100%)",
              pointerEvents: "none",
            }}
          />

          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "50%",
              bottom: "-82%",
              width: "76%",
              aspectRatio: "1 / 1",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(245,166,35,0.18), rgba(245,166,35,0.05) 34%, transparent 67%)",
              transform: "translateX(-50%)",
              pointerEvents: "none",
            }}
          />

          <div
            className="atlas-coverage-route"
            style={{
              position: "relative",
              zIndex: 2,
            }}
          >
            <CoverageRoute progress={routeProgress} />
          </div>

          <div
            style={{
              position: "absolute",
              left: "50%",
              bottom: "14px",
              zIndex: 4,
              opacity: finalProgress,
              transform: `translate(-50%, ${(1 - finalProgress) * 8}px)`,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "9px 15px",
                borderRadius: "999px",
                border: "1px solid rgba(232,146,10,0.42)",
                background: "rgba(255,255,255,0.84)",
                color: colors.ink,
                fontSize: "13px",
                fontWeight: 650,
                boxShadow: "0 12px 30px -22px rgba(26,26,24,0.26)",
                backdropFilter: "blur(10px)",
                whiteSpace: "nowrap",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  display: "grid",
                  placeItems: "center",
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  background: "rgba(245,166,35,0.16)",
                  color: colors.amberDeep,
                  fontSize: "12px",
                  fontWeight: 700,
                }}
              ></span>
              Operating today.
              <br />
              Growing corridor by corridor.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
