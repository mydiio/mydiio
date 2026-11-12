import { preserveProductionSeo } from "@/seo/productionSeoParity";
import { LaunchHero } from "@/v2/commercial/LaunchHero";
import { Expansion } from "@/v2/commercial/Expansion";
import "@/v2/commercial/commercial.css";
import { createFileRoute } from "@tanstack/react-router";
import { AtlasNav, AtlasFooter } from "@/v2/layout";
import { FundingStatement } from "@/v2/act2";
import { JourneyStoryboard } from "@/v2/journeyStoryboard";
import { ActFour } from "@/v2/platform";
import { ActSix } from "@/v2/packages";
import { ActSeven } from "@/v2/pioneer";
import { ActEight } from "@/v2/closing";
import "@/v2/foundation/homepage.css";
import { ScrollExploreCue } from "@/components/ui/scroll-explore-cue";
import { isPublicWaitlistMode } from "@/config/publicSiteMode";
import { WaitlistPage } from "@/v2/waitlist";

const DASHBOARD_IMG = "/assets/advertiser-pharmacy-dashboard.png";

export const Route = createFileRoute("/")({
  component: PublicHomePage,
  head: preserveProductionSeo("/", () =>
    isPublicWaitlistMode
      ? {
          meta: [
            { title: "Join the mydiio advertiser waiting list | Colombo" },
            {
              name: "description",
              content:
                "Join the mydiio advertiser waiting list for early campaign access, pilot availability and launch updates in Colombo.",
            },
            { property: "og:title", content: "Something new is moving through Colombo | mydiio" },
            {
              property: "og:description",
              content: "Join the advertiser waiting list for early access to the mydiio network.",
            },
            { property: "og:url", content: "https://mydiio.com/" },
          ],
          links: [{ rel: "canonical", href: "https://mydiio.com/" }],
        }
      : {
          meta: [
            { title: "Tuk-Tuk Advertising in Colombo | GPS-Verified Ads | mydiio" },
            {
              name: "description",
              content:
                "Put your brand on screens inside Colombo tuk-tuks. Completed plays with fresh GPS and movement evidence, a report every Monday, and your own advertiser portal. Campaigns from LKR 25,000.",
            },
            { property: "og:title", content: "Your next customer is going somewhere. Go with them. | mydiio" },
            {
              property: "og:description",
              content:
                "Completed plays with GPS and movement evidence. Weekly reports. Your own advertiser portal. From LKR 25,000 a month.",
            },
            { property: "og:image", content: DASHBOARD_IMG },
            { property: "og:url", content: "https://mydiio.com/" },
          ],
          links: [{ rel: "canonical", href: "https://mydiio.com/" }],
          scripts: [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Service",
                name: "mydiio Connected Passenger Information Network",
                provider: { "@type": "Organization", name: "mydiio", url: "https://mydiio.com" },
                description:
                  "Digital advertising on screens inside Colombo tuk-tuks. Advertisers build and submit ads in their own portal, and receive completed-play reporting with GPS and movement evidence.",
                areaServed: { "@type": "City", name: "Colombo" },
                offers: {
                  "@type": "Offer",
                  priceCurrency: "LKR",
                  price: "25000",
                  description: "Roamer, entry tier, up to 5 tuk-tuks, 500 minutes, 3-month minimum",
                },
              }),
            },
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "How do I know my ad actually played?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Every Monday you receive a report showing completed plays, fresh GPS evidence, plays verified while moving, rejected attempts, and remaining campaign minutes.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Can I build my own ad?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. Inside your portal you upload your logo and photos, preview your ad, and submit it. Every ad is reviewed before scheduling. Design and substantial edits are charged separately by prior agreement. Start dates are individually confirmed for the planned November 2026 launch.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What happens when my minutes run low?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "You can buy more minutes in your portal at any time to keep your ad running, with no need to wait for your next billing cycle.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What does Pioneer include?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Pioneer provides 2,000 total screen minutes per month for LKR 85,000, a three-month minimum and twelve-month price protection within agreed live coverage. Category exclusivity and automatic fleet expansion are not included.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What does the LKR 10,000 deposit cover?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "The LKR 10,000 reservation is credited against the first invoice and refundable before activation. Cancellation uses the time the request reaches our contact form or WhatsApp. See our terms for the agreed activation conditions and refunds.",
                    },
                  },
                ],
              }),
            },
          ],
        }, !isPublicWaitlistMode),
});

function PublicHomePage() {
  return isPublicWaitlistMode ? <WaitlistPage /> : <HomePage />;
}

function HomePage() {
  return (
    <main data-v2-page>
      <AtlasNav initialTone="dark" />

      <ScrollExploreCue />
      <LaunchHero />

      <JourneyStoryboard />
      <FundingStatement />

      <Expansion />
      <ActFour />

      <ActSix />
      <ActSeven />
      <ActEight />
      <AtlasFooter />
    </main>
  );
}
