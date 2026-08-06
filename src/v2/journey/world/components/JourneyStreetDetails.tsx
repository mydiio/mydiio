function Lamp({
  x,
  y,
  scale = 1,
  opacity = 0.28,
  flip = false,
}: {
  x: number;
  y: number;
  scale?: number;
  opacity?: number;
  flip?: boolean;
}) {
  const d = flip ? -1 : 1;

  return (
    <g
      transform={`translate(${x} ${y}) scale(${scale})`}
      opacity={opacity}
      fill="none"
      strokeLinecap="round"
    >
      <path d="M0 132 L0 8" stroke="rgba(253,250,243,0.29)" strokeWidth="3" />

      <path
        d={`M0 10 C0 -5 ${26 * d} -10 ${41 * d} -10`}
        stroke="rgba(253,250,243,0.29)"
        strokeWidth="3"
      />

      <path d={`M${31 * d} -10 H${50 * d}`} stroke="rgba(253,250,243,0.29)" strokeWidth="3" />

      <circle
        cx={52 * d}
        cy="-10"
        r="6"
        fill="rgba(245,166,35,0.14)"
        stroke="rgba(245,166,35,0.34)"
        strokeWidth="2"
      />

      <ellipse cx={52 * d} cy="2" rx="26" ry="18" fill="url(#journey-lamp-light)" opacity="0.46" />
    </g>
  );
}

function UtilityPole({
  x,
  y,
  scale = 1,
  opacity = 0.17,
}: {
  x: number;
  y: number;
  scale?: number;
  opacity?: number;
}) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${scale})`}
      opacity={opacity}
      stroke="rgba(253,250,243,0.24)"
      fill="none"
    >
      <path d="M0 136 V0" strokeWidth="2.8" />
      <path d="M-22 18 H22" strokeWidth="2.3" />
      <path d="M-15 37 H15" strokeWidth="1.8" />

      <circle cx="-18" cy="18" r="3" />
      <circle cx="18" cy="18" r="3" />
      <circle cx="-12" cy="37" r="2.5" />
      <circle cx="12" cy="37" r="2.5" />
    </g>
  );
}

function Bench({
  x,
  y,
  scale = 1,
  flip = false,
}: {
  x: number;
  y: number;
  scale?: number;
  flip?: boolean;
}) {
  const d = flip ? -1 : 1;

  return (
    <g
      transform={`translate(${x} ${y}) scale(${d * scale} ${scale})`}
      opacity="0.2"
      fill="none"
      stroke="rgba(253,250,243,0.23)"
      strokeWidth="2"
    >
      <path d="M0 0 H68" />
      <path d="M5 9 H63" />
      <path d="M8 9 V29 M60 9 V29" />
      <path d="M2 -22 H66 V0" />
      <path d="M12 -22 V0 M24 -22 V0 M36 -22 V0 M48 -22 V0" />
    </g>
  );
}

export function JourneyStreetDetails() {
  return (
    <g aria-hidden="true">
      <Lamp x={338} y={483} scale={0.88} />
      <Lamp x={1262} y={483} scale={0.88} flip />

      <Lamp x={570} y={421} scale={0.44} opacity={0.18} />
      <Lamp x={1030} y={421} scale={0.44} opacity={0.18} flip />

      <UtilityPole x={108} y={471} scale={0.88} />
      <UtilityPole x={1492} y={471} scale={0.88} />

      {/* Catenary and utility lines */}
      <g fill="none" stroke="rgba(253,250,243,0.075)" strokeWidth="1.2">
        <path d="M108 488 C302 438 478 404 650 340" />
        <path d="M108 504 C302 458 478 422 650 354" />
        <path d="M1492 488 C1298 438 1122 404 950 340" />
        <path d="M1492 504 C1298 458 1122 422 950 354" />
      </g>

      {/* Bus shelter */}
      <g transform="translate(1217 573)" opacity="0.26" fill="none" stroke="rgba(253,250,243,0.24)">
        <path d="M0 83 V5 H80 V83" strokeWidth="2.3" />
        <path d="M-9 5 H89" strokeWidth="2.7" />
        <path d="M14 59 H66" strokeWidth="2" />
        <path d="M18 59 V79 M62 59 V79" strokeWidth="2" />
        <rect
          x="22"
          y="17"
          width="36"
          height="26"
          rx="2"
          fill="rgba(245,166,35,0.025)"
          strokeWidth="1.5"
        />
        <path d="M27 23 H53 M27 29 H48 M27 35 H51" strokeWidth="1" />
      </g>

      <Bench x={222} y={661} scale={0.9} />
      <Bench x={1378} y={661} scale={0.9} flip />

      {/* Bollards */}
      {[
        [286, 669, 1],
        [340, 629, 0.8],
        [1260, 629, 0.8],
        [1314, 669, 1],
      ].map(([x, y, scale]) => (
        <g key={`${x}-${y}`} transform={`translate(${x} ${y}) scale(${scale})`} opacity="0.21">
          <path
            d="M0 28 V0"
            stroke="rgba(253,250,243,0.28)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="0" cy="0" r="4" fill="rgba(245,166,35,0.13)" />
        </g>
      ))}

      {/* Coastal contour suggestion */}
      <g opacity="0.12" fill="none" stroke="rgba(253,250,243,0.18)" strokeWidth="1.3">
        {Array.from({ length: 5 }).map((_, index) => (
          <path
            key={index}
            d={`M940 ${341 + index * 10} C1040 ${324 + index * 11} 1127 ${329 + index * 11} 1222 ${
              350 + index * 10
            }`}
          />
        ))}
      </g>
    </g>
  );
}
