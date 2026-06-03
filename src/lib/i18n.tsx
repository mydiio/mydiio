import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

export type Lang = "en" | "si" | "ta";
export const LANGS: { code: Lang; label: string; native: string; htmlLang: string }[] = [
  { code: "en", label: "EN", native: "English", htmlLang: "en" },
  { code: "si", label: "සිං", native: "සිංහල", htmlLang: "si" },
  { code: "ta", label: "தமிழ்", native: "தமிழ்", htmlLang: "ta" },
];

type Dict = Record<string, { en: string; si: string; ta: string }>;

export const dict: Dict = {
  // --- Nav ---
  nav_home: { en: "Home", si: "මුල්", ta: "முகப்பு" },
  nav_advertisers: { en: "Advertisers", si: "දැන්වීම්", ta: "விளம்பரம்" },
  nav_drivers: { en: "Drivers", si: "රියදුරු", ta: "ஓட்டுநர்" },
  nav_investors: { en: "Investors", si: "ආයෝජන", ta: "முதலீடு" },
  nav_about: { en: "About", si: "අපි", ta: "எங்களை" },
  nav_contact: { en: "Contact", si: "අමතන්න", ta: "தொடர்பு" },
  cta_launch: { en: "Launch Campaign", si: "දැන්වීම අරඹන්න", ta: "விளம்பரம் தொடங்கு" },
  cta_launch_pilot: { en: "Launch a campaign →", si: "පයිලට් දැන්වීම අරඹන්න →", ta: "பைலட் விளம்பரம் தொடங்கு →" },
  cta_talk_founder: { en: "Become a driver →", si: "Founder සමඟ කතා කරන්න", ta: "Founder உடன் பேசுங்கள்" },

  // --- Hero ---
  hero_kicker: { en: "Sri Lanka · Mobility Media", si: "ශ්‍රී ලංකාව · ජංගම මාධ්‍ය", ta: "இலங்கை · இயக்க ஊடகம்" },
  hero_title: {
    en: "Sri Lanka's Urban Attention Network.",
    si: "ශ්‍රී ලංකාවේ නගර අවධාන ජාලය.",
    ta: "இலங்கையின் நகர கவன ஈர்ப்பு வலைப்பின்னல்.",
  },
  hero_sub: {
    en: "mydiio puts digital advertising screens inside tuk-tuks across Colombo. Every ride is an audience. Every driver earns more. Every impression is verified.",
    si: "අපි කොළඹ පුරා ත්‍රිරෝද රථ ජංගම මාධ්‍ය බවට පත් කරමු — සැබෑ ගමන් අතරතුර සැබෑ පාරිභෝගිකයන් වෙත සන්නාම ළඟා කරවමින්.",
    ta: "நாங்கள் கொழும்பு முழுவதும் டுக்-டுக்குகளை நகரும் ஊடகமாக மாற்றுகிறோம் — உண்மையான பயணங்களின்போது உண்மையான மக்களை அடைய பிராண்டுகளுக்கு உதவுகிறோம்.",
  },
  metric_vehicles: { en: "Vehicles ready", si: "සූදානම් වාහන", ta: "தயார் வாகனங்கள்" },
  metric_zones: { en: "Colombo zones", si: "කොළඹ කලාප", ta: "கொழும்பு மண்டலங்கள்" },
  metric_attention: { en: "Avg ride attention", si: "සාමාන්‍ය ගමන් අවධානය", ta: "சராசரி பயண கவனம்" },
  metric_launch: { en: "Campaign launch", si: "ව්‍යාපාර දියත් කිරීම", ta: "பிரச்சார தொடக்கம்" },
  metric_min: { en: "min", si: "මිනි", ta: "நிமி" },
  metric_hr: { en: "hrs", si: "පැය", ta: "மணி" },

  // --- Why It Works ---
  why_kicker: { en: "Why it works", si: "ඇයි මෙය ක්‍රියා කරන්නේ", ta: "இது ஏன் வேலை செய்கிறது" },
  why_title: {
    en: "Where digital ends, real attention begins.",
    si: "ඩිජිටල් අවසන් වන තැන සැබෑ අවධානය ආරම්භ වේ.",
    ta: "டிஜிட்டல் முடியும் இடத்தில், உண்மையான கவனம் தொடங்குகிறது.",
  },
  why_c1_t: { en: "Captive attention", si: "අල්ලාගත් අවධානය", ta: "பிடித்த கவனம்" },
  why_c1_b: { en: "Passengers sit facing the screen for the entire ride. No scroll button. No skip. No competition. Just your message, playing to a real person on a real journey.", si: "මගීන් සම්පූර්ණ ගමන පුරා ඔබේ තිරය දෙස බලා සිටිති.", ta: "பயணிகள் முழு பயணத்திலும் உங்கள் திரையை எதிர்நோக்குகிறார்கள்." },
  why_c2_t: { en: "Hyperlocal reach", si: "වීදී දෘශ්‍යතාව", ta: "தெரு தெரிவு" },
  why_c2_b: { en: "Choose exactly which neighbourhoods your ad runs in. From Fort to Nugegoda, Wellawatte to Maharagama — you pick the areas that matter to your business.", si: "දිනපතා දහස් ගණනක් පදිකයන් සහ රියදුරන් එක් එක් වාහනය දකියි.", ta: "ஒவ்வொரு நாளும் ஆயிரக்கணக்கான பாதசாரிகள் ஒவ்வொரு வாகனத்தையும் காண்கிறார்கள்." },
  why_c3_t: { en: "Verified every time", si: "අතිශය දේශීය ළඟාවීම", ta: "மிக உள்ளூர் அணுகல்" },
  why_c3_b: { en: "Every single ad play is logged with the time, the vehicle, and the GPS location. You receive a report every Monday showing exactly where your campaign ran.", si: "කලාපය, මාර්ගය සහ දිනයේ වේලාව අනුව ඉලක්ක කරන්න — අනුමානයෙන් නොවේ.", ta: "மண்டலம், வழி, நாளின் நேரம் வாரியாக இலக்கு — யூகம் அல்ல." },
  why_c4_t: { en: "Up in 72 hours", si: "වේගවත් දියත් කිරීම", ta: "வேகமான தொடக்கம்" },
  why_c4_b: { en: "Send us your video or image. We handle all the formatting and scheduling. Most campaigns go live across the fleet within 72 hours of approval.", si: "අනුමත නිර්මාණයක් දිනකින් ජාලය පුරා සජීවී වේ.", ta: "அங்கீகரிக்கப்பட்ட படைப்பு நாட்களில் வலைப்பின்னல் முழுவதும் நேரலையாகும்." },

  // --- How It Works ---
  how_kicker: { en: "How it works", si: "ක්‍රියා කරන ආකාරය", ta: "எவ்வாறு செயல்படுகிறது" },
  how_title: {
    en: "Simple for brands. Valuable for drivers.",
    si: "සන්නාම සඳහා සරලයි. රියදුරන්ට වටිනවා.",
    ta: "பிராண்டுகளுக்கு எளிதானது. ஓட்டுநர்களுக்கு மதிப்புமிக்கது.",
  },
  how_s1_t: { en: "Send us your creative", si: "ප්‍රදේශ තෝරන්න", ta: "பகுதிகளை தேர்வு செய்யுங்கள்" },
  how_s1_b: { en: "A 15 or 30-second video, or a static image. Don't have one yet? We'll produce your first ad for free as part of getting started.", si: "ඔබේ ප්‍රේක්ෂකයින්ට ගැලපෙන කොළඹ කලාප සහ මාර්ග තෝරන්න.", ta: "உங்கள் பார்வையாளர்களுக்கு ஏற்ற கொழும்பு மண்டலங்கள் மற்றும் வழிகளை தேர்ந்தெடுங்கள்." },
  how_s2_t: { en: "We go live overnight", si: "නිර්මාණය උඩුගත කරන්න", ta: "படைப்பை பதிவேற்றுங்கள்" },
  how_s2_b: { en: "Your ad loads to every active screen in your chosen zones across the fleet. GPS tracking starts the moment it goes live.", si: "ඔබේ වීඩියෝව හෝ ස්ථිර රූපය එවන්න. අපි තිර හැඩතල කිරීම සියල්ල කළමනාකරණය කරමු.", ta: "உங்கள் வீடியோ அல்லது படத்தை அனுப்புங்கள். திரை வடிவமைப்பை நாங்கள் முழுமையாக கையாள்கிறோம்." },
  how_s3_t: { en: "You get the proof", si: "ඉක්මනින් සජීවී වන්න", ta: "வேகமாக நேரலை செல்லுங்கள்" },
  how_s3_b: { en: "Every Monday, a verified report lands in your inbox. It shows every vehicle, every GPS location, every play. No estimates. Just facts.", si: "බොහෝ ව්‍යාපාර අනුමත වී පැය 72ක් ඇතුළත දියත් වේ.", ta: "பெரும்பாலான பிரச்சாரங்கள் ஒப்புதல் பெற்ற 72 மணி நேரத்திற்குள் தொடங்கும்." },

  // --- Tuk Interior ---
  tuk_kicker: { en: "Inside the ride", si: "ගමන තුළ", ta: "பயணத்தின் உள்ளே" },
  tuk_title: { en: "The screen they can't look away from.", si: "ඔවුන් ඉවත බලා ගත නොහැකි තිරය.", ta: "அவர்கள் கண்களை அகற்ற முடியாத திரை." },
  tuk_body: { en: "A bright display mounted at eye level — playing your message while the meter runs and the city rolls by.", si: "ඇස මට්ටමේ සවිකර ඇති දීප්තිමත් තිරයක් — මීටරය දුවන අතරතුර සහ නගරය ගමන් කරන විට ඔබේ පණිවිඩය ප්‍රදර්ශනය කරයි.", ta: "கண் மட்டத்தில் பொருத்தப்பட்ட பிரகாசமான திரை — மீட்டர் ஓடும்போதும் நகரம் செல்லும்போதும் உங்கள் செய்தியை காட்டுகிறது." },
  tuk_cta: { en: "See it in a pilot →", si: "පයිලට් එකකින් බලන්න →", ta: "பைலட்டில் பாருங்கள் →" },

  // --- Two Audiences ---
  ad_kicker: { en: "For advertisers", si: "ප්‍රචාරකයින් සඳහා", ta: "விளம்பரதாரர்களுக்கு" },
  ad_title: { en: "Turn Colombo traffic into customers.", si: "කොළඹ ගමනාගමනය පාරිභෝගිකයන් බවට පත් කරන්න.", ta: "கொழும்பு போக்குவரத்தை வாடிக்கையாளர்களாக மாற்றுங்கள்." },
  ad_body: { en: "From restaurants to banks to apps — businesses use mydiio to stay visible where buying decisions actually happen. Starting from LKR 25,000 a month, with your first 7 days completely free.", si: "අවන්හල් සිට බැංකු දක්වා — සන්නාම මිලදී ගැනීමේ තීරණ ගන්නා ස්ථානවල දෘශ්‍යමාන වීමට mydiio භාවිතා කරයි.", ta: "உணவகங்கள் முதல் வங்கிகள் வரை — வாங்கும் முடிவுகள் நடக்கும் இடத்தில் தெரியும்படி பிராண்டுகள் mydiio-ஐப் பயன்படுத்துகின்றன." },
  ad_cta: { en: "Get pricing →", si: "මිල ලබා ගන්න →", ta: "விலையை பெறுங்கள் →" },

  dr_kicker: { en: "For drivers", si: "රියදුරන් සඳහා", ta: "ஓட்டுநர்களுக்கு" },
  dr_title: { en: "Earn more from every ride.", si: "සෑම ගමනකින්ම වැඩි ආදායමක්.", ta: "ஒவ்வொரு பயணத்திலும் அதிக சம்பாதியுங்கள்." },
  dr_body: { en: "Join the network and unlock extra monthly income — without changing your routes. We install a screen in your tuk. You just drive. We pay you on the 5th of every month.", si: "ජාලයට එක්වී අමතර මාසික ආදායමක් ලබා ගන්න — ඔබේ මාර්ග වෙනස් නොකර.", ta: "வலைப்பின்னலில் சேர்ந்து கூடுதல் மாத வருமானத்தைப் பெறுங்கள் — உங்கள் வழிகளை மாற்றாமல்." },
  dr_cta: { en: "Join the driver network →", si: "රියදුරු ජාලයට එක්වන්න →", ta: "ஓட்டுநர் வலைப்பின்னலில் சேருங்கள் →" },

  // --- Reporting ---
  rep_kicker: { en: "Reporting", si: "වාර්තාකරණය", ta: "அறிக்கையிடல்" },
  rep_title: { en: "Measured, not guessed.", si: "මනින ලද, අනුමාන කරන ලද නොවේ.", ta: "அளவிடப்பட்டது, யூகிக்கப்பட்டதல்ல." },
  rep_body: { en: "Track active vehicles, zone coverage, campaign uptime, and verified impressions — updated in real time. Every advertiser gets full dashboard access the moment their campaign goes live.", si: "ක්‍රියාකාරී වාහන, මාර්ග ආවරණය, ව්‍යාපාර ක්‍රියාත්මක කාලය සහ අනුමාන හැඟීම් අනුගමනය කරන්න — GPS මගින් තහවුරු කර තත්‍ය කාලීනව යාවත්කාලීන කරයි.", ta: "செயலில் உள்ள வாகனங்கள், வழி கவரேஜ், பிரச்சார இயங்கு நேரம் மற்றும் மதிப்பிடப்பட்ட பதிவுகளை கண்காணிக்கவும் — GPS மூலம் சரிபார்க்கப்பட்டு நிகழ்நேரத்தில் புதுப்பிக்கப்படுகிறது." },

  // --- Why Now ---
  whyn_kicker: { en: "Why now", si: "දැන් ඇයි", ta: "ஏன் இப்போது" },
  whyn_title: { en: "A massive channel hiding in plain sight.", si: "පැහැදිලිව පෙනෙන තැන සැඟවී ඇති විශාල නාලිකාවක්.", ta: "வெளிப்படையாக மறைந்திருக்கும் ஒரு பெரிய சேனல்." },
  whyn_body: { en: "Thousands of tuk-tuks move through Colombo every day. Until now, none of them were built as media. mydiio is the first platform to change that.", si: "දහස් ගණන් ත්‍රිරෝද දිනපතා කොළඹ පුරා ගමන් කරයි. මෙතෙක්, කිසිවක් මාධ්‍ය යටිතල පහසුකම් ලෙස ගොඩනගා නොතිබුණි.", ta: "ஆயிரக்கணக்கான டுக்-டுக்குகள் தினமும் கொழும்பு வழியாக நகர்கின்றன. இதுவரை, எதுவும் ஊடக உள்கட்டமைப்பாக கட்டப்படவில்லை." },

  // --- Scale Story ---
  scale_kicker: { en: "Scale story", si: "වර්ධන කතාව", ta: "வளர்ச்சி கதை" },
  scale_title: { en: "Colombo first. Every city next.", si: "මුලින්ම කොළඹ. ඊළඟට සෑම නගරයක්ම.", ta: "முதலில் கொழும்பு. அடுத்து ஒவ்வொரு நகரமும்." },
  scale_c1_t: { en: "More vehicles = more reach", si: "වැඩි වාහන = වැඩි ඉන්වෙන්ටරිය", ta: "அதிக வாகனங்கள் = அதிக சரக்கு" },
  scale_c1_b: { en: "Every tuk-tuk that joins the network adds advertising slots and city coverage.", si: "එකතු කරන සෑම වාහනයක්ම දැන්වීම් අවස්ථා සහ නගර ආවරණය පුළුල් කරයි.", ta: "சேர்க்கப்படும் ஒவ்வொரு வாகனமும் விளம்பர இடங்கள் மற்றும் நகர கவரேஜை விரிவுபடுத்துகிறது." },
  scale_c2_t: { en: "More routes = better data", si: "වැඩි මාර්ග = වඩා හොඳ ළඟාවීම", ta: "அதிக வழிகள் = சிறந்த அணுகல்" },
  scale_c2_b: { en: "As the fleet grows, route density improves — meaning better zone coverage for advertisers.", si: "රියදුරන් නව කලාප පුරවන විට ඝනත්වය වැඩි වේ.", ta: "ஓட்டுநர்கள் புதிய மண்டலங்களை நிரப்பும்போது அடர்த்தி கூடுகிறது." },
  scale_c3_t: { en: "More advertisers = stronger network", si: "වැඩි ප්‍රචාරකයින් = ශක්තිමත් ජාලයක්", ta: "அதிக விளம்பரதாரர்கள் = வலுவான வலைப்பின்னல்" },
  scale_c3_b: { en: "Recurring campaigns build predictable revenue that funds fleet expansion.", si: "පුනරාවර්තන ව්‍යාපාර පුරෝකථනය කළ හැකි ආදායම ගොඩනඟයි.", ta: "தொடர்ச்சியான பிரச்சாரங்கள் கணிக்கக்கூடிய வருவாயை உருவாக்குகின்றன." },
  scale_c4_t: { en: "More data = smarter campaigns", si: "වැඩි දත්ත = දක්ෂ ව්‍යාපාර", ta: "அதிக தரவு = புத்திசாலி பிரச்சாரங்கள்" },
  scale_c4_b: { en: "Route and impression data grows more valuable over time — improving results for every advertiser.", si: "මාර්ග + රැඳී සිටීමේ දත්ත සෑම අනාගත මිලදී ගැනීමක්ම තියුණු කරයි.", ta: "வழி + தங்கும் தரவு ஒவ்வொரு எதிர்கால வாங்குதலையும் கூர்மைப்படுத்துகிறது." },

  // --- Founding Offer ---
  fo_kicker: { en: "Founding offer · 10 spots", si: "ආරම්භක දීමනාව · ස්ථාන 10", ta: "நிறுவன சலுகை · 10 இடங்கள்" },
  fo_title: { en: "First 10 brands get founding access.", si: "පළමු සන්නාම 10ට ආරම්භක ප්‍රවේශය ලැබේ.", ta: "முதல் 10 பிராண்டுகள் நிறுவன அணுகலைப் பெறுகின்றன." },
  fo_body: { en: "We're opening a limited number of pilot campaigns for our first advertisers. Founding partners get priority placement, a locked-in rate, and full dashboard access from day one.", si: "අපගේ පළමු ප්‍රචාරකයින් සඳහා සීමිත පරීක්ෂණ ව්‍යාපාර අපි විවෘත කරන්නෙමු.", ta: "எங்கள் முதல் விளம்பரதாரர்களுக்கு வரம்புக்குட்பட்ட முன்னோடி பிரச்சாரங்களை திறக்கிறோம்." },
  fo_b1: { en: "Priority placements across the fleet", si: "ප්‍රමුඛතා ස්ථානගත කිරීම්", ta: "முன்னுரிமை இடங்கள்" },
  fo_b2: { en: "Rate locked in for the life of your contract", si: "දියත් කිරීමේ වට්ටම්", ta: "தொடக்க தள்ளுபடி" },
  fo_b3: { en: "First 7 days completely free", si: "සතිපතා වාර්තා", ta: "வாராந்திர அறிக்கை" },
  fo_b4: { en: "Free ad creative production to get you started", si: "අවස්ථා අධ්‍යයන සහාය", ta: "வழக்கு ஆய்வு ஆதரவு" },
  fo_cta: { en: "Claim a pilot slot →", si: "පරීක්ෂණ ස්ථානය ලබාගන්න →", ta: "முன்னோடி இடத்தை பெறுங்கள் →" },

  // --- FAQ ---
  faq_kicker: { en: "Questions", si: "ප්‍රශ්න", ta: "கேள்விகள்" },
  faq_title: { en: "Frequently asked.", si: "නිතර අසන ප්‍රශ්න.", ta: "அடிக்கடி கேட்கப்படுபவை." },
  faq_q1: { en: "How many tuk-tuks are live?", si: "කොපමණ ත්‍රිරෝද රථ සක්‍රීයද?", ta: "எத்தனை டுக்-டுக்குகள் இயங்குகின்றன?" },
  faq_a1: { en: "We are launching our pilot fleet of 10 tuk-tuks across Colombo — covering Fort, Nugegoda, Wellawatte, Pettah, and Maharagama. The fleet grows as more drivers join the network.", si: "කොළඹ පුරා 50+ සමඟ ආරම්භ වේ. රියදුරන් එක්වන විට සෑම සතියකම නව වාහන එකතු වේ.", ta: "கொழும்பு முழுவதும் 50+ உடன் தொடங்குகிறது. ஓட்டுநர்கள் சேரும்போது வாரந்தோறும் புதிய வாகனங்கள் சேர்க்கப்படுகின்றன." },
  faq_q2: { en: "How do advertisers measure results?", si: "ප්‍රචාරකයින් ප්‍රතිඵල මනින්නේ කෙසේද?", ta: "விளம்பரதாரர்கள் முடிவுகளை எப்படி அளவிடுகிறார்கள்?" },
  faq_a2: { en: "Every Monday you receive a verified report showing which vehicles ran your ad, where they were, what time it played, and how many times. The data comes directly from the GPS and play logs on each device.", si: "GPS-තහවුරු කළ හැඟීම්, සක්‍රීය වාහන, කලාප සහ ක්‍රියාත්මක කාලය සහිත සජීවී උපකරණ පුවරුව.", ta: "GPS-சரிபார்க்கப்பட்ட பதிவுகள், செயலில் உள்ள வாகனங்கள், மண்டலங்கள் மற்றும் இயங்கு நேரத்துடன் நேரலை டாஷ்போர்டு." },
  faq_q3: { en: "How quickly can campaigns launch?", si: "ව්‍යාපාර කොතරම් ඉක්මනින් දියත් කළ හැකිද?", ta: "பிரச்சாரங்கள் எவ்வளவு விரைவாக தொடங்க முடியும்?" },
  faq_a3: { en: "Once your creative is approved, most campaigns go live across the fleet within 72 hours. If you need help making a creative, we can produce a simple 15-second ad for you as part of getting started.", si: "බොහෝමයක් නිර්මාණ අනුමැතියෙන් පැය 72ක් ඇතුළත සජීවී වේ. මුද්‍රණයක් හෝ ස්ථාපන ප්‍රමාදයක් නැත.", ta: "பெரும்பாலானவை படைப்பு ஒப்புதலின் 72 மணி நேரத்திற்குள் நேரலையாகும். அச்சிடல் இல்லை, நிறுவல் தாமதம் இல்லை." },
  faq_q4: { en: "What cities are next?", si: "ඊළඟට කුමන නගරද?", ta: "அடுத்து என்ன நகரங்கள்?" },
  faq_a4: { en: "We start in Colombo. Kandy and Galle are targeted for Year 2. Negombo, Jaffna, and other major cities follow in Year 3. The network is built to expand.", si: "මුලින්ම කොළඹ. නිවාස ජාලය සංතෘප්ත වූ පසු මහනුවර, ගාල්ල සහ මීගමුව අනුගමනය කරයි.", ta: "முதலில் கொழும்பு. வீட்டு வலைப்பின்னல் நிறைவடைந்தவுடன் கண்டி, காலி மற்றும் நீர்கொழும்பு தொடரும்." },
  faq_q5: { en: "How do drivers get paid?", si: "රියදුරන්ට ගෙවන්නේ කෙසේද?", ta: "ஓட்டுநர்களுக்கு எப்படி பணம் செலுத்தப்படுகிறது?" },
  faq_a5: { en: "On the 5th of every calendar month, by bank transfer. Base pay is LKR 6,000 unconditionally every month. Drivers who keep their screen active for an average of 8 or more hours per day earn an additional LKR 2,000 route bonus.", si: "ජංගම මුදල් පසුම්බිය හෝ බැංකු මාරුව හරහා මාසිකව — ව්‍යාපාර ආදායමේ කොටසක්.", ta: "மொபைல் வாலட் அல்லது வங்கி பரிமாற்றம் மூலம் மாதந்தோறும் — பிரச்சார வருவாயின் பங்கு." },

  // --- Final CTA ---
  fcta_kicker: { en: "Get started", si: "ආරම්භ කරන්න", ta: "தொடங்குங்கள்" },
  fcta_title: { en: "Ready to own Colombo's streets?", si: "කොළඹ වීදි අයිති කර ගැනීමට සූදානම්ද?", ta: "கொழும்பு தெருக்களை சொந்தமாக்க தயாரா?" },

  // --- Footer ---
  ft_tagline: { en: "Sri Lanka's Urban Attention Network", si: "ශ්‍රී ලංකාවේ නගර අවධාන ජාලය", ta: "இலங்கையின் நகர கவன ஈர்ப்பு வலைப்பின்னல்" },
  ft_l1: { en: "Advertiser bookings open", si: "ප්‍රචාරක වෙන්කරවා ගැනීම් විවෘතයි", ta: "விளம்பரதாரர் முன்பதிவுகள் திறக்கப்பட்டுள்ளன" },
  ft_l2: { en: "Investor conversations welcome", si: "ආයෝජක සංවාද සාදරයෙන් පිළිගනිමු", ta: "முதலீட்டாளர் உரையாடல்கள் வரவேற்கப்படுகின்றன" },
  ft_l3: { en: "Based in Colombo, Sri Lanka", si: "කොළඹ, ශ්‍රී ලංකාවේ පිහිටා ඇත", ta: "கொழும்பு, இலங்கையில் அமைந்துள்ளது" },
  ft_explore: { en: "Explore", si: "ගවේෂණය", ta: "ஆராய்க" },
  ft_legal: { en: "Legal", si: "නෛතික", ta: "சட்ட" },
  ft_built: { en: "Built in Colombo, for Colombo.", si: "කොළඹ සඳහා, කොළඹ තුළ ගොඩනගා ඇත.", ta: "கொழும்பிற்காக, கொழும்பில் கட்டப்பட்டது." },
  ft_avail: { en: "Available in English · Sinhala · Tamil", si: "ඉංග්‍රීසි · සිංහල · දෙමළ භාෂාවලින් ලබාගත හැක", ta: "ஆங்கிலம் · சிங்களம் · தமிழில் கிடைக்கிறது" },

  // --- About ---
  about_kicker: { en: "About mydiio", si: "mydiio ගැන", ta: "mydiio பற்றி" },
  about_title: { en: "Built in Sri Lanka, for Sri Lanka.", si: "ශ්‍රී ලංකාව සඳහා, ශ්‍රී ලංකාවේ ගොඩනගා ඇත.", ta: "இலங்கைக்காக, இலங்கையில் கட்டப்பட்டது." },
  about_p1: { en: "mydiio was created to unlock one of the country's most overlooked assets: commuter attention.", si: "mydiio නිර්මාණය කරන ලද්දේ රටේ බොහෝ දුරට නොසලකා හරින ලද වත්කමක් වන මගී අවධානය විවෘත කිරීමටයි.", ta: "mydiio உருவாக்கப்பட்டது நாட்டின் மிகவும் கவனிக்கப்படாத சொத்துக்களில் ஒன்றை திறக்க: பயணிகளின் கவனம்." },
  about_p2: { en: "We combine local execution with scalable technology — turning Colombo's tuk-tuks into the country's first true mobility media network.", si: "අපි දේශීය ක්‍රියාත්මක කිරීම පරිමාණය කළ හැකි තාක්ෂණය සමඟ ඒකාබද්ධ කරමු — කොළඹේ ත්‍රිරෝද රථ රටේ පළමු සැබෑ ජංගම මාධ්‍ය ජාලය බවට පත් කරමින්.", ta: "உள்ளூர் செயல்படுத்தலை அளவிடக்கூடிய தொழில்நுட்பத்துடன் இணைக்கிறோம் — கொழும்பு டுக்-டுக்குகளை நாட்டின் முதல் உண்மையான இயக்க ஊடக வலைப்பின்னலாக மாற்றுகிறோம்." },
  about_for_inv: { en: "For Investors →", si: "ආයෝජකයින් සඳහා →", ta: "முதலீட்டாளர்களுக்கு →" },

  // --- Contact ---
  contact_kicker: { en: "Contact", si: "සම්බන්ධතා", ta: "தொடர்பு" },
  contact_title: { en: "Let's talk.", si: "අපි කතා කරමු.", ta: "பேசுவோம்." },
  contact_sub: { en: "Campaign bookings, investor questions, driver signups — start here.", si: "ව්‍යාපාර වෙන්කරවා ගැනීම්, ආයෝජක ප්‍රශ්න, රියදුරු ලියාපදිංචිය — මෙතැනින් අරඹන්න.", ta: "பிரச்சார முன்பதிவு, முதலீட்டாளர் கேள்விகள், ஓட்டுநர் பதிவு — இங்கே தொடங்குங்கள்." },
  contact_intent_book: { en: "Book Campaign", si: "ව්‍යාපාර වෙන්කරවා ගන්න", ta: "பிரச்சாரம் முன்பதிவு" },
  contact_intent_inv: { en: "Investor Inquiry", si: "ආයෝජක විමසුම", ta: "முதலீட்டாளர் விசாரணை" },
  contact_intent_dr: { en: "Driver Signup", si: "රියදුරු ලියාපදිංචිය", ta: "ஓட்டுநர் பதிவு" },
  contact_name: { en: "Name", si: "නම", ta: "பெயர்" },
  contact_company: { en: "Company", si: "සමාගම", ta: "நிறுவனம்" },
  contact_email: { en: "Email", si: "විද්‍යුත් තැපෑල", ta: "மின்னஞ்சல்" },
  contact_message: { en: "Message", si: "පණිවිඩය", ta: "செய்தி" },
  contact_send: { en: "Send Message →", si: "පණිවිඩය යවන්න →", ta: "செய்தியை அனுப்பு →" },
  contact_wa: { en: "WhatsApp the team", si: "කණ්ඩායමට WhatsApp කරන්න", ta: "குழுவிற்கு WhatsApp" },
  contact_opening: { en: "Opening your email client…", si: "ඔබේ විද්‍යුත් තැපැල් සේවාදායකය විවෘත කරමින්…", ta: "உங்கள் மின்னஞ்சல் கிளையண்டைத் திறக்கிறது…" },

  // --- Investors ---
  inv_kicker: { en: "For investors", si: "ආයෝජකයින් සඳහා", ta: "முதலீட்டாளர்களுக்கு" },
  inv_title: { en: "Building Sri Lanka's First Mobility Media Network.", si: "ශ්‍රී ලංකාවේ පළමු ජංගම මාධ්‍ය ජාලය ගොඩනැගීම.", ta: "இலங்கையின் முதல் இயக்க ஊடக வலைப்பின்னலை உருவாக்குதல்." },
  inv_sub: { en: "Recurring revenue. Asset-light. Regional potential.", si: "පුනරාවර්තන ආදායම. වත්කම්-සැහැල්ලු. ප්‍රාදේශීය විභවය.", ta: "தொடர் வருவாய். சொத்து-இலகுவான. பிராந்திய ஆற்றல்." },
  inv_request_deck: { en: "Request investor deck", si: "ආයෝජක ඩෙක් ඉල්ලන්න", ta: "முதலீட்டாளர் டெக் கோரிக்கை" },
};

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: keyof typeof dict) => string;
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

  const t = useCallback((k: keyof typeof dict) => {
    const entry = dict[k];
    if (!entry) return String(k);
    return entry[lang] || entry.en;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <I18nContext.Provider value={value}><div className="i18n-root" data-lang-settling={settling ? "true" : "false"}>{children}</div></I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    return { lang: "en" as Lang, setLang: () => {}, t: (k: string) => (dict[k as keyof typeof dict]?.en ?? String(k)) };
  }
  return ctx;
}

/* -------- Switcher UI -------- */
export function LanguageSwitcher({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { lang, setLang } = useI18n();
  const ink = "#1E1A15";
  const accent = "#F4A62A";
  const accentInk = "#3A2C10";
  const inkSoft = "#5B5347";
  const isDark = tone === "dark";
  return (
    <div
      role="group"
      aria-label="Language"
      className="language-switcher"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0,
        padding: 3,
        borderRadius: 9999,
        background: isDark ? "rgba(30,26,21,0.85)" : "transparent",
        border: `2px solid ${ink}`,
        boxShadow: "2px 2px 0 #1E1A15",
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

