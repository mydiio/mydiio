import { Reveal } from "@/motion";
import { aboutBookEyebrow, aboutBookHeading, aboutBookBody, aboutBookCta } from "../aboutContent";

export function AboutBook() {
  return (
    <section className="about-book" data-atlas-tone="light">
      <div className="about-shell about-book-shell">
        <Reveal as="div" className="about-book-card">
          <span className="atlas-section-eyebrow atlas-section-eyebrow-dark">
            {aboutBookEyebrow}
          </span>
          <h2 className="about-book-title">{aboutBookHeading}</h2>
          <p className="about-book-body">{aboutBookBody}</p>
          <a className="atlas-button-amber about-book-cta" href="/contact">
            {aboutBookCta}
            <span className="about-book-cta-arrow" aria-hidden="true">
              →
            </span>
          </a>
        </Reveal>

        <div className="about-book-stack" aria-hidden="true">
          <span className="about-book-page about-book-page-1" />
          <span className="about-book-page about-book-page-2" />
          <span className="about-book-page about-book-page-3" />
          <span className="about-book-cover">
            <span className="about-book-cover-eyebrow">The mydiio Book</span>
            <span className="about-book-cover-title">Every Journey, Connected.</span>
            <span className="about-book-cover-meta">Foundational Edition · August 2026</span>
          </span>
        </div>
      </div>
    </section>
  );
}
