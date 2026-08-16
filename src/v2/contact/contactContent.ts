// src/v2/contact/contactContent.ts
// Single source of truth for the V2 contact page copy.

export const contactEyebrow = "Contact";

export const contactHeading = "Write to the team.";

export const contactBody =
  "Tell us what you need. The message lands in our admin panel and we reply from hello@mydiio.com, usually within a few hours during Colombo business days.";

export const contactFormHeading = "Send a message";

export const contactFormBody = "Name, email, message. Three fields. No marketing follow-up.";

export const contactFormNameLabel = "Name";
export const contactFormEmailLabel = "Email";
export const contactFormMessageLabel = "Message";
export const contactFormSend = "Send message";
export const contactFormSending = "Sending…";
export const contactFormSuccess =
  "Thank you. The message is in the admin panel. We will reply within a few hours.";
export const contactFormError =
  "Something went wrong. Please try again, or email hello@mydiio.com directly.";

export const contactAdminLinkLabel = "Sign in to the admin panel";
export const contactAdminLinkHint =
  "For existing advertisers and drivers. Your campaigns, reports and portal live there.";

export const contactAddressHeading = "Where we are";

export const contactAddressLines = [
  "mydiio",
  "Start Smart Technologies Private Limited",
  "Colombo, Sri Lanka",
] as const;

export const contactHoursLabel = "Hours";

export const contactHoursLines = [
  "Monday to Friday, 9am to 6pm",
  "Sri Lanka time (UTC+05:30)",
] as const;

export const contactStatusLabel = "Status";

export const contactStatusOn = "The team is online";

export const contactStatusOff = "Outside hours — your message will be answered next morning";

export const contactCalloutLabel = "Every journey, connected.";

export const contactFaq = [
  {
    q: "I want to advertise on tuk-tuk screens. Where do I start?",
    a: "Visit /advertise to see the four monthly plans and three Burst plans. Pick one, fill in the application, and our team contacts you on WhatsApp within 24 hours.",
  },
  {
    q: "I am a driver in Colombo. Can I join?",
    a: "Yes, if you drive inside the live corridor (Dehiwala, Mount Lavinia, Ratmalana) and your routes run during active hours. Apply at /drive. The first ten drivers receive a Group A founding spot.",
  },
  {
    q: "Do you offer internships or hiring?",
    a: "Not at the moment. We are a small team focused on building the network. Send a message using the form above if you would like to be considered for future roles.",
  },
  {
    q: "Where can I read about the company?",
    a: "The mydiio Book is the source of truth for who we are and how the network works. Ask in a message and we will share it.",
  },
] as const;

export const ADMIN_URL = "https://admin.mydiio.com";
