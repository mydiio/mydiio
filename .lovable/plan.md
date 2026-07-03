## Goal

Every piece of user-facing copy on every public page pulls from a single translation source, keyed by page and section. Selecting Sinhala or Tamil visibly changes every string on screen and in `<head>`, with clearly marked placeholders where real translations still need to be written.

## Architecture

**Single translation file** at `src/lib/i18n.tsx` (already exists, will be rewritten):

- Flat but namespaced keys: `home.hero.headline`, `advertise.pricing.pioneer.title`, `drive.faq.deposit.q`, etc. — plus shared `common.*` and `nav.*` groups.
- Shape: `translations: Record<string, { en: string; si: string; ta: string }>`.
- English populated from the current live site content (verbatim).
- Sinhala and Tamil populated with clearly marked placeholders: `"[SI] Home hero headline"`, `"[TA] Pricing pioneer body"`. No machine translation, no reuse of existing (partially wrong) Sinhala/Tamil strings — they get overwritten by placeholders so real translators have a clean surface to fill.
- Existing correct SI/TA strings (nav labels, footer tagline, language switcher labels) are preserved rather than replaced with placeholders — only the English-in-SI-slot entries are swapped.

**LanguageContext** (extends existing `I18nProvider`):

- Holds `lang` state, defaults to `en` for first-time visitors.
- Persists to `localStorage["mydiio.lang"]` (already does).
- URL `?lang=xx` still respected as override.
- Exposes `useI18n() → { lang, setLang, t }`.
- `t("home.hero.headline")` returns the string for current lang, falls back to English if a key is missing (with a `console.warn` in dev).
- `setLang` triggers immediate re-render across all consumers, no reload.

**Head/meta translation:**

- `<html lang>` updates on lang change (already does).
- Route `head()` functions currently return static strings. Since `head()` can't reactively subscribe to a React context, meta is handled two ways:
  1. Route `head()` sets a default English title/description (for SSR + crawlers of the base URL).
  2. A new `<MetaSync />` component mounted in `__root.tsx` uses `useI18n()` to update `document.title` and the `<meta name="description">`, `og:title`, `og:description`, `twitter:title`, `twitter:description` tags on lang change. This gives users the live-update behavior they asked for. Language-tagged canonical variants (`?lang=si`, `?lang=ta`) already exist in root `hreflang` alternates for crawlers.
- Each route registers its per-page meta keys via a tiny `usePageMeta({ titleKey, descKey })` hook that `MetaSync` reads.

## Refactor plan (files touched)

Every file below has hardcoded English text that must be replaced with `t("...")` calls. Sinhala/Tamil placeholders are added to the dictionary at the same time.

1. `src/lib/i18n.tsx` — full rewrite: new key namespace, new dict, `usePageMeta`, `MetaSync`. Keep existing exports (`useI18n`, `LanguageSwitcher`, `I18nProvider`, `LANGS`, `Lang`).
2. `src/routes/__root.tsx` — mount `<MetaSync />`; keep root default meta as fallback.
3. `src/components/MydiioLanding.tsx` (1,189 lines) — all hero/why/how/tuk/audience/reporting/scale/founding/faq/final CTA copy → `t()`.
4. `src/routes/advertise.tsx` (1,367 lines) — hero, tier cards, pricing, how-it-works, FAQ, footer strip.
5. `src/routes/drive.tsx` (856 lines) — hero, earnings, founding group, FAQ (deposit terms), CTAs.
6. `src/routes/investors.tsx` (669 lines) — hero, market, model, traction, CTA.
7. `src/routes/about.tsx` (521 lines) — mission, pillars, problem/solution, team.
8. `src/routes/contact.tsx` (755 lines) — intent selector, form labels, confirmation copy.
9. `src/routes/advertise.apply.tsx` (545 lines) & `src/routes/drivers.apply.tsx` (752 lines) — form labels, help text, submit button, success/error.
10. `src/routes/terms.tsx` (608) & `src/routes/privacy.tsx` (614) — headings + short intro strings only; legal body remains English-authoritative with a "[SI]/[TA] Legal translation pending, English is binding" placeholder banner in non-EN langs. Cheaper than translating hundreds of clauses that will change again.
11. `src/routes/login.tsx` (649) — labels and error strings.
12. `src/components/site/SiteNav.tsx` — Sign in, Menu, close button labels.
13. `src/components/site/SiteFooter.tsx` — link labels, tagline, copyright.
14. `src/components/site/AnnouncementBar.tsx` — pilot launch banner text.
15. `src/components/site/WaitlistForm.tsx`, `AdvertiserApplication.tsx` — form UI strings.
16. `public/llms.txt` — untouched (crawler content, English-authoritative).

## Placeholder convention

For every English source string, SI and TA entries read: `"[SI] <short English hint>"` and `"[TA] <short English hint>"`. This makes untranslated content unmistakable on screen and grep-able (`rg "\[SI\]" src/lib/i18n.tsx`).

Existing SI/TA strings that are demonstrably real translations (nav labels, footer tagline, contact form labels, language names) are preserved.

## Verification

After refactor:
- `bun run build` passes.
- Toggling EN/SI/TA in the switcher visibly changes text on every route without reload.
- `document.title` updates on lang switch.
- Reload preserves lang choice from `localStorage`.
- `rg "[A-Z][a-z]+ [a-z]+" src/routes/*.tsx src/components/MydiioLanding.tsx` on hardcoded prose returns near-empty (spot check).

## Scope and cost note

This is a ~10K-line refactor across 15+ files. It will consume a substantial number of edit calls — realistically the largest single change in this project's history. If you'd prefer to phase it (e.g. landing page + nav + footer first, then advertise/drive, then legal), say so and I'll split it. Otherwise I'll proceed with the full sweep in one go.
