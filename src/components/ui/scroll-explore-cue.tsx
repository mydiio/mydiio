import { useEffect, useState } from "react";

type Tone = "light" | "dark";

function toneAtCue(): Tone {
  const mobile = window.matchMedia("(max-width: 760px)").matches;
  const x = window.innerWidth - (mobile ? 30 : Math.min(44, window.innerWidth * 0.08));
  const y = mobile ? window.innerHeight - 34 : window.innerHeight / 2;

  for (const element of document.elementsFromPoint(x, y)) {
    if (!(element instanceof HTMLElement)) continue;
    if (element.closest(".mydiio-scroll-cue")) continue;

    const section = element.closest<HTMLElement>("[data-atlas-tone], [data-v2-act]");

    if (!section) continue;

    const markedTone = section.dataset.atlasTone;
    if (markedTone === "light" || markedTone === "dark") return markedTone;

    const act = section.dataset.v2Act;
    if (["act-one", "journey-storyboard", "platform", "pioneer"].includes(act ?? "")) {
      return "dark";
    }

    return "light";
  }

  return "light";
}

export function ScrollExploreCue() {
  const [visible, setVisible] = useState(true);
  const [tone, setTone] = useState<Tone>("light");

  useEffect(() => {
    let idleTimer: number | undefined;

    const refreshTone = () => {
      setTone(toneAtCue());
    };

    const handleScroll = () => {
      const remaining =
        document.documentElement.scrollHeight - (window.scrollY + window.innerHeight);

      refreshTone();
      setVisible(false);
      window.clearTimeout(idleTimer);

      if (remaining < 160) return;

      idleTimer = window.setTimeout(() => {
        refreshTone();
        setVisible(true);
      }, 950);
    };

    refreshTone();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", refreshTone);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", refreshTone);
      window.clearTimeout(idleTimer);
    };
  }, []);

  return (
    <>
      <style>{`
        .mydiio-scroll-cue {
          position: fixed;
          z-index: 60;
          top: 50%;
          right: clamp(20px, 3vw, 56px);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 18px;
          opacity: 1;
          pointer-events: none;
          transform: translateY(-50%);
          transition:
            opacity 280ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 280ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .mydiio-scroll-cue[data-visible="false"] {
          opacity: 0;
          transform: translateY(calc(-50% + 10px));
        }

        .mydiio-scroll-cue__label {
          font-family: "Space Grotesk", system-ui, sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          line-height: 1;
          text-transform: uppercase;
          writing-mode: vertical-rl;
          transform: none;
          white-space: nowrap;
          transition: color 220ms ease;
        }

        .mydiio-scroll-cue__track {
          position: relative;
          width: 2px;
          height: 100px;
          overflow: hidden;
          border-radius: 999px;
          transition: background 220ms ease;
        }

        .mydiio-scroll-cue__dot {
          position: absolute;
          top: 0;
          left: 50%;
          width: 10px;
          height: 10px;
          border-radius: 999px;
          transform: translateX(-50%);
          animation: mydiio-scroll-cue-dot 1.8s cubic-bezier(0.22, 1, 0.36, 1) infinite;
          transition: background 220ms ease, box-shadow 220ms ease;
        }

        /* Cream or other light sections: deliberate ink contrast. */
        .mydiio-scroll-cue[data-tone="light"] .mydiio-scroll-cue__label {
          color: rgba(26, 26, 24, 0.82);
        }

        .mydiio-scroll-cue[data-tone="light"] .mydiio-scroll-cue__track {
          background: rgba(232, 146, 10, 0.54);
        }

        .mydiio-scroll-cue[data-tone="light"] .mydiio-scroll-cue__dot {
          background: #e8920a;
          box-shadow: 0 0 10px rgba(232, 146, 10, 0.28);
        }

        /* Ink / dark sections: calm cream contrast with amber movement. */
        .mydiio-scroll-cue[data-tone="dark"] .mydiio-scroll-cue__label {
          color: rgba(253, 250, 243, 0.8);
        }

        .mydiio-scroll-cue[data-tone="dark"] .mydiio-scroll-cue__track {
          background: rgba(245, 166, 35, 0.56);
        }

        .mydiio-scroll-cue[data-tone="dark"] .mydiio-scroll-cue__dot {
          background: #f5a623;
          box-shadow: 0 0 12px rgba(245, 166, 35, 0.48);
        }

        @keyframes mydiio-scroll-cue-dot {
          0% {
            opacity: 0;
            transform: translate(-50%, 0);
          }

          18%, 76% {
            opacity: 1;
          }

          100% {
            opacity: 0;
            transform: translate(-50%, 92px);
          }
        }

        @media (max-width: 760px) {
          .mydiio-scroll-cue {
            top: auto;
            right: 20px;
            bottom: max(20px, env(safe-area-inset-bottom));
            flex-direction: row;
            gap: 10px;
            transform: none;
          }

          .mydiio-scroll-cue[data-visible="false"] {
            transform: translateY(10px);
          }

          .mydiio-scroll-cue__label {
            font-size: 10px;
            writing-mode: horizontal-tb;
            transform: none;
          }

          .mydiio-scroll-cue__track {
            width: 62px;
            height: 2px;
          }

          .mydiio-scroll-cue__dot {
            top: 50%;
            left: 0;
            transform: translate(0, -50%);
            animation-name: mydiio-scroll-cue-dot-mobile;
          }
        }

        @keyframes mydiio-scroll-cue-dot-mobile {
          0% {
            opacity: 0;
            transform: translate(0, -50%);
          }

          18%, 76% {
            opacity: 1;
          }

          100% {
            opacity: 0;
            transform: translate(58px, -50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .mydiio-scroll-cue__dot {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>

      <aside
        aria-hidden="true"
        className="mydiio-scroll-cue"
        data-tone={tone}
        data-visible={visible}
      >
        <span className="mydiio-scroll-cue__label">Scroll to explore</span>
        <span className="mydiio-scroll-cue__track">
          <span className="mydiio-scroll-cue__dot" />
        </span>
      </aside>
    </>
  );
}
