import { termsSections } from "../termsContent";

export function TermsNav() {
  return (
    <nav aria-label="Terms and conditions sections" className="terms-nav">
      <div className="terms-shell">
        <span className="terms-nav-label">On this page</span>
        <ul className="terms-nav-list">
          {termsSections.map((section) => (
            <li key={section.id}>
              <a className="terms-nav-link" href={`#${section.id}`}>
                <span className="terms-nav-number">{section.number}</span>
                <span className="terms-nav-title">{section.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
