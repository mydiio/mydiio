// src/v2/about/aboutContent.ts
// Single source of truth for the V2 about page. Sourced from
// The mydiio Book (Foundational Edition, August 2026), distilled into
// short sentences. Plain English. No jargon. No invented numbers.

export const aboutEyebrow = "About mydiio";

export const aboutHeading = "We connect every journey in Sri Lanka.";

export const aboutCalloutLabel = "Every journey, connected.";

export const aboutBody =
  "A tuk-tuk drives through a city. The screen inside shows something useful. The passenger sees the time, the weather and the shop they are passing. The driver gets paid. The advertiser knows it ran. That is the whole idea.";

/* ============================================================
 * 01 MISSION / VISION
 * ============================================================ */

export const aboutMissionEyebrow = "Mission";
export const aboutMissionBody =
  "Build the connected infrastructure that gives drivers a steady income, small businesses a measurable way to reach the street, and passengers a more useful journey.";

export const aboutVisionEyebrow = "Vision";
export const aboutVisionBody =
  "A passenger information network across South and South East Asia that carries commercial content, public information, weather, news, transport updates and trip data on the same screens.";

/* ============================================================
 * 02 PILLARS (book Ch 11-15: trust, transparency, dignity, community, reliability, safety)
 * ============================================================ */

export const aboutPillarsHeading = "Three promises we will not bend.";

export const aboutPillarsBody = "Written into how we work. Not negotiable.";

export type Pillar = {
  id: string;
  number: string;
  title: string;
  body: string;
  proof: string;
};

export const aboutPillars: readonly Pillar[] = [
  {
    id: "trust",
    number: "01",
    title: "Trust is built, not claimed",
    body: "Every report, every payment, every campaign, every support conversation either renews or weakens trust. We communicate limits clearly and correct mistakes directly. Comfortable fiction is never a substitute for an uncomfortable truth.",
    proof: "Weekly reports. Real data. Same-day replies.",
  },
  {
    id: "dignity",
    number: "02",
    title: "Driver dignity",
    body: "Drivers are partners, not vendors. A written agreement before hardware goes in. Paid on the 5th of every month without exception. Never penalised for faults outside their control. Communication in the driver's preferred language.",
    proof: "Signed agreement · paid on the 5th",
  },
  {
    id: "reliability",
    number: "03",
    title: "Reliability and graceful degradation",
    body: "The screen works, or the team fixes it. When an external service like weather or news fails, the system falls back to standard content rather than showing a broken interface. Content is reviewed before it goes live, so the network never trades long-term trust for short-term revenue.",
    proof: "Eagle Eye monitoring · content review",
  },
];

/* ============================================================
 * 05 HOW (book Ch 02 + Ch 08 — plain language, four steps)
 * ============================================================ */

export const aboutHowHeading = "How it works in plain language";

export type AboutHowStep = {
  n: string;
  title: string;
  body: string;
};

export const aboutHowSteps: readonly AboutHowStep[] = [
  {
    n: "01",
    title: "A driver signs a written agreement.",
    body: "It says the monthly pay, the bonus, the pay date and what both sides promise. In Sinhala, Tamil or English.",
  },
  {
    n: "02",
    title: "We fit a small screen in the tuk-tuk.",
    body: "About one hour. Wired to the vehicle's existing electrics. No cost to the driver. The driver keeps their routes, hours and passengers.",
  },
  {
    n: "03",
    title: "An advertiser runs their campaign.",
    body: "From a monthly plan or a short, one-off campaign. The screen plays it during real passenger journeys.",
  },
  {
    n: "04",
    title: "GPS records every play.",
    body: "Vehicle, place and time. No estimate, no rounding up. The driver gets paid on the 5th. The advertiser gets a weekly report.",
  },
];

/* ============================================================
 * 06 SIDES — bigger-than-ads (book Ch 07 + Ch 10)
 * Show the passenger benefit and the driver benefit as the
 * primary story, with advertisers as one of three equal sides.
 * ============================================================ */

export const aboutPassengersHeading = "Passengers get a more useful journey.";

export const aboutPassengersBody =
  "Time, weather, public notices. Reviewed before it runs. Passenger data is session-only.";

export const aboutPassengersProof1Value = "Reviewed";
export const aboutPassengersProof1Label = "Every creative before it goes live";

export const aboutPassengersProof2Value = "Session-only";
export const aboutPassengersProof2Label = "No passenger profiles";

export const aboutPassengersProof3Value = "Always-on";
export const aboutPassengersProof3Label = "Weather, time, local notices";

