import { colors } from "@/design";
import { Metric } from "./Metric";
import { NetworkCanvas } from "./NetworkCanvas";

type NetworkSceneProps = {
  progress: number;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function NetworkDesktop({
  progress,
}: NetworkSceneProps) {
  const contentProgress = clamp(
    (progress - 0.06) / 0.16,
  );

  const mapProgress = clamp(
    (progress - 0.16) / 0.7,
  );

  const footerProgress = clamp(
    (progress - 0.92) / 0.06,
  );

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
        @media (max-width: 1280px) and (min-width: 961px) {
          .atlas-network-layout {
            width: calc(100% - 72px) !important;
            grid-template-columns:
              minmax(430px, 0.98fr)
              minmax(480px, 1.02fr) !important;
            gap: 34px !important;
          }

          .atlas-network-heading {
            font-size: clamp(44px, 5vw, 72px) !important;
          }
        }

        @media (max-width: 960px) {
          .atlas-network-layout {
            grid-template-columns: 1fr !important;
          }

          .atlas-network-map {
            position: absolute !important;
            inset: 22% 0 -8% 38% !important;
            height: auto !important;
            opacity: 0.3;
          }

          .atlas-network-copy {
            position: relative;
            z-index: 3;
            max-width: 620px;
            order: 1 !important;
          }

          .atlas-network-map {
            order: 2 !important;
          }
        }
      `}</style>

      <div
        className="atlas-network-layout"
        style={{
          display: "grid",
          gridTemplateColumns:
            "minmax(480px, 1.05fr) minmax(500px, 0.95fr)",
          gap: "clamp(38px, 5vw, 88px)",
          alignItems: "center",
          width: "min(1360px, calc(100% - 112px))",
          height: "100%",
          marginInline: "auto",
          paddingTop: "clamp(28px, 4vh, 48px)",
          boxSizing: "border-box",
        }}
      >
        <div
          className="atlas-network-copy"
          style={{
            order: 2,
            position: "relative",
            zIndex: 4,
            paddingTop: "clamp(10px, 2vh, 24px)",
            opacity: contentProgress,
            transform: `translateY(${
              (1 - contentProgress) * 22
            }px)`,
          }}
        >
          <div
            style={{
              marginBottom: "18px",
              color: colors.amberDeep,
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            The Network
          </div>

          <h2
            className="atlas-network-heading"
            style={{
              margin: 0,
              maxWidth: "10ch",
              fontSize:
                "clamp(46px, 5.2vw, 82px)",
              fontWeight: 600,
              lineHeight: 0.92,
              letterSpacing: "-0.065em",
            }}
          >
            One connected passenger network
            <span
              style={{
                color: colors.amber,
              }}
            >
              .
            </span>
          </h2>

          <p
            style={{
              margin: "22px 0 0",
              maxWidth: "510px",
              color: "rgba(26,26,24,0.62)",
              fontSize:
                "clamp(16px, 1.15vw, 19px)",
              fontWeight: 500,
              lineHeight: 1.5,
              letterSpacing: "-0.025em",
            }}
          >
            From one verified play in Colombo
            to a nationwide connected passenger
            network. Every journey measurable.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "minmax(0, 1.08fr) minmax(0, 0.92fr)",
              gap: "clamp(20px, 2.5vw, 34px)",
              marginTop: "clamp(28px, 3.5vh, 42px)",
              maxWidth: "600px",
            }}
          >
            <Metric
              value={320000}
              display="320,000"
              eyebrow="Colombo today"
              label="Tuk-tuks operating in Colombo every day."
              progress={progress}
              threshold={0.78}
            />

            <div
              style={{
                paddingLeft: "clamp(18px, 2vw, 30px)",
                borderLeft:
                  "1px solid rgba(26,26,24,0.12)",
              }}
            >
              <Metric
                value={1100000}
                display="1.1 million"
                eyebrow="National opportunity"
                label="Three-wheelers nationwide."
                progress={progress}
                threshold={0.84}
              />
            </div>
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              marginTop: "24px",
              padding: "11px 17px",
              border:
                "1px solid rgba(232,146,10,0.52)",
              borderRadius: "999px",
              opacity: footerProgress,
              visibility:
                footerProgress > 0.02
                  ? "visible"
                  : "hidden",
              transform: `translateY(${
                (1 - footerProgress) * 12
              }px)`,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                display: "grid",
                placeItems: "center",
                width: "25px",
                height: "25px",
                borderRadius: "50%",
                background:
                  "rgba(245,166,35,0.18)",
                color: colors.amberDeep,
                fontWeight: 700,
              }}
            >
              ✓
            </span>

            <span
              style={{
                fontSize: "15px",
                fontWeight: 600,
              }}
            >
              Every journey becomes measurable.
            </span>
          </div>
        </div>

        <div
          className="atlas-network-map"
          style={{
            order: 1,
            position: "relative",
            zIndex: 3,
            height: "88svh",
            minHeight: 0,
          }}
        >
          <NetworkCanvas
            progress={mapProgress}
          />

          <div
            style={{
              position: "absolute",
              right: "2%",
              bottom: "7%",
              display: "flex",
              alignItems: "center",
              gap: "9px",
              color: "rgba(26,26,24,0.54)",
              fontSize: "13px",
              opacity: footerProgress,
            }}
          >
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: colors.amber,
                boxShadow:
                  "0 0 0 5px rgba(245,166,35,0.12)",
              }}
            />

            Network vision
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: "20px",
          color: "rgba(26,26,24,0.34)",
          fontSize: "10px",
          transform: "translateX(-50%)",
        }}
      >
        © OpenStreetMap contributors
      </div>
    </div>
  );
}
