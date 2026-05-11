import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { LanguageSwitcher, useI18n } from "@/lib/i18n";
import { C, accentColor, type Accent } from "./theme";

function Logo() {
  return (
    <Link
      to="/"
      className="font-display text-[20px] inline-flex items-center justify-center px-4 py-1 rounded-full bg-white site-logo-lock"
      style={{
        border: `3px solid ${C.ink}`,
        color: C.ink,
        boxShadow: "2px 2px 0 rgba(26,26,14,0.9)",
        fontFamily: "'Fredoka One', system-ui, sans-serif",
        width: 118,
        height: 42,
        flex: "0 0 118px",
      }}
    >
      <span style={{ color: C.ink }}>my</span>
      <span style={{ color: C.amber }}>di</span>
      <span style={{ color: C.ink }}>io</span>
    </Link>
  );
}

export interface SiteNavProps {
  /** Tints the primary CTA. Defaults to amber. */
  accent?: Accent;
}

/** Unified sticky navigation used across every mydiio page. */
export function SiteNav({ accent = "amber" }: SiteNavProps) {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const a = accentColor(accent);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { to: "/", key: "nav_home" as const },
    { to: "/advertise", key: "nav_advertisers" as const },
    { to: "/drive", key: "nav_drivers" as const },
    { to: "/investors", key: "nav_investors" as const },
    { to: "/about", key: "nav_about" as const },
    { to: "/contact", key: "nav_contact" as const },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        height: "var(--site-nav-height)",
        padding: scrolled ? "10px 22px" : "14px 22px",
        background: scrolled ? "rgba(253,250,243,0.92)" : "rgba(253,250,243,0)",
        backdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(26,26,24,0.08)" : "1px solid transparent",
        transition: "background 0.35s ease, border-color 0.35s ease, padding 0.35s ease, backdrop-filter 0.35s ease",
      }}
    >
      <div style={{ maxWidth: 1280, height: "100%", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
        <Logo />
        <div className="site-nav-links" style={{ display: "none", gap: 12, flex: "1 1 auto", justifyContent: "center", minWidth: 0 }}>
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ style: { color: C.ink } }}
              className="site-nav-link"
              style={{ fontSize: 13.5, fontWeight: 800, color: C.inkSoft, textDecoration: "none", transition: "color 0.2s ease" }}
            >
              {t(l.key)}
            </Link>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="site-nav-lang"><LanguageSwitcher /></div>
          <Link
            to="/advertise"
            className="btn-bold font-display site-nav-cta"
            style={{ background: a.bg, color: a.fg, padding: "0 16px", borderRadius: 11, fontSize: 13.5, textDecoration: "none", minWidth: 178, height: 42 }}
          >
            {t("cta_launch")}
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="site-nav-burger"
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 40, height: 40, borderRadius: 11, background: "#fff",
              border: `2px solid ${C.ink}`, boxShadow: "2px 2px 0 rgba(26,26,14,0.9)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth="2.4" strokeLinecap="round">
              {open ? (<><path d="M6 6l12 12" /><path d="M18 6L6 18" /></>) : (<><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>)}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div
          className="site-nav-mobile-panel"
          style={{
            marginTop: 12, padding: 18, borderRadius: 16, background: "#fff",
            border: `2px solid ${C.ink}`, boxShadow: "4px 4px 0 rgba(26,26,14,0.9)",
            display: "flex", flexDirection: "column", gap: 4,
          }}
        >
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="font-display"
              style={{
                fontSize: 18, color: C.ink, padding: "10px 6px",
                textDecoration: "none", borderBottom: `1px solid rgba(26,26,24,0.06)`,
              }}
            >
              {t(l.key)}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        .site-nav-link { width: 86px; height: 34px; display: inline-flex; align-items: center; justify-content: center; text-align: center; white-space: nowrap; }
        .site-nav-lang { width: 142px; height: 38px; flex: 0 0 142px; overflow: hidden; }
        @media (min-width: 1120px) {
          .site-nav-links { display: flex !important; }
          .site-nav-burger { display: none !important; }
          .site-nav-mobile-panel { display: none !important; }
        }
        @media (max-width: 520px) {
          .site-nav-cta { display: none !important; }
        }
      `}</style>
    </nav>
  );
}

export default SiteNav;
