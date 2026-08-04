import { colors } from "@/design";

type ReportRowProps = {
  label: string;
  value: string;
  visible: boolean;
};

export function ReportRow({
  label,
  value,
  visible,
}: ReportRowProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        gap: "20px",
        padding: "15px 0",
        borderBottom: "1px solid rgba(26,26,24,0.065)",
        opacity: visible ? 1 : 0.16,
        transform: visible
          ? "translateY(0)"
          : "translateY(3px)",
        transition:
          "opacity 0.42s ease, transform 0.52s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <span
        style={{
          color: colors.ink,
          fontWeight: 600,
        }}
      >
        {label}
      </span>

      <span
        style={{
          color: "rgba(26,26,24,0.58)",
          fontSize: "13px",
          textAlign: "right",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {visible ? value : "Pending"}
      </span>
    </div>
  );
}
