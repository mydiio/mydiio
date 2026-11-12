import { preserveProductionSeo } from "@/seo/productionSeoParity";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { ContactPage } from "@/v2/contact";
import { isPublicWaitlistMode } from "@/config/publicSiteMode";

export const Route = createFileRoute("/contact")({
  beforeLoad: () => {
    if (isPublicWaitlistMode) throw redirect({ to: "/" });
  },
  component: ContactPage,
  head: preserveProductionSeo("/contact", () => ({
    meta: [
      {
        title: "Contact mydiio | Colombo, Sri Lanka",
      },
      {
        name: "description",
        content:
          "One inbox, two ways to reach mydiio. Email hello@mydiio.com or message the team on WhatsApp. Replies within a few hours during Colombo business days.",
      },
      { property: "og:title", content: "Contact, mydiio" },
      {
        property: "og:description",
        content:
          "Email or WhatsApp the team. Replies within a few hours during Colombo business days.",
      },
      { property: "og:url", content: "https://mydiio.com/contact" },
    ],
    links: [{ rel: "canonical", href: "https://mydiio.com/contact" }],
  })),
});
