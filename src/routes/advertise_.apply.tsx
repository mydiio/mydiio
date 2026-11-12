import { preserveProductionSeo } from "@/seo/productionSeoParity";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { LaunchPage } from "@/v2/launch";
import { isPublicWaitlistMode } from "@/config/publicSiteMode";

export const Route = createFileRoute("/advertise_/apply")({
  beforeLoad: () => {
    if (isPublicWaitlistMode) throw redirect({ to: "/" });
  },
  component: LaunchPage,
  head: preserveProductionSeo("/advertise/apply", () => ({
    meta: [
      {
        title: "Launch a campaign | mydiio",
      },
      {
        name: "description",
        content:
          "Apply to put your brand on the screens inside mydiio's tuk-tuks. Four fields. No payment today. The team replies within 24 hours.",
      },
      { property: "og:title", content: "Launch a campaign with mydiio" },
      {
        property: "og:description",
        content:
          "Apply to advertise on screens inside mydiio's tuk-tuks. Four fields. Replies within 24 hours.",
      },
      { property: "og:url", content: "https://mydiio.com/advertise/apply" },
    ],
    links: [{ rel: "canonical", href: "https://mydiio.com/advertise/apply" }],
  })),
});
