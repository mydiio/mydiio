import { createFileRoute } from "@tanstack/react-router";
import MydiioLanding from "@/components/MydiioLanding";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "mydiio — Tuk-Tuk Advertising in Colombo | Ads on the Move" },
      { name: "description", content: "Put your ad on screens inside Colombo tuk-tuks. Up to 14 minutes captive viewing. From LKR 25,000/month with 7 days free." },
      { property: "og:title", content: "mydiio — Tuk-Tuk Advertising in Colombo | Ads on the Move" },
      { property: "og:description", content: "Put your ad on screens inside Colombo tuk-tuks. Up to 14 minutes captive viewing. From LKR 25,000/month with 7 days free." },
      { property: "og:url", content: "https://mydiio.com/" },
    ],
    links: [{ rel: "canonical", href: "https://mydiio.com/" }],
  }),
});

function Index() {
  return <MydiioLanding />;
}
