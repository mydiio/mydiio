import { colors } from "@/design";

type Props = {
  progress: number;
};

type ConnectionItem = {
  label: string;
  value: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
};

const connectionItems: ConnectionItem[] = [
  {
    label: "Passenger",
    value: "Useful information",
    position: "top-left",
  },
  {
    label: "Business",
    value: "Measurable reach",
    position: "top-right",
  },
  {
    label: "Driver",
    value: "Additional income",
    position: "bottom-left",
  },
  {
    label: "Operations",
    value: "Network visibility",
    position: "bottom-right",
  },
];

const stages = ["One device", "Screen on", "Value created", "Connected", "One node"] as const;

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

function TabletShell({
  assemble,
  activate,
  utility,
  collapse,
}: {
  assemble: number;
  activate: number;
  utility: number;
  collapse: number;
}) {
  const interfaceOpacity = activate * (1 - collapse);
  const contentProgress = utility * (1 - collapse);

  return (
    <div
      className="node-device-shell node-motion"
      style={{
        position: "absolute",
        zIndex: 8,
        left: "50%",
        top: "49%",
        width: "clamp(270px, 31vw, 450px)",
        aspectRatio: "1.52 / 1",
        padding: "10px",
        borderRadius: "clamp(20px, 2.1vw, 29px)",
        boxSizing: "border-box",
        background: colors.ink,
        opacity: assemble * (1 - collapse * 0.86),
        transform: `translate(-50%, -50%) scale(${0.76 + assemble * 0.24 - collapse * 0.34})`,
        boxShadow: `
          0 32px 90px -42px rgba(26,26,24,0.62),
          0 0 ${activate * 56}px rgba(245,166,35,${activate * 0.16})
        `,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          borderRadius: "clamp(12px, 1.35vw, 20px)",
          background: colors.cream,
          padding: "clamp(14px, 1.5vw, 21px)",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            opacity: interfaceOpacity,
            transform: `translateY(${(1 - interfaceOpacity) * 12}px)`,
          }}
        >
          <div>
            <div
              style={{
                color: colors.ink,
                fontSize: "clamp(18px, 2vw, 28px)",
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: "-0.05em",
              }}
            >
              10:30 AM
            </div>

            <div
              style={{
                marginTop: "5px",
                color: "rgba(26,26,24,0.46)",
                fontSize: "clamp(7px, 0.65vw, 10px)",
                fontWeight: 600,
              }}
            >
              Monday, 21 April
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div
              style={{
                color: "rgba(26,26,24,0.48)",
                fontSize: "clamp(7px, 0.65vw, 10px)",
                fontWeight: 600,
              }}
            >
              Colombo
            </div>

            <div
              style={{
                marginTop: "3px",
                color: colors.ink,
                fontSize: "clamp(18px, 1.8vw, 26px)",
                fontWeight: 700,
              }}
            >
              28°
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "clamp(7px, 0.8vw, 11px)",
            marginTop: "clamp(13px, 1.35vw, 19px)",
          }}
        >
          {[
            ["News", "Latest updates"],
            ["Local", "Nearby offers"],
            ["Community", "Events and notices"],
          ].map(([title, description], index) => {
            const itemProgress = easeOutCubic(
              range(contentProgress, index * 0.12, 0.48 + index * 0.12),
            );

            return (
              <div
                key={title}
                style={{
                  minHeight: "clamp(66px, 6.7vw, 94px)",
                  padding: "clamp(9px, 0.85vw, 12px)",
                  borderRadius: "clamp(9px, 0.85vw, 12px)",
                  border: "1px solid rgba(26,26,24,0.1)",
                  background: "rgba(255,255,255,0.72)",
                  boxSizing: "border-box",
                  opacity: itemProgress,
                  transform: `translateY(${(1 - itemProgress) * 12}px)`,
                }}
              >
                <span
                  style={{
                    display: "block",
                    width: "8px",
                    height: "8px",
                    marginBottom: "9px",
                    borderRadius: "50%",
                    border: `1px solid ${colors.amber}`,
                    background: "rgba(245,166,35,0.13)",
                  }}
                />

                <div
                  style={{
                    color: colors.ink,
                    fontSize: "clamp(7px, 0.67vw, 10px)",
                    fontWeight: 700,
                  }}
                >
                  {title}
                </div>

                <div
                  style={{
                    marginTop: "4px",
                    color: "rgba(26,26,24,0.48)",
                    fontSize: "clamp(5px, 0.5vw, 7px)",
                    fontWeight: 600,
                    lineHeight: 1.3,
                  }}
                >
                  {description}
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "clamp(9px, 1vw, 14px)",
            padding: "clamp(9px, 0.9vw, 12px)",
            borderRadius: "clamp(8px, 0.85vw, 11px)",
            border: "1px solid rgba(245,166,35,0.34)",
            background: "rgba(245,166,35,0.075)",
            opacity: contentProgress,
            transform: `translateY(${(1 - contentProgress) * 10}px)`,
          }}
        >
          <span
            style={{
              flex: "0 0 auto",
              width: "9px",
              height: "9px",
              borderRadius: "50%",
              background: colors.amber,
            }}
          />

          <div>
            <div
              style={{
                color: colors.ink,
                fontSize: "clamp(7px, 0.67vw, 10px)",
                fontWeight: 700,
              }}
            >
              Emergency notice
            </div>

            <div
              style={{
                marginTop: "2px",
                color: "rgba(26,26,24,0.48)",
                fontSize: "clamp(5px, 0.5vw, 7px)",
                fontWeight: 600,
              }}
            >
              Useful information when it matters
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DevicePart({
  label,
  detail,
  x,
  y,
  rotate,
  progress,
  entrance,
}: {
  label: string;
  detail: string;
  x: number;
  y: number;
  rotate: number;
  progress: number;
  entrance: number;
}) {
  const movement = easeInOutCubic(range(progress, 0.32, 1));

  return (
    <div
      className="node-device-part node-motion"
      style={{
        position: "absolute",
        zIndex: 5,
        left: "50%",
        top: "49%",
        opacity: entrance * (1 - easeInOutCubic(range(progress, 0.62, 0.96))),
        transform: `
          translate(
            calc(-50% + ${x * (1 - movement)}px),
            calc(-50% + ${y * (1 - movement)}px)
          )
          rotate(${rotate * (1 - movement)}deg)
          scale(${0.9 + movement * 0.1})
        `,
      }}
    >
      <div
        style={{
          color: colors.amberDeep,
          fontSize: "9px",
          fontWeight: 700,
          letterSpacing: "0.13em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>

      <div
        style={{
          marginTop: "5px",
          color: colors.ink,
          fontSize: "13px",
          fontWeight: 650,
          letterSpacing: "-0.025em",
        }}
      >
        {detail}
      </div>
    </div>
  );
}

function ConnectionLabel({
  item,
  progress,
  collapse,
}: {
  item: ConnectionItem;
  progress: number;
  collapse: number;
}) {
  const positions = {
    "top-left": {
      left: "-1%",
      top: "12%",
      originX: "100%",
      originY: "100%",
    },
    "top-right": {
      right: "-1%",
      top: "12%",
      originX: "0%",
      originY: "100%",
    },
    "bottom-left": {
      left: "-1%",
      bottom: "12%",
      originX: "100%",
      originY: "0%",
    },
    "bottom-right": {
      right: "-1%",
      bottom: "12%",
      originX: "0%",
      originY: "0%",
    },
  } as const;

  const config = positions[item.position];
  const visibility = progress * (1 - collapse);

  return (
    <div
      className="node-connection-label node-motion"
      style={{
        position: "absolute",
        zIndex: 12,
        ...config,
        opacity: easeOutCubic(visibility),
        transform: `translateY(${(1 - visibility) * 10}px) scale(${0.94 + visibility * 0.06})`,
        transformOrigin: `${config.originX} ${config.originY}`,
      }}
    >
      <div
        style={{
          color: colors.amberDeep,
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        {item.label}
      </div>

      <div
        style={{
          marginTop: "5px",
          color: colors.ink,
          fontSize: "clamp(14px, 1.2vw, 18px)",
          fontWeight: 650,
          lineHeight: 1.16,
          letterSpacing: "-0.028em",
        }}
      >
        {item.value}
      </div>
    </div>
  );
}

function ConnectionLines({ progress, collapse }: { progress: number; collapse: number }) {
  const visibility = progress * (1 - collapse);

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1000 600"
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        zIndex: 7,
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "visible",
        opacity: visibility,
      }}
    >
      {[
        "M500 294 C400 260 315 170 205 120",
        "M500 294 C600 260 685 170 795 120",
        "M500 294 C400 335 315 430 205 485",
        "M500 294 C600 335 685 430 795 485",
      ].map((path, index) => (
        <path
          key={path}
          d={path}
          fill="none"
          stroke="rgba(245,166,35,0.72)"
          strokeWidth="1.6"
          strokeDasharray="7 9"
          pathLength="1"
          strokeDashoffset={1 - visibility}
          style={{
            filter: index === 0 ? "drop-shadow(0 0 8px rgba(245,166,35,0.18))" : undefined,
          }}
        />
      ))}
    </svg>
  );
}

function NetworkNodes({ progress }: { progress: number }) {
  const nodes = [
    { x: 31, y: 34, size: 7, delay: 0 },
    { x: 69, y: 34, size: 7, delay: 0.06 },
    { x: 31, y: 64, size: 7, delay: 0.12 },
    { x: 69, y: 64, size: 7, delay: 0.18 },
    { x: 18, y: 24, size: 6, delay: 0.25 },
    { x: 82, y: 24, size: 6, delay: 0.31 },
    { x: 18, y: 75, size: 6, delay: 0.37 },
    { x: 82, y: 75, size: 6, delay: 0.43 },
    { x: 50, y: 17, size: 5, delay: 0.49 },
    { x: 50, y: 82, size: 5, delay: 0.55 },
  ];

  return (
    <>
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          zIndex: 2,
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: progress * 0.82,
        }}
      >
        <path
          d="
            M50 49 L31 34 L18 24
            M50 49 L69 34 L82 24
            M50 49 L31 64 L18 75
            M50 49 L69 64 L82 75
            M50 49 L50 17
            M50 49 L50 82
          "
          fill="none"
          stroke="rgba(245,166,35,0.62)"
          strokeWidth="0.32"
          strokeDasharray="2 2"
        />
      </svg>

      {nodes.map((node, index) => {
        const localProgress = easeOutCubic(
          range(progress, node.delay, Math.min(1, node.delay + 0.44)),
        );

        return (
          <span
            key={`${node.x}-${node.y}`}
            aria-hidden="true"
            style={{
              position: "absolute",
              zIndex: 3,
              left: `${node.x}%`,
              top: `${node.y}%`,
              width: `${node.size}px`,
              height: `${node.size}px`,
              borderRadius: "50%",
              background: colors.amber,
              opacity: localProgress,
              transform: `translate(-50%, -50%) scale(${0.5 + localProgress * 0.5})`,
              boxShadow: `
                0 0 0 7px rgba(245,166,35,0.07),
                0 0 26px rgba(245,166,35,0.25)
              `,
            }}
          />
        );
      })}

      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          zIndex: 14,
          left: "50%",
          top: "49%",
          width: "18px",
          height: "18px",
          borderRadius: "50%",
          background: colors.amber,
          opacity: progress,
          transform: `translate(-50%, -50%) scale(${0.7 + progress * 0.55})`,
          boxShadow: `
            0 0 0 ${10 + progress * 14}px rgba(245,166,35,0.1),
            0 0 ${35 + progress * 38}px rgba(245,166,35,0.42)
          `,
        }}
      />
    </>
  );
}

