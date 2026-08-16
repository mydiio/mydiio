import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Reveal } from "@/motion";
import {
  applyBack,
  applyChecks,
  applyConfirmBody,
  applyConfirmHeading,
  applyContactNote,
  applyDraftNotice,
  applyDuplicate,
  applyEarningsBadgeLocked,
  applyEarningsBadgeUnlocked,
  applyEarningsEyebrow,
  applyEarningsUnlocked,
  applyEarningsUnlock,
  applyError,
  applyFieldAccount,
  applyFieldAccountName,
  applyFieldAccountNameNote,
  applyFieldAccountNote,
  applyFieldAddress,
  applyFieldAddressNote,
  applyFieldAlt,
  applyFieldAltNote,
  applyFieldApps,
  applyFieldAppsNote,
  applyFieldBank,
  applyFieldColour,
  applyFieldColourPlaceholder,
  applyFieldDailyHours,
  applyFieldDailyHoursValue,
  applyFieldDob,
  applyFieldDobErr,
  applyFieldExperience,
  applyFieldFullName,
  applyFieldFullNameNote,
  applyFieldHolderPlaceholder,
  applyFieldLanguage,
  applyFieldLicence,
  applyFieldLicenceExpired,
  applyFieldLicenceExpiry,
  applyFieldLicenceNote,
  applyFieldLicenceSoon,
  applyFieldNic,
  applyFieldNicErr,
  applyFieldNicNote,
  applyFieldOwnership,
  applyFieldReferral,
  applyFieldReferralNote,
  applyFieldRegistration,
  applyFieldRegistrationNote,
  applyFieldVehicleAge,
  applyFieldWhatsApp,
  applyFieldWhatsAppNote,
  applyFieldZones,
  applyFieldDays,
  applyFormBody,
  applyFormHeading,
  applyNext,
  applyProgressAbout,
  applyProgressPayment,
  applyProgressRoutes,
  applyProgressVehicle,
  applyRentNotice,
  applyRestart,
  applySection1Body,
  applySection1Heading,
  applySection2Body,
  applySection2Heading,
  applySection3Body,
  applySection3Heading,
  applySection4Body,
  applySection4Heading,
  applySubmit,
  applySubmitting,
  applySuccessBody,
  applySuccessHeading,
  applySuccessHome,
  applySummaryBank,
  applySummaryEarnings,
  applySummaryName,
  applySummaryNic,
  applySummaryVehicle,
  applySummaryZones,
  BANKS,
  DAYS,
  DRAFT_KEY,
  EXPERIENCES,
  LANGUAGES,
  NIC_REGEX,
  OWNERSHIPS,
  PLATFORMS,
  SUBMIT_ENDPOINT,
  VEHICLE_AGES,
  ZONES,
} from "../applyContent";

type Step = 1 | 2 | 3 | 4;

const STEP_LABELS: { id: Step; label: string }[] = [
  { id: 1, label: applyProgressAbout },
  { id: 2, label: applyProgressVehicle },
  { id: 3, label: applyProgressRoutes },
  { id: 4, label: applyProgressPayment },
];

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

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

