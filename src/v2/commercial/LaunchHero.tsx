import { launchCta } from "./policy";
export function LaunchHero() {
  return (
    <section className="commercial-hero" data-atlas-tone="dark">
      <video autoPlay muted loop playsInline aria-hidden="true" poster="/assets/city-awakens.webp">
        <source src="/assets/video/act1/compressed/m001-colombo-before-dawn.mp4" type="video/mp4" />
      </video>
      <div className="commercial-hero-copy">
        <span className="commercial-eyebrow">Passenger-screen advertising · Colombo</span>
        <h1>
          Your brand.
          <br />
          Part of the journey.
        </h1>
        <p>
          Reach passengers on screens inside Colombo’s tuk-tuks, with completed-play reporting and
          GPS evidence.
        </p>
        <p>
          <strong>From LKR 25,000/month · three-month minimum.</strong>
          <br />
          Prices exclude applicable taxes.
        </p>
        <div className="commercial-actions">
          <a className="atlas-button-primary" href="/advertise/apply">
            {launchCta}
          </a>
          <a className="commercial-secondary" href="/advertise#monthly-packages">
            View packages
          </a>
        </div>
        <p className="commercial-small">
          Coverage and start date confirmed before booking. Refundable LKR 10,000 reservation
          credited to your first invoice.
        </p>
      </div>
    </section>
  );
}
