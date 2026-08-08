import { useState } from "react";
import { Reveal } from "@/motion";
import { contactFaq } from "../contactContent";

export function ContactFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="contact-faq" data-atlas-tone="light">
      <div className="contact-shell contact-faq-grid">
        <Reveal as="header" className="contact-faq-intro">
          <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">Common questions</div>
          <h2 className="atlas-section-heading">Before you write.</h2>
          <p className="atlas-section-copy atlas-section-copy-dark">
            Short answers to the questions that come up most often.
          </p>
        </Reveal>

        <Reveal as="div" className="contact-faq-list">
          {contactFaq.map((item, index) => {
            const isOpen = openIndex === index;
            const answerId = `contact-faq-answer-${index}`;
            const questionId = `contact-faq-question-${index}`;
            return (
              <div
                key={item.q}
                className={["contact-faq-item", isOpen ? "is-open" : ""].filter(Boolean).join(" ")}
              >
                <button
                  id={questionId}
                  className="contact-faq-question"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpenIndex((current) => (current === index ? null : index))}
                >
                  <span className="contact-faq-number">{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item.q}</strong>
                  <span className="contact-faq-icon" aria-hidden="true">
                    +
                  </span>
                </button>
                <div
                  id={answerId}
                  className="contact-faq-answer"
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