export const aboutPassengersCta = "See the full passenger promise";

export const aboutDriversHeading = "Drivers are partners, not vendors.";

export const aboutDriversBody =
  "Monthly pay on the 5th. Written agreement first. Never penalised for faults outside their control.";

export const aboutDriversProof1Value = "5th";
export const aboutDriversProof1Label = "Pay day, every month";

export const aboutDriversProof2Value = "Written";
export const aboutDriversProof2Label = "Agreement before install";

export const aboutDriversProof3Value = "Always";
export const aboutDriversProof3Label = "In Sinhala, Tamil or English";

export const aboutDriversCta = "Read about joining the driver network";

export const aboutBusinessesHeading = "Businesses get measurable local reach.";

export const aboutBusinessesBody =
  "Your campaign plays inside active tuk-tuks on real routes. The report shows which vehicles, where, when.";

export const aboutBusinessesProof1Value = "GPS";
export const aboutBusinessesProof1Label = "Every play recorded";

export const aboutBusinessesProof2Value = "Weekly";
export const aboutBusinessesProof2Label = "Report every week";

export const aboutBusinessesProof3Value = "Self-serve";
export const aboutBusinessesProof3Label = "Build and submit in your portal";

export const aboutBusinessesCta = "Read about advertising with mydiio";

/* ============================================================
 * 07 OPERATING SYSTEM (book Ch 06) — five portals, one backend
 * ============================================================ */

export const aboutPlatformHeading = "Five portals, one source of truth.";

export const aboutPlatformBody =
  "Eagle Eye runs the network. The advertiser portal runs campaigns. The driver portal runs earnings. The tablet player runs the passenger experience. The public website introduces the network. They share one backend and one operational truth.";

export type Portal = {
  name: string;
  role: string;
};

export const aboutPortals: readonly Portal[] = [
  {
    name: "Eagle Eye",
    role: "The team command centre. Live fleet, GPS, content review, reports.",
  },
  {
    name: "Advertiser portal",
    role: "Build campaigns, upload creative, watch every play, pull the report.",
  },
  {
    name: "Driver portal",
    role: "Earnings, agreement, routes, vehicle, support in one place.",
  },
  {
    name: "Tablet player",
    role: "What the passenger sees. Reviews, content safety, graceful degradation.",
  },
  {
    name: "Public website",
    role: "Where the network introduces itself. Paths for each kind of visitor.",
  },
];

/* ============================================================
 * 09 FUTURE (book Ch 19)
 * ============================================================ */

export const aboutFutureHeading = "What the foundation makes possible next.";

export const aboutFutureBody =
  "The foundation makes much more possible, in sequence, when the market is ready.";

export type FutureItem = {
  title: string;
  body: string;
  cadence: "live" | "soon" | "next";
};

export const aboutFuture: readonly FutureItem[] = [
  {
    title: "Weather, news, public information",
    body: "Today the screen carries advertising plus weather, news and public service notices. Content is reviewed, session-only and never used to build passenger profiles.",
    cadence: "live",
  },
  {
    title: "Emergency alerts and council notices",
    body: "Once the infrastructure is reliable enough to carry information without creating false confidence, emergency services, councils and utilities can use the network for alerts and updates.",
    cadence: "soon",
  },
  {
    title: "Transport updates and trip data",
    body: "Future phases can support transport information, tourism content, multilingual services and carefully designed QR experiences that connect local discovery with real use.",
    cadence: "next",
  },
  {
    title: "Other vehicles, other markets",
    body: "Buses, tour vans, ride-platform vehicles and water transport in other markets. The platform is vehicle-agnostic. Each environment adapts the hardware, content and incentive model without rebuilding the foundation.",
    cadence: "next",
  },
];

/* ============================================================
 * 10 BOOK + CLOSING
 * ============================================================ */

export const aboutBookEyebrow = "The full story";

export const aboutBookHeading = "The mydiio Book is the source of truth for the company.";

export const aboutBookBody =
  "Who we are, what the network is, what we will not compromise on. Twenty-three short chapters. Written in plain language. The same book we hand to every new driver and every new advertiser.";

export const aboutBookCta = "Ask us for the book";

export const aboutClosingHeading = "Start with one journey.";

export const aboutClosingBody =
  "One driver, one business, one passenger. We are early on purpose. The infrastructure is being built one decision at a time, and every promise in this book is something the team is willing to be measured against.";

export const aboutClosingCta = "Talk to the team";

export const WHATSAPP_URL = "https://wa.me/94707471002";
export const CONTACT_URL = "/contact";
