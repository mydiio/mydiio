import { AtlasNav } from "@/v2/layout";
import { AtlasFooter } from "@/v2/layout";
import "@/v2/foundation/homepage.css";
import "@/v2/privacy/privacy.css";

import { PrivacyHero } from "./components/PrivacyHero";
import { PrivacyNav } from "./components/PrivacyNav";
import { PrivacyBody } from "./components/PrivacyBody";
import { PrivacyClosing } from "./components/PrivacyClosing";

export function PrivacyPage() {
  return (
    <main data-v2-page data-privacy-page>
      <AtlasNav />
      <PrivacyHero />
      <PrivacyNav />
      <PrivacyBody />
      <PrivacyClosing />
      <AtlasFooter />
    </main>
  );
}
