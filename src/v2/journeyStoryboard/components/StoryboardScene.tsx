import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { InteractiveTabletStage } from "./InteractiveTabletStage";

const utilities = [
  {
    id: "passenger",
    number: "01",
    eyebrow: "Passenger utility",
    title: "Useful throughout the ride.",
  },
  {
    id: "location",
    number: "02",
    eyebrow: "Location aware",
    title: "Relevant to every location.",
  },
  {
    id: "proof",
    number: "03",
    eyebrow: "Verified delivery",
    title: "Every play becomes proof.",
  },
  {
    id: "network",
    number: "04",
    eyebrow: "Connected network",
    title: "One screen. A connected city.",
  },
] as const;

/*
 * Deliberately overlapping windows.
 *
 * The outgoing statement remains partially visible while
 * the next statement begins entering. This prevents the
 * black empty frames produced by discrete state changes.
 */
const utilityWindows = [
  {
    enter: 0.59,
    settle: 0.655,
    hold: 0.715,
    exit: 0.775,
  },
  {
    enter: 0.72,
    settle: 0.775,
    hold: 0.825,
    exit: 0.875,
  },
  {
    enter: 0.82,
    settle: 0.875,
    hold: 0.92,
    exit: 0.96,
  },
  {
    enter: 0.91,
    settle: 0.955,
    hold: 1,
    exit: 1,
  },
] as const;

export function StoryboardScene() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /*
   * Smooth enough to feel physical, but still closely
   * connected to the user's scroll gesture.
   */
  const progress = useSpring(scrollYProgress, {
    stiffness: 82,
    damping: 30,
    mass: 0.82,
    restDelta: 0.0005,
  });

  /*
   * The tablet demonstration occupies the first chapter.
   */
  const tabletProgress = useTransform(progress, [0.015, 0.57], [0, 1], {
    clamp: true,
  });

  /*
   * The complete tablet composition leaves together:
   * hardware, screen, tabs and supporting copy.
   */
  const tabletOpacity = useTransform(progress, [0, 0.035, 0.555, 0.65], [0, 1, 1, 0]);

  const tabletY = useTransform(progress, [0, 0.115, 0.555, 0.65], [150, 0, 0, -42]);

  const tabletScale = useTransform(progress, [0, 0.15, 0.555, 0.65], [0.95, 1, 1, 0.972]);

  const tabletBlur = useTransform(progress, [0.57, 0.65], [0, 4]);

  const tabletFilter = useTransform(tabletBlur, (value) => `blur(${value}px)`);

  /*
   * Utilities begin before the tablet has completely
   * disappeared, creating one continuous handoff.
   */
  const utilityChapterOpacity = useTransform(progress, [0.565, 0.625, 1], [0, 1, 1]);

  const utilityChapterY = useTransform(progress, [0.565, 0.64, 1], [22, 0, -8]);

  const chapterLabelOpacity = useTransform(progress, [0.58, 0.64, 0.96, 1], [0, 0.42, 0.42, 0]);

  const backgroundGlow = useTransform(
    progress,
    [0.02, 0.2, 0.52, 0.7, 1],
    [0, 0.3, 0.24, 0.17, 0.1],
  );

  const progressScale = useTransform(progress, [0.59, 0.985], [0, 1], {
    clamp: true,
  });

  return (
    <section
      ref={sectionRef}
      data-v2-act="journey-storyboard"
      data-atlas-dark
      data-atlas-tone="dark"
      className="relative z-10 h-[350vh] w-full bg-[#080807]"
    >
      <div className="sticky top-0 h-screen min-h-[700px] w-full overflow-hidden bg-[#080807]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/[0.035]"
        />

        <motion.div
          aria-hidden="true"
          style={{
            opacity: backgroundGlow,
          }}
          className="pointer-events-none absolute left-1/2 top-[49%] h-[58vh] w-[76vw] max-w-[1120px] -translate-x-1/2 -translate-y-1/2 rounded-[50%]"
        >
          <div
            className="h-full w-full rounded-[50%]"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(245,166,35,0.065) 0%, rgba(245,166,35,0.014) 42%, transparent 74%)",
              filter: "blur(78px)",
            }}
          />
        </motion.div>

        <motion.div
          data-unified-tablet-chapter
          style={{
            opacity: tabletOpacity,
            y: tabletY,
            scale: tabletScale,
            filter: tabletFilter,
            transformOrigin: "50% 52%",
          }}
          className="absolute inset-0 z-20"
        >
          <InteractiveTabletStage progress={tabletProgress} />
        </motion.div>

        <motion.div
          data-unified-utility-chapter
          style={{
            opacity: utilityChapterOpacity,
            y: utilityChapterY,
          }}
          className="absolute inset-0 z-30 flex items-center justify-center px-6"
        >
          <div className="relative mx-auto h-full w-full max-w-[1440px]">
            <motion.p
              aria-hidden="true"
              style={{
                opacity: chapterLabelOpacity,
              }}
              className="absolute left-1/2 top-[18%] -translate-x-1/2 text-[9px] font-semibold uppercase tracking-[0.28em] text-white/70"
            >
              Screen utilities
            </motion.p>

            {utilities.map((utility, index) => (
              <UtilityTitle
                key={utility.id}
                progress={progress}
                number={utility.number}
                eyebrow={utility.eyebrow}
                title={utility.title}
                enter={utilityWindows[index].enter}
                settle={utilityWindows[index].settle}
                hold={utilityWindows[index].hold}
                exit={utilityWindows[index].exit}
                final={index === utilities.length - 1}
              />
            ))}

            <div className="absolute bottom-11 left-1/2 h-px w-40 -translate-x-1/2 overflow-hidden bg-white/[0.07] md:w-52">
              <motion.div
                aria-hidden="true"
                style={{
                  scaleX: progressScale,
                  transformOrigin: "left center",
                }}
                className="h-full w-full bg-[#F5A623]"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

