import { colors } from "@/design";
import type { AtlasMoment } from "../lib/moments";
import { AtlasHeadline } from "./AtlasHeadline";
import { AtlasOverlay } from "./AtlasOverlay";
import { AtlasEndCard } from "./AtlasEndCard";

type AtlasPlayerProps = {
  moments: AtlasMoment[];
  sequenceProgress: number;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function AtlasPlayer({
  moments,
  sequenceProgress,
}: AtlasPlayerProps) {
  const position = sequenceProgress * (moments.length - 1);
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        height: "100svh",
        overflow: "hidden",
        background: colors.ink,
      }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .atlas-player-video,
          .atlas-headline {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {moments.map((moment, index) => {
        const distance = Math.abs(position - index);
        const holdZone = 0.34;
        const fadeZone = 0.66;
        const opacity = clamp(
          1 - Math.max(0, distance - holdZone) / fadeZone,
        );
        const isVisible = opacity > 0.001;
        const headlineOpacity = clamp(
          1 - Math.max(0, distance - 0.18) / 0.52,
        );

        return (
          <div
            key={moment.id}
            aria-hidden={!isVisible}
            style={{
              position: "absolute",
              inset: 0,
              opacity,
              pointerEvents: "none",
              willChange: "opacity",
            }}
          >
            <video
              className="atlas-player-video"
              src={moment.src}
              autoPlay
              muted
              loop
              playsInline
              preload={index < 3 ? "auto" : "metadata"}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: `scale(${1.018 - opacity * 0.018})`,
                willChange: "transform",
              }}
            />

            <AtlasOverlay active={isVisible} />

            <AtlasHeadline
              headline={moment.headline}
              opacity={headlineOpacity}
            />
          </div>
        );
      })}

      <AtlasEndCard progress={sequenceProgress} />
    </div>
  );
}
