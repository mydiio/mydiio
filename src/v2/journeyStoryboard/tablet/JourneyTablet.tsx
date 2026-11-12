import type { ReactNode } from "react";
import { journeyAssets } from "@/assets/journey";
import { journeyScreenAssets } from "@/assets/journey-screen-ui";
import { motion, useTransform, useMotionValue, type MotionValue } from "framer-motion";

type JourneyTabletProps = {
  progress?: MotionValue<number>;
  screenContent?: ReactNode;
};

export function JourneyTablet({ progress: suppliedProgress, screenContent }: JourneyTabletProps) {
  const fallbackProgress = useMotionValue(1);
  const progress = suppliedProgress ?? fallbackProgress;
  /*
   * Hardware settles before software begins changing.
   *
   * Live journey:  0.30 → 0.58
   * GPS proof:     0.54 → 0.78
   * Monday report: 0.74 → 1.00
   */
  const screenPower = useTransform(progress, [0.12, 0.26, 0.38], [0, 0.58, 1]);

  const liveOpacity = useTransform(progress, [0.2, 0.3, 0.54, 0.6], [0, 1, 1, 0]);

  const liveScale = useTransform(progress, [0.2, 0.32, 0.58], [1.012, 1, 0.994]);

  const verifiedOpacity = useTransform(progress, [0.54, 0.61, 0.73, 0.8], [0, 1, 1, 0]);

  const verifiedScale = useTransform(progress, [0.54, 0.63, 0.78], [1.008, 1, 0.996]);

  const reportOpacity = useTransform(progress, [0.74, 0.82, 1], [0, 1, 1]);

  const reportScale = useTransform(progress, [0.74, 0.84, 1], [1.008, 1, 1]);

  const glassSweepX = useTransform(progress, [0.16, 0.44, 0.7], ["-135%", "8%", "145%"]);

  const glassSweepOpacity = useTransform(progress, [0.14, 0.24, 0.48, 0.7], [0, 0.16, 0.1, 0]);

  const hardwareLight = useTransform(progress, [0.08, 0.26, 0.48, 1], [0.72, 1.04, 1, 1]);

  const rearGlow = useTransform(progress, [0.08, 0.3, 0.62, 1], [0, 0.42, 0.52, 0.42]);

  return (
    <div
      className="journey-storyboard-tablet"
      data-journey-tablet
      style={{
        position: "absolute",
        zIndex: 20,
        left: "50%",
        top: "54%",
        width: "min(1080px, 70vw)",
        aspectRatio: "16 / 9",
        transform: "translate(-50%, -50%) perspective(1700px)",
        transformOrigin: "50% 50%",
        pointerEvents: "none",
      }}
    >
      <motion.div
        aria-hidden="true"
        style={{
          opacity: rearGlow,
        }}
        className="absolute -bottom-[8%] -left-[1%] -right-[1%] top-[4%] z-0"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(ellipse at 50% 54%, rgba(245,166,35,0.12) 0%, rgba(245,166,35,0.04) 38%, transparent 72%)",
            filter: "blur(48px)",
          }}
        />
      </motion.div>

      <div
        data-journey-screen-stage
        style={{
          position: "absolute",
          zIndex: 2,
          left: "16.40625%",
          top: "16.38889%",
          width: "67.1875%",
          height: "67.22222%",
          overflow: "hidden",
          borderRadius: "clamp(10px, 0.95vw, 16px)",
          background: "#090a0a",
          boxShadow: `
            inset 0 0 0 1px rgba(253,250,243,0.055),
            inset 0 -18px 40px rgba(0,0,0,0.18)
          `,
        }}
      >
        <motion.div
          aria-hidden="true"
          style={{
            opacity: screenPower,
          }}
          className="absolute inset-0 z-0 bg-[#0b0c0c]"
        />

        {screenContent && <div style={{ position: "absolute", inset: 0, zIndex: 4 }}>{screenContent}</div>}

        {!screenContent && <>

        <motion.img
          data-screen-state="live-journey"
          data-atlas-perf-v2-stage-image
          loading="lazy"
          decoding="async"
          src={journeyScreenAssets.liveJourney}
          srcSet={journeyScreenAssets.liveJourneySrcSet}
          sizes="(max-width: 760px) 62.5vw, (max-width: 1100px) 55vw, (max-width: 1490px) 46vw, 679px"
          alt=""
          aria-hidden="true"
          draggable={false}
          style={{
            position: "absolute",
            zIndex: 1,
            inset: 0,
            width: "100%",
            height: "100%",
            maxWidth: "none",
            objectFit: "fill",
            opacity: liveOpacity,
            scale: liveScale,
            transformOrigin: "50% 50%",
          }}
        />

        <motion.img
          data-screen-state="gps-verified"
          data-atlas-perf-v2-stage-image
          loading="lazy"
          decoding="async"
          src={journeyScreenAssets.gpsVerified}
          srcSet={journeyScreenAssets.gpsVerifiedSrcSet}
          sizes="(max-width: 760px) 62.5vw, (max-width: 1100px) 55vw, (max-width: 1490px) 46vw, 679px"
          alt=""
          aria-hidden="true"
          draggable={false}
          style={{
            position: "absolute",
            zIndex: 2,
            inset: 0,
            width: "100%",
            height: "100%",
            maxWidth: "none",
            objectFit: "fill",
            opacity: verifiedOpacity,
            scale: verifiedScale,
            transformOrigin: "50% 50%",
          }}
        />

        <motion.img
          data-screen-state="monday-report"
          data-atlas-perf-v2-stage-image
          loading="lazy"
          decoding="async"
          src={journeyScreenAssets.mondayReport}
          srcSet={journeyScreenAssets.mondayReportSrcSet}
          sizes="(max-width: 760px) 62.5vw, (max-width: 1100px) 55vw, (max-width: 1490px) 46vw, 679px"
          alt=""
          aria-hidden="true"
          draggable={false}
          style={{
            position: "absolute",
            zIndex: 3,
            inset: 0,
            width: "100%",
            height: "100%",
            maxWidth: "none",
            objectFit: "fill",
            opacity: reportOpacity,
            scale: reportScale,
            transformOrigin: "50% 50%",
          }}
        />

        </>}

        {/* Permanent restrained glass coating */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-10"
          style={{
            background: `
              linear-gradient(
                126deg,
                rgba(253,250,243,0.038) 0%,
                rgba(253,250,243,0.009) 27%,
                transparent 45%
              )
            `,
            mixBlendMode: "screen",
            opacity: 0.28,
          }}
        />

        {/* Single scroll-controlled glass highlight */}
        <motion.div
          aria-hidden="true"
          style={{
            x: glassSweepX,
            opacity: glassSweepOpacity,
          }}
          className="absolute -bottom-[15%] -top-[15%] z-20 w-[28%] rotate-[9deg]"
        >
          <div
            className="h-full w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(253,250,243,0.16), transparent)",
              filter: "blur(12px)",
            }}
          />
        </motion.div>
      </div>

      <motion.img
        data-tablet-hardware
        data-atlas-perf-v3-responsive-images
        src={journeyAssets.tablet.hardware}
        srcSet={journeyAssets.tablet.hardwareSrcSet}
        sizes="(max-width: 760px) 93vw, (max-width: 1100px) 82vw, (max-width: 1490px) 68vw, 1010px"
        alt=""
        aria-hidden="true"
        draggable={false}
        style={{
          position: "absolute",
          zIndex: 5,
          inset: 0,
          display: "block",
          width: "100%",
          height: "100%",
          maxWidth: "none",
          objectFit: "fill",
          filter: useTransform(hardwareLight, (value) => `brightness(${value}) contrast(1.02)`),
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
    </div>
  );
}
