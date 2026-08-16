import { AtlasNav } from "@/v2/layout";
import { AtlasFooter } from "@/v2/layout";
import "@/v2/foundation/homepage.css";
import "@/v2/terms/terms.css";

import { TermsHero } from "./components/TermsHero";
import { TermsNav } from "./components/TermsNav";
import { TermsBody } from "./components/TermsBody";
import { TermsClosing } from "./components/TermsClosing";

export function TermsPage() {
  return (
    <main data-v2-page data-terms-page>
      <AtlasNav />
      <TermsHero />
      <TermsNav />
      <TermsBody />
      <TermsClosing />
      <AtlasFooter />
    </main>
  );
}
