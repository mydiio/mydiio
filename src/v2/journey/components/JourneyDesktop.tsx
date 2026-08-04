import { colors } from "@/design";
import { journeySteps } from "../journeyData";
import { JourneyReport } from "./JourneyReport";
import { JourneyStep } from "./JourneyStep";

type JourneySceneProps = {
  progress: number;
};

const PATH_LENGTH = 1000;

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function JourneyDesktop({ progress }: JourneySceneProps) {
  const routeProgress = clamp(progress);
  const dashOffset = PATH_LENGTH * (1 - routeProgress);

  const activeStepIndex = Math.min(
    journeySteps.length - 1,
    Math.floor(clamp(progress) * journeySteps.length),
  );

  const activeStep = journeySteps[activeStepIndex];
  const reportVisible = progress >= 0.82;

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        height: "100svh",
        overflow: "visible",
        background: colors.cream,
        color: colors.ink,
        fontFamily: '"DM Sans", system-ui, sans-serif',
      }}
    >
      <style>{`
        .atlas-proof-mobile {
          display: none;
        }

        @media (max-width: 900px) {
          .atlas-proof-layout {
            grid-template-columns: 1fr !important;
          }

          .atlas-proof-report {
            justify-content: center !important;
            padding-top: 24px !important;
          }

          .atlas-proof-route {
            display: none !important;
          }
        }

        @media (max-width: 560px) {
          .atlas-proof-desktop {
            display: none !important;
          }

          .atlas-proof-mobile {
            display: flex !important;
          }

          .atlas-proof-shell {
            width: calc(100% - 40px) !important;
            padding: 28px 0 22px !important;
            justify-content: flex-start !important;
          }

          .atlas-proof-heading {
            font-size: clamp(42px, 12.6vw, 56px) !important;
            max-width: 9ch !important;
            line-height: 0.92 !important;
          }

          .atlas-proof-intro {
            margin-top: 16px !important;
            font-size: 15px !important;
            line-height: 1.45 !important;
          }
        }
      `}</style>

      <div
        className="atlas-proof-shell"
        style={{
          width: "min(1380px, calc(100% - 48px))",
          height: "100%",
          marginInline: "auto",
          padding: "clamp(28px, 4vh, 52px) 0",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            maxWidth: "700px",
          }}
        >
          <div
            style={{
              marginBottom: "14px",
              color: colors.amberDeep,
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            How proof is created
          </div>

          <h2
            className="atlas-proof-heading"
            style={{
              margin: 0,
              fontSize: "clamp(48px, 6vw, 88px)",
              fontWeight: 600,
              lineHeight: 0.94,
              letterSpacing: "-0.06em",
            }}
          >
            Every play is proven.
          </h2>

          <p
            className="atlas-proof-intro"
            style={{
              margin: "22px 0 0",
              maxWidth: "560px",
              color: "rgba(26,26,24,0.64)",
              fontSize: "clamp(17px, 1.45vw, 21px)",
              fontWeight: 500,
              lineHeight: 1.45,
              letterSpacing: "-0.025em",
            }}
          >
            We record where, when and on which vehicle every
            advertisement plays. Then we send you the proof.
          </p>
        </div>

        <div
          className="atlas-proof-mobile"
          style={{
            position: "relative",
            flex: 1,
            minHeight: 0,
            marginTop: "24px",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              marginBottom: "22px",
            }}
          >
            {journeySteps.map((step, index) => {
              const complete = index <= activeStepIndex;

              return (
                <div
                  key={step.id}
                  style={{
                    flex: 1,
                    height: "3px",
                    borderRadius: "999px",
                    background: complete
                      ? colors.amber
                      : "rgba(26,26,24,0.1)",
                    transform: complete
                      ? "scaleX(1)"
                      : "scaleX(0.92)",
                    transformOrigin: "left center",
                    transition:
                      "background 0.25s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1)",
                  }}
                />
              );
            })}
          </div>

          <div
            style={{
              position: "relative",
              minHeight: "250px",
              padding: "26px 24px",
              borderRadius: "24px",
              background: "rgba(255,255,255,0.84)",
              border: "1px solid rgba(26,26,24,0.075)",
              boxShadow:
                "0 28px 64px -42px rgba(26,26,24,0.25)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: colors.amberDeep,
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              <span>{activeStep.number}</span>
              <span>
                {String(activeStepIndex + 1).padStart(2, "0")} / 05
              </span>
            </div>

            <div
              style={{
                display: "grid",
                placeItems: "center",
                width: "64px",
                height: "64px",
                marginTop: "30px",
                borderRadius: "50%",
                border: `1px solid ${colors.amber}`,
                background: "rgba(245,166,35,0.08)",
                boxShadow:
                  "0 0 0 10px rgba(245,166,35,0.045)",
              }}
            >
              <span
                style={{
                  width: "13px",
                  height: "13px",
                  borderRadius: "50%",
                  background: colors.amber,
                }}
              />
            </div>

            <h3
              style={{
                margin: "28px 0 0",
                maxWidth: "12ch",
                color: colors.ink,
                fontSize: "clamp(27px, 8vw, 36px)",
                fontWeight: 600,
                lineHeight: 0.98,
                letterSpacing: "-0.05em",
              }}
            >
              {activeStep.title}
            </h3>

            <p
              style={{
                margin: "14px 0 0",
                maxWidth: "31ch",
                color: "rgba(26,26,24,0.58)",
                fontSize: "14px",
                lineHeight: 1.5,
              }}
            >
              {activeStep.body}
            </p>
          </div>

          <div
            style={{
              position: "relative",
              flex: 1,
              minHeight: "210px",
              marginTop: "18px",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "31px",
                top: 0,
                bottom: "42px",
                width: "2px",
                borderRadius: "999px",
                background: "rgba(26,26,24,0.09)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: `${routeProgress * 100}%`,
                  borderRadius: "999px",
                  background: colors.amber,
                }}
              />
            </div>

            <div
              style={{
                position: "absolute",
                left: "24px",
                top: `calc(${routeProgress * 100}% - 7px)`,
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                background: colors.amber,
                boxShadow:
                  "0 0 0 8px rgba(245,166,35,0.12)",
              }}
            />

            <div
              style={{
                position: "absolute",
                left: "58px",
                right: 0,
                top: "18px",
                opacity: reportVisible ? 1 : 0,
                transform: `translateY(${
                  reportVisible ? 0 : 14
                }px)`,
                transition:
                  "opacity 0.35s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              <JourneyReport progress={progress} />
            </div>
          </div>
        </div>

        <div
          className="atlas-proof-layout atlas-proof-desktop"
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) 330px",
            gap: "clamp(36px, 5vw, 80px)",
            alignItems: "center",
            marginTop: "clamp(34px, 4vh, 56px)",
          }}
        >
          <div
            style={{
              position: "relative",
              minWidth: 0,
            }}
          >
            <div
              className="atlas-proof-steps"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
                gap: "clamp(18px, 2vw, 34px)",
                alignItems: "start",
                paddingBottom: "140px",
              }}
            >
              {journeySteps.map((step, index) => {
                const nextStep = journeySteps[index + 1];
                const isPast =
                  nextStep !== undefined &&
                  progress >= nextStep.progress;
                const isCurrent =
                  progress >= step.progress && !isPast;

                const state =
                  isPast
                    ? "past"
                    : isCurrent
                      ? "current"
                      : "future";

                return (
                  <JourneyStep
                    key={step.id}
                    number={step.number}
                    title={step.title}
                    body={step.body}
                    state={state}
                  />
                );
              })}
            </div>

            <svg
              className="atlas-proof-route"
              role="img"
              aria-label="A verification rail connecting five proof steps"
              viewBox="0 0 1000 120"
              preserveAspectRatio="none"
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: "22px",
                width: "100%",
                height: "90px",
                overflow: "visible",
              }}
            >
              <line
                x1="70"
                y1="58"
                x2="930"
                y2="58"
                stroke="rgba(26,26,24,0.1)"
                strokeWidth="6"
                strokeLinecap="round"
              />

              <line
                x1="70"
                y1="58"
                x2="930"
                y2="58"
                stroke={colors.amber}
                strokeWidth="6"
                strokeLinecap="round"
                pathLength={PATH_LENGTH}
                strokeDasharray={PATH_LENGTH}
                strokeDashoffset={dashOffset}
              />

              <line
                x1="70"
                y1="58"
                x2="930"
                y2="58"
                stroke="rgba(255,255,255,0.72)"
                strokeWidth="2"
                strokeLinecap="round"
                pathLength={PATH_LENGTH}
                strokeDasharray="44 956"
                strokeDashoffset={dashOffset - 24}
                opacity={progress > 0 && progress < 1 ? 0.75 : 0}
              />

              {[70, 285, 500, 715, 930].map((x, index) => {
                const active =
                  progress >= journeySteps[index].progress;

                return (
                  <g key={journeySteps[index].id}>
                    <circle
                      cx={x}
                      cy="58"
                      r="13"
                      fill={colors.cream}
                      stroke={
                        active
                          ? colors.amber
                          : "rgba(26,26,24,0.14)"
                      }
                      strokeWidth="4"
                    />

                    <circle
                      cx={x}
                      cy="58"
                      r="5"
                      fill={
                        active
                          ? colors.amber
                          : "rgba(26,26,24,0.12)"
                      }
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          <div
            className="atlas-proof-report"
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <JourneyReport progress={progress} />
          </div>
        </div>
      </div>
    </div>
  );
}
