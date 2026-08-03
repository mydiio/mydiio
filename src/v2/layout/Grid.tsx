import type { CSSProperties, ReactNode } from "react";
import { spacing } from "@/design";

type GridProps = {
  children: ReactNode;
  columns?: string;
  gap?: keyof typeof spacing;
  style?: CSSProperties;
};

export function Grid({
  children,
  columns = "repeat(2, minmax(0, 1fr))",
  gap = 6,
  style,
}: GridProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: columns,
        gap: spacing[gap],
        ...style,
      }}
    >
      {children}
    </div>
  );
}
