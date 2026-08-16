import type { CSSProperties, ReactNode } from "react";
import { colors, spacing } from "@/design";

type SectionTone = "cream" | "white" | "ink" | "amber";

type SectionProps = {
  children: ReactNode;
  tone?: SectionTone;
  fullHeight?: boolean;
  style?: CSSProperties;
};

const toneStyles: Record<SectionTone, CSSProperties> = {
  cream: {
    background: colors.cream,
    color: colors.ink,
  },
  white: {
    background: colors.white,
    color: colors.ink,
  },
  ink: {
    background: colors.ink,
    color: colors.cream,
  },
  amber: {
    background: colors.amber,
    color: colors.ink,
  },
};

export function Section({ children, tone = "cream", fullHeight = false, style }: SectionProps) {
  return (
    <section
      style={{
        minHeight: fullHeight ? "100svh" : undefined,
        paddingBlock: spacing[9],
        display: fullHeight ? "grid" : undefined,
        alignItems: fullHeight ? "center" : undefined,
        ...toneStyles[tone],
        ...style,
      }}
    >
      {children}
    </section>
  );
}
