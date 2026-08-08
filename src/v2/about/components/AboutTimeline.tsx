import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/motion";
import {
  aboutTimeline,
  aboutTimelineHeading,
  aboutTimelineBody,
} from "../aboutContent";

export function AboutTimeline() {
  const trackRef = useRef<HTMLOListElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const update = () => {
      const rect = track.getBoundingClientRect();
      const total = Math.max(rect.height - window.innerHeight * 0.6, 1);
      const seen = Math.min(Math.max(-rect.top + window.innerHeight * 0.4, 0), total);
      setProgress(seen / total);
      raf = 0;
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="about-timeline" data-atlas-tone="light">
      <div className="about-shell">
        <Reveal as="header" className="about-section-intro">
          <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">The path</div>
          <h2 className="atlas-section-heading atlas-section-heading-large">
            {aboutTimelineHeading}
          </h2>
          <p className="atlas-section-copy atlas-section-copy-dark">{aboutTimelineBody}</p>
        </Reveal>

        <div className="about-timeline-rail">
          <span
            className="about-timeline-progress"
            style={{ transform: `scaleY(${progress})` }}
            aria-hidden="true"
          />
          <ol ref={trackRef} className="about-timeline-track">
            {aboutTimeline.map((event) => (
              <li key={event.date} className="about-timeline-event">
                <span className="about-timeline-dot" aria-hidden="true" />
                <span className="about-timeline-year">{event.date}</span>
                <span className="about-timeline-label">{event.label}</span>
                <p className="about-timeline-body">{event.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
