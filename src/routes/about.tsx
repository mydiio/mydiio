import { createFileRoute, Link } from "@tanstack/react-router";
import COLOMBO_STREET from "@/assets/colombo-street.jpg";
import { useI18n } from "@/lib/i18n";
import { SiteShell } from "@/components/site/SiteShell";
import { C } from "@/components/site/theme";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — mydiio | Built in Sri Lanka, for Sri Lanka" },
      { name: "description", content: "mydiio was created to unlock one of Sri Lanka's most overlooked assets: commuter attention. Local execution, scalable technology." },
      { property: "og:title", content: "About — mydiio" },
      { property: "og:description", content: "Local execution. Scalable technology. Built in Colombo." },
    ],
  }),
});

function AboutPage() {
  const { t } = useI18n();

  return (
    <SiteShell accent="amber">
      <section style={{ position: "relative", padding: "clamp(120px, 16vw, 180px) clamp(22px, 6vw, 80px) clamp(60px, 8vw, 100px)", overflow: "hidden" }}>
        <img src={COLOMBO_STREET} alt="Colombo street" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.18 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(253,250,243,0.6), rgba(253,250,243,0.95))" }} />
        <div className="reveal" style={{ position: "relative", maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: C.amberDeep, textTransform: "uppercase" }}>{t("about_kicker")}</span>
          <h1 className="font-display" style={{ fontSize: "clamp(34px, 5.6vw, 64px)", color: C.ink, lineHeight: 1.06, letterSpacing: "-1.2px", marginTop: 14 }}>
            {t("about_title")}
          </h1>
        </div>
      </section>

      <section style={{ padding: "clamp(40px, 6vw, 80px) clamp(22px, 6vw, 80px) clamp(80px, 12vw, 140px)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", flexDirection: "column", gap: 28 }}>
          <p className="reveal" style={{ fontSize: "clamp(17px, 1.8vw, 21px)", color: C.ink, lineHeight: 1.55, fontWeight: 500 }}>
            {t("about_p1")}
          </p>
          <p className="reveal" style={{ fontSize: "clamp(15px, 1.6vw, 18px)", color: C.inkSoft, lineHeight: 1.6, fontWeight: 500 }}>
            {t("about_p2")}
          </p>

          <div className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginTop: 20 }}>
            {[["50+", t("metric_vehicles")], ["7", t("metric_zones")], ["72hr", t("metric_launch")]].map(([v, l]) => (
              <div key={l} className="hover-lift" style={{ background: "#fff", border: `2.5px solid ${C.ink}`, borderRadius: 18, padding: "24px 22px", textAlign: "center", boxShadow: "5px 5px 0 rgba(26,26,24,0.92)" }}>
                <div className="font-display" style={{ fontSize: 36, color: C.amber, letterSpacing: "-1px" }}>{v}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, color: C.inkSoft, textTransform: "uppercase", marginTop: 8 }}>{l}</div>
              </div>
            ))}
          </div>

          <div className="reveal hero-cta-row" style={{ marginTop: 24, justifyContent: "center" }}>
            <Link to="/investors" className="btn-bold font-display" style={{ background: C.ink, color: "#fff", padding: "14px 22px", borderRadius: 12, fontSize: 14.5, textDecoration: "none" }}>{t("about_for_inv")}</Link>
            <Link to="/contact" className="btn-bold font-display" style={{ background: C.amber, color: C.ink, padding: "14px 22px", borderRadius: 12, fontSize: 14.5, textDecoration: "none" }}>{t("cta_talk_founder")}</Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
