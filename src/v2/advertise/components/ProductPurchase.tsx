import { productPurchases } from "../advertiserContent";

export function ProductPurchase() {
  return (
    <section id="difference" className="advertiser-purchase" data-atlas-tone="light">
      <div className="advertiser-shell">
        <header className="advertiser-section-intro">
          <div className="atlas-section-eyebrow atlas-section-eyebrow-dark">Why mydiio</div>

          <h2 className="atlas-section-heading">Advertising, with fewer unknowns.</h2>

          <p className="atlas-section-copy atlas-section-copy-dark">
            A moving screen network, flexible ways to buy and a clear view of what happened.
          </p>
        </header>

        <div className="advertiser-purchase-grid">
          {productPurchases.map((item) => (
            <article className="advertiser-purchase-item" key={item.number}>
              <div className="advertiser-item-number">{item.number}</div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
