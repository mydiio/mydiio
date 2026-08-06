import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { type ReactNode, useEffect, useRef, useState } from "react";

type ContainerScrollChildren = ReactNode | ((progress: MotionValue<number>) => ReactNode);

type ContainerScrollProps = {
  children: ContainerScrollChildren;
  className?: string;
};

export function ContainerScroll({ children, className = "" }: ContainerScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 52,
    damping: 27,
    mass: 0.96,
    restDelta: 0.0005,
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  /*
   * Tablet story allocation:
   *
   * 0.00 → 0.16  hardware entrance
   * 0.16 → 0.42  live journey
   * 0.42 → 0.68  GPS verification
   * 0.68 → 0.86  Monday report
   * 0.86 → 1.00  final complete hold
   */
  const storyProgress = useTransform(smoothProgress, [0.1, 0.88], [0, 1], {
    clamp: true,
  });

  const rotateX = useTransform(
    smoothProgress,
    [0, 0.1, 0.24, 0.38, 1],
    isMobile ? [4, 2.4, 0.4, 0, 0] : [5.5, 3, 0.6, 0, 0],
  );

  const scale = useTransform(
    smoothProgress,
    [0, 0.1, 0.26, 0.4, 1],
    isMobile ? [0.94, 0.97, 0.996, 1, 1] : [0.95, 0.98, 0.997, 1, 1],
  );

  const translateY = useTransform(
    smoothProgress,
    [0, 0.09, 0.24, 0.38, 1],
    isMobile ? [150, 88, 20, 0, 0] : [190, 104, 24, 0, 0],
  );

  const opacity = useTransform(smoothProgress, [0, 0.04, 0.12, 0.26, 1], [0.12, 0.48, 0.9, 1, 1]);

  const glowOpacity = useTransform(
    smoothProgress,
    [0, 0.12, 0.3, 0.46, 1],
    [0, 0.08, 0.26, 0.32, 0.32],
  );

  const shadowOpacity = useTransform(
    smoothProgress,
    [0, 0.12, 0.32, 0.48, 1],
    [0, 0.1, 0.32, 0.4, 0.4],
  );

  const renderedChildren = typeof children === "function" ? children(storyProgress) : children;

  return (
    <section
      ref={containerRef}
      data-container-scroll
      className={`relative h-[210vh] w-full bg-[#080807] ${className}`}
    >
      <div
        aria-hidden="true"
        data-container-scroll-transition
        className="pointer-events-none absolute left-0 top-0 z-20 h-8 w-full"
        style={{
          background: "linear-gradient(to bottom, rgba(253,250,243,0.04), transparent)",
        }}
      />

      <div
        data-container-scroll-sticky
        className="sticky top-0 flex h-screen min-h-[700px] w-full items-center justify-center overflow-hidden bg-[#080807]"
      >
        <motion.div
          data-container-scroll-glow
          aria-hidden="true"
          style={{
            opacity: glowOpacity,
          }}
          className="pointer-events-none absolute left-1/2 top-[48%] h-[36vh] w-[50vw] max-w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-[50%]"
        >
          <div
            className="h-full w-full rounded-[50%]"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(245,166,35,0.05) 0%, rgba(245,166,35,0.012) 44%, transparent 74%)",
              filter: "blur(66px)",
            }}
          />
        </motion.div>

        <ProductStage
          rotateX={rotateX}
          scale={scale}
          translateY={translateY}
          opacity={opacity}
          shadowOpacity={shadowOpacity}
        >
          {renderedChildren}
        </ProductStage>
      </div>
    </section>
  );
}

type ProductStageProps = {
  rotateX: MotionValue<number>;
  scale: MotionValue<number>;
  translateY: MotionValue<number>;
  opacity: MotionValue<number>;
  shadowOpacity: MotionValue<number>;
  children: ReactNode;
};

function ProductStage({
  rotateX,
  scale,
  translateY,
  opacity,
  shadowOpacity,
  children,
}: ProductStageProps) {
  return (
    <motion.div
      data-container-scroll-card
      style={{
        rotateX,
        scale,
        y: translateY,
        opacity,
        perspective: "1800px",
        transformStyle: "preserve-3d",
        transformOrigin: "50% 68%",
      }}
      className="relative z-10 mx-auto flex h-[43rem] w-full max-w-[1240px] items-center justify-center px-4 md:h-[49rem] md:px-8"
    >
      <motion.div
        aria-hidden="true"
        style={{
          opacity: shadowOpacity,
        }}
        className="pointer-events-none absolute bottom-[12%] left-1/2 h-[5%] w-[36%] -translate-x-1/2 rounded-[50%]"
      >
        <div
          className="h-full w-full rounded-[50%]"
          style={{
            background: "rgba(0,0,0,0.68)",
            filter: "blur(42px)",
          }}
        />
      </motion.div>

      <div data-container-scroll-product className="relative h-full w-full">
        {children}
      </div>
    </motion.div>
  );
}
