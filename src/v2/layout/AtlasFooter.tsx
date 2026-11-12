import { useReducedMotion } from "@/motion";
import { colors } from "@/design";
import { layoutCopy, type LayoutLocale } from "./layoutCopy";
import "./atlas-footer-option1.css";

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
  { label: "Contact form", href: "/contact" },
  { label: "WhatsApp", href: "https://wa.me/94707471002" },
] as const;

const TAGLINE = "Every journey, connected.";
const LANGUAGES = "Driver pages: English · Sinhala · Tamil";

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

function FooterBrand({ locale }: { locale: LayoutLocale }) {
  return (
    <div className="atlas-footer-brand">
      <div className="atlas-footer-logo" aria-label="mydiio">
        <span>myd</span>
        <span style={{ color: colors.amber }}>ii</span>
        <span>o</span>
      </div>
      <p className="atlas-footer-positioning">
        {layoutCopy(
          "Sri Lanka’s first connected passenger advertising network.",
          locale,
        )}
      </p>
      <p className="atlas-footer-brand-signoff">{layoutCopy(TAGLINE, locale)}</p>
      <p className="atlas-footer-meta">
        Start Smart Technologies Private Limited
        <br />
        Registration PV00370438
        <br />
        23, 5th Lane, Ratmalana, Colombo, Sri Lanka
      </p>
    </div>
  );
}

export function AtlasFooter({ locale = "en" }: { locale?: LayoutLocale }) {
  const t = (label: string) => layoutCopy(label, locale);
  const localLinks = (links: readonly FooterLink[]) =>
    links.map((link) => ({ ...link, label: t(link.label) }));
  const reduced = useReducedMotion();

  return (
    <footer data-atlas-footer className="atlas-footer">
      <div className="atlas-footer-inner">
        <div className="atlas-footer-grid">
          <FooterBrand locale={locale} />
          <FooterColumn heading={t("Explore")} links={localLinks(PRODUCT_LINKS)} />
          <FooterColumn heading={t("Company")} links={localLinks(COMPANY_LINKS)} />
          <FooterColumn heading={t("Reach us")} links={localLinks(CONTACT_LINKS)} />
        </div>

        <div className="atlas-footer-rule">
          <span className="atlas-footer-rule-tagline">{t("Built in Sri Lanka")}</span>
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
