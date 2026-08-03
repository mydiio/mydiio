import { colors, EASE_CSS } from "@/design";
import type { AtlasMoment } from "../lib/moments";
import { AtlasHeadline } from "./AtlasHeadline";
import { AtlasOverlay } from "./AtlasOverlay";
import { AtlasProgress } from "./AtlasProgress";

type AtlasPlayerProps = {
  moments: AtlasMoment[];
  activeIndex: number;
};

export function AtlasPlayer({
  moments,
  activeIndex,
}: AtlasPlayerProps) {
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
        .atlas-player-video {
          transition:
            opacity 0.7s ${EASE_CSS},
            transform 1.6s ${EASE_CSS};
        }

        @media (prefers-reduced-motion: reduce) {
          .atlas-player-video,
          .atlas-headline {
            transition: none !important;
          }
        }
      `}</style>

      {moments.map((moment, index) => {
        const active = index === activeIndex;

        return (
          <div
            key={moment.id}
            aria-hidden={!active}
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
            }}
          >
            <video
              className="atlas-player-video"
              src={moment.src}
              autoPlay
              muted
              loop
              playsInline
              preload={index < 2 ? "auto" : "metadata"}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: active ? 1 : 0,
                transform: active ? "scale(1)" : "scale(1.018)",
              }}
            />

            <AtlasOverlay active={active} />

            <AtlasHeadline
              headline={moment.headline}
              active={active}
            />
          </div>
        );
      })}

      <AtlasProgress
        activeIndex={activeIndex}
        total={moments.length}
      />
    </div>
  );
}
