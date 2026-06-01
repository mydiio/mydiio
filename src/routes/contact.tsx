import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { SiteShell } from "@/components/site/SiteShell";
import { C } from "@/components/site/theme";

const ENQUIRY_ENDPOINT = "https://rxdvlevzsxemanlfyqin.supabase.co/functions/v1/submit-enquiry";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — mydiio | Book a Campaign or Talk To Founder" },
      { name: "description", content: "Talk to the mydiio team. Book a campaign, investor inquiry, or driver signup. Based in Colombo." },
      { property: "og:title", content: "Contact — mydiio" },
      { property: "og:description", content: "Book a campaign, investor inquiry, or driver signup." },
    ],
  }),
});

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "14px 16px", borderRadius: 12,
  border: `2.5px solid ${C.ink}`, background: "#fff",
  fontWeight: 600, fontSize: 15, color: C.ink, outline: "none",
  boxShadow: "3px 3px 0 rgba(26,26,24,0.92)",
};

function ContactPage() {
  const { t } = useI18n();
  const [intent, setIntent] = useState<"campaign" | "investor" | "driver">("campaign");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim().slice(0, 200);
    const company = String(fd.get("company") || "").trim().slice(0, 200);
    const email = String(fd.get("email") || "").trim().slice(0, 200);
    const message = String(fd.get("message") || "").trim().slice(0, 4000);
    const subjectLabel = intent === "campaign" ? t("contact_intent_book") : intent === "investor" ? t("contact_intent_inv") : t("contact_intent_dr");
    if (!name || !email || !message) return;
    setSubmitting(true);
    try {
      const res = await fetch(ENQUIRY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender_name: company ? `${name} — ${company}` : name,
          sender_contact: email,
          subject: `${subjectLabel} — ${company || name}`.slice(0, 300),
          message,
          source: "website",
          sender_type: "prospect",
        }),
      });
      setSubmitting(false);
      if (!res.ok) {
        setError("Something went wrong — please try again or contact us directly.");
        return;
      }
      setSubmitted(true);
    } catch {
      setSubmitting(false);
      setError("Something went wrong — please try again or contact us directly.");
    }
  }

  return (
    <SiteShell accent="amber">
      <section style={{ padding: "clamp(120px, 14vw, 160px) clamp(22px, 6vw, 80px) clamp(60px, 9vw, 110px)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: C.amberDeep, textTransform: "uppercase" }}>{t("contact_kicker")}</span>
            <h1 className="font-display" style={{ fontSize: "clamp(34px, 5.4vw, 56px)", color: C.ink, lineHeight: 1.06, letterSpacing: "-1.2px", marginTop: 14 }}>
              {t("contact_title")}
            </h1>
            <p style={{ fontSize: 17, color: C.inkSoft, lineHeight: 1.6, marginTop: 16, fontWeight: 500 }}>
              {t("contact_sub")}
            </p>
          </div>

          <div className="reveal" style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 28 }}>
            {([
              ["campaign", t("contact_intent_book")],
              ["investor", t("contact_intent_inv")],
              ["driver", t("contact_intent_dr")],
            ] as const).map(([k, l]) => (
              <button
                key={k}
                onClick={() => setIntent(k as typeof intent)}
                className="font-display"
                style={{
                  padding: "11px 18px", borderRadius: 11, fontSize: 13.5,
                  border: `2.5px solid ${C.ink}`,
                  background: intent === k ? C.amber : "#fff",
                  color: C.ink, cursor: "pointer",
                  boxShadow: intent === k ? "3px 3px 0 rgba(26,26,24,0.92)" : "none",
                  transition: "all 0.2s ease",
                }}
              >
                {l}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="reveal" style={{
            background: "#fff", border: `2.5px solid ${C.ink}`, borderRadius: 22,
            padding: "clamp(28px, 4vw, 44px)", boxShadow: "8px 8px 0 rgba(26,26,24,0.92)",
            display: "flex", flexDirection: "column", gap: 16,
          }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <input name="name" placeholder={t("contact_name")} required style={inputStyle} />
              <input name="company" placeholder={t("contact_company")} style={inputStyle} />
            </div>
            <input name="email" type="email" placeholder={t("contact_email")} required style={inputStyle} />
            <textarea name="message" placeholder={t("contact_message")} rows={5} required style={{ ...inputStyle, resize: "vertical", minHeight: 120 }} />
            <button type="submit" disabled={submitting} className="btn-bold font-display" style={{ background: C.amber, color: C.ink, padding: "16px 22px", borderRadius: 12, fontSize: 15.5, border: `2.5px solid ${C.ink}`, cursor: submitting ? "wait" : "pointer", marginTop: 8, opacity: submitting ? 0.7 : 1 }}>
              {submitting ? "Sending…" : t("contact_send")}
            </button>
            {error && (
              <p style={{ fontSize: 13, color: "#B23B3B", fontWeight: 700, textAlign: "center" }}>{error}</p>
            )}
            {submitted && (
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: C.amberDeep, letterSpacing: 1.5, textAlign: "center" }}>
                {t("contact_opening")}
              </p>
            )}
          </form>

          <div className="reveal" style={{ marginTop: 36, textAlign: "center" }}>
            <a
              href="https://wa.me/94000000000"
              target="_blank"
              rel="noreferrer"
              className="btn-bold font-display"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, background: C.green, color: "#fff", padding: "14px 22px", borderRadius: 12, fontSize: 14.5, textDecoration: "none" }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
              {t("contact_wa")}
            </a>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
