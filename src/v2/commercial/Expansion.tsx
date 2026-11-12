import { useEffect, useRef } from "react";
const futureVehicles = [
  { name: "Taxis", image: "/assets/illustrations/network-taxi.png" },
  { name: "Shuttles", image: "/assets/illustrations/network-shuttle.png" },
  { name: "Buses & coaches", image: "/assets/illustrations/network-bus.png" },
  { name: "Rail", image: "/assets/illustrations/network-train.png" },
];

export function Expansion() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("atlas-network-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);
  return (
    <section
      ref={sectionRef}
      className="commercial-section atlas-network"
      data-atlas-tone="light"
      aria-labelledby="atlas-network-title"
    >
      <div className="commercial-shell">
        <header className="atlas-network-intro">
          <span className="commercial-eyebrow">
            The network ahead
          </span>

          <h2 id="atlas-network-title">
            Starting with tuk-tuks.
            <br />
            <span>Built for more journeys.</span>
          </h2>

          <p>
            We're starting in Colombo's tuk-tuks,
            with a bigger vision: bringing useful passenger experiences and relevant advertising
            to more journeys.
          </p>
        </header>

        <div className="atlas-network-stages">
          <article className="atlas-network-stage atlas-network-first">
            <div className="atlas-network-stage-top">
              <span>01 / FIRST NETWORK</span>
            </div>

            <div className="atlas-network-artwork">
              <img
                src="/assets/illustrations/network-tuktuk.png"
                alt="Illustration of a tuk-tuk"
                width={430}
                height={320}
                decoding="async"
                loading="lazy"
                data-atlas-perf-v2-network-image
              />
            </div>

            <div className="atlas-network-stage-copy">
              <h3>Colombo tuk-tuks</h3>
              <p>
                Our first step towards a connected passenger network.
              </p>
            </div>
          </article>

          <article className="atlas-network-stage atlas-network-future">
            <div className="atlas-network-stage-top">
              <span>02 / LONG-TERM VISION</span>
            </div>

            <div className="atlas-network-future-visual">
              {futureVehicles.map(({ name, image }) => (
                <div className="atlas-network-vehicle" key={name}>
                  <img src={image} alt="" width={128} height={112} decoding="async" loading="lazy" />
                  <span>{name}</span>
                </div>
              ))}
              <div className="atlas-network-vehicle">
                <img src="/assets/illustrations/network-water.png" alt="" width={128} height={112} decoding="async" loading="lazy" />
                <span>Water transport</span>
              </div>
            </div>

            <div className="atlas-network-stage-copy">
              <h3>Beyond tuk-tuks</h3>
              <p>
                Taxis, shuttles, buses and more. One vision, across different ways to travel.
              </p>
            </div>
          </article>
        </div>

        <p className="atlas-network-note">
          Future transport networks are part of our long-term plans and are not yet available for advertising.
        </p>
      </div>
    </section>
  );
}



