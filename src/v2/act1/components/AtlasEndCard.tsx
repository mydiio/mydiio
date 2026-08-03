import { colors, spacing } from "@/design";

const WORDMARK = "/assets/mydiio_lockup_transparent.png";

type AtlasEndCardProps = {
  progress: number;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function AtlasEndCard({ progress }: AtlasEndCardProps) {
  const logoOpacity = clamp((progress - 0.87) / 0.08);
  const taglineOpacity = clamp((progress - 0.92) / 0.08);

  return (
    <div
      aria-hidden={logoOpacity < 0.01}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 6,
        display: "grid",
        placeItems: "center",
        background: colors.cream,
        opacity: logoOpacity,
        pointerEvents: "none",
        willChange: "opacity",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: spacing[6],
          width: "100%",
          paddingInline: spacing[5],
          textAlign: "center",
        }}
      >
        <img
          src={WORDMARK}
          alt="mydiio"
          style={{
            display: "block",
            width: "clamp(180px, 28vw, 420px)",
            height: "auto",
            opacity: logoOpacity,
            transform: `translateY(${(1 - logoOpacity) * 12}px)`,
            willChange: "opacity, transform",
          }}
        />

        <div
          style={{
            color: colors.ink,
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: "clamp(18px, 1.8vw, 28px)",
            fontWeight: 500,
            lineHeight: 1.2,
            letterSpacing: "-0.03em",
            opacity: taglineOpacity,
            transform: `translateY(${(1 - taglineOpacity) * 10}px)`,
            willChange: "opacity, transform",
          }}
        >
          Every Journey Connected
        </div>
      </div>
    </div>
  );
}
