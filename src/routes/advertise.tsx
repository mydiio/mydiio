import { preserveProductionSeo } from "@/seo/productionSeoParity";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { AdvertisePage } from "@/v2/advertise";
import { isPublicWaitlistMode } from "@/config/publicSiteMode";
import "@/v2/foundation/homepage.css";
import "@/v2/advertise/advertise.css";

export const Route = createFileRoute("/advertise")({
  beforeLoad: () => {
    if (isPublicWaitlistMode) throw redirect({ to: "/" });
  },
  component: AdvertisePage,
  head: preserveProductionSeo("/advertise", () => ({
    meta: [
      {
        title: "GPS-verified tuk-tuk advertising in Colombo | mydiio",
      },
      {
        name: "description",
        content:
          "Launch campaigns inside Colombo tuk-tuks with GPS-verified play records and a clear report every Monday.",
      },
      {
        property: "og:title",
        content: "Every play. Proven. | mydiio",
      },
      {
        property: "og:description",
        content:
          "Campaign delivery inside Colombo tuk-tuks, verified by vehicle, location and time.",
      },
      {
        property: "og:url",
        content: "https://mydiio.com/advertise",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://mydiio.com/advertise",
      },
    ],
  })),
});
