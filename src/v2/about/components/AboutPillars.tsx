import { useState } from "react";
import { Reveal } from "@/motion";
import { aboutPillars } from "../aboutContent";

const presentation = [
  {
    title: "Trust through transparency",
    short: "Clear reporting. Honest communication.",
    label: "TRANSPARENCY",
    image: "/assets/about-trust-female-advertiser.jpg",
    alt: "Advertiser reviewing campaign information on a laptop",
    body: "Advertisers deserve clear campaign reporting. Drivers deserve transparent earnings and fair terms. We distinguish verified, partial and unverified delivery, and communicate limitations openly.",
  },
  {
    title: "Respect for drivers",
    short: "People first. Always.",
    label: "DRIVER DIGNITY",
    image: "/assets/about-respect-male-driver.jpg",
    alt: "Tuk-tuk driver beside a vehicle",
    body: "Drivers are partners in the network. Written agreements, clear payment terms, support in their preferred language and protection from mydiio-caused downtime are central to how we work.",
  },
  {
    title: "Reliability by design",
    short: "Dependable technology. Accountable service.",
    label: "RELIABILITY",
    image: "/assets/installation-hands-fitting-screen.png",
    alt: "Technician fitting a screen inside a vehicle",
    body: "We monitor screens, review content and design for real-world interruptions. If an external information service fails, the experience should fall back gracefully rather than display a broken interface.",
  },
] as const;

export function AboutPillars() {
  const [active, setActive] = useState(0);
  const selected = presentation[active];
  return (
    <section className="about-pillars about-pillars-v2" data-atlas-tone="light" aria-labelledby="about-principles-title">
      <div className="about-shell">
        <Reveal as="header" className="about-principles-intro">
          <div className="about-principles-topline">
            <span className="atlas-section-eyebrow atlas-section-eyebrow-dark">02 / WHAT WE BELIEVE</span>
            <span className="about-principles-kicker">THREE PRINCIPLES. ONE STANDARD.</span>
          </div>
          <h2 id="about-principles-title" className="about-principles-heading">Built on principles.<br /><span className="about-brand-accent">Proven in practice.</span></h2>
          <p className="about-principles-lede">Three commitments to the people who use, operate and trust our network.</p>
        </Reveal>
        <div className="about-principles-choices" aria-label="Explore our principles">
          {presentation.map((item, i) => (
            <button key={aboutPillars[i].id} type="button" className={`about-principles-choice${active === i ? " is-active" : ""}`} onClick={() => setActive(i)} aria-pressed={active === i} aria-controls="about-principles-detail">
              <span className="about-principles-choice-top"><span className="about-principles-choice-symbol" aria-hidden="true">{i === 0 ? "◎" : i === 1 ? "◇" : "✳"}</span><span className="about-principles-choice-number">{aboutPillars[i].number}</span></span>
              <span className="about-principles-choice-title">{item.title}</span>
              <span className="about-principles-choice-short">{item.short}</span>
              <span className="about-principles-choice-arrow" aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
        <div className="about-principles-detail" id="about-principles-detail" aria-live="polite">
          <div className="about-principles-detail-copy" key={`copy-${active}`}>
            <span className="about-principles-detail-label"><span className="about-principles-detail-dot" />{selected.label}</span>
            <h3>{selected.title}</h3>
            <p>{selected.body}</p>
            <div className="about-principles-proof"><span>IN PRACTICE</span><strong>{aboutPillars[active].proof}</strong></div>
          </div>
          <div className="about-principles-detail-image" key={`image-${active}`}>
            <img src={selected.image} alt={selected.alt} loading="lazy" />
            <span className="about-principles-image-index">MYDIIO / {aboutPillars[active].number}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
