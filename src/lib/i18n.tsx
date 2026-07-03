import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { t as tPublic, type Language as PublicLang } from "@/lib/public-site-translations";

export type Lang = "en" | "si" | "ta";
export const LANGS: { code: Lang; label: string; native: string; htmlLang: string }[] = [
  { code: "en", label: "EN", native: "English", htmlLang: "en" },
  { code: "si", label: "සිං", native: "සිංහල", htmlLang: "si" },
  { code: "ta", label: "தமிழ்", native: "தமிழ்", htmlLang: "ta" },
];

type Entry = { en: string; si: string; ta: string };
type Dict = Record<string, Entry>;

/**
 * Placeholder convention: any Sinhala or Tamil string that has not been
 * professionally translated MUST be prefixed with "[SI] " or "[TA] " and
 * a short English hint. This makes untranslated content unmistakable on
 * screen and grep-able (rg "\[SI\]" src/lib/i18n.tsx).
 */
const P = (lang: "SI" | "TA", en: string) => `[${lang}] ${en}`;

/** Build a placeholder-only entry from an English source string. */
const en = (s: string): Entry => ({ en: s, si: P("SI", s), ta: P("TA", s) });

/** Same, but preserves already-authored SI/TA where provided. */
const tr = (source: { en: string; si?: string; ta?: string }): Entry => ({
  en: source.en,
  si: source.si && !/^\s*$/.test(source.si) ? source.si : P("SI", source.en),
  ta: source.ta && !/^\s*$/.test(source.ta) ? source.ta : P("TA", source.en),
});

