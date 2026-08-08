import { colors } from "@/design";

type PlatformFeatureProps = {
  number: string;
  title: string;
  body: string;
  progress: number;
  threshold: number;
  nextThreshold?: number;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function PlatformFeature({
  number,
  title,
  body,
  progress,
  threshold,
  nextThreshold = 1.1,
}: PlatformFeatureProps) {
  const revealProgress = clamp(
    (progress - threshold) / 0.1,
  );

  const isCurrent =
    progress >= threshold &&
    progress < nextThreshold;

  const isPast = progress >= nextThreshold;

  const opacity = isCurrent
    ? 1
    : isPast
      ? 0.68
      : 0.18;

  return (
    <div
      style={{
        position: "relative",
        paddingTop: "17px",
        borderTop: `1px solid ${
          isCurrent
            ? "rgba(245,166,35,0.72)"
            : "rgba(253,250,243,0.14)"
        }`,
        fontFamily: '"Space Grotesk", system-ui, -apple-system, sans-serif',
        opacity,
        transform: isCurrent
          ? "translateY(-3px)"
          : `translateY(${(1 - revealProgress) * 5}px)`,
        transition:
          "opacity 0.42s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1), border-color 0.4s ease",
      }}
    >
      <div
        style={{
          marginBottom: "12px",
          color: isCurrent
            ? colors.amber
            : "rgba(253,250,243,0.58)",
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "0.12em",
          transition: "color 0.4s ease",
        }}
      >
        {number}
      </div>

      <h3
        style={{
          margin: 0,
          color: colors.cream,
          fontSize: "20px",
          fontWeight: isCurrent ? 700 : 600,
          lineHeight: 1.12,
          letterSpacing: "-0.035em",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          margin: "9px 0 0",
          maxWidth: "34ch",
          color: "rgba(253,250,243,0.56)",
          fontSize: "14px",
          lineHeight: 1.4,
        }}
      >
        {body}
      </p>
    </div>
  );
}
