import { colors } from "@/design";
import { useMediaQuery, useSmoothSectionProgress } from "@/v2/hooks";
import { PlatformScene } from "./components/PlatformScene";

export function ActFour() {
  const isMobile = useMediaQuery("(max-width: 560px)");
  const { sectionRef, progress } = useSmoothSectionProgress({
    holdBefore: 0,
    holdAfter: 1,
    damping: 22,
    entryProgress: true,
    entryDistance: 2.3,
  });

  return (
    <section
      ref={sectionRef}
      data-v2-act="platform"
      data-atlas-tone="dark"
      style={{
        position: "relative",
        height: isMobile ? "230svh" : "230svh",
        background: colors.ink,
      }}
    >
      <p
        style={{
          position: "absolute",
          top: 12,
          left: 24,
          right: 24,
          zIndex: 5,
          color: "#fff",
          fontSize: 13,
        }}
      >
        Illustrative platform preview · sample data, not customer results.
      </p>
      <PlatformScene progress={progress} />
    </section>
  );
}
