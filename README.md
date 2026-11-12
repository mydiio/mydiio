# mydiio Atlas website

This repository contains the **mydiio public website** (Atlas), built with TanStack Start, React, Vite and Cloudflare Workers. It includes the advertiser and driver pages, the public campaign studio and the responsive homepage.

The website is separate from the Eagle Eye / command application. Changes to this repository do not automatically update Eagle Eye.

- Public website: https://mydiio.com/
- Worker name: `tanstack-start-app`
- Default Git branch: `main`
- Production baseline (11 November 2026): `release/atlas-production-20261111` (original snapshot commit `653c6d8`)
- Release runbook: [docs/atlas-deployment.md](docs/atlas-deployment.md)
- Release record: [docs/atlas-release-2026-11-11.md](docs/atlas-release-2026-11-11.md)

## Requirements

- Git
- Bun (use the version approved by the project when available)
- Node.js / npx for Wrangler commands
- Cloudflare account access **only when deploying**
- Access to the appropriate Supabase project settings for local builds and forms

## Install and build

Run these commands from the repository root, not from `src`:

```powershell
bun install --frozen-lockfile
$env:VITE_PREVIEW_FULL_SITE = 'true'
bun run build
```

The full website is deliberately **not** the default build mode. `src/config/publicSiteMode.ts` chooses `waitlist` unless `VITE_PREVIEW_FULL_SITE` is exactly `true`. Do not promote a build unless this variable is confirmed.

Depending on the build environment, additional variables may be required:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

These are project configuration values, not examples to invent. Get them from the authorised project environment; never put real values in Git or public documentation. A local `.env.local` file can be used for development and is ignored by Git.

`bun run dev` starts local development. See `package.json` for optional lint and visual QA commands. Visual QA may require browser tooling not available in every environment.

## What to check before changing the live site

1. Build with the **full** site enabled and check for errors.
2. Inspect the homepage, mobile operating diagram, campaign studio, advertiser / Pioneer terms, contact page, drivers page and page navigation.
3. Verify expected files are present in the compiled client output, particularly `mydiio-campaign-studio-v4-4.html`.
4. Check enquiry submissions reach their intended backend and Eagle Eye workflow; a successful build does not prove end-to-end delivery.
5. Upload a non-production Worker version, review its version URL, then promote that **exact tested version** with approval.

For exact release, rollback and Cloudflare commands, see [docs/atlas-deployment.md](docs/atlas-deployment.md).

## Git workflow

Make changes on a feature or release branch and open a pull request against `main`. Keep the release branch and production versions available until a new release has been validated. Do not use `git reset --hard`, `git clean -fdx`, history rewrites, or force pushes as housekeeping shortcuts. Local backups should stay outside tracked source.

**A GitHub merge is not proof that a Cloudflare version is live.** Check the Worker deployments separately. If GitHub is connected to automatic Cloudflare Builds, verify that setting before merging or pushing to any deployment branch.
