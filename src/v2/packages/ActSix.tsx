import { colors } from "@/design";
import { useMediaQuery, useSmoothSectionProgress } from "@/v2/hooks";
import { PackagesScene } from "./components/PackagesScene";

export function ActSix() {
  const isMobile = useMediaQuery("(max-width: 560px)");
  const { sectionRef, progress } = useSmoothSectionProgress({
    holdBefore: 0.04,
    holdAfter: 0.92,
    damping: 16,
  });

  return (
    <section
      ref={sectionRef}
      data-v2-act="packages"
      data-atlas-tone="light"
      style={{
        position: "relative",
        height: isMobile ? "255svh" : "275svh",
        background: colors.cream,
      }}
    >
      <PackagesScene progress={progress} />
    </section>
  );
}
