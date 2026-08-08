import { useState, type FormEvent } from "react";
import { Reveal } from "@/motion";
import {
  contactFormHeading,
  contactFormBody,
  contactFormNameLabel,
  contactFormEmailLabel,
  contactFormMessageLabel,
  contactFormSend,
  contactFormSending,
  contactFormSuccess,
  contactFormError,
  ADMIN_URL,
} from "../contactContent";

const ENQUIRY_ENDPOINT = "https://rmqexobhpasitrexvaig.supabase.co/functions/v1/submit-enquiry";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      source: "contact-page",
    };

    try {
      const res = await fetch(ENQUIRY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(contactFormError);
    }
  }

  return (
    <section className="contact-form-section" data-atlas-tone="light">
      <div className="contact-shell contact-form-shell">
        <Reveal as="div" className="contact-form-copy">
          <span className="atlas-section-eyebrow atlas-section-eyebrow-dark">Contact form</span>
          <h2 className="atlas-section-heading">{contactFormHeading}</h2>
          <p className="atlas-section-copy atlas-section-copy-dark">{contactFormBody}</p>
          <a className="contact-form-admin-link" href={ADMIN_URL} target="_blank" rel="noopener noreferrer">
            <span className="contact-form-admin-link-label">Sign in to the admin panel →</span>
            <span className="contact-form-admin-link-hint">
              For existing advertisers and drivers. Your campaigns, reports and portal live there.
            </span>
          </a>
        </Reveal>

        <Reveal as="div" className="contact-form-wrap">
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <label className="contact-form-field">
              <span className="contact-form-label">{contactFormNameLabel}</span>
              <input
                type="text"
                name="name"
                required
                autoComplete="name"
                maxLength={120}
                placeholder="Your full name"
                disabled={status === "sending"}
              />
            </label>

            <label className="contact-form-field">
              <span className="contact-form-label">{contactFormEmailLabel}</span>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                maxLength={255}
                placeholder="you@company.com"
                disabled={status === "sending"}
              />
            </label>

            <label className="contact-form-field contact-form-field-message">
              <span className="contact-form-label">{contactFormMessageLabel}</span>
              <textarea
                name="message"
                required
                rows={5}
                maxLength={4000}
                placeholder="What would you like to talk about?"
                disabled={status === "sending"}
              />
            </label>

            <div className="contact-form-actions">
              <button
                type="submit"
                className="contact-form-submit"
                disabled={status === "sending"}
              >
                {status === "sending" ? contactFormSending : contactFormSend}
                <span className="contact-form-submit-arrow" aria-hidden="true">→</span>
              </button>
            </div>

            {status === "sent" && (
              <p className="contact-form-status contact-form-status-success" role="status">
                {contactFormSuccess}
              </p>
            )}
            {status === "error" && error && (
              <p className="contact-form-status contact-form-status-error" role="alert">
                {error}
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
