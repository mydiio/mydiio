import { colors } from "@/design";
import { Metric } from "./Metric";
import { NetworkCanvas } from "./NetworkCanvas";

type NetworkSceneProps = {
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

export function NetworkDesktop({ progress }: NetworkSceneProps) {
  const safeProgress = clamp(progress);

  const contentIn = 1;
  const mapProgress = 0.08 + range(safeProgress, 0, 0.7) * 0.92;

  const handoff = easeInOutCubic(range(safeProgress, 0.78, 0.9));
  const stageOut = handoff;
  const finalIn = handoff;

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
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .atlas-network-motion {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <div
        className="atlas-network-layout atlas-network-motion"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(480px, 1.05fr) minmax(500px, 0.95fr)",
          gap: "clamp(38px, 5vw, 88px)",
          alignItems: "center",
          width: "min(1360px, calc(100% - 112px))",
          height: "100%",
          marginInline: "auto",
          paddingTop: "clamp(28px, 4vh, 48px)",
          boxSizing: "border-box",
          transform: `translateY(${-stageOut * 12}px)`,
        }}
      >
        <div
          className="atlas-network-copy atlas-section-copy"
          style={{
            order: 2,
            position: "relative",
            zIndex: 4,
            paddingTop: "clamp(10px, 2vh, 24px)",
            opacity: contentIn * (1 - stageOut),
            transform: `translateY(${(1 - contentIn) * 22 - stageOut * 14}px)`,
          }}
        >
          <div
            style={{
              marginBottom: "18px",
              color: colors.amberDeep,
              fontSize: "var(--atlas-eyebrow-size)",
              fontWeight: "var(--atlas-eyebrow-weight)",
              letterSpacing: "var(--atlas-eyebrow-tracking)",
              textTransform: "uppercase",
            }}
          >
            The scale ahead
          </div>

          <h2
            className="atlas-network-heading atlas-section-heading"
            style={{
              margin: 0,
              maxWidth: "10ch",
              fontSize: "clamp(46px, 5.2vw, 82px)",
              fontWeight: 600,
              lineHeight: 0.92,
              letterSpacing: "-0.065em",
            }}
          >
            A citywide network, built vehicle by vehicle.
          </h2>

          <p
            style={{
              margin: "22px 0 0",
              maxWidth: "540px",
              color: "var(--atlas-copy-dark)",
              fontSize: "clamp(16px, 1.15vw, 19px)",
              fontWeight: 500,
              lineHeight: 1.55,
              letterSpacing: "-0.025em",
            }}
          >
            Colombo has 320,000 tuk-tuks moving each day, within a national fleet of 1.1 million
            three-wheelers. The opportunity grows with every vehicle connected.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.08fr) minmax(0, 0.92fr)",
              gap: "clamp(20px, 2.5vw, 34px)",
              marginTop: "clamp(28px, 3.5vh, 42px)",
              maxWidth: "610px",
            }}
          >
            <Metric
              value={320000}
              display="320,000"
              eyebrow="Colombo opportunity"
              label="Tuk-tuks moving through Colombo each day."
              progress={mapProgress}
              threshold={0.24}
            />

            <div
              style={{
                paddingLeft: "clamp(18px, 2vw, 30px)",
                borderLeft: "1px solid rgba(26,26,24,0.12)",
              }}
            >
              <Metric
                value={1100000}
                display="1.1 million"
                eyebrow="National opportunity"
                label="Three-wheelers operating nationwide."
                progress={mapProgress}
                threshold={0.68}
              />
            </div>
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
            opacity: 1 - stageOut,
            transform: `scale(${1 - stageOut * 0.035})`,
            transformOrigin: "center",
          }}
        >
          <NetworkCanvas progress={mapProgress} />

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
              opacity: easeOutCubic(range(mapProgress, 0.86, 1)),
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: colors.amber,
                boxShadow: "0 0 0 5px rgba(245,166,35,0.12)",
              }}
            />
            Network vision
          </div>
        </div>
      </div>

      <div
        className="atlas-network-motion"
        style={{
          position: "absolute",
          zIndex: 20,
          inset: 0,
          display: "grid",
          placeItems: "center",
          padding: "72px 36px 48px",
          boxSizing: "border-box",
          textAlign: "center",
          opacity: finalIn,
          transform: `translateY(${
            (1 - finalIn) * 22 - finalIn * 4
          }px) scale(${0.975 + finalIn * 0.025})`,
          pointerEvents: "none",
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
            Scale needs coordination
          </div>

          <p
            style={{
              margin: "18px auto 0",
              maxWidth: "14ch",
              color: colors.ink,
              fontSize: "clamp(58px, 7.1vw, 108px)",
              fontWeight: 600,
              lineHeight: 0.91,
              letterSpacing: "-0.068em",
            }}
          >
            Every connected vehicle
            <br />
            needs one operating system.
          </p>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: "20px",
          color: "rgba(26,26,24,0.34)",
          fontSize: "10px",
          opacity: 1 - stageOut,
          transform: "translateX(-50%)",
        }}
      >
        © OpenStreetMap contributors
      </div>
    </div>
  );
}
