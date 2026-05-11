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
        .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1); }
        .reveal.in { opacity: 1; transform: translateY(0); }
        .font-display { letter-spacing: -0.5px; }
        h1.font-display, h2.font-display, h3.font-display { text-wrap: balance; }
        p { text-wrap: pretty; }
        .hero-cta-row { display: flex; flex-wrap: wrap; gap: 12px; }
        .hover-lift { transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s cubic-bezier(0.16,1,0.3,1); }
        .hover-lift:hover { transform: translateY(-3px); box-shadow: 0 28px 50px -28px rgba(26,26,24,0.4) !important; }
        @media (max-width: 640px) {
          .hero-cta-row .btn-bold { width: 100%; text-align: center; }
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
