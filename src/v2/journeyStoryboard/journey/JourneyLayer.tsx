type JourneyLayerProps = {
  progress: number;
};

const clamp = (value: number, minimum = 0, maximum = 1) =>
  Math.min(maximum, Math.max(minimum, value));

const smoothstep = (value: number) => {
  const safe = clamp(value);
  return safe * safe * (3 - 2 * safe);
};

const phase = (progress: number, start: number, end: number) =>
  smoothstep((progress - start) / (end - start));

export function JourneyLayer({ progress }: JourneyLayerProps) {
  const travel = phase(progress, 0.02, 0.82);
  const trailIn = phase(progress, 0.06, 0.68);
  const impact = phase(progress, 0.66, 0.9);
  const handoff = phase(progress, 0.93, 1);

  /*
   * Signal moves from the vanishing-point area toward the viewer.
   * The curve keeps it visually aligned with the road centre.
   */
  const signalTop = 61.5 + travel * 15.5;

  const signalLeft = 49.1 + Math.sin(travel * Math.PI) * 0.7;

  const signalScale = 0.55 + travel * 1.35;

  const trailHeight = 22 + trailIn * 255;

  const impactScale = 0.45 + impact * 1.65;

  const layerOpacity = 1 - handoff;

  return (
    <div
      data-journey-layer
      data-progress={progress.toFixed(3)}
      aria-hidden="true"
      style={{
        position: "absolute",
        zIndex: 26,
        inset: 0,
        overflow: "hidden",
        opacity: layerOpacity,
        pointerEvents: "none",
      }}
    >
      {/* Verified trail remaining behind the moving signal. */}
      <div
        data-journey-verified-trail
        style={{
          position: "absolute",
          zIndex: 1,
          left: "49.2%",
          top: "60.8%",
          width: `${14 + trailIn * 36}px`,
          height: `${trailHeight}px`,
          transform: `
            translateX(-50%)
            perspective(760px)
            rotateX(65deg)
          `,
          transformOrigin: "50% 0%",
          clipPath: "polygon(44% 0%, 56% 0%, 100% 100%, 0% 100%)",
          background: `
            linear-gradient(
              to bottom,
              rgba(245,166,35,0.44) 0%,
              rgba(245,166,35,0.16) 34%,
              rgba(245,166,35,0.052) 67%,
              transparent 100%
            )
          `,
          filter: "blur(7px)",
          opacity: trailIn * (1 - handoff * 0.8),
        }}
      />

      {/* Narrow, precise centre line within the wider trail. */}
      <div
        data-journey-route-line
        style={{
          position: "absolute",
          zIndex: 2,
          left: "49.2%",
          top: "61%",
          width: "2px",
          height: `${18 + trailIn * 235}px`,
          transform: `
            translateX(-50%)
            perspective(760px)
            rotateX(64deg)
          `,
          transformOrigin: "50% 0%",
          background: `
            linear-gradient(
              to bottom,
              rgba(255,220,154,0.88) 0%,
              rgba(245,166,35,0.54) 45%,
              rgba(245,166,35,0.04) 100%
            )
          `,
          boxShadow: "0 0 12px rgba(245,166,35,0.4)",
          opacity: trailIn * (1 - handoff),
        }}
      />

      {/* Moving signal halo. */}
      <div
        data-journey-signal-halo
        style={{
          position: "absolute",
          zIndex: 4,
          left: `${signalLeft}%`,
          top: `${signalTop}%`,
          width: "92px",
          height: "92px",
          borderRadius: "50%",
          transform: `
            translate(-50%, -50%)
            scale(${signalScale})
          `,
          background: `
            radial-gradient(
              circle,
              rgba(245,166,35,0.42) 0%,
              rgba(245,166,35,0.15) 29%,
              transparent 72%
            )
          `,
          filter: "blur(13px)",
          opacity: (0.54 + travel * 0.38) * (1 - handoff),
        }}
      />

      {/* Moving signal core. */}
      <div
        data-journey-signal-core
        style={{
          position: "absolute",
          zIndex: 5,
          left: `${signalLeft}%`,
          top: `${signalTop}%`,
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          transform: `
            translate(-50%, -50%)
            scale(${0.72 + travel * 0.65})
          `,
          background: "#F5A623",
          boxShadow: `
            0 0 6px rgba(255,227,174,1),
            0 0 22px rgba(245,166,35,0.94),
            0 0 68px rgba(245,166,35,0.52)
          `,
          opacity: 1 - handoff,
        }}
      />

      {/* Concentric lock rings develop near the destination. */}
      <div
        data-journey-lock-ring="inner"
        style={{
          position: "absolute",
          zIndex: 3,
          left: `${signalLeft}%`,
          top: `${signalTop}%`,
          width: "62px",
          height: "62px",
          borderRadius: "50%",
          border: "1px solid rgba(245,166,35,0.62)",
          transform: `
            translate(-50%, -50%)
            scale(${0.35 + impact * 1.1})
          `,
          opacity: impact * (1 - handoff),
        }}
      />

      <div
        data-journey-lock-ring="outer"
        style={{
          position: "absolute",
          zIndex: 3,
          left: `${signalLeft}%`,
          top: `${signalTop}%`,
          width: "104px",
          height: "104px",
          borderRadius: "50%",
          border: "1px solid rgba(245,166,35,0.3)",
          transform: `
            translate(-50%, -50%)
            scale(${impactScale})
          `,
          opacity: impact * (1 - impact) * 1.35,
        }}
      />

      {/* Final collision flash immediately before product reveal. */}
      <div
        data-journey-impact-flash
        style={{
          position: "absolute",
          zIndex: 6,
          left: `${signalLeft}%`,
          top: `${signalTop}%`,
          width: "190px",
          height: "190px",
          borderRadius: "50%",
          transform: `
            translate(-50%, -50%)
            scale(${0.28 + impact * 1.05})
          `,
          background: `
            radial-gradient(
              circle,
              rgba(255,224,166,0.34) 0%,
              rgba(245,166,35,0.16) 24%,
              rgba(245,166,35,0.035) 51%,
              transparent 75%
            )
          `,
          filter: "blur(10px)",
          opacity: impact * (1 - impact) * 1.55,
        }}
      />

      {/* Road receives the travelling light. */}
      <div
        data-journey-road-energy
        style={{
          position: "absolute",
          zIndex: 0,
          left: "50%",
          bottom: "-5%",
          width: `${180 + travel * 470}px`,
          height: `${90 + travel * 210}px`,
          borderRadius: "50%",
          transform: `
            translateX(-50%)
            perspective(900px)
            rotateX(70deg)
          `,
          background: `
            radial-gradient(
              ellipse at center,
              rgba(245,166,35,0.17) 0%,
              rgba(245,166,35,0.055) 39%,
              transparent 75%
            )
          `,
          filter: "blur(20px)",
          opacity: travel * (1 - handoff * 0.8),
        }}
      />
    </div>
  );
}
