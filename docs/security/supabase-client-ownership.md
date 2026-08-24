# Supabase client ownership

This document defines the production Supabase boundaries for the public website.

## Website project

The normal website client owns Supabase project `hjcewyfnxaqqsbjyfmmp`.

## Website browser client

Source: `src/integrations/supabase/client.ts`

Purpose:

- public website forms
- website-owned data
- browser operations governed by the website project's grants and RLS

Privilege:

- publishable browser credential
- never service role

## Website authenticated server middleware

Source: `src/integrations/supabase/auth-middleware.ts`

Purpose:

- request-scoped authenticated access to the website project
- preserve the caller's RLS boundary

Current status:

- retained as generated server infrastructure
- no current runtime caller was found during Gate D item 16

Privilege:

- publishable credential plus caller bearer token
- does not bypass RLS

## Website server administration client

Source: `src/integrations/supabase/client.server.ts`

Purpose:

- website-project server operations only

Current status:

- retained as generated server infrastructure
- no current runtime caller was found during Gate D item 16

Privilege:

- service-role credential read only from server environment variables
- must never be imported into browser code

## Eagle Eye cross-project browser client

Source: `src/lib/eagleEyeClient.ts`

Purpose:

- Eagle Eye authentication from the website login route
- advertiser self-registration through the governed Eagle Eye Edge Function

Project:

- `rmqexobhpasitrexvaig`

Privilege:

- explicitly named anonymous browser credential
- no service-role credential
- privileged registration logic remains inside the Eagle Eye Edge Function

## Removed legacy client

The unused `external-supabase` client was removed. It pointed to an unrelated third Supabase project and had no runtime callers.

## Boundary rule

Generic `supabase` refers only to the website project. Any Eagle Eye access must use the explicitly named `eagleEyeSupabase` client or a narrowly scoped Eagle Eye Edge Function.
