import { colors } from "@/design";
import { useMediaQuery, useSmoothSectionProgress } from "@/v2/hooks";
import { PlatformScene } from "./components/PlatformScene";

export function ActFour() {
  const isMobile = useMediaQuery("(max-width: 560px)");
  const { sectionRef, progress } = useSmoothSectionProgress({
    holdBefore: 0,
    holdAfter: 1,
    damping: 22,
  });

  return (
    <section
      ref={sectionRef}
      data-v2-act="platform"
      data-atlas-tone="dark"
      style={{
        position: "relative",
        height: isMobile ? "280svh" : "280svh",
        background: colors.ink,
      }}
    >
      <PlatformScene progress={progress} />
    </section>
  );
}
