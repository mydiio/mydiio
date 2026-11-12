# Atlas website: Cloudflare release and rollback runbook

**Scope:** The mydiio public website, Worker `tanstack-start-app` (`mydiio.com`). Not the Eagle Eye / command Worker.

This document records the manually approved **version upload -> preview -> version promotion** process used for the 11 November 2026 Atlas release. GitHub source control, build output and active Worker deployment are three different states.

## Preflight

From a reviewed Git branch with a clean working tree:

```powershell
git status --short
git log -1 --oneline
bun install --frozen-lockfile
$env:VITE_PREVIEW_FULL_SITE = 'true'
bun run build
if ($LASTEXITCODE -ne 0) { throw 'Build failed: stop' }
Test-Path '.\dist\client\mydiio-campaign-studio-v4-4.html'
npx wrangler whoami
npx wrangler deployments status --name 'tanstack-start-app'
```

The studio file check should show `True`. Preserve the **current production Worker version ID** shown by `deployments status` before any promotion, so a rollback target is recorded. Ensure the intended Supabase build-time settings are available without putting them into Git. Confirm the build is for the full website: `VITE_PREVIEW_FULL_SITE=true`.

## Upload and inspect (does not promote production traffic)

```powershell
npx wrangler versions upload
```

Wrangler prints the new **Worker Version ID** and a `workers.dev` version URL. Open that exact URL and test desktop and mobile, navigation, Campaign Studio creative/QR preview, Pioneer copy, contact form and essential accessibility and SEO behaviour. If the site or intake is not correct, do **not** promote it.

A version URL uses the resources/bindings configured for that version; it is not necessarily an isolated test database. Do not submit real customer data when testing without appropriate authorisation.

## Promote the approved version

Only after explicit release approval, and only for the **version ID that was tested**:

```powershell
npx wrangler versions deploy
```

Select the approved version and 100% traffic when prompted. Confirm the target Worker and deployment details. Do not substitute `npx wrangler deploy`, which normally builds and deploys a new version immediately. Do not run `wrangler triggers deploy` or change DNS simply to promote a version.

Then verify:

```powershell
npx wrangler deployments status --name 'tanstack-start-app'
```

The active deployment should list the approved version at 100%. Visit https://mydiio.com/ and verify the site in a private window. Test the entire enquiry-to-Eagle-Eye path separately.

## Rollback

If production needs to return to a previously deployed Worker version, identify that known-good version from the release record and Worker deployment history. Cloudflare supports rollback by dashboard or Wrangler:

```powershell
npx wrangler deployments list --name 'tanstack-start-app'
npx wrangler rollback
```

Choose the correct **previously deployed** version and confirm its ID before accepting. A rollback changes live Worker traffic; treat it as a production action requiring approval. Confirm the active status and test the live website again.

Rollback of Worker code does **not** automatically roll back Supabase schema, data, KV, R2 or other external state. Old versions may be incompatible with later data changes.

## Important operating rules

- Never assume a GitHub PR merge automatically promotes the approved Worker. Check Cloudflare Builds settings first; if automatic deployments are configured, adjust the release plan accordingly.
- Keep `main` and `release/*` reviews separate from cloud deployment approvals.
- Do not commit `.env`, `.env.*`, `.dev.vars*` or local backups.
- When investigating forms, verify the backend actually records enquiries and that they appear in Eagle Eye. A sent-email notification alone is not end-to-end confirmation.
- Keep a log of the Git commit, Worker Version ID, approval, verification and rollback candidate for each production release.

Cloudflare reference documentation:
- https://developers.cloudflare.com/workers/versions-and-deployments/
- https://developers.cloudflare.com/workers/versions-and-deployments/rollbacks/
- https://developers.cloudflare.com/workers/wrangler/commands/workers/
