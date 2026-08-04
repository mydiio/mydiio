import { colors } from "@/design";

type MetricProps = {
  value: number;
  display: string;
  label: string;
  eyebrow: string;
  progress: number;
  threshold: number;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

function formatLiveValue(value: number) {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }

  return value.toLocaleString();
}

export function Metric({
  value,
  display,
  label,
  eyebrow,
  progress,
  threshold,
}: MetricProps) {
  const availableProgress = Math.max(0.08, 1 - threshold);

  const localProgress = clamp(
    (progress - threshold) / availableProgress,
  );

  const eased = easeOutCubic(localProgress);
  const currentValue = Math.round(value * eased);

  const formatted =
    localProgress >= 0.995
      ? display
      : formatLiveValue(currentValue);

  return (
    <div
      style={{
        minWidth: 0,
        overflow: "hidden",
        opacity: localProgress,
        transform: `translateY(${(1 - localProgress) * 14}px)`,
        transition: "opacity 0.08s linear",
      }}
    >
      <div
        style={{
          marginBottom: "10px",
          color: colors.amberDeep,
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "0.11em",
          textTransform: "uppercase",
        }}
      >
        {eyebrow}
      </div>

      <div
        style={{
          color: colors.ink,
          fontSize: "clamp(36px, 3.15vw, 54px)",
          fontWeight: 650,
          lineHeight: 0.94,
          letterSpacing: "-0.055em",
          fontVariantNumeric: "tabular-nums",
          whiteSpace: "nowrap",
          maxWidth: "100%",
          overflow: "visible",
        }}
      >
        {formatted}
      </div>

      <p
        style={{
          margin: "11px 0 0",
          maxWidth: "18ch",
          color: "rgba(26,26,24,0.6)",
          fontSize: "15px",
          lineHeight: 1.35,
        }}
      >
        {label}
      </p>
    </div>
  );
}
