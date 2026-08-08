import { WHATSAPP_URL } from "../homeContent";

export function HomeWhatsapp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with mydiio sales on WhatsApp"
      className="home-whatsapp-fab"
    >
      <span className="home-whatsapp-dot" aria-hidden="true" />
      Chat with sales
    </a>
  );
}
