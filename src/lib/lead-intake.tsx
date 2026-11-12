import { useRef, useEffect, useState } from "react";
const attributionKey = "mydiio.enquiry-source";
function captureSource() {
  const q = new URLSearchParams(window.location.search);
  const tags = Object.fromEntries(
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]
      .filter((k) => q.has(k))
      .map((k) => [k, (q.get(k) || "").slice(0, 120)]),
  );
  try {
    if (Object.keys(tags).length || !sessionStorage.getItem(attributionKey))
      sessionStorage.setItem(
        attributionKey,
        JSON.stringify({ landing_page: window.location.pathname, ...tags }),
      );
  } catch {}
  return tags;
}
export function LeadAttribution() {
  useEffect(() => {
    captureSource();
  }, []);
  return null;
}
export function attribution() {
  if (typeof window === "undefined") return {};
  const tags = captureSource();
  let saved = {};
  try {
    saved = JSON.parse(sessionStorage.getItem(attributionKey) || "{}");
  } catch {}
  return { ...saved, ...tags, source_page: window.location.pathname };
}
export function useLeadGuard() {
  const started = useRef(Date.now());
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  return {
    started,
    ready,
    fields: (
      <label className="lead-honeypot" aria-hidden="true">
        Leave blank
        <input name="website_url" tabIndex={-1} autoComplete="off" />
      </label>
    ),
  };
}
export function leadMeta(form: HTMLFormElement, started: number) {
  return {
    attribution: attribution(),
    website_url: String(new FormData(form).get("website_url") || ""),
    elapsed_ms: Date.now() - started,
  };
}
export const contactValid = (email: string, phone: string) => {
  const e = email.trim(),
    p = phone.trim();
  return (
    Boolean(e || p) &&
    (!e || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) &&
    (!p || (/^[+\d\s().-]{7,30}$/.test(p) && p.replace(/\D/g, "").length >= 7))
  );
};
