import type { CSSProperties, ReactNode } from "react";
import { containerWidth, sectionPadding } from "@/design";

type ContainerProps = {
  children: ReactNode;
  width?: keyof typeof containerWidth;
  style?: CSSProperties;
};

export function Container({
  children,
  width = "page",
  style,
}: ContainerProps) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: containerWidth[width],
        marginInline: "auto",
        paddingInline: sectionPadding.mobile,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
