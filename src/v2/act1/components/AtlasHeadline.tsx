import { colors, spacing } from "@/design";

type AtlasHeadlineProps = {
  headline?: string;
  opacity: number;
};

export function AtlasHeadline({
  headline,
  opacity,
}: AtlasHeadlineProps) {
  if (!headline) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: `clamp(${spacing[5]}, 7vw, ${spacing[10]})`,
        right: spacing[5],
        bottom: `clamp(${spacing[6]}, 9vh, ${spacing[9]})`,
        zIndex: 5,
        opacity,
        transform: `translateY(${(1 - opacity) * 22}px)`,
        willChange: "opacity, transform",
        pointerEvents: "none",
      }}
    >
      <h1
        style={{
          margin: 0,
          maxWidth: "12ch",
          color: colors.cream,
          fontFamily: '"DM Sans", system-ui, sans-serif',
          fontSize: "clamp(52px, 8vw, 128px)",
          fontWeight: 600,
          lineHeight: 0.92,
          letterSpacing: "-0.055em",
          textShadow: "0 2px 30px rgba(0,0,0,0.24)",
        }}
      >
        {headline}
      </h1>
    </div>
  );
}
