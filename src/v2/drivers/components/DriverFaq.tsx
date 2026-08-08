import { useState } from "react";
import {
  driverFaqs,
  faqEyebrow,
  faqHeading,
  faqBody,
  faqContactPrompt,
  faqContactLinkLabel,
} from "../driverContent";
import { Reveal } from "@/motion";

export function DriverFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      className="driver-faq"
      aria-labelledby="driver-faq-title"
      data-atlas-tone="light"
    >
      <div className="driver-shell driver-faq-grid">
        <Reveal as="header" className="driver-faq-intro">
          <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">{faqEyebrow}</div>

          <h2 id="driver-faq-title" className="atlas-section-heading">
            {faqHeading}
          </h2>

          <p className="atlas-section-copy">{faqBody}</p>

          <div className="driver-faq-contact">
            <span>{faqContactPrompt}</span>
            <a href="/contact">{faqContactLinkLabel}</a>
          </div>
        </Reveal>

        <Reveal as="div" className="driver-faq-list">
          {driverFaqs.map((item, index) => {
            const isOpen = openIndex === index;
            const answerId = `driver-faq-answer-${index}`;
            const questionId = `driver-faq-question-${index}`;

            return (
              <div
                className={["driver-faq-item", isOpen ? "is-open" : ""]
                  .filter(Boolean)
                  .join(" ")}
                key={item.question}
              >
                <button
                  id={questionId}
                  className="driver-faq-question"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpenIndex((current) => (current === index ? null : index))}
                >
                  <span className="driver-faq-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <strong>{item.question}</strong>

                  <span className="driver-faq-icon" aria-hidden="true">
                    +
                  </span>
                </button>

                <div
                  id={answerId}
                  className="driver-faq-answer"
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
