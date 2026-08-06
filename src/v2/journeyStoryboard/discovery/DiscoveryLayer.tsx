type DiscoveryLayerProps = {
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

export function DiscoveryLayer({ progress }: DiscoveryLayerProps) {
  const emergence = phase(progress, 0.02, 0.18);
  const acquisition = phase(progress, 0.12, 0.44);
  const roadWake = phase(progress, 0.42, 0.78);
  const release = phase(progress, 0.9, 1);

  const visible = 1 - release;

  const heartbeat = Math.sin(acquisition * Math.PI) * acquisition * (1 - roadWake);

  const signalScale = 0.45 + emergence * 0.55 + heartbeat * 0.28;

  const signalBlur = (1 - emergence) * 12;

  const ringOneScale = 0.18 + acquisition * 1.05;

  const ringTwoScale = 0.08 + acquisition * 1.5;

  const roadLength = 100 + roadWake * 430;

  const roadBrightness = roadWake * visible;

  /*
   * During the final Discovery beat, the signal moves
   * toward the viewer before handing over to Journey.
   */
  const signalTravel = phase(progress, 0.62, 0.92);

  const signalTop = 66.7 + signalTravel * 8.5;

  return (
    <div
      data-discovery-layer
      data-progress={progress.toFixed(3)}
      aria-hidden="true"
      style={{
        position: "absolute",
        zIndex: 24,
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        opacity: visible,
      }}
    >
      {/* Deepens the frame so the signal becomes the only focal point. */}
      <div
        data-discovery-darkness
        style={{
          position: "absolute",
          zIndex: 1,
          inset: 0,
          background: `
            radial-gradient(
              ellipse 34% 28% at 50% 67%,
              transparent 0%,
              rgba(8,8,7,0.16) 42%,
              rgba(8,8,7,0.56) 100%
            ),
            linear-gradient(
              to bottom,
              rgba(8,8,7,0.18) 0%,
              rgba(8,8,7,0.02) 48%,
              rgba(8,8,7,0.2) 100%
            )
          `,
          opacity: (0.82 - roadWake * 0.24) * visible,
        }}
      />

      {/* Road responds before the signal begins travelling. */}
      <div
        data-discovery-road-wake
        style={{
          position: "absolute",
          zIndex: 2,
          left: "50%",
          top: "70%",
          width: `${roadLength}px`,
          height: "118px",
          borderRadius: "50%",
          transform: `
            translate(-50%, -50%)
            perspective(900px)
            rotateX(72deg)
          `,
          transformOrigin: "50% 50%",
          background: `
            radial-gradient(
              ellipse at center,
              rgba(245,166,35,0.23) 0%,
              rgba(245,166,35,0.095) 26%,
              rgba(173,111,43,0.036) 52%,
              transparent 76%
            )
          `,
          filter: "blur(18px)",
          opacity: roadBrightness * 0.78,
        }}
      />

      {/* Narrow reflected lane reaching toward the viewer. */}
      <div
        data-discovery-road-lane
        style={{
          position: "absolute",
          zIndex: 3,
          left: "50%",
          top: "67%",
          width: `${42 + roadWake * 72}px`,
          height: `${100 + roadWake * 290}px`,
          transform: `
            translate(-50%, 0)
            perspective(700px)
            rotateX(66deg)
          `,
          transformOrigin: "50% 0%",
          background: `
            linear-gradient(
              to bottom,
              rgba(245,166,35,0.16) 0%,
              rgba(245,166,35,0.055) 38%,
              transparent 100%
            )
          `,
          clipPath: "polygon(43% 0%, 57% 0%, 100% 100%, 0% 100%)",
          filter: "blur(14px)",
          opacity: roadBrightness * 0.5,
        }}
      />

      {/* Outer acquisition ring. */}
      <div
        data-discovery-ring="outer"
        style={{
          position: "absolute",
          zIndex: 4,
          left: "50%",
          top: `${signalTop}%`,
          width: "168px",
          height: "168px",
          borderRadius: "50%",
          border: "1px solid rgba(245,166,35,0.52)",
          transform: `
            translate(-50%, -50%)
            scale(${ringTwoScale})
          `,
          opacity: acquisition * (1 - roadWake) * 0.72,
          boxShadow: "0 0 30px rgba(245,166,35,0.06)",
        }}
      />

      {/* Inner acquisition ring. */}
      <div
        data-discovery-ring="inner"
        style={{
          position: "absolute",
          zIndex: 5,
          left: "50%",
          top: "66.7%",
          width: "82px",
          height: "82px",
          borderRadius: "50%",
          border: "1px solid rgba(245,166,35,0.82)",
          transform: `
            translate(-50%, -50%)
            scale(${ringOneScale})
          `,
          opacity: acquisition * (1 - roadWake * 0.82),
          boxShadow: `
            0 0 12px rgba(245,166,35,0.12),
            inset 0 0 12px rgba(245,166,35,0.06)
          `,
        }}
      />

      {/* Soft signal halo. */}
      <div
        data-discovery-signal-halo
        style={{
          position: "absolute",
          zIndex: 6,
          left: "50%",
          top: `${signalTop}%`,
          width: "118px",
          height: "118px",
          borderRadius: "50%",
          transform: `
            translate(-50%, -50%)
            scale(${0.62 + acquisition * 0.42})
          `,
          background: `
            radial-gradient(
              circle,
              rgba(245,166,35,0.62) 0%,
              rgba(245,166,35,0.24) 30%,
              transparent 72%
            )
          `,
          filter: "blur(14px)",
          opacity: emergence * visible * 0.88,
        }}
      />

      {/* Precise signal core. */}
      <div
        data-discovery-signal-core
        style={{
          position: "absolute",
          zIndex: 7,
          left: "50%",
          top: `${signalTop}%`,
          width: "14px",
          height: "14px",
          borderRadius: "50%",
          transform: `
            translate(-50%, -50%)
            scale(${signalScale})
          `,
          background: "#F5A623",
          boxShadow: `
            0 0 5px rgba(255,223,162,0.98),
            0 0 24px rgba(245,166,35,0.95),
            0 0 72px rgba(245,166,35,0.58)
          `,
          filter: `blur(${signalBlur}px)`,
          opacity: emergence * visible,
        }}
      />

      {/* One restrained pulse after acquisition. */}
      <div
        data-discovery-heartbeat
        style={{
          position: "absolute",
          zIndex: 6,
          left: "50%",
          top: `${signalTop}%`,
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          border: "2px solid rgba(245,166,35,0.68)",
          transform: `
            translate(-50%, -50%)
            scale(${0.25 + heartbeat * 2.6})
          `,
          opacity: heartbeat * (1 - roadWake) * 0.82,
        }}
      />

      {/* Fine vertical beam implies signal acquisition. */}
      <div
        data-discovery-beam
        style={{
          position: "absolute",
          zIndex: 3,
          left: "50%",
          top: "45%",
          width: "1px",
          height: "22%",
          transform: "translateX(-50%)",
          background: `
            linear-gradient(
              to bottom,
              transparent 0%,
              rgba(245,166,35,0.06) 44%,
              rgba(245,166,35,0.2) 100%
            )
          `,
          filter: "blur(0.4px)",
          opacity: acquisition * (1 - roadWake) * 0.34,
        }}
      />
    </div>
  );
}
