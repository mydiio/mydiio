import { AtlasNav } from "@/v2/layout";
import { AtlasFooter } from "@/v2/layout";
import "@/v2/foundation/homepage.css";
import "@/v2/drivers/apply/apply.css";

import { DriverApplyHero } from "./components/DriverApplyHero";
import { DriverApplyForm } from "./components/DriverApplyForm";
import { DriverApplyClosing } from "./components/DriverApplyClosing";

export function DriverApplyPage() {
  return (
    <main data-v2-page data-driver-apply-page>
      <AtlasNav />
      <DriverApplyHero />
      <DriverApplyForm />
      <DriverApplyClosing />
      <AtlasFooter />
    </main>
  );
}
