import { Reveal } from "@/motion";
import {
  closingHeading,
  closingBody,
  closingContact,
  WHATSAPP_URL,
  APPLY_URL,
} from "../homeContent";

export function HomeClosing() {
  return (
    <section className="home-closing" data-atlas-tone="light">
      <div className="home-shell">
        <Reveal as="div" className="home-closing-inner">
          <h2 className="atlas-section-heading">{closingHeading}</h2>
          <p className="atlas-section-copy atlas-section-copy-dark">{closingBody}</p>

          <div className="home-closing-actions">
            <a href={APPLY_URL} className="atlas-button-amber">
              Claim your spot
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="atlas-button-secondary"
            >
              Chat on WhatsApp
            </a>
          </div>

          <p className="home-closing-contact">{closingContact}</p>
        </Reveal>
      </div>
    </section>
  );
}
