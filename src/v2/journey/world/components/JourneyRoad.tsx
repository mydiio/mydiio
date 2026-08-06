function PerspectiveStroke({
  d,
  opacity,
  width = 1,
}: {
  d: string;
  opacity: number;
  width?: number;
}) {
  return (
    <path
      d={d}
      fill="none"
      stroke={`rgba(253,250,243,${opacity})`}
      strokeWidth={width}
      strokeLinecap="round"
    />
  );
}

export function JourneyRoad() {
  return (
    <g aria-hidden="true">
      {/* Pavement planes */}
      <path
        d="M800 286 L72 900 L0 900 L0 566 L626 330 Z"
        fill="#292623"
        stroke="rgba(253,250,243,0.055)"
        strokeWidth="2"
      />

      <path
        d="M800 286 L1528 900 L1600 900 L1600 566 L974 330 Z"
        fill="#292623"
        stroke="rgba(253,250,243,0.055)"
        strokeWidth="2"
      />

      {/* Main road plane */}
      <path d="M800 286 L1528 900 L72 900 Z" fill="#211f1d" />

      {/* Subtle drafted road hatch */}
      <path d="M800 286 L1528 900 L72 900 Z" fill="url(#journey-road-hatch)" opacity="0.42" />

      {/* Outer curbs */}
      <path d="M800 286 L72 900" fill="none" stroke="rgba(253,250,243,0.2)" strokeWidth="6" />

      <path d="M800 286 L1528 900" fill="none" stroke="rgba(253,250,243,0.2)" strokeWidth="6" />

      <path d="M800 286 L94 900" fill="none" stroke="rgba(253,250,243,0.065)" strokeWidth="2" />

      <path d="M800 286 L1506 900" fill="none" stroke="rgba(253,250,243,0.065)" strokeWidth="2" />

      {/* Lane guides */}
      <PerspectiveStroke d="M800 286 L498 900" opacity={0.07} width={3} />

      <PerspectiveStroke d="M800 286 L1102 900" opacity={0.07} width={3} />

      {/* Centre-line perspective segments */}
      {[
        { y1: 328, y2: 356, width: 2 },
        { y1: 378, y2: 420, width: 3 },
        { y1: 454, y2: 516, width: 5 },
        { y1: 566, y2: 656, width: 8 },
        { y1: 720, y2: 850, width: 13 },
      ].map((segment) => (
        <path
          key={segment.y1}
          d={`M800 ${segment.y1} L800 ${segment.y2}`}
          fill="none"
          stroke="rgba(253,250,243,0.2)"
          strokeWidth={segment.width}
          strokeLinecap="round"
        />
      ))}

      {/* Road construction lines */}
      <g opacity="0.34">
        {[
          ["M120 878 C330 734 555 520 800 286", 0.055],
          ["M210 900 C390 746 590 528 800 286", 0.035],
          ["M342 900 C476 730 624 510 800 286", 0.045],
          ["M1480 878 C1270 734 1045 520 800 286", 0.055],
          ["M1390 900 C1210 746 1010 528 800 286", 0.035],
          ["M1258 900 C1124 730 976 510 800 286", 0.045],
        ].map(([d, opacity]) => (
          <PerspectiveStroke key={String(d)} d={String(d)} opacity={Number(opacity)} width={1.5} />
        ))}
      </g>

      {/* Road surface drafting */}
      <g opacity="0.5">
        {[
          "M222 812 C482 694 633 501 800 286",
          "M314 842 C525 702 652 504 800 286",
          "M414 870 C575 718 681 516 800 286",
          "M1378 812 C1118 694 967 501 800 286",
          "M1286 842 C1075 702 948 504 800 286",
          "M1186 870 C1025 718 919 516 800 286",
        ].map((d, index) => (
          <PerspectiveStroke key={d} d={d} opacity={index % 2 === 0 ? 0.034 : 0.022} width={1} />
        ))}
      </g>

      {/* Crosswalk */}
      <g opacity="0.28">
        {Array.from({ length: 9 }).map((_, index) => {
          const y = 747 + index * 17;
          const inset = index * 11;

          return (
            <path
              key={y}
              d={`M${300 + inset} ${y} L${1300 - inset} ${y}`}
              stroke="rgba(253,250,243,0.66)"
              strokeWidth="7"
              strokeLinecap="round"
            />
          );
        })}
      </g>

      {/* Pavement joint lines */}
      <g fill="none" stroke="rgba(253,250,243,0.045)" strokeWidth="1.5">
        <path d="M0 704 L439 546" />
        <path d="M0 770 L337 652" />
        <path d="M0 842 L225 784" />

        <path d="M1600 704 L1161 546" />
        <path d="M1600 770 L1263 652" />
        <path d="M1600 842 L1375 784" />
      </g>

      {/* Tablet light reflected across the road */}
      <path
        d="M800 385 C1010 478 1055 665 1105 900 L495 900 C545 665 590 478 800 385 Z"
        fill="url(#journey-road-light)"
        opacity="0.78"
      />
    </g>
  );
}