export const dict: Dict = {
  // ============================================================
  // NAV
  // ============================================================
  nav_home: tr({ en: "Home", si: "මුල්", ta: "முகப்பு" }),
  nav_advertisers: tr({ en: "Advertisers", si: "දැන්වීම්", ta: "விளம்பரம்" }),
  nav_drivers: tr({ en: "Drivers", si: "රියදුරු", ta: "ஓட்டுநர்" }),
  nav_investors: tr({ en: "Investors", si: "ආයෝජන", ta: "முதலீடு" }),
  nav_about: tr({ en: "About", si: "අපි", ta: "எங்களை" }),
  nav_contact: tr({ en: "Contact", si: "අමතන්න", ta: "தொடர்பு" }),
  nav_signin: en("Sign in"),
  nav_menu: en("Menu"),
  nav_close: en("Close menu"),
  nav_lang_label: en("Language"),

  cta_launch: tr({ en: "Launch Campaign", si: "දැන්වීම අරඹන්න", ta: "விளம்பரம் தொடங்கு" }),
  cta_launch_pilot: en("Launch a campaign →"),
  cta_talk_founder: en("Become a driver →"),

  // ============================================================
  // ANNOUNCEMENT BAR
  // ============================================================
  ann_pilot: en("Pilot launch open in Colombo, 10 Pioneer spots remaining"),
  ann_claim: en("Claim yours →"),

  // ============================================================
  // HOME · HERO
  // ============================================================
  hero_kicker: { en: "mydiio", si: "mydiio", ta: "mydiio" },
  hero_title: en(
    "Sri Lanka's first connected passenger information network, installed inside tuk-tuks, funded by advertising, built for people.",
  ),
  hero_sub: en(
    "mydiio connects businesses with engaged passengers through digital advertising screens inside Colombo's tuk-tuks. Verified impressions, affordable campaigns, measured results.",
  ),
  hero_live_badge: en("Founding fleet · launching now"),

  // ============================================================
  // HOME · STATS STRIP
  // ============================================================
  stats_pilot_vehicles: en("Pilot Vehicles"),
  stats_avg_ride: en("Avg Ride"),
  stats_campaign: en("Campaign"),
  stats_pioneer_spots: en("Pioneer Spots"),
  stats_min: en("min"),
  stats_hrs: en("hrs"),

  // Legacy metric keys still consumed by some components
  metric_vehicles: tr({ en: "Pilot vehicles", si: "පයිලට් වාහන", ta: "பைலட் வாகனங்கள்" }),
  metric_attention: tr({ en: "Campaign launch", si: "ව්‍යාපාර දියත් කිරීම", ta: "பிரச்சார தொடக்கம்" }),
  metric_launch: tr({ en: "Pioneer spots", si: "පුරෝගාමී ස්ථාන", ta: "முன்னோடி இடங்கள்" }),
  metric_min: tr({ en: "min", si: "මිනි", ta: "நிமி" }),
  metric_hr: tr({ en: "hrs", si: "පැය", ta: "மணி" }),

  // ============================================================
  // HOME · MARQUEE
  // ============================================================
  mq_gps: en("GPS VERIFIED"),
  mq_real: en("REAL IMPRESSIONS"),
  mq_every: en("EVERY JOURNEY, CONNECTED"),
  mq_320k: en("320,000 TUKS IN COLOMBO"),
  mq_trans: en("RADICAL TRANSPARENCY"),
  mq_dignity: en("DRIVER DIGNITY"),
  mq_paid: en("PAID ON THE 5TH"),

  // ============================================================
  // HOME · WHY IT WORKS
  // ============================================================
  why_kicker: { en: "mydiio", si: "mydiio", ta: "mydiio" },
  why_title: en("Turn travel time into advertising time"),
  why_c1_t: en("Advertising people actually see."),
  why_c1_b: en(
    "Unlike social media ads that are skipped in seconds, mydiio places your message directly in front of engaged passengers during their daily journeys. No scroll button. No skip.",
  ),
  why_c2_t: en("Verified campaign reporting."),
  why_c2_b: en(
    "Every ad play is automatically logged with location and time data. Advertisers receive regular reports showing where their campaign was displayed, how often it was played, and which areas of the city it reached.",
  ),
  why_c3_t: en("Transparent Performance."),
  why_c3_b: en(
    "Know exactly where your advertising budget is being spent. Our reporting provides clear visibility of campaign delivery across the mydiio network.",
  ),
  why_c4_t: en("Quick campaign launch."),
  why_c4_b: en(
    "From approval to launch, most mydiio campaigns are live within 72 hours, helping businesses get in front of customers faster.",
  ),

  // ============================================================
  // HOME · HOW IT WORKS
  // ============================================================
  how_kicker: en("how it works"),
  how_title: en("Simple. Fast. Verified."),
  how_s1_t: en("Submit your ad."),
  how_s1_b: en(
    "Send us your 15 or 30-second video or image. Don't have creative ready? Our team can help you get started.",
  ),
  how_s2_t: en("Go live in as little as 72 hours."),
  how_s2_b: en(
    "Once approved, your campaign can be live across the mydiio network in as little as 72 hours.",
  ),
  how_s3_t: en("You get the proof."),
  how_s3_b: en(
    "Every ad play is logged and verified. Receive regular reports showing campaign activity, locations reached and delivery performance.",
  ),

  // ============================================================
  // HOME · TUK INTERIOR
  // ============================================================
  tuk_kicker: tr({ en: "Inside the ride", si: "ගමන තුළ", ta: "பயணத்தின் உள்ளே" }),
  tuk_title: tr({
    en: "The screen they can't look away from.",
    si: "ඔවුන් ඉවත බලා ගත නොහැකි තිරය.",
    ta: "அவர்கள் கண்களை அகற்ற முடியாத திரை.",
  }),
  tuk_body: en(
    "Every mydiio screen is mounted at passenger eye level, delivering your message throughout the journey.\n\ntuk-tuks move millions of people around Sri Lanka every day, yet digital advertising inside them remains virtually untapped.\n\nmydiio is building Sri Lanka's first connected passenger information network, installed inside tuk-tuks, funded by advertising, built for people, helping businesses reach customers while creating new earning opportunities for drivers.\n\nAdvertising that moves with the city.",
  ),
  tuk_cta: tr({ en: "See it in a pilot →", si: "පයිලට් එකකින් බලන්න →", ta: "பைலட்டில் பாருங்கள் →" }),
  tuk_live_campaign: en("LIVE CAMPAIGN"),

  // ============================================================
  // HOME · COVERAGE
  // ============================================================
  cov_kicker: en("Coverage"),
  cov_title: en("Your campaign, across Colombo."),
  cov_body: en(
    "Reach passengers in the neighbourhoods where your customers already are. Explore where the fleet operates every day.",
  ),

  // ============================================================
  // HOME · TWO AUDIENCES
  // ============================================================
  ad_kicker: tr({ en: "For advertisers", si: "ප්‍රචාරකයින් සඳහා", ta: "விளம்பரதாரர்களுக்கு" }),
  ad_title: tr({
    en: "Turn Colombo traffic into customers.",
    si: "කොළඹ ගමනාගමනය පාරිභෝගිකයන් බවට පත් කරන්න.",
    ta: "கொழும்பு போக்குவரத்தை வாடிக்கையாளர்களாக மாற்றுங்கள்.",
  }),
  ad_body: en(
    "From restaurants to banks to apps, businesses use mydiio to stay visible where buying decisions actually happen. Starting from LKR 25,000 a month, with your first 7 days completely free.",
  ),
  ad_cta: tr({ en: "Get pricing →", si: "මිල ලබා ගන්න →", ta: "விலையை பெறுங்கள் →" }),

  dr_kicker: tr({ en: "For drivers", si: "රියදුරන් සඳහා", ta: "ஓட்டுநர்களுக்கு" }),
  dr_title: tr({
    en: "Earn more from every ride.",
    si: "සෑම ගමනකින්ම වැඩි ආදායමක්.",
    ta: "ஒவ்வொரு பயணத்திலும் அதிக சம்பாதியுங்கள்.",
  }),
  dr_body: en(
    "Join the network and unlock extra monthly income, without changing your routes. We install a screen in your tuk. You just drive. We pay you on the 5th of every month.",
  ),
  dr_cta: tr({
    en: "Join the driver network →",
    si: "රියදුරු ජාලයට එක්වන්න →",
    ta: "ஓட்டுநர் வலைப்பின்னலில் சேருங்கள் →",
  }),

  // ============================================================
  // HOME · REPORTING
  // ============================================================
  rep_kicker: tr({ en: "Reporting", si: "වාර්තාකරණය", ta: "அறிக்கையிடல்" }),
  rep_title: tr({
    en: "Measured, not guessed.",
    si: "මනින ලද, අනුමාන කරන ලද නොවේ.",
    ta: "அளவிடப்பட்டது, யூகிக்கப்பட்டதல்ல.",
  }),
  rep_body: en(
    "Track active vehicles, fleet coverage, campaign uptime, and verified impressions, updated in real time. Every advertiser gets full dashboard access the moment their campaign goes live.",
  ),
  rep_m1: en("Active vehicles"),
  rep_m2: en("Est. daily impressions"),
  rep_m3: en("Avg screen uptime"),
  rep_m4: en("Routes covered"),

  // ============================================================
  // HOME · WHY NOW
  // ============================================================
  whyn_kicker: tr({ en: "Why now", si: "දැන් ඇයි", ta: "ஏன் இப்போது" }),
  whyn_title: tr({
    en: "A massive channel hiding in plain sight.",
    si: "පැහැදිලිව පෙනෙන තැන සැඟවී ඇති විශාල නාලිකාවක්.",
    ta: "வெளிப்படையாக மறைந்திருக்கும் ஒரு பெரிய சேனல்.",
  }),
  whyn_body: en(
    "1.1 million tuk-tuks operate across Sri Lanka. 320,000 in and around Colombo. Zero of them had screens until now. mydiio is the first platform to change that.",
  ),

  // ============================================================
  // HOME · SCALE STORY / ROAD AHEAD
  // ============================================================
  scale_kicker: en("The Road Ahead"),
  scale_title: tr({
    en: "Colombo first. Every city next.",
    si: "මුලින්ම කොළඹ. ඊළඟට සෑම නගරයක්ම.",
    ta: "முதலில் கொழும்பு. அடுத்து ஒவ்வொரு நகரமும்.",
  }),
  scale_c1_t: en("More screens."),
  scale_c1_b: en("As the network grows, your campaigns can reach more passengers across more areas."),
  scale_c2_t: en("More locations."),
  scale_c2_b: en("Expand into new areas and connect with audiences wherever they travel."),
  scale_c3_t: en("More insights."),
  scale_c3_b: en("Smarter campaigns backed by real data."),
  scale_c4_t: en("More growth."),
  scale_c4_b: en("More value for businesses, drivers and passengers."),

  // ============================================================
  // HOME · FOUNDING OFFER
  // ============================================================
  fo_kicker: tr({
    en: "Founding offer · 10 spots",
    si: "ආරම්භක දීමනාව · ස්ථාන 10",
    ta: "நிறுவன சலுகை · 10 இடங்கள்",
  }),
  fo_title: tr({
    en: "First 10 brands get founding access.",
    si: "පළමු සන්නාම 10ට ආරම්භක ප්‍රවේශය ලැබේ.",
    ta: "முதல் 10 பிராண்டுகள் நிறுவன அணுகலைப் பெறுகின்றன.",
  }),
  fo_body: en(
    "We're opening a limited number of pilot campaigns for our first advertisers. Founding partners get priority placement, a locked-in rate, and full dashboard access from day one.",
  ),
  fo_b1: en("Priority placements across the fleet"),
  fo_b2: en("Rate locked in for the life of your contract"),
  fo_b3: en("First 7 days completely free"),
  fo_b4: en("Free ad creative production to get you started"),
  fo_cta: tr({
    en: "Claim a pilot slot →",
    si: "පරීක්ෂණ ස්ථානය ලබාගන්න →",
    ta: "முன்னோடி இடத்தை பெறுங்கள் →",
  }),

  // ============================================================
  // HOME · FAQ
  // ============================================================
  faq_kicker: tr({ en: "Questions", si: "ප්‍රශ්න", ta: "கேள்விகள்" }),
  faq_title: tr({
    en: "Frequently asked.",
    si: "නිතර අසන ප්‍රශ්න.",
    ta: "அடிக்கடி கேட்கப்படுபவை.",
  }),
  faq_q1: tr({
    en: "How many tuk-tuks are live?",
    si: "කොපමණ ත්‍රිරෝද රථ සක්‍රීයද?",
    ta: "எத்தனை டுக்-டுக்குகள் இயங்குகின்றன?",
  }),
  faq_a1: en(
    "We are launching our pilot fleet of 10 tuk-tuks across Colombo, covering Fort, Nugegoda, Wellawatte, Pettah, and Maharagama. The fleet grows as more drivers join the network.",
  ),
  faq_q2: tr({
    en: "How do advertisers measure results?",
    si: "ප්‍රචාරකයින් ප්‍රතිඵල මනින්නේ කෙසේද?",
    ta: "விளம்பரதாரர்கள் முடிவுகளை எப்படி அளவிடுகிறார்கள்?",
  }),
  faq_a2: en(
    "Every Monday you receive a verified report showing which vehicles ran your ad, where they were, what time it played, and how many times. The data comes directly from the GPS and play logs on each device.",
  ),
  faq_q3: tr({
    en: "How quickly can campaigns launch?",
    si: "ව්‍යාපාර කොතරම් ඉක්මනින් දියත් කළ හැකිද?",
    ta: "பிரச்சாரங்கள் எவ்வளவு விரைவாக தொடங்க முடியும்?",
  }),
  faq_a3: en(
    "Once your creative is approved, most campaigns go live across the fleet within 72 hours. If you need help making a creative, we can produce a simple 15-second ad for you as part of getting started.",
  ),
  faq_q4: tr({ en: "What cities are next?", si: "ඊළඟට කුමන නගරද?", ta: "அடுத்து என்ன நகரங்கள்?" }),
  faq_a4: en(
    "We start in Colombo. Kandy, Galle, Jaffna, and Nuwara Eliya are the confirmed Year 2 to 3 national expansion targets. The network is built to expand.",
  ),
  faq_q5: tr({
    en: "How do drivers get paid?",
    si: "රියදුරන්ට ගෙවන්නේ කෙසේද?",
    ta: "ஓட்டுநர்களுக்கு எப்படி பணம் செலுத்தப்படுகிறது?",
  }),
  faq_a5: en(
    "On the 5th of every calendar month, by bank transfer. Base pay is LKR 6,000 unconditionally every month. Drivers who keep their screen active for an average of 8 or more hours per day earn an additional LKR 2,000 route bonus.",
  ),

  // ============================================================
  // HOME · FINAL CTA
  // ============================================================
  fcta_kicker: tr({ en: "Get started", si: "ආරම්භ කරන්න", ta: "தொடங்குங்கள்" }),
  fcta_title: tr({
    en: "Ready to own Colombo's streets?",
    si: "කොළඹ වීදි අයිති කර ගැනීමට සූදානම්ද?",
    ta: "கொழும்பு தெருக்களை சொந்தமாக்க தயாரா?",
  }),

  // ============================================================
  // FOOTER
  // ============================================================
  ft_tagline: tr({
    en: "Every Journey, Connected.",
    si: "සෑම ගමනම, සම්බන්ධයි.",
    ta: "ஒவ்வொரு பயணமும் இணைக்கப்பட்டது.",
  }),
  ft_description: tr({
    en: "Sri Lanka's connected passenger information network",
    si: "ශ්‍රී ලංකාවේ සම්බන්ධ මගී තොරතුරු ජාලය",
    ta: "இலங்கையின் இணைக்கப்பட்ட பயணிகள் தகவல் வலைப்பின்னல்",
  }),
  ft_l1: tr({
    en: "Advertiser bookings open",
    si: "ප්‍රචාරක වෙන්කරවා ගැනීම් විවෘතයි",
    ta: "விளம்பரதாரர் முன்பதிவுகள் திறக்கப்பட்டுள்ளன",
  }),
  ft_l2: tr({
    en: "Investor conversations welcome",
    si: "ආයෝජක සංවාද සාදරයෙන් පිළිගනිමු",
    ta: "முதலீட்டாளர் உரையாடல்கள் வரவேற்கப்படுகின்றன",
  }),
  ft_l3: tr({
    en: "Based in Colombo, Sri Lanka",
    si: "කොළඹ, ශ්‍රී ලංකාවේ පිහිටා ඇත",
    ta: "கொழும்பு, இலங்கையில் அமைந்துள்ளது",
  }),
  ft_explore: tr({ en: "Explore", si: "ගවේෂණය", ta: "ஆராய்க" }),
  ft_legal: tr({ en: "Legal", si: "නෛතික", ta: "சட்ட" }),
  ft_built: tr({
    en: "Built in Colombo, for Colombo.",
    si: "කොළඹ සඳහා, කොළඹ තුළ ගොඩනගා ඇත.",
    ta: "கொழும்பிற்காக, கொழும்பில் கட்டப்பட்டது.",
  }),
  ft_avail: tr({
    en: "Available in English · Sinhala · Tamil",
    si: "ඉංග්‍රීසි · සිංහල · දෙමළ භාෂාවලින් ලබාගත හැක",
    ta: "ஆங்கிலம் · சிங்களம் · தமிழில் கிடைக்கிறது",
  }),
  ft_network: en("Network"),
  ft_privacy: en("Privacy Policy"),
  ft_terms: en("Terms and Conditions"),
  ft_copyright: en("© 2026 mydiio · Colombo · Sri Lanka"),

  // ============================================================
  // ABOUT (partial — full pass in follow-up turn)
  // ============================================================
  about_kicker: tr({ en: "About mydiio", si: "mydiio ගැන", ta: "mydiio பற்றி" }),
  about_title: tr({
    en: "Built in Sri Lanka, for Sri Lanka.",
    si: "ශ්‍රී ලංකාව සඳහා, ශ්‍රී ලංකාවේ ගොඩනගා ඇත.",
    ta: "இலங்கைக்காக, இலங்கையில் கட்டப்பட்டது.",
  }),
  about_p1: tr({
    en: "mydiio was created to unlock one of the country's most overlooked assets: commuter attention.",
    si: "mydiio නිර්මාණය කරන ලද්දේ රටේ බොහෝ දුරට නොසලකා හරින ලද වත්කමක් වන මගී අවධානය විවෘත කිරීමටයි.",
    ta: "mydiio உருவாக்கப்பட்டது நாட்டின் மிகவும் கவனிக்கப்படாத சொத்துக்களில் ஒன்றை திறக்க: பயணிகளின் கவனம்.",
  }),
  about_p2: en(
    "We combine local execution with scalable technology, turning Colombo's tuk-tuks into Sri Lanka's first connected passenger information network, installed inside tuk-tuks, funded by advertising, built for people.",
  ),
  about_for_inv: tr({
    en: "For Investors →",
    si: "ආයෝජකයින් සඳහා →",
    ta: "முதலீட்டாளர்களுக்கு →",
  }),

  // ============================================================
  // CONTACT
  // ============================================================
  contact_kicker: tr({ en: "Contact", si: "සම්බන්ධතා", ta: "தொடர்பு" }),
  contact_title: tr({ en: "Let's talk.", si: "අපි කතා කරමු.", ta: "பேசுவோம்." }),
  contact_sub: tr({
    en: "Campaign bookings, investor questions, driver signups, start here.",
    si: "ව්‍යාපාර වෙන්කරවා ගැනීම්, ආයෝජක ප්‍රශ්න, රියදුරු ලියාපදිංචිය, මෙතැනින් අරඹන්න.",
    ta: "பிரச்சார முன்பதிவு, முதலீட்டாளர் கேள்விகள், ஓட்டுநர் பதிவு, இங்கே தொடங்குங்கள்.",
  }),
  contact_intent_book: tr({
    en: "Book Campaign",
    si: "ව්‍යාපාර වෙන්කරවා ගන්න",
    ta: "பிரச்சாரம் முன்பதிவு",
  }),
  contact_intent_inv: tr({
    en: "Investor Inquiry",
    si: "ආයෝජක විමසුම",
    ta: "முதலீட்டாளர் விசாரணை",
  }),
  contact_intent_dr: tr({
    en: "Driver Signup",
    si: "රියදුරු ලියාපදිංචිය",
    ta: "ஓட்டுநர் பதிவு",
  }),
  contact_name: tr({ en: "Name", si: "නම", ta: "பெயர்" }),
  contact_company: tr({ en: "Company", si: "සමාගම", ta: "நிறுவனம்" }),
  contact_email: tr({ en: "Email", si: "විද්‍යුත් තැපෑල", ta: "மின்னஞ்சல்" }),
  contact_message: tr({ en: "Message", si: "පණිවිඩය", ta: "செய்தி" }),
  contact_send: tr({
    en: "Send Message →",
    si: "පණිවිඩය යවන්න →",
    ta: "செய்தியை அனுப்பு →",
  }),
  contact_wa: tr({
    en: "WhatsApp the team",
    si: "කණ්ඩායමට WhatsApp කරන්න",
    ta: "குழுவிற்கு WhatsApp",
  }),
  contact_opening: tr({
    en: "Opening your email client…",
    si: "ඔබේ විද්‍යුත් තැපැල් සේවාදායකය විවෘත කරමින්…",
    ta: "உங்கள் மின்னஞ்சல் கிளையண்டைத் திறக்கிறது…",
  }),

  // ============================================================
  // INVESTORS (partial)
  // ============================================================
  inv_kicker: tr({
    en: "For investors",
    si: "ආයෝජකයින් සඳහා",
    ta: "முதலீட்டாளர்களுக்கு",
  }),
  inv_title: en("Sri Lanka's first connected passenger information network."),
  inv_sub: tr({
    en: "Recurring revenue. Asset-light. Regional potential.",
    si: "පුනරාවර්තන ආදායම. වත්කම්-සැහැල්ලු. ප්‍රාදේශීය විභවය.",
    ta: "தொடர் வருவாய். சொத்து-இலகுவான. பிராந்திய ஆற்றல்.",
  }),
  inv_request_deck: tr({
    en: "Request investor deck",
    si: "ආයෝජක ඩෙක් ඉල්ලන්න",
    ta: "முதலீட்டாளர் டெக் கோரிக்கை",
  }),

  // ============================================================
  // PAGE META (title + description per page)
  // Titles override document.title on lang switch via <MetaSync/>.
  // ============================================================
  meta_home_title: en(
    "mydiio, Sri Lanka's first connected passenger information network",
  ),
  meta_home_desc: en(
    "Reach passengers inside Colombo's tuk-tuks with GPS-verified digital advertising. Verified impressions, weekly reports, campaigns live in 72 hours. Starting from LKR 25,000.",
  ),
  meta_advertise_title: en("Advertise inside Colombo tuk-tuks | mydiio"),
  meta_advertise_desc: en(
    "Launch a GPS-verified ad campaign inside Colombo tuk-tuks. From LKR 25,000/month with 7 days free. Real reporting, real reach.",
  ),
  meta_drive_title: en("Drive with mydiio | Earn more from every ride"),
  meta_drive_desc: en(
    "Join mydiio as a driver and unlock extra monthly income without changing your routes. Paid on the 5th of every month.",
  ),
  meta_investors_title: en(
    "For investors | mydiio, Sri Lanka's connected passenger information network",
  ),
  meta_investors_desc: en(
    "mydiio: recurring revenue, asset-light, regional potential. Learn how we're building Sri Lanka's first connected passenger information network.",
  ),
  meta_about_title: en(
    "About mydiio | Built in Sri Lanka, for Sri Lanka",
  ),
  meta_about_desc: en(
    "mydiio is Sri Lanka's first connected passenger information network, installed inside tuk-tuks, funded by advertising, built for people.",
  ),
  meta_contact_title: en("Contact mydiio | Let's talk"),
  meta_contact_desc: en(
    "Campaign bookings, investor questions, driver signups, start here. Reach the mydiio team in Colombo.",
  ),
  meta_privacy_title: en("Privacy Policy | mydiio"),
  meta_privacy_desc: en("How mydiio collects, uses, and protects personal information."),
  meta_terms_title: en("Terms and Conditions | mydiio"),
  meta_terms_desc: en("The terms governing use of the mydiio network by advertisers and drivers."),

  // Legal-page translation banner shown when lang !== en
  legal_translation_notice: en(
    "This legal document is authoritative in English. Sinhala and Tamil translations are pending.",
  ),
};

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: keyof typeof dict) => string;
  /** Namespaced translation lookup against public-site-translations.ts (e.g. "home.hero.headline"). */
  tt: (namespacedKey: string) => string;
  /** Register per-page meta so <MetaSync/> can update <head> on lang change. */
  setPageMeta: (meta: PageMeta | null) => void;
}

