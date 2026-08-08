import { Reveal } from "@/motion";
import { LocationMap } from "@/components/ui/location-map";

export function AboutNetwork() {
  return (
    <section className="about-network" data-atlas-tone="light">
      <div className="about-shell about-network-shell">
        <Reveal as="div" className="about-network-copy">
          <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">
            The network, today
          </div>
          <h2 className="atlas-section-heading atlas-section-heading-large">
            One screen in every active vehicle.
          </h2>
          <p className="atlas-section-copy atlas-section-copy-dark">
            Every screen carries the same network. The map shows Colombo today
            — hover the map to feel the network, click to expand and see how it
            grows from one road into the city.
          </p>
        </Reveal>

        <Reveal as="div" className="about-network-stage">
          <LocationMap
            location="Colombo, Sri Lanka"
            coordinates="6.9271° N, 79.8612° E"
            pinColor="#22c55e"
          />
        </Reveal>
      </div>
    </section>
  );
}
