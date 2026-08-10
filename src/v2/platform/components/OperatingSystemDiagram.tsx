import { colors } from "@/design";

type Props = {
  progress: number;
  compact?: boolean;
};

type RelationshipId = "passengers" | "drivers" | "businesses" | "operations";

type Relationship = {
  id: RelationshipId;
  label: string;
  value: string;
  detail: string;
  position: {
    desktop: {
      x: number;
      y: number;
    };
    mobile: {
      x: number;
      y: number;
    };
  };
};

const relationships: Relationship[] = [
  {
    id: "passengers",
    label: "Passengers",
    value: "Useful journeys",
    detail: "Information, discovery and community communication",
    position: {
      desktop: { x: 50, y: 11 },
      mobile: { x: 50, y: 10 },
    },
  },
  {
    id: "drivers",
    label: "Drivers",
    value: "Connected participation",
    detail: "Availability, schedules, earnings and payments",
    position: {
      desktop: { x: 88, y: 50 },
      mobile: { x: 81, y: 43 },
    },
  },
  {
    id: "businesses",
    label: "Businesses",
    value: "Measurable reach",
    detail: "Campaign creation, delivery, verification and reporting",
    position: {
      desktop: { x: 12, y: 50 },
      mobile: { x: 19, y: 43 },
    },
  },
  {
    id: "operations",
    label: "Operations",
    value: "Network coordination",
    detail: "Fleet visibility, content delivery and device health",
    position: {
      desktop: { x: 50, y: 89 },
      mobile: { x: 50, y: 84 },
    },
  },
];

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

