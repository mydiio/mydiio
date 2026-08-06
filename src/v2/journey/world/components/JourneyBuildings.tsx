type BuildingProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  floors: number;
  opacity: number;
  side: "left" | "right";
  roof?: "flat" | "cornice" | "stepped";
  balconies?: boolean;
};

function WindowRow({
  x,
  y,
  width,
  columns,
  depth,
}: {
  x: number;
  y: number;
  width: number;
  columns: number;
  depth: number;
}) {
  const available = width - 34;
  const cell = available / columns;

  return (
    <g>
      {Array.from({ length: columns }).map((_, index) => {
        const windowX = x + 17 + index * cell;

        return (
          <g key={windowX}>
            <rect
              x={windowX}
              y={y}
              width={Math.max(9, cell - 11)}
              height={Math.max(10, 17 - depth)}
              rx="1.5"
              fill="rgba(253,250,243,0.018)"
              stroke="rgba(253,250,243,0.085)"
              strokeWidth="1"
            />

            <path
              d={`M${windowX + (cell - 11) / 2} ${y} V${y + Math.max(10, 17 - depth)}`}
              stroke="rgba(253,250,243,0.035)"
              strokeWidth="0.8"
            />
          </g>
        );
      })}
    </g>
  );
}

function ArchitecturalBuilding({
  x,
  y,
  width,
  height,
  floors,
  opacity,
  side,
  roof = "cornice",
  balconies = false,
}: BuildingProps) {
  const direction = side === "left" ? 1 : -1;
  const skew = direction * width * 0.07;
  const floorHeight = (height - 60) / floors;
  const columns = Math.max(2, Math.floor(width / 42));

  return (
    <g opacity={opacity}>
      {/* Main façade */}
      <path
        d={`
          M${x} ${y + 10}
          L${x + width} ${y + 10 + skew * 0.08}
          L${x + width} ${y + height}
          L${x} ${y + height}
          Z
        `}
        fill="rgba(253,250,243,0.012)"
        stroke="rgba(253,250,243,0.19)"
        strokeWidth="1.8"
      />

      <path
        d={`
          M${x} ${y + 10}
          L${x + width} ${y + 10 + skew * 0.08}
          L${x + width} ${y + height}
          L${x} ${y + height}
          Z
        `}
        fill="url(#journey-facade-hatch)"
        opacity="0.38"
      />

      {/* Roofline */}
      {roof === "cornice" ? (
        <>
          <path
            d={`M${x - 8} ${y + 10} L${x + width + 8} ${y + 10 + skew * 0.08}`}
            stroke="rgba(253,250,243,0.25)"
            strokeWidth="3"
          />
          <path
            d={`M${x - 4} ${y + 17} L${x + width + 4} ${y + 17 + skew * 0.08}`}
            stroke="rgba(253,250,243,0.09)"
            strokeWidth="1.2"
          />
        </>
      ) : null}

      {roof === "stepped" ? (
        <path
          d={`
            M${x} ${y + 10}
            L${x + width * 0.2} ${y + 10}
            L${x + width * 0.2} ${y - 5}
            L${x + width * 0.64} ${y - 5}
            L${x + width * 0.64} ${y + 5}
            L${x + width} ${y + 5 + skew * 0.08}
          `}
          fill="none"
          stroke="rgba(253,250,243,0.22)"
          strokeWidth="2.2"
        />
      ) : null}

      {/* Floor slabs */}
      {Array.from({ length: floors }).map((_, floor) => {
        const floorY = y + 37 + floor * floorHeight;

        return (
          <g key={floorY}>
            <path
              d={`M${x + 8} ${floorY} L${x + width - 8} ${floorY + skew * 0.035}`}
              stroke="rgba(253,250,243,0.075)"
              strokeWidth="1.2"
            />

            <WindowRow
              x={x}
              y={floorY + 8}
              width={width}
              columns={columns}
              depth={Math.min(5, floor)}
            />

            {balconies && floor % 2 === 0 ? (
              <g>
                <path
                  d={`M${x + 12} ${floorY + 29} L${x + width - 12} ${floorY + 29 + skew * 0.025}`}
                  stroke="rgba(253,250,243,0.12)"
                  strokeWidth="2"
                />
                {Array.from({ length: columns + 1 }).map((_, index) => {
                  const px = x + 12 + index * ((width - 24) / columns);

                  return (
                    <path
                      key={px}
                      d={`M${px} ${floorY + 23} V${floorY + 31}`}
                      stroke="rgba(253,250,243,0.07)"
                      strokeWidth="1"
                    />
                  );
                })}
              </g>
            ) : null}
          </g>
        );
      })}

      {/* Ground-floor shop rhythm */}
      <path
        d={`M${x + 7} ${y + height - 66} L${x + width - 7} ${y + height - 66}`}
        stroke="rgba(253,250,243,0.16)"
        strokeWidth="2"
      />

      {Array.from({ length: Math.max(2, Math.floor(width / 58)) }).map((_, index, array) => {
        const bayWidth = (width - 18) / array.length;
        const bayX = x + 9 + index * bayWidth;

        return (
          <g key={bayX}>
            <rect
              x={bayX}
              y={y + height - 57}
              width={bayWidth - 7}
              height="48"
              fill="rgba(253,250,243,0.012)"
              stroke="rgba(253,250,243,0.095)"
              strokeWidth="1"
            />
            <path
              d={`M${bayX + 4} ${y + height - 46} H${bayX + bayWidth - 11}`}
              stroke="rgba(245,166,35,0.12)"
              strokeWidth="1.2"
            />
          </g>
        );
      })}

      {/* Vertical structural lines */}
      {Array.from({ length: Math.max(2, Math.floor(width / 64)) }).map((_, index, array) => {
        const px = x + ((index + 1) * width) / (array.length + 1);

        return (
          <path
            key={px}
            d={`M${px} ${y + 16} V${y + height}`}
            stroke="rgba(253,250,243,0.035)"
            strokeWidth="1"
          />
        );
      })}
    </g>
  );
}

