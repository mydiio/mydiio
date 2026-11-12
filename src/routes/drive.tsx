import { preserveProductionSeo } from "@/seo/productionSeoParity";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { DriverPage } from "@/v2/drivers";
import { isPublicWaitlistMode } from "@/config/publicSiteMode";
import "@/v2/foundation/homepage.css";
import "@/v2/drivers/drivers.css";

export const Route = createFileRoute("/drive")({
  beforeLoad: () => {
    if (isPublicWaitlistMode) throw redirect({ to: "/" });
  },
  component: DriverPage,
  head: preserveProductionSeo("/drive", () => ({
    meta: [
      {
        title: "Earn from your tuk-tuk. Paid on the 5th. | mydiio",
      },
      {
        name: "description",
        content:
          "Join the mydiio driver network. We install a screen in your vehicle, you drive as normal. Monthly payouts on the 5th. Based in Colombo, Sri Lanka.",
      },
      {
        property: "og:title",
        content: "Earn more from your tuk-tuk | mydiio driver network",
      },
      {
        property: "og:description",
        content: "Free screen install. LKR 6,000 to 8,000 a month. Paid on the 5th.",
      },
      {
        property: "og:url",
        content: "https://mydiio.com/drive",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://mydiio.com/drive",
      },
    ],
  })),
});
