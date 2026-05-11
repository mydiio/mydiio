import { useEffect, useRef } from "react";
import { C, type Accent } from "./theme";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";

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
    return () => io.disconnect();
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
        .reveal.in { opacity: 1; transform: translateY(0); }
        .i18n-root { transition: opacity 120ms ease; }
        .i18n-root[data-lang-settling="true"] { opacity: 0.975; }
        .font-display { letter-spacing: 0 !important; }
        h1.font-display, h2.font-display, h3.font-display { text-wrap: balance; }
        h1, h2, h3 { line-height: var(--site-line-heading); }
        p { text-wrap: pretty; line-height: var(--site-line-body); }
        .hero-cta-row { display: flex; flex-wrap: wrap; gap: 12px; }
        .btn-bold { min-height: var(--site-btn-height); min-width: var(--site-btn-min); display: inline-flex !important; align-items: center; justify-content: center; text-align: center; white-space: nowrap; line-height: 1.1; box-sizing: border-box; }
        .stable-card { min-height: var(--site-card-min); display: flex; flex-direction: column; }
        .stable-title { min-height: 2.6em; display: flex; align-items: flex-start; }
        .stable-copy { min-height: 4.8em; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; }
        .stable-kicker { min-height: 1.4em; display: inline-flex; align-items: center; }
        .stable-hero-title { min-height: clamp(118px, 14.4vw, 248px); display: flex; align-items: flex-start; }
        .stable-hero-copy { min-height: 4.8em; }
        .stable-metrics > * { min-height: 68px; }
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
      <SiteNav accent={accent} />
      {children}
      <SiteFooter />
    </div>
  );
}

export default SiteShell;
