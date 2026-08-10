import { colors } from "@/design";
import { useMediaQuery, useSmoothSectionProgress } from "@/v2/hooks";
import { NetworkScene } from "./components/NetworkScene";

export function ActThree() {
  const isMobile = useMediaQuery("(max-width: 560px)");
  const { sectionRef, progress } = useSmoothSectionProgress({
    holdBefore: 0,
    holdAfter: isMobile ? 0 : 1,
    damping: 22,
    entryProgress: true,
    entryDistance: 2.2,
  });

  return (
    <section
      ref={sectionRef}
      data-v2-act="network"
      data-atlas-tone="light"
      style={{
        position: "relative",
        height: isMobile ? "235svh" : "220svh",
        background: colors.cream,
      }}
    >
      <NetworkScene progress={progress} />
    </section>
  );
}
