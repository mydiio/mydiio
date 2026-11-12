const stages = [
  {
    number: "01",
    title: "Enquire",
    graphic: "/images/campaign-guide/enquire.png",
    subtitle: "Choose your plan",
    body: "Tell us what you want to promote. We'll confirm coverage and a proposed start date.",
  },
  {
    number: "02",
    title: "Prepare",
    graphic: "/images/campaign-guide/prepare.png",
    subtitle: "Send your creative",
    body: "Submit your advert for approval and complete payment before activation.",
  },
  {
    number: "03",
    title: "Launch",
    graphic: "/images/campaign-guide/launch.png",
    subtitle: "Go live on-screen",
    body: "Your campaign activates after the first qualifying completed paid play.",
  },
] as const;

const information = [
  {
    title: "Creative requirements",
    points: [
      "Landscape format: 16:9, 1920 × 1080.",
      "Video: MP4 (H.264), 15 or 30 seconds, up to 100 MB.",
      "Images: JPG or PNG, up to 20 MB.",
      "Adverts must work without sound.",
      "Keep text clear and QR codes easy to scan.",
      "Submit creative at least 3 working days before launch.",
    ],
  },
  {
    title: "Booking & payment",
    points: [
      "Reserve with a LKR 10,000 deposit.",
      "Your deposit is credited towards your campaign.",
      "Full advance payment is required before activation.",
      "Subscription packages have a 3-month minimum term.",
      "Start dates depend on available vehicle coverage.",
    ],
  },
  {
    title: "Activation & delivery",
    points: [
      "We review and approve your advert before launch.",
      "Activation requires confirmed coverage and cleared payment.",
      "Your paid campaign starts with its first qualifying completed play.",
      "Advertising minutes represent completed plays, not guaranteed views or sales.",
      "Delivery issues are handled under the agreed campaign terms.",
    ],
  },
  {
    title: "Changes & refunds",
    points: [
      "Campaign payments are refundable before activation, subject to agreed creative charges.",
      "After activation, your package terms apply.",
      "Subscriptions continue after the minimum term until cancelled.",
      "Campaign changes and cancellation requests must follow the agreed terms.",
      "Full refund and delivery conditions are available in our terms.",
    ],
  },
] as const;

export function CampaignGuide() {
  return (
    <section
      className="commercial-section atlas-sales-guide atlas-campaign-journey"
      id="creative-guide"
      data-atlas-tone="light"
    >
      <div className="commercial-shell">
        <div className="atlas-campaign-journey-heading">
          <div>
            <span className="commercial-eyebrow">GETTING STARTED</span>
            <h2>From idea to <span>on-screen.</span></h2>
          </div>
          <p>Three clear steps. We handle the coordination.</p>
        </div>

        <div className="atlas-campaign-journey-track" aria-label="Campaign launch process">
          {stages.map((stage) => (
            <article className="atlas-campaign-journey-step" key={stage.number}>
              <div className="atlas-campaign-journey-icon">
                <img
                  src={stage.graphic}
                  alt=""
                  className="atlas-campaign-journey-image"
                />
              </div>
              <span className="atlas-campaign-journey-number">
                {stage.number} / 03
              </span>
              <h3>{stage.title}</h3>
              <strong>{stage.subtitle}</strong>
              <p>{stage.body}</p>
            </article>
          ))}
        </div>

        <div className="atlas-guide-information">
          <div className="atlas-guide-information-heading">
            <h3>Everything you need to know</h3>
            <p>Simple guidelines to help you launch with confidence.</p>
          </div>

          <div className="atlas-guide-information-grid">
            {information.map((item) => (
              <article className="atlas-guide-info-card" key={item.title}>
                <h4>{item.title}</h4>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        <div className="atlas-campaign-journey-bottom">
          <p>
            All bookings are subject to approval, payment and available coverage.
            {" "}
            <a href="/terms">Read full terms</a>
          </p>
          <a className="atlas-campaign-journey-cta" href="/advertise/apply">
            Start your campaign
          </a>
        </div>
      </div>
    </section>
  );
}