import { AtlasNav } from "@/v2/layout";
import { AtlasFooter } from "@/v2/layout";
import "@/v2/foundation/homepage.css";
import "@/v2/contact/contact.css";

import { ContactHero } from "./components/ContactHero";
import { ContactForm } from "./components/ContactForm";
import { ContactFacts } from "./components/ContactFacts";
import { ContactFaq } from "./components/ContactFaq";

export function ContactPage() {
  return (
    <main data-v2-page data-contact-page>
      <AtlasNav />
      <ContactHero />
      <ContactForm />
      <ContactFacts />
      <ContactFaq />
      <AtlasFooter />
    </main>
  );
}
