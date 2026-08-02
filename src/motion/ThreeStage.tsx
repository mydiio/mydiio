// src/motion/ThreeStage.tsx
// Thin wrapper around the react-three-fiber Canvas with the defaults every
// mydiio 3D scene should share: client-only (never SSR'd on the Worker),
// transparent background so it layers behind the DOM, capped DPR for mid-range
// Android, and demand rendering to save battery. Under reduced motion it renders
// a single static frame.
//
// This is the wiring only. Drop meshes in as children when you build the
// corridor scene (Prompt 3); nothing heavy is mounted here yet.

import { Suspense, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "./useReducedMotion";
import { useMounted } from "./useMounted";

type ThreeStageProps = {
  children: ReactNode;
  /** "demand" renders only when invalidated (scroll). "always" for idle motion. */
  frameloop?: "always" | "demand" | "never";
  /** Max device pixel ratio. Keep the ceiling low for mid-range Android. */
  dpr?: [number, number];
  className?: string;
  /** Shown during SSR / before mount / while assets load. */
  fallback?: ReactNode;
};

export function ThreeStage({
  children,
  frameloop = "demand",
  dpr = [1, 1.75],
  className,
  fallback = null,
}: ThreeStageProps) {
  const reduced = useReducedMotion();
  const mounted = useMounted();

  if (!mounted) return <>{fallback}</>;

  return (
    <Canvas
      className={className}
      dpr={dpr}
      frameloop={reduced ? "never" : frameloop}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
}
