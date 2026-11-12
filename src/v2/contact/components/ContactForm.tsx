import { useEffect, useState, type FormEvent } from "react";
import { leadMeta, useLeadGuard, contactValid } from "@/lib/lead-intake";
import { responsePromise } from "../../commercial/policy";
import "../../commercial/commercial.css";
const ENDPOINT = "https://rmqexobhpasitrexvaig.supabase.co/functions/v1/submit-enquiry";
export function ContactForm() {
  const [topic, setTopic] = useState("general"),
    [status, setStatus] = useState("idle"),
    [error, setError] = useState("");
  const guard = useLeadGuard();
  useEffect(() => {
    const t = new URLSearchParams(location.search).get("topic");
    if (t && ["partnership", "privacy", "attention-insights"].includes(t)) setTopic(t);
  }, []);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending" || status === "sent") return;
    const form = e.currentTarget;
    const d = new FormData(form);
    const name = String(d.get("name") || "").trim(),
      email = String(d.get("email") || "").trim(),
      phone = String(d.get("phone") || "").trim();
    if (!contactValid(email, phone)) {
      setError("Provide a valid email or WhatsApp number.");
      return;
    }
    if (!form.reportValidity()) return;
    setStatus("sending");
    setError("");
    const detail =
      topic === "partnership"
        ? ["organisation", "vehicle_types", "fleet_size", "operating_areas"]
            .map((k) => `${k.replaceAll("_", " ")}: ${d.get(k)}`)
            .join("\n")
        : "";
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...leadMeta(form, guard.started.current),
          source: "website",
          sender_type: "prospect",
          sender_name: name,
          sender_contact: email || phone,
          subject:
            topic === "partnership"
              ? "Transport operator partnership enquiry"
              : topic === "privacy"
                ? "Privacy enquiry"
                : topic === "attention-insights"
                  ? "Attention Insights assessment"
                  : "Website enquiry",
          message: [String(d.get("message") || ""), detail, phone ? `WhatsApp: ${phone}` : ""]
            .filter(Boolean)
            .join("\n\n"),
        }),
      });
      if (!res.ok) throw Error();
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setError("We could not send your enquiry. Please try again or contact us on WhatsApp.");
    }
  }
  return (
    <section className="commercial-section" data-atlas-tone="light">
      <div className="commercial-shell contact-intake-layout">
        <aside>
          <span className="commercial-eyebrow">Contact / mydiio</span>
          <h2>Send an enquiry.</h2>
          <p>{responsePromise}</p>
          <p>
            Existing advertiser? <a href="https://admin.mydiio.com">Open the advertiser portal</a>.
          </p>
        </aside>
        <form
          inert={!guard.ready}
          data-intake-ready={guard.ready}
          className="intake-form"
          onSubmit={submit}
        >
          {guard.fields}
          <label>
            Enquiry type
            <select value={topic} onChange={(e) => setTopic(e.target.value)}>
              <option value="general">General enquiry</option>
              <option value="partnership">Explore a partnership</option>
              <option value="privacy">Privacy enquiry</option>
              <option value="attention-insights">Attention Insights assessment</option>
            </select>
          </label>
          <div className="commercial-grid">
            <label>
              Name
              <input name="name" required maxLength={120} autoComplete="name" />
            </label>
            <label>
              Email
              <input type="email" name="email" maxLength={255} autoComplete="email" />
            </label>
            <label>
              WhatsApp
              <input type="tel" name="phone" maxLength={30} autoComplete="tel" />
            </label>
          </div>
          <p>Provide email or WhatsApp, or both.</p>
          {topic === "partnership" && (
            <div className="commercial-grid">
              <label>
                Organisation
                <input name="organisation" required maxLength={160} />
              </label>
              <label>
                Vehicle types
                <input name="vehicle_types" required maxLength={160} />
              </label>
              <label>
                Fleet size
                <input type="number" name="fleet_size" min={1} max={100000} required />
              </label>
              <label>
                Operating areas
                <input name="operating_areas" required maxLength={500} />
              </label>
            </div>
          )}
          <label>
            {topic === "partnership" ? "Partnership interest" : "Message"}
            <textarea name="message" required maxLength={4000} rows={5} />
          </label>
          <p>
            We use your details to respond and measure which enquiries reach us. No advertising
            trackers or automatic marketing subscription. <a href="/privacy">Privacy policy</a>.
          </p>
          <button disabled={!guard.ready || status === "sending" || status === "sent"}>
            {status === "sending"
              ? "Sending…"
              : status === "sent"
                ? "Enquiry received"
                : "Send enquiry"}
          </button>
          {status === "sent" && (
            <p role="status">Thank you. Your enquiry has been received. {responsePromise}</p>
          )}
          {error && (
            <p role="alert" className="commercial-error">
              {error}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
