import { AtlasNav } from "@/v2/layout";
import { AtlasFooter } from "@/v2/layout";
import { DriverHero } from "./components/DriverHero";
import { DriverEarnings } from "./components/DriverEarnings";
import { InstallStory } from "./components/InstallStory";
import { CoverageSection } from "./components/CoverageSection";
import { DriverPackages } from "./components/DriverPackages";
import { PayoutReport } from "./components/PayoutReport";
import { UseCases } from "./components/UseCases";
import { DriverFaq } from "./components/DriverFaq";
import { DriverClosing } from "./components/DriverClosing";

export function DriverPage() {
  return (
    <main data-v2-page data-driver-page>
      <AtlasNav />
      <DriverHero />
      <DriverEarnings />
      <InstallStory />
      <CoverageSection />
      <DriverPackages />
      <PayoutReport />
      <UseCases />
      <DriverFaq />
      <DriverClosing />
      <AtlasFooter />
    </main>
  );
}
