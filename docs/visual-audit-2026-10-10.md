# mydiio visual audit and polish — 10 October 2026

Status: prepared locally for preview deployment. This is a presentation update to the approved launch content. No pricing, refund policy, vehicle eligibility or backend API contract was changed.

## Findings and corrections

| Finding | Correction |
| --- | --- |
| Driver pages replaced the brand navigation and footer with plain links | Shared Atlas navigation, wordmark, mobile menu and footer restored; driver-language labels supported |
| Driver content presented as a continuous text block | Image-led introduction, clear earnings cards, eligibility section, numbered process, document checklist and closing action |
| Joining fee and ongoing earnings lacked visual distinction | Separate cards with the existing LKR 4,000 + up to LKR 2,000 and LKR 5,000 wording preserved |
| Application fields lacked grouping | Contact, vehicle and route fieldsets; readable labels, consistent controls, consent layout and feedback states |
| Contact form used different widths, colours and controls | Aligned to the contact page shell; explanatory column and branded form surface |
| Newly added campaign sections used a separate beige background and type scale | Shared Atlas cream/ink/amber palette, spacing, typography, card borders and disclosure styling |
| Old driver CSS overrode colours in the new page | Removed the unused route-level stylesheet and checked closing-section contrast |
| Navigation initially rendered white on light pages | Explicit initial tones, including dark homepage/about and light driver/advertiser pages |
| Hidden mobile navigation could remain keyboard-focusable | Closed menu is inert until opened |
| External font loading caused inconsistent fallback rendering | Self-hosted Space Grotesk, Space Mono, DM Serif Display and Sinhala/Tamil fonts; font licences included |
| A very early form interaction could submit before React was ready | Forms become interactive after client readiness; submission controls stay disabled beforehand |

## Visual system retained

Cream #FDFAF3, ink #1A1A18 and amber #F5A623. Space Grotesk for display and body, Space Mono for labels, DM Serif Display for existing editorial accents. Rounded amber primary actions, quiet border treatments, shared gutters and deliberate spacing. Existing site animations and approved informational content remain.

Driver imagery is an existing sample asset and is explicitly labelled illustrative. It is not a testimonial or a claim about a real enrolled driver.

## Verification

Rendered home, advertise, advertise/apply, drive, drivers/apply, contact, about, privacy and terms at 1440px desktop and 390px mobile. No horizontal page overflow or client runtime errors were detected in the visual sweep. Inspected screenshots, including multilingual driver rendering. Investor route remains a redirect to contact in full mode.

Build, TypeScript and existing commercial/waiting-list contract checks run before packaging. Form tests use intercepted responses: no real enquiry or email is sent. Browser checks do not verify delivery into the production admin database.

## Deployment

Use run-visual-preview.sh from the bundle. It checks source file hashes against the successful launch update, creates a new isolated copy, uses npm ci when an npm lockfile is present and npm install otherwise, validates the public build configuration, and deploys only mydiio-website-preview. No backend function deployment or GitHub push is included.
