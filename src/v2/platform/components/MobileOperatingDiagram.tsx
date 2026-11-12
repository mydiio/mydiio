import { colors } from "@/design";

type Props = { progress: number };

type Relationship = {
  id: string;
  label: string;
  value: string;
  detail: string;
};

// Same content as OperatingSystemDiagram; this component changes only mobile presentation.
const relationships: Relationship[] = [
  { id: "passengers", label: "Passengers", value: "Useful journeys", detail: "Information, discovery and community communication" },
  { id: "drivers", label: "Drivers", value: "Connected participation", detail: "Availability, schedules, earnings and payments" },
  { id: "businesses", label: "Businesses", value: "Measurable reach", detail: "Campaign creation, delivery, verification and reporting" },
  { id: "operations", label: "Operations", value: "Network coordination", detail: "Fleet visibility, content delivery and device health" },
];

function clamp(v: number) { return Math.min(1, Math.max(0, v)); }
function range(v: number, a: number, b: number) { return clamp((v - a) / (b - a)); }
function ease(v: number) { return 1 - Math.pow(1 - clamp(v), 3); }

export function MobileOperatingDiagram({ progress }: Props) {
  const hubIn = ease(range(progress, 0.07, 0.16));
  const linesIn = ease(range(progress, 0.15, 0.29));
  const quiet = ease(range(progress, 0.78, 0.91));
  const cardIn = relationships.map((_, i) => ease(range(progress, 0.17 + i * 0.018, 0.30 + i * 0.018)));

  return (
    <div
      className="atlas-os-mobile-diagram"
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gridTemplateRows: "minmax(0, 1fr) minmax(108px, 0.9fr) minmax(0, 1fr)",
        gap: "clamp(8px, 2.5vw, 14px)",
        alignItems: "stretch",
        boxSizing: "border-box",
        padding: "6px 0",
      }}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 320 400"
        preserveAspectRatio="none"
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          zIndex: 0, overflow: "visible", opacity: linesIn * (1 - quiet * 0.65),
          pointerEvents: "none",
        }}
      >
        <g fill="none" stroke={colors.amber} strokeWidth="1.3" opacity="0.58" strokeDasharray="4 7">
          <path d="M160 200 L80 78" />
          <path d="M160 200 L240 78" />
          <path d="M160 200 L80 325" />
          <path d="M160 200 L240 325" />
        </g>
        <circle cx="160" cy="200" r="70" fill="none" stroke={colors.amber} strokeWidth="0.8" opacity="0.17" strokeDasharray="3 8" />
      </svg>
      {relationships.map((relationship, i) => {
        const row = i < 2 ? 1 : 3;
        const column = i % 2 === 0 ? 1 : 2;
        return (
          <div
            key={relationship.id}
            className="atlas-os-mobile-card atlas-os-mobile-animated"
            data-relationship={relationship.id}
            style={{
              position: "relative", zIndex: 2,
              gridRow: row, gridColumn: column,
              minWidth: 0, padding: "clamp(10px, 3vw, 15px)",
              display: "flex", flexDirection: "column", justifyContent: "center",
              border: "1px solid rgba(253,250,243,0.13)",
              borderRadius: 13,
              background: "rgba(33,33,30,0.97)",
              boxSizing: "border-box",
              opacity: cardIn[i] * (1 - quiet * 0.5),
              transform: `translateY(${(1 - cardIn[i]) * 9}px)`,
            }}
          >
            <div style={{ color: colors.amber, fontSize: 9, fontWeight: 700, letterSpacing: "0.11em", textTransform: "uppercase" }}>
              {relationship.label}
            </div>
            <div style={{ marginTop: 5, color: colors.cream, fontSize: "clamp(13px, 3.8vw, 17px)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1.12 }}>
              {relationship.value}
            </div>
            <div className="atlas-os-mobile-detail" style={{ marginTop: 6, color: "rgba(253,250,243,0.7)", fontSize: "clamp(10px, 2.7vw, 11px)", lineHeight: 1.32 }}>
              {relationship.detail}
            </div>
          </div>
        );
      })}
      <div
        className="atlas-os-mobile-animated"
        style={{
          gridRow: 2, gridColumn: "1 / -1", justifySelf: "center", alignSelf: "center",
          position: "relative", zIndex: 3,
          width: "clamp(100px, 29vw, 128px)", aspectRatio: "1 / 1",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          borderRadius: "50%", border: `1px solid ${colors.amber}`,
          background: "radial-gradient(circle at 40% 30%, rgba(245,166,35,0.21), #1A1A18 75%)",
          boxShadow: "0 0 0 10px rgba(245,166,35,0.035), 0 0 38px rgba(245,166,35,0.1)",
          opacity: hubIn * (1 - quiet * 0.5),
          transform: `scale(${0.92 + hubIn * 0.08})`,
        }}
      >
        <div style={{ color: colors.cream, fontSize: "clamp(21px, 6vw, 27px)", fontWeight: 650, letterSpacing: "-0.07em", lineHeight: 1 }}>mydiio</div>
        <div style={{ color: colors.amber, fontSize: 7, fontWeight: 700, letterSpacing: "0.09em", marginTop: 7, textTransform: "uppercase" }}>Operating system</div>
      </div>
    </div>
  );
}
