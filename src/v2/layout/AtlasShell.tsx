import type { ReactNode } from "react";
import { colors, fontFamily } from "@/design";

type AtlasShellProps = {
  children: ReactNode;
};

export function AtlasShell({ children }: AtlasShellProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.cream,
        color: colors.ink,
        fontFamily: fontFamily.body,
      }}
    >
      {children}
    </div>
  );
}
