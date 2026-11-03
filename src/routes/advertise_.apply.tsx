import { createFileRoute, redirect } from "@tanstack/react-router";
import { LaunchPage } from "@/v2/launch";
import { isPublicWaitlistMode } from "@/config/publicSiteMode";

export const Route = createFileRoute("/advertise_/apply")({
  beforeLoad: () => {
    if (isPublicWaitlistMode) throw redirect({ to: "/" });
  },
  component: LaunchPage,
  head: () => ({
    meta: [
      {
        title: "Launch a campaign | mydiio",
      },
      {
        name: "description",
        content:
          "Reserve for mydiio’s planned November 2026 launch across Colombo. No payment through this form. Replies usually within 24 hours, up to 48 in exceptional cases.",
      },
      { property: "og:title", content: "Launch a campaign with mydiio" },
      {
        property: "og:description",
        content:
          "Tell us about your campaign. Replies usually within 24 hours, up to 48 in exceptional cases.",
      },
      { property: "og:url", content: "https://mydiio.com/advertise/apply" },
    ],
    links: [{ rel: "canonical", href: "https://mydiio.com/advertise/apply" }],
  }),
});
