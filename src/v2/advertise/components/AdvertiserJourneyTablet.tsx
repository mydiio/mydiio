import { useEffect } from "react";
import { animate, useMotionValue, useReducedMotion } from "framer-motion";
import { JourneyTablet } from "@/v2/journeyStoryboard/tablet/JourneyTablet";

export function AdvertiserJourneyTablet() {
  const progress = useMotionValue(0.45);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      progress.set(0.9);
      return;
    }

    // Dwell on each clean state (live 0.45, gps 0.67, report 0.9),
    // dissolve between, loop back. Never below 0.45 so the screen
    // is always powered on (no black frame).
    const controls = animate(
      progress,
      [0.45, 0.45, 0.67, 0.67, 0.9, 0.9, 0.45],
      {
        duration: 13,
        times: [0, 0.14, 0.31, 0.45, 0.62, 0.8, 1],
        ease: "easeInOut",
        repeat: Infinity,
      }
    );

    return () => controls.stop();
  }, [progress, reduceMotion]);

  return (
    <div className="advertiser-journey-tablet" aria-label="mydiio in-vehicle screen">
      <style>{`
        .advertiser-journey-tablet {
          position: relative;
          width: 100%;
          max-width: 860px;
          margin-inline: auto;
          aspect-ratio: 16 / 9;
        }

        .advertiser-journey-tablet .journey-storyboard-tablet[data-journey-tablet] {
          width: 100% !important;
          height: 100% !important;
          left: 50% !important;
          top: 50% !important;
          max-width: 100% !important;
        }

        /* Expand the screen layer so it tucks under the bezel frame,
           removing the cream page showing through at the corners. */
        .advertiser-journey-tablet [data-journey-screen-stage] {
          left: 15.4% !important;
          top: 15.4% !important;
          width: 69.2% !important;
          height: 69.2% !important;
        }
      `}</style>

      <JourneyTablet progress={progress} />
    </div>
  );
}
