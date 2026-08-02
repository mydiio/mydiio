// src/motion/Loader.tsx
// The intro overlay. Three arcs draw on and converge on the amber dot over a
// cream field, a Space Mono line reads a GPS lock sequence, and the whole thing
// wipes upward once the site is ready, then broadcasts "revealed".
//
// Safety rails:
//   - waits for fonts, the hero image, and any registered gates, but never
//     longer than MAX_MS, so it can never trap the user
//   - a minimum on-screen time avoids an ugly one-frame flash on fast loads
//   - scroll is locked under the overlay and released on reveal
//   - reduced motion: no draw-on, static mark, a single gentle fade
//   - no JavaScript: a <noscript> rule hides the overlay so content still shows

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { DURATION, EASE } from "./tokens";
import { useReducedMotion } from "./useReducedMotion";
import { useMotion } from "./MotionProvider";
import { useLoaderControls } from "./LoaderProvider";

const HERO_IMAGE = "https://mydiio.com/assets/hero-tuktuk-CysGCYDp.png";
const MIN_MS = 900;
const MIN_MS_REDUCED = 400;
const MAX_MS = 5000;
const GPS_LOCKED = "locked \u00b7 6.8511\u00b0N 79.8656\u00b0E";

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const preload = (src: string) =>
  new Promise<void>((res) => {
    const img = new Image();
    img.onload = () => res();
    img.onerror = () => res();
    img.src = src;
  });

export function Loader() {
  const reduced = useReducedMotion();
  const { getLenis } = useMotion();
  const loader = useLoaderControls();
  const root = useRef<HTMLDivElement>(null);
  const gpsRef = useRef<HTMLSpanElement>(null);
  const [gone, setGone] = useState(false);

  useGSAP(
    (_context, contextSafe) => {
      const el = root.current;
      if (!el || typeof window === "undefined") return;

      const lenis = getLenis();
      lenis?.stop();

      const arcs = gsap.utils.toArray<SVGPathElement>(
        el.querySelectorAll("[data-arc]"),
      );
      const dot = el.querySelector<SVGCircleElement>("[data-dot]");
      const mark = el.querySelector<HTMLDivElement>("[data-mark]");
      let ellipsis: gsap.core.Tween | undefined;

      if (reduced) {
        gsap.set(arcs, { strokeDashoffset: 0 });
        if (dot) gsap.set(dot, { scale: 1 });
        if (gpsRef.current) gpsRef.current.textContent = GPS_LOCKED;
      } else {
        gsap.set(arcs, { strokeDashoffset: 1 });
        if (dot) gsap.set(dot, { scale: 0, transformOrigin: "50% 50%" });

        const intro = gsap.timeline();
        intro.to(arcs, {
          strokeDashoffset: 0,
          duration: 0.8,
          ease: EASE,
          stagger: 0.12,
        });
        if (dot)
          intro.to(dot, { scale: 1, duration: 0.4, ease: "back.out(2)" }, "-=0.25");

        // "acquiring signal" with an animated ellipsis
        const base = "acquiring signal";
        if (gpsRef.current) gpsRef.current.textContent = base;
        const proxy = { n: 0 };
        ellipsis = gsap.to(proxy, {
          n: 3,
          duration: 1.2,
          repeat: -1,
          ease: "steps(3)",
          onUpdate: () => {
            if (gpsRef.current)
              gpsRef.current.textContent = base + ".".repeat(Math.round(proxy.n));
          },
        });
      }

      const done = () => {
        ellipsis?.kill();
        if (gpsRef.current) gpsRef.current.textContent = GPS_LOCKED;

        const finish = () => {
          lenis?.start();
          loader.markRevealed();
          setGone(true);
        };

        if (reduced) {
          gsap.to(el, {
            autoAlpha: 0,
            duration: DURATION.md,
            ease: EASE,
            onComplete: finish,
          });
        } else {
          const out = gsap.timeline({ onComplete: finish });
          if (mark)
            out.to(mark, {
              autoAlpha: 0,
              y: -12,
              duration: DURATION.sm,
              ease: EASE,
            });
          out.to(el, { yPercent: -100, duration: DURATION.lg, ease: EASE }, "-=0.05");
        }
      };

      // Wait for every gate to release, or resolve immediately if none exist.
      const gatesEmpty = new Promise<void>((res) => {
        const off = loader.subscribeGates((n) => {
          if (n === 0) {
            off();
            res();
          }
        });
      });

      const ready = Promise.all([
        document.fonts.ready,
        preload(HERO_IMAGE),
        gatesEmpty,
        wait(reduced ? MIN_MS_REDUCED : MIN_MS),
      ]);

      let settled = false;
      const safeDone = contextSafe ? contextSafe(done) : done;
      Promise.race([ready, wait(MAX_MS)]).then(() => {
        if (settled) return;
        settled = true;
        safeDone();
      });

      return () => {
        ellipsis?.kill();
        lenis?.start();
      };
    },
    { dependencies: [reduced], scope: root },
  );

  if (gone) return null;

  return (
    <div
      ref={root}
      className="mydiio-loader"
      role="status"
      aria-label="Loading mydiio"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#FDFAF3",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "22px",
      }}
    >
      <noscript>
        <style>{`.mydiio-loader{display:none!important}`}</style>
      </noscript>

      <div data-mark style={{ width: 96, height: 96 }}>
        <svg viewBox="0 0 100 100" width={96} height={96} fill="none" aria-hidden="true">
          <path
            data-arc
            pathLength={1}
            d="M70 15.36 A40 40 0 1 1 70 84.64"
            stroke="#1A1A18"
            strokeWidth={3}
            strokeLinecap="round"
            strokeDasharray={1}
          />
          <path
            data-arc
            pathLength={1}
            d="M65 24.02 A30 30 0 1 1 65 75.98"
            stroke="#1A1A18"
            strokeWidth={3}
            strokeLinecap="round"
            strokeDasharray={1}
          />
          <path
            data-arc
            pathLength={1}
            d="M60 32.68 A20 20 0 1 1 60 67.32"
            stroke="#1A1A18"
            strokeWidth={3}
            strokeLinecap="round"
            strokeDasharray={1}
          />
          <circle data-dot cx={50} cy={50} r={6} fill="#F5A623" />
        </svg>
      </div>

      <span
        ref={gpsRef}
        style={{
          fontFamily: '"Space Mono", ui-monospace, monospace',
          fontSize: "0.72rem",
          letterSpacing: "0.08em",
          color: "rgba(26,26,24,0.6)",
        }}
      >
        acquiring signal
      </span>
    </div>
  );
}
