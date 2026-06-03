import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import { C } from "@/components/site/theme";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/drivers/apply")({
  component: DriversApplyPage,
  head: () => ({
    meta: [
      { title: "Driver Partner Application — mydiio" },
      { name: "description", content: "Join the mydiio driver network. Free screen install, monthly route bonus, payment on the 5th." },
      { property: "og:title", content: "Driver Partner Application — mydiio" },
      { property: "og:description", content: "Join the mydiio driver network." },
    ],
  }),
});

const DRAFT_KEY = "mydiio_drv_app";

const ZONES = ["Fort", "Pettah", "Kollupitiya", "Bambalapitiya", "Wellawatte", "Dehiwala", "Borella", "Nugegoda", "Rajagiriya", "Maharagama"];
const VEHICLE_AGES = ["Less than 2 years", "2–5 years", "5–10 years", "More than 10 years"];
const OWNERSHIPS = ["I own this vehicle", "I rent / lease it", "Family-owned, I operate it"];
const EXPERIENCES = ["Less than 1 year", "1–3 years", "3–5 years", "More than 5 years"];
const LANGUAGES = ["Sinhala", "Tamil", "English"];
const DAYS = ["3–4 days", "5 days", "6 days", "Every day"];
const PLATFORMS = ["PickMe", "inDrive", "Both", "Independent"];
const BANKS = ["Bank of Ceylon", "People's Bank", "Commercial Bank", "Sampath Bank", "HNB", "Seylan Bank", "NDB", "Pan Asia Bank", "Nations Trust Bank", "Other"];

const NIC_REGEX = /^\d{12}$|^\d{9}[vVxX]$/;

type Draft = {
  step?: number;
  s1?: Record<string, any>;
  s2?: Record<string, any>;
  s3?: Record<string, any>;
};

function todayISO() { return new Date().toISOString().slice(0, 10); }
function maxDOB() {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 18);
  return d.toISOString().slice(0, 10);
}
function ageFromDOB(s: string) {
  if (!s) return 0;
  const dob = new Date(s);
  const now = new Date();
  let a = now.getFullYear() - dob.getFullYear();
  const m = now.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) a--;
  return a;
}
function daysFromNow(s: string) {
  if (!s) return Infinity;
  const t = new Date(s).getTime();
  return Math.floor((t - Date.now()) / (1000 * 60 * 60 * 24));
}

function DriversApplyPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [hadDraft, setHadDraft] = useState(false);

  // Step 1 - personal
  const [fullName, setFullName] = useState("");
  const [nicNumber, setNicNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [alternateNumber, setAlternateNumber] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("Sinhala");
  // Step 1 - vehicle
  const [vehicleRegistration, setVehicleRegistration] = useState("");
  const [vehicleColour, setVehicleColour] = useState("");
  const [vehicleAge, setVehicleAge] = useState("");
  const [vehicleOwnership, setVehicleOwnership] = useState("");
  const [licenceNumber, setLicenceNumber] = useState("");
  const [licenceExpiry, setLicenceExpiry] = useState("");
  const [drivingExperience, setDrivingExperience] = useState("");

  // Step 2
  const [dailyHours, setDailyHours] = useState(8);
  const [drivingDays, setDrivingDays] = useState("");
  const [operatingZones, setOperatingZones] = useState<string[]>([]);
  const [platformUsage, setPlatformUsage] = useState<string[]>([]);
  const [referralName, setReferralName] = useState("");

  // Step 3
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [chk1, setChk1] = useState(false);
  const [chk2, setChk2] = useState(false);
  const [chk3, setChk3] = useState(false);

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
      const s1 = d.s1 || {};
      setFullName(s1.fullName || "");
      setNicNumber(s1.nicNumber || "");
      setDateOfBirth(s1.dateOfBirth || "");
      setWhatsappNumber(s1.whatsappNumber || "");
      setAlternateNumber(s1.alternateNumber || "");
      setHomeAddress(s1.homeAddress || "");
      setPreferredLanguage(s1.preferredLanguage || "Sinhala");
      setVehicleRegistration(s1.vehicleRegistration || "");
      setVehicleColour(s1.vehicleColour || "");
      setVehicleAge(s1.vehicleAge || "");
      setVehicleOwnership(s1.vehicleOwnership || "");
      setLicenceNumber(s1.licenceNumber || "");
      setLicenceExpiry(s1.licenceExpiry || "");
      setDrivingExperience(s1.drivingExperience || "");
      const s2 = d.s2 || {};
      setDailyHours(s2.dailyHours ?? 8);
      setDrivingDays(s2.drivingDays || "");
      setOperatingZones(s2.operatingZones || []);
      setPlatformUsage(s2.platformUsage || []);
      setReferralName(s2.referralName || "");
      const s3 = d.s3 || {};
      setBankName(s3.bankName || "");
      setAccountNumber(s3.accountNumber || "");
      setAccountHolderName(s3.accountHolderName || "");
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
      s1: { fullName, nicNumber, dateOfBirth, whatsappNumber, alternateNumber, homeAddress, preferredLanguage, vehicleRegistration, vehicleColour, vehicleAge, vehicleOwnership, licenceNumber, licenceExpiry, drivingExperience },
      s2: { dailyHours, drivingDays, operatingZones, platformUsage, referralName },
      s3: { bankName, accountNumber, accountHolderName },
    };
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify(d)); } catch {}
  }, [currentStep, fullName, nicNumber, dateOfBirth, whatsappNumber, alternateNumber, homeAddress, preferredLanguage, vehicleRegistration, vehicleColour, vehicleAge, vehicleOwnership, licenceNumber, licenceExpiry, drivingExperience, dailyHours, drivingDays, operatingZones, platformUsage, referralName, bankName, accountNumber, accountHolderName, successId]);

  // Validation
  const nicValid = !nicNumber || NIC_REGEX.test(nicNumber);
  const ageValid = !dateOfBirth || ageFromDOB(dateOfBirth) >= 18;
  const licenceDays = useMemo(() => daysFromNow(licenceExpiry), [licenceExpiry]);
  const licenceExpired = licenceExpiry && licenceDays < 0;
  const licenceSoon = licenceExpiry && licenceDays >= 0 && licenceDays <= 90;

  const step1Valid =
    fullName.trim() && nicNumber.trim() && nicValid &&
    dateOfBirth && ageValid &&
    whatsappNumber.trim() && homeAddress.trim() && preferredLanguage &&
    vehicleRegistration.trim() && vehicleColour.trim() && vehicleAge &&
    vehicleOwnership && licenceNumber.trim() && licenceExpiry && !licenceExpired &&
    drivingExperience;

  const step2Valid = drivingDays && operatingZones.length >= 1;
  const step3Valid = bankName && accountNumber.trim() && accountHolderName.trim() && chk1 && chk2 && chk3;

  const toggle = (arr: string[], v: string, setter: (a: string[]) => void) =>
    setter(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  // Earnings
  const isBonus = dailyHours >= 8;
  const monthly = isBonus ? 8000 : 6000;
  const remaining = 8 - dailyHours;

  async function handleSubmit() {
    if (!step3Valid || submitting) return;
    setErrorMsg("");
    setDuplicateMsg("");
    setSubmitting(true);
    try {
      const phone = whatsappNumber.trim();
      const { data: existing } = await supabase
        .from("driver_applications")
        .select("id")
        .eq("whatsapp_number", phone)
        .limit(1);
      if (existing && existing.length > 0) {
        setDuplicateMsg("We already have an application from this number. We'll be in touch soon.");
        setSubmitting(false);
        return;
      }
      const { data: inserted, error: insErr } = await supabase
        .from("driver_applications")
        .insert({
          full_name: fullName,
          nic_number: nicNumber,
          date_of_birth: dateOfBirth,
          whatsapp_number: phone,
          alternate_number: alternateNumber || null,
          home_address: homeAddress,
          preferred_language: preferredLanguage,
          vehicle_registration: vehicleRegistration.toUpperCase(),
          vehicle_colour: vehicleColour,
          vehicle_age: vehicleAge,
          vehicle_ownership: vehicleOwnership,
          licence_number: licenceNumber,
          licence_expiry: licenceExpiry,
          driving_experience: drivingExperience,
          operating_zones: operatingZones,
          daily_hours: dailyHours,
          driving_days: drivingDays,
          platform_usage: platformUsage,
          bank_name: bankName,
          account_number: accountNumber,
          account_holder_name: accountHolderName,
          referral_name: referralName || null,
          status: "new",
        })
        .select("id")
        .single();
      if (insErr) throw insErr;
      try { localStorage.removeItem(DRAFT_KEY); } catch {}
      setSuccessId(inserted.id);
    } catch {
      setErrorMsg("Something went wrong — please try again.");
      setSubmitting(false);
    }
  }

  const startFresh = () => {
    try { localStorage.removeItem(DRAFT_KEY); } catch {}
    window.location.reload();
  };

  const maskedNic = nicNumber.length > 4
    ? "*".repeat(Math.max(0, nicNumber.length - 4)) + nicNumber.slice(-4)
    : nicNumber;

  return (
    <SiteShell accent="green">
      <style>{css}</style>
      <section className="section-wrap" style={{ background: C.bg, padding: "clamp(48px, 7vh, 80px) clamp(16px, 4vw, 40px)", maxWidth: "none" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontFamily: "Space Mono, monospace", fontSize: 11, color: C.greenInk, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 10 }}>
              Driver partner application
            </div>
            <h1 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "clamp(32px, 5vw, 52px)", letterSpacing: "-0.03em", color: C.ink, lineHeight: 1.05, margin: 0 }}>
              Join the mydiio network.
            </h1>
            <p style={{ color: C.inkSoft, fontSize: 15, maxWidth: "44ch", margin: "10px auto 14px", lineHeight: 1.5 }}>
              Takes about 5 minutes. We review every application personally and contact you on WhatsApp within 48 hours.
            </p>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
              {["✓ No payment today", "✓ Screen installed free", "✓ Keep your existing routes"].map((t) => (
                <span key={t} style={{ background: C.greenSoft, border: `1.5px solid ${C.green}`, borderRadius: 20, padding: "5px 12px", fontFamily: "Space Mono, monospace", fontSize: 11, color: C.greenInk, fontWeight: 700 }}>{t}</span>
              ))}
            </div>
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
                  { n: 1, label: "About you" },
                  { n: 2, label: "Routes" },
                  { n: 3, label: "Payment" },
                ].map((s, i, arr) => {
                  const state = currentStep > s.n ? "done" : currentStep === s.n ? "active" : "future";
                  return (
                    <div key={s.n} style={{ display: "contents" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 30 }}>
                        <div className={`prog-node prog-${state}`}>{state === "done" ? "✓" : s.n}</div>
                        <div className={`prog-label prog-label-${state}`}>{s.label}</div>
                      </div>
                      {i < arr.length - 1 && (
                        <div style={{ flex: 1, height: 2, background: "rgba(255,255,255,0.1)", margin: "14px 6px 0", position: "relative", overflow: "hidden" }}>
                          <div style={{ height: "100%", background: C.green, width: currentStep > s.n ? "100%" : "0%", transition: "width 0.6s cubic-bezier(0.22,1,0.36,1)" }} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {successId ? (
              <SuccessPanel id={successId} name={fullName} language={preferredLanguage} onHome={() => navigate({ to: "/" })} />
            ) : (
              <div key={currentStep} className="step-body" style={{ padding: "26px 24px" }}>
                {hadDraft && currentStep > 1 && (
                  <div style={{ background: C.accentSoft, border: `2px solid ${C.accent}`, borderRadius: 12, padding: "10px 14px", marginBottom: 18, fontFamily: "Space Mono, monospace", fontSize: 12, color: C.accentInk, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                    <span>You have a saved draft — continuing from where you left off.</span>
                    <button type="button" onClick={startFresh} style={{ background: "transparent", border: "none", color: C.accentDeep, textDecoration: "underline", cursor: "pointer", fontFamily: "inherit", fontSize: 12 }}>Start fresh</button>
                  </div>
                )}

                {currentStep === 1 && (
                  <>
                    <span className="step-eyebrow">Step 1 of 3</span>
                    <h2 className="step-heading">Tell us about yourself and your vehicle.</h2>
                    <p className="step-sub">Kept private. Used only to verify your application.</p>

                    <Field label="Full name">
                      <input className="fld" type="text" required placeholder="Name as it appears on your NIC" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                      <span className="fld-note">Must match your National Identity Card</span>
                    </Field>

                    <Field label="NIC number">
                      <input className="fld" type="text" required placeholder="e.g. 199012345678 or 901234567V" value={nicNumber} onChange={(e) => setNicNumber(e.target.value)} />
                      <span className="fld-note">12-digit new format or 9-digit + V/X old format</span>
                      {nicNumber && !nicValid && <span className="fld-err">Please enter a valid Sri Lankan NIC number</span>}
                    </Field>

                    <Field label="Date of birth">
                      <input className="fld" type="date" required max={maxDOB()} value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                      {dateOfBirth && !ageValid && <span className="fld-err">You must be 18 or older to apply</span>}
                    </Field>

                    <Field label="WhatsApp number">
                      <input className="fld" type="tel" required placeholder="+94 77 000 0000" value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)} />
                      <span className="fld-note">We'll send application updates here</span>
                    </Field>

                    <Field label="Alternate contact (optional)">
                      <input className="fld" type="tel" placeholder="Optional — family contact" value={alternateNumber} onChange={(e) => setAlternateNumber(e.target.value)} />
                    </Field>

                    <Field label="Home address">
                      <textarea className="fld" required rows={2} placeholder="Street address, city" value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)} />
                      <span className="fld-note">General area is fine at this stage</span>
                    </Field>

                    <Field label="How should we communicate with you?">
                      <div className="pill-group">
                        {LANGUAGES.map((l) => (
                          <button key={l} type="button" className={`pill pill-green ${preferredLanguage === l ? "sel" : ""}`} onClick={() => setPreferredLanguage(l)}>{l}</button>
                        ))}
                      </div>
                    </Field>

                    <div className="vehicle-divider">
                      <span>Your vehicle</span>
                      <div className="vehicle-divider-line" />
                    </div>

                    <Field label="Vehicle registration">
                      <input className="fld" type="text" required placeholder="e.g. WP CAB-1234" value={vehicleRegistration} onChange={(e) => setVehicleRegistration(e.target.value.toUpperCase())} style={{ textTransform: "uppercase" }} />
                      <span className="fld-note">As shown on your registration certificate (CR)</span>
                    </Field>

                    <Field label="Vehicle colour">
                      <input className="fld" type="text" required placeholder="e.g. Yellow / Yellow & Black" value={vehicleColour} onChange={(e) => setVehicleColour(e.target.value)} />
                    </Field>

                    <Field label="Vehicle age">
                      <select className="fld" required value={vehicleAge} onChange={(e) => setVehicleAge(e.target.value)}>
                        <option value="">Select…</option>
                        {VEHICLE_AGES.map((v) => <option key={v} value={v}>{v}</option>)}
                      </select>
                    </Field>

                    <Field label="Vehicle ownership">
                      <div className="pill-group">
                        {OWNERSHIPS.map((o) => (
                          <button key={o} type="button" className={`pill pill-green ${vehicleOwnership === o ? "sel" : ""}`} onClick={() => setVehicleOwnership(o)}>{o}</button>
                        ))}
                      </div>
                      {vehicleOwnership === "I rent / lease it" && (
                        <div style={{ background: C.accentSoft, border: `1px solid ${C.accent}`, borderRadius: 10, padding: "10px 14px", marginTop: 8, fontFamily: "Space Grotesk, sans-serif", fontSize: 13, color: C.accentInk }}>
                          You'll need your vehicle owner's written consent before installation. We provide a template.
                        </div>
                      )}
                    </Field>

                    <Field label="Driving licence number">
                      <input className="fld" type="text" required placeholder="e.g. B1234567" value={licenceNumber} onChange={(e) => setLicenceNumber(e.target.value)} />
                      <span className="fld-note">Must cover three-wheelers</span>
                    </Field>

                    <Field label="Licence expiry date">
                      <input className="fld" type="date" required min={todayISO()} value={licenceExpiry} onChange={(e) => setLicenceExpiry(e.target.value)} />
                      {licenceExpired && <span className="fld-err">An active licence is required to apply.</span>}
                      {!licenceExpired && licenceSoon && (
                        <span style={{ display: "block", fontFamily: "Space Mono, monospace", fontSize: 11, color: C.accentDeep, marginTop: 4 }}>
                          Your licence expires soon — please renew before installation.
                        </span>
                      )}
                    </Field>

                    <Field label="Driving experience">
                      <select className="fld" required value={drivingExperience} onChange={(e) => setDrivingExperience(e.target.value)}>
                        <option value="">Select…</option>
                        {EXPERIENCES.map((v) => <option key={v} value={v}>{v}</option>)}
                      </select>
                    </Field>

                    <button type="button" className="btn-green" disabled={!step1Valid} onClick={() => setCurrentStep(2)} style={{ marginTop: 8 }}>Next →</button>
                  </>
                )}

                {currentStep === 2 && (
                  <>
                    <span className="step-eyebrow">Step 2 of 3</span>
                    <h2 className="step-heading">Tell us about your routes.</h2>
                    <p className="step-sub">Helps us match you to active advertiser zones.</p>

                    <div style={{ position: "relative", overflow: "hidden", background: isBonus ? C.greenSoft : C.accentSoft, border: `2px solid ${isBonus ? C.green : C.accent}`, borderRadius: 14, padding: "18px 20px", marginBottom: 20, transition: "border-color 0.3s ease, background 0.3s ease" }}>
                      <div style={{ position: "absolute", top: -10, right: -10, width: 60, height: 60, borderRadius: "50%", background: C.green, opacity: 0.07 }} />
                      <div style={{ fontFamily: "Space Mono, monospace", fontSize: 10, color: C.greenInk, textTransform: "uppercase", letterSpacing: "0.12em" }}>YOUR ESTIMATED EARNINGS</div>
                      <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "clamp(26px,4vw,32px)", color: C.ink, margin: "4px 0 4px" }}>
                        LKR {monthly.toLocaleString()} / month
                      </div>
                      <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 13, color: C.greenInk, marginBottom: 8 }}>
                        {isBonus
                          ? "Base pay LKR 6,000 + LKR 2,000 route bonus unlocked."
                          : `Base pay. Drive ${remaining} more hour${remaining !== 1 ? "s" : ""}/day to unlock +LKR 2,000.`}
                      </div>
                      <span key={String(isBonus)} className="earn-badge" style={{ background: isBonus ? C.green : C.accent, color: isBonus ? C.onDark : C.ink, borderRadius: 20, padding: "3px 12px", fontFamily: "Space Mono, monospace", fontSize: 10, fontWeight: 700, display: "inline-block" }}>
                        {isBonus ? "✓ Route bonus eligible" : `Drive ${remaining} more hrs/day to unlock`}
                      </span>
                    </div>

                    <Field label="Hours you drive daily">
                      <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "clamp(22px,3vw,28px)", color: isBonus ? C.green : C.accentDeep, marginBottom: 6, transition: "color 0.2s ease" }}>
                        {dailyHours} hours / day
                      </div>
                      <input type="range" min={4} max={14} step={1} value={dailyHours} onChange={(e) => setDailyHours(Number(e.target.value))} style={{ width: "100%", accentColor: C.green }} />
                      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Space Mono, monospace", fontSize: 10, color: C.inkMute, marginTop: 4 }}>
                        <span>4 hrs</span><span>14 hrs</span>
                      </div>
                    </Field>

                    <Field label="Days per week">
                      <div className="pill-group">
                        {DAYS.map((d) => (
                          <button key={d} type="button" className={`pill pill-green ${drivingDays === d ? "sel" : ""}`} onClick={() => setDrivingDays(d)}>{d}</button>
                        ))}
                      </div>
                    </Field>

                    <Field label="Zones you mainly drive in">
                      <div className="pill-group">
                        {ZONES.map((z) => (
                          <button key={z} type="button" className={`pill pill-green ${operatingZones.includes(z) ? "sel" : ""}`} onClick={() => toggle(operatingZones, z, setOperatingZones)}>{z}</button>
                        ))}
                      </div>
                    </Field>

                    <Field label="Apps you use (optional)">
                      <div className="pill-group">
                        {PLATFORMS.map((p) => (
                          <button key={p} type="button" className={`pill pill-green ${platformUsage.includes(p) ? "sel" : ""}`} onClick={() => toggle(platformUsage, p, setPlatformUsage)}>{p}</button>
                        ))}
                      </div>
                      <span className="fld-note">Helps us understand the driver community</span>
                    </Field>

                    <Field label="Referred by (optional)">
                      <input className="fld" type="text" placeholder="Name or phone of the driver who told you" value={referralName} onChange={(e) => setReferralName(e.target.value)} />
                      <span className="fld-note">They'll earn LKR 1,500 when you join</span>
                    </Field>

                    <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                      <button type="button" className="btn-ghost" onClick={() => setCurrentStep(1)}>← Back</button>
                      <button type="button" className="btn-green" disabled={!step2Valid} onClick={() => setCurrentStep(3)} style={{ flex: 1 }}>Next →</button>
                    </div>
                  </>
                )}

                {currentStep === 3 && (
                  <>
                    <span className="step-eyebrow">Step 3 of 3</span>
                    <h2 className="step-heading">Payment details & confirmation.</h2>

                    <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600, fontSize: 17, color: C.ink, margin: "8px 0 4px" }}>How we pay you</h3>
                    <p style={{ color: C.inkSoft, fontSize: 13, marginBottom: 18 }}>
                      Your bank account for monthly transfers on the 5th. Kept private — used only for payments.
                    </p>

                    <Field label="Bank name">
                      <select className="fld" required value={bankName} onChange={(e) => setBankName(e.target.value)}>
                        <option value="">Select…</option>
                        {BANKS.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </Field>

                    <Field label="Account number">
                      <input className="fld" type="text" required value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
                      <span style={{ display: "block", fontFamily: "Space Mono, monospace", fontSize: 10, color: C.greenInk, marginTop: 4, fontStyle: "italic" }}>
                        Used only to send your monthly payment on the 5th
                      </span>
                    </Field>

                    <Field label="Account holder name">
                      <input className="fld" type="text" required placeholder="Name as it appears on your bank account" value={accountHolderName} onChange={(e) => setAccountHolderName(e.target.value)} />
                      <span className="fld-note">Must match your NIC name for transfer verification</span>
                    </Field>

                    <div style={{ borderTop: "1px solid rgba(30,26,21,0.1)", margin: "18px 0" }} />

                    <div style={{ fontFamily: "Space Mono, monospace", fontSize: 11, color: C.greenInk }}>
                      Based on {dailyHours} hours/day → LKR {monthly.toLocaleString()}/month estimated
                    </div>

                    <div style={{ borderTop: "1px solid rgba(30,26,21,0.1)", margin: "18px 0" }} />

                    <div style={{ background: C.bg2, border: "1.5px solid rgba(30,26,21,0.12)", borderRadius: 12, padding: "14px 18px" }}>
                      <SummaryRow label="NAME" value={fullName} />
                      <SummaryRow label="NIC" value={maskedNic} />
                      <SummaryRow label="VEHICLE" value={vehicleRegistration.toUpperCase()} />
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "8px 0", gap: 12, flexWrap: "wrap", borderBottom: "1px dashed rgba(30,26,21,0.1)" }}>
                        <span style={{ fontFamily: "Space Mono, monospace", fontSize: 10, color: C.inkMute, textTransform: "uppercase", letterSpacing: "0.08em" }}>ZONES</span>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, justifyContent: "flex-end" }}>
                          {operatingZones.map((z) => (
                            <span key={z} style={{ background: C.greenSoft, border: `1px solid ${C.green}`, borderRadius: 20, padding: "2px 8px", fontFamily: "Space Mono, monospace", fontSize: 10, color: C.greenInk }}>{z}</span>
                          ))}
                        </div>
                      </div>
                      <SummaryRow label="BANK" value={bankName} last />
                    </div>

                    <div style={{ background: C.accentSoft, border: `2px solid ${C.accent}`, borderRadius: 12, padding: "14px 18px", margin: "16px 0" }}>
                      <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600, fontSize: 14, color: C.accentInk, marginBottom: 6 }}>Before you submit — please read</div>
                      <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 13, color: C.inkSoft, lineHeight: 1.65, margin: 0 }}>
                        By submitting: (1) All information is accurate and truthful. (2) You consent to mydiio storing your data to evaluate this application. (3) This is an application, not a confirmed acceptance. (4) Your data will not be shared outside the mydiio operation. (5) A refundable deposit (LKR 3,500 founding partners, LKR 5,000 standard) is required before installation — arranged after approval, not now.
                      </p>
                    </div>

                    {[
                      { v: chk1, s: setChk1, t: "I confirm all information provided is accurate and truthful" },
                      { v: chk2, s: setChk2, t: "I consent to mydiio storing my personal data for this application" },
                      { v: chk3, s: setChk3, t: "I understand this is an application, not a confirmed acceptance" },
                    ].map((c, i) => (
                      <label key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", margin: "8px 0" }}>
                        <span className={`chk chk-sq ${c.v ? "chk-green-on" : ""}`} onClick={() => c.s(!c.v)}>{c.v ? "✓" : ""}</span>
                        <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 13, color: C.inkSoft, lineHeight: 1.5 }}>{c.t}</span>
                      </label>
                    ))}

                    {duplicateMsg && (
                      <div style={{ background: C.accentSoft, border: `2px solid ${C.accent}`, borderRadius: 12, padding: "10px 14px", margin: "10px 0", fontFamily: "Space Mono, monospace", fontSize: 12, color: C.accentInk }}>
                        {duplicateMsg}
                      </div>
                    )}

                    <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                      <button type="button" className="btn-ghost" onClick={() => setCurrentStep(2)} disabled={submitting}>← Back</button>
                      <button type="button" className="btn-green" disabled={!step3Valid || submitting} onClick={handleSubmit} style={{ flex: 1 }}>
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

