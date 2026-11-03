import { useEffect, useState, type FormEvent } from "react";
import { driverTranslate, type DriverLanguage } from "./driverTranslations";
import { contactValid, leadMeta, useLeadGuard } from "@/lib/lead-intake";
import { AtlasNav, AtlasFooter } from "@/v2/layout";
import "../foundation/homepage.css";
import "../commercial/commercial.css";
import "./driverExperience.css";
const ENDPOINT = "https://rmqexobhpasitrexvaig.supabase.co/functions/v1/submit-application";
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
    <main lang={lang} data-v2-page data-driver-page className="driver-experience">
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
              <h1>{application ? t("formTitle") : t("title")}</h1>
              <p className="driver-lead">{t("intro")}</p>
              <div className="commercial-actions">
                <a
                  className="atlas-button-amber"
                  href={application ? "#driver-enquiry" : link("/drivers/apply")}
                >
                  {t("apply")} <span aria-hidden="true">↗</span>
                </a>
                <a
                  className="driver-text-link"
                  href={application ? link("/drive") : "#eligibility"}
                >
                  {application ? t("back") : t("eligibility")} <span aria-hidden="true">↓</span>
                </a>
              </div>
              <p className="driver-response">{t("response")}</p>
            </div>
            {!application && (
              <figure className="driver-hero-image">
                <img
                  src="/assets/driver-portrait-tuk-golden-hour.png"
                  alt={t("sample")}
                  width="1920"
                  height="1080"
                />
                <figcaption>{t("sample")}</figcaption>
                <div className="driver-image-note">
                  <span>{t("earnings")}</span>
                  <strong>{t("base")}</strong>
                </div>
              </figure>
            )}
          </div>
        </div>
      </section>
      {!application && (
        <section className="commercial-section driver-earnings" data-atlas-tone="light">
          <div className="commercial-shell">
            <div className="driver-section-heading">
              <span className="commercial-eyebrow">01 / {t("earnings")}</span>
              <h2>{t("base")}</h2>
            </div>
            <div className="commercial-grid">
              <article className="driver-pay-card">
                <p>{t("pay")}</p>
                <p>{t("bonus")}</p>
              </article>
              <article>
                <span className="commercial-eyebrow">{t("joiningLabel")}</span>
                <h3>{t("feeTitle")}</h3>
                <p>{t("fee")}</p>
              </article>
            </div>
          </div>
        </section>
      )}
      <section
        id="eligibility"
        className="commercial-section driver-eligibility"
        data-atlas-tone="light"
      >
        <div className="commercial-shell driver-split">
          <div>
            <span className="commercial-eyebrow">
              {application ? "01" : "02"} / {t("eligibility")}
            </span>
            <h2>{t("eligibility")}</h2>
            <p>{t("ageRule")}</p>
          </div>
          <article className="driver-safety-card">
            <span className="driver-age-mark">
              15<span>{t("years")}</span>
            </span>
            <h3>{t("safetyLabel")}</h3>
            <p>{t("safety")}</p>
          </article>
        </div>
      </section>
      <section className="commercial-section driver-process" data-atlas-tone="dark">
        <div className="commercial-shell">
          <span className="commercial-eyebrow">
            {application ? "02" : "03"} / {t("process")}
          </span>
          <h2>{t("process")}</h2>
          <ol className="driver-process-list">
            {t("steps")
              .split("→")
              .map((step, i) => (
                <li key={i}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <p>{step.trim()}</p>
                </li>
              ))}
          </ol>
        </div>
      </section>
      <section className="commercial-section driver-documents" data-atlas-tone="light">
        <div className="commercial-shell">
          {application ? (
            <details open>
              <summary>{t("documents")}</summary>
              {documents}
            </details>
          ) : (
            <>
              <span className="commercial-eyebrow">04 / {t("documents")}</span>
              <h2>{t("documents")}</h2>
              {documents}
            </>
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
              <h2>{t("formTitle")}</h2>
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
          <h2>{application ? t("contact") : t("apply")}</h2>
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
