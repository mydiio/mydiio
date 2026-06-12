import { createFileRoute } from "@tanstack/react-router";
import MydiioLanding from "@/components/MydiioLanding";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "mydiio — Tuk-Tuk Advertising in Colombo, Sri Lanka" },
      { name: "description", content: "Reach passengers inside Colombo's tuk-tuks with GPS-verified digital advertising. Verified impressions, weekly reports, campaigns live in 72 hours. Starting from LKR 25,000." },
      { property: "og:title", content: "mydiio — Ads on the Move. Tuk-Tuk Advertising, Colombo." },
      { property: "og:description", content: "Reach passengers inside Colombo's tuk-tuks with GPS-verified digital advertising. Starting from LKR 25,000." },
      { property: "og:image", content: "/illustrations/coverage-fleet.png" },
      { property: "og:url", content: "https://mydiio.com/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "mydiio — Tuk-Tuk Advertising in Colombo" },
      { name: "twitter:description", content: "GPS-verified advertising inside Colombo's tuk-tuks. Campaigns from LKR 25,000." },
      { name: "twitter:image", content: "/illustrations/coverage-fleet.png" },
    ],
    links: [{ rel: "canonical", href: "https://mydiio.com/" }],
  }),
});

function Index() {
  return <MydiioLanding />;
}
