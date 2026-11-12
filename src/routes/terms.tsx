import { preserveProductionSeo } from "@/seo/productionSeoParity";
import { createFileRoute } from "@tanstack/react-router";
import { TermsPage } from "@/v2/terms";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: preserveProductionSeo("/terms", () => ({
    meta: [
      { title: "Terms and Conditions, mydiio" },
      {
        name: "description",
        content:
          "mydiio terms and conditions governing use of the platform, portals, and services for advertisers, driver partners, and website visitors.",
      },
      { property: "og:title", content: "Terms and Conditions, mydiio" },
      {
        property: "og:description",
        content: "Terms governing use of the mydiio platform, portals, and services.",
      },
      { property: "og:url", content: "https://mydiio.com/terms" },
    ],
    links: [{ rel: "canonical", href: "https://mydiio.com/terms" }],
  })),
});
