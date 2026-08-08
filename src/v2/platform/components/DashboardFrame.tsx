import { colors } from "@/design";

type DashboardFrameProps = {
  progress: number;
};

type Stage = "launch" | "verify" | "report";

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

function animatedValue(
  target: number,
  progress: number,
  delay = 0,
) {
  const localProgress = clamp(
    (progress - delay) / Math.max(0.01, 1 - delay),
  );

  if (localProgress >= 0.985) {
    return target;
  }

  return Math.round(
    target * easeOutCubic(localProgress),
  );
}

const mapNodes = [
  { id: "a", x: 92, y: 172, reveal: 0.08 },
  { id: "b", x: 176, y: 102, reveal: 0.24 },
  { id: "c", x: 278, y: 146, reveal: 0.42 },
  { id: "d", x: 372, y: 82, reveal: 0.62 },
  { id: "e", x: 458, y: 160, reveal: 0.8 },
] as const;

const mapEdges = [
  ["a", "b"],
  ["b", "c"],
  ["c", "d"],
  ["d", "e"],
] as const;

export function DashboardFrame({
  progress,
}: DashboardFrameProps) {
  const frameProgress = clamp(
    (progress - 0.1) / 0.22,
  );

  const stage: Stage =
    progress >= 0.79
      ? "report"
      : progress >= 0.64
        ? "verify"
        : "launch";

  const verifyProgress = clamp(
    (progress - 0.64) / 0.15,
  );

  const reportProgress = clamp(
    (progress - 0.79) / 0.1,
  );

  const activeNavigation =
    stage === "launch"
      ? "Campaigns"
      : stage === "verify"
        ? "Verified plays"
        : "Reports";

  const statusText =
    stage === "launch"
      ? "Campaign ready"
      : stage === "verify"
        ? "Verifying campaign plays"
        : "Monday report ready";

  const plays =
    stage === "launch"
      ? 0
      : stage === "report"
        ? 1284
        : animatedValue(
            1284,
            verifyProgress,
            0,
          );

  const vehicles =
    stage === "launch"
      ? 0
      : stage === "report"
        ? 12
        : animatedValue(
            12,
            verifyProgress,
            0.08,
          );

  const locations =
    stage === "launch"
      ? 0
      : stage === "report"
        ? 46
        : animatedValue(
            46,
            verifyProgress,
            0.16,
          );

  const cards = [
    {
      label: "Verified plays",
      value: plays.toLocaleString(),
    },
    {
      label: "Vehicles",
      value: vehicles.toLocaleString(),
    },
    {
      label: "Locations",
      value: locations.toLocaleString(),
    },
  ];

  const nodeById = Object.fromEntries(
    mapNodes.map((node) => [
      node.id,
      node,
    ]),
  );

  const networkProgress =
    stage === "launch"
      ? 0
      : stage === "report"
        ? 1
        : verifyProgress;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16 / 10",
        overflow: "hidden",
        borderRadius: "24px",
        background: "#FFFFFF",
        border:
          "1px solid rgba(26,26,24,0.08)",
        boxShadow:
          "0 36px 90px -42px rgba(0,0,0,0.62), 0 10px 24px -16px rgba(0,0,0,0.28)",
        opacity: frameProgress,
        transform: `perspective(1400px) rotateY(${
          (1 - frameProgress) * -6
        }deg) translateY(${
          (1 - frameProgress) * 24
        }px) scale(${
          0.965 + frameProgress * 0.035
        })`,
        transformOrigin: "center right",
        willChange: "opacity, transform",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          height: "44px",
          paddingInline: "18px",
          borderBottom:
            "1px solid rgba(26,26,24,0.07)",
          background:
            "rgba(253,250,243,0.72)",
        }}
      >
        {[0, 1, 2].map((item) => (
          <span
            key={item}
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background:
                item === 0
                  ? colors.amber
                  : "rgba(26,26,24,0.12)",
            }}
          />
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "190px minmax(0, 1fr)",
          height: "calc(100% - 44px)",
        }}
      >
        <aside
          style={{
            padding: "24px 18px",
            borderRight:
              "1px solid rgba(26,26,24,0.07)",
            background:
              "rgba(253,250,243,0.45)",
          }}
        >
          <div
            style={{
              marginBottom: "30px",
              color: colors.ink,
              fontFamily:
                '"Space Grotesk", system-ui, -apple-system, sans-serif',
              fontSize: "20px",
              fontWeight: 700,
              letterSpacing: "-0.04em",
            }}
          >
            myd
            <span style={{ color: colors.amber }}>
              ii
            </span>
            o
          </div>

          {[
            "Overview",
            "Campaigns",
            "Verified plays",
            "Reports",
          ].map((item) => {
            const active =
              item === activeNavigation;

            return (
              <div
                key={item}
                style={{
                  marginBottom: "8px",
                  padding: "10px 12px",
                  borderRadius: "10px",
                  background: active
                    ? "rgba(245,166,35,0.11)"
                    : "transparent",
                  color: active
                    ? colors.ink
                    : "rgba(26,26,24,0.5)",
                  fontFamily:
                    '"Space Grotesk", system-ui, -apple-system, sans-serif',
                  fontSize: "13px",
                  fontWeight: active
                    ? 650
                    : 500,
                  transform: active
                    ? "translateX(2px)"
                    : "translateX(0)",
                  transition:
                    "background 0.4s ease, color 0.4s ease, transform 0.4s ease",
                }}
              >
                {item}
              </div>
            );
          })}
        </aside>

        <div
          style={{
            padding: "26px 28px",
            fontFamily:
              '"Space Grotesk", system-ui, -apple-system, sans-serif',
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                color:
                  "rgba(26,26,24,0.46)",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Campaign overview
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color:
                  stage === "report"
                    ? colors.amberDeep
                    : "rgba(26,26,24,0.52)",
                fontSize: "12px",
                fontWeight: 650,
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: colors.amber,
                  boxShadow:
                    stage === "verify"
                      ? "0 0 0 5px rgba(245,166,35,0.12)"
                      : "none",
                }}
              />

              {statusText}
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(3, minmax(0, 1fr))",
              gap: "14px",
              marginBottom: "18px",
            }}
          >
            {cards.map((card) => (
              <div
                key={card.label}
                style={{
                  padding: "17px",
                  borderRadius: "16px",
                  background: colors.cream,
                  border:
                    "1px solid rgba(245,166,35,0.1)",
                }}
              >
                <div
                  style={{
                    marginBottom: "8px",
                    color:
                      "rgba(26,26,24,0.5)",
                    fontSize: "12px",
                  }}
                >
                  {card.label}
                </div>

                <div
                  style={{
                    color: colors.ink,
                    fontSize: "28px",
                    fontWeight: 650,
                    letterSpacing: "-0.05em",
                    fontVariantNumeric:
                      "tabular-nums",
                  }}
                >
                  {card.value}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              position: "relative",
              height: "calc(100% - 140px)",
              minHeight: "210px",
              overflow: "hidden",
              borderRadius: "18px",
              background:
                "linear-gradient(145deg, rgba(245,166,35,0.07), rgba(253,250,243,0.62))",
              border:
                "1px solid rgba(26,26,24,0.06)",
            }}
          >
            <svg
              viewBox="0 0 550 230"
              preserveAspectRatio="none"
              aria-label="Campaign verification network"
              style={{
                position: "absolute",
                inset: "8% 7%",
                width: "86%",
                height: "84%",
                overflow: "visible",
              }}
            >
              <path
                d="M50 198 C120 154 132 82 218 62 C310 40 368 75 500 28"
                fill="none"
                stroke="rgba(245,166,35,0.15)"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {mapEdges.map(
                ([fromId, toId], index) => {
                  const from =
                    nodeById[fromId];
                  const to =
                    nodeById[toId];

                  const threshold =
                    mapNodes[index + 1]
                      .reveal;

                  const lineProgress =
                    clamp(
                      (networkProgress -
                        threshold +
                        0.12) /
                        0.18,
                    );

                  const length = Math.hypot(
                    to.x - from.x,
                    to.y - from.y,
                  );

                  return (
                    <line
                      key={`${fromId}-${toId}`}
                      x1={from.x}
                      y1={from.y}
                      x2={to.x}
                      y2={to.y}
                      stroke={colors.amber}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={length}
                      strokeDashoffset={
                        length *
                        (1 - lineProgress)
                      }
                      opacity={lineProgress}
                    />
                  );
                },
              )}

              {mapNodes.map((node) => {
                const nodeProgress =
                  clamp(
                    (networkProgress -
                      node.reveal) /
                      0.14,
                  );

                return (
                  <g
                    key={node.id}
                    opacity={nodeProgress}
                    style={{
                      transformOrigin: `${node.x}px ${node.y}px`,
                      transform: `scale(${
                        0.65 +
                        nodeProgress * 0.35
                      })`,
                    }}
                  >
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="12"
                      fill="rgba(245,166,35,0.12)"
                    />

                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="6"
                      fill={colors.amber}
                      stroke="#FFFFFF"
                      strokeWidth="3"
                    />
                  </g>
                );
              })}
            </svg>

            {stage === "launch" && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "grid",
                  placeItems: "center",
                  color:
                    "rgba(26,26,24,0.4)",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                Waiting for verified plays
              </div>
            )}

            {stage === "report" && (
              <div
                style={{
                  position: "absolute",
                  right: "18px",
                  bottom: "18px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "9px 12px",
                  borderRadius: "999px",
                  background: "#FFFFFF",
                  border:
                    "1px solid rgba(26,26,24,0.07)",
                  boxShadow:
                    "0 12px 28px -18px rgba(26,26,24,0.28)",
                  color: colors.ink,
                  fontSize: "12px",
                  fontWeight: 650,
                  opacity: reportProgress,
                  transform: `translateY(${
                    (1 - reportProgress) * 8
                  }px)`,
                }}
              >
                <span
                  style={{
                    display: "grid",
                    placeItems: "center",
                    width: "19px",
                    height: "19px",
                    borderRadius: "50%",
                    background: colors.amber,
                    fontSize: "11px",
                  }}
                >
                  ✓
                </span>

                Report generated
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
