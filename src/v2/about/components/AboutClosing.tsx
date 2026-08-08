import { Reveal } from "@/motion";
import {
  aboutClosingHeading,
  aboutClosingBody,
  aboutClosingCta,
  WHATSAPP_URL,
} from "../aboutContent";

export function AboutClosing() {
  return (
    <section className="about-closing" data-atlas-tone="dark">
      <div className="about-shell">
        <Reveal as="div" className="about-closing-inner">
          <span className="atlas-section-eyebrow atlas-section-eyebrow-light">One step</span>
          <h2 className="about-closing-title">{aboutClosingHeading}</h2>
          <p className="about-closing-body">{aboutClosingBody}</p>
          <div className="about-closing-actions">
            <a className="atlas-button-amber" href="/contact">
              {aboutClosingCta}
              <span className="about-closing-arrow" aria-hidden="true">→</span>
            </a>
            <a
              className="atlas-button-secondary about-closing-whatsapp"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
