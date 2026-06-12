import { useEffect, useRef } from "react";
import { C, type Accent } from "./theme";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";
import { AnnouncementBar } from "./AnnouncementBar";

/**
 * Wraps a page with the unified nav, footer, scroll-reveal animations, and
 * the shared `.reveal` / `.btn-bold` interaction styles. Every page should
 * use this shell so the brand system stays identical site-wide.
 */
export function SiteShell({
  children,
  accent = "amber",
}: {
  children: React.ReactNode;
  accent?: Accent;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const target = e.target as HTMLElement;
            target.querySelectorAll<HTMLElement>(".reveal:not(.in)").forEach((item, i) =>
              setTimeout(() => item.classList.add("in"), i * 70),
            );
            io.unobserve(target);
          }
        });
      },
      { threshold: 0.14 },
    );
    root.querySelectorAll<HTMLElement>("section, footer").forEach((s) => io.observe(s));

    // Scroll-triggered reveal-up system (delay classes handle stagger)
    const upObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            upObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    const t = window.setTimeout(() => {
      root.querySelectorAll<HTMLElement>(".reveal-up:not(.visible)").forEach((el) => upObserver.observe(el));
    }, 10);

    return () => {
      io.disconnect();
      upObserver.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  return (
    <div ref={ref} className="w-full" style={{ background: C.cream }}>
      <style>{`
        :root {
          --site-nav-height: 72px;
          --site-btn-height: 48px;
          --site-btn-min: 178px;
          --site-card-min: 178px;
          --site-line-body: 1.58;
          --site-line-heading: 1.08;
        }
        .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1); }
        .reveal.in, .reveal.revealed { opacity: 1; transform: translateY(0); }

        /* Scroll-triggered reveal-up (additive) with stagger delay classes */
        .reveal-up { opacity: 0; transform: translateY(28px); transition: opacity 550ms cubic-bezier(0.22,1,0.36,1), transform 550ms cubic-bezier(0.22,1,0.36,1); }
        .reveal-up.visible { opacity: 1; transform: translateY(0); }
        .reveal-up.delay-1 { transition-delay: 80ms; }
        .reveal-up.delay-2 { transition-delay: 160ms; }
        .reveal-up.delay-3 { transition-delay: 240ms; }
        .reveal-up.delay-4 { transition-delay: 320ms; }

        /* Hero entrance — fires on mount via CSS keyframes */
        @keyframes heroFadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes heroFadeUpLarge { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes heroFadeUpSub { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes heroFadeScale { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
        @keyframes navFadeDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }

        .site-nav-enter { opacity: 0; animation: navFadeDown 400ms ease-out 0ms forwards; }
        .hero-badge { opacity: 0; animation: heroFadeUp 400ms ease-out 150ms forwards; }
        .hero-word { opacity: 0; animation: heroFadeUpLarge 500ms cubic-bezier(0.22,1,0.36,1) both; }
        .hero-sub { opacity: 0; animation: heroFadeUpSub 400ms ease-out 700ms forwards; }
        .hero-stat { opacity: 0; animation: heroFadeUp 400ms ease-out both; }
        .hero-ctas { opacity: 0; animation: heroFadeScale 350ms ease-out 1150ms forwards; }

        /* Hover micro-interactions */
        .cta-primary { transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease !important; }
        .cta-primary:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(245,166,35,0.3) !important; }
        .site-nav-link { position: relative; }
        .site-nav-link::after {
          content: ""; position: absolute; left: 12px; right: 12px; bottom: 6px; height: 2px;
          background: var(--amber, #F5A623); transform: scaleX(0); transform-origin: left;
          transition: transform 200ms ease;
        }
        .site-nav-link:hover::after { transform: scaleX(1); }

        @media (prefers-reduced-motion: reduce) {
          .reveal, .reveal.in, .reveal.revealed { opacity: 1 !important; transform: none !important; transition: none !important; }
          .reveal-up, .reveal-up.visible { opacity: 1 !important; transform: none !important; transition: none !important; }
          .site-nav-enter, .hero-badge, .hero-word, .hero-sub, .hero-stat, .hero-ctas { opacity: 1 !important; animation: none !important; transform: none !important; }
          .cta-primary, .site-nav-link::after { transition: none !important; }
        }

        .i18n-root { transition: opacity 120ms ease; }
        .i18n-root[data-lang-settling="true"] { opacity: 0.975; }
        .font-display { letter-spacing: 0 !important; }
        h1.font-display, h2.font-display, h3.font-display { text-wrap: balance; }
        h1, h2, h3 { line-height: var(--site-line-heading); }
        p { text-wrap: pretty; line-height: var(--site-line-body); }
        .hero-cta-row { display: flex; flex-wrap: wrap; gap: 12px; }
        .btn-bold { min-height: var(--site-btn-height); min-width: var(--site-btn-min); display: inline-flex !important; align-items: center; justify-content: center; text-align: center; white-space: nowrap; line-height: 1.1; box-sizing: border-box; }
        .stable-card { min-height: var(--site-card-min); display: flex; flex-direction: column; }
        :where(.hover-lift, .path-card, .step-card, .price-card) { min-height: var(--site-card-min); }
        :where(.price-card, .step-card) { height: 100%; }
        .stable-title { min-height: 2.6em; display: flex; align-items: flex-start; }
        .stable-copy { min-height: 4.8em; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; }
        .stable-kicker { min-height: 1.4em; display: inline-flex; align-items: center; }
        .stable-hero-title { min-height: clamp(118px, 14.4vw, 248px); display: flex; align-items: flex-start; }
        .stable-hero-copy { min-height: 4.8em; }
        .stable-metrics > * { min-height: 68px; }
        .hero-trust > *, .stable-metrics > * { display: flex; flex-direction: column; justify-content: flex-start; }
        section[style*="100vh"] { min-height: max(680px, 100svh) !important; }
        section[style*="100vh"] > .relative { min-height: max(680px, 100svh) !important; }
        .hover-lift { transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s cubic-bezier(0.16,1,0.3,1); }
        .hover-lift:hover { transform: translateY(-3px); box-shadow: 0 28px 50px -28px rgba(26,26,24,0.4) !important; }
        @media (max-width: 640px) {
          :root { --site-nav-height: 68px; --site-btn-min: 100%; }
          .hero-cta-row .btn-bold { width: 100%; text-align: center; }
          .stable-hero-title { min-height: clamp(116px, 27vw, 190px); }
          .site-nav-lang { width: 142px !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
      <AnnouncementBar />
      <SiteNav accent={accent} />
      {children}
      <SiteFooter />
    </div>
  );
}

export default SiteShell;
