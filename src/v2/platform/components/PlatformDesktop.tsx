import { colors } from "@/design";

type PlatformSceneProps = {
  progress: number;
};

const participants = [
  {
    number: "01",
    title: "Passengers",
    description: "Useful information throughout the journey.",
    icon: "passenger",
  },
  {
    number: "02",
    title: "Drivers",
    description: "Connected vehicles across the network.",
    icon: "driver",
  },
  {
    number: "03",
    title: "Businesses",
    description: "Relevant messages delivered along the way.",
    icon: "business",
  },
] as const;

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

function range(value: number, start: number, end: number) {
  return clamp((value - start) / (end - start));
}

function ease(value: number) {
  return value * value * (3 - 2 * value);
}

function ParticipantIcon({ type }: { type: string }) {
  if (type === "passenger") {
    return (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <circle cx="24" cy="14" r="7" stroke="currentColor" strokeWidth="1.7" />
        <path d="M10 39c1-10 6-15 14-15s13 5 14 15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "driver") {
    return (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M10 31V19l5-8h18l5 8v12M10 31h28M15 31v5M33 31v5M10 20h28" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round" />
        <circle cx="16" cy="27" r="2" fill="currentColor" />
        <circle cx="32" cy="27" r="2" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M10 20h10l17-9v26l-17-9H10V20Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="m16 29 4 10h8l-5-10M39 19c3 3 3 8 0 11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function PlatformDesktop({ progress }: PlatformSceneProps) {
  const p = clamp(progress);

  const intro = ease(range(p, 0, 0.045));
  const cards = ease(range(p, 0.08, 0.22));
  const connections = ease(range(p, 0.20, 0.34));
  const platform = ease(range(p, 0.27, 0.42));
  const exit = ease(range(p, 0.58, 0.96));
  const conclusion = ease(range(p, 0.58, 0.96));

  return (
    <div
      className="atlas-network-redesign"
      style={{
        position: "sticky",
        top: 0,
        height: "100svh",
        overflow: "hidden",
        background: colors.ink,
        color: colors.cream,
        fontFamily: '"Space Grotesk", system-ui, sans-serif',
      }}
    >
      <style>{`
        .atlas-network-redesign * { box-sizing: border-box; }
        .atlas-network-content {
          width: min(1180px, calc(100% - 88px));
          height: 100%;
          margin: auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: clamp(20px, 3.5svh, 36px);
          padding: 94px 0 26px;
        }
        .atlas-network-heading {
          font-size: clamp(34px, min(4.6vw, 7svh), 70px);
          letter-spacing: -0.065em;
          line-height: 1;
          font-weight: 600;
          margin: 0;
        }
        .atlas-network-cards {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }
        .atlas-network-card {
          min-width: 0;
          border: 1px solid rgba(253,250,243,0.13);
          border-radius: 18px;
          background: rgba(253,250,243,0.035);
          padding: clamp(14px, 2vw, 25px);
        }
        .atlas-network-card-icon {
          width: 40px;
          height: 40px;
          color: ${colors.amber};
          margin-bottom: 14px;
        }
        .atlas-network-platform {
          width: min(680px, 100%);
          margin-inline: auto;
          border: 1px solid rgba(245,166,35,0.55);
          border-radius: 20px;
          background: radial-gradient(ellipse at top, rgba(245,166,35,0.13), rgba(245,166,35,0.025) 68%);
          padding: 22px 30px;
          text-align: center;
        }
        .atlas-network-connections {
          height: clamp(24px, 5svh, 55px);
          width: 100%;
          margin: -14px auto;
          pointer-events: none;
        }
        @media (max-height: 680px) {
          .atlas-network-content {
            gap: 12px;
            padding-top: 82px;
            padding-bottom: 12px;
          }
          .atlas-network-card { padding: 12px 16px; }
          .atlas-network-card-icon { width: 26px; height: 26px; margin-bottom: 6px; }
          .atlas-network-platform { padding: 12px 20px; }
          .atlas-network-connections { height: 24px; margin: -6px auto; }
        }
        @media (max-width: 980px) {
          .atlas-network-content { width: calc(100% - 48px); }
          .atlas-network-cards { gap: 10px; }
          .atlas-network-card { padding: 14px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .atlas-network-redesign * {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>

      <div
        className="atlas-network-content"
        style={{
          opacity: 1,
          transform: `translateY(${-exit * 110}svh)`,
        }}
      >
        <header
          style={{
            textAlign: "center",
            opacity: intro,
            transform: `translateY(${(1 - intro) * 20}px)`,
          }}
        >
          <p
            style={{
              margin: "0 0 12px",
              color: colors.amber,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.2em",
            }}
          >
            THE MYDIIO NETWORK
          </p>

          <h2 className="atlas-network-heading">
            Every journey connects more.
          </h2>

          <p
            style={{
              maxWidth: 660,
              margin: "14px auto 0",
              color: "rgba(253,250,243,0.62)",
              fontSize: "clamp(13px, 1.15vw, 17px)",
              lineHeight: 1.5,
            }}
          >
            One network connecting the people who travel, the people who drive,
            and the businesses around them.
          </p>
        </header>

        <div
          className="atlas-network-cards"
          style={{
            opacity: cards,
            transform: `translateY(${(1 - cards) * 24}px)`,
          }}
        >
          {participants.map((item, index) => (
            <div
              key={item.title}
              className="atlas-network-card"
              style={{
                opacity: ease(range(p, 0.08 + index * 0.035, 0.20 + index * 0.035)),
                transform: `translateY(${(1 - ease(range(p, 0.08 + index * 0.035, 0.20 + index * 0.035))) * 16}px)`,
              }}
            >
              <div className="atlas-network-card-icon">
                <ParticipantIcon type={item.icon} />
              </div>

              <div
                style={{
                  color: colors.amber,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                }}
              >
                {item.number}
              </div>

              <h3
                style={{
                  fontSize: "clamp(17px, 1.7vw, 24px)",
                  margin: "6px 0",
                  letterSpacing: "-0.04em",
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  margin: 0,
                  color: "rgba(253,250,243,0.55)",
                  fontSize: "clamp(11px, 1vw, 14px)",
                  lineHeight: 1.45,
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div
          className="atlas-network-connections"
          aria-hidden="true"
          style={{
            opacity: connections,
          }}
        >
          <svg
            viewBox="0 0 900 70"
            preserveAspectRatio="none"
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              overflow: "visible",
            }}
          >
            <path
              d="M150 0 V24 Q150 35 162 35 H738 Q750 35 750 24 V0 M450 0 V70"
              fill="none"
              stroke={colors.amber}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.85"
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset={1 - connections}
            />
          </svg>
        </div>

        <div
          className="atlas-network-platform"
          style={{
            opacity: platform,
            transform: `translateY(${(1 - platform) * 18}px) scale(${0.97 + platform * 0.03})`,
          }}
        >
          <div
            style={{
              fontSize: "clamp(27px, 3.3vw, 45px)",
              fontWeight: 700,
              letterSpacing: "-0.075em",
              lineHeight: 1,
            }}
          >
            myd<span style={{ color: colors.amber }}>ii</span>o
          </div>

          <p
            style={{
              margin: "9px 0 5px",
              color: colors.amber,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.18em",
            }}
          >
            ONE CONNECTED PLATFORM
          </p>

          <p
            style={{
              margin: 0,
              fontSize: "clamp(11px, 1vw, 14px)",
              color: "rgba(253,250,243,0.58)",
            }}
          >
            Content · Campaigns · Verification · Reporting
          </p>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 5,
          display: "grid",
          placeItems: "center",
          padding: 30,
          textAlign: "center",
          pointerEvents: "none",
          opacity: 1,
          transform: `translateY(${(1 - conclusion) * 110}svh)`,
        }}
      >
        <div>
          <p
            style={{
              color: colors.amber,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.2em",
            }}
          >
            BUILT TO GROW
          </p>
          <h2
            style={{
              margin: "18px auto 0",
              maxWidth: "14ch",
              fontSize: "clamp(42px, min(6vw, 10svh), 94px)",
              lineHeight: 0.95,
              letterSpacing: "-0.065em",
              fontWeight: 600,
            }}
          >
            Every Journey, Connected.
          </h2>
        </div>
      </div>
    </div>
  );
}
