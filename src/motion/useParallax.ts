// src/motion/useParallax.ts
// Attach to any layer to move it at a fraction of scroll speed. Transform only
// (yPercent), so it stays on the compositor at 60fps. Returns a ref to spread
// onto the element. Frozen entirely under reduced motion.

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "./useReducedMotion";

/**
 * @param speed  Positive moves the layer up as you scroll down (foreground feel).
 *               0.2 is subtle, 0.6 is strong. Background plates use small values.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(speed = 0.2) {
  const reduced = useReducedMotion();
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (reduced || !el) return;
      gsap.to(el, {
        yPercent: -speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { dependencies: [reduced], scope: ref },
  );

  return ref;
}
