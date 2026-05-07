import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/drive")({
  component: DrivePage,
  head: () => ({
    meta: [
      { title: "Drive & Earn with mydiio — Tuk-Tuk Drivers in Colombo" },
      { name: "description", content: "Earn LKR 6,000–8,000 every month doing nothing different. Free installation, monthly bank transfer." },
    ],
  }),
});

function DrivePage() {
  return (
    <div style={{ minHeight: "100vh", background: "#1A1A0E", color: "#FFF9ED", padding: "120px 24px 80px", textAlign: "center" }}>
      <h1 className="font-display" style={{ fontSize: "clamp(40px, 6vw, 64px)", color: "#4CAF72", lineHeight: 1.05 }}>
        Drive & earn with mydiio
      </h1>
      <p style={{ fontFamily: "Nunito", fontWeight: 800, fontSize: 18, color: "rgba(255,249,237,0.7)", maxWidth: 520, margin: "16px auto 0" }}>
        This page is coming soon. In the meantime, message us on WhatsApp.
      </p>
      <Link to="/" className="font-mono" style={{ display: "inline-block", marginTop: 32, color: "#4CAF72", fontSize: 12, letterSpacing: 2, textTransform: "uppercase" }}>
        ← Back home
      </Link>
    </div>
  );
}
