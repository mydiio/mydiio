import { AtlasNav } from "@/v2/layout";
import { AtlasFooter } from "@/v2/layout";
import "@/v2/foundation/homepage.css";
import "@/v2/home/home.css";

import { HomeHero } from "./components/HomeHero";
import { HomeProof } from "./components/HomeProof";
import { HomeDifference } from "./components/HomeDifference";
import { HomeHow } from "./components/HomeHow";
import { HomePortal } from "./components/HomePortal";
import { HomePlans } from "./components/HomePlans";
import { HomePioneer } from "./components/HomePioneer";
import { HomeFaq } from "./components/HomeFaq";
import { HomeClosing } from "./components/HomeClosing";
import { HomeWhatsapp } from "./components/HomeWhatsapp";

export function HomePage() {
  return (
    <main data-v2-page data-home-page>
        <AtlasNav />
        <HomeHero />
        <HomeProof />
        <HomeDifference />
        <HomeHow />
        <HomePortal />
        <HomePlans />
        <HomePioneer />
        <HomeFaq />
        <HomeClosing />
        <AtlasFooter />
        <HomeWhatsapp />
    </main>
  );
}
