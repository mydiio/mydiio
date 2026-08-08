import { useState } from "react";
import { Reveal } from "@/motion";
import { faqEyebrow, faqHeading, homeFaqs } from "../homeContent";

export function HomeFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="home-faq" data-atlas-tone="light">
      <div className="home-shell home-faq-grid">
        <Reveal as="header" className="home-faq-intro">
          <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">{faqEyebrow}</div>
          <h2 className="atlas-section-heading">{faqHeading}</h2>
          <p className="atlas-section-copy atlas-section-copy-dark">
            If your question is not here, write to us. We answer in plain language.
          </p>
        </Reveal>

        <Reveal as="div" className="home-faq-list">
          {homeFaqs.map((item, index) => {
            const isOpen = openIndex === index;
            const answerId = `home-faq-answer-${index}`;
            const questionId = `home-faq-question-${index}`;
            return (
              <div
                key={item.q}
                className={["home-faq-item", isOpen ? "is-open" : ""].filter(Boolean).join(" ")}
              >
                <button
                  id={questionId}
                  className="home-faq-question"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpenIndex((current) => (current === index ? null : index))}
                >
                  <span className="home-faq-number">{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item.q}</strong>
                  <span className="home-faq-icon" aria-hidden="true">
                    +
                  </span>
                </button>
                <div
                  id={answerId}
                  className="home-faq-answer"
                  role="region"
                  aria-labelledby={questionId}
                  hidden={!isOpen}
                >
                  <p>{item.a}</p>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
