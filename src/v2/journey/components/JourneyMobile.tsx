import { colors } from "@/design";
import { journeySteps } from "../journeyData";
import { JourneyReport } from "./JourneyReport";

type JourneyMobileProps = {
  progress: number;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function JourneyMobile({ progress }: JourneyMobileProps) {
  const safeProgress = clamp(progress);

  const activeStepIndex = Math.min(
    journeySteps.length - 1,
    Math.floor(safeProgress * journeySteps.length),
  );

  const activeStep = journeySteps[activeStepIndex];

  const scaledStepProgress = safeProgress * journeySteps.length;

  const activeStepProgress = clamp(scaledStepProgress - activeStepIndex);

  const reportProgress = clamp((safeProgress - 0.72) / 0.16);

  const successProgress = clamp((safeProgress - 0.84) / 0.1);

  const stepProgress = 1 - reportProgress;

  const pulseScale = 1 + Math.sin(activeStepProgress * Math.PI) * 0.08;

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        height: "100svh",
        overflow: "hidden",
        background: colors.cream,
        color: colors.ink,
        fontFamily: '"Space Grotesk", system-ui, -apple-system, sans-serif',
      }}
    >
      <div
        style={{
          width: "calc(100% - 36px)",
          height: "100%",
          marginInline: "auto",
          padding: "24px 0 22px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <header>
          <div
            style={{
              marginBottom: "11px",
              color: colors.amberDeep,
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            One journey. Multiple outcomes.
          </div>

          <h2
            style={{
              margin: 0,
              maxWidth: "8.5ch",
              fontSize: "clamp(40px, 11.7vw, 52px)",
              fontWeight: 600,
              lineHeight: 0.92,
              letterSpacing: "-0.062em",
            }}
          >
            One journey creates value for everyone.
          </h2>

          <p
            style={{
              margin: "14px 0 0",
              maxWidth: "34ch",
              color: "rgba(26,26,24,0.62)",
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: 1.45,
              letterSpacing: "-0.018em",
            }}
          >
            We record the vehicle, location and time, then add the verified play to your report.
          </p>
        </header>

        <div
          aria-label={`Proof step ${activeStepIndex + 1} of ${journeySteps.length}`}
          style={{
            display: "flex",
            gap: "6px",
            marginTop: "20px",
          }}
        >
          {journeySteps.map((step, index) => {
            const segmentProgress =
              reportProgress > 0.05
                ? 1
                : index < activeStepIndex
                  ? 1
                  : index === activeStepIndex
                    ? activeStepProgress
                    : 0;

            return (
              <div
                key={step.id}
                style={{
                  flex: 1,
                  height: "3px",
                  overflow: "hidden",
                  borderRadius: "999px",
                  background: "rgba(26,26,24,0.1)",
                }}
              >
                <div
                  style={{
                    width: `${segmentProgress * 100}%`,
                    height: "100%",
                    borderRadius: "inherit",
                    background: colors.amber,
                    willChange: "width",
                  }}
                />
              </div>
            );
          })}
        </div>

        <div
          style={{
            position: "relative",
            flex: "0 1 auto",
            height: "clamp(390px, 52svh, 455px)",
            minHeight: 0,
            marginTop: "18px",
          }}
        >
          <article
            key={activeStep.id}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: 0,
              padding: "22px",
              boxSizing: "border-box",
              overflow: "hidden",
              borderRadius: "25px",
              background: "linear-gradient(145deg, rgba(255,255,255,0.96), rgba(253,250,243,0.9))",
              border: "1px solid rgba(26,26,24,0.075)",
              boxShadow: "0 28px 64px -42px rgba(26,26,24,0.28)",
              opacity: stepProgress,
              transform: `translateY(${
                reportProgress * -14 + (1 - activeStepProgress) * 8
              }px) scale(${1 - reportProgress * 0.025 - (1 - activeStepProgress) * 0.008})`,
              pointerEvents: reportProgress > 0.5 ? "none" : "auto",
              visibility: reportProgress >= 0.98 ? "hidden" : "visible",
              willChange: "opacity, transform",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <span
                style={{
                  color: colors.amberDeep,
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.13em",
                }}
              >
                {activeStep.number}
              </span>

              <span
                style={{
                  color: "rgba(26,26,24,0.4)",
                  fontSize: "11px",
                  fontWeight: 650,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {String(activeStepIndex + 1).padStart(2, "0")} / 05
              </span>
            </div>

            <div>
              <div
                style={{
                  position: "relative",
                  display: "grid",
                  placeItems: "center",
                  width: "68px",
                  height: "68px",
                  marginBottom: "24px",
                  borderRadius: "50%",
                  border: `1px solid ${colors.amber}`,
                  background: "rgba(245,166,35,0.075)",
                  boxShadow: "0 0 0 12px rgba(245,166,35,0.045)",
                  transform: `scale(${pulseScale})`,
                  willChange: "transform",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: "15px",
                    height: "15px",
                    borderRadius: "50%",
                    background: colors.amber,
                    boxShadow: `0 0 0 ${6 + activeStepProgress * 7}px rgba(245,166,35,${
                      0.14 - activeStepProgress * 0.07
                    })`,
                    willChange: "box-shadow",
                  }}
                />
              </div>

              <h3
                style={{
                  margin: 0,
                  maxWidth: "11ch",
                  fontSize: "clamp(29px, 8.4vw, 36px)",
                  fontWeight: 600,
                  lineHeight: 0.97,
                  letterSpacing: "-0.052em",
                }}
              >
                {activeStep.title}
              </h3>

              <p
                style={{
                  margin: "14px 0 0",
                  maxWidth: "29ch",
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
                display: "flex",
                alignItems: "center",
                gap: "10px",
                paddingTop: "19px",
                borderTop: "1px solid rgba(26,26,24,0.08)",
                color: "rgba(26,26,24,0.48)",
                fontSize: "12px",
                fontWeight: 650,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: colors.amber,
                }}
              />
              Creating verified proof
            </div>
          </article>

          <div
            style={{
              position: "absolute",
              inset: "-10px",
              zIndex: 3,
              display: "grid",
              placeItems: "center",
              overflow: "hidden",
              borderRadius: "25px",
              background: colors.cream,
              opacity: reportProgress,
              transform: `translateY(${
                (1 - reportProgress) * 28
              }px) scale(${0.94 + reportProgress * 0.06})`,
              transformOrigin: "center bottom",
              pointerEvents: reportProgress > 0.5 ? "auto" : "none",
              willChange: "opacity, transform",
            }}
          >
            <JourneyReport progress={safeProgress} />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            minHeight: "38px",
            marginTop: "14px",
            opacity: successProgress,
            transform: `translateY(${
              (1 - successProgress) * 10
            }px) scale(${0.96 + successProgress * 0.04})`,
            transformOrigin: "center",
            willChange: "opacity, transform",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "9px 14px",
              borderRadius: "999px",
              border: "1px solid rgba(232,146,10,0.4)",
              background: "rgba(255,255,255,0.66)",
              color: colors.ink,
              fontSize: "12px",
              fontWeight: 650,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                display: "grid",
                placeItems: "center",
                width: "19px",
                height: "19px",
                borderRadius: "50%",
                background: colors.amber,
                fontSize: "11px",
                fontWeight: 800,
              }}
            >
              ✓
            </span>
            Verified and added to Monday’s report
          </div>
        </div>
      </div>
    </div>
  );
}
