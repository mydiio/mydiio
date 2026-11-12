import "./advertise-atlas-alignment.css";
import { AdvertiseScrollMotion } from "./AdvertiseScrollMotion";
import "../commercial/commercial.css";
import { CampaignGuide } from "../commercial/CampaignGuide";
import { AtlasNav } from "@/v2/layout";
import { AdvertiseHero } from "./components/AdvertiseHero";
import { ProductPurchase } from "./components/ProductPurchase";
import { AdvertiserPackages } from "./components/AdvertiserPackages";
import { ClientPortalSection } from "./components/ClientPortalSection";
import { UseCases } from "./components/UseCases";
import { AdvertiserFaq } from "./components/AdvertiserFaq";
import { AdvertiseClosing } from "./components/AdvertiseClosing";
import { AtlasFooter } from "@/v2/layout";
import "./advertise-atlas-final-polish.css";
import "@/v2/foundation/atlas-typography-contract.css";
import "@/v2/foundation/atlas-page-spacing.css";

export function AdvertisePage() {
  return (
    <main data-v2-page data-advertiser-page>
      <AdvertiseScrollMotion />
      <AtlasNav campaignTo="/advertise/apply" />
      <AdvertiseHero />
      <ProductPurchase />
      <ClientPortalSection />
      <section className="atlas-editorial-band atlas-editorial-band--light" aria-labelledby="advertiser-editorial-heading">
        <div className="advertiser-shell atlas-editorial-band__grid">
          <div className="atlas-editorial-band__copy">
            <span className="atlas-editorial-band__eyebrow">Advertising in context</span>
            <h2 id="advertiser-editorial-heading">A message that travels with the city.</h2>
            <p>From a neighbourhood café to a local event, show passengers a clear message during their journey. Build the campaign, then review qualifying delivery through mydiio.</p>
          </div>
          <figure className="atlas-editorial-band__photo">
            <img src="/images/campaign-examples/pepper-table.webp" alt="Illustrative restaurant advertising creative for a passenger screen" loading="lazy" decoding="async" />
          </figure>
        </div>
      </section>
      <AdvertiserPackages />
      <CampaignGuide />
      <UseCases />
      <AdvertiserFaq />
      <AdvertiseClosing />
      <AtlasFooter />
    </main>
  );
}
