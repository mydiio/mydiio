import type { CSSProperties } from "react";
import { journeyCompositionAssets as A } from "@/assets/journey-composition";

type LayerProps = {
  name: string;
  src: string;
  zIndex: number;
  opacity?: number;
  blendMode?: CSSProperties["mixBlendMode"];
  filter?: string;
  mask?: string;
  transform?: string;
  transformOrigin?: string;
};

function Layer({
  name,
  src,
  zIndex,
  opacity = 1,
  blendMode = "normal",
  filter,
  mask,
  transform,
  transformOrigin = "50% 50%",
}: LayerProps) {
  return (
    <img
      data-environment-layer={name}
      src={src}
      alt=""
      aria-hidden="true"
      draggable={false}
      style={{
        position: "absolute",
        zIndex,
        inset: 0,
        display: "block",
        width: "100%",
        height: "100%",
        maxWidth: "none",
        objectFit: "cover",
        objectPosition: "50% 50%",
        opacity,
        mixBlendMode: blendMode,
        filter,
        maskImage: mask,
        WebkitMaskImage: mask,
        transform,
        transformOrigin,
        pointerEvents: "none",
        userSelect: "none",
      }}
    />
  );
}

export function CompositionEnvironment() {
  return (
    <div
      data-journey-environment="minimal-stage"
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        isolation: "isolate",
        background: "#080807",
        pointerEvents: "none",
      }}
    >
      {/* 01 — Dark master world */}
      <Layer
        name="sky"
        src={A.skyMaster}
        zIndex={0}
        filter="brightness(0.65) saturate(0.68) contrast(1.04)"
      />

      {/* 02 — Localised destination light, not a horizon strip */}
      <Layer
        name="horizon-glow-source"
        src={A.horizonGlow}
        zIndex={1}
        opacity={0.2}
        blendMode="screen"
        filter="blur(5px) saturate(0.58)"
        mask="radial-gradient(ellipse 31% 18% at 49% 51%, black 0%, rgba(0,0,0,0.74) 36%, rgba(0,0,0,0.16) 68%, transparent 100%)"
        transform="translateX(-1.2%)"
      />

      {/* CSS focal glow concentrates light where the road disappears */}
      <div
        style={{
          position: "absolute",
          zIndex: 2,
          left: "48.7%",
          top: "50%",
          width: "44vw",
          height: "27vh",
          transform: "translate(-50%, -50%)",
          background: `
            radial-gradient(
              ellipse at center,
              rgba(245,166,35,0.07) 0%,
              rgba(218,145,58,0.032) 29%,
              rgba(184,119,42,0.011) 54%,
              transparent 76%
            )
          `,
          filter: "blur(31px)",
        }}
      />

      {/* 03 — Skyline is sensed rather than displayed */}
      <Layer
        name="skyline"
        src={A.skyline}
        zIndex={3}
        opacity={0.062}
        filter="brightness(0.48) saturate(0.2) contrast(0.82) blur(2.1px)"
        mask="radial-gradient(ellipse 39% 11% at 49% 48%, black 0%, rgba(0,0,0,0.7) 44%, rgba(0,0,0,0.18) 73%, transparent 100%)"
        transform="translateX(-1.2%)"
      />

      {/* 04 — Road remains the only strong environmental line */}
      <Layer
        name="road"
        src={A.road}
        zIndex={4}
        opacity={0.8}
        filter="brightness(0.58) saturate(0.66) contrast(1.025)"
        mask="linear-gradient(to bottom, transparent 10%, rgba(0,0,0,0.18) 18%, rgba(0,0,0,0.62) 30%, black 43%, black 100%)"
        transform="translateX(-1.15%) scaleX(1.035) scaleY(1.012)"
        transformOrigin="49% 100%"
      />

      {/* 05 — Left architectural framing, intentionally a little stronger */}
      <Layer
        name="left-architecture"
        src={A.leftArchitecture}
        zIndex={5}
        opacity={0.18}
        filter="brightness(0.43) saturate(0.48) contrast(0.88) blur(1.25px)"
        mask="linear-gradient(90deg, black 0%, rgba(0,0,0,0.88) 13%, rgba(0,0,0,0.5) 26%, rgba(0,0,0,0.2) 39%, rgba(0,0,0,0.05) 50%, transparent 58%)"
        transform="translateX(-0.5%)"
        transformOrigin="left center"
      />

      {/* 06 — Right framing is quieter to break perfect symmetry */}
      <Layer
        name="right-architecture"
        src={A.rightArchitecture}
        zIndex={6}
        opacity={0.15}
        filter="brightness(0.41) saturate(0.45) contrast(0.87) blur(1.35px)"
        mask="linear-gradient(270deg, black 0%, rgba(0,0,0,0.86) 12%, rgba(0,0,0,0.46) 24%, rgba(0,0,0,0.17) 37%, rgba(0,0,0,0.045) 48%, transparent 56%)"
        transform="translateX(0.65%)"
        transformOrigin="right center"
      />

      {/* Atmospheric bridge between road, skyline and future product */}
      <div
        style={{
          position: "absolute",
          zIndex: 7,
          left: "48.8%",
          top: "56%",
          width: "66vw",
          height: "55vh",
          transform: "translate(-50%, -50%)",
          background: `
            radial-gradient(
              ellipse 34% 72% at 49% 44%,
              rgba(196,132,62,0.042) 0%,
              rgba(165,107,45,0.018) 34%,
              rgba(132,83,32,0.006) 58%,
              transparent 79%
            )
          `,
          filter: "blur(30px)",
        }}
      />

      {/* Calm space reserved for the tablet */}
      <div
        style={{
          position: "absolute",
          zIndex: 8,
          left: "49%",
          top: "53.5%",
          width: "min(780px, 52vw)",
          height: "min(510px, 54vh)",
          transform: "translate(-50%, -50%)",
          background: `
            radial-gradient(
              ellipse at center,
              rgba(7,7,6,0.055) 0%,
              rgba(7,7,6,0.018) 50%,
              transparent 76%
            )
          `,
        }}
      />

      {/* Vanishing-point destination light */}
      <div
        data-environment-lighting="destination"
        style={{
          position: "absolute",
          zIndex: 8.5,
          left: "48.8%",
          top: "54.8%",
          width: "34vw",
          height: "21vh",
          transform: "translate(-50%, -50%)",
          background: `
            radial-gradient(
              ellipse at center,
              rgba(245,166,35,0.085) 0%,
              rgba(222,148,60,0.034) 27%,
              rgba(173,107,38,0.009) 51%,
              transparent 75%
            )
          `,
          filter: "blur(29px)",
          pointerEvents: "none",
        }}
      />

      {/* Final stage lighting: foreground, product plane and destination */}
      <div
        data-environment-lighting="depth-planes"
        style={{
          position: "absolute",
          zIndex: 9,
          inset: 0,
          pointerEvents: "none",
          background: `
            radial-gradient(
              ellipse 38% 22% at 49% 55%,
              rgba(253,248,237,0.035) 0%,
              rgba(218,174,112,0.018) 31%,
              transparent 72%
            ),
            radial-gradient(
              ellipse 17% 12% at 49% 52%,
              rgba(245,166,35,0.045) 0%,
              rgba(211,137,52,0.017) 45%,
              transparent 78%
            ),
            linear-gradient(
              to bottom,
              transparent 0%,
              transparent 58%,
              rgba(0,0,0,0.08) 76%,
              rgba(0,0,0,0.29) 100%
            )
          `,
        }}
      />

      {/* Restrained foreground asphalt reflection */}
      <div
        data-environment-lighting="foreground-reflection"
        style={{
          position: "absolute",
          zIndex: 9.5,
          left: "49%",
          bottom: "-13%",
          width: "68vw",
          height: "38vh",
          transform: "translateX(-50%)",
          background: `
            radial-gradient(
              ellipse at 50% 100%,
              rgba(198,178,149,0.028) 0%,
              rgba(181,155,117,0.014) 35%,
              rgba(151,113,67,0.005) 58%,
              transparent 78%
            )
          `,
          filter: "blur(26px)",
          pointerEvents: "none",
        }}
      />

      {/* Subtle reflected light lane carries the eye into the distance */}
      <div
        data-environment-lighting="road-lane"
        style={{
          position: "absolute",
          zIndex: 10,
          left: "48.8%",
          bottom: "-6%",
          width: "20%",
          height: "67%",
          transform: "translateX(-50%) perspective(900px) rotateX(7deg)",
          transformOrigin: "50% 100%",
          background: `
            linear-gradient(
              to top,
              rgba(215,205,188,0.034) 0%,
              rgba(203,190,169,0.022) 31%,
              rgba(184,164,137,0.011) 59%,
              transparent 89%
            )
          `,
          clipPath: "polygon(34% 100%, 66% 100%, 53% 0%, 47% 0%)",
          filter: "blur(17px)",
          pointerEvents: "none",
        }}
      />

      {/* Atmospheric separation around the side architecture */}
      <div
        data-environment-lighting="architectural-air"
        style={{
          position: "absolute",
          zIndex: 11,
          inset: 0,
          pointerEvents: "none",
          background: `
            linear-gradient(
              90deg,
              rgba(191,130,62,0.012) 0%,
              rgba(164,106,47,0.018) 13%,
              transparent 29%,
              transparent 71%,
              rgba(164,106,47,0.015) 87%,
              rgba(191,130,62,0.01) 100%
            )
          `,
          filter: "blur(12px)",
        }}
      />

      {/* Final cinematic restraint */}
      <div
        style={{
          position: "absolute",
          zIndex: 12,
          inset: 0,
          background: `
            linear-gradient(
              to bottom,
              rgba(0,0,0,0.44) 0%,
              rgba(0,0,0,0.1) 23%,
              transparent 45%,
              rgba(0,0,0,0.045) 71%,
              rgba(0,0,0,0.23) 100%
            ),
            linear-gradient(
              90deg,
              rgba(0,0,0,0.22) 0%,
              transparent 15%,
              transparent 84%,
              rgba(0,0,0,0.26) 100%
            )
          `,
          boxShadow: `
            inset 0 0 98px 18px rgba(0,0,0,0.33),
            inset 0 -42px 70px rgba(0,0,0,0.1)
          `,
        }}
      />
    </div>
  );
}