function RelationshipLabel({
  relationship,
  progress,
  compact,
  quiet,
}: {
  relationship: Relationship;
  progress: number;
  compact: boolean;
  quiet: number;
}) {
  const position = compact ? relationship.position.mobile : relationship.position.desktop;

  const entrance = easeOutCubic(progress);

  const horizontalAlignment =
    relationship.id === "businesses" ? "right" : relationship.id === "drivers" ? "left" : "center";

  return (
    <div
      className="atlas-os-relationship atlas-os-motion"
      data-relationship={relationship.id}
      style={{
        position: "absolute",
        zIndex: 8,
        left: `${position.x}%`,
        top: `${position.y}%`,
        width: compact ? "min(138px, 35vw)" : "clamp(174px, 15vw, 228px)",
        textAlign: horizontalAlignment,
        opacity: entrance * (1 - quiet * 0.62),
        transform: `
          translate(-50%, -50%)
          translateY(${(1 - entrance) * 16 - quiet * 5}px)
          scale(${0.94 + entrance * 0.06 - quiet * 0.035})
        `,
        transformOrigin: "center",
        willChange: "opacity, transform",
      }}
    >
      <div
        style={{
          color: colors.amber,
          fontSize: compact ? "9px" : "11px",
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        {relationship.label}
      </div>

      <div
        style={{
          marginTop: compact ? "5px" : "7px",
          color: colors.cream,
          fontSize: compact ? "clamp(14px, 4vw, 17px)" : "clamp(17px, 1.35vw, 21px)",
          fontWeight: 600,
          lineHeight: 1.05,
          letterSpacing: "-0.035em",
        }}
      >
        {relationship.value}
      </div>

      <div
        className="atlas-os-detail"
        style={{
          marginTop: compact ? "5px" : "7px",
          color: "rgba(253,250,243,0.44)",
          fontSize: compact ? "9px" : "11px",
          fontWeight: 500,
          lineHeight: 1.35,
        }}
      >
        {relationship.detail}
      </div>
    </div>
  );
}

function FlowPulse({
  path,
  progress,
  delay,
  quiet,
}: {
  path: string;
  progress: number;
  delay: number;
  quiet: number;
}) {
  const localProgress = clamp((progress - delay) / 0.3);

  const arrival = easeOutCubic(range(localProgress, 0, 0.16));

  const departure = easeInOutCubic(range(localProgress, 0.72, 1));

  const visibility = arrival * (1 - departure) * (1 - quiet * 0.8);

  return (
    <>
      <path
        d={path}
        fill="none"
        stroke="rgba(245,166,35,0.11)"
        strokeWidth="1.1"
        strokeDasharray="5 9"
        pathLength="1"
        opacity={visibility * 0.72}
      />

      <path
        d={path}
        fill="none"
        stroke={colors.amber}
        strokeWidth="2"
        strokeLinecap="round"
        pathLength="1"
        strokeDasharray="0.065 0.935"
        strokeDashoffset={1 - localProgress}
        opacity={visibility}
        style={{
          filter: "drop-shadow(0 0 7px rgba(245,166,35,0.42))",
        }}
      />
    </>
  );
}

export function OperatingSystemDiagram({ progress, compact = false }: Props) {
  const safeProgress = clamp(progress);

  const glowIn = easeOutCubic(range(safeProgress, 0.12, 0.23));

  const ringIn = easeOutCubic(range(safeProgress, 0.18, 0.31));

  const identityIn = easeOutCubic(range(safeProgress, 0.24, 0.37));

  const connectionsIn = easeOutCubic(range(safeProgress, 0.34, 0.54));

  const flowProgress = easeInOutCubic(range(safeProgress, 0.6, 0.84));

  const quiet = easeInOutCubic(range(safeProgress, 0.78, 0.91));

  const contract = easeInOutCubic(range(safeProgress, 0.9, 1));

  const paths = compact
    ? [
        "M500 500 C500 390 500 285 500 155",
        "M500 500 C610 500 700 470 810 430",
        "M500 500 C390 500 300 470 190 430",
        "M500 500 C500 610 500 700 500 835",
      ]
    : [
        "M500 500 C500 360 500 260 500 112",
        "M500 500 C640 500 745 500 880 500",
        "M500 500 C360 500 255 500 120 500",
        "M500 500 C500 640 500 740 500 888",
      ];

  return (
    <div
      className="atlas-os-diagram atlas-os-motion"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: 0,
        opacity: 1 - quiet * 0.28 - contract * 0.26,
        transform: `
          translateY(${-quiet * 7}px)
          scale(${1 - quiet * 0.055 - contract * 0.07})
        `,
        transformOrigin: "center",
        willChange: "opacity, transform",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: compact ? "300px" : "min(610px, 54vw)",
          height: compact ? "300px" : "min(610px, 54vw)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(245,166,35,0.13), rgba(245,166,35,0.03) 42%, transparent 70%)",
          opacity: glowIn * (1 - quiet * 0.58),
          transform: `
            translate(-50%, -50%)
            scale(${0.84 + glowIn * 0.16})
          `,
          pointerEvents: "none",
        }}
      />

      <svg
        aria-hidden="true"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          zIndex: 2,
          inset: 0,
          width: "100%",
          height: "100%",
          overflow: "visible",
          opacity: connectionsIn * (1 - quiet * 0.68),
        }}
      >
        {paths.map((path) => (
          <path
            key={path}
            d={path}
            fill="none"
            stroke="rgba(253,250,243,0.14)"
            strokeWidth={compact ? "1.3" : "1.05"}
            strokeDasharray="6 10"
            pathLength="1"
            strokeDashoffset={1 - connectionsIn}
          />
        ))}

        <FlowPulse path={paths[0]} progress={flowProgress} delay={0} quiet={quiet} />

        <FlowPulse path={paths[1]} progress={flowProgress} delay={0.22} quiet={quiet} />

        <FlowPulse path={paths[2]} progress={flowProgress} delay={0.44} quiet={quiet} />

        <FlowPulse path={paths[3]} progress={flowProgress} delay={0.66} quiet={quiet} />
      </svg>

      <div
        className="atlas-os-centre atlas-os-motion"
        style={{
          position: "absolute",
          zIndex: 10,
          left: "50%",
          top: "50%",
          width: compact ? "clamp(142px, 43vw, 178px)" : "clamp(190px, 17vw, 250px)",
          aspectRatio: "1 / 1",
          display: "grid",
          placeItems: "center",
          borderRadius: "50%",
          border: `1px solid rgba(245,166,35,${0.16 + ringIn * 0.54})`,
          background:
            "radial-gradient(circle at 42% 35%, rgba(245,166,35,0.16), rgba(26,26,24,0.985) 63%)",
          boxShadow: `
            0 0 0 ${6 + glowIn * 14}px rgba(245,166,35,0.045),
            0 28px 90px -42px rgba(0,0,0,0.82),
            0 0 ${20 + flowProgress * 26}px rgba(245,166,35,${0.06 + flowProgress * 0.08})
          `,
          opacity: ringIn * (1 - quiet * 0.48),
          transform: `
            translate(-50%, -50%)
            scale(${0.86 + ringIn * 0.14 - quiet * 0.04})
          `,
          willChange: "opacity, transform",
        }}
      >
        <div
          className="atlas-os-motion"
          style={{
            textAlign: "center",
            opacity: identityIn * (1 - quiet * 0.42),
            transform: `
              translateY(${(1 - identityIn) * 8}px)
              scale(${0.96 + identityIn * 0.04})
            `,
          }}
        >
          <div
            style={{
              color: colors.cream,
              fontSize: compact ? "clamp(23px, 7vw, 30px)" : "clamp(30px, 2.7vw, 42px)",
              fontWeight: 650,
              lineHeight: 0.9,
              letterSpacing: "-0.06em",
            }}
          >
            mydiio
          </div>

          <div
            style={{
              marginTop: compact ? "8px" : "11px",
              color: colors.amber,
              fontSize: compact ? "8px" : "10px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Operating System
          </div>
        </div>
      </div>

      {relationships.map((relationship, index) => {
        const relationshipIn = range(safeProgress, 0.36 + index * 0.055, 0.49 + index * 0.055);

        return (
          <RelationshipLabel
            key={relationship.id}
            relationship={relationship}
            compact={compact}
            progress={relationshipIn}
            quiet={quiet}
          />
        );
      })}
    </div>
  );
}
