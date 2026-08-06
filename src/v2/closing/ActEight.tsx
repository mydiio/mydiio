import { colors } from "@/design";
import { useSmoothSectionProgress } from "@/v2/hooks";
import { ClosingScene } from "./components/ClosingScene";

export function ActEight() {
  const { sectionRef, progress } = useSmoothSectionProgress({
    holdBefore: 0.04,
    holdAfter: 0.88,
    damping: 16,
  });

  return (
    <section
      ref={sectionRef}
      data-v2-act="closing"
      data-atlas-tone="light"
      style={{
        position: "relative",
        height: "245svh",
        background: colors.cream,
      }}
    >
      <ClosingScene progress={progress} />
    </section>
  );
}
