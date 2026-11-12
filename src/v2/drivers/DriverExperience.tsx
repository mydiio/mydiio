import { useEffect, useState, type FormEvent } from "react";
import { driverTranslate, type DriverLanguage } from "./driverTranslations";
import { contactValid, leadMeta, useLeadGuard } from "@/lib/lead-intake";
import { AtlasNav, AtlasFooter } from "@/v2/layout";
import "../foundation/homepage.css";
import "../commercial/commercial.css";
import "./driverExperience.css";
import "@/v2/foundation/atlas-typography-contract.css";
import "@/v2/foundation/atlas-page-spacing.css";
import "./driver-atlas-final-polish.css";
import "./driver-atlas-heading-accents.css";
const ENDPOINT = "https://rmqexobhpasitrexvaig.supabase.co/functions/v1/submit-application";
function driverBrandEmphasis(text: string, phrase: string) {
  const start = phrase ? text.lastIndexOf(phrase) : -1;
  if (start < 0) return text;
  return (
    <>
      {text.slice(0, start)}
      <span className="driver-brand-accent">{text.slice(start, start + phrase.length)}</span>
      {text.slice(start + phrase.length)}
    </>
  );
}

function driverAccentPhrase(language: DriverLanguage, english: string, sinhala: string, tamil: string) {
  return language === "si" ? sinhala : language === "ta" ? tamil : english;
}

