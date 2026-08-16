import { createFileRoute } from "@tanstack/react-router";
import { DriverApplyPage } from "@/v2/drivers/apply";

export const Route = createFileRoute("/drivers/apply")({
  component: DriverApplyPage,
  head: () => ({
    meta: [
      { title: "Driver Partner Application, mydiio" },
      {
        name: "description",
        content:
          "Join the mydiio driver network. Free screen install, monthly route bonus, payment on the 5th.",
      },
      { property: "og:title", content: "Driver Partner Application, mydiio" },
      { property: "og:description", content: "Join the mydiio driver network." },
      { property: "og:url", content: "https://mydiio.com/drivers/apply" },
    ],
    links: [{ rel: "canonical", href: "https://mydiio.com/drivers/apply" }],
  }),
});
