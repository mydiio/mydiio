import { type CSSProperties, useEffect, useState } from "react";

type WeaveSpinnerProps = {
  size?: number;
};

export function WeaveSpinner({ size = 112 }: WeaveSpinnerProps) {
  return (
    <>
      <style>{`
        .mydiio-weave-spinner {
          position: relative;
          width: var(--mydiio-weave-size);
          height: var(--mydiio-weave-size);
          transform-style: preserve-3d;
          perspective: 1200px;
        }

        .mydiio-weave-node {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: #f5a623;
          box-shadow: 0 0 16px rgba(245, 166, 35, 0.68);
          transform: translate(-50%, -50%);
          animation: mydiio-node-pulse 1.8s cubic-bezier(0.22, 1, 0.36, 1) infinite;
        }

        .mydiio-weave-thread {
          position: absolute;
          background: linear-gradient(90deg, transparent, rgba(245, 166, 35, 0.82), transparent);
          box-shadow: 0 0 7px rgba(245, 166, 35, 0.24);
          transform-origin: center;
        }

        .mydiio-weave-thread--one,
        .mydiio-weave-thread--three {
          left: 0;
          width: 100%;
          height: 1px;
        }

        .mydiio-weave-thread--two,
        .mydiio-weave-thread--four {
          top: 0;
          width: 1px;
          height: 100%;
        }

        .mydiio-weave-thread--one {
          top: 30%;
          animation: mydiio-weave-one 2.4s ease-in-out infinite;
        }

        .mydiio-weave-thread--two {
          left: 70%;
          animation: mydiio-weave-two 2.6s ease-in-out infinite;
        }

        .mydiio-weave-thread--three {
          bottom: 30%;
          animation: mydiio-weave-three 2.8s ease-in-out infinite;
        }

        .mydiio-weave-thread--four {
          left: 30%;
          animation: mydiio-weave-four 3s ease-in-out infinite;
        }

        .mydiio-initial-loader {
          position: fixed;
          z-index: 2147483647;
          inset: 0;
          display: grid;
          place-items: center;
          background:
            radial-gradient(circle at 50% 48%, rgba(245, 166, 35, 0.1), transparent 28%),
            #1a1a18;
          color: #fdfaf3;
          opacity: 1;
          transition: opacity 360ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .mydiio-initial-loader[data-leaving="true"] {
          opacity: 0;
          pointer-events: none;
        }

        .mydiio-initial-loader__content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 22px;
        }

        .mydiio-initial-loader__label {
          color: rgba(253, 250, 243, 0.72);
          font-family: "Space Grotesk", system-ui, sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          line-height: 1;
          text-transform: uppercase;
          animation: mydiio-loading-label 1.8s ease-in-out infinite;
        }

        .mydiio-initial-loader__dot {
          color: #f5a623;
        }

        @keyframes mydiio-node-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.25); }
        }

        @keyframes mydiio-weave-one {
          0%, 100% { opacity: 0.5; transform: translateY(0) rotateX(0deg); }
          50% { opacity: 1; transform: translateY(24px) rotateX(54deg) rotateZ(12deg); }
        }

        @keyframes mydiio-weave-two {
          0%, 100% { opacity: 0.5; transform: translateX(0) rotateY(0deg); }
          50% { opacity: 1; transform: translateX(-24px) rotateY(54deg) rotateZ(-12deg); }
        }

        @keyframes mydiio-weave-three {
          0%, 100% { opacity: 0.5; transform: translateY(0) rotateX(0deg); }
          50% { opacity: 1; transform: translateY(-24px) rotateX(-54deg) rotateZ(10deg); }
        }

        @keyframes mydiio-weave-four {
          0%, 100% { opacity: 0.5; transform: translateX(0) rotateY(0deg); }
          50% { opacity: 1; transform: translateX(24px) rotateY(-54deg) rotateZ(-10deg); }
        }

        @keyframes mydiio-loading-label {
          0%, 100% { opacity: 0.48; }
          50% { opacity: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          .mydiio-weave-node,
          .mydiio-weave-thread,
          .mydiio-initial-loader__label {
            animation: none !important;
          }

          .mydiio-initial-loader {
            transition-duration: 1ms;
          }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="mydiio-weave-spinner"
        style={
          {
            "--mydiio-weave-size": `${size}px`,
          } as CSSProperties
        }
      >
        <div className="mydiio-weave-thread mydiio-weave-thread--one" />
        <div className="mydiio-weave-thread mydiio-weave-thread--two" />
        <div className="mydiio-weave-thread mydiio-weave-thread--three" />
        <div className="mydiio-weave-thread mydiio-weave-thread--four" />
        <div className="mydiio-weave-node" />
      </div>
    </>
  );
}

export function InitialLoadScreen() {
  const [leaving, setLeaving] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const showFor = reducedMotion.matches ? 160 : 2500;
    const leaveFor = reducedMotion.matches ? 0 : 360;

    const leaveTimer = window.setTimeout(() => setLeaving(true), showFor);
    const removeTimer = window.setTimeout(() => setVisible(false), showFor + leaveFor);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-label="Loading mydiio"
      aria-live="polite"
      className="mydiio-initial-loader"
      data-leaving={leaving}
      role="status"
    >
      <div className="mydiio-initial-loader__content">
        <WeaveSpinner />
        <div className="mydiio-initial-loader__label">
          Loading<span className="mydiio-initial-loader__dot">.</span>
        </div>
      </div>
    </div>
  );
}
