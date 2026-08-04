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

  const copyIn = easeOutCubic(range(safeProgress, 0.02, 0.18));
  const focusShift = easeInOutCubic(range(safeProgress, 0.5, 0.7));
  const copyOut = easeInOutCubic(range(safeProgress, 0.72, 0.82));

  const diagramIn = easeOutCubic(range(safeProgress, 0.14, 0.3));
  const diagramQuiet = easeInOutCubic(range(safeProgress, 0.72, 0.84));

  const conclusionIn = easeOutCubic(range(safeProgress, 0.87, 0.94));
  const handoff = easeInOutCubic(range(safeProgress, 0.985, 1));

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
              (1 - copyIn) * 18 - focusShift * 12 - copyOut * 10
            }px) scale(${1 - focusShift * 0.02})`,
            transformOrigin: "center top",
          }}
        >
          <div
            style={{
              color: colors.amber,
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            The Operating System
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
            One system keeps the whole network moving.
          </h2>

          <p
            style={{
              margin: "13px auto 0",
              maxWidth: "35ch",
              color: "rgba(253,250,243,0.58)",
              fontSize: "12px",
              fontWeight: 500,
              lineHeight: 1.42,
            }}
          >
            Passengers, drivers, businesses and operations are connected through one coordinated
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
              (1 - conclusionIn) * 28
            }vh) scale(${0.92 + conclusionIn * 0.08})`,
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
              One coordinated platform
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
              Different products.
              <br />
              One connected system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
