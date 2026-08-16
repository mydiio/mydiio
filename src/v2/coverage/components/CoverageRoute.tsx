import { colors } from "@/design";
import { colomboJourney } from "../coverageData";
import { CoverageStop } from "./CoverageStop";

type CoverageRouteProps = {
  progress: number;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

const journeyNodes = [
  { x: 110, y: 258 },
  { x: 500, y: 154 },
  { x: 890, y: 252 },
] as const;

const routePath =
  "M110 258 C205 258 250 230 320 192 C385 156 444 154 500 154 C578 154 620 192 688 228 C752 260 818 266 890 252";

export function CoverageRoute({ progress }: CoverageRouteProps) {
  const routeProgress = clamp((progress - 0.1) / 0.7);

  const activeIndex =
    progress >= colomboJourney[2].reveal ? 2 : progress >= colomboJourney[1].reveal ? 1 : 0;

  const activeStop = colomboJourney[activeIndex];
  const activeNode = journeyNodes[activeIndex];

  const cardProgress = clamp((progress - activeStop.reveal) / 0.1);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "340px",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: `${activeNode.x / 10}%`,
          top: "12px",
          zIndex: 6,
          opacity: cardProgress,
          transform: `translate(-50%, ${(1 - cardProgress) * 16}px)`,
          transition: "opacity 0.35s ease, transform 0.55s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <CoverageStop
          key={activeStop.id}
          number={activeStop.number}
          title={activeStop.title}
          detail={activeStop.detail}
          time={activeStop.time}
          active
          complete={false}
        />
      </div>

      <svg
        role="img"
        aria-label="A verified journey moving through Colombo"
        viewBox="0 0 1000 340"
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
          <filter id="coverage-node-glow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="13" result="blur" />

            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="coverage-route-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={colors.amber} stopOpacity="0.72" />
            <stop offset="50%" stopColor={colors.amber} stopOpacity="1" />
            <stop offset="100%" stopColor={colors.amber} stopOpacity="0.78" />
          </linearGradient>
        </defs>

        <path
          d={routePath}
          fill="none"
          stroke="rgba(26,26,24,0.075)"
          strokeWidth="5"
          strokeLinecap="round"
          pathLength={1}
        />

        <path
          d={routePath}
          fill="none"
          stroke="url(#coverage-route-gradient)"
          strokeWidth="4"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - routeProgress}
        />

        <line
          x1={activeNode.x}
          y1="112"
          x2={activeNode.x}
          y2={activeNode.y - 24}
          stroke="rgba(232,146,10,0.46)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="4 7"
          opacity={cardProgress}
        />

        {journeyNodes.map((node, index) => {
          const stop = colomboJourney[index];

          const nodeProgress = clamp((progress - stop.reveal) / 0.1);

          const active = index === activeIndex;
          const complete = index < activeIndex;

          return (
            <g key={stop.id} opacity={0.14 + nodeProgress * 0.86}>
              <circle
                cx={node.x}
                cy={node.y}
                r={active ? 34 : 20}
                fill="rgba(245,166,35,0.09)"
                opacity={active ? 1 : 0.26}
                filter={active ? "url(#coverage-node-glow)" : undefined}
              />

              <circle
                cx={node.x}
                cy={node.y}
                r={active ? 13 : complete ? 9 : 8}
                fill={nodeProgress > 0 ? colors.amber : colors.cream}
                stroke={colors.amber}
                strokeWidth="3"
              />

              <circle cx={node.x} cy={node.y} r="3.5" fill={colors.cream} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
