import { colors } from "@/design";
import { useMediaQuery, useSmoothSectionProgress } from "@/v2/hooks";
import { PioneerScene } from "./components/PioneerScene";

export function ActSeven() {
  const isMobile = useMediaQuery("(max-width: 560px)");
  const { sectionRef, progress } = useSmoothSectionProgress({
    holdBefore: 0.04,
    holdAfter: 0.92,
    damping: 16,
  });

  return (
    <section
      ref={sectionRef}
      data-v2-act="pioneer"
      data-atlas-tone="dark"
      style={{
        position: "relative",
        height: isMobile ? "220svh" : "225svh",
        background: colors.ink,
      }}
    >
      <PioneerScene progress={progress} />
    </section>
  );
}
