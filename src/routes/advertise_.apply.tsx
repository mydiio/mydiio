import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import { C } from "@/components/site/theme";


export const Route = createFileRoute("/advertise_/apply")({
 component: AdvertiseApplyPage,
 head: () => ({
 meta: [
 { title: "Advertiser Application, mydiio" },
 { name: "description", content: "Apply to advertise on Colombo's tuk-tuk screens. Takes 2 minutes. We'll contact you on WhatsApp within 24 hours." },
 { property: "og:title", content: "Advertiser Application, mydiio" },
 { property: "og:description", content: "Apply to advertise on Colombo's tuk-tuk screens." },
 { property: "og:url", content: "https://mydiio.com/advertise/apply" },
 ],
 links: [{ rel: "canonical", href: "https://mydiio.com/advertise/apply" }],
 }),

});

const DRAFT_KEY = "mydiio_adv_app";

const BUSINESS_TYPES = [
 "Retail Shop", "Restaurant", "Café", "Pharmacy", "Healthcare",
 "Clothing", "Fashion", "Supermarket", "Grocery", "Bank",
 "Finance", "Telecom", "Tech", "Education", "Beauty",
 "Salon", "Hotel", "Hospitality", "Event", "Entertainment", "Other",
];



const BUDGETS = ["Under LKR 20k", "LKR 20 to 35k", "LKR 35 to 65k", "LKR 65k+", "Not sure yet"];

const GOALS = ["More customers", "Build awareness", "Promote an event", "Launch something new", "Stay visible year-round"];

const REFERRALS = ["Word of mouth", "Social media", "Saw a tuk-tuk screen", "Google search", "Referred by someone", "WhatsApp", "Other"];

const TIER_MAP: Record<string, { name: string; desc: string }> = {
 "Under LKR 20k": { name: "Let's talk", desc: "We'll find the right entry point for your budget." },
 "LKR 20 to 35k": { name: "Roamer", desc: "Up to 5 tuk-tuks in your area, LKR 25,000/month, 3-month minimum." },
 "LKR 35 to 65k": { name: "Voyager", desc: "Up to 15 tuk-tuks across Colombo, LKR 38,000/month, 3-month minimum." },
 "LKR 65k+": { name: "Horizon", desc: "15 to 100+ tuk-tuks, LKR 65,000+/month, custom terms." },
};

const ALL_TIERS = ["Pioneer", "Roamer", "Voyager", "Horizon", "Not sure, help me choose"];

type Draft = {
 step?: number;
 s1?: { businessName?: string; contactName?: string; email?: string; whatsappNumber?: string; businessType?: string };
 s2?: { budgetRange?: string; tierInterest?: string; showAllTiers?: boolean; campaignGoal?: string; hasCreative?: boolean | null; referralSource?: string };
};

