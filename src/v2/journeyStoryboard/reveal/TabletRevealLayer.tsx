import { JourneyTablet } from "../tablet/JourneyTablet";

type Props = {
  progress: number;
};

const clamp = (value: number, minimum = 0, maximum = 1) =>
  Math.min(maximum, Math.max(minimum, value));

export function TabletRevealLayer({ progress }: Props) {
  const reveal = clamp(progress);

  const opacity = reveal;

  const scale = 0.92 + reveal * 0.08;

  const translateY = (1 - reveal) * 42;

  const blur = (1 - reveal) * 8;

  return (
    <div
      data-tablet-reveal-layer
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        transform: `
          translate3d(
            0,
            ${translateY}px,
            0
          )
          scale(${scale})
        `,
        filter: `
          blur(${blur}px)
        `,
        pointerEvents: "none",
      }}
    >
      <JourneyTablet />
    </div>
  );
}