export function JourneyBuildings() {
  return (
    <g aria-hidden="true">
      {/* Very distant skyline */}
      <g opacity="0.13">
        {[
          [660, 198, 34, 124],
          [700, 228, 28, 94],
          [735, 178, 42, 144],
          [825, 214, 28, 108],
          [858, 166, 44, 156],
          [908, 226, 30, 96],
        ].map(([x, y, width, height]) => (
          <g key={`${x}-${y}`}>
            <rect
              x={x}
              y={y}
              width={width}
              height={height}
              fill="rgba(253,250,243,0.008)"
              stroke="rgba(253,250,243,0.13)"
              strokeWidth="1"
            />
            {Array.from({ length: 5 }).map((_, index) => (
              <path
                key={index}
                d={`M${x + 7} ${y + 18 + index * 19} H${x + width - 7}`}
                stroke="rgba(253,250,243,0.04)"
              />
            ))}
          </g>
        ))}
      </g>

      {/* Left foreground and midground */}
      <ArchitecturalBuilding
        x={28}
        y={294}
        width={232}
        height={385}
        floors={5}
        opacity={0.48}
        side="left"
        roof="cornice"
        balconies
      />

      <ArchitecturalBuilding
        x={238}
        y={345}
        width={188}
        height={292}
        floors={4}
        opacity={0.38}
        side="left"
        roof="stepped"
      />

      <ArchitecturalBuilding
        x={405}
        y={382}
        width={147}
        height={218}
        floors={3}
        opacity={0.29}
        side="left"
        roof="cornice"
      />

      <ArchitecturalBuilding
        x={535}
        y={409}
        width={106}
        height={157}
        floors={2}
        opacity={0.2}
        side="left"
        roof="flat"
      />

      {/* Right foreground and midground */}
      <ArchitecturalBuilding
        x={1340}
        y={294}
        width={232}
        height={385}
        floors={5}
        opacity={0.48}
        side="right"
        roof="cornice"
        balconies
      />

      <ArchitecturalBuilding
        x={1174}
        y={345}
        width={188}
        height={292}
        floors={4}
        opacity={0.38}
        side="right"
        roof="stepped"
      />

      <ArchitecturalBuilding
        x={1048}
        y={382}
        width={147}
        height={218}
        floors={3}
        opacity={0.29}
        side="right"
        roof="cornice"
      />

      <ArchitecturalBuilding
        x={959}
        y={409}
        width={106}
        height={157}
        floors={2}
        opacity={0.2}
        side="right"
        roof="flat"
      />

      {/* Ground awnings */}
      <path
        d="M42 561 L241 561 L224 584 L62 584 Z"
        fill="rgba(245,166,35,0.028)"
        stroke="rgba(245,166,35,0.14)"
        strokeWidth="1.5"
      />

      <path
        d="M1359 561 L1558 561 L1538 584 L1376 584 Z"
        fill="rgba(245,166,35,0.028)"
        stroke="rgba(245,166,35,0.14)"
        strokeWidth="1.5"
      />
    </g>
  );
}
