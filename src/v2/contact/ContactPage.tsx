import { AtlasNav, AtlasFooter } from "@/v2/layout";
import "@/v2/foundation/homepage.css";
import "./contact-booking.css";
import { ContactBooking } from "./ContactBooking";
import { ContactForm } from "./components/ContactForm";
import "@/v2/foundation/atlas-typography-contract.css";
import "@/v2/foundation/atlas-page-spacing.css";

export function ContactPage() {
  const topic = typeof window === "undefined" ? "" : new URLSearchParams(window.location.search).get("topic") || "";
  const legacy = ["privacy", "attention-insights", "partnership"].includes(topic);
  return (
    <main data-v2-page data-contact-page className="contact-v2">
      <AtlasNav />
      {legacy ? <ContactForm /> : <ContactBooking />}
      <AtlasFooter />
    </main>
  );
}
