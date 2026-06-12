import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { LanguageSwitcher, useI18n } from "@/lib/i18n";
import { C, accentColor, type Accent } from "./theme";

function Logo() {
  return (
    <Link
      to="/"
      aria-label="mydiio home"
      className="font-display inline-flex items-center justify-center site-logo-lock"
      style={{
        background: C.paper,
        border: `2px solid ${C.ink}`,
        borderRadius: 9999,
        boxShadow: "var(--sticker-press)",
        padding: "8px 20px",
        textDecoration: "none",
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
        fontWeight: 700,
        fontSize: 18,
        lineHeight: 1,
        letterSpacing: "-0.01em",
        color: C.ink,
        height: 42,
      }}
    >
      <span style={{ color: C.ink }}>my</span>
      <span style={{ color: C.accent }}>di</span>
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
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const a = accentColor(accent);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: any element with [data-nav-section="<slug>"] highlights matching link
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-nav-section]"),
    );
    if (sections.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setActiveSection(visible.target.getAttribute("data-nav-section"));
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Close drawer on resize ≥ 900
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 900 && open) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  // Lock body scroll while drawer open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  const navLinks = [
    { to: "/", key: "nav_home" as const, section: "home" },
    { to: "/advertise", key: "nav_advertisers" as const, section: "advertise" },
    { to: "/drive", key: "nav_drivers" as const, section: "drive" },
    { to: "/investors", key: "nav_investors" as const, section: "investors" },
    { to: "/about", key: "nav_about" as const, section: "about" },
    { to: "/contact", key: "nav_contact" as const, section: "contact" },
  ];

  const navHeight = scrolled ? 64 : 76;

  return (
    <>
      <nav
        className="sticky top-0 left-0 right-0 z-50 site-nav-enter"
        style={{
          height: navHeight,
          padding: "0 22px",
          boxSizing: "border-box",
          background: "rgba(247,241,229,0.78)",
          backdropFilter: "blur(14px) saturate(140%)",
          borderBottom: scrolled
            ? "1px solid rgba(30,26,21,0.13)"
            : "1px solid transparent",
          transition:
            "height 0.25s ease, border-color 0.25s ease, background 0.25s ease",
        }}
      >
        <div
          style={{
            maxWidth: 1240,
            height: "100%",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 14,
          }}
        >
          <Logo />

          <div
            className="site-nav-links"
            style={{
              display: "none",
              gap: 22,
              flex: "1 1 auto",
              justifyContent: "center",
              minWidth: 0,
            }}
          >
            {navLinks.map((l) => {
              const isSpyActive = activeSection === l.section;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  activeOptions={{ exact: l.to === "/" }}
                  activeProps={{ className: "site-nav-link is-active" }}
                  className={`site-nav-link${isSpyActive ? " is-active" : ""}`}
                >
                  <span>{t(l.key)}</span>
                  <i className="site-nav-underline" aria-hidden />
                </Link>
              );
            })}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div className="site-nav-lang">
              <LanguageSwitcher />
            </div>
            <Link
              to="/advertise"
              className="nav-cta-brutal site-nav-cta"
              style={{
                padding: "10px 20px",
                fontSize: 14,
              }}
            >
              {t("cta_launch")}
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="btn-bold site-nav-burger"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 16px",
                fontSize: 14,
                fontWeight: 600,
                background: C.paper,
                color: C.ink,
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke={C.ink}
                strokeWidth="2.4"
                strokeLinecap="round"
              >
                {open ? (
                  <>
                    <path d="M6 6l12 12" />
                    <path d="M18 6L6 18" />
                  </>
                ) : (
                  <>
                    <path d="M4 7h16" />
                    <path d="M4 12h16" />
                    <path d="M4 17h16" />
                  </>
                )}
              </svg>
              Menu
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`site-nav-overlay${open ? " open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />
      <aside
        className={`site-nav-drawer${open ? " open" : ""}`}
        aria-hidden={!open}
      >
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 14 }}>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="btn-bold"
            style={{
              padding: 10,
              background: C.paper,
              color: C.ink,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth="2.4" strokeLinecap="round">
              <path d="M6 6l12 12" /><path d="M18 6L6 18" />
            </svg>
          </button>
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: 22,
                color: C.ink,
                padding: "14px 4px",
                textDecoration: "none",
                borderBottom: "1px solid rgba(30,26,21,0.10)",
              }}
            >
              {t(l.key)}
            </Link>
          ))}
        </nav>
        <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <LanguageSwitcher />
          </div>
          <Link
            to="/advertise"
            onClick={() => setOpen(false)}
            className="nav-cta-brutal"
            style={{
              padding: "14px 20px",
              fontSize: 15,
              textAlign: "center",
              display: "block",
              width: "100%",
            }}
          >
            {t("cta_launch")}
          </Link>
        </div>
      </aside>

      <style>{`
        :root { --site-nav-height: 76px; }
        .site-nav-link {
          position: relative;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px;
          font-weight: 500;
          color: ${C.inkSoft};
          text-decoration: none;
          padding: 6px 2px;
          line-height: 1.2;
          transition: color 0.2s ease;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
        }
        .site-nav-link:hover { color: ${C.ink}; }
        .site-nav-link.is-active { color: ${C.ink}; }
        .site-nav-link .site-nav-underline {
          display: block;
          height: 2px;
          width: 100%;
          background: ${C.accent};
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.2s ease;
          margin-top: 4px;
        }
        .site-nav-link:hover .site-nav-underline,
        .site-nav-link.is-active .site-nav-underline { transform: scaleX(1); }

        .site-nav-burger { display: inline-flex; }
        .site-nav-links { display: none !important; }
        .site-nav-cta { display: none !important; }
        .site-nav-lang { display: none !important; }

        @media (min-width: 900px) {
          .site-nav-links { display: flex !important; }
          .site-nav-cta { display: inline-flex !important; }
          .site-nav-lang { display: inline-flex !important; }
          .site-nav-burger { display: none !important; }
        }

        .site-nav-overlay {
          position: fixed; inset: 0; z-index: 60;
          background: rgba(30,26,21,0.35);
          backdrop-filter: blur(6px);
          opacity: 0; pointer-events: none;
          transition: opacity 0.25s ease;
        }
        .site-nav-overlay.open { opacity: 1; pointer-events: auto; }

        .site-nav-drawer {
          position: fixed; top: 0; right: 0; bottom: 0;
          z-index: 61;
          width: min(360px, 88vw);
          background: ${C.bg};
          border-left: 2px solid ${C.ink};
          box-shadow: var(--sticker-lg);
          padding: 22px 22px 28px;
          transform: translateX(100%);
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }
        .site-nav-drawer.open { transform: translateX(0); }
        @media (min-width: 900px) {
          .site-nav-overlay, .site-nav-drawer { display: none !important; }
        }
      `}</style>
    </>
  );
}

export default SiteNav;
