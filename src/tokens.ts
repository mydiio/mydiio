// src/motion/tokens.ts
// Single source of truth for motion. Every animation in the app reads from here,
// so the whole site shares one easing and one rhythm. Do not hardcode durations
// or eases anywhere else.

/** GSAP easing string. One soft ease-out for the entire site. */
export const EASE = "power3.out";

/** The same curve as a CSS cubic-bezier, for CSS transitions and Lenis. */
export const EASE_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";

/** The same curve as a plain function (Lenis wants an easing fn). easeOutCubic. */
export const EASE_FN = (t: number): number => 1 - Math.pow(1 - t, 3);

/** Duration scale in seconds. Reach for a step, never an arbitrary number. */
export const DURATION = {
  xs: 0.2,
  sm: 0.35,
  md: 0.5,
  lg: 0.8,
} as const;

/** Stagger constant for grouped reveals. */
export const STAGGER = 0.08;

export type DurationKey = keyof typeof DURATION;