type UtilityTitleProps = {
  progress: MotionValue<number>;
  number: string;
  eyebrow: string;
  title: string;
  enter: number;
  settle: number;
  hold: number;
  exit: number;
  final: boolean;
};

function UtilityTitle({
  progress,
  number,
  eyebrow,
  title,
  enter,
  settle,
  hold,
  exit,
  final,
}: UtilityTitleProps) {
  const opacity = useTransform(
    progress,
    [enter, settle, hold, exit],
    final ? [0, 1, 1, 1] : [0, 1, 1, 0],
  );

  const y = useTransform(
    progress,
    [enter, settle, hold, exit],
    final ? [42, 0, 0, 0] : [42, 0, 0, -34],
  );

  const scale = useTransform(
    progress,
    [enter, settle, hold, exit],
    final ? [0.992, 1, 1, 1] : [0.992, 1, 1, 0.996],
  );

  const blur = useTransform(
    progress,
    [enter, settle, hold, exit],
    final ? [5, 0, 0, 0] : [5, 0, 0, 4],
  );

  const filter = useTransform(blur, (value) => `blur(${value}px)`);

  return (
    <motion.article
      style={{
        opacity,
        y,
        scale,
        filter,
      }}
      className="absolute inset-0 flex items-center justify-center text-center"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5">
        <div className="mb-7 flex items-center justify-center gap-3">
          <span className="text-[10px] font-semibold tracking-[0.2em] text-white/34">{number}</span>

          <span className="h-px w-8 bg-[#F5A623]/78" />

          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#F5A623]">
            {eyebrow}
          </span>
        </div>

        <h3 className="mx-auto max-w-[1100px] text-[clamp(46px,6.6vw,102px)] font-semibold leading-[0.92] tracking-[-0.058em] text-[#FDFAF3]">
          {title}
        </h3>
      </div>
    </motion.article>
  );
}
