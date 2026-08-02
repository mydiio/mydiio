// src/motion/index.ts
// One import surface for the whole motion system.

export { MotionProvider, useMotion, useScrollProgress } from "./MotionProvider";
export {
  LoaderProvider,
  useLoaderGate,
  useOnReveal,
  useLoaderControls,
} from "./LoaderProvider";
export { Loader } from "./Loader";
export { Reveal } from "./Reveal";
export { useParallax } from "./useParallax";
export { ThreeStage } from "./ThreeStage";
export { LottiePlayer } from "./LottiePlayer";
export { useReducedMotion } from "./useReducedMotion";
export { useMounted } from "./useMounted";
export { EASE, EASE_CSS, EASE_FN, DURATION, STAGGER } from "./tokens";
export type { DurationKey } from "./tokens";
