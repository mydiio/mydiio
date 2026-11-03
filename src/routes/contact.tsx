import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/v2/contact";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      {
        title: "Contact mydiio | Colombo, Sri Lanka",
      },
      {
        name: "description",
        content:
          "Contact mydiio using our contact form or WhatsApp. Replies during Colombo business days.",
      },
      { property: "og:title", content: "Contact, mydiio" },
      {
        property: "og:description",
        content: "Use our contact form or WhatsApp. Replies during Colombo business days.",
      },
      { property: "og:url", content: "https://mydiio.com/contact" },
    ],
    links: [{ rel: "canonical", href: "https://mydiio.com/contact" }],
  }),
});
