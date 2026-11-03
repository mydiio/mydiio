export type LayoutLocale = "en" | "si" | "ta";
const labels: Record<string, [string, string]> = {
  Advertise: ["දැන්වීම් පළ කරන්න", "விளம்பரம் செய்யுங்கள்"],
  Drive: ["රියදුරන් සඳහා", "ஓட்டுநர்களுக்கு"],
  About: ["අප ගැන", "எங்களைப் பற்றி"],
  Contact: ["අමතන්න", "தொடர்புகொள்ளுங்கள்"],
  "Sign in": ["පිවිසෙන්න", "உள்நுழையுங்கள்"],
  "Reserve for November": ["නොවැම්බර් සඳහා වෙන්කරන්න", "நவம்பருக்காக முன்பதிவு செய்யுங்கள்"],
  "Open menu": ["මෙනුව විවෘත කරන්න", "பட்டியலைத் திறக்கவும்"],
  "Close menu": ["මෙනුව වසන්න", "பட்டியலை மூடவும்"],
  Explore: ["ගවේෂණය කරන්න", "மேலும் அறிய"],
  Company: ["සමාගම", "நிறுவனம்"],
  "Reach us": ["අප අමතන්න", "எங்களைத் தொடர்புகொள்ள"],
  "Contact form": ["සම්බන්ධතා පෝරමය", "தொடர்புப் படிவம்"],
  Privacy: ["පෞද්ගලිකත්වය", "தனியுரிமை"],
  Terms: ["කොන්දේසි", "விதிமுறைகள்"],
  "Every journey, connected.": ["සෑම ගමනක්ම සම්බන්ධයි.", "ஒவ்வொரு பயணமும் இணைக்கப்படுகிறது."],
  "Sri Lanka’s first connected passenger information network, installed inside tuk-tuks, funded by advertising, built for people.":
    [
      "ශ්‍රී ලංකාවේ පළමු සම්බන්ධිත මගී තොරතුරු ජාලය. ත්‍රිරෝද රථ තුළ සවි කර, දැන්වීම් මඟින් අරමුදල් සපයා, ජනතාව වෙනුවෙන් නිර්මාණය කර ඇත.",
      "இலங்கையின் முதல் இணைக்கப்பட்ட பயணிகள் தகவல் வலையமைப்பு. முச்சக்கர வண்டிகளில் பொருத்தப்பட்டு, விளம்பர நிதியுடன் மக்களுக்காக உருவாக்கப்பட்டது.",
    ],
};
export function layoutCopy(text: string, locale: LayoutLocale = "en") {
  return locale === "en" ? text : labels[text]?.[locale === "si" ? 0 : 1] || text;
}
