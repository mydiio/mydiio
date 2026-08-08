import { AtlasNav } from "@/v2/layout";
import { AdvertiseHero } from "./components/AdvertiseHero";
import { ProductPurchase } from "./components/ProductPurchase";
import { VerificationStory } from "./components/VerificationStory";
import { CoverageSection } from "./components/CoverageSection";
import { AdvertiserPackages } from "./components/AdvertiserPackages";
import { MondayReportSection } from "./components/MondayReportSection";
import { ClientPortalSection } from "./components/ClientPortalSection";
import { UseCases } from "./components/UseCases";
import { AdvertiserFaq } from "./components/AdvertiserFaq";
import { AdvertiseClosing } from "./components/AdvertiseClosing";
import { AtlasFooter } from "@/v2/layout";

export function AdvertisePage() {
  return (
    <main data-v2-page data-advertiser-page>
      <AtlasNav campaignTo="/advertise/apply" />
      <AdvertiseHero />
      <ProductPurchase />
      <VerificationStory />
      <CoverageSection />
      <AdvertiserPackages />
      <MondayReportSection />
      <ClientPortalSection />
      <UseCases />
      <AdvertiserFaq />
      <AdvertiseClosing />
      <AtlasFooter />
    </main>
  );
}
