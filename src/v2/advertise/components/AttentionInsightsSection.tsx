import { Reveal } from "@/motion";
import { attentionInsights } from "../advertiserContent";

const signals = [
  ["Presence", "Passenger present · estimated"],
  ["Attention", "Looked toward screen · estimated"],
  ["Output", "Aggregate campaign trends only"],
] as const;

export function AttentionInsightsSection() {
  return (
    <section id="attention-insights" className="advertiser-attention" data-atlas-tone="light">
      <div className="advertiser-shell advertiser-attention-grid">
        <Reveal as="div" className="advertiser-attention-copy">
          <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">
            {attentionInsights.eyebrow}
          </div>
          <h2 className="atlas-section-heading atlas-section-heading-large">
            {attentionInsights.heading}
          </h2>
          <p className="atlas-section-copy atlas-section-copy-dark">{attentionInsights.body}</p>
          <a className="advertiser-attention-cta" href="/contact?topic=attention-insights">
            {attentionInsights.cta}
          </a>
          <p className="advertiser-attention-availability">{attentionInsights.availability}</p>
        </Reveal>

        <Reveal as="aside" className="advertiser-attention-card" stagger={0}>
          <div className="advertiser-attention-card-topline">
            <span>Privacy boundary</span>
            <strong>Pilot</strong>
          </div>

          <dl className="advertiser-attention-signals">
            {signals.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <div className="advertiser-attention-rule">
            <strong>No recognition. No raw images.</strong>
            <p>{attentionInsights.privacy}</p>
          </div>

          <p className="advertiser-attention-boundary">{attentionInsights.boundary}</p>
        </Reveal>
      </div>
    </section>
  );
}
