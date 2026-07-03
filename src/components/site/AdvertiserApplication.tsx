import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

/* ───────────────────────── Constants ───────────────────────── */

const BUSINESS_TYPES = [
  "Retail Shop", "Restaurant / Café", "Pharmacy / Healthcare", "Clothing / Fashion",
  "Supermarket / Grocery", "Bank / Finance", "Telecom / Tech", "Education",
  "Beauty / Salon", "Hotel / Hospitality", "Event / Entertainment", "Other",
] as const;


const TIERS = [
  { id: "PIONEER", price: "LKR 25–35k/mo", desc: "Founding partner — full fleet, exclusive to your category", term: "3-month min" },
  { id: "ROAMER", price: "LKR 25k/mo", desc: "Up to 5 tuk-tuks in your area", term: "3-month min" },
  { id: "VOYAGER", price: "LKR 38k/mo", desc: "Up to 15 tuk-tuks across Colombo", term: "3-month min" },
  { id: "HORIZON", price: "LKR 65k+/mo", desc: "15 to 100+ tuk-tuks, enterprise terms", term: "Negotiated" },
] as const;

const CREATIVE_OPTIONS = [
  { value: "yes", label: "Yes, I have a video or image ready" },
  { value: "no", label: "No — I'll need help creating one" },
] as const;

const CAMPAIGN_GOALS = [
  "Drive foot traffic", "Build brand awareness", "Promote an event",
  "Launch a new product", "Ongoing visibility",
] as const;

const BUDGET_OPTIONS = [
  "Under LKR 20k", "LKR 20–35k", "LKR 35–65k", "LKR 65k+", "Flexible — show me options",
] as const;

const REFERRAL_OPTIONS = [
  "WhatsApp", "Word of mouth", "Social media", "Saw a tuk-tuk screen",
  "Google search", "Referred by someone", "Other",
] as const;

/* ───────────────────────── Validation ───────────────────────── */

const submitSchema = z.object({
  business_name: z.string().trim().min(1).max(200),
  contact_name: z.string().trim().min(1).max(200),
  whatsapp_number: z.string().trim().min(4).max(40),
  business_type: z.string().min(1).max(80),
  tier_interest: z.string().max(40).nullable(),
  has_creative: z.boolean().nullable(),
  campaign_goals: z.array(z.string()).max(10),
  budget_range: z.string().max(80).nullable(),
  referral_source: z.string().max(80).nullable(),
});

/* ───────────────────────── Styles ───────────────────────── */

const labelStyle: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: 11,
  letterSpacing: "0.18em",
  color: "var(--ink-mute)",
  textTransform: "uppercase",
  fontWeight: 700,
};

const helperStyle: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: 11,
  color: "var(--ink-mute)",
  marginTop: 6,
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

/* ───────────────────────── Pill ───────────────────────── */

function Pill({
  active, onClick, children, size = "md",
}: { active: boolean; onClick: () => void; children: React.ReactNode; size?: "sm" | "md" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        border: active ? "2px solid var(--ink)" : "2px solid var(--ink-mute)",
        background: active ? "var(--accent)" : "transparent",
        color: active ? "var(--accent-ink, var(--ink))" : "var(--ink-soft)",
        borderRadius: "var(--radius-pill)",
        padding: size === "sm" ? "6px 12px" : "9px 16px",
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: size === "sm" ? 13 : 14,
        fontWeight: 600,
        cursor: "pointer",
        transition: "background 0.15s ease, border-color 0.15s ease, color 0.15s ease",
      }}
    >
      {children}
    </button>
  );
}

/* ───────────────────────── Progress ───────────────────────── */

