import { colors, EASE_CSS, spacing } from "@/design";

type AtlasHeadlineProps = {
  headline?: string;
  active: boolean;
};

export function AtlasHeadline({
  headline,
  active,
}: AtlasHeadlineProps) {
  if (!headline) return null;

  const isBrandReveal = headline === "mydiio";

  return (
    <div
      className="atlas-headline"
      style={{
        position: "absolute",
        left: `clamp(${spacing[5]}, 7vw, ${spacing[10]})`,
        right: spacing[5],
        bottom: `clamp(${spacing[6]}, 9vh, ${spacing[9]})`,
        zIndex: 3,
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.55s ${EASE_CSS}, transform 0.7s ${EASE_CSS}`,
      }}
    >
      <h1
        style={{
          margin: 0,
          maxWidth: isBrandReveal ? "none" : "12ch",
          color: isBrandReveal ? colors.amber : colors.cream,
          fontFamily: '"DM Sans", system-ui, sans-serif',
          fontSize: isBrandReveal
            ? "clamp(64px, 11vw, 176px)"
            : "clamp(48px, 8vw, 128px)",
          fontWeight: isBrandReveal ? 700 : 600,
          lineHeight: 0.9,
          letterSpacing: isBrandReveal ? "-0.07em" : "-0.055em",
        }}
      >
        {headline}
      </h1>
    </div>
  );
}
