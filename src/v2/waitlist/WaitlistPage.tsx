import { useState, type FormEvent } from "react";
import { waitlistBusinessTypes, waitlistContent } from "./waitlistContent";
import "./waitlist.css";

const SUBMIT_ENDPOINT = "https://rmqexobhpasitrexvaig.supabase.co/functions/v1/submit-application";

type SubmissionStatus = "idle" | "sending" | "sent" | "duplicate" | "error";

export function WaitlistPage() {
  const [status, setStatus] = useState<SubmissionStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: automated form fillers usually complete this hidden field.
    if (String(data.get("website") ?? "").trim()) {
      setStatus("sent");
      return;
    }

    setStatus("sending");

    const payload = {
      application_type: "advertiser",
      contact_name: String(data.get("contact_name") ?? "").trim(),
      business_name: String(data.get("business_name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      business_type: String(data.get("business_type") ?? "").trim() || null,
      tier_interest: "Let's talk",
      budget_range: "Pre-launch waiting list",
      campaign_goal: "Early advertiser access",
      has_creative: null,
      referral_source: "Website waiting list",
      message: "Pre-launch advertiser waiting-list enquiry",
    };

    try {
      const response = await fetch(SUBMIT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.status === 409) {
        setStatus("duplicate");
        return;
      }

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="waitlist-page">
      <div className="waitlist-grid" aria-hidden="true" />

      <header className="waitlist-header">
        <a className="waitlist-wordmark" href="/" aria-label="mydiio home">
          <span>myd</span>
          <span className="waitlist-amber">ii</span>
          <span>o</span>
        </a>
        <a className="waitlist-signin" href="https://admin.mydiio.com/login">
          Advertiser sign in
        </a>
      </header>

      <div className="waitlist-shell">
        <section className="waitlist-intro" aria-labelledby="waitlist-heading">
          <div className="waitlist-status">
            <span className="waitlist-status-dot" aria-hidden="true" />
            {waitlistContent.eyebrow}
          </div>
          <h1 id="waitlist-heading">{waitlistContent.heading}</h1>
          <p>{waitlistContent.body}</p>

          <div className="waitlist-proof" aria-label="Launch status">
            <div>
              <strong>Pilot network</strong>
              <span>Now preparing</span>
            </div>
            <div>
              <strong>Early campaigns</strong>
              <span>Waiting list open</span>
            </div>
            <div>
              <strong>Built in Sri Lanka</strong>
              <span>For Colombo</span>
            </div>
          </div>
        </section>

        <section className="waitlist-card" aria-labelledby="waitlist-form-heading">
          <div className="waitlist-card-eyebrow">{waitlistContent.formEyebrow}</div>
          <h2 id="waitlist-form-heading">{waitlistContent.formHeading}</h2>
          <p className="waitlist-card-copy">{waitlistContent.formBody}</p>

          {status === "sent" || status === "duplicate" ? (
            <div className="waitlist-confirmation" role="status">
              <span className="waitlist-confirmation-mark" aria-hidden="true">
                ✓
              </span>
              <h3>{status === "sent" ? "You're on the list." : "Already registered."}</h3>
              <p>{status === "sent" ? waitlistContent.success : waitlistContent.duplicate}</p>
            </div>
          ) : (
            <form className="waitlist-form" onSubmit={handleSubmit}>
              <div className="waitlist-field-row">
                <label className="waitlist-field">
                  <span>Your name</span>
                  <input
                    name="contact_name"
                    type="text"
                    autoComplete="name"
                    maxLength={120}
                    required
                    disabled={status === "sending"}
                    placeholder="Full name"
                  />
                </label>
                <label className="waitlist-field">
                  <span>Business name</span>
                  <input
                    name="business_name"
                    type="text"
                    autoComplete="organization"
                    maxLength={120}
                    required
                    disabled={status === "sending"}
                    placeholder="Your business"
                  />
                </label>
              </div>

              <label className="waitlist-field">
                <span>Work email</span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength={255}
                  required
                  disabled={status === "sending"}
                  placeholder="you@business.com"
                />
              </label>

              <label className="waitlist-field">
                <span>WhatsApp number</span>
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  maxLength={40}
                  required
                  disabled={status === "sending"}
                  placeholder="+94 77 000 0000"
                />
              </label>

              <label className="waitlist-field">
                <span>
                  Business type <em>Optional</em>
                </span>
                <select name="business_type" disabled={status === "sending"} defaultValue="">
                  <option value="">Select your industry</option>
                  {waitlistBusinessTypes.map((businessType) => (
                    <option value={businessType} key={businessType}>
                      {businessType}
                    </option>
                  ))}
                </select>
              </label>

              <label className="waitlist-honeypot" aria-hidden="true">
                Website
                <input name="website" type="text" tabIndex={-1} autoComplete="off" />
              </label>

              <label className="waitlist-consent">
                <input name="consent" type="checkbox" required disabled={status === "sending"} />
                <span>
                  I agree to mydiio using these details to contact me about early advertiser access,
                  as explained in the <a href="/privacy">Privacy Policy</a> and{" "}
                  <a href="/terms">Terms</a>.
                </span>
              </label>

              <button className="waitlist-submit" type="submit" disabled={status === "sending"}>
                {status === "sending" ? waitlistContent.submitting : waitlistContent.submit}
                <span aria-hidden="true">→</span>
              </button>

              {status === "error" && (
                <p className="waitlist-error" role="alert">
                  {waitlistContent.error}{" "}
                  <a href="https://wa.me/94707471002">Message us on WhatsApp.</a>
                </p>
              )}
            </form>
          )}
        </section>
      </div>

      <footer className="waitlist-footer">
        <span>© 2026 mydiio · Start Smart Technologies Private Limited</span>
        <nav aria-label="Legal links">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/contact">Contact</a>
        </nav>
      </footer>
    </main>
  );
}
