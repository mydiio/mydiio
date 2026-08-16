import { useReducedMotion } from "@/motion";
import { colors } from "@/design";

type FooterLink = { label: string; href: string };

const PRODUCT_LINKS: FooterLink[] = [
  { label: "Advertise", href: "/advertise" },
  { label: "Drive", href: "/drive" },
];

const COMPANY_LINKS: FooterLink[] = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

const CONTACT_LINKS = [
  { label: "hello@mydiio.com", href: "mailto:hello@mydiio.com" },
  { label: "WhatsApp", href: "https://wa.me/94707471002" },
] as const;

const TAGLINE = "Every journey, connected.";
const LANGUAGES = "English · Sinhala · Tamil";

function FooterColumn({ heading, links }: { heading: string; links: readonly FooterLink[] }) {
  return (
    <div className="atlas-footer-col">
      <h3 className="atlas-footer-heading">{heading}</h3>
      <ul className="atlas-footer-list">
        {links.map((link) => (
          <li key={link.label}>
            <a className="atlas-footer-link" href={link.href}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterBrand() {
  return (
    <div className="atlas-footer-brand">
      <div className="atlas-footer-logo" aria-label="mydiio">
        <span>myd</span>
        <span style={{ color: colors.amber }}>ii</span>
        <span>o</span>
      </div>
      <p className="atlas-footer-tagline">
        Sri Lanka&rsquo;s first connected passenger information network, installed inside tuk-tuks,
        funded by advertising, built for people.
      </p>
      <p className="atlas-footer-meta">
        Start Smart Technologies Private Limited
        <br />
        Colombo, Sri Lanka
      </p>
    </div>
  );
}

export function AtlasFooter() {
  const reduced = useReducedMotion();

  return (
    <footer data-atlas-footer className="atlas-footer">
      <div className="atlas-footer-inner">
        <div className="atlas-footer-grid">
          <FooterBrand />
          <FooterColumn heading="Explore" links={PRODUCT_LINKS} />
          <FooterColumn heading="Company" links={COMPANY_LINKS} />
          <FooterColumn heading="Reach us" links={CONTACT_LINKS} />
        </div>

        <div className="atlas-footer-rule">
          <span className="atlas-footer-rule-tagline">{TAGLINE}</span>
          <span className="atlas-footer-rule-languages">{LANGUAGES}</span>
        </div>

        <div className="atlas-footer-bottom">
          <span>© 2026 mydiio · designed by Start Smart Technologies</span>
          {/* ponytail: keep this signal for motion tests; safe no-op if reduced */}
          <span hidden data-reduced={String(reduced)} />
        </div>
      </div>
    </footer>
  );
}
