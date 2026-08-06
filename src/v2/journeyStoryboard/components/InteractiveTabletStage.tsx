import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useState } from "react";
import { JourneyTablet } from "../tablet/JourneyTablet";

type InteractiveTabletStageProps = {
  progress: MotionValue<number>;
};

const stages = [
  {
    id: "live-journey",
    label: "Live journey",
    eyebrow: "01 · Playback",
    title: "See the journey as it happens.",
    description:
      "The active vehicle, route and passenger content are visible in one clear operational view.",
  },
  {
    id: "gps-verified",
    label: "GPS verified",
    eyebrow: "02 · Verification",
    title: "Every play becomes proof.",
    description:
      "Location, time and vehicle data verify where the campaign was actually delivered.",
  },
  {
    id: "monday-report",
    label: "Monday report",
    eyebrow: "03 · Reporting",
    title: "The result arrives ready to use.",
    description:
      "Verified campaign activity is organised into a clear weekly report for the advertiser.",
  },
] as const;

type StageId = (typeof stages)[number]["id"];

function stageFromProgress(progress: number): StageId {
  if (progress >= 0.7) {
    return "monday-report";
  }

  if (progress >= 0.4) {
    return "gps-verified";
  }

  return "live-journey";
}

export function InteractiveTabletStage({ progress }: InteractiveTabletStageProps) {
  const [scrollStage, setScrollStage] = useState<StageId>("live-journey");

  const [manualStage, setManualStage] = useState<StageId | null>(null);

  useMotionValueEvent(progress, "change", (latest) => {
    setScrollStage(stageFromProgress(latest));
  });

  const explorerOpacity = useTransform(progress, [0.12, 0.24, 1], [0, 1, 1]);

  const explorerY = useTransform(progress, [0.12, 0.26, 1], [12, 0, 0]);

  const activeStage = manualStage ?? scrollStage;

  const activeStageData = stages.find((stage) => stage.id === activeStage) ?? stages[0];

  return (
    <div
      data-interactive-tablet-stage
      data-active-screen={activeStage}
      className="absolute inset-0"
    >
      <style>{`
        [data-interactive-tablet-stage]
          .journey-storyboard-tablet {
          left: 50% !important;
          top: 41.8% !important;
          width: min(1010px, 68vw) !important;
        }

        [data-active-screen]
          [data-screen-state] {
          opacity: 0 !important;
          transform: scale(0.998) !important;
          transition:
            opacity 420ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 620ms cubic-bezier(0.22, 1, 0.36, 1) !important;
        }

        [data-active-screen="live-journey"]
          [data-screen-state="live-journey"],
        [data-active-screen="gps-verified"]
          [data-screen-state="gps-verified"],
        [data-active-screen="monday-report"]
          [data-screen-state="monday-report"] {
          opacity: 1 !important;
          transform: scale(1) !important;
        }

        @media (max-width: 1100px) {
          [data-interactive-tablet-stage]
            .journey-storyboard-tablet {
            top: 45% !important;
            width: min(870px, 82vw) !important;
          }
        }

        @media (max-width: 760px) {
          [data-interactive-tablet-stage]
            .journey-storyboard-tablet {
            top: 41.5% !important;
            width: 93vw !important;
          }
        }
      `}</style>

      <JourneyTablet progress={progress} />

      <motion.div
        data-tablet-explorer
        style={{
          opacity: explorerOpacity,
          y: explorerY,
        }}
        className="absolute bottom-[5.5%] left-1/2 z-30 w-[min(760px,92vw)] -translate-x-1/2"
      >
        <div className="flex flex-col items-center">
          <div
            role="tablist"
            aria-label="Explore the mydiio tablet"
            className="flex items-center gap-1 rounded-full border border-white/[0.1] bg-black/50 p-1.5 shadow-[0_18px_55px_rgba(0,0,0,0.34)] backdrop-blur-xl"
          >
            {stages.map((stage) => {
              const active = stage.id === activeStage;

              return (
                <button
                  key={stage.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setManualStage(stage.id)}
                  className="relative rounded-full px-4 py-2.5 text-[11px] font-medium tracking-[0.035em] text-white/55 transition-colors duration-300 hover:text-white/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623]/55 md:px-5 md:text-xs"
                >
                  {active ? (
                    <motion.span
                      layoutId="tablet-stage-selection"
                      className="absolute inset-0 rounded-full border border-white/[0.09] bg-white/[0.08]"
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 28,
                      }}
                    />
                  ) : null}

                  <span className={`relative z-10 ${active ? "text-[#FDFAF3]" : ""}`}>
                    {stage.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-3.5 min-h-[64px] w-full text-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeStageData.id}
                initial={{
                  opacity: 0,
                  y: 7,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -4,
                }}
                transition={{
                  duration: 0.38,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#F5A623]/82">
                  {activeStageData.eyebrow}
                </p>

                <p className="mt-1.5 text-sm font-medium tracking-[-0.015em] text-[#FDFAF3] md:text-base">
                  {activeStageData.title}
                </p>

                <p className="mx-auto mt-1 max-w-[620px] text-xs leading-relaxed text-white/56 md:text-[13px]">
                  {activeStageData.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={() => setManualStage(null)}
            tabIndex={manualStage === null ? -1 : 0}
            className={`mt-1 text-[10px] tracking-[0.04em] transition-opacity duration-300 ${
              manualStage ? "text-white/38 hover:text-white/62" : "pointer-events-none text-white/0"
            }`}
          >
            Resume scroll sequence
          </button>
        </div>
      </motion.div>
    </div>
  );
}
