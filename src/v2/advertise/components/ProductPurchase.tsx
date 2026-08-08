import { productPurchases, productEyebrow, productHeading, productBody } from "../advertiserContent";
import { Reveal } from "@/motion";

export function ProductPurchase() {
  return (
    <section id="difference" className="advertiser-purchase" data-atlas-tone="light">
      <div className="advertiser-shell">
        <Reveal as="header" className="advertiser-section-intro">
          <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">{productEyebrow}</div>

          <h2 className="atlas-section-heading">{productHeading}</h2>

          <p className="atlas-section-copy atlas-section-copy-dark">{productBody}</p>
        </Reveal>

        <Reveal as="div" className="advertiser-purchase-grid">
          {productPurchases.map((item) => (
            <article className="advertiser-purchase-item" key={item.number}>
              <div className="advertiser-item-number">{item.number}</div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
