import { privacySections } from "../privacyContent";

export function PrivacyNav() {
  return (
    <nav aria-label="Privacy policy sections" className="privacy-nav">
      <div className="privacy-shell">
        <span className="privacy-nav-label">On this page</span>
        <ul className="privacy-nav-list">
          {privacySections.map((section) => (
            <li key={section.id}>
              <a className="privacy-nav-link" href={`#${section.id}`}>
                <span className="privacy-nav-number">{section.number}</span>
                <span className="privacy-nav-title">{section.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