function toggle<T>(arr: T[], v: T, setter: (a: T[]) => void) {
  setter(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
}

function EarningsCard({
  dailyHours,
  monthly,
  isBonus,
  remaining,
}: {
  dailyHours: number;
  monthly: number;
  isBonus: boolean;
  remaining: number;
}) {
  return (
    <div className={`driver-apply-earnings ${isBonus ? "is-bonus" : "is-base"}`}>
      <div className="driver-apply-earnings-eyebrow">{applyEarningsEyebrow}</div>
      <div className="driver-apply-earnings-amount">
        LKR {monthly.toLocaleString()} <span>/ month</span>
      </div>
      <p className="driver-apply-earnings-body">
        {isBonus ? applyEarningsUnlocked : applyEarningsUnlock(remaining)}
      </p>
      <span className="driver-apply-earnings-badge">
        {isBonus ? applyEarningsBadgeUnlocked : applyEarningsBadgeLocked(remaining)}
      </span>
    </div>
  );
}

export function DriverApplyForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [hadDraft, setHadDraft] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [duplicate, setDuplicate] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Step 1
  const [fullName, setFullName] = useState("");
  const [nicNumber, setNicNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [alternateNumber, setAlternateNumber] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState<(typeof LANGUAGES)[number]>("Sinhala");

  // Step 2
  const [vehicleRegistration, setVehicleRegistration] = useState("");
  const [vehicleColour, setVehicleColour] = useState("");
  const [vehicleAge, setVehicleAge] = useState<string>("");
  const [vehicleOwnership, setVehicleOwnership] = useState<string>("");
  const [licenceNumber, setLicenceNumber] = useState("");
  const [licenceExpiry, setLicenceExpiry] = useState("");
  const [drivingExperience, setDrivingExperience] = useState<string>("");

  // Step 3
  const [dailyHours, setDailyHours] = useState(8);
  const [drivingDays, setDrivingDays] = useState<string>("");
  const [operatingZones, setOperatingZones] = useState<string[]>([]);
  const [platformUsage, setPlatformUsage] = useState<string[]>([]);
  const [referralName, setReferralName] = useState("");

  // Step 4
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [confirmChecks, setConfirmChecks] = useState<boolean[]>([false, false, false]);

  // Rehydrate (sessionStorage only, sensitive fields excluded)
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const d = JSON.parse(raw);
      const s1 = d.s1 || {};
      setFullName(s1.fullName || "");
      setWhatsappNumber(s1.whatsappNumber || "");
      setAlternateNumber(s1.alternateNumber || "");
      setPreferredLanguage(s1.preferredLanguage || "Sinhala");
      setVehicleRegistration(s1.vehicleRegistration || "");
      setVehicleColour(s1.vehicleColour || "");
      setVehicleAge(s1.vehicleAge || "");
      setVehicleOwnership(s1.vehicleOwnership || "");
      setDrivingExperience(s1.drivingExperience || "");
      const s3 = d.s3 || {};
      setDailyHours(s3.dailyHours ?? 8);
      setDrivingDays(s3.drivingDays || "");
      setOperatingZones(s3.operatingZones || []);
      setPlatformUsage(s3.platformUsage || []);
      setReferralName(s3.referralName || "");
      if (d.step && d.step > 1) {
        setStep(d.step);
        setHadDraft(true);
      }
    } catch {}
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {}
  }, []);

  // Save draft
  useEffect(() => {
    if (success) return;
    const d = {
      step,
      s1: {
        fullName,
        whatsappNumber,
        alternateNumber,
        preferredLanguage,
        vehicleRegistration,
        vehicleColour,
        vehicleAge,
        vehicleOwnership,
        drivingExperience,
      },
      s3: { dailyHours, drivingDays, operatingZones, platformUsage, referralName },
    };
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify(d));
    } catch {}
  }, [
    step,
    fullName,
    whatsappNumber,
    alternateNumber,
    preferredLanguage,
    vehicleRegistration,
    vehicleColour,
    vehicleAge,
    vehicleOwnership,
    drivingExperience,
    dailyHours,
    drivingDays,
    operatingZones,
    platformUsage,
    referralName,
    success,
  ]);

  const nicValid = !nicNumber || NIC_REGEX.test(nicNumber);
  const ageValid = !dateOfBirth || ageFromDOB(dateOfBirth) >= 18;
  const licenceDays = useMemo(() => daysFromNow(licenceExpiry), [licenceExpiry]);
  const licenceExpired = !!licenceExpiry && licenceDays < 0;
  const licenceSoon = !!licenceExpiry && licenceDays >= 0 && licenceDays <= 90;

  const step1Valid =
    !!fullName.trim() &&
    !!nicNumber.trim() &&
    nicValid &&
    !!dateOfBirth &&
    ageValid &&
    !!whatsappNumber.trim() &&
    !!homeAddress.trim();

  const step2Valid =
    !!vehicleRegistration.trim() &&
    !!vehicleColour.trim() &&
    !!vehicleAge &&
    !!vehicleOwnership &&
    !!licenceNumber.trim() &&
    !!licenceExpiry &&
    !licenceExpired &&
    !!drivingExperience;

  const step3Valid = !!drivingDays && operatingZones.length >= 1;

  const step4Valid =
    !!bankName &&
    !!accountNumber.trim() &&
    !!accountHolderName.trim() &&
    confirmChecks.every(Boolean);

  const isBonus = dailyHours >= 8;
  const monthly = isBonus ? 8000 : 6000;
  const remaining = Math.max(0, 8 - dailyHours);

  const maskedNic =
    nicNumber.length > 4
      ? "*".repeat(Math.max(0, nicNumber.length - 4)) + nicNumber.slice(-4)
      : nicNumber;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!step4Valid || submitting) return;
    setSubmitting(true);
    setError(null);
    setDuplicate(null);
    try {
      const res = await fetch(SUBMIT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          application_type: "driver",
          full_name: fullName,
          phone: whatsappNumber,
          whatsapp_number: whatsappNumber,
          nic_number: nicNumber,
          date_of_birth: dateOfBirth,
          alternate_number: alternateNumber,
          home_address: homeAddress,
          preferred_language: preferredLanguage,
          vehicle_registration: vehicleRegistration,
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
          referral_name: referralName,
          bank_name: bankName,
          bank_account_number: accountNumber,
          account_holder_name: accountHolderName,
        }),
      });
      if (res.status === 409) {
        setDuplicate(applyDuplicate);
        setSubmitting(false);
        return;
      }
      if (!res.ok) {
        setError(applyError);
        setSubmitting(false);
        return;
      }
      try {
        sessionStorage.removeItem(DRAFT_KEY);
      } catch {}
      setSuccess("received");
    } catch {
      setError(applyError);
      setSubmitting(false);
    }
  }

  function startFresh() {
    try {
      sessionStorage.removeItem(DRAFT_KEY);
    } catch {}
    window.location.reload();
  }

  return (
    <section className="driver-apply-form-section" data-atlas-tone="light">
      <div className="driver-apply-shell driver-apply-form-shell">
        <Reveal as="div" className="driver-apply-form-copy">
          <span className="atlas-section-eyebrow atlas-section-eyebrow-dark">Application</span>
          <h2 className="atlas-section-heading">{applyFormHeading}</h2>
          <p className="atlas-section-copy atlas-section-copy-dark">{applyFormBody}</p>
          <p className="driver-apply-form-note">{applyContactNote}</p>
          <a
            className="driver-apply-back-link"
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              navigate({ to: "/contact" });
            }}
          >
            ← Back to contact
          </a>
        </Reveal>

        <Reveal as="div" className="driver-apply-form-wrap">
          {success ? (
            <SuccessPanel name={fullName} onHome={() => navigate({ to: "/" })} />
          ) : (
            <form className="driver-apply-form" onSubmit={handleSubmit} noValidate>
              <ProgressBar current={step} />

              {hadDraft && step > 1 && (
                <div className="driver-apply-draft-notice" role="status">
                  <span>{applyDraftNotice}</span>
                  <button type="button" onClick={startFresh}>
                    {applyRestart}
                  </button>
                </div>
              )}

              {step === 1 && (
                <fieldset className="driver-apply-step">
                  <legend className="driver-apply-step-heading">{applySection1Heading}</legend>
                  <p className="driver-apply-step-body">{applySection1Body}</p>

                  <div className="driver-apply-grid">
                    <label className="driver-apply-field driver-apply-field-wide">
                      <span className="driver-apply-label">{applyFieldFullName}</span>
                      <input
                        type="text"
                        name="full_name"
                        required
                        autoComplete="name"
                        maxLength={120}
                        placeholder="Name as it appears on your NIC"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                      <span className="driver-apply-note">{applyFieldFullNameNote}</span>
                    </label>

                    <label className="driver-apply-field">
                      <span className="driver-apply-label">{applyFieldNic}</span>
                      <input
                        type="text"
                        name="nic_number"
                        required
                        maxLength={12}
                        placeholder="199012345678 or 901234567V"
                        value={nicNumber}
                        onChange={(e) => setNicNumber(e.target.value)}
                      />
                      <span className="driver-apply-note">{applyFieldNicNote}</span>
                      {nicNumber && !nicValid && (
                        <span className="driver-apply-err">{applyFieldNicErr}</span>
                      )}
                    </label>

                    <label className="driver-apply-field">
                      <span className="driver-apply-label">{applyFieldDob}</span>
                      <input
                        type="date"
                        name="date_of_birth"
                        required
                        max={maxDOB()}
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                      />
                      {dateOfBirth && !ageValid && (
                        <span className="driver-apply-err">{applyFieldDobErr}</span>
                      )}
                    </label>

                    <label className="driver-apply-field">
                      <span className="driver-apply-label">{applyFieldWhatsApp}</span>
                      <input
                        type="tel"
                        name="phone"
                        required
                        autoComplete="tel"
                        maxLength={40}
                        placeholder="+94 77 000 0000"
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value)}
                      />
                      <span className="driver-apply-note">{applyFieldWhatsAppNote}</span>
                    </label>

                    <label className="driver-apply-field">
                      <span className="driver-apply-label">{applyFieldAlt}</span>
                      <input
                        type="tel"
                        name="alternate_number"
                        maxLength={40}
                        placeholder="Optional, family contact"
                        value={alternateNumber}
                        onChange={(e) => setAlternateNumber(e.target.value)}
                      />
                      <span className="driver-apply-note">{applyFieldAltNote}</span>
                    </label>

                    <label className="driver-apply-field driver-apply-field-wide">
                      <span className="driver-apply-label">{applyFieldAddress}</span>
                      <textarea
                        name="home_address"
                        required
                        rows={2}
                        placeholder="Street address, city"
                        value={homeAddress}
                        onChange={(e) => setHomeAddress(e.target.value)}
                      />
                      <span className="driver-apply-note">{applyFieldAddressNote}</span>
                    </label>

                    <fieldset className="driver-apply-field driver-apply-field-wide">
                      <legend className="driver-apply-label">{applyFieldLanguage}</legend>
                      <div className="driver-apply-chip-group">
                        {LANGUAGES.map((l) => (
                          <label
                            key={l}
                            className={`driver-apply-chip ${preferredLanguage === l ? "is-active" : ""}`}
                          >
                            <input
                              type="radio"
                              name="preferred_language"
                              value={l}
                              checked={preferredLanguage === l}
                              onChange={() => setPreferredLanguage(l)}
                            />
                            <span>{l}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  </div>

                  <div className="driver-apply-actions">
                    <button
                      type="button"
                      className="driver-apply-submit driver-apply-submit-next"
                      disabled={!step1Valid}
                      onClick={() => setStep(2)}
                    >
                      {applyNext}
                      <span className="driver-apply-submit-arrow" aria-hidden="true">
                        →
                      </span>
                    </button>
                  </div>
                </fieldset>
              )}

              {step === 2 && (
                <fieldset className="driver-apply-step">
                  <legend className="driver-apply-step-heading">{applySection2Heading}</legend>
                  <p className="driver-apply-step-body">{applySection2Body}</p>

                  <div className="driver-apply-grid">
                    <label className="driver-apply-field driver-apply-field-wide">
                      <span className="driver-apply-label">{applyFieldRegistration}</span>
                      <input
                        type="text"
                        name="vehicle_registration"
                        required
                        maxLength={20}
                        placeholder="WP CAB-1234"
                        style={{ textTransform: "uppercase" }}
                        value={vehicleRegistration}
                        onChange={(e) => setVehicleRegistration(e.target.value.toUpperCase())}
                      />
                      <span className="driver-apply-note">{applyFieldRegistrationNote}</span>
                    </label>

                    <label className="driver-apply-field">
                      <span className="driver-apply-label">{applyFieldColour}</span>
                      <input
                        type="text"
                        name="vehicle_colour"
                        required
                        maxLength={80}
                        placeholder={applyFieldColourPlaceholder}
                        value={vehicleColour}
                        onChange={(e) => setVehicleColour(e.target.value)}
                      />
                    </label>

                    <label className="driver-apply-field">
                      <span className="driver-apply-label">{applyFieldVehicleAge}</span>
                      <select
                        name="vehicle_age"
                        required
                        value={vehicleAge}
                        onChange={(e) => setVehicleAge(e.target.value)}
                      >
                        <option value="" disabled>
                          Select…
                        </option>
                        {VEHICLE_AGES.map((v) => (
                          <option key={v} value={v}>
                            {v}
                          </option>
                        ))}
                      </select>
                    </label>

                    <fieldset className="driver-apply-field driver-apply-field-wide">
                      <legend className="driver-apply-label">{applyFieldOwnership}</legend>
                      <div className="driver-apply-chip-group">
                        {OWNERSHIPS.map((o) => (
                          <label
                            key={o}
                            className={`driver-apply-chip ${vehicleOwnership === o ? "is-active" : ""}`}
                          >
                            <input
                              type="radio"
                              name="vehicle_ownership"
                              value={o}
                              checked={vehicleOwnership === o}
                              onChange={() => setVehicleOwnership(o)}
                            />
                            <span>{o}</span>
                          </label>
                        ))}
                      </div>
                      {vehicleOwnership === "I rent / lease it" && (
                        <p className="driver-apply-rent-note">{applyRentNotice}</p>
                      )}
                    </fieldset>

                    <label className="driver-apply-field">
                      <span className="driver-apply-label">{applyFieldLicence}</span>
                      <input
                        type="text"
                        name="licence_number"
                        required
                        maxLength={40}
                        placeholder="B1234567"
                        value={licenceNumber}
                        onChange={(e) => setLicenceNumber(e.target.value)}
                      />
                      <span className="driver-apply-note">{applyFieldLicenceNote}</span>
                    </label>

                    <label className="driver-apply-field">
                      <span className="driver-apply-label">{applyFieldLicenceExpiry}</span>
                      <input
                        type="date"
                        name="licence_expiry"
                        required
                        min={todayISO()}
                        value={licenceExpiry}
                        onChange={(e) => setLicenceExpiry(e.target.value)}
                      />
                      {licenceExpired && (
                        <span className="driver-apply-err">{applyFieldLicenceExpired}</span>
                      )}
                      {!licenceExpired && licenceSoon && (
                        <span className="driver-apply-warn">{applyFieldLicenceSoon}</span>
                      )}
                    </label>

                    <label className="driver-apply-field driver-apply-field-wide">
                      <span className="driver-apply-label">{applyFieldExperience}</span>
                      <select
                        name="driving_experience"
                        required
                        value={drivingExperience}
                        onChange={(e) => setDrivingExperience(e.target.value)}
                      >
                        <option value="" disabled>
                          Select…
                        </option>
                        {EXPERIENCES.map((v) => (
                          <option key={v} value={v}>
                            {v}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="driver-apply-actions driver-apply-actions-split">
                    <button type="button" className="driver-apply-ghost" onClick={() => setStep(1)}>
                      ← {applyBack}
                    </button>
                    <button
                      type="button"
                      className="driver-apply-submit driver-apply-submit-next"
                      disabled={!step2Valid}
                      onClick={() => setStep(3)}
                    >
                      {applyNext}
                      <span className="driver-apply-submit-arrow" aria-hidden="true">
                        →
                      </span>
                    </button>
                  </div>
                </fieldset>
              )}

              {step === 3 && (
                <fieldset className="driver-apply-step">
                  <legend className="driver-apply-step-heading">{applySection3Heading}</legend>
                  <p className="driver-apply-step-body">{applySection3Body}</p>

                  <EarningsCard
                    dailyHours={dailyHours}
                    monthly={monthly}
                    isBonus={isBonus}
                    remaining={remaining}
                  />

                  <div className="driver-apply-grid">
                    <label className="driver-apply-field driver-apply-field-wide">
                      <span className="driver-apply-label">{applyFieldDailyHours}</span>
                      <div className="driver-apply-range-head">
                        <span
                          className={`driver-apply-range-value ${isBonus ? "is-bonus" : "is-base"}`}
                        >
                          {applyFieldDailyHoursValue(dailyHours)}
                        </span>
                      </div>
                      <input
                        type="range"
                        name="daily_hours"
                        min={4}
                        max={14}
                        step={1}
                        value={dailyHours}
                        onChange={(e) => setDailyHours(Number(e.target.value))}
                      />
                      <div className="driver-apply-range-axis" aria-hidden="true">
                        <span>4 hrs</span>
                        <span>14 hrs</span>
                      </div>
                    </label>

                    <fieldset className="driver-apply-field driver-apply-field-wide">
                      <legend className="driver-apply-label">{applyFieldDays}</legend>
                      <div className="driver-apply-chip-group">
                        {DAYS.map((d) => (
                          <label
                            key={d}
                            className={`driver-apply-chip ${drivingDays === d ? "is-active" : ""}`}
                          >
                            <input
                              type="radio"
                              name="driving_days"
                              value={d}
                              checked={drivingDays === d}
                              onChange={() => setDrivingDays(d)}
                            />
                            <span>{d}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    <fieldset className="driver-apply-field driver-apply-field-wide">
                      <legend className="driver-apply-label">{applyFieldZones}</legend>
                      <div className="driver-apply-chip-group">
                        {ZONES.map((z) => (
                          <label
                            key={z}
                            className={`driver-apply-chip ${operatingZones.includes(z) ? "is-active" : ""}`}
                          >
                            <input
                              type="checkbox"
                              name="operating_zones"
                              value={z}
                              checked={operatingZones.includes(z)}
                              onChange={() => toggle(operatingZones, z, setOperatingZones)}
                            />
                            <span>{z}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    <fieldset className="driver-apply-field driver-apply-field-wide">
                      <legend className="driver-apply-label">{applyFieldApps}</legend>
                      <div className="driver-apply-chip-group">
                        {PLATFORMS.map((p) => (
                          <label
                            key={p}
                            className={`driver-apply-chip ${platformUsage.includes(p) ? "is-active" : ""}`}
                          >
                            <input
                              type="checkbox"
                              name="platform_usage"
                              value={p}
                              checked={platformUsage.includes(p)}
                              onChange={() => toggle(platformUsage, p, setPlatformUsage)}
                            />
                            <span>{p}</span>
                          </label>
                        ))}
                      </div>
                      <span className="driver-apply-note">{applyFieldAppsNote}</span>
                    </fieldset>

                    <label className="driver-apply-field driver-apply-field-wide">
                      <span className="driver-apply-label">{applyFieldReferral}</span>
                      <input
                        type="text"
                        name="referral_name"
                        maxLength={120}
                        placeholder="Name or phone of the driver who told you"
                        value={referralName}
                        onChange={(e) => setReferralName(e.target.value)}
                      />
                      <span className="driver-apply-note">{applyFieldReferralNote}</span>
                    </label>
                  </div>

                  <div className="driver-apply-actions driver-apply-actions-split">
                    <button type="button" className="driver-apply-ghost" onClick={() => setStep(2)}>
                      ← {applyBack}
                    </button>
                    <button
                      type="button"
                      className="driver-apply-submit driver-apply-submit-next"
                      disabled={!step3Valid}
                      onClick={() => setStep(4)}
                    >
                      {applyNext}
                      <span className="driver-apply-submit-arrow" aria-hidden="true">
                        →
                      </span>
                    </button>
                  </div>
                </fieldset>
              )}

              {step === 4 && (
                <fieldset className="driver-apply-step">
                  <legend className="driver-apply-step-heading">{applySection4Heading}</legend>
                  <p className="driver-apply-step-body">{applySection4Body}</p>

                  <div className="driver-apply-grid">
                    <label className="driver-apply-field driver-apply-field-wide">
                      <span className="driver-apply-label">{applyFieldBank}</span>
                      <select
                        name="bank_name"
                        required
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                      >
                        <option value="" disabled>
                          Select…
                        </option>
                        {BANKS.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="driver-apply-field">
                      <span className="driver-apply-label">{applyFieldAccount}</span>
                      <input
                        type="text"
                        name="bank_account_number"
                        required
                        maxLength={40}
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                      />
                      <span className="driver-apply-note">{applyFieldAccountNote}</span>
                    </label>

                    <label className="driver-apply-field">
                      <span className="driver-apply-label">{applyFieldAccountName}</span>
                      <input
                        type="text"
                        name="account_holder_name"
                        required
                        maxLength={120}
                        placeholder={applyFieldHolderPlaceholder}
                        value={accountHolderName}
                        onChange={(e) => setAccountHolderName(e.target.value)}
                      />
                      <span className="driver-apply-note">{applyFieldAccountNameNote}</span>
                    </label>
                  </div>

                  <div className="driver-apply-summary" aria-label="Application summary">
                    <div className="driver-apply-summary-row">
                      <span>{applySummaryName}</span>
                      <span>{fullName}</span>
                    </div>
                    <div className="driver-apply-summary-row">
                      <span>{applySummaryNic}</span>
                      <span>{maskedNic}</span>
                    </div>
                    <div className="driver-apply-summary-row">
                      <span>{applySummaryVehicle}</span>
                      <span>{vehicleRegistration.toUpperCase()}</span>
                    </div>
                    <div className="driver-apply-summary-row driver-apply-summary-zones">
                      <span>{applySummaryZones}</span>
                      <div className="driver-apply-summary-zones-list">
                        {operatingZones.length === 0 ? (
                          <span className="driver-apply-summary-empty">—</span>
                        ) : (
                          operatingZones.map((z) => (
                            <span key={z} className="driver-apply-summary-zone">
                              {z}
                            </span>
                          ))
                        )}
                      </div>
                    </div>
                    <div className="driver-apply-summary-row driver-apply-summary-row-last">
                      <span>{applySummaryBank}</span>
                      <span>{bankName}</span>
                    </div>
                    <div className="driver-apply-summary-earnings">
                      {applySummaryEarnings(dailyHours, monthly.toLocaleString())}
                    </div>
                  </div>

                  <div className="driver-apply-confirm">
                    <h3 className="driver-apply-confirm-heading">{applyConfirmHeading}</h3>
                    <p className="driver-apply-confirm-body">{applyConfirmBody}</p>
                  </div>

                  <div className="driver-apply-checks">
                    {applyChecks.map((text, i) => (
                      <label
                        key={text}
                        className={`driver-apply-check ${confirmChecks[i] ? "is-active" : ""}`}
                      >
                        <input
                          type="checkbox"
                          checked={confirmChecks[i]}
                          onChange={(e) => {
                            const next = [...confirmChecks];
                            next[i] = e.target.checked;
                            setConfirmChecks(next);
                          }}
                        />
                        <span>{text}</span>
                      </label>
                    ))}
                  </div>

                  {duplicate && (
                    <p className="driver-apply-status driver-apply-status-info" role="status">
                      {duplicate}
                    </p>
                  )}
                  {error && (
                    <p className="driver-apply-status driver-apply-status-error" role="alert">
                      {error}
                    </p>
                  )}

                  <div className="driver-apply-actions driver-apply-actions-split">
                    <button
                      type="button"
                      className="driver-apply-ghost"
                      onClick={() => setStep(3)}
                      disabled={submitting}
                    >
                      ← {applyBack}
                    </button>
                    <button
                      type="submit"
                      className="driver-apply-submit"
                      disabled={!step4Valid || submitting}
                    >
                      {submitting ? applySubmitting : applySubmit}
                      <span className="driver-apply-submit-arrow" aria-hidden="true">
                        →
                      </span>
                    </button>
                  </div>
                </fieldset>
              )}
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function ProgressBar({ current }: { current: Step }) {
  return (
    <ol className="driver-apply-progress" aria-label="Application progress">
      {STEP_LABELS.map((s) => {
        const state = current > s.id ? "done" : current === s.id ? "active" : "future";
        return (
          <li
            key={s.id}
            className={`driver-apply-progress-step is-${state}`}
            aria-current={state === "active" ? "step" : undefined}
          >
            <span className="driver-apply-progress-node">{state === "done" ? "✓" : s.id}</span>
            <span className="driver-apply-progress-label">{s.label}</span>
          </li>
        );
      })}
    </ol>
  );
}

function SuccessPanel({ name, onHome }: { name: string; onHome: () => void }) {
  const first = name.trim().split(/\s+/)[0] || "there";
  return (
    <div className="driver-apply-success">
      <div className="driver-apply-success-badge" aria-hidden="true">
        ✓
      </div>
      <h3 className="driver-apply-success-heading">{applySuccessHeading(first)}</h3>
      <p className="driver-apply-success-body">{applySuccessBody}</p>
      <button type="button" className="driver-apply-submit" onClick={onHome}>
        {applySuccessHome}
        <span className="driver-apply-submit-arrow" aria-hidden="true">
          →
        </span>
      </button>
    </div>
  );
}