function AdvertiseApplyPage() {
 const navigate = useNavigate();
 const [currentStep, setCurrentStep] = useState(1);
 const [hadDraft, setHadDraft] = useState(false);

 // Step 1
 const [businessName, setBusinessName] = useState("");
 const [contactName, setContactName] = useState("");
 const [email, setEmail] = useState("");
 const [whatsappNumber, setWhatsappNumber] = useState("");
 const [businessType, setBusinessType] = useState("");

 // Step 2
 const [budgetRange, setBudgetRange] = useState("");
 const [tierInterest, setTierInterest] = useState("");
 const [showAllTiers, setShowAllTiers] = useState(false);
 const [campaignGoal, setCampaignGoal] = useState("");
 const [hasCreative, setHasCreative] = useState<boolean | null>(null);
 const [referralSource, setReferralSource] = useState("");

 // Step 3
 const [agreed, setAgreed] = useState(false);
 const [submitting, setSubmitting] = useState(false);
 const [errorMsg, setErrorMsg] = useState("");
 const [duplicateMsg, setDuplicateMsg] = useState("");
 const [successId, setSuccessId] = useState<string | null>(null);

 // Rehydrate
 useEffect(() => {
 try {
 const raw = localStorage.getItem(DRAFT_KEY);
 if (!raw) return;
 const d: Draft = JSON.parse(raw);
 if (d.s1) {
 setBusinessName(d.s1.businessName || "");
 setContactName(d.s1.contactName || "");
 setEmail(d.s1.email || "");
 setWhatsappNumber(d.s1.whatsappNumber || "");
 setBusinessType(d.s1.businessType || "");
 }
 if (d.s2) {
 setBudgetRange(d.s2.budgetRange || "");
 setTierInterest(d.s2.tierInterest || "");
 setShowAllTiers(!!d.s2.showAllTiers);
 setCampaignGoal(d.s2.campaignGoal || "");
 setHasCreative(d.s2.hasCreative ?? null);
 setReferralSource(d.s2.referralSource || "");
 }
 if (d.step && d.step > 1) {
 setCurrentStep(d.step);
 setHadDraft(true);
 }
 } catch {}
 }, []);

 // Save draft
 useEffect(() => {
 if (successId) return;
 const d: Draft = {
 step: currentStep,
 s1: { businessName, contactName, email, whatsappNumber, businessType },
 s2: { budgetRange, tierInterest, showAllTiers, campaignGoal, hasCreative, referralSource },
 };
 try { localStorage.setItem(DRAFT_KEY, JSON.stringify(d)); } catch {}
 }, [currentStep, businessName, contactName, email, whatsappNumber, businessType, budgetRange, tierInterest, showAllTiers, campaignGoal, hasCreative, referralSource, successId]);

 const step1Valid = businessName.trim() && contactName.trim() && email.trim() && whatsappNumber.trim() && businessType;
 const step2Valid = budgetRange && tierInterest && campaignGoal && hasCreative !== null;

 const handleSelectBudget = (b: string) => {
 setBudgetRange(b);
 setShowAllTiers(false);
 if (b === "Not sure yet") setTierInterest("Not sure, help me choose");
 else if (TIER_MAP[b]) setTierInterest(TIER_MAP[b].name);
 };

 async function handleSubmit() {
 if (!agreed || submitting) return;
 setErrorMsg("");
 setDuplicateMsg("");
 setSubmitting(true);
 try {
 const response = await fetch(
 "https://rmqexobhpasitrexvaig.supabase.co/functions/v1/submit-application",
 {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify({
 application_type: "advertiser",
 business_name: businessName,
 contact_name: contactName,
 email: email,
 phone: whatsappNumber,
 business_type: businessType,
 budget_range: budgetRange,
 tier_interest: tierInterest,
 campaign_goal: campaignGoal,
 has_creative: hasCreative,
 referral_source: referralSource,
 }),
 }
 );
 if (!response.ok) {
 setErrorMsg("Something went wrong, please try again.");
 setSubmitting(false);
 return;
 }
 try { localStorage.removeItem(DRAFT_KEY); } catch {}
 setSuccessId("received");
 } catch (e) {
 setErrorMsg("Something went wrong, please try again.");
 setSubmitting(false);
 }
 }

 const startFresh = () => {
 try { localStorage.removeItem(DRAFT_KEY); } catch {}
 window.location.reload();
 };

 return (
 <SiteShell accent="amber">
 <style>{css}</style>
 <section className="section-wrap" style={{ background: C.bg, padding: "clamp(48px, 7vh, 80px) clamp(16px, 4vw, 40px)", maxWidth: "none" }}>
 <div style={{ maxWidth: 720, margin: "0 auto" }}>
 {/* Header */}
 <div style={{ textAlign: "center", marginBottom: 28 }}>
 <div style={{ fontFamily: "Space Mono, monospace", fontSize: 11, color: C.accentDeep, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 10 }}>
 Advertiser application
 </div>
 <h1 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "clamp(32px, 5vw, 52px)", letterSpacing: "-0.03em", color: C.ink, lineHeight: 1.05, margin: 0 }}>
 Tell us about your business.
 </h1>
 <p style={{ color: C.inkSoft, fontSize: 15, maxWidth: "44ch", margin: "10px auto 0", lineHeight: 1.5 }}>
 Takes 2 minutes. No payment now. We'll contact you on WhatsApp within 24 hours.
 </p>
 </div>

 {/* Form Card */}
 <div style={{ maxWidth: 660, margin: "0 auto" }}>
 <button
 type="button"
 onClick={() => navigate({ to: "/contact" })}
 style={{ fontFamily: "Space Mono, monospace", fontSize: 11, color: C.inkMute, background: "none", border: "none", cursor: "pointer", padding: "0 0 14px", display: "block", textDecoration: "underline" }}
 >
 ← Back to contact
 </button>
 <div style={{ background: C.paper, border: `2px solid ${C.ink}`, borderRadius: 22, boxShadow: `6px 6px 0 ${C.ink}`, overflow: "hidden" }}>

 {/* Progress strip */}
 {!successId && (
 <div style={{ background: C.ink, padding: "18px 26px", display: "flex", alignItems: "flex-start" }}>
 {[
 { n: 1, label: "Business" },
 { n: 2, label: "Campaign" },
 { n: 3, label: "Confirm" },
 ].map((s, i, arr) => {
 const state = currentStep > s.n ? "done" : currentStep === s.n ? "active" : "future";
 return (
 <div key={s.n} style={{ display: "contents" }}>
 <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 30 }}>
 <div className={`prog-node prog-${state}`}>
 {state === "done" ? "✓" : s.n}
 </div>
 <div className={`prog-label prog-label-${state}`}>{s.label}</div>
 </div>
 {i < arr.length - 1 && (
 <div style={{ flex: 1, height: 2, background: "rgba(255,255,255,0.1)", margin: "14px 6px 0", position: "relative", overflow: "hidden" }}>
 <div style={{ height: "100%", background: C.accent, width: currentStep > s.n ? "100%" : "0%", transition: "width 0.6s cubic-bezier(0.22,1,0.36,1)" }} />
 </div>
 )}
 </div>
 );
 })}
 </div>
 )}

 {/* Step body */}
 {successId ? (
 <SuccessPanel id={successId} name={contactName} onHome={() => navigate({ to: "/" })} />
 ) : (
 <div key={currentStep} className="step-body" style={{ padding: "26px 24px" }}>
 {hadDraft && currentStep > 1 && (
 <div style={{ background: C.accentSoft, border: `2px solid ${C.accent}`, borderRadius: 12, padding: "10px 14px", marginBottom: 18, fontFamily: "Space Mono, monospace", fontSize: 12, color: C.accentInk, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
 <span>You have a saved draft, continuing from where you left off.</span>
 <button type="button" onClick={startFresh} style={{ background: "transparent", border: "none", color: C.accentDeep, textDecoration: "underline", cursor: "pointer", fontFamily: "inherit", fontSize: 12 }}>
 Start fresh
 </button>
 </div>
 )}

 {currentStep === 1 && (
 <>
 <span className="step-eyebrow">Step 1 of 3</span>
 <h2 className="step-heading">Tell us about your business.</h2>
 <p className="step-sub">Takes 2 minutes. No payment now.</p>

 <div className="two-col">
 <Field label="Business name">
 <input className="fld" type="text" required placeholder="e.g. City Pharma" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
 </Field>
 <Field label="Your name">
 <input className="fld" type="text" required placeholder="Full name" value={contactName} onChange={(e) => setContactName(e.target.value)} />
 </Field>
 <Field label="Email">
 <input className="fld" type="email" required placeholder="you@business.com" value={email} onChange={(e) => setEmail(e.target.value)} />
 </Field>
 </div>

 <Field label="WhatsApp number">
 <input className="fld" type="tel" required placeholder="+94 77 000 0000" value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)} />
 <span className="fld-note">We'll send your confirmation here</span>
 </Field>

 <Field label="Business type">
 <select className="fld" required value={businessType} onChange={(e) => setBusinessType(e.target.value)}>
 <option value="">Select…</option>
 {BUSINESS_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
 </select>
 </Field>

 <button type="button" className="btn-amber" disabled={!step1Valid} onClick={() => setCurrentStep(2)} style={{ marginTop: 8 }}>
 Next →
 </button>
 </>
 )}

 {currentStep === 2 && (
 <>
 <span className="step-eyebrow">Step 2 of 3</span>
 <h2 className="step-heading">What are you trying to achieve?</h2>
 <p className="step-sub">Helps us suggest the right package.</p>

 <Field label="Monthly budget">
 <div className="pill-group">
 {BUDGETS.map((b) => (
 <button key={b} type="button" className={`pill ${budgetRange === b ? "sel" : ""}`} onClick={() => handleSelectBudget(b)}>{b}</button>
 ))}
 </div>
 </Field>

 {budgetRange && budgetRange !== "Not sure yet" && !showAllTiers && TIER_MAP[budgetRange] && (
 <div key={budgetRange} className="tier-suggest" style={{ background: C.accentSoft, border: `2px solid ${C.accent}`, borderRadius: 14, padding: "16px 18px", marginBottom: 18 }}>
 <div style={{ fontFamily: "Space Mono, monospace", fontSize: 10, color: C.accentDeep, letterSpacing: "0.15em" }}>✦ SUGGESTED FOR YOU</div>
 <h4 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: 18, color: C.ink, margin: "4px 0 4px" }}>{TIER_MAP[budgetRange].name}</h4>
 <p style={{ color: C.inkSoft, fontSize: 13, margin: "0 0 10px" }}>{TIER_MAP[budgetRange].desc}</p>
 <div className="pill-group">
 <button type="button" className={`pill ${tierInterest === TIER_MAP[budgetRange].name ? "sel" : ""}`} onClick={() => setTierInterest(TIER_MAP[budgetRange].name)}>Yes, this works</button>
 <button type="button" className="pill" onClick={() => { setShowAllTiers(true); setTierInterest(""); }}>Show all options</button>
 </div>
 </div>
 )}

 {(showAllTiers || budgetRange === "Not sure yet") && (
 <Field label="Choose a tier">
 <div className="pill-group">
 {ALL_TIERS.map((t) => (
 <button key={t} type="button" className={`pill ${tierInterest === t ? "sel" : ""}`} onClick={() => setTierInterest(t)}>{t}</button>
 ))}
 </div>
 </Field>
 )}

 <Field label="Your main goal">
 <div className="pill-group">
 {GOALS.map((g) => (
 <button key={g} type="button" className={`pill ${campaignGoal === g ? "sel" : ""}`} onClick={() => setCampaignGoal(g)}>{g}</button>
 ))}
 </div>
 </Field>

 <Field label="Do you have an ad creative?">
 <div className="pill-group">
 <button type="button" className={`pill ${hasCreative === true ? "sel" : ""}`} onClick={() => setHasCreative(true)}>Yes, I have one ready</button>
 <button type="button" className={`pill ${hasCreative === false ? "sel" : ""}`} onClick={() => setHasCreative(false)}>No, I'll need help making one</button>
 </div>
 </Field>

 <Field label="How did you hear about us? (optional)">
 <select className="fld" value={referralSource} onChange={(e) => setReferralSource(e.target.value)}>
 <option value="">Select…</option>
 {REFERRALS.map((r) => <option key={r} value={r}>{r}</option>)}
 </select>
 </Field>

 <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
 <button type="button" className="btn-ghost" onClick={() => setCurrentStep(1)}>← Back</button>
 <button type="button" className="btn-amber" disabled={!step2Valid} onClick={() => setCurrentStep(3)} style={{ flex: 1 }}>Next →</button>
 </div>
 </>
 )}

 {currentStep === 3 && (
 <>
 <span className="step-eyebrow">Step 3 of 3</span>
 <h2 className="step-heading">Review your application.</h2>
 <p className="step-sub">Check your details before submitting.</p>

 <div style={{ background: C.bg2, border: "2px solid rgba(30,26,21,0.15)", borderRadius: 14, padding: "16px 20px" }}>
 <SummaryRow label="BUSINESS" value={businessName} />
 <SummaryRow label="CONTACT" value={contactName} />
 <SummaryRow label="WHATSAPP" value={whatsappNumber} />
 <SummaryRow label="TIER INTEREST" value={tierInterest} />
 </div>

 <p style={{ fontFamily: "Space Mono, monospace", fontSize: 11, color: C.inkMute, textAlign: "center", margin: "14px 0" }}>
 No payment is taken now. We'll contact you on WhatsApp within 24 hours to discuss your application.
 </p>

 <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", margin: "8px 0 16px" }}>
 <span className={`chk ${agreed ? "chk-on" : ""}`} onClick={() => setAgreed(!agreed)}>{agreed ? "✓" : ""}</span>
 <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 13, color: C.inkSoft }}>I understand this is an application, not a confirmed booking.</span>
 <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} style={{ position: "absolute", opacity: 0, pointerEvents: "none" }} />
 </label>

 {duplicateMsg && (
 <div style={{ background: C.accentSoft, border: `2px solid ${C.accent}`, borderRadius: 12, padding: "10px 14px", marginBottom: 12, fontFamily: "Space Mono, monospace", fontSize: 12, color: C.accentInk }}>
 {duplicateMsg}
 </div>
 )}

 <div style={{ display: "flex", gap: 10 }}>
 <button type="button" className="btn-ghost" onClick={() => setCurrentStep(2)} disabled={submitting}>← Back</button>
 <button type="button" className="btn-amber" disabled={!agreed || submitting} onClick={handleSubmit} style={{ flex: 1 }}>
 {submitting ? "Submitting…" : "Submit application →"}
 </button>
 </div>

 {errorMsg && (
 <div style={{ fontFamily: "Space Mono, monospace", fontSize: 12, color: C.accentDeep, marginTop: 10, textAlign: "center" }}>{errorMsg}</div>
 )}
 </>
 )}
 </div>
 )}
 </div>
 </div>
 </div>



 </section>
 </SiteShell>
 );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
 return (
 <div style={{ marginBottom: 16 }}>
 <label className="fld-label">{label}</label>
 {children}
 </div>
 );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
 return (
 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", gap: 12, borderBottom: "1px dashed rgba(30,26,21,0.1)" }}>
 <span style={{ fontFamily: "Space Mono, monospace", fontSize: 10, color: C.inkMute, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</span>
 <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 14, color: C.ink, textAlign: "right" }}>{value}</span>
 </div>
 );
}

