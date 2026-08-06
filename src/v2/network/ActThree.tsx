import { colors } from "@/design";
import { useMediaQuery, useSmoothSectionProgress } from "@/v2/hooks";
import { NetworkScene } from "./components/NetworkScene";

export function ActThree() {
  const isMobile = useMediaQuery("(max-width: 560px)");
  const { sectionRef, progress } = useSmoothSectionProgress({
    holdBefore: 0,
    holdAfter: 1,
    damping: 22,
  });

  return (
    <section
      ref={sectionRef}
      data-v2-act="network"
      data-atlas-tone="light"
      style={{
        position: "relative",
        height: isMobile ? "255svh" : "255svh",
        background: colors.cream,
      }}
    >
      <NetworkScene progress={progress} />
    </section>
  );
}
