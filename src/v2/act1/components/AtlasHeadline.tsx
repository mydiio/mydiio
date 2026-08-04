import { colors } from "@/design";

type AtlasHeadlineProps = {
  eyebrow?: string;
  headline?: string;
  supporting?: string;
  opacity: number;
};

export function AtlasHeadline({
  eyebrow,
  headline,
  supporting,
  opacity,
}: AtlasHeadlineProps) {
  if (!headline) return null;

  const reveal = Math.max(0, Math.min(1, opacity));

  return (
    <div
      className="atlas-headline"
      style={{
        position: "absolute",
        left: "clamp(32px, 6.5vw, 104px)",
        right: "clamp(28px, 7vw, 112px)",
        top: "clamp(48%, 57vh, 62%)",
        zIndex: 5,
        maxWidth: "min(680px, 72vw)",
        opacity: reveal,
        transform: `translateY(calc(-50% + ${
          (1 - reveal) * 28
        }px))`,
        filter: `blur(${(1 - reveal) * 10}px)`,
        willChange: "opacity, transform, filter",
        pointerEvents: "none",
      }}
    >
      {eyebrow && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "11px",
            marginBottom: "18px",
            color: colors.amber,
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: "clamp(11px, 0.85vw, 13px)",
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            opacity: reveal,
            transform: `translateY(${(1 - reveal) * 8}px)`,
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: "28px",
              height: "1px",
              background: colors.amber,
              opacity: 0.9,
            }}
          />

          {eyebrow}
        </div>
      )}

      <h1
        style={{
          margin: 0,
          maxWidth: "11.5ch",
          color: colors.cream,
          fontFamily: '"DM Sans", system-ui, sans-serif',
          fontSize: "clamp(48px, 6.1vw, 94px)",
          fontWeight: 600,
          lineHeight: 0.91,
          letterSpacing: `calc(-0.06em + ${
            (1 - reveal) * 0.018
          }em)`,
          textWrap: "balance",
          textShadow:
            "0 3px 34px rgba(0,0,0,0.32), 0 1px 6px rgba(0,0,0,0.22)",
        }}
      >
        {headline}
      </h1>

      {supporting && (
        <p
          style={{
            margin: "clamp(20px, 2.5vh, 28px) 0 0",
            maxWidth: "46ch",
            color: "rgba(253,250,243,0.74)",
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: "clamp(15px, 1.2vw, 19px)",
            fontWeight: 450,
            lineHeight: 1.5,
            letterSpacing: "-0.018em",
            textShadow: "0 2px 18px rgba(0,0,0,0.3)",
            opacity: Math.max(0, (reveal - 0.18) / 0.82),
            transform: `translateY(${
              (1 - reveal) * 12
            }px)`,
          }}
        >
          {supporting}
        </p>
      )}
    </div>
  );
}
