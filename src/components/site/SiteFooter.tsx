import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

/** Unified footer used across every mydiio page. */
export function SiteFooter() {
  const { t } = useI18n();

  const colHeading: React.CSSProperties = {
    fontFamily: "'Space Mono', monospace",
    fontSize: 11,
    color: "var(--accent)",
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    fontWeight: 700,
  };
  const linkStyle: React.CSSProperties = {
    color: "var(--on-dark)",
    fontSize: 14,
    textDecoration: "none",
    fontWeight: 600,
    transition: "transform 0.15s ease",
    display: "inline-block",
  };

  return (
    <footer style={{ background: "var(--ink)", color: "var(--on-dark)", padding: "72px 24px 40px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div className="site-footer-grid">
          {/* Column 1 — brand */}
          <div>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 34,
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}>
              <span style={{ color: "var(--on-dark)" }}>my</span>
              <span style={{ color: "var(--accent)" }}>dii</span>
              <span style={{ color: "var(--on-dark)" }}>o</span>
            </div>
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              color: "var(--accent)",
              letterSpacing: "0.18em",
              marginTop: 12,
              textTransform: "uppercase",
            }}>
              Sri Lanka's urban attention network
            </div>
            <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: "rgba(244,239,227,0.6)", fontWeight: 500 }}>
              <span>· {t("ft_l1")}</span>
              <span>· {t("ft_l2")}</span>
              <span>· {t("ft_l3")}</span>
            </div>
            <div style={{ marginTop: 20 }}>
              <span style={{
                display: "inline-block",
                padding: "5px 14px",
                borderRadius: "var(--radius-pill)",
                border: "1px solid rgba(244,166,42,0.4)",
                fontFamily: "'Space Mono', monospace",
                fontSize: 11,
                letterSpacing: "0.14em",
                color: "var(--accent)",
                textTransform: "uppercase",
              }}>
                Available in English · Sinhala · Tamil
              </span>
            </div>
          </div>

          {/* Column 2 — Explore */}
          <div>
            <div style={colHeading}>Explore</div>
            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
              <Link to="/advertise" className="footer-link" style={linkStyle}>Advertisers</Link>
              <Link to="/drive" className="footer-link" style={linkStyle}>Drivers</Link>
              <Link to="/investors" className="footer-link" style={linkStyle}>Network</Link>
              <Link to="/about" className="footer-link" style={linkStyle}>About</Link>
            </div>
          </div>

          {/* Column 3 — Legal */}
          <div>
            <div style={colHeading}>Legal</div>
            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
              <Link to="/contact" className="footer-link" style={linkStyle}>Contact</Link>
              <a href="#" className="footer-link" style={linkStyle}>Privacy</a>
              <a href="#" className="footer-link" style={linkStyle}>Terms</a>
            </div>
          </div>
        </div>

        <div style={{
          marginTop: 56,
          paddingTop: 24,
          borderTop: "1px solid rgba(244,239,227,0.12)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 12,
          fontFamily: "'Space Mono', monospace",
          fontSize: 12,
          color: "var(--ink-mute)",
          letterSpacing: "0.08em",
        }}>
          <span>© 2026 mydiio · Colombo · Sri Lanka</span>
          <span>Built in Colombo, for Colombo</span>
        </div>
      </div>
      <style>{`
        .site-footer-grid { display: grid; grid-template-columns: 1fr; gap: 40px; }
        @media (min-width: 720px) {
          .site-footer-grid { grid-template-columns: 1.4fr 1fr 1fr; gap: 56px; }
        }
        .footer-link:hover { transform: translateX(4px); }
      `}</style>
    </footer>
  );
}

export default SiteFooter;
