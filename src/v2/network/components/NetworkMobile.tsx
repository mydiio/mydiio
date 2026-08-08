import { colors } from "@/design";
import { NetworkCanvas } from "./NetworkCanvas";

type NetworkMobileProps = {
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

function formatCount(value: number) {
  return Math.round(value).toLocaleString();
}

export function NetworkMobile({ progress }: NetworkMobileProps) {
  const safeProgress = clamp(progress);

  const copyIn = 1;
  const mapProgress = 0.08 + range(safeProgress, 0, 0.7) * 0.92;
  const metricsIn = easeOutCubic(range(safeProgress, 0.22, 0.58));

  const handoff = easeInOutCubic(range(safeProgress, 0.78, 0.9));
  const stageOut = handoff;
  const finalIn = handoff;

  const colomboCount = formatCount(320000 * metricsIn);
  const nationalCount =
    metricsIn >= 0.995 ? "1.1 million" : `${(1.1 * metricsIn).toFixed(1)} million`;

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
          padding: "20px 0 14px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          transform: `translateY(${-stageOut * 9}px)`,
        }}
      >
        <header
          style={{
            flex: "0 0 auto",
            opacity: copyIn * (1 - stageOut),
            transform: `translateY(${(1 - copyIn) * 16 - stageOut * 10}px)`,
          }}
        >
          <div
            style={{
              marginBottom: "9px",
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
            style={{
              margin: 0,
              maxWidth: "9ch",
              fontSize: "clamp(38px, 11vw, 48px)",
              fontWeight: 600,
              lineHeight: 0.91,
              letterSpacing: "-0.064em",
            }}
          >
            A citywide network, built vehicle by vehicle.
          </h2>

          <p
            style={{
              margin: "12px 0 0",
              maxWidth: "35ch",
              color: "var(--atlas-copy-dark)",
              fontSize: "13px",
              fontWeight: 500,
              lineHeight: 1.42,
              letterSpacing: "-0.018em",
            }}
          >
            320,000 tuk-tuks move through Colombo each day, within 1.1 million nationwide.
          </p>
        </header>

        <div
          style={{
            position: "relative",
            flex: 1,
            minHeight: 0,
            marginTop: "16px",
            padding: "12px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            borderRadius: "var(--atlas-panel-radius)",
            background: "linear-gradient(145deg, rgba(255,255,255,0.96), rgba(253,250,243,0.82))",
            border: "1px solid var(--atlas-border-light)",
            boxShadow: "0 30px 70px -46px rgba(26,26,24,0.28)",
            opacity: 1 - stageOut,
            transform: `scale(${1 - stageOut * 0.035})`,
            transformOrigin: "center",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(26,26,24,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(26,26,24,0.025) 1px, transparent 1px)",
              backgroundSize: "46px 46px",
              maskImage:
                "linear-gradient(to bottom, transparent, black 12%, black 90%, transparent)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 1,
              flex: 1,
              minHeight: 0,
              width: "100%",
              overflow: "hidden",
              opacity: clamp(mapProgress / 0.12),
              transform: `translateY(${
                (1 - mapProgress) * 14
              }px) scale(${0.96 + mapProgress * 0.04})`,
              transformOrigin: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: "0 24px",
              }}
            >
              <NetworkCanvas progress={mapProgress} />
            </div>
          </div>

          <div
            style={{
              position: "relative",
              zIndex: 2,
              flex: "0 0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "9px",
              marginTop: "8px",
              opacity: metricsIn,
              transform: `translateY(${(1 - metricsIn) * 18}px)`,
            }}
          >
            <div
              style={{
                minWidth: 0,
                minHeight: "105px",
                padding: "13px 12px",
                boxSizing: "border-box",
                borderRadius: "18px",
                background: "rgba(255,255,255,0.96)",
                border: "1px solid rgba(26,26,24,0.07)",
              }}
            >
              <div
                style={{
                  color: colors.amberDeep,
                  fontSize: "8px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Colombo opportunity
              </div>

              <div
                style={{
                  marginTop: "7px",
                  fontSize: "clamp(23px, 6.7vw, 29px)",
                  fontWeight: 650,
                  lineHeight: 0.95,
                  letterSpacing: "-0.055em",
                  whiteSpace: "nowrap",
                }}
              >
                {colomboCount}
              </div>

              <div
                style={{
                  marginTop: "7px",
                  color: "rgba(26,26,24,0.52)",
                  fontSize: "10px",
                  lineHeight: 1.3,
                }}
              >
                Tuk-tuks moving daily.
              </div>
            </div>

            <div
              style={{
                minWidth: 0,
                minHeight: "105px",
                padding: "13px 12px",
                boxSizing: "border-box",
                borderRadius: "18px",
                background: colors.ink,
                border: "1px solid rgba(245,166,35,0.34)",
              }}
            >
              <div
                style={{
                  color: colors.amber,
                  fontSize: "8px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                National opportunity
              </div>

              <div
                style={{
                  marginTop: "7px",
                  color: colors.cream,
                  fontSize: "clamp(20px, 5.9vw, 27px)",
                  fontWeight: 650,
                  lineHeight: 0.95,
                  letterSpacing: "-0.055em",
                  whiteSpace: "nowrap",
                }}
              >
                {nationalCount}
              </div>

              <div
                style={{
                  marginTop: "7px",
                  color: "rgba(253,250,243,0.52)",
                  fontSize: "10px",
                  lineHeight: 1.3,
                }}
              >
                Three-wheelers nationwide.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          zIndex: 20,
          inset: 0,
          display: "grid",
          placeItems: "center",
          padding: "78px 20px 34px",
          boxSizing: "border-box",
          textAlign: "center",
          opacity: finalIn,
          transform: `translateY(${
            (1 - finalIn) * 18 - finalIn * 3
          }px) scale(${0.98 + finalIn * 0.02})`,
          pointerEvents: "none",
        }}
      >
        <div>
          <div
            style={{
              color: colors.amberDeep,
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.17em",
              textTransform: "uppercase",
            }}
          >
            Scale needs coordination
          </div>

          <p
            style={{
              margin: "14px auto 0",
              maxWidth: "11ch",
              fontSize: "clamp(42px, 13vw, 64px)",
              fontWeight: 600,
              lineHeight: 0.91,
              letterSpacing: "-0.066em",
            }}
          >
            Every connected vehicle
            <br />
            needs one operating system.
          </p>
        </div>
      </div>
    </div>
  );
}
