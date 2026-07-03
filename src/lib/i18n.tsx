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
 hero_kicker: { en: "mydiio", si: "mydiio", ta: "mydiio" },
 hero_title: {
 en: "The digital advertising network inside Sri Lanka's tuk-tuks",
 si: "The digital advertising network inside Sri Lanka's tuk-tuks",
 ta: "The digital advertising network inside Sri Lanka's tuk-tuks",
 },
 hero_sub: {
 en: "mydiio connects businesses with engaged passengers through digital advertising screens inside Colombo's tuk-tuks. Verified impressions, affordable campaigns, measured results.",
 si: "mydiio connects businesses with engaged passengers through digital advertising screens inside Colombo's tuk-tuks. Verified impressions, affordable campaigns, measured results.",
 ta: "mydiio connects businesses with engaged passengers through digital advertising screens inside Colombo's tuk-tuks. Verified impressions, affordable campaigns, measured results.",
 },
 metric_vehicles: { en: "Pilot vehicles", si: "පයිලට් වාහන", ta: "பைலட் வாகனங்கள்" },
 
 metric_attention: { en: "Campaign launch", si: "ව්‍යාපාර දියත් කිරීම", ta: "பிரச்சார தொடக்கம்" },
 metric_launch: { en: "Pioneer spots", si: "පුරෝගාමී ස්ථාන", ta: "முன்னோடி இடங்கள்" },
 metric_min: { en: "min", si: "මිනි", ta: "நிமி" },
 metric_hr: { en: "hrs", si: "පැය", ta: "மணி" },

 // --- Why It Works ---
 why_kicker: { en: "mydiio", si: "mydiio", ta: "mydiio" },
 why_title: {
 en: "Turn travel time into advertising time",
 si: "Turn travel time into advertising time",
 ta: "Turn travel time into advertising time",
 },
 why_c1_t: { en: "Advertising people actually see.", si: "Advertising people actually see.", ta: "Advertising people actually see." },
 why_c1_b: { en: "Unlike social media ads that are skipped in seconds, mydiio places your message directly in front of engaged passengers during their daily journeys. No scroll button. No skip.", si: "Unlike social media ads that are skipped in seconds, mydiio places your message directly in front of engaged passengers during their daily journeys. No scroll button. No skip.", ta: "Unlike social media ads that are skipped in seconds, mydiio places your message directly in front of engaged passengers during their daily journeys. No scroll button. No skip." },
 why_c2_t: { en: "Verified campaign reporting.", si: "Verified campaign reporting.", ta: "Verified campaign reporting." },
 why_c2_b: { en: "Every ad play is automatically logged with location and time data. Advertisers receive regular reports showing where their campaign was displayed, how often it was played, and which areas of the city it reached.", si: "Every ad play is automatically logged with location and time data. Advertisers receive regular reports showing where their campaign was displayed, how often it was played, and which areas of the city it reached.", ta: "Every ad play is automatically logged with location and time data. Advertisers receive regular reports showing where their campaign was displayed, how often it was played, and which areas of the city it reached." },
 why_c3_t: { en: "Transparent Performance.", si: "Transparent Performance.", ta: "Transparent Performance." },
 why_c3_b: { en: "Know exactly where your advertising budget is being spent. Our reporting provides clear visibility of campaign delivery across the mydiio network.", si: "Know exactly where your advertising budget is being spent. Our reporting provides clear visibility of campaign delivery across the mydiio network.", ta: "Know exactly where your advertising budget is being spent. Our reporting provides clear visibility of campaign delivery across the mydiio network." },
 why_c4_t: { en: "Quick campaign launch.", si: "Quick campaign launch.", ta: "Quick campaign launch." },
 why_c4_b: { en: "From approval to launch, most mydiio campaigns are live within 72 hours, helping businesses get in front of customers faster.", si: "From approval to launch, most mydiio campaigns are live within 72 hours, helping businesses get in front of customers faster.", ta: "From approval to launch, most mydiio campaigns are live within 72 hours, helping businesses get in front of customers faster." },

 // --- How It Works ---
 how_kicker: { en: "how it works", si: "how it works", ta: "how it works" },
 how_title: {
 en: "Simple. Fast. Verified.",
 si: "Simple. Fast. Verified.",
 ta: "Simple. Fast. Verified.",
 },
 how_s1_t: { en: "Submit your ad.", si: "Submit your ad.", ta: "Submit your ad." },
 how_s1_b: { en: "Send us your 15 or 30-second video or image. Don't have creative ready? Our team can help you get started.", si: "Send us your 15 or 30-second video or image. Don't have creative ready? Our team can help you get started.", ta: "Send us your 15 or 30-second video or image. Don't have creative ready? Our team can help you get started." },
 how_s2_t: { en: "Go live in as little as 72 hours.", si: "Go live in as little as 72 hours.", ta: "Go live in as little as 72 hours." },
 how_s2_b: { en: "Once approved, your campaign can be live across the mydiio network in as little as 72 hours.", si: "Once approved, your campaign can be live across the mydiio network in as little as 72 hours.", ta: "Once approved, your campaign can be live across the mydiio network in as little as 72 hours." },
 how_s3_t: { en: "You get the proof.", si: "You get the proof.", ta: "You get the proof." },
 how_s3_b: { en: "Every ad play is logged and verified. Receive regular reports showing campaign activity, locations reached and delivery performance.", si: "Every ad play is logged and verified. Receive regular reports showing campaign activity, locations reached and delivery performance.", ta: "Every ad play is logged and verified. Receive regular reports showing campaign activity, locations reached and delivery performance." },

 // --- Tuk Interior ---
 tuk_kicker: { en: "Inside the ride", si: "ගමන තුළ", ta: "பயணத்தின் உள்ளே" },
 tuk_title: { en: "The screen they can't look away from.", si: "ඔවුන් ඉවත බලා ගත නොහැකි තිරය.", ta: "அவர்கள் கண்களை அகற்ற முடியாத திரை." },
 tuk_body: {
 en: "Every mydiio screen is mounted at passenger eye level, delivering your message throughout the journey.\n\ntuk-tuks move millions of people around Sri Lanka every day, yet digital advertising inside them remains virtually untapped.\n\nmydiio is building Sri Lanka's first tuk-tuk media network, helping businesses reach customers while creating new earning opportunities for drivers.\n\nAdvertising that moves with the city.",
 si: "Every mydiio screen is mounted at passenger eye level, delivering your message throughout the journey.\n\ntuk-tuks move millions of people around Sri Lanka every day, yet digital advertising inside them remains virtually untapped.\n\nmydiio is building Sri Lanka's first tuk-tuk media network, helping businesses reach customers while creating new earning opportunities for drivers.\n\nAdvertising that moves with the city.",
 ta: "Every mydiio screen is mounted at passenger eye level, delivering your message throughout the journey.\n\ntuk-tuks move millions of people around Sri Lanka every day, yet digital advertising inside them remains virtually untapped.\n\nmydiio is building Sri Lanka's first tuk-tuk media network, helping businesses reach customers while creating new earning opportunities for drivers.\n\nAdvertising that moves with the city.",
 },
 tuk_cta: { en: "See it in a pilot →", si: "පයිලට් එකකින් බලන්න →", ta: "பைலட்டில் பாருங்கள் →" },

 // --- Two Audiences ---
 ad_kicker: { en: "For advertisers", si: "ප්‍රචාරකයින් සඳහා", ta: "விளம்பரதாரர்களுக்கு" },
 ad_title: { en: "Turn Colombo traffic into customers.", si: "කොළඹ ගමනාගමනය පාරිභෝගිකයන් බවට පත් කරන්න.", ta: "கொழும்பு போக்குவரத்தை வாடிக்கையாளர்களாக மாற்றுங்கள்." },
 ad_body: { en: "From restaurants to banks to apps, businesses use mydiio to stay visible where buying decisions actually happen. Starting from LKR 25,000 a month, with your first 7 days completely free.", si: "අවන්හල් සිට බැංකු දක්වා, සන්නාම මිලදී ගැනීමේ තීරණ ගන්නා ස්ථානවල දෘශ්‍යමාන වීමට mydiio භාවිතා කරයි.", ta: "உணவகங்கள் முதல் வங்கிகள் வரை, வாங்கும் முடிவுகள் நடக்கும் இடத்தில் தெரியும்படி பிராண்டுகள் mydiio-ஐப் பயன்படுத்துகின்றன." },
 ad_cta: { en: "Get pricing →", si: "මිල ලබා ගන්න →", ta: "விலையை பெறுங்கள் →" },

 dr_kicker: { en: "For drivers", si: "රියදුරන් සඳහා", ta: "ஓட்டுநர்களுக்கு" },
 dr_title: { en: "Earn more from every ride.", si: "සෑම ගමනකින්ම වැඩි ආදායමක්.", ta: "ஒவ்வொரு பயணத்திலும் அதிக சம்பாதியுங்கள்." },
 dr_body: { en: "Join the network and unlock extra monthly income, without changing your routes. We install a screen in your tuk. You just drive. We pay you on the 5th of every month.", si: "ජාලයට එක්වී අමතර මාසික ආදායමක් ලබා ගන්න, ඔබේ මාර්ග වෙනස් නොකර.", ta: "வலைப்பின்னலில் சேர்ந்து கூடுதல் மாத வருமானத்தைப் பெறுங்கள், உங்கள் வழிகளை மாற்றாமல்." },
 dr_cta: { en: "Join the driver network →", si: "රියදුරු ජාලයට එක්වන්න →", ta: "ஓட்டுநர் வலைப்பின்னலில் சேருங்கள் →" },

 // --- Reporting ---
 rep_kicker: { en: "Reporting", si: "වාර්තාකරණය", ta: "அறிக்கையிடல்" },
 rep_title: { en: "Measured, not guessed.", si: "මනින ලද, අනුමාන කරන ලද නොවේ.", ta: "அளவிடப்பட்டது, யூகிக்கப்பட்டதல்ல." },
 rep_body: { en: "Track active vehicles, fleet coverage, campaign uptime, and verified impressions, updated in real time. Every advertiser gets full dashboard access the moment their campaign goes live.", si: "ක්‍රියාකාරී වාහන, රථ පෙළ ආවරණය, ව්‍යාපාර ක්‍රියාත්මක කාලය සහ තහවුරු කරන ලද හැඟීම් අනුගමනය කරන්න, තත්ත්‍ය කාලීනව යාවත්කාලීන වේ. GPS මගින් තහවුරු කර ඇත.", ta: "செயலில் உள்ள வாகனங்கள், வாகனப் படை ஆவரணம், பிரச்சார இயக்க நேரம் மற்றும் சரிபார்க்கப்பட்ட பதிவுகளைக் கண்காணிக்கவும், நிகழ்நேரத்தில் புதுப்பிக்கப்படுகிறது. GPS மூலம் சரிபார்க்கப்பட்டுள்ளது." },

 // --- Why Now ---
 whyn_kicker: { en: "Why now", si: "දැන් ඇයි", ta: "ஏன் இப்போது" },
 whyn_title: { en: "A massive channel hiding in plain sight.", si: "පැහැදිලිව පෙනෙන තැන සැඟවී ඇති විශාල නාලිකාවක්.", ta: "வெளிப்படையாக மறைந்திருக்கும் ஒரு பெரிய சேனல்." },
 whyn_body: { en: "1.1 million tuk-tuks operate across Sri Lanka. 320,000 in and around Colombo. Zero of them had screens until now. mydiio is the first platform to change that.", si: "ශ්‍රී ලංකාව පුරා මිලියන 1.1ක ත්‍රිරෝද රථ ක්‍රියාත්මක වේ. කොළඹ සහ අවට 320,000ක්. මෙතෙක්, ඔවුන්ගෙන් කිසිවකුට තිර තිබුණේ නැත.", ta: "இலங்கை முழுவதும் 1.1 மில்லியன் டுக்-டுக்குகள் இயங்குகின்றன. கொழும்பிலும் சுற்றியும் 320,000. இதுவரை, அவற்றில் எதற்கும் திரைகள் இல்லை." },

 // --- Scale Story ---
 scale_kicker: { en: "The Road Ahead", si: "The Road Ahead", ta: "The Road Ahead" },
 scale_title: { en: "Colombo first. Every city next.", si: "මුලින්ම කොළඹ. ඊළඟට සෑම නගරයක්ම.", ta: "முதலில் கொழும்பு. அடுத்து ஒவ்வொரு நகரமும்." },
 scale_c1_t: { en: "More screens.", si: "More screens.", ta: "More screens." },
 scale_c1_b: { en: "As the network grows, your campaigns can reach more passengers across more areas.", si: "As the network grows, your campaigns can reach more passengers across more areas.", ta: "As the network grows, your campaigns can reach more passengers across more areas." },
 scale_c2_t: { en: "More locations.", si: "More locations.", ta: "More locations." },
 scale_c2_b: { en: "Expand into new areas and connect with audiences wherever they travel.", si: "Expand into new areas and connect with audiences wherever they travel.", ta: "Expand into new areas and connect with audiences wherever they travel." },
 scale_c3_t: { en: "More insights.", si: "More insights.", ta: "More insights." },
 scale_c3_b: { en: "Smarter campaigns backed by real data.", si: "Smarter campaigns backed by real data.", ta: "Smarter campaigns backed by real data." },
 scale_c4_t: { en: "More growth.", si: "More growth.", ta: "More growth." },
 scale_c4_b: { en: "More value for businesses, drivers and passengers.", si: "More value for businesses, drivers and passengers.", ta: "More value for businesses, drivers and passengers." },

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
 faq_a1: { en: "We are launching our pilot fleet of 10 tuk-tuks across Colombo, covering Fort, Nugegoda, Wellawatte, Pettah, and Maharagama. The fleet grows as more drivers join the network.", si: "කොළඹ පුරා 50+ සමඟ ආරම්භ වේ. රියදුරන් එක්වන විට සෑම සතියකම නව වාහන එකතු වේ.", ta: "கொழும்பு முழுவதும் 50+ உடன் தொடங்குகிறது. ஓட்டுநர்கள் சேரும்போது வாரந்தோறும் புதிய வாகனங்கள் சேர்க்கப்படுகின்றன." },
 faq_q2: { en: "How do advertisers measure results?", si: "ප්‍රචාරකයින් ප්‍රතිඵල මනින්නේ කෙසේද?", ta: "விளம்பரதாரர்கள் முடிவுகளை எப்படி அளவிடுகிறார்கள்?" },
 faq_a2: { en: "Every Monday you receive a verified report showing which vehicles ran your ad, where they were, what time it played, and how many times. The data comes directly from the GPS and play logs on each device.", si: "GPS-තහවුරු කළ හැඟීම්, සක්‍රීය වාහන, කලාප සහ ක්‍රියාත්මක කාලය සහිත සජීවී උපකරණ පුවරුව.", ta: "GPS-சரிபார்க்கப்பட்ட பதிவுகள், செயலில் உள்ள வாகனங்கள், மண்டலங்கள் மற்றும் இயங்கு நேரத்துடன் நேரலை டாஷ்போர்டு." },
 faq_q3: { en: "How quickly can campaigns launch?", si: "ව්‍යාපාර කොතරම් ඉක්මනින් දියත් කළ හැකිද?", ta: "பிரச்சாரங்கள் எவ்வளவு விரைவாக தொடங்க முடியும்?" },
 faq_a3: { en: "Once your creative is approved, most campaigns go live across the fleet within 72 hours. If you need help making a creative, we can produce a simple 15-second ad for you as part of getting started.", si: "බොහෝමයක් නිර්මාණ අනුමැතියෙන් පැය 72ක් ඇතුළත සජීවී වේ. මුද්‍රණයක් හෝ ස්ථාපන ප්‍රමාදයක් නැත.", ta: "பெரும்பாலானவை படைப்பு ஒப்புதலின் 72 மணி நேரத்திற்குள் நேரலையாகும். அச்சிடல் இல்லை, நிறுவல் தாமதம் இல்லை." },
 faq_q4: { en: "What cities are next?", si: "ඊළඟට කුමන නගරද?", ta: "அடுத்து என்ன நகரங்கள்?" },
 faq_a4: { en: "We start in Colombo. Kandy, Galle, Jaffna, and Nuwara Eliya are the confirmed Year 2 to 3 national expansion targets. The network is built to expand.", si: "මුලින්ම කොළඹ. අවුරුදු 2 සිට 3 දක්වා මහනුවර, ගාල්ල, යාපනය සහ නුවරඑළිය තහවුරු කළ ජාතික විස්තරීය ඉලක්කයි. ජාලය දිගුවීමට නිර්මාණය කර ඇත.", ta: "முதலில் கொழும்பு. ஆண்டு 2 முதல் 3 வரை கண்டி, காலி, யாழ்ப்பாணம் மற்றும் நுவரெலியா உறுதிப்படுத்தப்பட்ட தேசிய விரிவாக்க இலக்குகள். வலைப்பின்னல் விரிவுபடுத்த வடிவமைக்கப்பட்டுள்ளது." },
 faq_q5: { en: "How do drivers get paid?", si: "රියදුරන්ට ගෙවන්නේ කෙසේද?", ta: "ஓட்டுநர்களுக்கு எப்படி பணம் செலுத்தப்படுகிறது?" },
 faq_a5: { en: "On the 5th of every calendar month, by bank transfer. Base pay is LKR 6,000 unconditionally every month. Drivers who keep their screen active for an average of 8 or more hours per day earn an additional LKR 2,000 route bonus.", si: "ජංගම මුදල් පසුම්බිය හෝ බැංකු මාරුව හරහා මාසිකව, ව්‍යාපාර ආදායමේ කොටසක්.", ta: "மொபைல் வாலட் அல்லது வங்கி பரிமாற்றம் மூலம் மாதந்தோறும், பிரச்சார வருவாயின் பங்கு." },

 // --- Final CTA ---
 fcta_kicker: { en: "Get started", si: "ආරම්භ කරන්න", ta: "தொடங்குங்கள்" },
 fcta_title: { en: "Ready to own Colombo's streets?", si: "කොළඹ වීදි අයිති කර ගැනීමට සූදානම්ද?", ta: "கொழும்பு தெருக்களை சொந்தமாக்க தயாரா?" },

 // --- Footer ---
 ft_tagline: { en: "Every Journey, Connected.", si: "සෑම ගමනම, සම්බන්ධයි.", ta: "ஒவ்வொரு பயணமும் இணைக்கப்பட்டது." },
 ft_description: { en: "Sri Lanka's connected passenger information network", si: "ශ්‍රී ලංකාවේ සම්බන්ධ මගී තොරතුරු ජාලය", ta: "இலங்கையின் இணைக்கப்பட்ட பயணிகள் தகவல் வலைப்பின்னல்" },
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
 about_p2: { en: "We combine local execution with scalable technology, turning Colombo's tuk-tuks into the country's first true mobility media network.", si: "අපි දේශීය ක්‍රියාත්මක කිරීම පරිමාණය කළ හැකි තාක්ෂණය සමඟ ඒකාබද්ධ කරමු, කොළඹේ ත්‍රිරෝද රථ රටේ පළමු සැබෑ ජංගම මාධ්‍ය ජාලය බවට පත් කරමින්.", ta: "உள்ளூர் செயல்படுத்தலை அளவிடக்கூடிய தொழில்நுட்பத்துடன் இணைக்கிறோம், கொழும்பு டுக்-டுக்குகளை நாட்டின் முதல் உண்மையான இயக்க ஊடக வலைப்பின்னலாக மாற்றுகிறோம்." },
 about_for_inv: { en: "For Investors →", si: "ආයෝජකයින් සඳහා →", ta: "முதலீட்டாளர்களுக்கு →" },

 // --- Contact ---
 contact_kicker: { en: "Contact", si: "සම්බන්ධතා", ta: "தொடர்பு" },
 contact_title: { en: "Let's talk.", si: "අපි කතා කරමු.", ta: "பேசுவோம்." },
 contact_sub: { en: "Campaign bookings, investor questions, driver signups, start here.", si: "ව්‍යාපාර වෙන්කරවා ගැනීම්, ආයෝජක ප්‍රශ්න, රියදුරු ලියාපදිංචිය, මෙතැනින් අරඹන්න.", ta: "பிரச்சார முன்பதிவு, முதலீட்டாளர் கேள்விகள், ஓட்டுநர் பதிவு, இங்கே தொடங்குங்கள்." },
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
 const ink = "#1A1A18";
 const accent = "#F5A623";
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

