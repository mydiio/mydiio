import { JourneyBuildings } from "./components/JourneyBuildings";
import { JourneyRoad } from "./components/JourneyRoad";
import { JourneyStreetDetails } from "./components/JourneyStreetDetails";
import { JourneyTrees } from "./components/JourneyTrees";

type JourneyWorldProps = {
  opacity?: number;
};

export function JourneyWorld({ opacity = 1 }: JourneyWorldProps) {
  return (
    <div
      aria-hidden="true"
      className="journey-world"
      style={{
        position: "absolute",
        zIndex: 0,
        inset: 0,
        overflow: "hidden",
        opacity,
        pointerEvents: "none",
      }}
    >
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        role="presentation"
        style={{
          display: "block",
          width: "100%",
          height: "100%",
        }}
      >
        <defs>
          <linearGradient id="journey-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f0e0d" />
            <stop offset="48%" stopColor="#171512" />
            <stop offset="100%" stopColor="#211e1b" />
          </linearGradient>

          <radialGradient id="journey-horizon-glow" cx="50%" cy="39%" r="48%">
            <stop offset="0%" stopColor="rgba(245,166,35,0.105)" />
            <stop offset="38%" stopColor="rgba(245,166,35,0.025)" />
            <stop offset="100%" stopColor="rgba(245,166,35,0)" />
          </radialGradient>

          <radialGradient id="journey-tablet-light" cx="50%" cy="50%" r="52%">
            <stop offset="0%" stopColor="rgba(253,250,243,0.13)" />
            <stop offset="24%" stopColor="rgba(245,166,35,0.052)" />
            <stop offset="70%" stopColor="rgba(245,166,35,0.008)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>

          <linearGradient id="journey-road-light" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(253,250,243,0.065)" />
            <stop offset="40%" stopColor="rgba(245,166,35,0.035)" />
            <stop offset="100%" stopColor="rgba(245,166,35,0)" />
          </linearGradient>

          <radialGradient id="journey-lamp-light" cx="50%" cy="0%" r="100%">
            <stop offset="0%" stopColor="rgba(245,166,35,0.15)" />
            <stop offset="100%" stopColor="rgba(245,166,35,0)" />
          </radialGradient>

          <pattern
            id="journey-road-hatch"
            width="16"
            height="16"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(15)"
          >
            <path d="M0 0 V16" stroke="rgba(253,250,243,0.04)" strokeWidth="1" />
          </pattern>

          <pattern id="journey-facade-hatch" width="11" height="11" patternUnits="userSpaceOnUse">
            <path d="M0 11 L11 0" stroke="rgba(253,250,243,0.028)" strokeWidth="0.8" />
          </pattern>

          <linearGradient id="journey-vignette" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(0,0,0,0.65)" />
            <stop offset="28%" stopColor="rgba(0,0,0,0.05)" />
            <stop offset="68%" stopColor="rgba(0,0,0,0.05)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.7)" />
          </linearGradient>
        </defs>

        <rect width="1600" height="900" fill="url(#journey-sky)" />

        <rect width="1600" height="900" fill="url(#journey-horizon-glow)" />

        {/* The road establishes the scene's perspective. */}
        <JourneyRoad />

        {/* Architectural and environmental layers sit above it. */}
        <JourneyBuildings />
        <JourneyTrees />
        <JourneyStreetDetails />

        {/* Local illumination centred on the product. */}
        <ellipse
          cx="800"
          cy="515"
          rx="465"
          ry="286"
          fill="url(#journey-tablet-light)"
          opacity="0.82"
        />

        <rect width="1600" height="900" fill="url(#journey-vignette)" />
      </svg>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            linear-gradient(
              to bottom,
              rgba(10,9,8,0.23),
              transparent 31%,
              transparent 70%,
              rgba(10,9,8,0.4)
            )
          `,
        }}
      />
    </div>
  );
}
