import { createFileRoute, redirect } from "@tanstack/react-router";
import { AboutPage } from "@/v2/about";
import { isPublicWaitlistMode } from "@/config/publicSiteMode";

export const Route = createFileRoute("/about")({
  beforeLoad: () => {
    if (isPublicWaitlistMode) throw redirect({ to: "/" });
  },
  component: AboutPage,
  head: () => ({
    meta: [
      {
        title: "What mydiio stands for | mydiio",
      },
      {
        name: "description",
        content:
          "mydiio connects every journey in Sri Lanka. A tuk-tuk drives through a city. The screen shows something useful. The advertiser knows it ran. The driver got paid.",
      },
      { property: "og:title", content: "About, mydiio" },
      {
        property: "og:description",
        content:
          "Three promises that do not bend. Six years from a personal decision to a working network in a single live corridor.",
      },
      { property: "og:url", content: "https://mydiio.com/about" },
    ],
    links: [{ rel: "canonical", href: "https://mydiio.com/about" }],
  }),
});
