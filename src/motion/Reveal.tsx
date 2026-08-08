// src/motion/Reveal.tsx
// Reveal-on-enter. Transform and opacity only. Content ships visible in the
// markup; JS hides it and plays it in only when motion is allowed, so no-JS and
// reduced-motion users always see the final state with zero shift.

import { forwardRef, createElement, useRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { DURATION, EASE, STAGGER } from "./tokens";
import { useReducedMotion } from "./useReducedMotion";

type RevealProps = {
  children: ReactNode;
  /** Rise distance in px. */
  y?: number;
  /** Stagger between direct children. Set 0 to reveal as one block. */
  stagger?: number;
  /** ScrollTrigger start. */
  start?: string;
  as?: ElementType;
  className?: string;
};

export const Reveal = forwardRef<HTMLElement, RevealProps>(function Reveal(
  {
    children,
    y = 24,
    stagger = STAGGER,
    start = "top 85%",
    as: Tag = "div",
    className,
  },
  forwardedRef,
) {
  const reduced = useReducedMotion();
  const localRef = useRef<HTMLElement>(null);
  const scope = (forwardedRef as React.RefObject<HTMLElement>) ?? localRef;

  useGSAP(
    () => {
      const root = scope.current;
      if (reduced || !root) return;

      // Stagger direct children when there are several, otherwise the root.
      const targets: Element[] =
        root.children.length > 1 ? Array.from(root.children) : [root];

      gsap.set(targets, { opacity: 0, y, willChange: "transform, opacity" });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: DURATION.md,
        ease: EASE,
        stagger,
        clearProps: "willChange",
        scrollTrigger: { trigger: root, start, once: true },
      });
    },
    { dependencies: [reduced], scope: localRef },
  );

  return createElement(Tag, { ref: scope, className }, children);
});