function SummaryRow({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", gap: 12, borderBottom: last ? "none" : "1px dashed rgba(30,26,21,0.1)" }}>
      <span style={{ fontFamily: "Space Mono, monospace", fontSize: 10, color: C.inkMute, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</span>
      <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 13, color: C.ink, textAlign: "right" }}>{value}</span>
    </div>
  );
}

function SuccessPanel({ id, name, language, onHome }: { id: string; name: string; language: string; onHome: () => void }) {
  const first = (name.trim().split(/\s+/)[0]) || "there";
  const ref = id.slice(-4).toUpperCase();
  const body =
    language === "Sinhala"
      ? "අපි ඔබව WhatsApp හරහා පැය 48ක් ඇතුළත සම්බන්ධ කර ගනිමු."
      : language === "Tamil"
      ? "நாங்கள் 48 மணி நேரத்திற்குள் WhatsApp மூலம் தொடர்பு கொள்வோம்."
      : "We'll review your application and contact you on WhatsApp within 48 hours.";
  return (
    <div style={{ padding: "44px 28px", textAlign: "center" }}>
      <div className="check-pop" style={{ width: 64, height: 64, borderRadius: "50%", background: C.green, border: `2px solid ${C.ink}`, boxShadow: `4px 4px 0 ${C.ink}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", color: "#fff", fontSize: 26, fontWeight: 700 }}>✓</div>
      <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: 22, color: C.ink, margin: "0 0 10px" }}>Application received, {first}.</h3>
      <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 14, color: C.inkSoft, maxWidth: 360, margin: "0 auto 12px", lineHeight: 1.5 }}>{body}</p>
      <div style={{ fontFamily: "Space Mono, monospace", fontSize: 12, color: C.inkMute }}>Ref: DRV-{ref}</div>
      <button type="button" className="btn-green" onClick={onHome} style={{ maxWidth: 240, margin: "20px auto 0", display: "block", width: "100%" }}>Back to homepage →</button>
    </div>
  );
}

const css = `
@keyframes prog-pulse-g {
  0%,100% { box-shadow: 0 0 0 0 rgba(69,133,90,0.3); }
  50% { box-shadow: 0 0 0 7px rgba(69,133,90,0); }
}
@keyframes step-in {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes check-pop {
  from { transform: scale(0); }
  to { transform: scale(1); }
}
@keyframes earn-pop {
  from { transform: scale(0); }
  to { transform: scale(1); }
}
.step-body { animation: step-in 0.3s cubic-bezier(0.22,1,0.36,1); }
.check-pop { animation: check-pop 0.45s cubic-bezier(0.34,1.56,0.64,1); }
.earn-badge { animation: earn-pop 0.45s cubic-bezier(0.34,1.56,0.64,1); }

.prog-node {
  width: 30px; height: 30px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Space Mono', monospace; font-size: 12px; font-weight: 700;
  background: transparent;
}
.prog-future { border: 2px solid rgba(255,255,255,0.18); color: rgba(255,255,255,0.28); }
.prog-active { border: 2px solid ${C.green}; color: ${C.green}; animation: prog-pulse-g 2s ease infinite; }
.prog-done   { background: ${C.green}; border: 2px solid ${C.green}; color: ${C.onDark}; }
.prog-label {
  font-family: 'Space Mono', monospace; font-size: 9px;
  text-transform: uppercase; letter-spacing: 0.08em;
  margin-top: 6px; white-space: nowrap;
}
.prog-label-future { color: rgba(255,255,255,0.28); }
.prog-label-active { color: ${C.green}; }
.prog-label-done { color: rgba(255,255,255,0.55); }

.step-eyebrow {
  font-family: 'Space Mono', monospace; font-size: 10px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.2em; color: ${C.greenInk};
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
textarea.fld { resize: vertical; min-height: 60px; font-family: 'Space Grotesk', sans-serif; }
.fld:focus {
  border-color: ${C.green}; box-shadow: 2px 2px 0 ${C.green};
  transform: translate(-1px,-1px); background: ${C.paper};
}
.fld-note {
  font-family: 'Space Mono', monospace; font-size: 10px;
  color: ${C.inkMute}; margin-top: 4px; font-style: italic; display: block;
}
.fld-err {
  display: block; font-family: 'Space Mono', monospace; font-size: 11px;
  color: #c1432a; margin-top: 4px;
}

.vehicle-divider {
  display: flex; align-items: center; gap: 12px;
  border-top: 1px solid rgba(30,26,21,0.1);
  margin: 20px 0 18px; padding-top: 14px;
}
.vehicle-divider span {
  font-family: 'Space Mono', monospace; font-size: 10px; font-weight: 700;
  color: ${C.inkMute}; text-transform: uppercase; letter-spacing: 0.12em;
}
.vehicle-divider-line { flex: 1; height: 1px; background: rgba(30,26,21,0.1); }

.pill-group { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 5px; }
.pill {
  padding: 7px 14px; border: 2px solid ${C.ink}; border-radius: 9999px;
  font-family: 'Space Mono', monospace; font-size: 11px; font-weight: 700;
  color: ${C.inkSoft}; cursor: pointer; transition: all 0.15s;
  user-select: none; background: transparent;
}
.pill-green:hover { border-color: ${C.green}; color: ${C.greenInk}; transform: translateY(-1px); }
.pill-green.sel {
  background: ${C.green}; border-color: ${C.green}; color: ${C.onDark};
  box-shadow: 2px 2px 0 ${C.ink}; transform: translate(-1px,-1px);
}

.btn-green {
  background: ${C.green}; color: ${C.onDark};
  border: 2px solid ${C.ink}; border-radius: 12px;
  box-shadow: 4px 4px 0 ${C.ink};
  font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 15px;
  padding: 12px 18px; cursor: pointer; transition: all 0.15s;
  width: 100%;
}
.btn-green:hover:not(:disabled) { transform: translate(-2px,-2px); box-shadow: 6px 6px 0 ${C.ink}; }
.btn-green:active:not(:disabled) { transform: translate(2px,2px); box-shadow: 1px 1px 0 ${C.ink}; }
.btn-green:disabled { opacity: 0.45; cursor: not-allowed; }

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
  width: 20px; height: 20px; border: 2px solid ${C.ink};
  background: transparent; display: inline-flex; align-items: center; justify-content: center;
  font-size: 14px; color: ${C.onDark}; font-weight: 700; cursor: pointer; flex-shrink: 0;
  transition: all 0.15s; border-radius: 5px;
}
.chk-sq { border-radius: 5px; }
.chk-green-on {
  background: ${C.green}; border-color: ${C.green};
  box-shadow: 2px 2px 0 ${C.ink};
}
`;
