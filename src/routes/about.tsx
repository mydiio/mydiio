import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import COLOMBO_STREET from "@/assets/colombo-street.jpg";
import { LanguageSwitcher, useI18n } from "@/lib/i18n";

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

const C = { amber: "#F5A623", amberDeep: "#E8920A", ink: "#1A1A18", inkSoft: "#7A7A72", cream: "#FDFAF3" };

function Logo() {
  return (
    <Link to="/" className="font-display text-[20px] inline-flex items-center px-4 py-1 rounded-full bg-white" style={{ border: `3px solid ${C.ink}`, color: C.ink, boxShadow: "2px 2px 0 rgba(26,26,14,0.9)", fontFamily: "'Fredoka One', system-ui, sans-serif" }}>
      <span style={{ color: C.ink }}>my</span><span style={{ color: C.amber }}>di</span><span style={{ color: C.ink }}>io</span>
    </Link>
  );
}

function AboutPage() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) {
        el.querySelectorAll<HTMLElement>(".reveal").forEach((it, i) => setTimeout(() => it.classList.add("in"), i * 80));
        io.disconnect();
      }});
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ background: C.cream, minHeight: "100vh" }}>
      <style>{`
        .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1); }
        .reveal.in { opacity: 1; transform: translateY(0); }
      `}</style>

      <nav style={{ position: "sticky", top: 0, zIndex: 50, padding: "12px 22px", background: "rgba(253,250,243,0.92)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(26,26,24,0.08)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <Logo />
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <LanguageSwitcher />
            <Link to="/advertise" className="btn-bold font-display" style={{ background: C.amber, color: C.ink, padding: "10px 16px", borderRadius: 11, fontSize: 13.5, textDecoration: "none" }}>{t("cta_launch")}</Link>
          </div>
        </div>
      </nav>

      <section style={{ position: "relative", padding: "clamp(80px, 14vw, 160px) clamp(22px, 6vw, 80px) clamp(60px, 8vw, 100px)", overflow: "hidden" }}>
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
              <div key={l} style={{ background: "#fff", border: `2.5px solid ${C.ink}`, borderRadius: 18, padding: "24px 22px", textAlign: "center", boxShadow: "5px 5px 0 rgba(26,26,24,0.92)" }}>
                <div className="font-display" style={{ fontSize: 36, color: C.amber, letterSpacing: "-1px" }}>{v}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, color: C.inkSoft, textTransform: "uppercase", marginTop: 8 }}>{l}</div>
              </div>
            ))}
          </div>

          <div className="reveal" style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 24, justifyContent: "center" }}>
            <Link to="/investors" className="btn-bold font-display" style={{ background: C.ink, color: "#fff", padding: "14px 22px", borderRadius: 12, fontSize: 14.5, textDecoration: "none" }}>{t("about_for_inv")}</Link>
            <Link to="/contact" className="btn-bold font-display" style={{ background: C.amber, color: C.ink, padding: "14px 22px", borderRadius: 12, fontSize: 14.5, textDecoration: "none" }}>{t("cta_talk_founder")}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
