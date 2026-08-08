import { AtlasNav } from "@/v2/layout";
import { AtlasFooter } from "@/v2/layout";
import "@/v2/foundation/homepage.css";
import "@/v2/about/about.css";

import { AboutHero } from "./components/AboutHero";
import { AboutPillars } from "./components/AboutPillars";
import { AboutTimeline } from "./components/AboutTimeline";
import { AboutStats } from "./components/AboutStats";
import { AboutSides } from "./components/AboutSides";
import { AboutNetwork } from "./components/network/AboutNetwork";
import { AboutSafety } from "./components/AboutSafety";
import { AboutFuture } from "./components/AboutFuture";
import { AboutClosing } from "./components/AboutClosing";

export function AboutPage() {
  return (
    <main data-v2-page data-about-page>
      <AtlasNav />
      <AboutHero />
      <AboutPillars />
      <AboutTimeline />
      <AboutStats />
      <AboutSides />
      <AboutNetwork />
      <AboutSafety />
      <AboutFuture />
      <AboutClosing />
      <AtlasFooter />
    </main>
  );
}
