import { colors } from "@/design";
import { OperatingSystemDiagram } from "./OperatingSystemDiagram";

type PlatformMobileProps = {
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

export function PlatformMobile({ progress }: PlatformMobileProps) {
  const safeProgress = clamp(progress);

  const copyIn = easeOutCubic(range(safeProgress, 0, 0.14));
  const focusShift = easeInOutCubic(range(safeProgress, 0.5, 0.7));
  const handoff = easeInOutCubic(range(safeProgress, 0.78, 0.9));
  const copyOut = handoff;

  const diagramIn = easeOutCubic(range(safeProgress, 0.03, 0.16));
  const diagramQuiet = handoff;

  const conclusionIn = handoff;
  const glowHandoff = easeInOutCubic(range(safeProgress, 0.96, 1));

  return (
    <div
      className="atlas-os-mobile-root"
      style={{
        position: "sticky",
        top: 0,
        height: "100svh",
        overflow: "hidden",
        background: colors.ink,
        color: colors.cream,
        fontFamily: '"Space Grotesk", system-ui, -apple-system, sans-serif',
      }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .atlas-os-mobile-root {
            position: relative !important;
            top: auto !important;
            height: auto !important;
            min-height: 0 !important;
            overflow: hidden !important;
          }

          .atlas-os-mobile-inner {
            height: auto !important;
            min-height: 0 !important;
            padding-top: 88px !important;
            padding-bottom: 76px !important;
          }

          .atlas-os-intro {
            opacity: 1 !important;
            transform: none !important;
          }

          .atlas-os-diagram-stage {
            flex: 0 0 560px !important;
            width: 100% !important;
            height: 560px !important;
            min-height: 560px !important;
            margin-top: 52px !important;
            opacity: 1 !important;
            transform: none !important;
          }

          .atlas-os-diagram-stage .atlas-os-motion {
            opacity: 1 !important;
          }

          .atlas-os-diagram-stage .atlas-os-relationship {
            width: min(126px, 30vw) !important;
            transform: translate(-50%, -50%) !important;
          }

          .atlas-os-relationship[data-relationship="passengers"] {
            left: 50% !important;
            top: 10% !important;
          }

          .atlas-os-relationship[data-relationship="businesses"] {
            left: 18% !important;
            top: 48% !important;
          }

          .atlas-os-relationship[data-relationship="drivers"] {
            left: 82% !important;
            top: 48% !important;
          }

          .atlas-os-relationship[data-relationship="operations"] {
            left: 50% !important;
            top: 89% !important;
          }

          .atlas-os-diagram-stage .atlas-os-centre {
            width: clamp(138px, 38vw, 164px) !important;
          }

          .atlas-os-conclusion {
            display: none !important;
          }
        }

        /* atlas-os-mobile-grid-layout */
        @media (max-width: 560px) {
          .atlas-os-diagram-stage {
            min-width: 0;
          }

          .atlas-os-diagram-stage .atlas-os-diagram {
            display: grid !important;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            grid-template-rows: auto auto auto;
            grid-template-areas:
              "hub hub"
              "passengers drivers"
              "businesses operations";
            align-content: center;
            align-items: stretch;
            gap: 14px;
            width: 100% !important;
            height: 100% !important;
            padding: 4px 0;
            box-sizing: border-box;
            transform: none !important;
          }

          .atlas-os-diagram-stage
            .atlas-os-diagram > [aria-hidden="true"] {
            display: none !important;
          }

          .atlas-os-diagram-stage .atlas-os-centre {
            position: relative !important;
            grid-area: hub;
            left: auto !important;
            top: auto !important;
            justify-self: center;
            align-self: center;
            width: clamp(138px, 39vw, 166px) !important;
            margin-bottom: 10px;
            opacity: 1 !important;
            transform: none !important;
          }

          .atlas-os-diagram-stage .atlas-os-relationship {
            position: relative !important;
            left: auto !important;
            top: auto !important;
            width: auto !important;
            min-width: 0;
            padding: 15px 13px 14px;
            box-sizing: border-box;
            border: 1px solid rgba(253, 250, 243, 0.09);
            border-radius: 16px;
            background: rgba(255, 255, 255, 0.025);
            text-align: left !important;
            opacity: 1 !important;
            transform: none !important;
          }

          .atlas-os-diagram-stage
            .atlas-os-relationship[data-relationship="passengers"] {
            grid-area: passengers;
          }

          .atlas-os-diagram-stage
            .atlas-os-relationship[data-relationship="drivers"] {
            grid-area: drivers;
          }

          .atlas-os-diagram-stage
            .atlas-os-relationship[data-relationship="businesses"] {
            grid-area: businesses;
          }

          .atlas-os-diagram-stage
            .atlas-os-relationship[data-relationship="operations"] {
            grid-area: operations;
          }

          .atlas-os-diagram-stage
            .atlas-os-relationship > div:nth-child(1) {
            font-size: 8px !important;
            line-height: 1.2;
          }

          .atlas-os-diagram-stage
            .atlas-os-relationship > div:nth-child(2) {
            margin-top: 7px !important;
            font-size: clamp(14px, 4vw, 17px) !important;
            line-height: 1.08 !important;
          }

          .atlas-os-diagram-stage .atlas-os-detail {
            margin-top: 6px !important;
            font-size: 9px !important;
            line-height: 1.38 !important;
          }
        }

        @media (max-width: 350px) {
          .atlas-os-diagram-stage .atlas-os-diagram {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            grid-template-areas:
              "hub"
              "passengers"
              "drivers"
              "businesses"
              "operations";
            gap: 10px;
          }

          .atlas-os-diagram-stage {
            height: 720px !important;
            min-height: 720px !important;
            flex-basis: 720px !important;
          }

          .atlas-os-diagram-stage .atlas-os-centre {
            width: 132px !important;
            margin-bottom: 4px;
          }

          .atlas-os-diagram-stage .atlas-os-relationship {
            padding: 12px 13px;
          }
        }
      `}</style>

      <div
        className="atlas-os-mobile-inner"
        style={{
          position: "relative",
          zIndex: 1,
          width: "calc(100% - 28px)",
          height: "100%",
          marginInline: "auto",
          padding: "28px 0 18px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <header
          className="atlas-os-motion atlas-os-intro"
          style={{
            position: "relative",
            zIndex: 12,
            flex: "0 0 auto",
            textAlign: "center",
            opacity: copyIn * (1 - focusShift * 0.62) * (1 - copyOut),
            transform: `translateY(${
              (1 - copyIn) * 14 - focusShift * 10 - copyOut * 9
            }px) scale(${1 - focusShift * 0.02})`,
            transformOrigin: "center top",
          }}
        >
          <div
            style={{
              color: colors.amber,
              fontSize: "var(--atlas-eyebrow-size)",
              fontWeight: "var(--atlas-eyebrow-weight)",
              letterSpacing: "var(--atlas-eyebrow-tracking)",
              textTransform: "uppercase",
            }}
          >
            The infrastructure behind the network
          </div>

          <h2
            style={{
              margin: "10px auto 0",
              maxWidth: "10ch",
              color: colors.cream,
              fontSize: "clamp(37px, 10.8vw, 48px)",
              fontWeight: 600,
              lineHeight: 0.92,
              letterSpacing: "-0.066em",
            }}
          >
            One operating system keeps the network moving.
          </h2>

          <p
            style={{
              margin: "13px auto 0",
              maxWidth: "35ch",
              color: "var(--atlas-copy-light)",
              fontSize: "12px",
              fontWeight: 500,
              lineHeight: 1.42,
            }}
          >
            Screens, drivers, campaigns and operations are coordinated through one connected
            platform.
          </p>
        </header>

        <div
          className="atlas-os-motion atlas-os-diagram-stage"
          style={{
            position: "relative",
            flex: 1,
            minHeight: 0,
            marginTop: "8px",
            opacity: diagramIn * (1 - diagramQuiet) * (1 - conclusionIn * 0.85),
            transform: `translateY(${(1 - diagramIn) * 16 - diagramQuiet * 6}px) scale(${
              0.96 + diagramIn * 0.04 - diagramQuiet * 0.07
            })`,
          }}
        >
          <OperatingSystemDiagram progress={safeProgress} compact />
        </div>

        <div
          className="atlas-os-motion atlas-os-conclusion"
          style={{
            position: "absolute",
            zIndex: 30,
            inset: 0,
            display: "grid",
            placeItems: "center",
            padding: "82px 20px 34px",
            boxSizing: "border-box",
            textAlign: "center",
            opacity: conclusionIn,
            transform: `translateY(${
              (1 - conclusionIn) * 17
            }px) scale(${0.98 + conclusionIn * 0.02})`,
            transformOrigin: "center",
            pointerEvents: "none",
            willChange: "opacity, transform",
          }}
        >
          <div
            style={{
              width: "100%",
              transform: "translateY(0)",
            }}
          >
            <div
              style={{
                color: colors.amber,
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.17em",
                textTransform: "uppercase",
              }}
            >
              Built for focused expansion
            </div>

            <p
              style={{
                margin: "14px auto 0",
                maxWidth: "11ch",
                color: colors.cream,
                fontSize: "clamp(42px, 13.2vw, 66px)",
                fontWeight: 600,
                lineHeight: 0.91,
                letterSpacing: "-0.066em",
              }}
            >
              One connected system.
              <br />
              Ready to grow corridor by corridor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
