import { colors } from "@/design";
import { OperatingSystemDiagram } from "./OperatingSystemDiagram";

type PlatformSceneProps = {
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

export function PlatformDesktop({ progress }: PlatformSceneProps) {
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
        .atlas-os-desktop-frame {
          width: min(1380px, calc(100% - 72px));
        }

        .atlas-os-desktop-heading {
          font-size: clamp(48px, 6vw, 94px);
        }

        @media (max-width: 980px) {
          .atlas-os-desktop-frame {
            width: calc(100% - 48px);
          }

          .atlas-os-desktop-layout {
            grid-template-columns: minmax(300px, 0.72fr) minmax(500px, 1.28fr) !important;
            gap: 30px !important;
          }

          .atlas-os-detail {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .atlas-os-motion {
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
          bottom: `${-48 + glowHandoff * 28}%`,
          width: `${74 + glowHandoff * 36}vw`,
          height: `${74 + glowHandoff * 36}vw`,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(253,250,243,0.08), rgba(253,250,243,0.018) 42%, transparent 70%)",
          opacity: glowHandoff,
          transform: "translateX(-50%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="atlas-os-desktop-frame"
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          marginInline: "auto",
          padding: "clamp(54px, 7vh, 82px) 0 28px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          className="atlas-os-desktop-layout"
          style={{
            flex: 1,
            minHeight: 0,
            display: "grid",
            gridTemplateColumns: "minmax(360px, 0.74fr) minmax(620px, 1.26fr)",
            gap: "clamp(44px, 6vw, 92px)",
            alignItems: "center",
          }}
        >
          <header
            className="atlas-os-motion"
            style={{
              position: "relative",
              zIndex: 12,
              opacity: copyIn * (1 - focusShift * 0.62) * (1 - copyOut),
              transform: `translateY(${
                (1 - copyIn) * 18 - focusShift * 12 - copyOut * 12
              }px) scale(${1 - focusShift * 0.025})`,
              transformOrigin: "left center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "18px",
                color: colors.amber,
                fontSize: "var(--atlas-eyebrow-size)",
                fontWeight: "var(--atlas-eyebrow-weight)",
                letterSpacing: "var(--atlas-eyebrow-tracking)",
                textTransform: "uppercase",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: "30px",
                  height: "1px",
                  background: colors.amber,
                }}
              />
              The infrastructure behind the network
            </div>

            <h2
              className="atlas-os-desktop-heading atlas-section-heading"
              style={{
                margin: 0,
                maxWidth: "9.5ch",
                color: colors.cream,
                fontWeight: 600,
                lineHeight: 0.91,
                letterSpacing: "-0.068em",
              }}
            >
              One operating system keeps the network moving.
            </h2>

            <p
              style={{
                margin: "25px 0 0",
                maxWidth: "470px",
                color: "var(--atlas-copy-light)",
                fontSize: "clamp(17px, 1.25vw, 20px)",
                fontWeight: 500,
                lineHeight: 1.55,
                letterSpacing: "-0.022em",
              }}
            >
              Passenger screens, driver activity, advertiser campaigns and network operations are
              coordinated through one connected platform.
            </p>
          </header>

          <div
            className="atlas-os-motion"
            style={{
              position: "relative",
              height: "min(720px, 76svh)",
              minHeight: "540px",
              opacity: diagramIn * (1 - diagramQuiet),
              transform: `translateY(${(1 - diagramIn) * 20 - diagramQuiet * 8}px) scale(${
                0.96 + diagramIn * 0.04 - diagramQuiet * 0.08
              })`,
            }}
          >
            <OperatingSystemDiagram progress={safeProgress} />
          </div>
        </div>

        <div
          className="atlas-os-motion"
          style={{
            position: "absolute",
            zIndex: 30,
            inset: 0,
            display: "grid",
            placeItems: "center",
            padding: "clamp(72px, 10vh, 120px) 36px 48px",
            boxSizing: "border-box",
            textAlign: "center",
            opacity: conclusionIn,
            transform: `translateY(${
              (1 - conclusionIn) * 20
            }px) scale(${0.975 + conclusionIn * 0.025})`,
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
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Built for focused expansion
            </div>

            <p
              style={{
                margin: "18px auto 0",
                maxWidth: "13ch",
                color: colors.cream,
                fontSize: "clamp(58px, 7.1vw, 108px)",
                fontWeight: 600,
                lineHeight: 0.91,
                letterSpacing: "-0.068em",
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
