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
import "@/v2/foundation/atlas-typography-contract.css";
import "@/v2/foundation/atlas-page-spacing.css";

import "./about-atlas-final.css";

import "./about-atlas-contrast.css";

export function AboutPage() {
  return (
    <main data-v2-page data-about-page>
      <AtlasNav initialTone="light" />
      <AboutHero />
      <div id="about-story" className="about-story-anchor" aria-hidden="true" />
      <AboutPillars />
      <AboutSides />
      <AboutFuture />
      <div className="about-company-v4 about-company-v5">
  <div className="about-company-v5-intro">
    <div className="about-company-v5-eyebrow">
      <span>05 / THE COMPANY</span>
      <span>BUILT IN SRI LANKA</span>
    </div>
    <h2>Real people.<br /><span className="about-brand-accent">Real connections.</span></h2>
    <p>
      A local team building a more useful, transparent
      passenger media network. Here is how to find us.
    </p>
  </div>
  <ContactFacts />
</div>
      <AboutClosing />
      <AtlasFooter />
    </main>
  );
}
