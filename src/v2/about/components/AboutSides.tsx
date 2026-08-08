import { Reveal } from "@/motion";
import {
  aboutPassengersHeading,
  aboutPassengersBody,
  aboutPassengersProof1Label,
  aboutPassengersProof1Value,
  aboutPassengersProof2Label,
  aboutPassengersProof2Value,
  aboutPassengersProof3Label,
  aboutPassengersProof3Value,
  aboutPassengersCta,
  aboutDriversHeading,
  aboutDriversBody,
  aboutDriversProof1Label,
  aboutDriversProof1Value,
  aboutDriversProof2Label,
  aboutDriversProof2Value,
  aboutDriversProof3Label,
  aboutDriversProof3Value,
  aboutDriversCta,
  aboutBusinessesHeading,
  aboutBusinessesBody,
  aboutBusinessesProof1Label,
  aboutBusinessesProof1Value,
  aboutBusinessesProof2Label,
  aboutBusinessesProof2Value,
  aboutBusinessesProof3Label,
  aboutBusinessesProof3Value,
  aboutBusinessesCta,
} from "../aboutContent";

type SideProps = {
  eyebrow: string;
  title: string;
  body: string;
  proof: { value: string; label: string }[];
  cta: string;
  href: string;
  variant: "passengers" | "drivers" | "businesses";
};

function Side({
  eyebrow,
  title,
  body,
  proof,
  cta,
  href,
  variant,
}: SideProps) {
  return (
    <Reveal as="article" className={`about-side about-side-${variant}`}>
      <span className="atlas-section-eyebrow atlas-section-eyebrow-dark">{eyebrow}</span>
      <h3 className="about-side-title">{title}</h3>
      <p className="about-side-body">{body}</p>
      <dl className="about-side-proof">
        {proof.map((row) => (
          <div key={row.label}>
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
      <a className="atlas-button-secondary about-side-cta" href={href}>
        {cta}
      </a>
    </Reveal>
  );
}

export function AboutSides() {
  return (
    <section className="about-sides" data-atlas-tone="light">
      <div className="about-shell">
        <Reveal as="header" className="about-section-intro">
          <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">
            The three sides
          </div>
          <h2 className="atlas-section-heading atlas-section-heading-large">
            One network. Three people.
          </h2>
          <p className="atlas-section-copy atlas-section-copy-dark">
            The infrastructure only matters if it creates value for every participant.
            A connected vehicle is paid for by advertisers, run for drivers and
            experienced by passengers. Each side has to win.
          </p>
        </Reveal>

        <div className="about-sides-grid">
          <Side
            eyebrow="For passengers"
            title={aboutPassengersHeading}
            body={aboutPassengersBody}
            proof={[
              { value: aboutPassengersProof1Value, label: aboutPassengersProof1Label },
              { value: aboutPassengersProof2Value, label: aboutPassengersProof2Label },
              { value: aboutPassengersProof3Value, label: aboutPassengersProof3Label },
            ]}
            cta={aboutPassengersCta}
            href="/contact"
            variant="passengers"
          />

          <Side
            eyebrow="For drivers"
            title={aboutDriversHeading}
            body={aboutDriversBody}
            proof={[
              { value: aboutDriversProof1Value, label: aboutDriversProof1Label },
              { value: aboutDriversProof2Value, label: aboutDriversProof2Label },
              { value: aboutDriversProof3Value, label: aboutDriversProof3Label },
            ]}
            cta={aboutDriversCta}
            href="/drive"
            variant="drivers"
          />

          <Side
            eyebrow="For businesses"
            title={aboutBusinessesHeading}
            body={aboutBusinessesBody}
            proof={[
              { value: aboutBusinessesProof1Value, label: aboutBusinessesProof1Label },
              { value: aboutBusinessesProof2Value, label: aboutBusinessesProof2Label },
              { value: aboutBusinessesProof3Value, label: aboutBusinessesProof3Label },
            ]}
            cta={aboutBusinessesCta}
            href="/advertise"
            variant="businesses"
          />
        </div>
      </div>
    </section>
  );
}
