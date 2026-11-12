import { useState, type FormEvent } from "react";
import { leadMeta, useLeadGuard, contactValid } from "@/lib/lead-intake";

const ENDPOINT = "https://rmqexobhpasitrexvaig.supabase.co/functions/v1/submit-enquiry";
const TZ = "Asia/Colombo";
const purposes = [
  ["advertising", "Advertise with mydiio"],
  ["demo", "See a product demonstration"],
  ["agency", "Agency or business partnership"],
  ["general", "Something else"],
] as const;
const faqs = [
  ["Is my meeting confirmed when I submit?", "Not yet. Your preferred time is a request. Our team will review it and contact you to confirm or suggest another time."],
  ["How long is the conversation?", "The introductory conversation is 15 minutes, typically online. We will share the joining details once the meeting is confirmed."],
  ["Can I see how mydiio works?", "Yes. Choose product demonstration as the reason for your request, and we can discuss a suitable demo."],
  ["Can agencies work with mydiio?", "Yes. We welcome enquiries from advertising agencies and strategic partners."],
  ["Where can I advertise?", "mydiio is starting in Colombo. Campaign availability depends on live vehicle coverage and the selected package."],
  ["What if I need to cancel?", "Please give at least 24 hours' notice. If your meeting has been confirmed, reply to the meeting correspondence to request a cancellation."],
] as const;

function colomboParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find(p => p.type === type)?.value || "00";
  return { date: `${get("year")}-${get("month")}-${get("day")}`, time: `${get("hour")}:${get("minute")}` };
}
function dateAfterDays(days: number) {
  return colomboParts(new Date(Date.now() + days * 86400000)).date;
}
function isWeekday(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const d = new Date(`${value}T12:00:00Z`);
  return !Number.isNaN(d.valueOf()) && d.toISOString().slice(0, 10) === value && d.getUTCDay() !== 0 && d.getUTCDay() !== 6;
}
function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "full", timeZone: "UTC" }).format(new Date(`${value}T12:00:00Z`));
}
const times = Array.from({ length: 17 }, (_, i) => {
  const minutes = 9 * 60 + 30 + i * 30;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const value = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  const label = `${h > 12 ? h - 12 : h}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
  return { value, label };
});

export function ContactBooking() {
  const [purpose, setPurpose] = useState<string>("advertising");
  const [step, setStep] = useState<1 | 2>(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const [details, setDetails] = useState({ name: "", business: "", email: "", phone: "", website: "", notes: "" });
  const guard = useLeadGuard();
  const minDate = dateAfterDays(2);
  const purposeLabel = purposes.find(p => p[0] === purpose)?.[1] || "General enquiry";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending" || status === "sent") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const business = String(data.get("business") || "").trim();
    const website = String(data.get("website") || "").trim();
    const notes = String(data.get("notes") || "").trim();
    if (!form.reportValidity()) return;
    if (!contactValid(email, phone) || !email || !phone) {
      setError("Please enter a valid email address and phone number.");
      return;
    }
    if (!date || date < dateAfterDays(2) || !isWeekday(date) || !times.some(t => t.value === time)) {
      setError("Choose a weekday at least two days from today and a listed time.");
      return;
    }
    setStatus("sending");
    setError("");
    const message = [
      "MEETING REQUEST — AWAITING MANUAL APPROVAL",
      `Purpose: ${purposeLabel}`,
      `Preferred date: ${formatDate(date)} (${date})`,
      `Preferred time: ${time} (${TZ}, UTC+05:30)`,
      "Requested duration: 15 minutes",
      `Business / organisation: ${business || "Not supplied"}`,
      `Email: ${email}`,
      `Phone / WhatsApp: ${phone}`,
      `Website: ${website || "Not supplied"}`,
      `Notes: ${notes || "None"}`,
      "Status: Requested — not confirmed",
      "Cancellation policy: at least 24 hours before a confirmed meeting",
    ].join("\n");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...leadMeta(form, guard.started.current),
          source: "website",
          sender_type: "prospect",
          sender_name: name,
          sender_contact: email,
          subject: `Meeting request — ${purposeLabel}`,
          message,
        }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus("sent");
      form.reset();
      setDetails({ name: "", business: "", email: "", phone: "", website: "", notes: "" });
      setDate("");
      setStep(1);
    } catch {
      setStatus("error");
      setError("Your request could not be sent. Please try again shortly.");
    }
  }

  return (
    <>
      <section className="cb-main" data-atlas-tone="light">
        <div className="cb-shell cb-layout">
          <div className="cb-copy">
            <span className="cb-eyebrow"><span className="cb-dot" /> MYDIIO / CONTACT</span>
            <h1>Let's <em>connect.</em></h1>
            <p className="cb-lead">A conversation is a good place to start. Tell us what you have in mind, and we'll find a time to talk.</p>
            <div className="cb-quick"><span>15-minute call</span><span>Monday to Friday</span><span>Sri Lanka time</span></div>
            <div className="cb-aside-note"><strong>Simple by design.</strong><p>Request a time. We'll personally review it and confirm your appointment. No account needed.</p></div>
            <a className="cb-portal" href="https://admin.mydiio.com">Already an advertiser? Sign in <span aria-hidden="true">&rarr;</span></a>
          </div>
          <div className="cb-card">
            {status === "sent" ? (
              <div className="cb-success" role="status"><div className="cb-success-mark">✓</div><h2>Request received.</h2><p>Thanks for reaching out. Your meeting is not confirmed yet. We'll review your preferred time and get back to you, typically within 24 to 48 hours.</p><button type="button" onClick={() => { setStatus("idle"); setError(""); setStep(1); setDate(""); setDetails({ name: "", business: "", email: "", phone: "", website: "", notes: "" }); }}>Make another request</button></div>
            ) : (
              <form onSubmit={submit} autoComplete="off" inert={!guard.ready} data-intake-ready={guard.ready}>
                {guard.fields}
                <div className="cb-card-top"><span>REQUEST A CONVERSATION</span><span>STEP {step} OF 2</span></div>
                <div className="cb-progress"><span className={step === 2 ? "is-complete" : ""} /></div>
                {step === 1 ? (
                  <div className="cb-step">
                    <h2>When works for you?</h2>
                    <p className="cb-sub">Choose a preferred time for a 15-minute call. We'll confirm it personally.</p>
                    <fieldset className="cb-fieldset"><legend>What would you like to discuss?</legend><div className="cb-purposes">{purposes.map(([value, label]) => <label className={purpose === value ? "cb-purpose is-active" : "cb-purpose"} key={value}><input type="radio" name="purpose" value={value} checked={purpose === value} onChange={() => setPurpose(value)} /><span>{label}</span></label>)}</div></fieldset>
                    <div className="cb-two"><label>Preferred date<input type="date" name="meeting_preferred_date" autoComplete="off" min={minDate} value={date} onChange={e => setDate(e.target.value)} required /></label><label>Preferred time<select name="meeting_preferred_time" value={time} onChange={e => setTime(e.target.value)} required>{times.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}</select></label></div>
                    <p className="cb-hint">Weekdays only. Request at least two days ahead. Times are in Sri Lanka (UTC+05:30).</p>
                    <button className="cb-submit" type="button" onClick={() => { if (!date || date < dateAfterDays(2) || !isWeekday(date)) { setError("Please select a weekday at least two days ahead."); return; } setError(""); setStep(2); }}>Continue <span aria-hidden="true">&rarr;</span></button>
                  </div>
                ) : (
                  <div className="cb-step">
                    <h2>A little about you.</h2>
                    <p className="cb-sub">{formatDate(date)} at {times.find(t => t.value === time)?.label} · 15 minutes</p>
                    <div className="cb-two"><label>Full name <input name="name" value={details.name} onChange={e => setDetails(d => ({ ...d, name: e.target.value }))} required maxLength={120} autoComplete="name" placeholder="Your name" /></label><label>Business / organisation <input name="business" value={details.business} onChange={e => setDetails(d => ({ ...d, business: e.target.value }))} maxLength={160} autoComplete="organization" placeholder="Company name" /></label></div>
                    <div className="cb-two"><label>Email address <input name="email" type="email" value={details.email} onChange={e => setDetails(d => ({ ...d, email: e.target.value }))} required maxLength={255} autoComplete="email" placeholder="you@company.com" /></label><label>Phone / WhatsApp <input name="phone" type="tel" value={details.phone} onChange={e => setDetails(d => ({ ...d, phone: e.target.value }))} required maxLength={30} autoComplete="tel" placeholder="+94 ..." /></label></div>
                    <div className="cb-two"><label>Website <span className="cb-optional">Optional</span><input name="website" type="url" value={details.website} onChange={e => setDetails(d => ({ ...d, website: e.target.value }))} maxLength={500} placeholder="https://yourbusiness.com" /></label><label>Short note <span className="cb-optional">Optional</span><input name="notes" value={details.notes} onChange={e => setDetails(d => ({ ...d, notes: e.target.value }))} maxLength={1800} placeholder="What should we know?" /></label></div>
                    <p className="cb-hint">If your request is approved, our team will contact you with the meeting details. Please give at least 24 hours' notice if you need to cancel.</p>
                    <div className="cb-actions"><button className="cb-back" type="button" onClick={() => setStep(1)}>Back</button><button className="cb-submit" type="submit" disabled={!guard.ready || status === "sending"}>{status === "sending" ? "Sending..." : "Request meeting"} <span aria-hidden="true">&rarr;</span></button></div>
                    <p className="cb-privacy">Your details are only used to manage your enquiry. <a href="/privacy">Privacy policy</a>.</p>
                  </div>
                )}
                {error && <p className="cb-error" role="alert">{error}</p>}
              </form>
            )}
          </div>
        </div>
      </section>
      <section className="cb-faq" data-atlas-tone="light"><div className="cb-shell cb-faq-grid"><div><span className="cb-eyebrow">GOOD TO KNOW</span><h2>A few answers.</h2><p>Everything you need before we talk.</p></div><div className="cb-faq-items">{faqs.map(([question, answer], i) => <details key={question}><summary><span className="cb-faq-index">{String(i + 1).padStart(2, "0")}</span><span>{question}</span><span className="cb-faq-plus" aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div></section>
      <section className="cb-bottom" data-atlas-tone="light"><div className="cb-shell cb-bottom-inner"><div><span className="cb-eyebrow">THE COMPANY BEHIND MYDIIO</span><p>Start Smart Technologies Private Limited · PV00370438</p><p>23, 5th Lane, Ratmalana, Colombo, Sri Lanka</p></div><span>Monday to Friday · 9 AM to 6 PM · Sri Lanka time</span></div></section>
    </>
  );
}

