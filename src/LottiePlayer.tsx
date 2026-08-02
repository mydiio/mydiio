// src/motion/LottiePlayer.tsx
// Wrapper around lottie-react. Reduced-motion users get the last frame as a
// static image instead of a loop. Keep Lottie JSON out of the initial bundle by
// importing animationData lazily where you use this (dynamic import), so it
// never blocks first paint.

import { useEffect, useRef } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useReducedMotion } from "./useReducedMotion";

type LottiePlayerProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  animationData: any;
  loop?: boolean;
  className?: string;
};

export function LottiePlayer({
  animationData,
  loop = true,
  className,
}: LottiePlayerProps) {
  const reduced = useReducedMotion();
  const ref = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (!reduced || !ref.current) return;
    try {
      const frames = ref.current.getDuration(true) ?? 0;
      ref.current.goToAndStop(Math.max(frames - 1, 0), true);
    } catch {
      /* animation not ready yet, ignore */
    }
  }, [reduced]);

  return (
    <Lottie
      lottieRef={ref}
      animationData={animationData}
      autoplay={!reduced}
      loop={reduced ? false : loop}
      className={className}
    />
  );
}
