import { colors } from "@/design";
import { mapCities } from "../generatedMapData";

type NetworkCanvasProps = {
  progress: number;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

const routeOrder = [
  {
    city: "Negombo",
    threshold: 0.2,
    duration: 0.11,
  },
  {
    city: "Galle",
    threshold: 0.32,
    duration: 0.13,
  },
  {
    city: "Hambantota",
    threshold: 0.44,
    duration: 0.1,
  },
  {
    city: "Batticaloa",
    threshold: 0.56,
    duration: 0.14,
  },
  {
    city: "Trincomalee",
    threshold: 0.68,
    duration: 0.15,
  },
  {
    city: "Jaffna",
    threshold: 0.8,
    duration: 0.17,
  },
] as const;

const visibleLabels = new Set(["Colombo", "Galle", "Trincomalee", "Jaffna"]);

const labelSettings: Record<
  string,
  {
    dx: number;
    dy: number;
    anchor: "start" | "end";
  }
> = {
  Colombo: {
    dx: -72,
    dy: 8,
    anchor: "end",
  },
  Galle: {
    dx: -24,
    dy: 44,
    anchor: "end",
  },
  Trincomalee: {
    dx: 58,
    dy: -8,
    anchor: "start",
  },
  Jaffna: {
    dx: 48,
    dy: -8,
    anchor: "start",
  },
};

export function NetworkCanvas({ progress }: NetworkCanvasProps) {
  const outlineReveal = clamp(progress / 0.16);
  const roadsReveal = clamp((progress - 0.1) / 0.24);
  const colomboReveal = clamp((progress - 0.16) / 0.1);

  const cityByName = Object.fromEntries(mapCities.map((city) => [city.name, city]));

  const colombo = cityByName.Colombo;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        opacity: outlineReveal,
        transform: `scale(${0.965 + outlineReveal * 0.035})`,
        transformOrigin: "center center",
        willChange: "opacity, transform",
      }}
    >
      <style>{`
        @keyframes atlas-colombo-breathe {
          0%, 100% {
            transform: scale(1);
            opacity: 0.18;
          }

          50% {
            transform: scale(1.35);
            opacity: 0.04;
          }
        }

        .atlas-colombo-pulse {
          transform-origin: ${colombo.x}px ${colombo.y}px;
          animation: atlas-colombo-breathe 2.6s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .atlas-colombo-pulse {
            animation: none;
          }
        }
      `}</style>

      <img
        src="/assets/maps/sri-lanka-network-base.svg"
        alt="Geographic outline of Sri Lanka"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />

      <img
        src="/assets/maps/sri-lanka-road-network.svg"
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          opacity: roadsReveal * 0.18,
        }}
      />

      <svg
        role="img"
        aria-label="mydiio network expanding from Colombo across Sri Lanka"
        viewBox="0 0 800 1200"
        preserveAspectRatio="xMidYMid meet"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          overflow: "visible",
        }}
      >
        <defs>
          <filter id="atlas-network-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="blur" />

            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle
          className="atlas-colombo-pulse"
          cx={colombo.x}
          cy={colombo.y}
          r="34"
          fill={colors.amber}
          opacity={colomboReveal * 0.16}
        />

        <circle
          cx={colombo.x}
          cy={colombo.y}
          r="18"
          fill="rgba(245,166,35,0.14)"
          opacity={colomboReveal}
          filter="url(#atlas-network-glow)"
        />

        <circle
          cx={colombo.x}
          cy={colombo.y}
          r="11"
          fill={colors.amber}
          stroke={colors.cream}
          strokeWidth="4"
          opacity={colomboReveal}
        />

        {routeOrder.map(({ city: cityName, threshold, duration }) => {
          const city = cityByName[cityName];

          const localProgress = clamp((progress - threshold) / duration);

          const length = Math.hypot(city.x - colombo.x, city.y - colombo.y);

          return (
            <g key={cityName}>
              <line
                x1={colombo.x}
                y1={colombo.y}
                x2={city.x}
                y2={city.y}
                stroke={colors.amber}
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeDasharray={length}
                strokeDashoffset={length * (1 - localProgress)}
                opacity={localProgress}
              />

              <circle
                cx={city.x}
                cy={city.y}
                r="7"
                fill={colors.amber}
                stroke={colors.cream}
                strokeWidth="3"
                opacity={localProgress}
              />
            </g>
          );
        })}

        {mapCities.map((city) => {
          if (!visibleLabels.has(city.name)) {
            return null;
          }

          const settings = labelSettings[city.name];

          const threshold =
            city.name === "Colombo"
              ? 0.16
              : (routeOrder.find((route) => route.city === city.name)?.threshold ?? 1);

          const labelProgress = clamp((progress - threshold - 0.06) / 0.1);

          return (
            <g key={`label-${city.id}`} opacity={labelProgress}>
              <line
                x1={city.x}
                y1={city.y}
                x2={city.x + settings.dx * 0.7}
                y2={city.y + settings.dy}
                stroke="rgba(26,26,24,0.18)"
                strokeWidth="1"
                strokeDasharray="4 5"
              />

              <text
                x={city.x + settings.dx}
                y={city.y + settings.dy + 5}
                textAnchor={settings.anchor}
                fill="rgba(26,26,24,0.52)"
                fontFamily="Space Grotesk, system-ui, -apple-system, sans-serif"
                fontSize="21"
                fontWeight="500"
              >
                {city.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
