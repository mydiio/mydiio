import { colors } from "@/design";
import { CoverageScene } from "./components/CoverageScene";

export function ActFive() {
  return (
    <section
      data-v2-act="coverage"
      data-atlas-tone="light"
      style={{
        position: "relative",
        background: colors.cream,
      }}
    >
      <CoverageScene progress={1} />
    </section>
  );
}