interface PageMeta {
  titleKey?: keyof typeof dict;
  descKey?: keyof typeof dict;
  title?: string;
  description?: string;
}

const I18nContext = createContext<Ctx | null>(null);

function detectInitialLang(): Lang {
  if (typeof window === "undefined") return "en";
  try {
    const url = new URL(window.location.href);
    const q = url.searchParams.get("lang");
    if (q === "en" || q === "si" || q === "ta") return q;
    const stored = window.localStorage.getItem("mydiio.lang");
    if (stored === "en" || stored === "si" || stored === "ta") return stored;
    const nav = (window.navigator.language || "en").toLowerCase();
    if (nav.startsWith("si")) return "si";
    if (nav.startsWith("ta")) return "ta";
  } catch {}
  return "en";
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [settling, setSettling] = useState(false);
  const [pageMeta, setPageMeta] = useState<PageMeta | null>(null);
  const settleTimer = useRef<number | null>(null);

  useEffect(() => {
    const next = detectInitialLang();
    if (next !== "en") {
      setSettling(true);
      setLangState(next);
      settleTimer.current = window.setTimeout(() => setSettling(false), 120);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dataset.lang = lang;
    }
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    if (settleTimer.current !== null) window.clearTimeout(settleTimer.current);
    setSettling(true);
    setLangState(l);
    try {
      window.localStorage.setItem("mydiio.lang", l);
      const url = new URL(window.location.href);
      url.searchParams.set("lang", l);
      window.history.replaceState({}, "", url.toString());
    } catch {}
    settleTimer.current = window.setTimeout(() => setSettling(false), 120);
  }, []);

  const t = useCallback(
    (k: keyof typeof dict) => {
      const entry = dict[k];
      if (!entry) {
        if (typeof console !== "undefined") console.warn(`[i18n] missing key: ${String(k)}`);
        return String(k);
      }
      return entry[lang] || entry.en;
    },
    [lang],
  );

  const tt = useCallback(
    (namespacedKey: string) => tPublic(namespacedKey, lang as PublicLang),
    [lang],
  );

  const value = useMemo(
    () => ({ lang, setLang, t, tt, setPageMeta }),
    [lang, setLang, t, tt],
  );

  return (
    <I18nContext.Provider value={value}>
      <div className="i18n-root" data-lang-settling={settling ? "true" : "false"}>
        {children}
      </div>
      <MetaSync lang={lang} meta={pageMeta} />
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    return {
      lang: "en" as Lang,
      setLang: () => {},
      t: (k: string) => dict[k as keyof typeof dict]?.en ?? String(k),
      tt: (namespacedKey: string) => tPublic(namespacedKey, "en"),
      setPageMeta: () => {},
    };
  }
  return ctx;
}

