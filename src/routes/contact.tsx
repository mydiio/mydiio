import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import { supabase } from "@/integrations/supabase/client";
import COLOMBO_STREET from "@/assets/colombo-street.jpg";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — mydiio | Let's talk" },
      { name: "description", content: "Campaign bookings, driver applications, investor questions — find your path. Based in Colombo." },
      { property: "og:title", content: "Contact — mydiio" },
      { property: "og:description", content: "Campaign bookings, driver applications, investor questions." },
    ],
  }),
});

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--bg)",
  border: "var(--card-border)",
  borderRadius: 10,
  padding: "10px 14px",
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: 14,
  color: "var(--ink)",
  outline: "none",
  transition: "all 0.15s",
};

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const now = new Date();
    const sriLankaOffset = 5.5 * 60;
    const utcMin = now.getUTCHours() * 60 + now.getUTCMinutes();
    const sriLankaMin = (utcMin + sriLankaOffset) % (24 * 60);
    const hour = Math.floor(sriLankaMin / 60);
    setIsOpen(hour >= 8 && hour < 20);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim().slice(0, 200);
    const phone = String(fd.get("phone") || "").trim().slice(0, 50);
    const message = String(fd.get("message") || "").trim().slice(0, 4000);
    if (!name || !phone || !message) return;
    setSubmitting(true);
    const { error: dbError } = await (supabase as any)
      .from("general_enquiries")
      .insert({ name, phone, message });
    setSubmitting(false);
    if (dbError) {
      setError("Something went wrong — please try again.");
      return;
    }
    setSubmitted(true);
  }

  return (
    <SiteShell accent="amber">
      {/* Section 1 — Header */}
      <section
        style={{
          position: "relative",
          background: "var(--bg)",
          padding: "clamp(72px,10vh,120px) var(--section-px) clamp(48px,6vh,80px)",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <img
          src={COLOMBO_STREET}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.05,
            zIndex: 0,
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <span className="eyebrow">Contact</span>
          <h1
            className="reveal-up"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(48px,7vw,96px)",
              letterSpacing: "-0.04em",
              lineHeight: 0.93,
              color: "var(--ink)",
              marginTop: 12,
            }}
          >
            Let's talk.
          </h1>
          <p
            className="reveal-up delay-1"
            style={{
              color: "var(--ink-soft)",
              fontSize: "clamp(16px,1.4vw,18px)",
              maxWidth: "44ch",
              margin: "16px auto 0",
              lineHeight: 1.55,
            }}
          >
            Campaign bookings, driver applications, investor questions — find your path below.
          </p>
        </div>
      </section>

      {/* Section 2 — Three path cards */}
      <section style={{ padding: "0 var(--section-px) var(--section-py)" }}>
        <div className="contact-grid">
          {/* Card 1 — Advertisers */}
          <div className="mydiio-card contact-card contact-card-amber reveal-up delay-1" style={{ padding: 24, display: "flex", flexDirection: "column" }}>
            <span className="eyebrow" style={{ color: "var(--accent-deep)" }}>For businesses</span>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 22, color: "var(--ink)", margin: "8px 0 10px" }}>
              Launch a campaign.
            </h3>
            <p style={{ color: "var(--ink-soft)", fontSize: 14, lineHeight: 1.65 }}>
              From LKR 25,000 a month. First 7 days free. GPS-verified proof every Monday. No agency needed.
            </p>

            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "var(--ink-mute)", margin: "14px 0 20px" }}>
              Takes 2 minutes · No payment now
            </p>
            <Link
              to="/advertise/apply"
              className="sticker-btn-amber"
              style={{
                marginTop: "auto",
                display: "block",
                width: "100%",
                textAlign: "center",
                background: "var(--accent)",
                color: "var(--ink)",
                border: "var(--card-border)",
                borderRadius: 12,
                boxShadow: "var(--shadow-card)",
                padding: "12px 16px",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 14,
                textDecoration: "none",
                transition: "all 0.15s",
              }}
            >
              Apply for a campaign spot →
            </Link>
          </div>

          {/* Card 2 — Drivers */}
          <div className="mydiio-card contact-card contact-card-green reveal-up delay-2" style={{ padding: 24, display: "flex", flexDirection: "column" }}>
            <span className="eyebrow" style={{ color: "var(--green-ink)" }}>For tuk-tuk drivers</span>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 22, color: "var(--ink)", margin: "8px 0 10px" }}>
              Join the network.
            </h3>
            <p style={{ color: "var(--ink-soft)", fontSize: 14, lineHeight: 1.65 }}>
              LKR 6,000 base pay every month. Screen installed free. Keep your routes. Payment on the 5th, every month, without fail.
            </p>

            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "var(--ink-mute)", margin: "14px 0 20px" }}>
              Takes 5 minutes · No deposit now
            </p>
            <Link
              to="/drivers/apply"
              className="sticker-btn-green"
              style={{
                marginTop: "auto",
                display: "block",
                width: "100%",
                textAlign: "center",
                background: "var(--green)",
                color: "var(--on-dark)",
                border: "var(--card-border)",
                borderRadius: 12,
                boxShadow: "var(--shadow-card)",
                padding: "12px 16px",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 14,
                textDecoration: "none",
                transition: "all 0.15s",
              }}
            >
              Apply to drive →
            </Link>
          </div>

          {/* Card 3 — Investors & general */}
          <div className="mydiio-card reveal-up delay-3" style={{ padding: 24, display: "flex", flexDirection: "column" }}>
            <span className="eyebrow">Investors and press</span>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 22, color: "var(--ink)", margin: "8px 0 10px" }}>
              Get in touch.
            </h3>
            <p style={{ color: "var(--ink-soft)", fontSize: 14, lineHeight: 1.65, marginBottom: 20 }}>
              Raising a pre-seed round. Strong early traction. Full investor brief available on request.
            </p>

            {submitted ? (
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 15,
                  color: "var(--ink)",
                  textAlign: "center",
                  margin: "auto 0",
                  padding: "24px 0",
                }}
              >
                Message sent. We'll be in touch within 24 hours.
              </p>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: "auto" }}>
                <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "var(--ink-mute)", textTransform: "uppercase", letterSpacing: 1 }}>Your name</span>
                  <input name="name" required maxLength={200} placeholder="Full name" style={inputStyle} className="contact-input" />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "var(--ink-mute)", textTransform: "uppercase", letterSpacing: 1 }}>WhatsApp / Phone</span>
                  <input name="phone" type="tel" required maxLength={50} placeholder="+94 77 000 0000" style={inputStyle} className="contact-input" />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "var(--ink-mute)", textTransform: "uppercase", letterSpacing: 1 }}>Your message</span>
                  <textarea name="message" required maxLength={4000} rows={3} placeholder="Tell us what you're working on." style={{ ...inputStyle, resize: "vertical" }} className="contact-input" />
                </label>
                <button
                  type="submit"
                  disabled={submitting}
                  className="contact-submit"
                  style={{
                    background: "transparent",
                    border: "var(--card-border)",
                    borderRadius: 12,
                    boxShadow: "var(--shadow-card)",
                    color: "var(--ink)",
                    padding: "12px 16px",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: submitting ? "wait" : "pointer",
                    opacity: submitting ? 0.7 : 1,
                    transition: "all 0.15s",
                  }}
                >
                  {submitting ? "Sending…" : "Send message →"}
                </button>
                {error && (
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "var(--accent-deep)", textAlign: "center" }}>
                    {error}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Section 3 — Response strip */}
      <div
        className="reveal-up"
        style={{
          background: "var(--ink)",
          padding: "16px var(--section-px)",
          borderRadius: 14,
          margin: "0 var(--section-px) var(--section-py)",
        }}
      >
        <div className="response-strip">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              className={isOpen ? "status-dot-pulse" : ""}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: isOpen ? "var(--green)" : "var(--accent)",
                display: "inline-block",
              }}
            />
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.7)" }}>
              {isOpen
                ? "Available now · Sri Lanka time · Typical response under 2 hours"
                : "We'll respond first thing tomorrow morning · Sri Lanka time"}
            </span>
          </div>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.5)" }}>
            Every application read by a real person · No automated replies
          </span>
        </div>
      </div>

      {/* Section 4 — Footer note */}
      <p
        style={{
          textAlign: "center",
          fontFamily: "'Space Mono', monospace",
          fontSize: 11,
          color: "var(--ink-mute)",
          padding: "0 var(--section-px) var(--section-py-sm)",
          margin: 0,
        }}
      >
        mydiio · Registered in Sri Lanka · Colombo · 2026
      </p>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr; }
        }
        .contact-card-amber:hover { background: var(--accent-soft); }
        .contact-card-green:hover { background: var(--green-soft); }
        .sticker-btn-amber:hover, .sticker-btn-green:hover {
          transform: translate(-2px,-2px);
          box-shadow: var(--shadow-card-hover);
        }
        .contact-input:focus {
          border-color: var(--accent);
          box-shadow: 2px 2px 0 var(--accent);
          transform: translate(-1px,-1px);
        }
        .contact-submit:hover {
          background: var(--ink);
          color: var(--on-dark);
        }
        .response-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        @media (max-width: 700px) {
          .response-strip { flex-direction: column; align-items: flex-start; }
        }
        @keyframes status-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
        .status-dot-pulse { animation: status-pulse 2s ease infinite; }
      `}</style>
    </SiteShell>
  );
}
