import { useState } from "react";
import { z } from "zod";
import { C } from "./theme";

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

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "13px 15px", borderRadius: 11,
  border: `2.5px solid ${C.ink}`, background: "#fff",
  fontWeight: 600, fontSize: 14.5, color: C.ink, outline: "none",
  boxShadow: "3px 3px 0 rgba(26,26,24,0.92)",
  fontFamily: "'DM Sans', sans-serif",
};

export function WaitlistForm({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
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
    const { error: insertError } = await supabase.from("enquiries").insert({
      source: "website",
      sender_type: "prospect",
      user_id: null,
      status: "new",
      sender_name: `${v.businessName} (${v.yourName})`,
      sender_contact: v.whatsapp,
      subject: `Waitlist — ${v.businessName}`,
      message: `Business type: ${v.businessType}. Preferred tier: ${v.tier}.`,
    });
    setSubmitting(false);
    if (insertError) {
      setError("Could not submit. Please try again or message us on WhatsApp.");
      return;
    }
    setDone(true);
  }

  const labelColor = variant === "dark" ? "rgba(255,255,255,0.85)" : C.inkSoft;

  if (done) {
    return (
      <div style={{
        background: "#fff", border: `2.5px solid ${C.ink}`, borderRadius: 18,
        padding: "32px 26px", boxShadow: `8px 8px 0 ${C.ink}`,
        textAlign: "center", maxWidth: 520, margin: "0 auto",
      }}>
        <div className="font-display" style={{ fontSize: 22, color: C.ink, lineHeight: 1.2 }}>
          You're on the waiting list.
        </div>
        <p style={{ marginTop: 10, color: C.inkSoft, fontWeight: 600, fontSize: 14.5, lineHeight: 1.55 }}>
          We'll WhatsApp you within 24 hours to confirm your spot.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} style={{
      background: "#fff", border: `2.5px solid ${C.ink}`, borderRadius: 20,
      padding: "clamp(22px, 3.4vw, 32px)", boxShadow: `8px 8px 0 ${C.ink}`,
      display: "flex", flexDirection: "column", gap: 12,
      maxWidth: 560, margin: "0 auto", textAlign: "left",
    }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <input name="businessName" placeholder="Business name" required maxLength={120} style={inputStyle} />
        <input name="yourName" placeholder="Your name" required maxLength={120} style={inputStyle} />
      </div>
      <input name="whatsapp" placeholder="WhatsApp number (e.g. +94 77 123 4567)" required maxLength={40} style={inputStyle} inputMode="tel" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <select name="businessType" required defaultValue="" style={inputStyle}>
          <option value="" disabled>Business type</option>
          {BUSINESS_TYPES.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
        <select name="tier" required defaultValue="" style={inputStyle}>
          <option value="" disabled>Preferred tier</option>
          {TIERS.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      {error && (
        <div style={{ fontSize: 13, color: "#B23B3B", fontWeight: 700 }}>{error}</div>
      )}
      <button type="submit" disabled={submitting} className="btn-bold font-display" style={{
        background: C.amber, color: C.ink, padding: "15px 22px", borderRadius: 12,
        fontSize: 15.5, border: `2.5px solid ${C.ink}`, cursor: submitting ? "wait" : "pointer",
        marginTop: 6, opacity: submitting ? 0.7 : 1,
      }}>
        {submitting ? "Submitting…" : "Join the waiting list →"}
      </button>
      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10.5, color: labelColor === C.inkSoft ? C.inkSoft : C.inkSoft, letterSpacing: 1.4, textAlign: "center", marginTop: 4, textTransform: "uppercase" }}>
        No payment now · 10 Pioneer spots
      </p>
    </form>
  );
}