export function DriverExperience({ application = false }: { application?: boolean }) {

  const [lang, setLang] = useState<DriverLanguage>("en"),
    [preferred, setPreferred] = useState<DriverLanguage>("en");
  const [year, setYear] = useState(""),
    [status, setStatus] = useState("idle"),
    [error, setError] = useState(false),
    [invalid, setInvalid] = useState(false);
  const guard = useLeadGuard();
  const t = (key: Parameters<typeof driverTranslate>[1]) => driverTranslate(lang, key);
  const currentYear = new Date().getFullYear();
  const age = year.length === 4 ? currentYear - Number(year) : null;
  const older = age !== null && age > 15;
  useEffect(() => {
    let choice = "";
    try {
      choice =
        new URLSearchParams(location.search).get("lang") ||
        localStorage.getItem("mydiio.driver.lang") ||
        navigator.languages?.find((x) => /^(si|ta)/i.test(x)) ||
        navigator.language;
    } catch {}
    const l: DriverLanguage = choice.startsWith("si")
      ? "si"
      : choice.startsWith("ta")
        ? "ta"
        : "en";
    setLang(l);
    setPreferred(l);
  }, []);
  function change(l: DriverLanguage) {
    setLang(l);
    setPreferred(l);
    try {
      localStorage.setItem("mydiio.driver.lang", l);
    } catch {}
  }
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending" || status === "sent") return;
    const form = e.currentTarget,
      d = new FormData(form);
    const value = (k: string) => String(d.get(k) || "").trim();
    if (
      !form.checkValidity() ||
      !contactValid(value("email"), value("phone")) ||
      !value("full_name") ||
      !value("vehicle_registration") ||
      !value("vehicle_model") ||
      !value("route_details") ||
      age === null ||
      age < 0 ||
      Number(year) < 1900 ||
      (older && !value("condition_history"))
    ) {
      setInvalid(true);
      return;
    }
    setInvalid(false);
    setError(false);
    setStatus("sending");
    const payload = {
      ...leadMeta(form, guard.started.current),
      intake_version: "2026-10",
      application_type: "driver",
      full_name: value("full_name"),
      phone: value("phone"),
      email: value("email"),
      whatsapp_number: value("phone"),
      vehicle_registration: value("vehicle_registration"),
      vehicle_model: value("vehicle_model"),
      manufacture_year: Number(year),
      vehicle_age: String(age),
      vehicle_ownership: value("vehicle_ownership"),
      route_details: value("route_details"),
      operating_zones: [value("route_details")],
      driving_days: value("driving_days"),
      daily_hours: Number(value("daily_hours")),
      preferred_language: preferred,
      condition_history: value("condition_history"),
      safety_confirmed: d.get("safety_confirmed") === "on",
      message: value("email") ? `Contact email: ${value("email")}` : "",
    };
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw Error();
      setStatus("sent");
      form.reset();
      setYear("");
    } catch {
      setError(true);
      setStatus("error");
    }
  }
  const link = (url: string) => `${url}?lang=${lang}`;
  const documents = (
    <>
      <p>{t("noUpload")}</p>
      <ul className="driver-document-list">
        {(["doc1", "doc2", "doc3", "doc4", "doc5"] as const).map((key, i) => (
          <li key={key}>
            <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <p>{t(key)}</p>
          </li>
        ))}
      </ul>
    </>
  );
  const languages = (
    <div className="driver-language-switch" role="group" aria-label="Language / භාෂාව / மொழி">
      {(["en", "si", "ta"] as const).map((l, i) => (
        <button type="button" key={l} lang={l} aria-pressed={lang === l} onClick={() => change(l)}>
          {["English", "සිංහල", "தமிழ்"][i]}
        </button>
      ))}
    </div>
  );
  return (
    <main lang={lang} data-v2-page data-driver-page className={application ? "driver-experience driver-experience--application" : "driver-experience driver-experience--landing"}>
      <AtlasNav
        initialTone="light"
        locale={lang}
        campaignTo="/drivers/apply"
        campaignLabel={t("apply")}
      />
      <section
        className={application ? "driver-intro driver-intro-apply" : "driver-intro"}
        data-atlas-tone="light"
      >
        <div className="commercial-shell">
          <div className="driver-intro-top">
            <span className="commercial-eyebrow">{t("driverLabel")}</span>
            {languages}
          </div>
          <div className="driver-intro-grid">
            <div className="driver-intro-copy">
              <h1>{application
                ? driverBrandEmphasis(t("formTitle"), driverAccentPhrase(lang, "driver enquiry", "රියදුරු විමසීම", "ஓட்டுநர் விசாரணை"))
                : driverBrandEmphasis(t("title"), driverAccentPhrase(lang, "every journey.", "අමතර ආදායමක් උපයන්න.", "கூடுதல் வருமானம் பெறுங்கள்."))}</h1>
              {!application && <div className="driver-hero-benefit">{t("earnings")}</div>}
              <p className="driver-lead">{t("intro")}</p>
              {!application && (
                <div className="driver-hero-pay">
                  <span>{t("earnings")}</span>
                  <strong>{t("base")}</strong>
                </div>
              )}
              <div className="commercial-actions">
                <a className="atlas-button-amber" href={application ? "#driver-enquiry" : link("/drivers/apply")}>
                  {t("apply")} <span aria-hidden="true">↗</span>
                </a>
                <a className="driver-text-link" href={application ? link("/drive") : "#eligibility"}>
                  {application ? t("back") : t("eligibility")} <span aria-hidden="true">↓</span>
                </a>
              </div>
              <p className="driver-response">{t("response")}</p>
            </div>
            {!application && (
              <aside className="driver-atlas-summary" aria-label={t("earnings")}>
                <figure className="driver-atlas-summary-photo">
                  <img src="/assets/about-respect-male-driver.jpg" alt="A tuk-tuk driver in Sri Lanka" loading="eager" decoding="async" />
                  <figcaption>People behind the journeys</figcaption>
                </figure>
                <div className="driver-atlas-summary-content">
                  <span className="driver-atlas-summary-kicker">mydiio / {t("earnings")}</span>
                <div className="driver-atlas-summary-main">
                  <span>{t("baseLabel")}</span>
                  <strong>LKR 4,000</strong>
                  <p>{t("baseDescription")}</p>
                </div>
                <div className="driver-atlas-summary-divider" />
                <div className="driver-atlas-summary-bonus">
                  <div><span>{t("bonusLabel")}</span><strong>+ LKR 2,000</strong></div>
                  <p>{t("bonusDescription")}</p>
                </div>
                <div className="driver-atlas-summary-total"><span>{t("totalLabel")}</span><strong>LKR 6,000</strong></div>
                <p className="driver-atlas-summary-note">{t("totalDisclaimer")}</p>
                </div>
              </aside>
            )}
          </div>
        </div>
      </section>
      {!application && (
        <section className="commercial-section driver-earnings driver-earnings-v53" data-atlas-tone="light" aria-labelledby="driver-earnings-title">
          <div className="commercial-shell">
            <div className="driver-section-heading driver-earnings-heading">
              <span className="commercial-eyebrow">01 / {t("earnings")}</span>
              <h2 id="driver-earnings-title">{driverBrandEmphasis(
                t("earningsHeadline"),
                driverAccentPhrase(lang, "Earn extra.", "අමතර ආදායමක් උපයන්න.", "கூடுதல் வருமானம் பெறுங்கள்.")
              )}</h2>
              <p>{t("earningsIntro")}</p>
            </div>
            <div className="driver-earnings-cards">
              <article className="driver-earning-tile driver-earning-tile-base">
                <span className="driver-earning-symbol" aria-hidden="true">↗</span>
                <span className="driver-earning-label">{t("baseLabel")}</span>
                <strong className="driver-earning-amount"><small>LKR</small> 4,000</strong>
                <p>{t("baseDescription")}</p>
              </article>
              <article className="driver-earning-tile driver-earning-tile-bonus">
                <span className="driver-earning-symbol" aria-hidden="true">✦</span>
                <span className="driver-earning-label">{t("bonusLabel")}</span>
                <strong className="driver-earning-amount"><small>+ LKR</small> 2,000</strong>
                <p>{t("bonusDescription")}</p>
              </article>
            </div>
            <div className="driver-earnings-total">
              <div>
                <span>{t("totalLabel")}</span>
                <strong><small>LKR</small> 6,000</strong>
              </div>
              <p>{t("totalDisclaimer")}</p>
            </div>
            <div className="driver-earnings-perks" aria-label={t("benefitsLabel")}>
              <div><span aria-hidden="true">◎</span><p>{t("benefitRoutes")}</p></div>
              <div><span aria-hidden="true">◷</span><p>{t("benefitPaid")}</p></div>
              <div><span aria-hidden="true">▣</span><p>{t("benefitScreen")}</p></div>
            </div>
            <div className="driver-earnings-fee">
              <div><span>{t("joiningLabel")}</span><strong>{t("feeTitle")}</strong></div>
              <details>
                <summary>{t("earningsDetailsLabel")}</summary>
                <div className="driver-earnings-terms">
                  <h3>{t("earnings")}</h3>
                  <p>{t("pay")}</p>
                  <p>{t("bonus")}</p>
                  <h3>{t("joiningLabel")}</h3>
                  <p>{t("fee")}</p>
                </div>
              </details>
            </div>
          </div>
        </section>
      )}
      {/* V5.7: consolidated eligibility and onboarding; existing design elements only */}
      <section className="atlas-editorial-band" data-atlas-tone="dark" aria-labelledby="driver-editorial-heading">
        <div className="commercial-shell atlas-editorial-band__grid">
          <div className="atlas-editorial-band__copy">
            <span className="atlas-editorial-band__eyebrow">People behind the journey</span>
            <h2 id="driver-editorial-heading">{driverBrandEmphasis("Your vehicle. A new opportunity.", "A new opportunity.")}</h2>
            <p>mydiio brings useful passenger information and advertising into everyday tuk-tuk journeys, with a simple way for eligible drivers to earn extra.</p>
          </div>
          <figure className="atlas-editorial-band__photo">
            <video className="atlas-driver-marine-video" autoPlay muted loop playsInline preload="metadata" poster="/assets/installation-screen-live-colombo.png" aria-label="Marine Drive journey filmed from a tuk-tuk"><source src="/assets/video/act1/compressed/m006-marine-drive.mp4" type="video/mp4" /></video>
          </figure>
        </div>
      </section>
      <section id="eligibility" className="commercial-section driver-eligibility driver-qualify-v56 driver-qualify-v57 driver-qualify-v58" data-atlas-tone="light" aria-labelledby="driver-v57-eligibility-title">
        <div className="commercial-shell">
          <div className="driver-v57-section-header">
            <span className="commercial-eyebrow">{application ? "01" : "02"} / {t("eligibility")}</span>
            <h2 id="driver-v57-eligibility-title">{driverBrandEmphasis(
              lang === "si" ? "ඔබේ ත්‍රිරෝද රථය සුදුසුද?" : lang === "ta" ? "உங்கள் வாகனம் தகுதியானதா?" : "Is your tuk-tuk eligible?",
              driverAccentPhrase(lang, "eligible?", "සුදුසුද?", "தகுதியானதா?")
            )}</h2>
            <p>{lang === "si" ? "ආරම්භ කිරීමට පෙර මූලික සුදුසුකම්." : lang === "ta" ? "தொடங்குவதற்கு முன் அடிப்படைத் தகுதிகள்." : "A simple check before you join the network."}</p>
          </div>
          <div className="driver-v57-qualification" aria-label={t("eligibility")}>
            <div className="driver-v58-vehicle-art" aria-hidden="true">
              <span className="driver-v58-sun" />
              <img src="/assets/drivers/yellow-auto-rickshaw.png" alt="" loading="lazy" />
            </div>
            <div className="driver-v57-requirements">
              <article className="driver-v57-requirement">
                <span className="driver-v57-requirement-index" aria-hidden="true">01</span>
                <div><strong className="driver-v57-requirement-feature">15 <small>{t("years")}</small></strong>
                <h3>{lang === "si" ? "සාමාන්‍ය වයස් සීමාව" : lang === "ta" ? "வழக்கமான வயது வரம்பு" : "Usual vehicle age limit"}</h3><p>{lang === "si" || lang === "ta" ? t("ageRule") : "Older tuk-tuks may be considered after inspection."}</p></div>
              </article>
              <article className="driver-v57-requirement">
                <span className="driver-v57-requirement-index" aria-hidden="true">02</span>
                <div><h3>{lang === "en" ? "Roadworthy & safe" : t("safetyLabel")}</h3><p>{lang === "en" ? "Valid documents, secure seating and suitable space for a screen." : t("safety")}</p></div>
              </article>
            </div>
          </div>
        </div>
      </section>
      <section className="commercial-section driver-process driver-onboarding-v56 driver-onboarding-v57 driver-onboarding-v58" data-atlas-tone="dark" aria-labelledby="driver-v57-process-title">
        <div className="commercial-shell">
          <div className="driver-v57-section-header">
            <span className="commercial-eyebrow">{application ? "02" : "03"} / {t("process")}</span>
            <h2 id="driver-v57-process-title">{driverBrandEmphasis(
              lang === "si" ? "පියවර හතරකින් එක්වන්න." : lang === "ta" ? "நான்கு படிகளில் இணையுங்கள்." : "From enquiry to earning.",
              driverAccentPhrase(lang, "earning.", "එක්වන්න.", "இணையுங்கள்.")
            )}</h2>
            <p>{lang === "si" ? "මුල් විමසීමේ සිට තිරය සවි කිරීම දක්වා." : lang === "ta" ? "முதல் விசாரணையிலிருந்து திரை நிறுவல் வரை." : "Four simple steps to get your screen installed."}</p>
          </div>
          <ol className="driver-v57-journey">
            {(() => {
              const steps = t("steps").split("→").map((part) => part.trim());
              const groups = [[0], [1], [2, 3], [4, 5]];
              const headings = lang === "si" ? ["විමසීම", "සමාලෝචනය", "පරීක්ෂාව", "ස්ථාපනය"] : lang === "ta" ? ["விசாரணை", "மதிப்பாய்வு", "ஆய்வு", "நிறுவல்"] : ["Enquire", "Review", "Inspect", "Install"];
              return groups.map((indices, i) => (
                <li className="driver-v57-milestone" key={i}>
                  <span className="driver-v57-milestone-dot" aria-hidden="true"><span>{String(i + 1).padStart(2, "0")}</span></span>
                  <h3>{headings[i]}</h3>
                  <p>{lang === "en" ? ["Tell us about your vehicle and usual routes.", "We check your vehicle, route and suitability.", "Submit documents and complete a safety check.", "Complete the agreement, joining fee and installation."][i] : indices.map((n) => steps[n]).filter(Boolean).join(" · ")}</p>
                </li>
              ));
            })()}
          </ol>
          <details className="driver-v56-documents driver-v57-documents driver-v59-documents">
            <summary>
              <span className="driver-v59-doc-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 3h7l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M14 3v5h5M9 12h6M9 16h6"/></svg>
              </span>
              <span className="driver-v59-doc-heading">
                <strong>{lang === "en" ? "Documents required" : t("documents")}</strong>
                <small>{lang === "en" ? "Only requested after initial screening" : t("noUpload")}</small>
              </span>
              <span className="driver-v59-doc-count">{lang === "en" ? "5 items" : "05"}</span>
              <span className="driver-v59-doc-chevron" aria-hidden="true" />
            </summary>
            <div className="driver-v59-doc-content">
              <ul className="driver-v59-doc-list">
                {(["doc1", "doc2", "doc3", "doc4", "doc5"] as const).map((key, i) => (
                  <li key={key}>
                    <span className="driver-v59-doc-check" aria-hidden="true">✓</span>
                    <div>
                      <strong>{lang === "en" ? ["Driver identification", "Vehicle registration", "Insurance", "Permits & inspection", "Vehicle photographs"][i] : t(key)}</strong>
                      {lang === "en" && <p>{["NIC and valid driving licence.", "Registration certificate and owner consent, if applicable.", "Current insurance covering the intended use.", "Applicable fitness, revenue, emissions and passenger permits.", "Clear vehicle photographs for review."][i]}</p>}
                    </div>
                    <span className="driver-v59-doc-number" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  </li>
                ))}
              </ul>
              <p className="driver-v59-doc-note">{t("noUpload")}</p>
            </div>
          </details>
          {!application && (
            <div className="driver-v56-cta driver-v57-cta">
              <div><strong>{lang === "si" ? "එක්වීමට සූදානම්ද?" : lang === "ta" ? "இணையத் தயாரா?" : "Ready to join mydiio?"}</strong>
                <p>{lang === "si" ? "සරල විමසීමකින් ආරම්භ කරන්න." : lang === "ta" ? "ஒரு எளிய விசாரணையுடன் தொடங்குங்கள்." : "Send a driver enquiry to get started."}</p></div>
              <a href={link("/drivers/apply")} className="driver-v56-cta-link">{t("apply")} <span aria-hidden="true">↗</span></a>
            </div>
          )}
        </div>
      </section>
      {application && (
        <section
          id="driver-enquiry"
          className="commercial-section driver-form-section"
          data-atlas-tone="light"
        >
          <div className="commercial-shell driver-form-layout">
            <aside>
              <span className="commercial-eyebrow">03 / {t("formTitle")}</span>
              <h2>{driverBrandEmphasis(t("formTitle"), driverAccentPhrase(lang, "driver enquiry", "රියදුරු විමසීම", "ஓட்டுநர் விசாரணை"))}</h2>
              <p>{t("privacy")}</p>
              <details open>
                <summary>{t("feeTitle")}</summary>
                <p>{t("fee")}</p>
              </details>
              <details>
                <summary>{t("earnings")}</summary>
                <p>{t("base")}</p>
                <p>{t("pay")}</p>
                <p>{t("bonus")}</p>
              </details>
              <p className="driver-response">{t("response")}</p>
            </aside>
            <form
              inert={!guard.ready}
              data-intake-ready={guard.ready}
              className="intake-form"
              onSubmit={submit}
              noValidate
            >
              {guard.fields}
              <fieldset>
                <legend>
                  <span>01</span>
                  {t("contactDetails")}
                </legend>
                <div className="commercial-grid">
                  <label>
                    {t("name")}
                    <input name="full_name" required maxLength={120} autoComplete="name" />
                  </label>
                  <label>
                    {t("phone")}
                    <input name="phone" type="tel" required maxLength={30} autoComplete="tel" />
                  </label>
                  <label>
                    {t("email")}
                    <input name="email" type="email" maxLength={255} autoComplete="email" />
                  </label>
                  <label>
                    {t("language")}
                    <select
                      value={preferred}
                      onChange={(e) => setPreferred(e.target.value as DriverLanguage)}
                    >
                      <option value="en">English</option>
                      <option value="si">සිංහල</option>
                      <option value="ta">தமிழ்</option>
                    </select>
                  </label>
                </div>
              </fieldset>
              <fieldset>
                <legend>
                  <span>02</span>
                  {t("vehicleDetails")}
                </legend>
                <div className="commercial-grid">
                  <label>
                    {t("registration")}
                    <input name="vehicle_registration" required maxLength={30} />
                  </label>
                  <label>
                    {t("model")}
                    <input name="vehicle_model" required maxLength={120} />
                  </label>
                  <label>
                    {t("year")}
                    <input
                      name="manufacture_year"
                      type="number"
                      min={1900}
                      max={currentYear}
                      required
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                    />
                  </label>
                  <label>
                    {t("ownership")}
                    <select name="vehicle_ownership" required defaultValue="">
                      <option value="" disabled>
                        {t("select")}
                      </option>
                      <option value="owner">{t("yes")}</option>
                      <option value="non-owner">{t("no")}</option>
                    </select>
                  </label>
                </div>
                {age !== null && age >= 0 && (
                  <p className="intake-note" role="status">
                    {t("age")}: {age} {t("years")}
                  </p>
                )}
                {older && (
                  <p className="commercial-warning" role="status">
                    {t("older")}
                  </p>
                )}
                <label>
                  {t("history")}
                  {older ? " *" : ""}
                  <textarea name="condition_history" required={older} maxLength={1000} rows={3} />
                </label>
              </fieldset>
              <fieldset>
                <legend>
                  <span>03</span>
                  {t("routeDetails")}
                </legend>
                <label>
                  {t("routes")}
                  <textarea name="route_details" required maxLength={1000} rows={3} />
                </label>
                <div className="commercial-grid">
                  <label>
                    {t("days")}
                    <input name="driving_days" required maxLength={120} />
                  </label>
                  <label>
                    {t("hours")}
                    <input name="daily_hours" type="number" min={1} max={24} required />
                  </label>
                </div>
              </fieldset>
              <label className="intake-consent">
                <input type="checkbox" name="safety_confirmed" required />
                <span>{t("confirm")}</span>
              </label>
              <p className="intake-note">
                {t("privacy")} <a href="/privacy">{t("privacyLink")}</a>.
              </p>
              {invalid && (
                <p role="alert" className="commercial-error">
                  {t("invalid")}
                </p>
              )}
              {error && (
                <p role="alert" className="commercial-error">
                  {t("error")}
                </p>
              )}
              <button
                className="atlas-button-amber intake-submit"
                disabled={!guard.ready || status === "sending" || status === "sent"}
              >
                {status === "sending"
                  ? t("sending")
                  : status === "sent"
                    ? t("success")
                    : t("apply")}
                <span aria-hidden="true">↗</span>
              </button>
              {status === "sent" && (
                <p className="intake-success" role="status">
                  {t("success")} {t("response")}
                </p>
              )}
            </form>
          </div>
        </section>
      )}
      <section className="commercial-section driver-closing" data-atlas-tone="light">
        <div className="commercial-shell">
          <span className="commercial-eyebrow">mydiio / Colombo</span>
          <h2>{application
            ? driverBrandEmphasis(t("contact"), t("contact"))
            : driverBrandEmphasis(t("apply"), driverAccentPhrase(lang, "driver enquiry", "රියදුරු විමසීම", "ஓட்டுநர் விசாரணை"))}</h2>
          <p>{t("response")}</p>
          <div className="commercial-actions">
            {!application && (
              <a className="atlas-button-amber" href={link("/drivers/apply")}>
                {t("apply")} ↗
              </a>
            )}
            <a className="atlas-button-secondary" href="https://wa.me/94707471002">
              {t("whatsapp")}
            </a>
          </div>
        </div>
      </section>
      <AtlasFooter locale={lang} />
    </main>
  );
}