/**
 * Register the page's translated title and description. Call inside the
 * component (not head()) — this drives reactive <head> updates on lang
 * change while the static head() output remains as SSR/crawler fallback.
 */
export function usePageMeta(meta: PageMeta) {
  const { setPageMeta } = useI18n();
  const key = `${meta.titleKey ?? ""}|${meta.descKey ?? ""}|${meta.title ?? ""}|${meta.description ?? ""}`;
  useEffect(() => {
    setPageMeta(meta);
    return () => setPageMeta(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
}

/**
 * Reactive <head> synchroniser. Updates document.title and the meta/og
 * tags whose content depends on the active language. Runs on every
 * lang or pageMeta change.
 */
function MetaSync({ lang, meta }: { lang: Lang; meta: PageMeta | null }) {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const resolve = (k?: keyof typeof dict, fallback?: string) => {
      if (!k) return fallback;
      const entry = dict[k];
      if (!entry) return fallback;
      return entry[lang] || entry.en;
    };
    const title = meta?.title ?? resolve(meta?.titleKey);
    const description = meta?.description ?? resolve(meta?.descKey);
    if (title) {
      document.title = title;
      setMeta("property", "og:title", title);
      setMeta("name", "twitter:title", title);
    }
    if (description) {
      setMeta("name", "description", description);
      setMeta("property", "og:description", description);
      setMeta("name", "twitter:description", description);
    }
  }, [lang, meta]);
  return null;
}

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/* -------- Switcher UI -------- */
export function LanguageSwitcher({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { lang, setLang, t } = useI18n();
  const ink = "#1A1A18";
  const accent = "#F5A623";
  const accentInk = "#3A2C10";
  const inkSoft = "#5B5347";
  const isDark = tone === "dark";
  return (
    <div
      role="group"
      aria-label={t("nav_lang_label")}
      className="language-switcher"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0,
        padding: 3,
        borderRadius: 9999,
        background: isDark ? "rgba(30,26,21,0.85)" : "transparent",
        border: `2px solid ${ink}`,
        boxShadow: "2px 2px 0 #1A1A18",
        height: 38,
      }}
    >
      {LANGS.map((l) => {
        const active = l.code === lang;
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => setLang(l.code)}
            aria-pressed={active}
            lang={l.htmlLang}
            style={{
              padding: "5px 12px",
              borderRadius: 9999,
              border: "none",
              cursor: "pointer",
              fontFamily:
                l.code === "si"
                  ? "'Noto Sans Sinhala', 'Space Grotesk', sans-serif"
                  : l.code === "ta"
                    ? "'Noto Sans Tamil', 'Space Grotesk', sans-serif"
                    : "'Space Mono', monospace",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: "0.06em",
              lineHeight: 1,
              height: 28,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              background: active ? accent : "transparent",
              color: active ? accentInk : isDark ? "rgba(244,239,227,0.85)" : inkSoft,
              transition: "background 0.18s ease, color 0.18s ease",
            }}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}