export function NodeRevealScene({ progress }: Props) {
  const sceneIn = easeOutCubic(range(progress, 0.025, 0.105));
  const headerIn = easeOutCubic(range(progress, 0.045, 0.13));
  const headerOut = easeInOutCubic(range(progress, 0.88, 0.97));

  const partsIn = easeOutCubic(range(progress, 0.05, 0.11));
  const assemblyIn = easeInOutCubic(range(progress, 0.2, 0.41));
  const activationIn = easeOutCubic(range(progress, 0.37, 0.5));
  const utilityIn = easeOutCubic(range(progress, 0.46, 0.61));
  const connectionsIn = easeOutCubic(range(progress, 0.62, 0.82));
  const collapse = easeInOutCubic(range(progress, 0.86, 0.94));
  const nodeIn = easeOutCubic(range(progress, 0.91, 0.98));
  const networkIn = easeOutCubic(range(progress, 0.96, 1));

  const activeStage = Math.min(stages.length - 1, Math.floor(clamp(progress) * stages.length));

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
      <style>{`
        .node-reveal-frame {
          width: min(1240px, calc(100% - 56px));
        }

        .node-reveal-heading {
          font-size: clamp(40px, 4.3vw, 68px);
        }

        .node-reveal-stage {
          width: min(930px, 78vw);
          height: min(535px, 58vh);
        }

        .node-device-part {
          width: 142px;
          padding: 12px 14px;
          border-radius: 14px;
          box-sizing: border-box;
          background: rgba(255,255,255,0.72);
          border: 1px solid rgba(26,26,24,0.08);
          box-shadow: 0 18px 50px -38px rgba(26,26,24,0.4);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }

        .node-connection-label {
          width: clamp(158px, 14vw, 196px);
          padding: 14px 16px;
          border-radius: 16px;
          box-sizing: border-box;
          background: rgba(255,255,255,0.82);
          border: 1px solid rgba(26,26,24,0.08);
          box-shadow: 0 22px 58px -40px rgba(26,26,24,0.42);
          backdrop-filter: blur(18px) saturate(140%);
          -webkit-backdrop-filter: blur(18px) saturate(140%);
        }

        @media (max-width: 700px) {
          .node-reveal-frame {
            width: calc(100% - 28px);
          }

          .node-reveal-heading {
            font-size: clamp(34px, 9.5vw, 48px);
          }

          .node-reveal-stage {
            width: 100%;
            height: min(470px, 54vh);
          }

          .node-device-part {
            width: 118px;
            padding: 10px 11px;
          }

          .node-connection-label {
            width: 132px;
            padding: 10px 11px;
          }

          .node-progress-label {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .node-motion {
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
          top: "55%",
          width: "min(980px, 92vw)",
          height: "min(980px, 92vw)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(245,166,35,0.105), rgba(245,166,35,0.025) 42%, transparent 70%)",
          opacity: 0.18 + nodeIn * 0.82,
          transform: "translate(-50%, -50%)",
        }}
      />

      <div
        className="node-reveal-frame"
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          marginInline: "auto",
          padding: "clamp(88px, 9.5vh, 108px) 0 28px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          opacity: sceneIn,
          transform: `translateY(${(1 - sceneIn) * 30}px)`,
          pointerEvents: sceneIn > 0.05 ? "auto" : "none",
        }}
      >
        <header
          className="node-motion"
          style={{
            position: "relative",
            zIndex: 20,
            textAlign: "center",
            opacity: headerIn * (1 - headerOut),
            transform: `translateY(${(1 - headerIn) * 20 - headerOut * 28}px)`,
          }}
        >
          <div
            style={{
              color: colors.amberDeep,
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            From device to node
          </div>

          <h2
            className="node-reveal-heading"
            style={{
              margin: "13px auto 0",
              maxWidth: "13ch",
              fontWeight: 600,
              lineHeight: 0.96,
              letterSpacing: "-0.058em",
            }}
          >
            This is how the network enters a journey.
          </h2>
        </header>

        <div
          className="node-reveal-stage"
          style={{
            position: "relative",
            margin: "clamp(16px, 2.5vh, 28px) auto 0",
          }}
        >
          <NetworkNodes progress={networkIn} />

          <div
            aria-hidden="true"
            className="node-motion"
            style={{
              position: "absolute",
              zIndex: 3,
              left: "50%",
              top: "49%",
              width: "clamp(270px, 31vw, 450px)",
              aspectRatio: "1.52 / 1",
              border: "4px solid rgba(26,26,24,0.13)",
              borderRadius: "clamp(20px, 2.1vw, 29px)",
              boxSizing: "border-box",
              opacity:
                partsIn * (1 - easeInOutCubic(range(assemblyIn, 0.38, 0.9))) * (1 - collapse),
              transform: `translate(-50%, -50%) scale(${0.96 + assemblyIn * 0.04})`,
              boxShadow: "0 24px 70px -48px rgba(26,26,24,0.34)",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: "9px",
                border: "1px solid rgba(26,26,24,0.075)",
                borderRadius: "clamp(12px, 1.35vw, 20px)",
              }}
            />
          </div>

          <DevicePart
            label="Mount"
            detail="Secure fitting"
            x={-225}
            y={-112}
            rotate={-8}
            progress={assemblyIn}
            entrance={partsIn}
          />

          <DevicePart
            label="Connectivity"
            detail="Always connected"
            x={225}
            y={-112}
            rotate={8}
            progress={assemblyIn}
            entrance={partsIn}
          />

          <DevicePart
            label="Identity"
            detail="Vehicle ID"
            x={-225}
            y={120}
            rotate={7}
            progress={assemblyIn}
            entrance={partsIn}
          />

          <DevicePart
            label="Location"
            detail="GPS enabled"
            x={225}
            y={120}
            rotate={-7}
            progress={assemblyIn}
            entrance={partsIn}
          />

          <ConnectionLines progress={connectionsIn} collapse={collapse} />

          <TabletShell
            assemble={assemblyIn}
            activate={activationIn}
            utility={utilityIn}
            collapse={collapse}
          />

          {connectionItems.map((item) => (
            <ConnectionLabel
              key={item.label}
              item={item}
              progress={connectionsIn}
              collapse={collapse}
            />
          ))}
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 18,
            width: "min(860px, 100%)",
            margin: "auto auto 0",
          }}
        >
          <div
            style={{
              position: "relative",
              height: "2px",
              borderRadius: "999px",
              background: "rgba(26,26,24,0.09)",
            }}
          >
            <div
              style={{
                width: `${progress * 100}%`,
                height: "100%",
                borderRadius: "999px",
                background: colors.amber,
              }}
            />

            {stages.map((stage, index) => {
              const position = index / (stages.length - 1);
              const active = progress >= position - 0.02;

              return (
                <div
                  key={stage}
                  style={{
                    position: "absolute",
                    left: `${position * 100}%`,
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      width: active ? "13px" : "9px",
                      height: active ? "13px" : "9px",
                      borderRadius: "50%",
                      background: active ? colors.amber : colors.cream,
                      border: `2px solid ${active ? colors.amber : "rgba(26,26,24,0.18)"}`,
                      boxShadow: active ? "0 0 0 5px rgba(245,166,35,0.1)" : "none",
                    }}
                  />

                  <span
                    className="node-progress-label"
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "19px",
                      transform: "translateX(-50%)",
                      color: index === activeStage ? colors.ink : "rgba(26,26,24,0.36)",
                      fontSize: "9px",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {stage}
                  </span>
                </div>
              );
            })}
          </div>

          <div
            className="node-motion"
            style={{
              marginTop: "27px",
              textAlign: "center",
              opacity: nodeIn,
              transform: `translateY(${(1 - nodeIn) * 14}px)`,
            }}
          >
            <div
              style={{
                color: colors.amberDeep,
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              One connected node
            </div>

            <p
              style={{
                margin: "8px auto 0",
                maxWidth: "24ch",
                color: colors.ink,
                fontSize: "clamp(22px, 2.65vw, 37px)",
                fontWeight: 600,
                lineHeight: 1.04,
                letterSpacing: "-0.045em",
              }}
            >
              One device connects passengers, drivers, businesses and operations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
