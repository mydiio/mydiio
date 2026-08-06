import { colors } from "@/design";
import { ClosingScene } from "./components/ClosingScene";

export function ActEight() {
  return (
    <section
      data-v2-act="closing"
      data-atlas-tone="light"
      style={{
        position: "relative",
        background: colors.cream,
      }}
    >
      <ClosingScene progress={1} />
    </section>
  );
}
