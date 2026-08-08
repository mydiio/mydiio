import { Reveal } from "@/motion";
import {
  contactEyebrow,
  contactHeading,
  contactBody,
  contactCalloutLabel,
} from "../contactContent";

export function ContactHero() {
  return (
    <section className="contact-hero" data-atlas-tone="light">
      <div className="contact-shell">
        <Reveal>
          <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">{contactEyebrow}</div>
        </Reveal>

        <Reveal as="h1" className="contact-hero-title">{contactHeading}</Reveal>

        <Reveal>
          <p className="contact-hero-body">{contactBody}</p>
        </Reveal>

        <Reveal>
          <p className="contact-callout">{contactCalloutLabel}</p>
        </Reveal>
      </div>
    </section>
  );
}
