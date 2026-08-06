import { colors } from "@/design";
import { StaticPackages } from "./components/StaticPackages";

export function ActSix() {
  return (
    <section
      data-v2-act="packages"
      data-atlas-tone="light"
      style={{
        position: "relative",
        background: colors.cream,
      }}
    >
      <StaticPackages />
    </section>
  );
}
