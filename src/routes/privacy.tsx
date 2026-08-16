import { createFileRoute } from "@tanstack/react-router";
import { PrivacyPage } from "@/v2/privacy";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: "Privacy policy, mydiio" },
      {
        name: "description",
        content:
          "mydiio privacy policy. Your information, treated carefully. What we collect, why we collect it, who we share it with, and your rights.",
      },
      { property: "og:title", content: "Privacy policy, mydiio" },
      {
        property: "og:description",
        content: "What we collect, why we collect it, who we share it with, and your rights.",
      },
      { property: "og:url", content: "https://mydiio.com/privacy" },
    ],
    links: [{ rel: "canonical", href: "https://mydiio.com/privacy" }],
  }),
});
