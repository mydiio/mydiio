import { useState, type FormEvent } from "react";
import { Reveal } from "@/motion";
import {
  launchBusinessTypes,
  launchBudgets,
  launchContactNote,
  launchDuplicate,
  launchEmailLabel,
  launchError,
  launchFormBody,
  launchFormHeading,
  launchGoals,
  launchHasCreativeLabel,
  launchHasCreativeNoLabel,
  launchHasCreativeYesLabel,
  launchNameLabel,
  launchReferralLabel,
  launchReferrals,
  launchReferralOtherLabel,
  launchSend,
  launchSending,
  launchSuccess,
  launchTypeLabel,
  launchWhatsAppLabel,
  launchGoalLabel,
  launchBusinessNameLabel,
} from "../launchContent";

const SUBMIT_ENDPOINT =
  "https://rmqexobhpasitrexvaig.supabase.co/functions/v1/submit-application";

type Status = "idle" | "sending" | "sent" | "duplicate" | "error";

export function LaunchForm() {
  const [businessName, setBusinessName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [budget, setBudget] = useState("");
  const [goal, setGoal] = useState("");
  const [hasCreative, setHasCreative] = useState<boolean | null>(null);
  const [referral, setReferral] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  function tierForBudget(b: string): string {
    const m = launchBudgets.find((x) => x.id === b);
    return m?.tier ?? "Not sure, help me choose";
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError(null);

    const payload = {
      application_type: "advertiser",
      business_name: businessName,
      contact_name: contactName,
      email,
      phone: whatsappNumber,
      business_type: businessType,
      budget_range: budget,
      tier_interest: tierForBudget(budget),
      campaign_goal: goal,
      has_creative: hasCreative,
      referral_source: referral,
    };

    try {
      const res = await fetch(SUBMIT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.status === 409) {
        setStatus("duplicate");
        return;
      }
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(launchError);
    }
  }

  return (
    <section className="launch-form-section" data-atlas-tone="light">
      <div className="launch-shell launch-form-shell">
        <Reveal as="div" className="launch-form-copy">
          <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">
            Application
          </div>
          <h2 className="atlas-section-heading">{launchFormHeading}</h2>
          <p className="atlas-section-copy atlas-section-copy-dark">
            {launchFormBody}
          </p>
          <p className="launch-form-note">{launchContactNote}</p>
        </Reveal>

        <Reveal as="div" className="launch-form-wrap">
          <form className="launch-form" onSubmit={handleSubmit} noValidate>
          <div className="launch-form-grid">
            <label className="launch-form-field">
              <span className="launch-form-label">{launchNameLabel}</span>
              <input
                type="text"
                name="contact_name"
                required
                autoComplete="name"
                maxLength={120}
                placeholder="Your full name"
                disabled={status === "sending"}
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
              />
            </label>

            <label className="launch-form-field">
              <span className="launch-form-label">{launchBusinessNameLabel}</span>
              <input
                type="text"
                name="business_name"
                required
                maxLength={120}
                placeholder="e.g. City Pharmacy"
                disabled={status === "sending"}
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
            </label>

            <label className="launch-form-field">
              <span className="launch-form-label">{launchTypeLabel}</span>
              <select
                name="business_type"
                required
                disabled={status === "sending"}
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
              >
                <option value="" disabled>
                  Select…
                </option>
                {launchBusinessTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>

            <label className="launch-form-field">
              <span className="launch-form-label">{launchEmailLabel}</span>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                maxLength={255}
                placeholder="you@business.com"
                disabled={status === "sending"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="launch-form-field launch-form-field-wide">
              <span className="launch-form-label">{launchWhatsAppLabel}</span>
              <input
                type="tel"
                name="phone"
                required
                autoComplete="tel"
                maxLength={40}
                placeholder="+94 77 000 0000"
                disabled={status === "sending"}
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
              />
            </label>

            <fieldset className="launch-form-field launch-form-field-wide">
              <legend className="launch-form-label">{launchGoalLabel}</legend>
              <div className="launch-form-chip-group">
                {launchGoals.map((g) => (
                  <label
                    key={g}
                    className={[
                      "launch-form-chip",
                      goal === g ? "is-active" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <input
                      type="radio"
                      name="campaign_goal"
                      value={g}
                      checked={goal === g}
                      disabled={status === "sending"}
                      onChange={() => setGoal(g)}
                    />
                    <span>{g}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="launch-form-field launch-form-field-wide">
              <legend className="launch-form-label">Monthly budget</legend>
              <div className="launch-form-chip-group">
                {launchBudgets.map((b) => (
                  <label
                    key={b.id}
                    className={[
                      "launch-form-chip launch-form-chip-wide",
                      budget === b.id ? "is-active" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <input
                      type="radio"
                      name="budget_range"
                      value={b.id}
                      checked={budget === b.id}
                      disabled={status === "sending"}
                      onChange={() => setBudget(b.id)}
                    />
                    <span className="launch-form-chip-id">{b.id}</span>
                    <span className="launch-form-chip-tier">{b.tier}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="launch-form-field launch-form-field-wide">
              <legend className="launch-form-label">
                {launchHasCreativeLabel}
              </legend>
              <div className="launch-form-chip-group">
                <label
                  className={[
                    "launch-form-chip",
                    hasCreative === true ? "is-active" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <input
                    type="radio"
                    name="has_creative"
                    checked={hasCreative === true}
                    disabled={status === "sending"}
                    onChange={() => setHasCreative(true)}
                  />
                  <span>{launchHasCreativeYesLabel}</span>
                </label>
                <label
                  className={[
                    "launch-form-chip",
                    hasCreative === false ? "is-active" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <input
                    type="radio"
                    name="has_creative"
                    checked={hasCreative === false}
                    disabled={status === "sending"}
                    onChange={() => setHasCreative(false)}
                  />
                  <span>{launchHasCreativeNoLabel}</span>
                </label>
              </div>
            </fieldset>

            <label className="launch-form-field launch-form-field-wide">
              <span className="launch-form-label">{launchReferralLabel}</span>
              <select
                name="referral_source"
                value={referral}
                disabled={status === "sending"}
                onChange={(e) => setReferral(e.target.value)}
              >
                <option value="">{launchReferralOtherLabel}</option>
                {launchReferrals.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="launch-form-actions">
            <button
              type="submit"
              className="launch-form-submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? launchSending : launchSend}
              <span className="launch-form-submit-arrow" aria-hidden="true">
                →
              </span>
            </button>
          </div>

          {status === "sent" && (
            <p
              className="launch-form-status launch-form-status-success"
              role="status"
            >
              {launchSuccess}
            </p>
          )}
          {status === "duplicate" && (
            <p
              className="launch-form-status launch-form-status-info"
              role="status"
            >
              {launchDuplicate}
            </p>
          )}
          {status === "error" && error && (
            <p
              className="launch-form-status launch-form-status-error"
              role="alert"
            >
              {error}
            </p>
          )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
