# Approved website changes — 10 October 2026

Status: implemented in source; not remotely deployed. The public default remains waiting-list mode. A full preview build requires `VITE_PREVIEW_FULL_SITE=true`.

## Commercial schedule

All amounts LKR, excluding applicable taxes. Screen minutes are total across allocated vehicles, not per vehicle. Vehicle counts are upper limits; the actual allocation, coverage and start date must be agreed.

| Package | Fee | Total minutes | Vehicles / coverage | Availability |
| --- | ---: | ---: | --- | --- |
| Roamer | 25,000/month | 500/month | Up to 5 accepted vehicles | November launch reservations |
| Pioneer | 85,000/month | 2,000/month | Agreed coverage | November launch; max 10 active places |
| Voyager | 150,000/month | 5,000/month | Up to 15 | Coming later; interest only |
| Horizon | 250,000/month | 10,000/month | Up to 25 | Coming later; interest only |
| Spark | 12,000 total | 200 | Up to 5; 7 days | Coming later; interest only |
| Blast | 33,000 total | 600 | Up to 10; 14 days | Coming later; interest only |
| Surge | 40,000 total | 800 | Up to 25; 30 days | Coming later; interest only |

Monthly plans have a three-month minimum. Advertiser reservation: 10,000 credited to the first invoice. No free trial. No deposit for future-package interest. Pioneer price protection lasts 12 months from activation; subsequent increases require 30 days' written notice and the appropriate billing boundary. Vacated places may be reoffered.

Activation requires the approved written order, approved creative, cleared advance, agreed operational fleet, and the first eligible completed paid play on or after the agreed start. Tests, previews, partial and unapproved early plays do not qualify. The activation timestamp starts the paid term.

Before activation, campaign payments are refundable, counting the deposit once. Only separately commissioned creative explicitly approved in advance as chargeable and non-refundable may be deducted. Cancellation eligibility uses receipt time, not processing time. Refunds: seven business days after request and necessary payment details. Missed latest start: revised date or full campaign-payment refund.

Minimum-term charges remain payable for change of mind after activation. Monthly continuation then lasts until active cancellation before the next period; cancellation takes effect at the end of the paid period. No new minimum solely on renewal. Underdelivery: customer chooses extension, credit or proportional refund; refund within seven business days after reconciliation and selection. Remedies do not automatically end the remaining term.

## Customer acquisition and content

- Colombo-wide enquiries for the planned November 2026 launch; actual capacity confirmed before booking.
- Immediate homepage offer and reservation CTA; launch packages separated from future plans.
- Included reporting, support and portal access; explicit targeting, audience, coverage and creative limitations.
- Creative specifications and submission process; design/substantial edits separately agreed and charged.
- Example campaigns and reports clearly illustrative. Professional photography/video remains to be supplied.
- Attention Insights is a separately approved optional pilot; pricing after pilot assessment.
- Company name, registration and address retained; no founder identification.
- No public business email addresses; privacy enquiries use the contact form.
- Response usually within 24 hours; up to 48 in exceptional cases.
- Future transport expansion distinguished from current availability; partnership enquiry fields added.

## Driver intake

- Contact and preferred language; registration, model, manufacture year and ownership; routes, operating days/hours.
- Age calculated from manufacture year. Vehicles over 15 years flagged for exceptional review with required condition/maintenance details, not automatically rejected.
- Published safety criteria and later document requirements: NIC, licence, registration, appropriate insurance, owner consent, latest applicable inspection/fitness certification and relevant permits/documents/photos.
- Initial enquiries do not collect NIC, date of birth or bank details.
- Inspection and acceptance precede the 5,000 joining fee and installation booking. Refundable until successful installation; equipment remains mydiio property.
- 4,000 base plus proportionate bonus up to 2,000 at 260 eligible service hours. No speed/distance incentive; mydiio-caused downtime protects base payment.
- English, Sinhala and Tamil page/form copy with browser preference detection, manual switcher and preferred-contact-language capture. Personal entries never sent to translation services. Native-speaker review remains pending.

## Data and deployment

First-party enquiry attribution stores source/landing paths, supplied campaign tags and successful submissions with existing enquiry records. No new analytics vendor, tracking pixel or database migration. Existing IP rate limits remain; added honeypot, timing, contact and payload validation.

The backend overlay targets `mydiiomedia/mydiiocommand`, functions `submit-application` and `submit-enquiry`, project `rmqexobhpasitrexvaig`. These functions also serve the existing website; legacy intake remains supported. Backend changes do not modify billing or signed contracts.

Checked: TypeScript, full preview build, existing Attention Insights and waiting-list contracts, actual backend handlers with mocked storage/email, and HTTP server rendering of nine main pages. Browser interaction/visual review could not run because the browser download failed. No real enquiry was submitted. Before launch, check desktop/mobile layouts, all language switches, and a controlled submission received in the admin system.
