// src/v2/contact/contactContent.ts
// Single source of truth for the V2 contact page copy.

export const contactEyebrow = "Contact";

export const contactHeading = "Write to the team.";

export const contactBody =
  "Send advertising, driver, partnership or privacy enquiries using this form. We usually respond within 24 hours. In exceptional circumstances, please allow up to 48 hours.";

export const contactFormHeading = "Send a message";

export const contactFormBody =
  "Tell us what you need. Your details are used to handle your enquiry, not to subscribe you to marketing.";

export const contactFormNameLabel = "Name";
export const contactFormEmailLabel = "Email";
export const contactFormMessageLabel = "Message";
export const contactFormSend = "Send message";
export const contactFormSending = "Sending…";
export const contactFormSuccess =
  "Thank you. Your enquiry has been received. We usually respond within 24 hours; exceptionally, up to 48 hours.";
export const contactFormError =
  "Something went wrong. Please try again shortly, or use WhatsApp on our contact page.";

export const contactAdminLinkLabel = "Sign in to the admin panel";
export const contactAdminLinkHint =
  "For existing advertisers. Campaigns, reports and account tools live there. Drivers contact the mydiio team directly.";

export const contactAddressHeading = "Where we are";

export const contactAddressLines = [
  "mydiio",
  "Start Smart Technologies Private Limited",
  "Registration: PV00370438",
  "23, 5th Lane, Ratmalana, Colombo, Sri Lanka",
] as const;

export const contactHoursLabel = "Hours";

export const contactHoursLines = [
  "Monday to Friday, 9am to 6pm",
  "Sri Lanka time (UTC+05:30)",
] as const;

export const contactStatusLabel = "Response time";

export const contactStatusOn = "Usually within 24 hours";

export const contactStatusOff = "In exceptional circumstances, allow up to 48 hours.";

export const contactCalloutLabel = "Every journey, connected.";

export const contactFaq = [
  {
    q: "I want to advertise on tuk-tuk screens. Where do I start?",
    a: "Visit /advertise to reserve Roamer or Pioneer for our planned November 2026 launch. Planned packages accept expressions of interest without a deposit.",
  },
  {
    q: "I am a driver in Colombo. Can I join?",
    a: "Apply at /drive with your contact, vehicle and Colombo operating-route details. All vehicles require inspection; older vehicles over 15 years require exceptional review.",
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
