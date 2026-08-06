import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

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

function utilityIndexFromProgress(progress: number) {
  if (progress >= 0.75) {
    return 3;
  }

  if (progress >= 0.5) {
    return 2;
  }

  if (progress >= 0.25) {
    return 1;
  }

  return 0;
}

export function UtilityScrollChapter() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setActiveIndex(utilityIndexFromProgress(latest));
  });

  /*
   * A restrained overall movement gives the entire chapter
   * one continuous direction instead of four separate scenes.
   */
  const compositionY = useTransform(scrollYProgress, [0, 1], [18, -18]);

  const progressScale = useTransform(scrollYProgress, [0, 1], [0.02, 1]);

  const activeUtility = utilities[activeIndex];

  return (
    <section
      ref={sectionRef}
      data-journey-utility-scroll
      className="relative h-[240vh] w-full bg-[#080807]"
    >
      <div className="sticky top-0 flex h-screen min-h-[700px] w-full items-center justify-center overflow-hidden bg-[#080807]">
        <motion.div
          style={{
            y: compositionY,
          }}
          className="relative flex h-full w-full items-center justify-center px-6"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[44vh] w-[72vw] max-w-[1040px] -translate-x-1/2 -translate-y-1/2 rounded-[50%]"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(245,166,35,0.045) 0%, rgba(245,166,35,0.012) 42%, transparent 74%)",
              filter: "blur(76px)",
            }}
          />

          <div className="relative z-10 mx-auto w-full max-w-[1320px] text-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                key={activeUtility.id}
                initial={{
                  opacity: 0,
                  y: 44,
                  filter: "blur(8px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  y: -34,
                  filter: "blur(7px)",
                }}
                transition={{
                  duration: 0.64,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="mb-8 flex items-center justify-center gap-3">
                  <span className="text-[10px] font-semibold tracking-[0.2em] text-white/34">
                    {activeUtility.number}
                  </span>

                  <span className="h-px w-9 bg-[#F5A623]/78" />

                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#F5A623]">
                    {activeUtility.eyebrow}
                  </span>
                </div>

                <h3 className="mx-auto max-w-[1180px] text-[clamp(50px,7.6vw,118px)] font-semibold leading-[0.9] tracking-[-0.065em] text-[#FDFAF3]">
                  {activeUtility.title}
                </h3>
              </motion.article>
            </AnimatePresence>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <div className="h-px w-32 overflow-hidden bg-white/[0.08] md:w-44">
              <motion.div
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
