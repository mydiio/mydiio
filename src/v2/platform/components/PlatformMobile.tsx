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
      style={{
        position: "sticky",
        top: 0,
        height: "100svh",
        overflow: "hidden",
        background: colors.ink,
        color: colors.cream,
        fontFamily: '"DM Sans", system-ui, sans-serif',
      }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .atlas-os-motion {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <div
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
          className="atlas-os-motion"
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
          className="atlas-os-motion"
          style={{
            position: "relative",
            flex: 1,
            minHeight: 0,
            marginTop: "8px",
            opacity: diagramIn * (1 - diagramQuiet),
            transform: `translateY(${(1 - diagramIn) * 16 - diagramQuiet * 6}px) scale(${
              0.96 + diagramIn * 0.04 - diagramQuiet * 0.07
            })`,
          }}
        >
          <OperatingSystemDiagram progress={safeProgress} compact />
        </div>

        <div
          className="atlas-os-motion"
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
