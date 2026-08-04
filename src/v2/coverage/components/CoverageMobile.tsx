import { colors } from "@/design";

type CoverageMobileProps = {
  progress: number;
};

type RoutePoint = {
  x: number;
  y: number;
  number: string;
  title: string;
  detail: string;
  time: string;
};

const routePoints: RoutePoint[] = [
  {
    x: 20,
    y: 136,
    number: "01",
    title: "Play recorded",
    detail: "Campaign active",
    time: "08:37",
  },
  {
    x: 83,
    y: 104,
    number: "02",
    title: "Location verified",
    detail: "GPS confirmed",
    time: "08:42",
  },
  {
    x: 151,
    y: 72,
    number: "03",
    title: "Vehicle attached",
    detail: "MYD-001",
    time: "08:44",
  },
  {
    x: 222,
    y: 96,
    number: "04",
    title: "Timestamp stored",
    detail: "Exact play time",
    time: "08:46",
  },
  {
    x: 282,
    y: 52,
    number: "05",
    title: "Added to report",
    detail: "Journey verified",
    time: "08:47",
  },
];

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

export function CoverageMobile({
  progress,
}: CoverageMobileProps) {
  const safeProgress = clamp(progress);

  const copyProgress = easeOutCubic(
    clamp(safeProgress / 0.16),
  );

  const stageProgress = easeOutCubic(
    clamp((safeProgress - 0.1) / 0.18),
  );

  const routeProgress = clamp(
    (safeProgress - 0.18) / 0.58,
  );

  const activeIndex = Math.min(
    routePoints.length - 1,
    Math.floor(routeProgress * routePoints.length),
  );

  const activePoint = routePoints[activeIndex];

  const cardProgress = easeOutCubic(
    clamp((routeProgress * routePoints.length) - activeIndex),
  );

  const finalProgress = easeOutCubic(
    clamp((safeProgress - 0.82) / 0.14),
  );

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        height: "100svh",
        overflow: "hidden",
        background: "#F2E7D5",
        color: colors.ink,
        fontFamily: '"DM Sans", system-ui, sans-serif',
      }}
    >
      <div
        style={{
          width: "calc(100% - 36px)",
          height: "100%",
          marginInline: "auto",
          padding: "20px 0 16px",
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
              (1 - copyProgress) * 14
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
            Live coverage
          </div>

          <h2
            style={{
              margin: 0,
              maxWidth: "8.8ch",
              fontSize: "clamp(38px, 11vw, 48px)",
              fontWeight: 600,
              lineHeight: 0.91,
              letterSpacing: "-0.064em",
            }}
          >
            Every journey across Colombo becomes measurable.
          </h2>

          <p
            style={{
              margin: "12px 0 0",
              maxWidth: "34ch",
              color: "rgba(26,26,24,0.6)",
              fontSize: "13px",
              lineHeight: 1.42,
              letterSpacing: "-0.018em",
            }}
          >
            Every verified play is connected to a real location, a real
            journey and a clear report.
          </p>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              marginTop: "10px",
              color: "rgba(26,26,24,0.52)",
              fontSize: "11px",
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
                boxShadow:
                  "0 0 0 4px rgba(245,166,35,0.12)",
              }}
            />

            Live in Colombo
          </div>
        </header>

        <div
          style={{
            position: "relative",
            flex: 1,
            minHeight: 0,
            marginTop: "15px",
            overflow: "hidden",
            borderRadius: "26px",
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.96), rgba(253,250,243,0.86))",
            border: "1px solid rgba(26,26,24,0.07)",
            boxShadow:
              "0 30px 70px -46px rgba(26,26,24,0.28)",
            opacity: stageProgress,
            transform: `translateY(${
              (1 - stageProgress) * 18
            }px) scale(${0.98 + stageProgress * 0.02})`,
            willChange: "opacity, transform",
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
                "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: "20px 18px 154px",
            }}
          >
            <svg
              viewBox="0 0 300 170"
              preserveAspectRatio="none"
              aria-label="Verified journey across Colombo"
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                overflow: "visible",
              }}
            >
              <path
                d="M20 136 C50 126, 62 111, 83 104 C106 96, 128 82, 151 72 C178 61, 197 90, 222 96 C244 100, 261 68, 282 52"
                fill="none"
                stroke="rgba(245,166,35,0.16)"
                strokeWidth="3"
                strokeLinecap="round"
              />

              <path
                d="M20 136 C50 126, 62 111, 83 104 C106 96, 128 82, 151 72 C178 61, 197 90, 222 96 C244 100, 261 68, 282 52"
                pathLength="1"
                fill="none"
                stroke={colors.amber}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="1"
                strokeDashoffset={1 - routeProgress}
              />

              {routePoints.map((point, index) => {
                const threshold =
                  index / (routePoints.length - 1);

                const visible =
                  routeProgress >= threshold;

                const active = index === activeIndex;

                return (
                  <g
                    key={point.number}
                    opacity={visible ? 1 : 0.18}
                  >
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={active ? 12 : 9}
                      fill={
                        active
                          ? "rgba(245,166,35,0.16)"
                          : "rgba(245,166,35,0.08)"
                      }
                    />

                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={active ? 6 : 4}
                      fill={colors.amber}
                      stroke="#fff"
                      strokeWidth="2"
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          <div
            key={activePoint.number}
            style={{
              position: "absolute",
              left: "18px",
              right: "18px",
              bottom: "18px",
              minHeight: "116px",
              padding: "16px",
              boxSizing: "border-box",
              borderRadius: "18px",
              background: "rgba(255,255,255,0.96)",
              border: "1px solid rgba(26,26,24,0.07)",
              boxShadow:
                "0 16px 36px -26px rgba(26,26,24,0.38)",
              opacity: 0.45 + cardProgress * 0.55,
              transform: `translateY(${
                (1 - cardProgress) * 10
              }px)`,
              willChange: "opacity, transform",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  color: colors.amberDeep,
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                }}
              >
                {activePoint.number}
              </div>

              <div
                style={{
                  color: "rgba(26,26,24,0.38)",
                  fontSize: "10px",
                  fontWeight: 650,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {activePoint.time}
              </div>
            </div>

            <div
              style={{
                marginTop: "15px",
                color: colors.ink,
                fontSize: "24px",
                fontWeight: 650,
                lineHeight: 0.98,
                letterSpacing: "-0.045em",
              }}
            >
              {activePoint.title}
            </div>

            <div
              style={{
                marginTop: "7px",
                display: "flex",
                alignItems: "center",
                gap: "7px",
                color: "rgba(26,26,24,0.5)",
                fontSize: "11px",
                fontWeight: 600,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: colors.amber,
                }}
              />

              {activePoint.detail}
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
