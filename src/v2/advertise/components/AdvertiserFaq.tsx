import { useState } from "react";
import { activationPolicy, refundPolicy, renewalPolicy, shortfallPolicy } from "../../commercial/policy";

const questions = [
  { question: "Can I enquire without paying a deposit?", answer: "Yes. Sending an enquiry does not reserve inventory or require payment. We confirm availability and the next steps before asking you to proceed." },
  { question: "Where will my advert run?", answer: "On participating vehicles within confirmed live coverage. Vehicle allocation and campaign start date are agreed before booking; the planned November 2026 launch is subject to operational readiness." },
  { question: "Do I need a finished advert?", answer: "No. You can explore your concept in Campaign Studio first. Final creative is reviewed before launch; any design or substantial editing service is quoted separately." },
  { question: "How do you measure delivery?", answer: "We record completed screen plays and supporting GPS evidence, with Monday reporting. A recorded play is not a guarantee that someone watched or took action. " + shortfallPolicy },
  { question: "When does my campaign start?", answer: activationPolicy },
  { question: "What are the deposit, renewal and cancellation terms?", answer: refundPolicy + " " + renewalPolicy },
];

export function AdvertiserFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section className="advertiser-faq atlas-sales-faq" aria-labelledby="advertiser-faq-title" data-atlas-tone="light">
      <div className="advertiser-shell advertiser-faq-grid">
        <header className="advertiser-faq-intro">
          <span className="commercial-eyebrow">Good to know</span>
          <h2 id="advertiser-faq-title" className="atlas-section-heading">Questions before you begin?</h2>
          <p className="atlas-section-copy">The essentials, without the fine-print maze.</p>
          <div className="advertiser-faq-contact"><a href="/terms">Read full terms</a></div>
        </header>
        <div className="advertiser-faq-list">
          {questions.map((item, index) => {
            const isOpen = openIndex === index;
            const answerId = `advertiser-faq-answer-${index}`;
            const questionId = `advertiser-faq-question-${index}`;
            return (
              <div className={`advertiser-faq-item${isOpen ? " is-open" : ""}`} key={item.question}>
                <button id={questionId} className="advertiser-faq-question" type="button" aria-expanded={isOpen} aria-controls={answerId} onClick={() => setOpenIndex(isOpen ? null : index)}>
                  <span className="advertiser-faq-number">{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item.question}</strong>
                  <span className="advertiser-faq-icon" aria-hidden="true">{isOpen ? "-" : "+"}</span>
                </button>
                <div id={answerId} className="advertiser-faq-answer" role="region" aria-labelledby={questionId} hidden={!isOpen}><p>{item.answer}</p></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
