import { createFileRoute } from "@tanstack/react-router";
import MydiioLanding from "@/components/MydiioLanding";

export const Route = createFileRoute("/")({
 component: Index,
 head: () => ({
 meta: [
 { title: "mydiio, Sri Lanka's first connected passenger information network" },
 { name: "description", content: "Reach passengers inside Colombo's tuk-tuks with GPS-verified digital advertising. Verified impressions, weekly reports, campaigns live in 72 hours. Starting from LKR 25,000." },
 { property: "og:title", content: "mydiio, Every Journey, Connected. Sri Lanka's first connected passenger information network." },
 { property: "og:description", content: "Reach passengers inside Colombo's tuk-tuks with GPS-verified digital advertising. Starting from LKR 25,000." },
 { property: "og:image", content: "/illustrations/coverage-fleet.png" },
 { property: "og:url", content: "https://mydiio.com/" },
 { property: "og:type", content: "website" },
 { name: "twitter:card", content: "summary_large_image" },
 { name: "twitter:title", content: "mydiio, Sri Lanka's first connected passenger information network" },
 { name: "twitter:description", content: "GPS-verified advertising inside Colombo's tuk-tuks. Campaigns from LKR 25,000." },
 { name: "twitter:image", content: "/illustrations/coverage-fleet.png" },
 ],
 links: [{ rel: "canonical", href: "https://mydiio.com/" }],
 scripts: [
 {
 type: "application/ld+json",
 children: JSON.stringify({
 "@context": "https://schema.org",
 "@type": "LocalBusiness",
 name: "mydiio",
 description: "Sri Lanka's first connected passenger information network, installed inside tuk-tuks, funded by advertising, built for people.",
 url: "https://mydiio.com",
 telephone: "+94707471002",
 email: "mydiiomedia@gmail.com",
 address: {
 "@type": "PostalAddress",
 addressLocality: "Colombo",
 addressRegion: "Western Province",
 addressCountry: "LK",
 },
 geo: {
 "@type": "GeoCoordinates",
 latitude: "6.9271",
 longitude: "79.8612",
 },
 priceRange: "LKR 25,000 to LKR 300,000",
 openingHours: "Mo-Fr 09:00-18:00",
 }),
 },
 {
 type: "application/ld+json",
 children: JSON.stringify({
 "@context": "https://schema.org",
 "@type": "FAQPage",
 mainEntity: [
 {
 "@type": "Question",
 name: "How many tuk-tuks are live?",
 acceptedAnswer: {
 "@type": "Answer",
 text: "mydiio is currently in its pilot phase with 10 tuk-tuks operating across Colombo. The network is expanding, Year 1 target is 50 vehicles.",
 },
 },
 {
 "@type": "Question",
 name: "How do advertisers measure results?",
 acceptedAnswer: {
 "@type": "Answer",
 text: "Every ad play is automatically logged with the vehicle ID, GPS location, timestamp, and duration. Advertisers receive weekly reports showing exactly where, when, and how many times their ad ran.",
 },
 },
 {
 "@type": "Question",
 name: "How quickly can campaigns launch?",
 acceptedAnswer: {
 "@type": "Answer",
 text: "Once approved, most mydiio campaigns are live across the network within 72 hours.",
 },
 },
 {
 "@type": "Question",
 name: "How do tuk-tuk drivers get paid?",
 acceptedAnswer: {
 "@type": "Answer",
 text: "mydiio drivers receive LKR 6,000 base pay per month, paid by bank transfer on the 5th of every month without exception. A route bonus of LKR 2,000 is available for drivers active 8+ hours per day.",
 },
 },
 ],
 }),
 },
 ],
 }),
});

function Index() {
 return <MydiioLanding />;
}
