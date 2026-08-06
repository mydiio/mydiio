import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { colors } from "@/design";

const navLinks = [
  { label: "Advertise", to: "/advertise" },
  { label: "Drive", to: "/drive" },
  { label: "Investors", to: "/investors" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

type AtlasNavProps = {
  homeTo?: "/" | "/v2";
  campaignTo?: "/advertise" | "/advertise/apply";
};

export function AtlasNav({ homeTo = "/v2", campaignTo = "/advertise" }: AtlasNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [compact, setCompact] = useState(false);
  const [darkSurface, setDarkSurface] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let frame = 0;

    const resolveTone = () => {
      const navProbeY = compact ? 72 : 90;
      const navProbeX = Math.min(window.innerWidth - 1, Math.max(1, window.innerWidth / 2));

      const elements = document.elementsFromPoint(
        navProbeX,
        Math.min(window.innerHeight - 1, navProbeY),
      );

      const toneElement = elements
        .map((element) => element.closest<HTMLElement>("[data-atlas-tone]"))
        .find(Boolean);

      if (toneElement) {
        setDarkSurface(toneElement.dataset.atlasTone === "dark");
        return;
      }

      /*
       * Act One contains both a dark film and a light
       * end card, so its tone remains progress-aware.
       */
      const actOne = document.querySelector<HTMLElement>("[data-atlas-act-one]");

      if (!actOne) {
        setDarkSurface(false);
        return;
      }

      const y = window.scrollY;
      const actStart = actOne.offsetTop;
      const scrollDistance = actOne.offsetHeight - window.innerHeight;

      const endCardStart = actStart + Math.max(0, scrollDistance) * 0.955;

      setDarkSurface(y < endCardStart);
    };

    const update = () => {
      frame = 0;

      const y = window.scrollY;

      setScrolled(y > 40);
      setCompact(y > 200);

      resolveTone();
    };

    const requestUpdate = () => {
      if (frame) return;

      frame = window.requestAnimationFrame(update);
    };

    requestUpdate();

    window.addEventListener("scroll", requestUpdate, {
      passive: true,
    });

    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", requestUpdate);

      window.removeEventListener("resize", requestUpdate);
    };
  }, [compact]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    const closeDesktopMenu = () => {
      if (window.innerWidth >= 900) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", closeDesktopMenu);

    return () => {
      window.removeEventListener("resize", closeDesktopMenu);
    };
  }, []);

  const foreground = darkSurface ? colors.cream : colors.ink;

  return (
    <>
      <header
        className={[
          "atlas-nav",
          scrolled ? "atlas-nav-scrolled" : "",
          compact ? "atlas-nav-compact" : "",
          darkSurface ? "atlas-nav-dark" : "atlas-nav-light",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="atlas-nav-inner">
          <Link
            to={homeTo}
            aria-label="mydiio"
            className="atlas-nav-wordmark"
            style={{ color: foreground }}
          >
            <span>myd</span>
            <span className="atlas-nav-amber">ii</span>
            <span>o</span>
          </Link>

          <nav className="atlas-nav-links" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="atlas-nav-link"
                style={{ color: foreground }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="atlas-nav-actions">
            <a
              href="https://app.mydiio.com/login"
              className="atlas-nav-signin"
              style={{ color: foreground }}
            >
              Sign in
            </a>

            <Link to={campaignTo} className="atlas-nav-cta">
              Launch campaign
            </Link>

            <button
              type="button"
              className="atlas-nav-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              style={{ color: foreground }}
            >
              <span
                className={open ? "atlas-nav-menu-lines open" : "atlas-nav-menu-lines"}
                aria-hidden="true"
              >
                <i />
                <i />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div className={open ? "atlas-nav-mobile open" : "atlas-nav-mobile"} aria-hidden={!open}>
        <div className="atlas-nav-mobile-top">
          <Link
            to={homeTo}
            aria-label="mydiio"
            className="atlas-nav-mobile-wordmark"
            onClick={() => setOpen(false)}
          >
            <span>myd</span>
            <span className="atlas-nav-amber">ii</span>
            <span>o</span>
          </Link>

          <button
            type="button"
            aria-label="Close menu"
            className="atlas-nav-mobile-close"
            onClick={() => setOpen(false)}
          >
            <span />
            <span />
          </button>
        </div>

        <nav className="atlas-nav-mobile-links" aria-label="Mobile navigation">
          {navLinks.map((link, index) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="atlas-nav-mobile-link"
              style={{
                transitionDelay: open ? `${80 + index * 45}ms` : "0ms",
              }}
            >
              <span>{link.label}</span>
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </nav>

        <div className="atlas-nav-mobile-actions">
          <Link to={campaignTo} onClick={() => setOpen(false)} className="atlas-nav-mobile-cta">
            Launch campaign
          </Link>

          <a href="https://app.mydiio.com/login" className="atlas-nav-mobile-signin">
            Sign in
          </a>
        </div>
      </div>

      <style>{`
        .atlas-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          height: var(--atlas-nav-height, 88px);
          padding-inline: 28px;
          box-sizing: border-box;
          border-bottom: 1px solid transparent;
          background: transparent;
          transition:
            height 320ms cubic-bezier(0.22,1,0.36,1),
            background 180ms ease,
            border-color 180ms ease,
            box-shadow 180ms ease,
            backdrop-filter 180ms ease;
        }

        .atlas-nav-scrolled.atlas-nav-light {
          background:
            rgba(253,250,243,0.82);
          border-bottom-color:
            rgba(26,26,24,0.055);
          box-shadow:
            0 18px 48px -38px
            rgba(26,26,24,0.28);
          backdrop-filter:
            blur(18px)
            saturate(1.08);
          -webkit-backdrop-filter:
            blur(18px)
            saturate(1.08);
        }

        .atlas-nav-scrolled.atlas-nav-dark {
          background:
            rgba(8,8,7,0.62);
          border-bottom-color:
            rgba(255,255,255,0.055);
          box-shadow:
            0 18px 52px -40px
            rgba(0,0,0,0.72);
          backdrop-filter:
            blur(18px)
            saturate(1.04);
          -webkit-backdrop-filter:
            blur(18px)
            saturate(1.04);
        }

        .atlas-nav-compact {
          height: var(--atlas-nav-height-compact, 70px);
        }

        .atlas-nav-inner {
          width: min(1360px, 100%);
          height: 100%;
          margin-inline: auto;
          display: grid;
          grid-template-columns:
            minmax(150px, 1fr)
            auto
            minmax(230px, 1fr);
          align-items: center;
          gap: 28px;
        }

        .atlas-nav-wordmark,
        .atlas-nav-mobile-wordmark {
          display: inline-flex;
          width: max-content;
          align-items: baseline;
          font-family:
            "DM Sans",
            system-ui,
            sans-serif;
          font-size: 26px;
          font-weight: 760;
          line-height: 1;
          letter-spacing: -0.065em;
          text-decoration: none;
          transition: color 280ms ease;
        }

        .atlas-nav-amber {
          color: ${colors.amber};
        }

        .atlas-nav-links {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(22px, 2.4vw, 38px);
        }

        .atlas-nav-link {
          position: relative;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          padding: 10px 0;
          font-family:
            "DM Sans",
            system-ui,
            sans-serif;
          font-size: 13px;
          font-weight: 620;
          letter-spacing: -0.012em;
          text-decoration: none;
          opacity: 0.76;
          transition:
            opacity 200ms ease,
            color 280ms ease,
            transform 220ms
              cubic-bezier(0.22,1,0.36,1);
        }

        .atlas-nav-link::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: 1px;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: ${colors.amber};
          opacity: 0;
          transform:
            translateX(-50%)
            translateY(4px)
            scale(0.5);
          transition:
            opacity 200ms ease,
            transform 240ms
              cubic-bezier(0.22,1,0.36,1);
        }

        .atlas-nav-link:hover {
          opacity: 1;
          transform: translateY(-1px);
        }

        .atlas-nav-link:hover::after,
        .atlas-nav-link[aria-current="page"]::after {
          opacity: 1;
          transform:
            translateX(-50%)
            translateY(0)
            scale(1);
        }

        .atlas-nav-actions {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 12px;
        }

        .atlas-nav-signin {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 42px;
          padding: 0 12px;
          font-family:
            "DM Sans",
            system-ui,
            sans-serif;
          font-size: 13px;
          font-weight: 620;
          text-decoration: none;
          opacity: 0.72;
          transition:
            opacity 200ms ease,
            color 280ms ease;
        }

        .atlas-nav-signin:hover {
          opacity: 1;
        }

        .atlas-nav-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 44px;
          padding: 0 19px;
          border-radius: 13px;
          background: ${colors.amber};
          color: ${colors.ink};
          font-family:
            "DM Sans",
            system-ui,
            sans-serif;
          font-size: 13px;
          font-weight: 740;
          letter-spacing: -0.018em;
          text-decoration: none;
          box-shadow:
            0 15px 34px -22px rgba(245,166,35,0.62);
          transition:
            transform 220ms
              cubic-bezier(0.22,1,0.36,1),
            box-shadow 220ms ease,
            background 220ms ease;
        }

        .atlas-nav-cta:hover {
          transform: translateY(-2px);
          box-shadow:
            0 20px 38px -21px rgba(245,166,35,0.72);
        }

        .atlas-nav-menu {
          display: none;
          width: 44px;
          height: 44px;
          padding: 0;
          border: 0;
          border-radius: 50%;
          background: transparent;
          cursor: pointer;
        }

        .atlas-nav-menu-lines {
          position: relative;
          display: block;
          width: 21px;
          height: 14px;
          margin: auto;
        }

        .atlas-nav-menu-lines i {
          position: absolute;
          left: 0;
          width: 21px;
          height: 1.5px;
          border-radius: 999px;
          background: currentColor;
          transition:
            top 260ms
              cubic-bezier(0.22,1,0.36,1),
            transform 260ms
              cubic-bezier(0.22,1,0.36,1);
        }

        .atlas-nav-menu-lines i:first-child {
          top: 3px;
        }

        .atlas-nav-menu-lines i:last-child {
          top: 10px;
        }

        .atlas-nav-menu-lines.open i:first-child {
          top: 7px;
          transform: rotate(45deg);
        }

        .atlas-nav-menu-lines.open i:last-child {
          top: 7px;
          transform: rotate(-45deg);
        }

        .atlas-nav-mobile {
          position: fixed;
          inset: 0;
          z-index: 110;
          display: flex;
          flex-direction: column;
          padding:
            max(24px, env(safe-area-inset-top))
            22px
            max(24px, env(safe-area-inset-bottom));
          box-sizing: border-box;
          overflow-y: auto;
          background: ${colors.cream};
          color: ${colors.ink};
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transform: translateY(-16px);
          transition:
            opacity 280ms ease,
            transform 360ms
              cubic-bezier(0.22,1,0.36,1),
            visibility 0ms linear 360ms;
        }

        .atlas-nav-mobile.open {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transform: translateY(0);
          transition-delay: 0ms;
        }

        .atlas-nav-mobile-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 48px;
        }

        .atlas-nav-mobile-wordmark {
          color: ${colors.ink};
          font-size: 28px;
        }

        .atlas-nav-mobile-close {
          position: relative;
          width: 46px;
          height: 46px;
          padding: 0;
          border: 1px solid rgba(26,26,24,0.1);
          border-radius: 50%;
          background: rgba(255,255,255,0.56);
          cursor: pointer;
        }

        .atlas-nav-mobile-close span {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 18px;
          height: 1.5px;
          border-radius: 999px;
          background: ${colors.ink};
        }

        .atlas-nav-mobile-close span:first-child {
          transform:
            translate(-50%,-50%)
            rotate(45deg);
        }

        .atlas-nav-mobile-close span:last-child {
          transform:
            translate(-50%,-50%)
            rotate(-45deg);
        }

        .atlas-nav-mobile-links {
          display: flex;
          flex-direction: column;
          margin-top: clamp(48px, 9vh, 86px);
        }

        .atlas-nav-mobile-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 2px;
          border-bottom:
            1px solid rgba(26,26,24,0.09);
          color: ${colors.ink};
          font-family:
            "DM Sans",
            system-ui,
            sans-serif;
          font-size: clamp(34px, 10vw, 46px);
          font-weight: 600;
          line-height: 0.96;
          letter-spacing: -0.055em;
          text-decoration: none;
          opacity: 0;
          transform: translateY(14px);
          transition:
            opacity 300ms ease,
            transform 400ms
              cubic-bezier(0.22,1,0.36,1);
        }

        .atlas-nav-mobile.open
        .atlas-nav-mobile-link {
          opacity: 1;
          transform: translateY(0);
        }

        .atlas-nav-mobile-link span:last-child {
          color: ${colors.amberDeep};
          font-size: 17px;
          font-weight: 500;
          letter-spacing: 0;
        }

        .atlas-nav-mobile-actions {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
          margin-top: auto;
          padding-top: 34px;
        }

        .atlas-nav-mobile-cta,
        .atlas-nav-mobile-signin {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 52px;
          border-radius: 14px;
          font-family:
            "DM Sans",
            system-ui,
            sans-serif;
          font-size: 14px;
          font-weight: 720;
          text-decoration: none;
        }

        .atlas-nav-mobile-cta {
          background: ${colors.amber};
          color: ${colors.ink};
        }

        .atlas-nav-mobile-signin {
          border: 1px solid rgba(26,26,24,0.12);
          background: rgba(255,255,255,0.52);
          color: ${colors.ink};
        }

        @media (max-width: 1050px) {
          .atlas-nav-inner {
            grid-template-columns:
              minmax(130px, 0.7fr)
              auto
              minmax(200px, 0.7fr);
            gap: 18px;
          }

          .atlas-nav-links {
            gap: 20px;
          }

          .atlas-nav-link {
            font-size: 12px;
          }
        }

        @media (max-width: 899px) {
          .atlas-nav {
            height: 72px;
            padding-inline: 18px;
          }

          .atlas-nav-compact {
            height: 64px;
          }

          .atlas-nav-inner {
            display: flex;
            justify-content: space-between;
          }

          .atlas-nav-links,
          .atlas-nav-signin,
          .atlas-nav-cta {
            display: none;
          }

          .atlas-nav-menu {
            display: grid;
            place-items: center;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .atlas-nav,
          .atlas-nav-link,
          .atlas-nav-link::after,
          .atlas-nav-cta,
          .atlas-nav-mobile,
          .atlas-nav-mobile-link,
          .atlas-nav-menu-lines i {
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}
