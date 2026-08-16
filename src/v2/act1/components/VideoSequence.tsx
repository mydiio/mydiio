import { colors } from "@/design";
import { useSmoothSectionProgress } from "@/v2/hooks";
import { moments } from "../lib/moments";
import { AtlasPlayer } from "./AtlasPlayer";

export function VideoSequence() {
  const { sectionRef, progress: sequenceProgress } = useSmoothSectionProgress({
    damping: 12,
    snapToEnd: true,
  });

  return (
    <main
      ref={sectionRef}
      data-atlas-act-one
      data-v2-act="act-one"
      style={{
        position: "relative",
        height: "280svh",
        background: colors.ink,
      }}
    >
      <AtlasPlayer moments={moments} sequenceProgress={sequenceProgress} />
    </main>
  );
}
