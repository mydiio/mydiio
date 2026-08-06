const advertiserFaqs = [
  {
    question: "How is mydiio different from a fixed billboard?",
    answer:
      "A billboard stays in one place. A mydiio campaign travels with active tuk-tuks through the live corridor. You also choose the screen minutes and tuk-tuks included in your plan.",
  },
  {
    question: "Can I start without a monthly plan?",
    answer:
      "Yes. Spark, Blast and Surge are one-off Burst packages. You make one payment and choose a campaign lasting 7, 14 or 30 days.",
  },
  {
    question: "What kind of ad can I run?",
    answer:
      "You can run a 15-second or 30-second video, or use a static image. The campaign is sent digitally, so there are no posters to print or physically install.",
  },
  {
    question: "Where does my campaign run?",
    answer:
      "The current live corridor covers Dehiwala, Mount Lavinia and Ratmalana. The number of tuk-tuks depends on the package you choose.",
  },
  {
    question: "How quickly can my campaign launch?",
    answer: "After your campaign is approved, it can go live within 72 hours.",
  },
  {
    question: "What can I do in the client portal?",
    answer:
      "From one portal, you can launch a campaign, add minutes, check campaign performance, open every report and contact the mydiio team.",
  },
];

export function AdvertiserFaq() {
  return (
    <section className="advertiser-faq" aria-labelledby="advertiser-faq-title">
      <div className="advertiser-shell advertiser-faq-layout">
        <header className="advertiser-faq-intro">
          <p className="advertiser-eyebrow">Before you launch</p>

          <h2 id="advertiser-faq-title">Straight answers. No media jargon.</h2>

          <p>Everything you need to choose a campaign and understand what happens next.</p>

          <a href="/contact" className="advertiser-faq-contact">
            Still have a question?
            <span>Talk to us</span>
          </a>
        </header>

        <div className="advertiser-faq-list">
          {advertiserFaqs.map((item, index) => (
            <details key={item.question} open={index === 0}>
              <summary>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.question}</strong>
              </summary>

              <div className="advertiser-faq-answer">
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
