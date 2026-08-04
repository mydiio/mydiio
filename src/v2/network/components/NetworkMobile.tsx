import { colors } from "@/design";
import { NetworkCanvas } from "./NetworkCanvas";

type NetworkMobileProps = {
  progress: number;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

function formatCount(value: number) {
  return Math.round(value).toLocaleString();
}

export function NetworkMobile({
  progress,
}: NetworkMobileProps) {
  const safeProgress = clamp(progress);

  const copyProgress = easeOutCubic(
    clamp(safeProgress / 0.18),
  );

  const mapProgress = clamp(
    (safeProgress - 0.12) / 0.54,
  );

  const metricsProgress = easeOutCubic(
    clamp((safeProgress - 0.56) / 0.24),
  );

  const finalProgress = easeOutCubic(
    clamp((safeProgress - 0.8) / 0.16),
  );

  const colomboCount = formatCount(
    320000 * metricsProgress,
  );

  const nationalCount =
    metricsProgress >= 0.995
      ? "1.1 million"
      : `${(1.1 * metricsProgress).toFixed(1)} million`;

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
      <div
        style={{
          width: "calc(100% - 36px)",
          height: "100%",
          marginInline: "auto",
          padding: "20px 0 14px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <header
          style={{
            flex: "0 0 auto",
            opacity: copyProgress,
            transform: `translateY(${
              (1 - copyProgress) * 16
            }px)`,
          }}
        >
          <div
            style={{
              marginBottom: "9px",
              color: colors.amberDeep,
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            The network
          </div>

          <h2
            style={{
              margin: 0,
              maxWidth: "8.5ch",
              fontSize: "clamp(38px, 11vw, 48px)",
              fontWeight: 600,
              lineHeight: 0.91,
              letterSpacing: "-0.064em",
            }}
          >
            One connected passenger network
            <span style={{ color: colors.amber }}>.</span>
          </h2>

          <p
            style={{
              margin: "12px 0 0",
              maxWidth: "33ch",
              color: "rgba(26,26,24,0.6)",
              fontSize: "13px",
              fontWeight: 500,
              lineHeight: 1.42,
              letterSpacing: "-0.018em",
            }}
          >
            Starting in Colombo and built to grow across Sri Lanka.
            Every journey measurable.
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
            borderRadius: "26px",
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.96), rgba(253,250,243,0.82))",
            border: "1px solid rgba(26,26,24,0.07)",
            boxShadow:
              "0 30px 70px -46px rgba(26,26,24,0.28)",
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
              transformOrigin: "center center",
              willChange: "opacity, transform",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: "0 24px 0",
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
              opacity: metricsProgress,
              transform: `translateY(${
                (1 - metricsProgress) * 18
              }px)`,
              willChange: "opacity, transform",
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
                boxShadow:
                  "0 14px 30px -24px rgba(26,26,24,0.3)",
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
                Colombo today
              </div>

              <div
                style={{
                  marginTop: "7px",
                  color: colors.ink,
                  fontSize: "clamp(23px, 6.7vw, 29px)",
                  fontWeight: 650,
                  lineHeight: 0.95,
                  letterSpacing: "-0.055em",
                  fontVariantNumeric: "tabular-nums",
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
                Tuk-tuks operating daily.
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
                boxShadow:
                  "0 16px 34px -24px rgba(26,26,24,0.48)",
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
                  fontVariantNumeric: "tabular-nums",
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

        <div
          style={{
            flex: "0 0 auto",
            display: "flex",
            justifyContent: "center",
            minHeight: "38px",
            marginTop: "8px",
            opacity: finalProgress,
            transform: `translateY(${
              (1 - finalProgress) * 9
            }px) scale(${0.97 + finalProgress * 0.03})`,
            willChange: "opacity, transform",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              padding: "8px 13px",
              borderRadius: "999px",
              border: "1px solid rgba(232,146,10,0.4)",
              background: "rgba(255,255,255,0.94)",
              color: colors.ink,
              fontSize: "11px",
              fontWeight: 700,
              boxShadow:
                "0 14px 30px -24px rgba(26,26,24,0.34)",
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
                color: colors.ink,
                fontSize: "10px",
                fontWeight: 800,
              }}
            >
              ✓
            </span>

            Every journey becomes measurable.
          </div>
        </div>
      </div>
    </div>
  );
}
