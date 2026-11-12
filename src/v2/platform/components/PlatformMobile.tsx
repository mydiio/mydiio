import { colors } from "@/design";
import { MobileOperatingDiagram } from "./MobileOperatingDiagram";

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
  const focusShift = easeInOutCubic(range(safeProgress, 0.23, 0.43));
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
            max-height: none !important;
            overflow: visible !important;
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

          .atlas-os-conclusion {
            display: none !important;
          }
        }

        /* Mobile-only connected diagram. Desktop remains unchanged. */
        .atlas-os-mobile-diagram {
          width: 100%;
          height: 100%;
          min-height: 0;
        }
        @media (max-width: 360px) {
          .atlas-os-mobile-inner { padding-top: 18px !important; }
          .atlas-os-mobile-diagram .atlas-os-mobile-card { padding: 10px 9px !important; }
          .atlas-os-mobile-diagram .atlas-os-mobile-detail { font-size: 10px !important; }
        }
        @media (max-height: 700px) {
          .atlas-os-mobile-inner { padding-top: 12px !important; padding-bottom: 10px !important; }
          .atlas-os-mobile-inner > header h2 { font-size: clamp(29px, 9vw, 39px) !important; }
          .atlas-os-mobile-inner > header p { margin-top: 8px !important; }
          .atlas-os-diagram-stage { margin-top: 2px !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .atlas-os-diagram-stage {
            flex: 0 0 auto !important;
            height: 490px !important;
            min-height: 490px !important;
            margin-top: 24px !important;
          }
          .atlas-os-mobile-diagram .atlas-os-mobile-animated {
            opacity: 1 !important;
            transform: none !important;
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
            flex: "0 1 auto",
            textAlign: "center",
            opacity: copyIn * (1 - focusShift) * (1 - copyOut),
            maxHeight: `${Math.round((1 - focusShift) * 340)}px`,
            overflow: "hidden",
            transform: `translateY(${(1 - copyIn) * 14 - focusShift * 18}px)`,
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
          <MobileOperatingDiagram progress={safeProgress} />
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
