// mydiio public website — translation seed file
// Languages: en (English), si (Sinhala), ta (Tamil)
// Register: natural spoken language, not literal/literary translation.
// Same voice in every language — human first, plain, warm, direct.
// Mirrors the key structure and pattern used in driver-translations.ts
//
// STATUS: Phase 1 — core/high-visibility strings only (nav, hero, taglines,
// pricing essentials, driver programme, CTAs, footer, core FAQ).
// Phase 2 will fill remaining secondary strings once Prompt 19 generates
// the complete English key list from the live site.
//
// IMPORTANT: Sinhala and Tamil content here should get a native speaker
// review pass before shipping, even though it targets natural spoken
// register rather than literal translation.

export const translations = {

  // ─────────────────────────────────────────────
  // GLOBAL / NAV / FOOTER
  // ─────────────────────────────────────────────
  nav: {
    home: {
      en: "Home",
      si: "මුල් පිටුව",
      ta: "முகப்பு",
    },
    advertise: {
      en: "Advertise",
      si: "දැන්වීම් කරන්න",
      ta: "விளம்பரம் செய்யுங்கள்",
    },
    drive: {
      en: "Drive with us",
      si: "අප සමඟ ධාවනය කරන්න",
      ta: "எங்களுடன் ஓட்டுங்கள்",
    },
    investors: {
      en: "Investors",
      si: "ආයෝජකයන්",
      ta: "முதலீட்டாளர்கள்",
    },
    about: {
      en: "About",
      si: "අප ගැන",
      ta: "எங்களைப் பற்றி",
    },
    contact: {
      en: "Contact",
      si: "සම්බන්ධ වන්න",
      ta: "தொடர்பு கொள்ள",
    },
  },

  global: {
    tagline: {
      en: "Every Journey, Connected.",
      si: "සෑම ගමනක්ම, සම්බන්ධයි.",
      ta: "ஒவ்வொரு பயணமும், இணைந்தது.",
    },
    coreDescriptor: {
      en: "Sri Lanka's first connected passenger information network, installed inside tuk-tuks, funded by advertising, built for people.",
      si: "ත්‍රී රෝද රථ තුළ සවි කරන ලද, දැන්වීම් මගින් පවත්වාගෙන යන, මිනිසුන් වෙනුවෙන් නිර්මාණය කළ, ශ්‍රී ලංකාවේ පළමු සම්බන්ධිත මගී තොරතුරු ජාලය මෙයයි.",
      ta: "மூன்று சக்கர வாகனங்களுக்குள் பொருத்தப்பட்ட, விளம்பரங்களால் இயங்கும், மக்களுக்காக உருவாக்கப்பட்ட, இலங்கையின் முதல் இணைக்கப்பட்ட பயணிகள் தகவல் வலையமைப்பு இதுவே.",
    },
  },

  footer: {
    description: {
      en: "Sri Lanka's connected passenger information network.",
      si: "ශ්‍රී ලංකාවේ සම්බන්ධිත මගී තොරතුරු ජාලය.",
      ta: "இலங்கையின் இணைக்கப்பட்ட பயணிகள் தகவல் வலையமைப்பு.",
    },
    contactUs: {
      en: "Get in touch",
      si: "අප හා සම්බන්ධ වන්න",
      ta: "எங்களைத் தொடர்பு கொள்ளுங்கள்",
    },
    allRightsReserved: {
      en: "All rights reserved.",
      si: "සියලුම හිමිකම් ඇවිරිණි.",
      ta: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    },
  },

  // ─────────────────────────────────────────────
  // HOMEPAGE
  // ─────────────────────────────────────────────
  home: {
    hero: {
      headline: {
        en: "Every Journey, Connected.",
        si: "සෑම ගමනක්ම, සම්බන්ධයි.",
        ta: "ஒவ்வொரு பயணமும், இணைந்தது.",
      },
      subheadline: {
        en: "Sri Lanka's first connected passenger information network, installed inside tuk-tuks, funded by advertising, built for people.",
        si: "ත්‍රී රෝද රථ තුළ සවි කරන ලද, දැන්වීම් මගින් පවත්වාගෙන යන, මිනිසුන් වෙනුවෙන් නිර්මාණය කළ, ශ්‍රී ලංකාවේ පළමු සම්බන්ධිත මගී තොරතුරු ජාලය මෙයයි.",
        ta: "மூன்று சக்கர வாகனங்களுக்குள் பொருத்தப்பட்ட, விளம்பரங்களால் இயங்கும், மக்களுக்காக உருவாக்கப்பட்ட, இலங்கையின் முதல் இணைக்கப்பட்ட பயணிகள் தகவல் வலையமைப்பு இதுவே.",
      },
      ctaAdvertise: {
        en: "Advertise with us",
        si: "අප සමඟ දැන්වීම් කරන්න",
        ta: "எங்களுடன் விளம்பரம் செய்யுங்கள்",
      },
      ctaDrive: {
        en: "Drive with us",
        si: "අප සමඟ ධාවනය කරන්න",
        ta: "எங்களுடன் ஓட்டுங்கள்",
      },
      pioneerBanner: {
        en: "Pilot launch open in Colombo — Pioneer spots available",
        si: "කොළඹ ආරම්භක වැඩසටහන දැන් විවෘතයි — පුරෝගාමී ස්ථාන තිබේ",
        ta: "கொழும்பில் முன்னோடி திட்டம் தொடங்கியுள்ளது — பயனியர் இடங்கள் உள்ளன",
      },
    },
    marquee: {
      en: "EVERY JOURNEY, CONNECTED",
      si: "සෑම ගමනක්ම, සම්බන්ධයි",
      ta: "ஒவ்வொரு பயணமும், இணைந்தது",
    },
    valueProps: {
      forAdvertisers: {
        title: {
          en: "For advertisers",
          si: "දැන්වීම්කරුවන් සඳහා",
          ta: "விளம்பரதாரர்களுக்கு",
        },
        body: {
          en: "Your ad, playing inside real tuk-tuks, in real neighbourhoods, verified by GPS. No black box, no estimated numbers.",
          si: "ඔබේ දැන්වීම, සැබෑ ත්‍රී රෝද රථ තුළ, සැබෑ ප්‍රදේශවල, GPS මගින් සනාථ කරන ලද ආකාරයට පෙන්වයි. සැඟවුණු දෙයක් නෑ, අනුමාන ගණන් නෑ.",
          ta: "உங்கள் விளம்பரம், உண்மையான மூன்று சக்கர வாகனங்களில், உண்மையான பகுதிகளில், GPS மூலம் உறுதிசெய்யப்பட்டு ஓடுகிறது. மறைவான எதுவும் இல்லை, மதிப்பீட்டு எண்கள் இல்லை.",
        },
      },
      forDrivers: {
        title: {
          en: "For drivers",
          si: "රියදුරන් සඳහා",
          ta: "ஓட்டுநர்களுக்கு",
        },
        body: {
          en: "A guaranteed monthly income on top of what you already earn. No cost to join, no hidden catch.",
          si: "ඔබ දැනටමත් උපයන දෙයට අමතරව සහතික කළ මාසික ආදායමක්. එකතු වීමට වියදමක් නෑ, සැඟවුණු කොන්දේසි නෑ.",
          ta: "நீங்கள் ஏற்கனவே சம்பாதிப்பதற்கு மேலதிகமாக உத்தரவாதமான மாத வருமானம். சேர கட்டணம் இல்லை, மறைமுக நிபந்தனைகள் இல்லை.",
        },
      },
      forPassengers: {
        title: {
          en: "For passengers",
          si: "මගීන් සඳහා",
          ta: "பயணிகளுக்கு",
        },
        body: {
          en: "Weather, news, and useful information on every ride, right in front of you.",
          si: "සෑම ගමනකදීම කාලගුණය, ප්‍රවෘත්ති, සහ ප්‍රයෝජනවත් තොරතුරු, ඔබ ඉදිරිපිටම.",
          ta: "ஒவ்வொரு பயணத்திலும் வானிலை, செய்திகள், பயனுள்ள தகவல்கள், உங்கள் முன்னே.",
        },
      },
    },
    faq: {
      expansionCities: {
        question: {
          en: "Where is mydiio expanding to next?",
          si: "mydiio මීළඟට කොහෙද පුළුල් වෙන්නේ?",
          ta: "mydiio அடுத்து எங்கு விரிவடையும்?",
        },
        answer: {
          en: "We start in Colombo. Kandy, Galle, Jaffna, and Nuwara Eliya are the confirmed targets for national expansion in Year 2 to 3.",
          si: "අපි ආරම්භ කරන්නේ කොළඹින්. 2 සහ 3 වැනි වසරවලදී ජාතික පුළුල් කිරීම සඳහා නිශ්චිත ඉලක්ක වන්නේ මහනුවර, ගාල්ල, යාපනය, සහ නුවරඑළිය.",
          ta: "நாங்கள் கொழும்பில் தொடங்குகிறோம். 2 மற்றும் 3 ஆம் ஆண்டுகளில் தேசிய விரிவாக்கத்திற்கான உறுதிப்படுத்தப்பட்ட இலக்குகள் கண்டி, காலி, யாழ்ப்பாணம், நுவரெலியா ஆகும்.",
        },
      },
    },
  },

  // ─────────────────────────────────────────────
  // ADVERTISE PAGE
  // ─────────────────────────────────────────────
  advertise: {
    hero: {
      headline: {
        en: "Advertise inside Colombo's tuk-tuks",
        si: "කොළඹ ත්‍රී රෝද රථ තුළ දැන්වීම් කරන්න",
        ta: "கொழும்பு மூன்று சக்கர வாகனங்களுக்குள் விளம்பரம் செய்யுங்கள்",
      },
      startingFrom: {
        en: "Starting from LKR 25,000 a month",
        si: "මසකට රුපියල් 25,000 සිට ආරම්භ වේ",
        ta: "மாதம் LKR 25,000 முதல் தொடங்குகிறது",
      },
    },
    pricing: {
      sectionTitle: {
        en: "Choose your package",
        si: "ඔබේ පැකේජය තෝරන්න",
        ta: "உங்கள் தொகுப்பைத் தேர்ந்தெடுங்கள்",
      },
      freeTrial: {
        en: "7-day free trial on every package. 3-month minimum term after the trial.",
        si: "සෑම පැකේජයකටම දින 7ක නොමිලේ අත්හදා බැලීමක්. අත්හදා බැලීමෙන් පසු අවම මාස 3ක කාලයක්.",
        ta: "ஒவ்வொரு தொகுப்பிலும் 7 நாள் இலவச சோதனை. சோதனைக்குப் பின் குறைந்தபட்சம் 3 மாத காலம்.",
      },
      pioneer: {
        title: {
          en: "Pioneer",
          si: "පුරෝගාමී",
          ta: "பயனியர்",
        },
        summary: {
          en: "Only ten spots, ever. Full fleet access, a fixed rate for life, and twelve months of exclusivity in your corridor.",
          si: "එකතුවක් ලෙස ස්ථාන දහයක් පමණයි, කවදාවත්. සම්පූර්ණ රථ පිරිසට ප්‍රවේශය, ජීවිත කාලයටම ස්ථාවර මිලක්, සහ ඔබේ කලාපයේ මාස දොළහක සුවිශේෂී අයිතියක්.",
          ta: "மொத்தமாக பத்து இடங்கள் மட்டுமே, என்றென்றும். முழு வாகனத் தொகுதிக்கும் அணுகல், வாழ்நாள் முழுவதும் நிலையான விலை, உங்கள் பகுதியில் பன்னிரண்டு மாத பிரத்யேக உரிமை.",
        },
      },
      roamer: {
        title: {
          en: "Roamer",
          si: "රෝමර්",
          ta: "ரோமர்",
        },
        summary: {
          en: "Up to five tuk-tuks. A simple way to get started.",
          si: "ත්‍රී රෝද රථ පහක් දක්වා. ආරම්භ කිරීමට සරල ක්‍රමයක්.",
          ta: "ஐந்து மூன்று சக்கர வாகனங்கள் வரை. தொடங்குவதற்கான எளிய வழி.",
        },
      },
      voyager: {
        title: {
          en: "Voyager",
          si: "වොයේජර්",
          ta: "வொயேஜர்",
        },
        summary: {
          en: "Up to fifteen tuk-tuks. More reach for a growing business.",
          si: "ත්‍රී රෝද රථ පහළොවක් දක්වා. වර්ධනය වන ව්‍යාපාරයක් සඳහා වැඩි ප්‍රවේශයක්.",
          ta: "பதினைந்து மூன்று சக்கர வாகனங்கள் வரை. வளரும் வணிகத்திற்கு அதிக அடையாளம்.",
        },
      },
      horizon: {
        title: {
          en: "Horizon",
          si: "හොරයිසන්",
          ta: "ஹொரைசன்",
        },
        summary: {
          en: "Fifteen to a hundred or more tuk-tuks. Built for large brands, terms discussed directly with us.",
          si: "ත්‍රී රෝද රථ පහළොවේ සිට සියයකට හෝ වැඩි ගණනක් දක්වා. විශාල වෙළඳ නාම සඳහා නිර්මාණය කර ඇත, කොන්දේසි අප සමඟ සෘජුව සාකච්ඡා කරයි.",
          ta: "பதினைந்து முதல் நூறு அல்லது அதற்கு மேற்பட்ட மூன்று சக்கர வாகனங்கள் வரை. பெரிய பிராண்டுகளுக்காக வடிவமைக்கப்பட்டது, விதிமுறைகள் எங்களுடன் நேரடியாக விவாதிக்கப்படும்.",
        },
      },
      pioneerExclusivityNote: {
        en: "Pioneer exclusivity lasts twelve months in a corridor fixed when you sign. Your rate stays fixed for as long as you renew.",
        si: "පුරෝගාමී සුවිශේෂී අයිතිය ඔබ අත්සන් කරන විට ස්ථාවර කරන ලද කලාපයක මාස දොළහක් පවතී. ඔබ අලුත් කරන තාක් ඔබේ මිල ස්ථාවරව පවතී.",
        ta: "பயனியர் பிரத்யேக உரிமை நீங்கள் கையொப்பமிடும்போது நிர்ணயிக்கப்படும் பகுதியில் பன்னிரண்டு மாதங்கள் நீடிக்கும். நீங்கள் புதுப்பிக்கும் வரை உங்கள் விலை நிலையாக இருக்கும்.",
      },
    },
    burst: {
      sectionTitle: {
        en: "Need a quick campaign?",
        si: "ඉක්මන් ප්‍රචාරණයක් අවශ්‍යද?",
        ta: "ஒரு விரைவான பிரச்சாரம் தேவையா?",
      },
      description: {
        en: "Burst packages fill gaps in the schedule for a short campaign. No exclusivity, just fast reach.",
        si: "බර්ස්ට් පැකේජ කෙටි ප්‍රචාරණයක් සඳහා කාලසටහනේ පරතරයන් පුරවයි. සුවිශේෂී අයිතියක් නෑ, වේගවත් ප්‍රවේශයක් පමණයි.",
        ta: "பர்ஸ்ட் தொகுப்புகள் ஒரு குறுகிய பிரச்சாரத்திற்கு அட்டவணையில் உள்ள இடைவெளிகளை நிரப்புகின்றன. பிரத்யேக உரிமை இல்லை, விரைவான அடையாளம் மட்டுமே.",
      },
    },
    cta: {
      apply: {
        en: "Apply now",
        si: "දැන් අයදුම් කරන්න",
        ta: "இப்போது விண்ணப்பிக்கவும்",
      },
      talkToUs: {
        en: "Talk to us",
        si: "අප සමඟ කතා කරන්න",
        ta: "எங்களுடன் பேசுங்கள்",
      },
    },
  },

  // ─────────────────────────────────────────────
  // DRIVE PAGE
  // ─────────────────────────────────────────────
  drive: {
    hero: {
      headline: {
        en: "Earn more from your tuk-tuk",
        si: "ඔබේ ත්‍රී රෝද රථයෙන් වැඩිපුර උපයන්න",
        ta: "உங்கள் மூன்று சக்கர வாகனத்திலிருந்து அதிகம் சம்பாதியுங்கள்",
      },
      subheadline: {
        en: "A guaranteed monthly payment, on top of your normal earnings, just for carrying the screen.",
        si: "තිරය රැගෙන යාම සඳහාම, ඔබේ සාමාන්‍ය ආදායමට අමතරව, සහතික කළ මාසික ගෙවීමක්.",
        ta: "திரையை சுமப்பதற்காக மட்டும், உங்கள் வழக்கமான வருமானத்திற்கு மேலதிகமாக, உத்தரவாதமான மாத கட்டணம்.",
      },
    },
    payment: {
      basePay: {
        en: "LKR 6,000 a month, guaranteed, no conditions.",
        si: "රුපියල් 6,000 මසකට, සහතික කළ, කිසිදු කොන්දේසියක් නැතිව.",
        ta: "மாதம் LKR 6,000, உத்தரவாதம், எந்த நிபந்தனையும் இல்லை.",
      },
      routeBonus: {
        en: "Plus LKR 2,000 more if your screen is active eight hours a day or more.",
        si: "ඔබේ තිරය දිනකට පැය අටක් හෝ වැඩි කාලයක් ක්‍රියාත්මක නම් තවත් රුපියල් 2,000ක්.",
        ta: "உங்கள் திரை நாளொன்றுக்கு எட்டு மணி நேரம் அல்லது அதற்கு மேல் இயங்கினால் மேலும் LKR 2,000.",
      },
      referralBonus: {
        en: "Plus LKR 1,500 for every driver you refer who joins and stays thirty days.",
        si: "ඔබ නිර්දේශ කරන සහ දින තිහක් රැඳී සිටින සෑම රියදුරෙකුටම තවත් රුපියල් 1,500ක්.",
        ta: "நீங்கள் பரிந்துரைத்து முப்பது நாட்கள் தங்கும் ஒவ்வொரு ஓட்டுநருக்கும் மேலும் LKR 1,500.",
      },
      maximum: {
        en: "Up to LKR 8,000 a month, paid on the 5th, every month, without exception.",
        si: "මසකට රුපියල් 8,000 දක්වා, සෑම මාසයකම 5 වන දින, කිසිදු ව්‍යතිරේකයක් නැතිව ගෙවනු ලැබේ.",
        ta: "மாதம் LKR 8,000 வரை, ஒவ்வொரு மாதமும் 5ஆம் தேதி, விதிவிலக்கு இன்றி செலுத்தப்படும்.",
      },
    },
    founding: {
      title: {
        en: "Founding driver spots",
        si: "ආරම්භක රියදුරු ස්ථාන",
        ta: "நிறுவன ஓட்டுநர் இடங்கள்",
      },
      description: {
        en: "Twenty founding driver spots only. Group A drivers receive the amber founding shirt, which cannot be bought at any price.",
        si: "ආරම්භක රියදුරු ස්ථාන විස්සක් පමණයි. A කණ්ඩායමේ රියදුරන් වෙනුවෙන් සෑම මිලකටවත් මිල දී ගත නොහැකි අම්බර් වර්ණ ආරම්භක කමිසය ලැබේ.",
        ta: "நிறுவன ஓட்டுநர் இடங்கள் இருபது மட்டுமே. குழு A ஓட்டுநர்களுக்கு எந்த விலைக்கும் வாங்க முடியாத அம்பர் நிற நிறுவன சட்டை வழங்கப்படும்.",
      },
    },
    deposit: {
      title: {
        en: "About your deposit",
        si: "ඔබේ තැන්පතුව ගැන",
        ta: "உங்கள் வைப்புத் தொகை பற்றி",
      },
      terms: {
        en: "LKR 5,000. Forfeited if you leave before six months. Half returned if you leave between six and twelve months. Fully returned after twelve months.",
        si: "රුපියල් 5,000. මාස හයකට පෙර ඉවත් වුවහොත් අහිමි වේ. මාස හය සහ දොළහ අතර ඉවත් වුවහොත් අඩක් ආපසු ලැබේ. මාස දොළහකට පසු සම්පූර්ණයෙන්ම ආපසු ලැබේ.",
        ta: "LKR 5,000. ஆறு மாதங்களுக்கு முன் விட்டுச் சென்றால் இழக்கப்படும். ஆறு மற்றும் பன்னிரண்டு மாதங்களுக்கு இடையில் விட்டுச் சென்றால் பாதி திரும்பப் பெறப்படும். பன்னிரண்டு மாதங்களுக்குப் பிறகு முழுவதும் திரும்பப் பெறப்படும்.",
      },
    },
    cta: {
      apply: {
        en: "Apply to drive with us",
        si: "අප සමඟ ධාවනය කිරීමට අයදුම් කරන්න",
        ta: "எங்களுடன் ஓட்ட விண்ணப்பிக்கவும்",
      },
    },
  },

  // ─────────────────────────────────────────────
  // ABOUT PAGE
  // ─────────────────────────────────────────────
  about: {
    hero: {
      headline: {
        en: "Every Journey, Connected.",
        si: "සෑම ගමනක්ම, සම්බන්ධයි.",
        ta: "ஒவ்வொரு பயணமும், இணைந்தது.",
      },
    },
    mission: {
      title: {
        en: "Our mission",
        si: "අපගේ මෙහෙවර",
        ta: "எங்கள் நோக்கம்",
      },
      body: {
        en: "To change the lives of drivers and small business owners, by building the connected infrastructure that modernises how Sri Lanka moves.",
        si: "ශ්‍රී ලංකාව ගමන් කරන ආකාරය නවීකරණය කරන සම්බන්ධිත යටිතල පහසුකම් ගොඩනගමින්, රියදුරන්ගේ සහ කුඩා ව්‍යාපාරිකයන්ගේ ජීවිත වෙනස් කිරීම.",
        ta: "இலங்கை பயணிக்கும் விதத்தை நவீனப்படுத்தும் இணைக்கப்பட்ட உள்கட்டமைப்பை உருவாக்குவதன் மூலம், ஓட்டுநர்கள் மற்றும் சிறு வணிக உரிமையாளர்களின் வாழ்க்கையை மாற்றுவது.",
      },
    },
    pillars: {
      transparency: {
        title: {
          en: "Radical transparency",
          si: "පූර්ණ විනිවිදභාවය",
          ta: "முழுமையான வெளிப்படைத்தன்மை",
        },
        body: {
          en: "Every advertiser sees exactly which vehicles showed their ad, when, and where. GPS-verified. No black box, no estimated figures.",
          si: "සෑම දැන්වීම්කරුවෙකුම ඔවුන්ගේ දැන්වීම පෙන්වූ රථය, කවදාද, කොහෙද යන්න හරියටම දකියි. GPS මගින් සනාථ කර ඇත. සැඟවුණු දෙයක් නෑ, අනුමාන ගණන් නෑ.",
          ta: "ஒவ்வொரு விளம்பரதாரரும் தங்கள் விளம்பரத்தை எந்த வாகனம், எப்போது, எங்கு காட்டியது என்பதை சரியாகப் பார்க்கிறார். GPS மூலம் உறுதிசெய்யப்பட்டது. மறைவான எதுவும் இல்லை, மதிப்பீட்டு எண்கள் இல்லை.",
        },
      },
      driverDignity: {
        title: {
          en: "Driver dignity",
          si: "රියදුරුගේ ගෞරවය",
          ta: "ஓட்டுநர் மரியாதை",
        },
        body: {
          en: "Drivers are partners, not vendors. Paid on the 5th of every month, without exception.",
          si: "රියදුරන් හවුල්කරුවන්, විකුණුම්කරුවන් නොවේ. සෑම මාසයකම 5 වන දින, කිසිදු ව්‍යතිරේකයක් නැතිව ගෙවනු ලැබේ.",
          ta: "ஓட்டுநர்கள் கூட்டாளர்கள், விற்பனையாளர்கள் அல்ல. ஒவ்வொரு மாதமும் 5ஆம் தேதி, விதிவிலக்கு இன்றி செலுத்தப்படுவார்கள்.",
        },
      },
      communityReinvestment: {
        title: {
          en: "Community reinvestment",
          si: "ප්‍රජා නැවත ආයෝජනය",
          ta: "சமூக மறு முதலீடு",
        },
        body: {
          en: "A share of net revenue is reinvested into the communities our drivers serve.",
          si: "අපගේ රියදුරන් සේවය කරන ප්‍රජාවන් තුළට ශුද්ධ ආදායමෙන් කොටසක් නැවත ආයෝජනය කරනු ලැබේ.",
          ta: "எங்கள் ஓட்டுநர்கள் சேவை செய்யும் சமூகங்களில் நிகர வருமானத்தின் ஒரு பங்கு மறுமுதலீடு செய்யப்படுகிறது.",
        },
      },
    },
  },

  // ─────────────────────────────────────────────
  // CONTACT PAGE
  // ─────────────────────────────────────────────
  contact: {
    hero: {
      headline: {
        en: "Get in touch",
        si: "අප හා සම්බන්ධ වන්න",
        ta: "எங்களைத் தொடர்பு கொள்ளுங்கள்",
      },
    },
    form: {
      name: {
        en: "Your name",
        si: "ඔබේ නම",
        ta: "உங்கள் பெயர்",
      },
      email: {
        en: "Email address",
        si: "විද්‍යුත් තැපැල් ලිපිනය",
        ta: "மின்னஞ்சல் முகவரி",
      },
      message: {
        en: "Your message",
        si: "ඔබේ පණිවිඩය",
        ta: "உங்கள் செய்தி",
      },
      submit: {
        en: "Send message",
        si: "පණිවිඩය යවන්න",
        ta: "செய்தியை அனுப்பவும்",
      },
    },
    whatsapp: {
      en: "Or message us directly on WhatsApp",
      si: "නැතහොත් WhatsApp හරහා අප හා සෘජුව කතා කරන්න",
      ta: "அல்லது WhatsApp மூலம் நேரடியாக எங்களைத் தொடர்பு கொள்ளுங்கள்",
    },
  },
};

export type Language = "en" | "si" | "ta";

export function t(key: string, lang: Language): string {
  const parts = key.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let node: any = translations;
  for (const part of parts) {
    node = node?.[part];
    if (node === undefined) return key; // fallback: show the key itself if missing
  }
  return node?.[lang] ?? node?.en ?? key;
}
