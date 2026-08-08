import { AtlasNav } from "@/v2/layout";
import { AtlasFooter } from "@/v2/layout";
import "@/v2/foundation/homepage.css";
import "@/v2/launch/launch.css";

import { LaunchHero } from "./components/LaunchHero";
import { LaunchPlans } from "./components/LaunchPlans";
import { LaunchForm } from "./components/LaunchForm";
import { LaunchClosing } from "./components/LaunchClosing";

export function LaunchPage() {
  return (
    <main data-v2-page data-launch-page>
      <AtlasNav />
      <LaunchHero />
      <LaunchPlans />
      <LaunchForm />
      <LaunchClosing />
      <AtlasFooter />
    </main>
  );
}
