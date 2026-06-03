import { createFileRoute } from "@tanstack/react-router";
import MydiioLanding from "@/components/MydiioLanding";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "mydiio — Tuk-Tuk Advertising in Colombo | Ads on the Move" },
      { name: "description", content: "mydiio puts your ad on a screen inside Colombo tuk-tuks. Passengers watch for 14 minutes with no skip button. From LKR 25,000/month with 7 days free. 10 Pioneer spots available. Join the waitlist today." },
      { property: "og:title", content: "mydiio — Tuk-Tuk Advertising in Colombo | Ads on the Move" },
      { property: "og:description", content: "mydiio puts your ad on a screen inside Colombo tuk-tuks. Passengers watch for 14 minutes with no skip button. From LKR 25,000/month with 7 days free." },
    ],
  }),
});

function Index() {
  return <MydiioLanding />;
}
