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

function getWeightedPosition(progress: number, moments: AtlasMoment[]) {
  if (moments.length <= 1) return 0;

  const weights = moments.map((moment) => Math.max(0.01, moment.weight));

  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);

  let cursor = 0;

  const centres = weights.map((weight) => {
    const centre = cursor + weight / 2;
    cursor += weight;
    return centre / totalWeight;
  });

  if (progress <= centres[0]) return 0;

  const lastIndex = centres.length - 1;

  if (progress >= centres[lastIndex]) {
    return lastIndex;
  }

  for (let index = 0; index < lastIndex; index += 1) {
    const start = centres[index];
    const end = centres[index + 1];

    if (progress <= end) {
      const localProgress = clamp((progress - start) / (end - start));

      return index + localProgress;
    }
  }

  return lastIndex;
}

export function AtlasPlayer({ moments, sequenceProgress }: AtlasPlayerProps) {
  const videoSequenceProgress = clamp(sequenceProgress / 0.84);

  const position = getWeightedPosition(videoSequenceProgress, moments);

  const finalVideoExit = clamp((sequenceProgress - 0.965) / 0.035);

  const endCardProgress = clamp((sequenceProgress - 0.82) / 0.17);

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
        .atlas-headline {
          will-change: opacity, transform, filter;
        }

        @media (max-width: 760px) {
          .atlas-headline {
            top: auto !important;
            left: 24px !important;
            right: 24px !important;
            bottom: clamp(48px, 7vh, 72px) !important;
            max-width: calc(100vw - 48px) !important;
            transform: translateY(0) !important;
          }

          .atlas-headline h1 {
            max-width: 8.6ch !important;
            font-size: clamp(50px, 15.2vw, 80px) !important;
            line-height: 0.9 !important;
          }

          .atlas-headline p {
            max-width: 31ch !important;
            font-size: 16px !important;
            line-height: 1.45 !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .atlas-player-video,
          .atlas-headline {
            transition: none !important;
            transform: none !important;
            filter: none !important;
          }
        }
      `}</style>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background: colors.ink,
          pointerEvents: "none",
        }}
      />

      {moments.map((moment, index) => {
        const distance = Math.abs(position - index);
        const holdZone = 0.62;
        const fadeZone = 0.26;
        const baseOpacity = clamp(1 - Math.max(0, distance - holdZone) / fadeZone);

        const isFinalMoment = index === moments.length - 1;

        const opacity = isFinalMoment ? baseOpacity * (1 - finalVideoExit) : baseOpacity;

        const isVisible = opacity > 0.001;
        const headlineOpacity = clamp(1 - Math.max(0, distance - 0.46) / 0.68);

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

            <AtlasOverlay active={isVisible && (!isFinalMoment || finalVideoExit < 0.01)} />

            <AtlasHeadline
              eyebrow={moment.eyebrow}
              headline={moment.headline}
              supporting={moment.supporting}
              headlineTop={moment.headlineTop}
              opacity={headlineOpacity}
            />
          </div>
        );
      })}

      <AtlasEndCard progress={endCardProgress} />
    </div>
  );
}
