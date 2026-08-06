import { colors } from "@/design";
import { PioneerScene } from "./components/PioneerScene";

export function ActSeven() {
  return (
    <section
      data-v2-act="pioneer"
      data-atlas-tone="dark"
      style={{
        position: "relative",
        background: colors.ink,
      }}
    >
      <PioneerScene progress={1} />
    </section>
  );
}