function Progress({ step }: { step: 1 | 2 | 3 }) {
  const labels = ["Your Business", "Your Campaign", "Confirm"];
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        {labels.map((_, i) => {
          const idx = i + 1;
          const completed = idx < step;
          const current = idx === step;
          return (
            <div key={idx} style={{ display: "flex", alignItems: "center", flex: idx === labels.length ? 0 : 1, gap: 8 }}>
              <div style={{
                width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                background: completed ? "var(--accent)" : current ? "var(--ink)" : "transparent",
                border: !completed && !current ? "2px solid var(--ink-mute)" : "2px solid var(--ink)",
                color: completed || current ? "#fff" : "var(--ink-mute)",
                fontFamily: "'Space Mono', monospace",
                fontSize: 12, fontWeight: 700,
                transition: "background 0.2s ease",
              }}>
                {completed ? (
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="4 12 10 18 20 6" />
                  </svg>
                ) : idx}
              </div>
              {idx !== labels.length && (
                <div style={{
                  flex: 1, height: 2,
                  background: completed ? "var(--accent)" : "color-mix(in oklab, var(--ink-mute) 30%, transparent)",
                  transition: "background 0.2s ease",
                }} />
              )}
            </div>
          );
        })}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", marginTop: 10 }}>
        {labels.map((l, i) => (
          <div key={l} style={{
            fontFamily: "'Space Mono', monospace", fontSize: 11, color: "var(--ink-mute)",
            textAlign: i === 0 ? "left" : i === labels.length - 1 ? "right" : "center",
            letterSpacing: "0.06em",
          }}>{l}</div>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── Form state ───────────────────────── */

type FormState = {
  business_name: string;
  contact_name: string;
  whatsapp_number: string;
  business_type: string;
  tier_interest: string | null; // null = undecided
  tier_undecided: boolean;
  has_creative: boolean | null;
  campaign_goals: string[];
  budget_range: string | null;
  referral_source: string | null;
};

const initialState: FormState = {
  business_name: "",
  contact_name: "",
  whatsapp_number: "",
  business_type: "",
  tier_interest: null,
  tier_undecided: false,
  has_creative: null,
  campaign_goals: [],
  budget_range: null,
  referral_source: null,
};

/* ───────────────────────── Card heading ───────────────────────── */

function StepHead({ title, sub }: { title: string; sub: string }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.01em" }}>
        {title}
      </div>
      <div style={{ fontSize: 14, color: "var(--ink-soft)", marginTop: 4, lineHeight: 1.5 }}>{sub}</div>
    </div>
  );
}

/* ───────────────────────── Component ───────────────────────── */

export function AdvertiserApplication() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [state, setState] = useState<FormState>(initialState);
  const [agree, setAgree] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refCode, setRefCode] = useState<string | null>(null);
  const [preselectedTier, setPreselectedTier] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Read ?tier= from URL and pre-select matching tier card on mount.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const t = new URLSearchParams(window.location.search).get("tier");
    if (!t) return;
    const match = TIERS.find((x) => x.id.toLowerCase() === t.toLowerCase());
    if (match) {
      setState((s) => ({ ...s, tier_interest: match.id, tier_undecided: false }));
      setPreselectedTier(match.id);
    }
  }, []);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setState((s) => ({ ...s, [k]: v }));

  const toggleGoal = (g: string) => set("campaign_goals",
    state.campaign_goals.includes(g) ? state.campaign_goals.filter((x) => x !== g) : [...state.campaign_goals, g]);

  const step1Valid = useMemo(() => (
    state.business_name.trim().length > 0 &&
    state.contact_name.trim().length > 0 &&
    state.whatsapp_number.trim().length >= 4 &&
    state.business_type.length > 0
  ), [state]);

  const step2Valid = useMemo(() => (
    (state.tier_interest !== null || state.tier_undecided) &&
    state.has_creative !== null
  ), [state]);

  if (!mounted) {
    return <div style={{ minHeight: 520 }} aria-hidden="true" />;
  }

  async function onSubmit() {
    setError(null);
    const payload = {
      business_name: state.business_name.trim(),
      contact_name: state.contact_name.trim(),
      whatsapp_number: state.whatsapp_number.trim(),
      business_type: state.business_type,
      zones_selected: state.zones_selected,
      tier_interest: state.tier_undecided ? "undecided" : state.tier_interest,
      has_creative: state.has_creative,
      campaign_goals: state.campaign_goals,
      budget_range: state.budget_range,
      referral_source: state.referral_source,
    };
    const parsed = submitSchema.safeParse(payload);
    if (!parsed.success) {
      setError("Please complete every required field.");
      return;
    }
    setSubmitting(true);
    const { error: dbError } = await supabase
      .from("advertiser_applications")
      .insert(parsed.data);
    setSubmitting(false);
    if (dbError) {
      setError("Something went wrong — please try again or WhatsApp us directly.");
      return;
    }
    const code = String(Math.floor(1000 + Math.random() * 9000));
    setRefCode(`MYD-${code}`);
  }

  /* ─────────── Success state ─────────── */

  if (refCode) {
    return (
      <div style={cardStyle}>
        <style>{`
          @keyframes adv-pop {
            0% { transform: scale(0); opacity: 0; }
            60% { transform: scale(1.15); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          @media (prefers-reduced-motion: reduce) {
            .adv-success-icon { animation: none !important; transform: none !important; }
          }
          .adv-success-icon { animation: adv-pop 520ms cubic-bezier(0.34,1.56,0.64,1) both; }
        `}</style>
        <div style={{ textAlign: "center", padding: "8px 0" }}>
          <div className="adv-success-icon" style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 76, height: 76, borderRadius: "50%",
            background: "var(--accent)", border: "2px solid var(--ink)",
            boxShadow: "var(--sticker)",
          }}>
            <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="var(--ink)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="4 12 10 18 20 6" />
            </svg>
          </div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 600, color: "var(--ink)", marginTop: 22, letterSpacing: "-0.01em" }}>
            Application received.
          </div>
          <p style={{ fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.55, marginTop: 10, maxWidth: 380, marginLeft: "auto", marginRight: "auto" }}>
            We'll WhatsApp you within 24 hours. Keep an eye on {state.whatsapp_number}.
          </p>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "var(--ink-mute)", marginTop: 18, letterSpacing: "0.1em" }}>
            Application ref: {refCode}
          </div>
        </div>
      </div>
    );
  }

  /* ─────────── Form body ─────────── */

  return (
    <div style={cardStyle}>
      <style>{`
        .adv-input:focus { transform: translate(-1px, -1px); box-shadow: var(--sticker) !important; }
      `}</style>

      <Progress step={step} />

      {/* STEP 1 */}
      {step === 1 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16, textAlign: "left" }}>
          <StepHead title="Tell us about your business." sub="Takes 2 minutes. No payment now." />

          <label style={fieldGroup}>
            <span style={labelStyle}>Business name</span>
            <input className="adv-input" style={inputStyle} required maxLength={200} placeholder="e.g. Galle Road Pharmacy"
              value={state.business_name} onChange={(e) => set("business_name", e.target.value)} />
          </label>

          <label style={fieldGroup}>
            <span style={labelStyle}>Your name</span>
            <input className="adv-input" style={inputStyle} required maxLength={200} placeholder="Your full name"
              value={state.contact_name} onChange={(e) => set("contact_name", e.target.value)} />
          </label>

          <label style={fieldGroup}>
            <span style={labelStyle}>WhatsApp number</span>
            <input className="adv-input" style={inputStyle} required inputMode="tel" maxLength={40} placeholder="+94 77 000 0000"
              value={state.whatsapp_number} onChange={(e) => set("whatsapp_number", e.target.value)} />
            <span style={helperStyle}>We'll send your application confirmation here</span>
          </label>

          <label style={fieldGroup}>
            <span style={labelStyle}>Business type</span>
            <select className="adv-input" style={inputStyle} required value={state.business_type}
              onChange={(e) => set("business_type", e.target.value)}>
              <option value="" disabled>Select…</option>
              {BUSINESS_TYPES.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </label>

          <div style={fieldGroup}>
            <span style={labelStyle}>Which neighbourhoods matter to you?</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
              {ZONES.map((z) => (
                <Pill key={z} active={state.zones_selected.includes(z)} onClick={() => toggleZone(z)}>{z}</Pill>
              ))}
            </div>
            <span style={helperStyle}>Select all that apply</span>
          </div>

          <button type="button" disabled={!step1Valid} onClick={() => setStep(2)}
            className="btn-bold font-display"
            style={{ ...primaryBtn, width: "100%", marginTop: 8, opacity: step1Valid ? 1 : 0.55, cursor: step1Valid ? "pointer" : "not-allowed" }}>
            Next →
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 18, textAlign: "left" }}>
          <StepHead title="What are you trying to achieve?" sub="This helps us recommend the right package." />

          <div style={fieldGroup}>
            <span style={labelStyle}>Which tier interests you?</span>
            {preselectedTier && (
              <div style={{
                fontFamily: "'Space Mono', monospace", fontSize: 12,
                color: "var(--accent-deep)", marginTop: 4, letterSpacing: "0.04em",
              }}>
                You selected {preselectedTier} — you can change this below.
              </div>
            )}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
              gap: 10, marginTop: 4,
            }}>
              {TIERS.map((t) => {
                const active = !state.tier_undecided && state.tier_interest === t.id;
                return (
                  <button key={t.id} type="button"
                    onClick={() => { set("tier_interest", t.id); set("tier_undecided", false); }}
                    style={{
                      textAlign: "left", padding: 14, borderRadius: 14,
                      border: active ? "2px solid var(--accent)" : "2px solid var(--ink-mute)",
                      background: active ? "var(--accent-soft)" : "transparent",
                      boxShadow: active ? "var(--sticker-press)" : "none",
                      cursor: "pointer", transition: "background 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease",
                    }}>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, color: "var(--accent-deep)", letterSpacing: "0.18em" }}>{t.id}</div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 600, color: "var(--ink)", marginTop: 6 }}>{t.price}</div>
                    <div style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 6, lineHeight: 1.4 }}>{t.desc}</div>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "var(--ink-mute)", marginTop: 8, letterSpacing: "0.1em" }}>{t.term}</div>
                  </button>
                );
              })}
            </div>
            <button type="button"
              onClick={() => { set("tier_undecided", true); set("tier_interest", null); }}
              style={{
                background: "transparent", border: 0, padding: 0, marginTop: 10, alignSelf: "flex-start",
                color: state.tier_undecided ? "var(--accent-deep)" : "var(--ink-soft)",
                fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600,
                textDecoration: "underline", cursor: "pointer",
              }}>
              Not sure yet — help me choose
            </button>
          </div>

          <div style={fieldGroup}>
            <span style={labelStyle}>Do you have an ad creative ready?</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
              {CREATIVE_OPTIONS.map((o) => (
                <Pill key={o.value} active={state.has_creative === (o.value === "yes")} onClick={() => set("has_creative", o.value === "yes")}>
                  {o.label}
                </Pill>
              ))}
            </div>
          </div>

          <div style={fieldGroup}>
            <span style={labelStyle}>Campaign goal</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
              {CAMPAIGN_GOALS.map((g) => (
                <Pill key={g} active={state.campaign_goals.includes(g)} onClick={() => toggleGoal(g)}>{g}</Pill>
              ))}
            </div>
            <span style={helperStyle}>Select all that apply</span>
          </div>

          <div style={fieldGroup}>
            <span style={labelStyle}>Monthly budget comfort</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
              {BUDGET_OPTIONS.map((b) => (
                <Pill key={b} active={state.budget_range === b} onClick={() => set("budget_range", state.budget_range === b ? null : b)}>{b}</Pill>
              ))}
            </div>
          </div>

          <label style={fieldGroup}>
            <span style={labelStyle}>How did you hear about mydiio?</span>
            <select className="adv-input" style={inputStyle} value={state.referral_source ?? ""}
              onChange={(e) => set("referral_source", e.target.value || null)}>
              <option value="">Select…</option>
              {REFERRAL_OPTIONS.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </label>

          <div style={{ display: "flex", gap: 10, marginTop: 6, flexWrap: "wrap" }}>
            <button type="button" onClick={() => setStep(1)} style={ghostBtn}>← Back</button>
            <button type="button" disabled={!step2Valid} onClick={() => setStep(3)}
              className="btn-bold font-display"
              style={{ ...primaryBtn, flex: 1, opacity: step2Valid ? 1 : 0.55, cursor: step2Valid ? "pointer" : "not-allowed" }}>
              Next →
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 18, textAlign: "left" }}>
          <StepHead title="You're almost in." sub="Review your application before submitting." />

          <div style={{
            background: "var(--bg2)", border: "2px solid var(--ink-mute)",
            borderRadius: 14, padding: "16px 20px",
            display: "flex", flexDirection: "column", gap: 14,
          }}>
            <SummaryRow label="Business" value={state.business_name} />
            <SummaryRow label="Contact" value={state.contact_name} />
            <SummaryRow label="WhatsApp" value={state.whatsapp_number} />
            <SummaryRow label="Business type" value={state.business_type} />
            <div>
              <div style={labelStyle}>Zones</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 6 }}>
                {state.zones_selected.map((z) => (
                  <span key={z} style={{
                    background: "var(--accent-soft)", border: "1.5px solid var(--accent-deep)",
                    color: "var(--accent-deep)", borderRadius: "var(--radius-pill)",
                    padding: "3px 10px", fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 12, fontWeight: 600,
                  }}>{z}</span>
                ))}
              </div>
            </div>
            <SummaryRow label="Tier interest" value={state.tier_undecided ? "Undecided — help me choose" : (state.tier_interest ?? "—")} />
            <SummaryRow label="Creative ready" value={state.has_creative === true ? "Yes" : state.has_creative === false ? "No — needs help" : "—"} />
            {state.campaign_goals.length > 0 && <SummaryRow label="Goals" value={state.campaign_goals.join(" · ")} />}
            {state.budget_range && <SummaryRow label="Budget" value={state.budget_range} />}
            {state.referral_source && <SummaryRow label="Heard via" value={state.referral_source} />}
          </div>

          <p style={{
            fontFamily: "'Space Mono', monospace", fontSize: 12, color: "var(--ink-mute)",
            lineHeight: 1.55, margin: 0, letterSpacing: "0.04em",
          }}>
            No payment is taken now. A member of the mydiio team will contact you on WhatsApp within 24 hours to discuss your application.
          </p>

          <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
            <input
              type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)}
              style={{
                width: 20, height: 20, marginTop: 2,
                accentColor: "var(--accent)", flexShrink: 0,
                border: "2px solid var(--ink)", borderRadius: 4, cursor: "pointer",
              }}
            />
            <span style={{ fontSize: 14, color: "var(--ink)", fontWeight: 500, lineHeight: 1.5 }}>
              I understand this is an application — not a confirmed booking.
            </span>
          </label>

          {error && (
            <div style={{
              fontFamily: "'Space Mono', monospace", fontSize: 12,
              color: "var(--red, #C0392B)", letterSpacing: "0.04em",
            }}>{error}</div>
          )}

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button type="button" onClick={() => setStep(2)} style={ghostBtn} disabled={submitting}>← Back</button>
            <button type="button" disabled={!agree || submitting} onClick={onSubmit}
              className="btn-bold font-display"
              style={{ ...primaryBtn, flex: 1, opacity: !agree || submitting ? 0.55 : 1, cursor: !agree || submitting ? "not-allowed" : "pointer" }}>
              {submitting ? "Submitting…" : "Submit application →"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ───────────────────────── Helpers ───────────────────────── */

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={labelStyle}>{label}</div>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: "var(--ink)", marginTop: 4, fontWeight: 500, wordBreak: "break-word" }}>
        {value}
      </div>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  background: "var(--paper)",
  border: "2px solid var(--ink)",
  borderRadius: 26,
  padding: "clamp(26px, 4vw, 44px)",
  boxShadow: "var(--sticker-lg)",
  maxWidth: 620,
  margin: "0 auto",
};

const primaryBtn: React.CSSProperties = {
  background: "var(--accent)",
  color: "var(--ink)",
  padding: "14px 22px",
  fontSize: 15,
  fontWeight: 600,
  transition: "background 0.2s ease",
};

const ghostBtn: React.CSSProperties = {
  background: "transparent",
  border: "2px solid var(--ink)",
  borderRadius: "var(--radius-pill)",
  padding: "12px 20px",
  fontSize: 14,
  fontWeight: 600,
  color: "var(--ink)",
  fontFamily: "'Space Grotesk', sans-serif",
  cursor: "pointer",
};

export default AdvertiserApplication;
