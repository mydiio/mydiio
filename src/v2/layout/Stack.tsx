import type { CSSProperties, ReactNode } from "react";
import { spacing } from "@/design";

type StackProps = {
  children: ReactNode;
  gap?: keyof typeof spacing;
  align?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyContent"];
  style?: CSSProperties;
};

export function Stack({ children, gap = 5, align, justify, style }: StackProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: spacing[gap],
        alignItems: align,
        justifyContent: justify,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
