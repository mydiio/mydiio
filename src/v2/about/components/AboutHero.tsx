import FluidFlowGrid from "./fluid/FluidFlowGrid";
import { aboutHeading } from "../aboutContent";

export function AboutHero() {
  return (
    <section className="about-hero" data-atlas-tone="dark">
      <div className="about-hero-canvas">
        <FluidFlowGrid scheme="amber" />
      </div>

      <div className="about-hero-overlay">
        <div className="about-hero-shell">
          <h1 className="about-hero-title">{aboutHeading}</h1>
        </div>
      </div>
    </section>
  );
}