function SuccessPanel({ id, name, onHome }: { id: string; name: string; onHome: () => void }) {
 const first = (name.trim().split(/\s+/)[0]) || "there";
 const ref = id.slice(-4).toUpperCase();
 return (
 <div style={{ padding: "44px 28px", textAlign: "center" }}>
 <div className="check-pop" style={{ width: 64, height: 64, borderRadius: "50%", background: C.green, border: `2px solid ${C.ink}`, boxShadow: `4px 4px 0 ${C.ink}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", color: "#fff", fontSize: 26, fontWeight: 700 }}>✓</div>
 <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: 22, color: C.ink, margin: "0 0 10px" }}>Application received, {first}.</h3>
 <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 14, color: C.inkSoft, maxWidth: 340, margin: "0 auto 12px", lineHeight: 1.5 }}>
 We'll review your application and contact you on WhatsApp within 24 hours.
 </p>
 <div style={{ fontFamily: "Space Mono, monospace", fontSize: 12, color: C.inkMute }}>Ref: ADV-{ref}</div>
 <button type="button" className="btn-amber" onClick={onHome} style={{ maxWidth: 240, margin: "20px auto 0", display: "block", width: "100%" }}>
 Back to homepage →
 </button>
 </div>
 );
}

const css = `
@keyframes prog-pulse {
 0%,100% { box-shadow: 0 0 0 0 rgba(244,166,42,0.3); }
 50% { box-shadow: 0 0 0 7px rgba(244,166,42,0); }
}
@keyframes step-in {
 from { opacity: 0; transform: translateY(12px); }
 to { opacity: 1; transform: translateY(0); }
}
@keyframes check-pop {
 from { transform: scale(0); }
 to { transform: scale(1); }
}
.step-body { animation: step-in 0.3s cubic-bezier(0.22,1,0.36,1); }
.check-pop { animation: check-pop 0.45s cubic-bezier(0.34,1.56,0.64,1); }

.prog-node {
 width: 30px; height: 30px; border-radius: 50%;
 display: flex; align-items: center; justify-content: center;
 font-family: 'Space Mono', monospace; font-size: 12px; font-weight: 700;
 background: transparent;
}
.prog-future { border: 2px solid rgba(255,255,255,0.18); color: rgba(255,255,255,0.28); }
.prog-active { border: 2px solid ${C.accent}; color: ${C.accent}; animation: prog-pulse 2s ease infinite; }
.prog-done { background: ${C.accent}; border: 2px solid ${C.accent}; color: ${C.ink}; }
.prog-label {
 font-family: 'Space Mono', monospace; font-size: 9px;
 text-transform: uppercase; letter-spacing: 0.08em;
 margin-top: 6px; white-space: nowrap;
}
.prog-label-future { color: rgba(255,255,255,0.28); }
.prog-label-active { color: ${C.accent}; }
.prog-label-done { color: rgba(255,255,255,0.55); }

.step-eyebrow {
 font-family: 'Space Mono', monospace; font-size: 10px; font-weight: 700;
 text-transform: uppercase; letter-spacing: 0.2em; color: ${C.accentDeep};
 margin-bottom: 4px; display: block;
}
.step-heading {
 font-family: 'Space Grotesk', sans-serif;
 font-size: clamp(17px, 2.2vw, 20px); font-weight: 700; color: ${C.ink};
 line-height: 1.1; letter-spacing: -0.02em; margin: 0 0 3px;
}
.step-sub { font-size: 13px; color: ${C.inkSoft}; line-height: 1.6; margin: 0 0 22px; }

.fld-label {
 font-family: 'Space Mono', monospace; font-size: 10px; font-weight: 700;
 text-transform: uppercase; letter-spacing: 0.1em; color: ${C.inkSoft};
 margin-bottom: 5px; display: block;
}
.fld {
 width: 100%; padding: 10px 13px; background: ${C.bg};
 border: 2px solid ${C.ink}; border-radius: 10px;
 font-family: 'Space Grotesk', sans-serif; font-size: 14px; color: ${C.ink};
 outline: none; transition: all 0.15s;
}
.fld:focus {
 border-color: ${C.accent}; box-shadow: 2px 2px 0 ${C.accent};
 transform: translate(-1px,-1px); background: ${C.paper};
}
.fld-note {
 font-family: 'Space Mono', monospace; font-size: 10px;
 color: ${C.inkMute}; margin-top: 4px; font-style: italic; display: block;
}

.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; }
.two-col > div { margin-bottom: 0; }
@media (max-width: 480px) { .two-col { grid-template-columns: 1fr; } }

.pill-group { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 5px; }
.pill {
 padding: 7px 14px; border: 2px solid ${C.ink}; border-radius: 9999px;
 font-family: 'Space Mono', monospace; font-size: 11px; font-weight: 700;
 color: ${C.inkSoft}; cursor: pointer; transition: all 0.15s;
 user-select: none; background: transparent;
}
.pill:hover { border-color: ${C.accent}; color: ${C.accentDeep}; transform: translateY(-1px); }
.pill.sel {
 background: ${C.accent}; border-color: ${C.accent}; color: ${C.ink};
 box-shadow: 2px 2px 0 ${C.ink}; transform: translate(-1px,-1px);
}

.btn-amber {
 background: ${C.accent}; color: ${C.ink};
 border: 2px solid ${C.ink}; border-radius: 12px;
 box-shadow: 4px 4px 0 ${C.ink};
 font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 15px;
 padding: 12px 18px; cursor: pointer; transition: all 0.15s;
 width: 100%;
}
.btn-amber:hover:not(:disabled) { transform: translate(-2px,-2px); box-shadow: 6px 6px 0 ${C.ink}; }
.btn-amber:active:not(:disabled) { transform: translate(2px,2px); box-shadow: 1px 1px 0 ${C.ink}; }
.btn-amber:disabled { opacity: 0.45; cursor: not-allowed; }

.btn-ghost {
 background: transparent; color: ${C.ink};
 border: 2px solid ${C.ink}; border-radius: 12px;
 box-shadow: 3px 3px 0 ${C.ink};
 font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 14px;
 padding: 12px 16px; cursor: pointer; transition: all 0.15s;
}
.btn-ghost:hover:not(:disabled) { transform: translate(-2px,-2px); box-shadow: 5px 5px 0 ${C.ink}; }
.btn-ghost:disabled { opacity: 0.45; cursor: not-allowed; }

.chk {
 width: 20px; height: 20px; border: 2px solid ${C.ink}; border-radius: 6px;
 background: transparent; display: inline-flex; align-items: center; justify-content: center;
 font-size: 14px; color: ${C.ink}; font-weight: 700; cursor: pointer; flex-shrink: 0;
 transition: all 0.15s;
}
.chk-on {
 background: ${C.accent}; border-color: ${C.accent};
 box-shadow: 2px 2px 0 ${C.ink}; transform: translate(-1px,-1px);
}
`;
