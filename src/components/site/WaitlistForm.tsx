import { useEffect, useState } from "react";
import { z } from "zod";

const ENQUIRY_ENDPOINT = "https://rxdvlevzsxemanlfyqin.supabase.co/functions/v1/submit-enquiry";

const schema = z.object({
  businessName: z.string().trim().min(1, "Business name is required").max(120),
  yourName: z.string().trim().min(1, "Your name is required").max(120),
  whatsapp: z.string().trim().min(6, "WhatsApp number is required").max(40),
  businessType: z.string().trim().min(1, "Pick a business type").max(80),
  tier: z.string().trim().min(1, "Pick a preferred tier").max(80),
});

const BUSINESS_TYPES = ["Restaurant / Café", "Pharmacy", "Retail / Shop", "Services", "E-commerce", "Real estate", "Education", "Other"];
const TIERS = ["Pioneer — LKR 25–35k", "Roamer — LKR 20k", "Voyager — LKR 32k", "Horizon — LKR 65k+", "Not sure yet"];

const labelStyle: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: 11,
  letterSpacing: "0.18em",
  color: "var(--ink-mute)",
  textTransform: "uppercase",
  fontWeight: 700,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "13px 15px",
  borderRadius: "var(--radius-sm)",
  border: "2px solid var(--ink)",
  background: "var(--bg)",
  fontWeight: 600,
  fontSize: 15,
  color: "var(--ink)",
  outline: "none",
  boxShadow: "var(--sticker-press)",
  fontFamily: "'Space Grotesk', sans-serif",
  transition: "transform 0.18s ease, box-shadow 0.18s ease",
};

const fieldGroup: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 6 };

export function WaitlistForm({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setDone(false), 2500);
    return () => clearTimeout(t);
  }, [done]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const parsed = schema.safeParse({
      businessName: fd.get("businessName"),
      yourName: fd.get("yourName"),
      whatsapp: fd.get("whatsapp"),
      businessType: fd.get("businessType"),
      tier: fd.get("tier"),
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please complete every field.");
      return;
    }
    const v = parsed.data;
    setSubmitting(true);
    try {
      const res = await fetch(ENQUIRY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender_name: `${v.businessName} — ${v.yourName}`,
          sender_contact: v.whatsapp,
          subject: `Waitlist — ${v.businessType} — ${v.tier}`,
          message: `Business name: ${v.businessName}. Your name: ${v.yourName}. Business type: ${v.businessType}. Preferred tier: ${v.tier}.`,
          source: "website",
          sender_type: "prospect",
        }),
      });
      setSubmitting(false);
      if (!res.ok) {
        setError("Something went wrong — please try again or contact us directly.");
        return;
      }
      setDone(true);
      form.reset();
    } catch {
      setSubmitting(false);
      setError("Something went wrong — please try again or contact us directly.");
    }
  }

  return (
    <form onSubmit={onSubmit} style={{
      background: "var(--paper)",
      border: "2px solid var(--ink)",
      borderRadius: 26,
      padding: "clamp(26px, 4vw, 44px)",
      boxShadow: "var(--sticker-lg)",
      display: "flex", flexDirection: "column", gap: 16,
      maxWidth: 620, margin: "0 auto", textAlign: "left",
    }}>
      <style>{`
        .wl-input:focus { transform: translate(-1px, -1px); box-shadow: var(--sticker) !important; }
      `}</style>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: 14 }}>
        <label style={fieldGroup}>
          <span style={labelStyle}>Business name</span>
          <input className="wl-input" name="businessName" required maxLength={120} style={inputStyle} placeholder="Your brand" />
        </label>
        <label style={fieldGroup}>
          <span style={labelStyle}>Your name</span>
          <input className="wl-input" name="yourName" required maxLength={120} style={inputStyle} placeholder="Full name" />
        </label>
      </div>

      <label style={fieldGroup}>
        <span style={labelStyle}>WhatsApp / Phone</span>
        <input className="wl-input" name="whatsapp" required maxLength={40} style={inputStyle} inputMode="tel" placeholder="+94 77 000 0000" />
      </label>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: 14 }}>
        <label style={fieldGroup}>
          <span style={labelStyle}>Business type</span>
          <select className="wl-input" name="businessType" required defaultValue="" style={inputStyle}>
            <option value="" disabled>Select…</option>
            {BUSINESS_TYPES.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </label>
        <label style={fieldGroup}>
          <span style={labelStyle}>Preferred tier</span>
          <select className="wl-input" name="tier" required defaultValue="" style={inputStyle}>
            <option value="" disabled>Select…</option>
            {TIERS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </label>
      </div>

      {error && (
        <div style={{ fontSize: 13, color: "#B23B3B", fontWeight: 700 }}>{error}</div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="btn-bold font-display"
        style={{
          width: "100%",
          background: done ? "var(--green)" : "var(--accent)",
          color: done ? "#fff" : "var(--ink)",
          padding: "16px 22px",
          fontSize: 16,
          fontWeight: 600,
          cursor: submitting ? "wait" : "pointer",
          marginTop: 4,
          opacity: submitting ? 0.7 : 1,
          transition: "background 0.25s ease, color 0.25s ease",
        }}
      >
        {done ? "Reserved ✓" : submitting ? "Submitting…" : "Reserve my spot →"}
      </button>

      <p style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: 12,
        color: "var(--ink-mute)",
        letterSpacing: "0.12em",
        textAlign: "center",
        margin: 0,
      }}>
        No payment now · 10 pioneer spots
      </p>
    </form>
  );
}
