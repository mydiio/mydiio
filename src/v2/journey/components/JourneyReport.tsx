import { colors } from "@/design";
import { ReportRow } from "./ReportRow";

type JourneyReportProps = {
  progress: number;
};

const reportRows = [
  {
    label: "Campaign",
    value: "Demonstration",
    threshold: 0.72,
  },
  {
    label: "Vehicle",
    value: "MYD-001",
    threshold: 0.77,
  },
  {
    label: "Location",
    value: "Dehiwala",
    threshold: 0.82,
  },
  {
    label: "Time",
    value: "08:42",
    threshold: 0.87,
  },
] as const;

export function JourneyReport({ progress }: JourneyReportProps) {
  const visible = progress >= 0.68;
  const verified = progress >= 0.92;

  return (
    <div
      style={{
        position: "relative",
        zIndex: 5,
        width: "100%",
        maxWidth: "320px",
        padding: "28px",
        borderRadius: "18px",
        background: "rgba(255,255,255,0.96)",
        border: "1px solid rgba(26,26,24,0.065)",
        boxShadow:
          "0 24px 58px -30px rgba(26,26,24,0.2), 0 5px 14px -8px rgba(26,26,24,0.09)",
        fontFamily: '"DM Sans", system-ui, sans-serif',
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1)"
          : "translateY(16px) scale(0.988)",
        transition:
          "opacity 0.55s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1)",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            color: colors.amberDeep,
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          Monday report
        </div>

        <div
          style={{
            color: "rgba(26,26,24,0.4)",
            fontSize: "11px",
            fontWeight: 600,
          }}
        >
          {verified ? "Complete" : "Generating"}
        </div>
      </div>

      <div>
        {reportRows.map((row) => (
          <ReportRow
            key={row.label}
            label={row.label}
            value={row.value}
            visible={progress >= row.threshold}
          />
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          paddingTop: "19px",
          opacity: verified ? 1 : 0.18,
          transform: verified
            ? "translateY(0)"
            : "translateY(3px)",
          transition:
            "opacity 0.45s ease, transform 0.55s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <span
          style={{
            color: colors.ink,
            fontWeight: 700,
          }}
        >
          Status
        </span>

        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "9px",
            color: verified
              ? colors.amberDeep
              : "rgba(26,26,24,0.52)",
            fontWeight: 700,
          }}
        >
          <span
            aria-hidden="true"
            style={{
              display: "grid",
              placeItems: "center",
              width: "23px",
              height: "23px",
              borderRadius: "50%",
              background: verified
                ? colors.amber
                : "rgba(26,26,24,0.08)",
              color: colors.ink,
              fontSize: "13px",
            }}
          >
            {verified ? "✓" : "·"}
          </span>

          {verified ? "Verified" : "Pending"}
        </span>
      </div>
    </div>
  );
}
