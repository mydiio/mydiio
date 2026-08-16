import { colors, letterSpacing, spacing, typeScale } from "@/design";

type AtlasProgressProps = {
  activeIndex: number;
  total: number;
};

export function AtlasProgress({ activeIndex, total }: AtlasProgressProps) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        right: spacing[5],
        bottom: spacing[5],
        zIndex: 4,
        display: "flex",
        alignItems: "center",
        gap: spacing[3],
        color: "rgba(253,250,243,0.68)",
        fontFamily: '"Space Grotesk", system-ui, -apple-system, sans-serif',
        fontSize: typeScale.micro,
        fontWeight: 600,
        letterSpacing: letterSpacing.mono,
      }}
    >
      <span>{String(activeIndex + 1).padStart(2, "0")}</span>

      <span
        style={{
          display: "block",
          width: spacing[7],
          height: "1px",
          background: "rgba(253,250,243,0.32)",
        }}
      >
        <span
          style={{
            display: "block",
            width: `${((activeIndex + 1) / total) * 100}%`,
            height: "100%",
            background: colors.amber,
            transition: "width 0.45s ease-out",
          }}
        />
      </span>

      <span>{String(total).padStart(2, "0")}</span>
    </div>
  );
}
