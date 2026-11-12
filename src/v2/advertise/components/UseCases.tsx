import { Reveal } from "@/motion";
import "./UseCases.showcase.css";

const campaigns = [
  {
    number: "01", category: "EVENTS & NIGHTLIFE", image: "nocturne.webp", alt: "Fictional Nocturne Colombo nightclub event advert with ticket details", title: "Fill the room before the doors open.",
    bullets: ["Build anticipation for concerts, club nights and ticketed events.", "Use a Spark Burst: 200 minutes over 7 days, across up to 5 vehicles.", "Give passengers a QR code to explore ticket information."],
    tag: "SPARK BURST EXAMPLE", detail: "200 min / 7 days / up to 5 vehicles", qr: true,
  },
  {
    number: "02", category: "RESTAURANTS & CAFES", image: "pepper-table.webp", alt: "Fictional Pepper Table restaurant advert promoting a lunch set", title: "Give passengers a reason to stop.",
    bullets: ["Put an appealing meal and clear price front and centre.", "Feature a limited-time offer with a simple in-store action.", "Build awareness while passengers travel around Colombo."],
    tag: "DINING OFFER EXAMPLE", detail: "Offer-led local campaign", qr: false,
  },
  {
    number: "03", category: "TRAVEL & EXPERIENCES", image: "roam-ceylon.webp", alt: "Fictional Roam Ceylon Ella travel package advert with website call to action", title: "Turn curiosity into a booking.",
    bullets: ["Bring a destination to life with immersive imagery.", "Show the itinerary, starting price and website clearly.", "Review qualifying completed plays through campaign reporting."],
    tag: "WEBSITE CAMPAIGN EXAMPLE", detail: "Awareness and website discovery", qr: false,
  },
] as const;

export function UseCases() {
  return (
    <section id="stories" className="advertiser-use-cases atlas-sales-ideas atlas-real-showcase" data-atlas-tone="light">
      <div className="advertiser-shell">
        <Reveal as="header" className="atlas-sales-ideas-head">
          <span className="commercial-eyebrow">CAMPAIGN INSPIRATION</span>
          <h2>What could you put <span>in motion?</span></h2>
          <p>Three fictional businesses. Three realistic ways to advertise on mydiio.</p>
        </Reveal>
        <div className="atlas-real-showcase-grid">
          {campaigns.map((campaign) => (
            <article className="atlas-real-showcase-card" key={campaign.number}>
              <div className="atlas-real-showcase-meta"><span>{campaign.number} / 03</span><span>{campaign.category}</span></div>
              <div className="atlas-real-showcase-creative">
                <img src={`/images/campaign-examples/${campaign.image}`} alt={campaign.alt} loading="lazy" />
                {campaign.qr && <div className="atlas-real-showcase-qr"><img src="/images/campaign-examples/event-demo-qr.png" alt="Scannable QR to an illustrative example.com event page" /></div>}
              </div>
              <div className="atlas-real-showcase-copy"><h3>{campaign.title}</h3><ul>{campaign.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></div>
              <div className="atlas-real-showcase-tag"><span className="atlas-real-showcase-dot" /><div><strong>{campaign.tag}</strong><small>{campaign.detail}</small></div></div>
            </article>
          ))}
        </div>
        <div className="atlas-real-showcase-footer"><p>Illustrative creative only. Businesses, events, offers and URLs are fictional; the event QR opens an example destination.</p><a className="atlas-sales-text-link" href="/mydiio-campaign-studio-v4-4.html">Preview your own advert <span aria-hidden="true">&#8594;</span></a></div>
      </div>
    </section>
  );
}