# Production record: Atlas 11 November 2026

## Release identifiers

- Public site: https://mydiio.com/
- Cloudflare Worker: `tanstack-start-app`
- Approved live Worker version: `80bd7df6-368f-4b40-b1f8-fb80b598ce2f`
- Approved version URL: https://80bd7df6-tanstack-start-app.mydiiomedia.workers.dev/
- Source snapshot Git branch: `release/atlas-production-20261111`
- Original byte-matched source snapshot commit: `653c6d8a1c5cf91ea5729bfbe189f13643392280`
- Subsequent whitespace-only housekeeping commit: `eee98c0a300fe8fdad70e06c9542c01db4a21aaa`
- Pull request to align `main`: https://github.com/mydiio/mydiio/pull/3 (kept in draft during housekeeping)

## Source snapshot verification

- 152 staged production source and asset paths matched the approved isolated release working directory by SHA-256 (zero reported mismatches).
- Automated initial scan reported zero suspicious credential-pattern findings and no staged backup/build/secret-like paths. This does not substitute for human security review.
- Independent `bun run build` succeeded with `VITE_PREVIEW_FULL_SITE=true`.
- Cleanup following snapshot: 10 source files had trailing whitespace / extra EOF blank lines removed. This was committed separately and rebuilt successfully. The original snapshot is retained in history.

## Included production features

- Atlas public website and responsive mobile operating diagram.
- Homepage Campaign Studio teaser, public Campaign Studio HTML and its assets.
- Pioneer founder offer wording: price protection for 12 months; no category exclusivity.
- Advertiser, driver and contact pages; social assets, SEO, fonts and brand styles.

## Open verification item

End-to-end contact form -> Supabase/notification -> Eagle Eye intake has not been confirmed by a live test as part of this source snapshot. Do not treat a successful build or email notification as proof of Eagle Eye receipt.

## Provenance and caution

The active Worker version was uploaded and promoted separately from GitHub. Source commit `653c6d8` was assembled from the approved isolated Windows release directory, after deployment, and verified against those files. The later whitespace cleanup changes the Git bytes but does not indicate that a new Worker version was deployed.

The production release worktree used at the time was `C:\Users\rukim\Documents\mydiio-atlas-release-20261106\site`; the separate version-control snapshot worktree was `C:\Users\rukim\Documents\mydiio-atlas-production-snapshot-20261112`. These are historical operator paths, not paths expected on another machine.

See [atlas-deployment.md](atlas-deployment.md) for future release and rollback steps.
