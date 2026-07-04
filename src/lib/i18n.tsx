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
  cta_launch_pilot: tr({ en: "Launch a campaign →", si: "ප්‍රචාරණයක් ආරම්භ කරන්න →", ta: "பிரச்சாரத்தைத் தொடங்குங்கள் →" }),
  cta_talk_founder: tr({ en: "Become a driver →", si: "රියදුරෙකු වන්න →", ta: "ஓட்டுநராக மாறுங்கள் →" }),

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
    "Every Journey, Connected.",
  ),
  hero_sub: en(
    "mydiio is Sri Lanka's first connected passenger information network. Built into the tuk-tuks people ride every day, it brings weather, local news, safety tools, and useful information to every passenger, and gives small businesses a way to reach them.",
  ),
  hero_live_badge: tr({ en: "Founding fleet · launching now", si: "ආරම්භක රථ පිරිස · දැන් දියත් වෙමින්", ta: "நிறுவனர் வாகனத் தொகுதி · இப்போது துவங்குகிறது" }),

  // ============================================================
  // HOME · STATS STRIP
  // ============================================================
  stats_pilot_vehicles: tr({ en: "Pilot Vehicles", si: "නියමු රථ", ta: "முன்னோடி வாகனங்கள்" }),
  stats_avg_ride: tr({ en: "Avg Ride", si: "සාමාන්‍ය ගමන", ta: "சராசரி பயணம்" }),
  stats_campaign: tr({ en: "Campaign", si: "ප්‍රචාරණය", ta: "பிரச்சாரம்" }),
  stats_pioneer_spots: tr({ en: "Pioneer Spots", si: "පුරෝගාමී ස්ථාන", ta: "பயனியர் இடங்கள்" }),
  stats_min: tr({ en: "min", si: "මිනි.", ta: "நிமி." }),
  stats_hrs: tr({ en: "hrs", si: "පැය", ta: "மணி" }),

  // Legacy metric keys still consumed by some components
  metric_vehicles: tr({ en: "Pilot vehicles", si: "පයිලට් වාහන", ta: "பைலட் வாகனங்கள்" }),
  metric_attention: tr({ en: "Campaign launch", si: "ව්‍යාපාර දියත් කිරීම", ta: "பிரச்சார தொடக்கம்" }),
  metric_launch: tr({ en: "Pioneer spots", si: "පුරෝගාමී ස්ථාන", ta: "முன்னோடி இடங்கள்" }),
  metric_min: tr({ en: "min", si: "මිනි", ta: "நிமி" }),
  metric_hr: tr({ en: "hrs", si: "පැය", ta: "மணி" }),

  // ============================================================
  // HOME · MARQUEE
  // ============================================================
  mq_gps: tr({ en: "GPS VERIFIED", si: "GPS සනාථයි", ta: "GPS உறுதிசெய்யப்பட்டது" }),
  mq_real: tr({ en: "REAL IMPRESSIONS", si: "සැබෑ දර්ශන", ta: "உண்மையான காட்சிகள்" }),
  mq_every: en("EVERY JOURNEY, CONNECTED"),
  mq_320k: tr({ en: "320,000 TUKS IN COLOMBO", si: "කොළඹ ත්‍රී රෝද රථ 320,000", ta: "கொழும்பில் 320,000 மூன்று சக்கர வாகனங்கள்" }),
  mq_trans: tr({ en: "RADICAL TRANSPARENCY", si: "පූර්ණ විනිවිදභාවය", ta: "முழுமையான வெளிப்படைத்தன்மை" }),
  mq_dignity: tr({ en: "DRIVER DIGNITY", si: "රියදුරුගේ ගෞරවය", ta: "ஓட்டுநர் மரியாதை" }),
  mq_paid: tr({ en: "PAID ON THE 5TH", si: "5 වන දින ගෙවීම", ta: "5ஆம் தேதி கட்டணம்" }),

  // ============================================================
  // HOME · WHY IT WORKS
  // ============================================================
  why_kicker: { en: "mydiio", si: "mydiio", ta: "mydiio" },
  why_title: tr({ en: "Turn travel time into advertising time", si: "ගමන් කාලය දැන්වීම් කාලයක් බවට පත් කරන්න", ta: "பயண நேரத்தை விளம்பர நேரமாக மாற்றுங்கள்" }),
  why_c1_t: tr({ en: "Advertising people actually see.", si: "මිනිසුන් සැබවින්ම දකින දැන්වීම්.", ta: "மக்கள் உண்மையில் பார்க்கும் விளம்பரம்." }),
  why_c1_b: tr({
    en: "Unlike social media ads that are skipped in seconds, mydiio places your message directly in front of engaged passengers during their daily journeys. No scroll button. No skip.",
    si: "තත්පර කිහිපයකින් මඟ හරින සමාජ මාධ්‍ය දැන්වීම් මෙන් නොව, mydiio ඔබේ පණිවිඩය දෛනික ගමන්වලදී අවධානයෙන් සිටින මගීන් ඉදිරියෙන්ම තබනවා. ස්ක්‍රෝල් බොත්තමක් නෑ. මඟ හැරීමක් නෑ.",
    ta: "வினாடிகளில் தவிர்க்கப்படும் சமூக ஊடக விளம்பரங்களைப் போலல்லாமல், mydiio உங்கள் செய்தியை தினசரி பயணங்களில் கவனத்துடன் இருக்கும் பயணிகளுக்கு நேரடியாக முன்வைக்கிறது. ஸ்க்ரோல் பொத்தான் இல்லை. தவிர்க்க முடியாது.",
  }),
  why_c2_t: tr({ en: "Verified campaign reporting.", si: "සනාථ කළ ප්‍රචාරණ වාර්තාකරණය.", ta: "உறுதிசெய்யப்பட்ட பிரச்சார அறிக்கையிடல்." }),
  why_c2_b: tr({
    en: "Every ad play is automatically logged with location and time data. Advertisers receive regular reports showing where their campaign was displayed, how often it was played, and which areas of the city it reached.",
    si: "සෑම දැන්වීම් ධාවනයක්ම ස්ථානය සහ වේලා දත්ත සමඟ ස්වයංක්‍රීයව වාර්තා වේ. දැන්වීම්කරුවන්ට ඔවුන්ගේ ප්‍රචාරණය පෙන්වූ ස්ථානය, කී වතාවක් ධාවනය වූවාද, සහ නගරයේ කුමන ප්‍රදේශවලට ළඟා වූවාද යන්න පෙන්වන නිතිපතා වාර්තා ලැබේ.",
    ta: "ஒவ்வொரு விளம்பர ஓட்டமும் இடம் மற்றும் நேர தரவுடன் தானாகவே பதிவு செய்யப்படுகிறது. விளம்பரதாரர்களுக்கு அவர்களின் பிரச்சாரம் எங்கு காட்டப்பட்டது, எத்தனை முறை ஓடியது, நகரத்தின் எந்தப் பகுதிகளை சென்றடைந்தது என்பதைக் காட்டும் வழக்கமான அறிக்கைகள் கிடைக்கும்.",
  }),
  why_c3_t: tr({ en: "Transparent Performance.", si: "විනිවිද පෙනෙන කාර්යසාධනය.", ta: "வெளிப்படையான செயல்திறன்." }),
  why_c3_b: tr({
    en: "Know exactly where your advertising budget is being spent. Our reporting provides clear visibility of campaign delivery across the mydiio network.",
    si: "ඔබේ දැන්වීම් අයවැය වියදම් වන්නේ කොහෙද කියලා හරියටම දැනගන්න. අපගේ වාර්තාකරණය mydiio ජාලය පුරා ප්‍රචාරණ බෙදාහැරීම පිළිබඳ පැහැදිලි දෘශ්‍යතාවක් සපයනවා.",
    ta: "உங்கள் விளம்பர பட்ஜெட் எங்கு செலவிடப்படுகிறது என்பதை சரியாக அறியுங்கள். எங்கள் அறிக்கையிடல் mydiio வலையமைப்பு முழுவதும் பிரச்சார விநியோகத்தின் தெளிவான காட்சிப்படுத்தலை வழங்குகிறது.",
  }),
  why_c4_t: tr({ en: "Quick campaign launch.", si: "ඉක්මන් ප්‍රචාරණ දියත් කිරීම.", ta: "விரைவான பிரச்சார துவக்கம்." }),
  why_c4_b: tr({
    en: "From approval to launch, most mydiio campaigns are live within 72 hours, helping businesses get in front of customers faster.",
    si: "අනුමැතියේ සිට දියත් කිරීම දක්වා, බොහෝ mydiio ප්‍රචාරණ පැය 72ක් ඇතුළත සජීවී වේ, ව්‍යාපාරවලට ගනුදෙනුකරුවන් ඉදිරියට වේගවත්ව යාමට උදව් වේ.",
    ta: "ஒப்புதலிலிருந்து துவக்கம் வரை, பெரும்பாலான mydiio பிரச்சாரங்கள் 72 மணி நேரத்திற்குள் நேரலைக்கு வரும், வணிகங்கள் வேகமாக வாடிக்கையாளர்களை சென்றடைய உதவும்.",
  }),

  // ============================================================
  // HOME · HOW IT WORKS
  // ============================================================
  how_kicker: tr({ en: "HOW IT WORKS", si: "එය ක්‍රියා කරන ආකාරය", ta: "இது எப்படி வேலை செய்கிறது" }),
  how_title: tr({ en: "Simple. Fast. Verified.", si: "සරලයි. වේගවත්. සනාථයි.", ta: "எளிது. வேகமானது. உறுதிசெய்யப்பட்டது." }),
  how_s1_t: tr({ en: "Submit your ad.", si: "ඔබේ දැන්වීම එවන්න.", ta: "உங்கள் விளம்பரத்தை சமர்ப்பியுங்கள்." }),
  how_s1_b: tr({
    en: "Send us your 15 or 30-second video or image. Don't have creative ready? Our team can help you get started.",
    si: "තත්පර 15ක් හෝ 30ක් ඔබේ වීඩියෝව හෝ රූපය අපට එවන්න. නිර්මාණයක් සූදානම් නැද්ද? අපගේ කණ්ඩායමට ඔබට ආරම්භ කිරීමට උදව් කළ හැක.",
    ta: "15 அல்லது 30 வினாடி உங்கள் வீடியோ அல்லது படத்தை எங்களுக்கு அனுப்புங்கள். உருவாக்கம் தயாராக இல்லையா? எங்கள் குழு உங்களை தொடங்க உதவும்.",
  }),
  how_s2_t: tr({ en: "Go live in as little as 72 hours.", si: "පැය 72ක් තරම් ඉක්මනින් සජීවී වන්න.", ta: "72 மணி நேரத்திற்குள் நேரலைக்கு வாருங்கள்." }),
  how_s2_b: tr({
    en: "Once approved, your campaign can be live across the mydiio network in as little as 72 hours.",
    si: "අනුමත වූ පසු, ඔබේ ප්‍රචාරණය පැය 72ක් තරම් ඉක්මනින් mydiio ජාලය පුරා සජීවී විය හැක.",
    ta: "ஒப்புதல் அளிக்கப்பட்டதும், உங்கள் பிரச்சாரம் 72 மணி நேரத்திற்குள் mydiio வலையமைப்பு முழுவதும் நேரலைக்கு வரலாம்.",
  }),
  how_s3_t: tr({ en: "You get the proof.", si: "ඔබට සාක්ෂිය ලැබෙනවා.", ta: "உங்களுக்கு ஆதாரம் கிடைக்கும்." }),
  how_s3_b: tr({
    en: "Every ad play is logged and verified. Receive regular reports showing campaign activity, locations reached and delivery performance.",
    si: "සෑම දැන්වීම් ධාවනයක්ම වාර්තා කර සනාථ කෙරේ. ප්‍රචාරණ ක්‍රියාකාරකම්, ළඟා වූ ස්ථාන, සහ බෙදාහැරීමේ කාර්යසාධනය පෙන්වන නිතිපතා වාර්තා ලබාගන්න.",
    ta: "ஒவ்வொரு விளம்பர ஓட்டமும் பதிவு செய்யப்பட்டு உறுதிசெய்யப்படுகிறது. பிரச்சார செயல்பாடு, சென்றடைந்த இடங்கள் மற்றும் விநியோக செயல்திறனைக் காட்டும் வழக்கமான அறிக்கைகளைப் பெறுங்கள்.",
  }),

  // ============================================================
  // HOME · TUK INTERIOR
  // ============================================================
  tuk_kicker: tr({ en: "Inside the ride", si: "ගමන තුළ", ta: "பயணத்தின் உள்ளே" }),
  tuk_title: tr({
    en: "What's actually on the screen",
    si: "ඔවුන් ඉවත බලා ගත නොහැකි තිරය.",
    ta: "அவர்கள் கண்களை அகற்ற முடியாத திரை.",
  }),
  tuk_body: tr({
    en: "Before it is anything else, mydiio is a screen that works for the passenger. On every ride, the screen shows real time weather, local news, and community information. If something needs attention, an emergency alert can reach every screen in the network at once. Passengers travelling alone can share their trip live with someone they trust, tracked by GPS from the moment the ride starts. Advertising appears too. It shares the same screen as everything else, because that is what funds the network. But the screen was not built to sell space. It was built to be useful first.",
    si: "සෑම mydiio තිරයක්ම මගී ඇස් මට්ටමින් සවි කර ඇත, ගමන පුරාම ඔබේ පණිවිඩය ලබා දෙයි.\n\nත්‍රී රෝද රථ සෑම දිනකම මිලියන ගණනක් ජනතාව ශ්‍රී ලංකාව පුරා ගමන් කරවනවා, නමුත් ඒවා තුළ ඩිජිටල් දැන්වීම් තවමත් සැබවින්ම භාවිතා කර නෑ.\n\nmydiio ත්‍රී රෝද රථ තුළ සවි කරන, දැන්වීම් මගින් පවත්වාගෙන යන, මිනිසුන් වෙනුවෙන් නිර්මාණය කළ, ව්‍යාපාරවලට ගනුදෙනුකරුවන් වෙත ළඟා වීමට උදව් කරන අතරම රියදුරන්ට නව ආදායම් අවස්ථා නිර්මාණය කරන, ශ්‍රී ලංකාවේ පළමු සම්බන්ධිත මගී තොරතුරු ජාලය mydiio ගොඩනගමින් සිටිනවා.\n\nනගරය සමඟ ගමන් කරන දැන්වීම්.",
    ta: "ஒவ்வொரு mydiio திரையும் பயணி கண் மட்டத்தில் பொருத்தப்பட்டுள்ளது, பயணம் முழுவதும் உங்கள் செய்தியை வழங்குகிறது.\n\nமூன்று சக்கர வாகனங்கள் ஒவ்வொரு நாளும் இலங்கை முழுவதும் மில்லியன் கணக்கான மக்களை நகர்த்துகின்றன, ஆனாலும் அவற்றுக்குள் டிஜிட்டல் விளம்பரம் இன்னும் கிட்டத்தட்ட பயன்படுத்தப்படவில்லை.\n\nமூன்று சக்கர வாகனங்களுக்குள் பொருத்தப்பட்ட, விளம்பரங்களால் இயங்கும், மக்களுக்காக உருவாக்கப்பட்ட, வணிகங்கள் வாடிக்கையாளர்களை சென்றடைய உதவும் அதே வேளையில் ஓட்டுநர்களுக்கு புதிய வருமான வாய்ப்புகளை உருவாக்கும், இலங்கையின் முதல் இணைக்கப்பட்ட பயணிகள் தகவல் வலையமைப்பை mydiio கட்டியெழுப்புகிறது.\n\nநகரத்துடன் நகரும் விளம்பரம்.",
  }),
  tuk_cta: tr({ en: "See it in a pilot →", si: "පයිලට් එකකින් බලන්න →", ta: "பைலட்டில் பாருங்கள் →" }),
  tuk_live_campaign: tr({ en: "LIVE CAMPAIGN", si: "සජීවී ප්‍රචාරණය", ta: "நேரலை பிரச்சாரம்" }),

  // ============================================================
  // HOME · INFRASTRUCTURE
  // ============================================================
  infra_title: en("The network underneath"),
  infra_body: en(
    "Every mydiio screen sits on infrastructure most passengers never think about. GPS tracking, live data, a driver programme, and a backend built for uptime, because a screen that fails is a promise broken to both the passenger and the driver. This layer is the foundation. It costs the most to build and pays back the slowest. Every vehicle added to the network is an investment in that foundation, not a sale.",
  ),

  // ============================================================
  // HOME · COVERAGE
  // ============================================================
  cov_kicker: tr({ en: "COVERAGE", si: "ප්‍රවේශය", ta: "அடையாளம்" }),
  cov_title: tr({ en: "Your campaign, across Colombo.", si: "ඔබේ ප්‍රචාරණය, කොළඹ පුරා.", ta: "உங்கள் பிரச்சாரம், கொழும்பு முழுவதும்." }),
  cov_body: tr({
    en: "Reach passengers in the neighbourhoods where your customers already are. Explore where the fleet operates every day.",
    si: "ඔබේ ගනුදෙනුකරුවන් දැනටමත් සිටින ප්‍රදේශවල මගීන් වෙත ළඟා වන්න. රථ පිරිස සෑම දිනකම ක්‍රියාත්මක වන ස්ථාන ගවේෂණය කරන්න.",
    ta: "உங்கள் வாடிக்கையாளர்கள் ஏற்கனவே இருக்கும் பகுதிகளில் பயணிகளை சென்றடையுங்கள். தொகுதி ஒவ்வொரு நாளும் இயங்கும் இடங்களை ஆராயுங்கள்.",
  }),
  cov_areas_label: tr({ en: "COVERAGE AREAS", si: "ප්‍රවේශ ප්‍රදේශ", ta: "அடையாள பகுதிகள்" }),
  cov_areas_value: tr({ en: "10 areas", si: "ප්‍රදේශ 10", ta: "10 பகுதிகள்" }),
  cov_launching_label: tr({ en: "LAUNCHING Q3 2026", si: "3 වන කාර්තුව 2026 දියත් වේ", ta: "Q3 2026 துவக்கம்" }),
  cov_colombo_wide: tr({ en: "Colombo-wide reach", si: "කොළඹ පුරා ප්‍රවේශය", ta: "கொழும்பு முழுவதும் அடையாளம்" }),
  cov_tuks_value: tr({ en: "50+ tuks", si: "ත්‍රී රෝද රථ 50කට වඩා", ta: "50+ மூன்று சக்கர வாகனங்கள்" }),
  cov_fleet_expands: tr({ en: "Fleet expands at launch", si: "දියත් කිරීමේදී රථ පිරිස පුළුල් වේ", ta: "துவக்கத்தில் வாகனத் தொகுதி விரிவடையும்" }),
  cov_map_heading: tr({ en: "10 coverage areas across Greater Colombo", si: "මහ කොළඹ පුරා ප්‍රවේශ ප්‍රදේශ 10ක්", ta: "பெரும் கொழும்பு முழுவதும் 10 அடையாள பகுதிகள்" }),
  cov_map_explore: tr({ en: "Explore the map to see where the fleet operates, how dense the coverage is, and what kind of audiences your ad will reach.", si: "රථ පිරිස ක්‍රියාත්මක වන ස්ථාන, ප්‍රවේශයේ ඝනත්වය සහ ඔබේ දැන්වීම ළඟා වන ප්‍රේක්ෂක වර්ග බැලීමට සිතියම ගවේෂණය කරන්න.", ta: "தொகுதி இயங்கும் இடங்கள், அடையாள அடர்த்தி, மற்றும் உங்கள் விளம்பரம் சென்றடையும் பார்வையாளர்களின் வகை ஆகியவற்றைக் காண வரைபடத்தை ஆராயுங்கள்." }),


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
  scale_kicker: tr({ en: "THE ROAD AHEAD", si: "ඉදිරි මාර්ගය", ta: "முன்னோக்கிய பாதை" }),
  scale_title: tr({
    en: "Colombo first. Every city next.",
    si: "මුලින්ම කොළඹ. ඊළඟට සෑම නගරයක්ම.",
    ta: "முதலில் கொழும்பு. அடுத்து ஒவ்வொரு நகரமும்.",
  }),
  scale_c1_t: tr({ en: "More screens.", si: "වැඩි තිර.", ta: "மேலும் திரைகள்." }),
  scale_c1_b: tr({ en: "As the network grows, your campaigns can reach more passengers across more areas.", si: "ජාලය වර්ධනය වන විට, ඔබේ ප්‍රචාරණවලට වැඩි ප්‍රදේශ පුරා වැඩි මගීන් වෙත ළඟා විය හැක.", ta: "வலையமைப்பு வளரும்போது, உங்கள் பிரச்சாரங்கள் அதிக பகுதிகளில் அதிக பயணிகளை சென்றடையலாம்." }),
  scale_c2_t: tr({ en: "More locations.", si: "වැඩි ස්ථාන.", ta: "மேலும் இடங்கள்." }),
  scale_c2_b: tr({ en: "Expand into new areas and connect with audiences wherever they travel.", si: "නව ප්‍රදේශවලට පුළුල් වී, ප්‍රේක්ෂකයන් ගමන් කරන ඕනෑම තැනක ඔවුන් සමඟ සම්බන්ධ වන්න.", ta: "புதிய பகுதிகளுக்கு விரிவடைந்து, பார்வையாளர்கள் பயணிக்கும் இடமெல்லாம் அவர்களுடன் இணையுங்கள்." }),
  scale_c3_t: tr({ en: "More insights.", si: "වැඩි තීක්ෂණතා.", ta: "மேலும் நுண்ணறிவுகள்." }),
  scale_c3_b: tr({ en: "Smarter campaigns backed by real data.", si: "සැබෑ දත්ත මගින් සහාය දක්වන බුද්ධිමත් ප්‍රචාරණ.", ta: "உண்மையான தரவால் ஆதரிக்கப்படும் புத்திசாலித்தனமான பிரச்சாரங்கள்." }),
  scale_c4_t: tr({ en: "More growth.", si: "වැඩි වර්ධනය.", ta: "மேலும் வளர்ச்சி." }),
  scale_c4_b: tr({ en: "More value for businesses, drivers and passengers.", si: "ව්‍යාපාර, රියදුරන් සහ මගීන් සඳහා වැඩි වටිනාකමක්.", ta: "வணிகங்கள், ஓட்டுநர்கள் மற்றும் பயணிகளுக்கு அதிக மதிப்பு." }),

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

