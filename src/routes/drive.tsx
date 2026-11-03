import { createFileRoute, redirect } from "@tanstack/react-router";
import { DriverPage } from "@/v2/drivers";
import { isPublicWaitlistMode } from "@/config/publicSiteMode";
import "@/v2/foundation/homepage.css";

export const Route = createFileRoute("/drive")({
  beforeLoad: () => {
    if (isPublicWaitlistMode) throw redirect({ to: "/" });
  },
  component: DriverPage,
  head: () => ({
    meta: [
      {
        title: "Drive with mydiio | Colombo driver enquiries",
      },
      {
        name: "description",
        content:
          "Join the mydiio driver network. We install a screen in your vehicle, you drive as normal. LKR 4,000 base plus up to LKR 2,000 bonus, paid within seven days after month-end. Based in Colombo, Sri Lanka.",
      },
      {
        property: "og:title",
        content: "Earn more from your tuk-tuk | mydiio driver network",
      },
      {
        property: "og:description",
        content:
          "Equipment and installation provided. One-time LKR 5,000 joining fee after acceptance; refundable before successful installation.",
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
  }),
});
