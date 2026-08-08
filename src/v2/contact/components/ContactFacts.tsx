import { Reveal } from "@/motion";
import {
  contactAddressHeading,
  contactAddressLines,
  contactHoursLabel,
  contactHoursLines,
  contactStatusLabel,
  contactStatusOn,
  contactStatusOff,
} from "../contactContent";

export function ContactFacts() {
  return (
    <section className="contact-facts" data-atlas-tone="light">
      <div className="contact-shell">
        <Reveal as="div" className="contact-facts-grid" stagger={0.06}>
          <article className="contact-fact">
            <span className="contact-fact-label">{contactAddressHeading}</span>
            <div className="contact-fact-body">
              {contactAddressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </div>
          </article>

          <article className="contact-fact">
            <span className="contact-fact-label">{contactHoursLabel}</span>
            <div className="contact-fact-body">
              {contactHoursLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </div>
          </article>

          <article className="contact-fact">
            <span className="contact-fact-label">{contactStatusLabel}</span>
            <span className="contact-fact-status">
              <span className="contact-fact-status-dot" aria-hidden="true" />
              <span>{contactStatusOn}</span>
            </span>
            <span className="contact-fact-status-note">{contactStatusOff}</span>
          </article>

          <article className="contact-fact contact-fact-admin">
            <span className="contact-fact-label">Admin panel</span>
            <a className="contact-fact-link" href="https://admin.mydiio.com" target="_blank" rel="noopener noreferrer">
              admin.mydiio.com →
            </a>
            <span className="contact-fact-status-note">
              Existing advertisers and drivers sign in there.
            </span>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
