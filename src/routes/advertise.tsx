import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/advertise")({
  component: AdvertisePage,
  head: () => ({
    meta: [
      { title: "Advertise on mydiio — Tuk-Tuk Advertising in Colombo" },
      { name: "description", content: "Reach captive passengers in Colombo tuk-tuks. From LKR 20,000/month with 14 days free." },
    ],
  }),
});

function AdvertisePage() {
  return (
    <div style={{ minHeight: "100vh", background: "#1A1A0E", color: "#FFF9ED", padding: "120px 24px 80px", textAlign: "center" }}>
      <h1 className="font-display" style={{ fontSize: "clamp(40px, 6vw, 64px)", color: "#F5A623", lineHeight: 1.05 }}>
        Advertise on mydiio
      </h1>
      <p style={{ fontFamily: "Nunito", fontWeight: 800, fontSize: 18, color: "rgba(255,249,237,0.7)", maxWidth: 520, margin: "16px auto 0" }}>
        This page is coming soon. In the meantime, message us on WhatsApp.
      </p>
      <Link to="/" className="font-mono" style={{ display: "inline-block", marginTop: 32, color: "#F5A623", fontSize: 12, letterSpacing: 2, textTransform: "uppercase" }}>
        ← Back home
      </Link>
    </div>
  );
}
