import { useState } from "react";
import {
  advertiserFaqs,
  faqEyebrow,
  faqHeading,
  faqBody,
  faqContactPrompt,
  faqContactLinkLabel,
} from "../advertiserContent";
import { Reveal } from "@/motion";

export function AdvertiserFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      className="advertiser-faq"
      aria-labelledby="advertiser-faq-title"
      data-atlas-tone="light"
    >
      <div className="advertiser-shell advertiser-faq-grid">
        <Reveal as="header" className="advertiser-faq-intro">
          <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">{faqEyebrow}</div>

          <h2 id="advertiser-faq-title" className="atlas-section-heading">
            {faqHeading}
          </h2>

          <p className="atlas-section-copy">{faqBody}</p>

          <div className="advertiser-faq-contact">
            <span>{faqContactPrompt}</span>
            <a href="/contact">{faqContactLinkLabel}</a>
          </div>
        </Reveal>

        <Reveal as="div" className="advertiser-faq-list">
          {advertiserFaqs.map((item, index) => {
            const isOpen = openIndex === index;
            const answerId = `advertiser-faq-answer-${index}`;
            const questionId = `advertiser-faq-question-${index}`;

            return (
              <div
                className={["advertiser-faq-item", isOpen ? "is-open" : ""]
                  .filter(Boolean)
                  .join(" ")}
                key={item.question}
              >
                <button
                  id={questionId}
                  className="advertiser-faq-question"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpenIndex((current) => (current === index ? null : index))}
                >
                  <span className="advertiser-faq-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <strong>{item.question}</strong>

                  <span className="advertiser-faq-icon" aria-hidden="true">
                    +
                  </span>
                </button>

                <div
                  id={answerId}
                  className="advertiser-faq-answer"
                  role="region"
                  aria-labelledby={questionId}
                  hidden={!isOpen}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
