import React, { useRef, ElementType, ReactNode } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from './useReducedMotion';
import { motionTokens } from './tokens';

interface RevealProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  stagger?: boolean;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function Reveal({
  as: Component = 'div',
  children,
  className = '',
  stagger = false,
  delay = 0,
  direction = 'up',
}: RevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!containerRef.current || reducedMotion) return;

    const elements = stagger 
      ? containerRef.current.children 
      : [containerRef.current];

    const from = {
      up: { y: 40, opacity: 0 },
      down: { y: -40, opacity: 0 },
      left: { x: -40, opacity: 0 },
      right: { x: 40, opacity: 0 },
    }[direction];

    gsap.fromTo(
      elements,
      from,
      {
        y: 0,
        x: 0,
        opacity: 1,
        duration: motionTokens.durations.standard,
        ease: motionTokens.easing,
        stagger: stagger ? motionTokens.stagger : 0,
        delay: delay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom-=100',
          end: 'bottom top+=100',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [stagger, delay, direction, reducedMotion]);

  // If reduced motion, show final state immediately
  if (reducedMotion) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <Component ref={containerRef as React.Ref<any>} className={className}>
      {children}
    </Component>
  );
}
