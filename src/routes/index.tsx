import { createFileRoute } from "@tanstack/react-router";
import { AtlasNav } from "@/v2/layout";
import { ActOne } from "@/v2/act1";
import { ActTwo, FundingStatement } from "@/v2/act2";
import { JourneyStoryboard } from "@/v2/journeyStoryboard";
import { ActThree } from "@/v2/network";
import { ActFour } from "@/v2/platform";
import { ActFive } from "@/v2/coverage";
import { ActSix } from "@/v2/packages";
import { ActSeven } from "@/v2/pioneer";
import { ActEight } from "@/v2/closing";
import "@/v2/foundation/homepage.css";

const DASHBOARD_IMG = "/assets/advertiser-pharmacy-dashboard.png";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Advertise on Colombo's tuk-tuks | GPS-verified plays | mydiio" },
      {
        name: "description",
        content:
          "Put your brand on screens inside Colombo tuk-tuks. Every play GPS-verified, a report every Monday, your own portal to build ads and track plays. Campaigns from LKR 25,000 with 7 days free.",
      },
      { property: "og:title", content: "Advertise on Colombo's tuk-tuks | mydiio" },
      {
        property: "og:description",
        content:
          "GPS-verified plays. Weekly reports. Your own advertiser portal. From LKR 25,000 a month with 7 days free.",
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
            "GPS-verified digital advertising on screens inside Colombo tuk-tuks. Advertisers build and submit ads in their own portal, campaigns go live within 72 hours after review, and every play is reported with GPS verification.",
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
                text: "Every Monday you receive a GPS-verified report showing each vehicle that ran your ad, the GPS location at the time of each play, and the total play count. Every impression is logged.",
              },
            },
            {
              "@type": "Question",
              name: "Can I build my own ad?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Inside your portal you upload your logo and photos, preview your ad, and submit it. Every ad is reviewed before it runs, and goes live within 72 hours. We can also make your first creative for free from your existing branding.",
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
              name: "What is Pioneer corridor exclusivity?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Pioneer advertisers get twelve months of exclusivity on a defined corridor for their category, agreed at sign-up, so no other business in your category runs on that route during your first twelve months. Your per-minute rate is fixed for the life of your subscription.",
              },
            },
            {
              "@type": "Question",
              name: "What does the LKR 5,000 deposit cover?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The LKR 5,000 deposit secures your spot. It is fully refundable, credited against your first invoice when you proceed, or returned in full if you decide not to.",
              },
            },
          ],
        }),
      },
    ],
  }),
});

function HomePage() {
  return (
    <main data-v2-page>
      <AtlasNav />

      <ActOne />
      <ActTwo />

      <JourneyStoryboard />
      <FundingStatement />

      <ActThree />
      <ActFour />
      <ActFive />
      <ActSix />
      <ActSeven />
      <ActEight />
    </main>
  );
}
