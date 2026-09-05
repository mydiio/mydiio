# Pre-launch waiting-list mode

The public website is temporarily governed by `src/config/publicSiteMode.ts`.

- `waitlist` shows the advertiser waiting-list page and redirects public marketing routes to it.
- `full` restores the complete public website without rebuilding removed pages.

Operational routes remain available in either mode:

- advertiser sign-in
- driver applications
- passenger ride sharing and QR redirects
- privacy and terms
- the XML sitemap

Waiting-list submissions use the existing `submit-application` Edge Function and enter
`advertiser_applications`. They are tagged with `referral_source = 'Website waiting list'`, so Eagle
Eye can label and filter them without a parallel lead database.

Before switching to `full`, run both website contract checks and the production build.
