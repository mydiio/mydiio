import { useEffect, useRef, useState, type FormEvent } from "react";
import { Reveal } from "@/motion";
import { contactValid, leadMeta, useLeadGuard } from "@/lib/lead-intake";

type Goal = "visits" | "awareness" | "qr";
type Plan = "roamer" | "pioneer";
const ENDPOINT = "https://rmqexobhpasitrexvaig.supabase.co/functions/v1/submit-enquiry";
const goals: { id: Goal; label: string; detail: string }[] = [
  { id: "visits", label: "Bring customers in", detail: "Put a location, menu or offer in front of passengers around Colombo." },
  { id: "awareness", label: "Build brand awareness", detail: "Introduce your business through repeated exposure on participating screens." },
  { id: "qr", label: "Drive QR engagement", detail: "Invite passengers to scan and explore your website, menu or promotion." },
];
const plans = {
  roamer: { name: "Roamer", price: "25,000", minutes: "500", vehicles: "Up to 5", detail: "An accessible starting point for your first campaign." },
  pioneer: { name: "Pioneer", price: "85,000", minutes: "2,000", vehicles: "Up to 10", detail: "Founding advertiser option with a 12-month price lock." },
} as const;

export function ProductPurchase() {
  const [goal, setGoal] = useState<Goal>("visits");
  const [selectedPlan, setSelectedPlan] = useState<Plan>("roamer");
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const guard = useLeadGuard();
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const plan = plans[selectedPlan];
  const selectedGoal = goals.find((item) => item.id === goal) ?? goals[0];

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const priorOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLInputElement>("input[name=business]")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && status !== "sending") setOpen(false);
      if (event.key !== "Tab") return;
      const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), a[href]') ?? []);
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = priorOverflow; document.removeEventListener("keydown", onKey); (previous ?? triggerRef.current)?.focus(); };
  }, [open, status]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending" || status === "sent") return;
    const form = event.currentTarget;
    const values = new FormData(form);
    const email = String(values.get("email") || "").trim();
    const phone = String(values.get("phone") || "").trim();
    if (!contactValid(email, phone)) { setError("Enter a valid email or WhatsApp number."); return; }
    if (!form.reportValidity()) return;
    setStatus("sending"); setError("");
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...leadMeta(form, guard.started.current),
          source: "website", sender_type: "prospect",
          sender_name: String(values.get("contact_name") || "").trim(),
          sender_contact: email || phone,
          subject: "Advertiser enquiry - Campaign selector - " + plan.name,
          message: [
            "Enquiry type: Advertiser", "Source: Website campaign selector",
            "Business: " + String(values.get("business") || "").trim(),
            "Contact: " + String(values.get("contact_name") || "").trim(),
            "Campaign objective: " + selectedGoal.label,
            "Interested package: " + plan.name,
            "Indicative package price: LKR " + plan.price + "/month",
            "Minutes: " + plan.minutes + "/month; vehicles: " + plan.vehicles,
            phone ? "WhatsApp: " + phone : "",
            email ? "Email: " + email : "",
            "Reservation not confirmed; no deposit collected."
          ].filter(Boolean).join("\n"),
        }),
      });
      if (!response.ok) throw new Error("Submission failed");
      setStatus("sent"); form.reset();
    } catch { setStatus("error"); setError("We could not send your enquiry. Please try again."); }
  }

  return (
    <section id="difference" className="advertiser-purchase advertiser-conversion" data-atlas-tone="light" aria-labelledby="advertiser-conversion-title">
      <div className="advertiser-shell advertiser-conversion-shell">
        <Reveal as="header" className="advertiser-conversion-intro">
          <div className="advertiser-conversion-eyebrow">START YOUR CAMPAIGN <span>COLOMBO / NOVEMBER 2026 LAUNCH PLANNED</span></div>
          <h2 id="advertiser-conversion-title">Tell us your goal. <em>We'll map the way.</em></h2>
          <p>Choose your goal. Select a launch package. We'll take it from there.</p>
        </Reveal>
        <div className="advertiser-conversion-grid">
          <div className="advertiser-conversion-goals" aria-labelledby="advertiser-goals-label">
            <div className="advertiser-conversion-panel-top"><span className="advertiser-conversion-step">01</span><h3 id="advertiser-goals-label">What do you want to achieve?</h3></div>
            <div className="advertiser-conversion-options" role="group" aria-label="Campaign objective">
              {goals.map((item) => <button key={item.id} type="button" className={`advertiser-conversion-option${goal === item.id ? " is-selected" : ""}`} aria-pressed={goal === item.id} onClick={() => setGoal(item.id)}><span className="advertiser-conversion-radio" aria-hidden="true"/><span>{item.label}</span><span className="advertiser-conversion-option-arrow" aria-hidden="true">&#8594;</span></button>)}
            </div>
            <p className="advertiser-conversion-goal-detail" aria-live="polite">{selectedGoal.detail}</p>
          </div>
          <div className="advertiser-conversion-plan" aria-labelledby="advertiser-plan-label">
            <div className="advertiser-conversion-panel-top"><span className="advertiser-conversion-step">02</span><h3 id="advertiser-plan-label">Choose your launch package</h3></div>
            <div className="advertiser-conversion-plan-tabs" role="group" aria-label="Launch package">
              {(["roamer", "pioneer"] as const).map((id) => <button key={id} type="button" aria-pressed={selectedPlan === id} className={selectedPlan === id ? "is-selected" : ""} onClick={() => setSelectedPlan(id)}>{plans[id].name}</button>)}
            </div>
            <div className="advertiser-conversion-price"><strong>LKR {plan.price}</strong><span>/ month</span></div>
            <p className="advertiser-conversion-plan-detail">{plan.detail}</p>
            <div className="advertiser-conversion-stats"><div><strong>{plan.minutes}</strong><span>Ad minutes / month</span></div><div><strong>{plan.vehicles}</strong><span>Active vehicles*</span></div></div>
            <button ref={triggerRef} type="button" className="advertiser-conversion-cta" onClick={() => { setStatus("idle"); setError(""); setOpen(true); }}>Enquire about {plan.name} <span aria-hidden="true">&#8594;</span></button>
            <p className="advertiser-conversion-deposit">Enquiry only. No payment is taken at this stage.</p>
          </div>
        </div>
        <div className="advertiser-conversion-foot"><span>GPS-verified delivery <span aria-hidden="true">&#183;</span> Monday reports <span aria-hidden="true">&#183;</span> *Coverage and vehicle allocation confirmed before booking</span><a href="/contact">Need a custom campaign? Talk to us <span aria-hidden="true">&#8594;</span></a></div>
      </div>
      {open && <div className="advertiser-enquiry-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget && status !== "sending") setOpen(false); }}>
        <div ref={dialogRef} className="advertiser-enquiry-dialog" role="dialog" aria-modal="true" aria-labelledby="advertiser-enquiry-title">
          <button type="button" className="advertiser-enquiry-close" aria-label="Close enquiry form" disabled={status === "sending"} onClick={() => setOpen(false)}>&times;</button>
          {status === "sent" ? <div className="advertiser-enquiry-success" role="status"><span className="advertiser-enquiry-kicker">ENQUIRY RECEIVED</span><h2 id="advertiser-enquiry-title">Thank you.</h2><p>Your {plan.name} enquiry has been submitted. Our team will follow up to discuss launch availability and next steps.</p><button type="button" className="advertiser-conversion-cta" onClick={() => setOpen(false)}>Close</button></div> : <>
            <span className="advertiser-enquiry-kicker">CAMPAIGN ENQUIRY / {plan.name.toUpperCase()}</span>
            <h2 id="advertiser-enquiry-title">Let's get your campaign moving.</h2>
            <p className="advertiser-enquiry-summary">{selectedGoal.label} &middot; {plan.name} &middot; LKR {plan.price}/month</p>
            <form onSubmit={submit} inert={!guard.ready} data-intake-ready={guard.ready}>
              {guard.fields}
              <label>Business name<input name="business" required maxLength={160} autoComplete="organization" /></label>
              <label>Contact person<input name="contact_name" required maxLength={120} autoComplete="name" /></label>
              <div className="advertiser-enquiry-fields"><label>Email<input name="email" type="email" maxLength={255} autoComplete="email" /></label><label>WhatsApp<input name="phone" type="tel" maxLength={30} autoComplete="tel" /></label></div>
              <p className="advertiser-enquiry-note">Provide email or WhatsApp, or both. We use these details to respond to your enquiry. <a href="/privacy">Privacy policy</a>.</p>
              {error && <p className="advertiser-enquiry-error" role="alert">{error}</p>}
              <button className="advertiser-conversion-cta" disabled={!guard.ready || status === "sending"}>{status === "sending" ? "Sending..." : "Send campaign enquiry"}</button>
            </form>
          </>}
        </div>
      </div>}
    </section>
  );
}
