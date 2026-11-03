import { ContactFacts } from "../contact/components/ContactFacts";
import "../contact/contact.css";
import { AtlasNav } from "@/v2/layout";
import { AtlasFooter } from "@/v2/layout";
import "@/v2/foundation/homepage.css";
import "@/v2/about/about.css";

import { AboutHero } from "./components/AboutHero";
import { AboutPillars } from "./components/AboutPillars";
import { AboutSides } from "./components/AboutSides";
import { AboutFuture } from "./components/AboutFuture";
import { AboutClosing } from "./components/AboutClosing";

export function AboutPage() {
  return (
    <main data-v2-page data-about-page>
      <AtlasNav initialTone="dark" />
      <AboutHero />
      <AboutPillars />
      <AboutSides />
      <AboutFuture />
      <ContactFacts />
      <AboutClosing />
      <AtlasFooter />
    </main>
  );
}
