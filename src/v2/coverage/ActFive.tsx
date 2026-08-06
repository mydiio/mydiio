import { colors } from "@/design";
import { useMediaQuery, useSmoothSectionProgress } from "@/v2/hooks";
import { CoverageScene } from "./components/CoverageScene";

export function ActFive() {
  const isMobile = useMediaQuery("(max-width: 560px)");
  const { sectionRef, progress } = useSmoothSectionProgress({
    holdBefore: 0.04,
    holdAfter: 0.92,
    damping: 16,
  });

  return (
    <section
      ref={sectionRef}
      data-v2-act="coverage"
      data-atlas-tone="light"
      style={{
        position: "relative",
        height: isMobile ? "220svh" : "225svh",
        background: colors.cream,
      }}
    >
      <CoverageScene progress={progress} />
    </section>
  );
}
