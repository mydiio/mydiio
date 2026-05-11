import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { C } from "./theme";

/** Unified footer used across every mydiio page. */
export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer style={{ background: C.ink, padding: "64px 24px 36px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div className="site-footer-grid">
          <div>
            <div className="font-display" style={{ fontSize: 26, fontFamily: "'Fredoka One', system-ui, sans-serif" }}>
              <span style={{ color: "#fff" }}>my</span>
              <span style={{ color: C.amber }}>di</span>
              <span style={{ color: "#fff" }}>io</span>
            </div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: C.amber, letterSpacing: 2, marginTop: 8, textTransform: "uppercase" }}>
              {t("ft_tagline")}
            </div>
            <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>
              <span>· {t("ft_l1")}</span>
              <span>· {t("ft_l2")}</span>
              <span>· {t("ft_l3")}</span>
            </div>
            <div style={{ marginTop: 18 }}>
              <span style={{
                display: "inline-block", padding: "5px 11px", borderRadius: 999,
                background: "rgba(245,166,35,0.12)", border: "1px solid rgba(245,166,35,0.3)",
                fontFamily: "'DM Mono', monospace", fontSize: 9.5, letterSpacing: 1.5,
                color: C.amber, textTransform: "uppercase",
              }}>
                {t("ft_avail")}
              </span>
            </div>
          </div>

          <div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: C.amber, letterSpacing: 2, textTransform: "uppercase" }}>{t("ft_explore")}</div>
            <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
              <Link to="/advertise" style={{ color: "#fff", fontSize: 14, textDecoration: "none", fontWeight: 600 }}>{t("nav_advertisers")}</Link>
              <Link to="/drive" style={{ color: "#fff", fontSize: 14, textDecoration: "none", fontWeight: 600 }}>{t("nav_drivers")}</Link>
              <Link to="/investors" style={{ color: "#fff", fontSize: 14, textDecoration: "none", fontWeight: 600 }}>{t("nav_investors")}</Link>
              <Link to="/about" style={{ color: "#fff", fontSize: 14, textDecoration: "none", fontWeight: 600 }}>{t("nav_about")}</Link>
            </div>
          </div>

          <div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: C.amber, letterSpacing: 2, textTransform: "uppercase" }}>{t("ft_legal")}</div>
            <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
              <Link to="/contact" style={{ color: "#fff", fontSize: 14, textDecoration: "none", fontWeight: 600 }}>{t("nav_contact")}</Link>
              <a href="#" style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, textDecoration: "none", fontWeight: 600 }}>Privacy</a>
              <a href="#" style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, textDecoration: "none", fontWeight: 600 }}>Terms</a>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12, fontFamily: "'DM Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: 1 }}>
          <span>© 2026 mydiio · Colombo · Sri Lanka</span>
          <span>{t("ft_built")}</span>
        </div>
      </div>
      <style>{`
        .site-footer-grid { display: grid; grid-template-columns: 1fr; gap: 36px; }
        @media (min-width: 720px) { .site-footer-grid { grid-template-columns: 2fr 1fr 1fr; gap: 48px; } }
      `}</style>
    </footer>
  );
}

export default SiteFooter;
