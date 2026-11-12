import { colors } from "@/design";
import { useMediaQuery, useSmoothSectionProgress } from "@/v2/hooks";
import { PlatformScene } from "./components/PlatformScene";

export function ActFour() {
  const isMobile = useMediaQuery("(max-width: 560px)");
  const { sectionRef, progress } = useSmoothSectionProgress({
    holdBefore: 0,
    holdAfter: 1,
    damping: 12,
    entryProgress: false,
    entryLead: 0.6,
    snapToEnd: true,
  });

  return (
    <section
      ref={sectionRef}
      data-v2-act="platform"
      data-atlas-tone="dark"
      style={{
        position: "relative",
        height: isMobile ? "auto" : "340svh",
        background: colors.ink,
      }}
    >
      <PlatformScene progress={isMobile ? 0.72 : progress} />
    </section>
  );
}








