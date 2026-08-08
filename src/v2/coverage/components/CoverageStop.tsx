import { colors } from "@/design";

type CoverageStopProps = {
  number: string;
  title: string;
  detail: string;
  time: string;
  active: boolean;
  complete: boolean;
};

export function CoverageStop({
  number,
  title,
  detail,
  time,
  active,
}: CoverageStopProps) {
  return (
    <div
      style={{
        width: "218px",
        padding: "17px 18px",
        borderRadius: "16px",
        background: "rgba(255,255,255,0.97)",
        border: "1px solid rgba(26,26,24,0.07)",
        boxShadow:
          "0 24px 52px -30px rgba(26,26,24,0.32), 0 7px 18px -12px rgba(26,26,24,0.14)",
        fontFamily: '"Space Grotesk", system-ui, -apple-system, sans-serif',
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          marginBottom: "11px",
        }}
      >
        <span
          style={{
            color: colors.amberDeep,
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.13em",
          }}
        >
          {number}
        </span>

        <span
          style={{
            color: "rgba(26,26,24,0.42)",
            fontSize: "11px",
            fontWeight: 600,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {time}
        </span>
      </div>

      <h3
        style={{
          margin: 0,
          color: colors.ink,
          fontSize: "20px",
          fontWeight: 700,
          lineHeight: 1.12,
          letterSpacing: "-0.04em",
        }}
      >
        {title}
      </h3>

      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          marginTop: "11px",
          color: "rgba(26,26,24,0.54)",
          fontSize: "12px",
          fontWeight: 600,
        }}
      >
        <span
          aria-hidden="true"
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: colors.amber,
            boxShadow:
              "0 0 0 5px rgba(245,166,35,0.11)",
          }}
        />

        {detail}
      </div>
    </div>
  );
}
