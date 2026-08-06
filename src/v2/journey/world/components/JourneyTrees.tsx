function Palm({
  x,
  y,
  scale = 1,
  opacity = 0.3,
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
      stroke="rgba(253,250,243,0.25)"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={`M0 126 C${8 * d} 92 ${-3 * d} 48 1 0`} strokeWidth="3" />

      {[
        `M1 2 C${23 * d} -26 ${58 * d} -24 ${82 * d} -4`,
        `M1 2 C${34 * d} -7 ${61 * d} 9 ${78 * d} 31`,
        `M1 2 C${18 * d} 13 ${30 * d} 32 ${35 * d} 58`,
        `M1 2 C${-20 * d} -29 ${-56 * d} -27 ${-81 * d} -5`,
        `M1 2 C${-35 * d} -8 ${-61 * d} 10 ${-79 * d} 34`,
        `M1 2 C${-16 * d} 15 ${-27 * d} 35 ${-33 * d} 61`,
      ].map((path) => (
        <path key={path} d={path} strokeWidth="2.5" />
      ))}

      <g strokeWidth="0.9" opacity="0.6">
        {Array.from({ length: 7 }).map((_, index) => (
          <path key={index} d={`M${-4 * d} ${17 + index * 13} L${5 * d} ${10 + index * 13}`} />
        ))}
      </g>
    </g>
  );
}

function CanopyTree({
  x,
  y,
  scale = 1,
  opacity = 0.24,
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
      fill="none"
      stroke="rgba(253,250,243,0.2)"
      strokeLinecap="round"
    >
      <path d="M0 94 C2 60 0 27 5 0" strokeWidth="3" />
      <path d="M4 42 C-19 28 -33 14 -45 -5" strokeWidth="2" />
      <path d="M4 34 C25 25 40 10 54 -10" strokeWidth="2" />

      {[
        [-43, -8, 28],
        [-11, -27, 34],
        [29, -18, 31],
        [13, 10, 30],
      ].map(([cx, cy, r]) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r={r} strokeWidth="1.7" />
          <circle cx={cx - 4} cy={cy + 2} r={r - 8} strokeWidth="0.8" opacity="0.45" />
        </g>
      ))}
    </g>
  );
}

export function JourneyTrees() {
  return (
    <g aria-hidden="true">
      <Palm x={273} y={434} scale={0.8} opacity={0.31} />
      <Palm x={1280} y={434} scale={0.8} opacity={0.31} flip />

      <Palm x={486} y={425} scale={0.44} opacity={0.19} />
      <Palm x={1075} y={425} scale={0.44} opacity={0.19} flip />

      <CanopyTree x={169} y={512} scale={0.74} opacity={0.22} />
      <CanopyTree x={1415} y={512} scale={0.74} opacity={0.22} />

      <CanopyTree x={585} y={450} scale={0.34} opacity={0.14} />
      <CanopyTree x={1002} y={450} scale={0.34} opacity={0.14} />
    </g>
  );
}
