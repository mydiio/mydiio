import { createFileRoute } from "@tanstack/react-router";
import MydiioLanding from "@/components/MydiioLanding";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "mydiio — Ads on the Move | Tuk-tuk advertising in Colombo" },
      { name: "description", content: "Sri Lanka's first cloud-managed tuk-tuk advertising platform. Reach captive Colombo passengers. Drivers earn passive income. Join the waitlist." },
      { property: "og:title", content: "mydiio — Ads on the Move" },
      { property: "og:description", content: "Cloud-managed tuk-tuk ad screens across Colombo. Advertise to captive passengers, every ride." },
    ],
  }),
});

function Index() {
  return <MydiioLanding />;
}
