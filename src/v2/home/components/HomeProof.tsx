import { Reveal } from "@/motion";
import { homeProofItems } from "../homeContent";

export function HomeProof() {
  return (
    <section className="home-proof" data-atlas-tone="light">
      <div className="home-shell">
        <Reveal as="div" className="home-proof-grid" stagger={0.07}>
          {homeProofItems.map((item) => (
            <article key={item.head} className="home-proof-item">
              <h3>{item.head}</h3>
              <p>{item.sub}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
