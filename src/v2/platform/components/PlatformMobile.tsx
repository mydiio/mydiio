import { colors } from "@/design";

type PlatformMobileProps = {
  progress: number;
};

type Stage = {
  number: string;
  title: string;
  body: string;
  nav: string;
  status: string;
};

const stages: Stage[] = [
  {
    number: "01",
    title: "Launch",
    body: "Create and deploy your campaign from one place.",
    nav: "Campaigns",
    status: "Campaign active",
  },
  {
    number: "02",
    title: "Verify",
    body: "See where, when and on which vehicle every play happened.",
    nav: "Verified plays",
    status: "Verifying campaign plays",
  },
  {
    number: "03",
    title: "Report",
    body: "Receive a clean verified performance report every Monday.",
    nav: "Reports",
    status: "Monday report ready",
  },
];

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

function formatCount(value: number) {
  return Math.round(value).toLocaleString();
}

export function PlatformMobile({
  progress,
}: PlatformMobileProps) {
  const safeProgress = clamp(progress);
  const copyProgress = easeOutCubic(
    clamp(safeProgress / 0.16),
  );

  const stagePosition = safeProgress * stages.length;
  const activeIndex = Math.min(
    stages.length - 1,
    Math.floor(stagePosition),
  );
  const activeStage = stages[activeIndex];
  const localProgress = clamp(
    stagePosition - activeIndex,
  );

  const dashboardProgress = easeOutCubic(
    clamp((safeProgress - 0.08) / 0.18),
  );

  const completionProgress = easeOutCubic(
    clamp((safeProgress - 0.82) / 0.14),
  );

  const verifiedTarget =
    activeIndex === 0 ? 0 : activeIndex === 1 ? 1284 : 1284;

  const locationsTarget =
    activeIndex === 0 ? 0 : activeIndex === 1 ? 46 : 46;

  const verifiedCount = formatCount(
    verifiedTarget *
      (activeIndex === 1 ? localProgress : 1),
  );

  const locationsCount = Math.round(
    locationsTarget *
      (activeIndex === 1 ? localProgress : 1),
  );

  const lineProgress =
    activeIndex === 0
      ? 0.06 + localProgress * 0.1
      : activeIndex === 1
        ? 0.18 + localProgress * 0.82
        : 1;

  const reportVisible = activeIndex === 2;

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
              color: colors.amber,
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            The platform
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
            Proof you can actually use.
          </h2>

          <p
            style={{
              margin: "12px 0 0",
              maxWidth: "34ch",
              color: "rgba(253,250,243,0.62)",
              fontSize: "13px",
              lineHeight: 1.42,
              letterSpacing: "-0.018em",
            }}
          >
            Build your campaign, follow every verified play and receive a
            clear report every Monday.
          </p>
        </header>

        <div
          style={{
            position: "relative",
            flex: "0 0 auto",
            height: "clamp(390px, 51svh, 430px)",
            minHeight: 0,
            marginTop: "14px",
            opacity: dashboardProgress,
            transform: `translateY(${
              (1 - dashboardProgress) * 18
            }px) scale(${0.975 + dashboardProgress * 0.025})`,
            transformOrigin: "center bottom",
            willChange: "opacity, transform",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              borderRadius: "25px",
              background: "#fff",
              color: colors.ink,
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow:
                "0 34px 74px -38px rgba(0,0,0,0.72)",
            }}
          >
            <div
              style={{
                flex: "0 0 auto",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                height: "34px",
                paddingInline: "14px",
                borderBottom:
                  "1px solid rgba(26,26,24,0.08)",
                background: "#fffdf8",
              }}
            >
              {["#F5A623", "#DDDCD8", "#DDDCD8"].map(
                (background, index) => (
                  <span
                    key={index}
                    aria-hidden="true"
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background,
                    }}
                  />
                ),
              )}

              <div
                style={{
                  marginLeft: "auto",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "rgba(26,26,24,0.42)",
                  fontSize: "9px",
                  fontWeight: 650,
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: colors.amber,
                    boxShadow:
                      "0 0 0 4px rgba(245,166,35,0.12)",
                  }}
                />

                {activeStage.status}
              </div>
            </div>

            <div
              style={{
                flex: 1,
                minHeight: 0,
                display: "grid",
                gridTemplateColumns: "70px minmax(0, 1fr)",
              }}
            >
              <aside
                style={{
                  minWidth: 0,
                  padding: "18px 9px",
                  borderRight:
                    "1px solid rgba(26,26,24,0.07)",
                  background: "#fffdf9",
                }}
              >
                <div
                  aria-label="mydiio"
                  style={{
                    marginBottom: "22px",
                    color: colors.ink,
                    fontSize: "15px",
                    fontWeight: 800,
                    letterSpacing: "-0.06em",
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
                    item === activeStage.nav;

                  return (
                    <div
                      key={item}
                      style={{
                        marginBottom: "8px",
                        padding: "8px 7px",
                        overflow: "hidden",
                        borderRadius: "9px",
                        background: active
                          ? "rgba(245,166,35,0.13)"
                          : "transparent",
                        color: active
                          ? colors.ink
                          : "rgba(26,26,24,0.46)",
                        fontSize: "8px",
                        fontWeight: active ? 700 : 550,
                        lineHeight: 1.15,
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item}
                    </div>
                  );
                })}
              </aside>

              <main
                style={{
                  minWidth: 0,
                  padding: "15px 11px 11px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      color: "rgba(26,26,24,0.47)",
                      fontSize: "9px",
                      fontWeight: 700,
                      letterSpacing: "0.13em",
                      textTransform: "uppercase",
                    }}
                  >
                    Campaign overview
                  </div>

                  <div
                    style={{
                      color: colors.amberDeep,
                      fontSize: "8px",
                      fontWeight: 700,
                    }}
                  >
                    {activeStage.number} / 03
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(3, minmax(0, 1fr))",
                    gap: "7px",
                    marginTop: "13px",
                  }}
                >
                  {[
                    {
                      label: "Verified plays",
                      value: verifiedCount,
                    },
                    {
                      label: "Vehicles",
                      value: "12",
                    },
                    {
                      label: "Locations",
                      value: String(locationsCount),
                    },
                  ].map((metric) => (
                    <div
                      key={metric.label}
                      style={{
                        minWidth: 0,
                        padding: "11px 8px",
                        borderRadius: "13px",
                        background: "#fdf9f1",
                        border:
                          "1px solid rgba(26,26,24,0.065)",
                      }}
                    >
                      <div
                        style={{
                          minHeight: "20px",
                          color: "rgba(26,26,24,0.45)",
                          fontSize: "7px",
                          lineHeight: 1.15,
                        }}
                      >
                        {metric.label}
                      </div>

                      <div
                        style={{
                          marginTop: "5px",
                          color: colors.ink,
                          fontSize: "18px",
                          fontWeight: 700,
                          lineHeight: 1,
                          letterSpacing: "-0.05em",
                          fontVariantNumeric:
                            "tabular-nums",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    position: "relative",
                    height: "clamp(150px, 21svh, 180px)",
                    marginTop: "10px",
                    overflow: "hidden",
                    borderRadius: "15px",
                    background:
                      "linear-gradient(145deg, #fffaf0, #fdf9f3)",
                    border:
                      "1px solid rgba(26,26,24,0.065)",
                  }}
                >
                  <svg
                    aria-label="Verified campaign activity"
                    viewBox="0 0 300 170"
                    preserveAspectRatio="none"
                    style={{
                      display: "block",
                      width: "100%",
                      height: "100%",
                      overflow: "visible",
                    }}
                  >
                    {[35, 70, 105, 140].map((y) => (
                      <line
                        key={y}
                        x1="0"
                        y1={y}
                        x2="300"
                        y2={y}
                        stroke="rgba(26,26,24,0.035)"
                        strokeWidth="1"
                      />
                    ))}

                    <path
                      d="M18 136 C45 104, 65 78, 94 91 C119 103, 139 55, 170 69 C203 84, 214 39, 242 55 C263 67, 273 92, 286 79"
                      fill="none"
                      stroke="rgba(245,166,35,0.2)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />

                    <path
                      d="M18 136 C45 104, 65 78, 94 91 C119 103, 139 55, 170 69 C203 84, 214 39, 242 55 C263 67, 273 92, 286 79"
                      pathLength="1"
                      fill="none"
                      stroke={colors.amber}
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray="1"
                      strokeDashoffset={1 - lineProgress}
                    />

                    {[
                      [18, 136, 0.04],
                      [94, 91, 0.28],
                      [170, 69, 0.53],
                      [242, 55, 0.77],
                      [286, 79, 0.96],
                    ].map(([x, y, threshold], index) => {
                      const visible =
                        lineProgress >= threshold;

                      return (
                        <g
                          key={index}
                          opacity={visible ? 1 : 0}
                        >
                          <circle
                            cx={x}
                            cy={y}
                            r="8"
                            fill="rgba(245,166,35,0.13)"
                          />
                          <circle
                            cx={x}
                            cy={y}
                            r="4"
                            fill={colors.amber}
                            stroke="#fff"
                            strokeWidth="2"
                          />
                        </g>
                      );
                    })}
                  </svg>

                  <div
                    style={{
                      position: "absolute",
                      left: "12px",
                      bottom: "10px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      color: "rgba(26,26,24,0.52)",
                      fontSize: "8px",
                      fontWeight: 650,
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

                    Every play connected to proof
                  </div>

                  <div
                    style={{
                      position: "absolute",
                      inset: "12px",
                      display: "grid",
                      placeItems: "center",
                      opacity: reportVisible
                        ? completionProgress
                        : 0,
                      transform: `translateY(${
                        (1 - completionProgress) * 10
                      }px)`,
                      pointerEvents: "none",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        padding: "16px",
                        boxSizing: "border-box",
                        borderRadius: "14px",
                        background:
                          "rgba(255,255,255,0.96)",
                        border:
                          "1px solid rgba(26,26,24,0.07)",
                        boxShadow:
                          "0 18px 36px -26px rgba(26,26,24,0.4)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: "12px",
                        }}
                      >
                        <div
                          style={{
                            color: colors.amberDeep,
                            fontSize: "8px",
                            fontWeight: 700,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                          }}
                        >
                          Monday report
                        </div>

                        <div
                          style={{
                            color: "rgba(26,26,24,0.4)",
                            fontSize: "8px",
                          }}
                        >
                          Ready
                        </div>
                      </div>

                      <div
                        style={{
                          marginTop: "13px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "12px",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              color: colors.ink,
                              fontSize: "18px",
                              fontWeight: 700,
                              letterSpacing: "-0.04em",
                            }}
                          >
                            1,284 verified plays
                          </div>

                          <div
                            style={{
                              marginTop: "4px",
                              color:
                                "rgba(26,26,24,0.5)",
                              fontSize: "8px",
                            }}
                          >
                            12 vehicles · 46 locations
                          </div>
                        </div>

                        <span
                          aria-hidden="true"
                          style={{
                            display: "grid",
                            placeItems: "center",
                            width: "27px",
                            height: "27px",
                            flex: "0 0 auto",
                            borderRadius: "50%",
                            background: colors.amber,
                            color: colors.ink,
                            fontSize: "13px",
                            fontWeight: 800,
                          }}
                        >
                          ✓
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>

        <div
          aria-label={`Platform stage ${
            activeIndex + 1
          } of ${stages.length}`}
          style={{
            flex: "0 0 auto",
            display: "grid",
            gridTemplateColumns:
              "repeat(3, minmax(0, 1fr))",
            gap: "7px",
            marginTop: "auto",
            paddingTop: "12px",
          }}
        >
          {stages.map((stage, index) => {
            const active = index === activeIndex;
            const past = index < activeIndex;

            return (
              <div
                key={stage.number}
                style={{
                  minWidth: 0,
                  paddingTop: "9px",
                  borderTop: `1px solid ${
                    active || past
                      ? colors.amber
                      : "rgba(253,250,243,0.12)"
                  }`,
                  opacity: active ? 1 : past ? 0.48 : 0.24,
                }}
              >
                <div
                  style={{
                    color:
                      active || past
                        ? colors.amber
                        : "rgba(253,250,243,0.4)",
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                  }}
                >
                  {stage.number}
                </div>

                <div
                  style={{
                    marginTop: "6px",
                    color: colors.cream,
                    fontSize: "13px",
                    fontWeight: 650,
                    lineHeight: 1,
                  }}
                >
                  {stage.title}
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            flex: "0 0 auto",
            minHeight: "30px",
            marginTop: "5px",
            color: "rgba(253,250,243,0.52)",
            fontSize: "10px",
            lineHeight: 1.3,
            opacity: 0.45 + localProgress * 0.55,
          }}
        >
          {activeStage.body}
        </div>
      </div>
    </div>
  );
}