/**
 * Maps legacy dict keys → namespaced keys in public-site-translations.ts.
 * When a legacy key has an alias here, t() returns the Phase-1 translation
 * (real Sinhala/Tamil) instead of the placeholder in `dict`.
 */
const LEGACY_ALIAS: Record<string, string> = {
  // Nav
  nav_home: "nav.home",
  nav_advertisers: "nav.advertise",
  nav_drivers: "nav.drive",
  nav_investors: "nav.investors",
  nav_about: "nav.about",
  nav_contact: "nav.contact",
  // Hero / home
  hero_title: "home.hero.subheadline",
  hero_sub: "home.hero.subheadline",
  ann_pilot: "home.hero.pioneerBanner",
  mq_every: "home.marquee",
  // Value props
  ad_kicker: "home.valueProps.forAdvertisers.title",
  ad_body: "home.valueProps.forAdvertisers.body",
  dr_kicker: "home.valueProps.forDrivers.title",
  dr_body: "home.valueProps.forDrivers.body",
  // FAQ
  faq_q4: "home.faq.expansionCities.question",
  faq_a4: "home.faq.expansionCities.answer",
  // Footer / tagline
  ft_tagline: "global.tagline",
  ft_description: "footer.description",
  // Scale / About
  about_title: "about.hero.headline",
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
      // Prefer real translations from public-site-translations.ts when a
      // matching Phase-1 key exists for this legacy dict key.
      const alias = LEGACY_ALIAS[k as string];
      if (alias) {
        const v = tPublic(alias, lang as PublicLang);
        if (v && v !== alias) return v;
      }
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
  // Hide switcher on legal pages (Terms/Privacy remain English-only).
  if (typeof window !== "undefined") {
    const p = window.location.pathname;
    if (p.startsWith("/privacy") || p.startsWith("/terms")) return null;
  }
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
