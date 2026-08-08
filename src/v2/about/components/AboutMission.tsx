import { Reveal } from "@/motion";
import {
  aboutMissionEyebrow,
  aboutMissionBody,
  aboutVisionEyebrow,
  aboutVisionBody,
} from "../aboutContent";

export function AboutMission() {
  return (
    <section className="about-mission" data-atlas-tone="light">
      <div className="about-shell about-mission-grid">
        <Reveal as="article" className="about-mission-card">
          <span className="atlas-section-eyebrow atlas-section-eyebrow-dark">
            {aboutMissionEyebrow}
          </span>
          <p className="about-mission-body">{aboutMissionBody}</p>
        </Reveal>

        <Reveal as="article" className="about-mission-card about-mission-card-vision">
          <span className="atlas-section-eyebrow atlas-section-eyebrow-dark">
            {aboutVisionEyebrow}
          </span>
          <p className="about-mission-body">{aboutVisionBody}</p>
        </Reveal>
      </div>
    </section>
  );
}
