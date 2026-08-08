import { Reveal } from "@/motion";
import { aboutStats, aboutStatsHeading } from "../aboutContent";

export function AboutStats() {
  return (
    <section className="about-stats" data-atlas-tone="light">
      <div className="about-shell">
        <Reveal as="header" className="about-section-intro">
          <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">Today</div>
          <h2 className="atlas-section-heading">{aboutStatsHeading}</h2>
        </Reveal>

        <Reveal as="div" className="about-stats-grid" stagger={0.08}>
          {aboutStats.map((stat) => (
            <article key={stat.label} className="about-stat">
              <span className="about-stat-value">{stat.value}</span>
              <span className="about-stat-label">{stat.label}</span>
              <span className="about-stat-detail">{stat.detail}</span>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
