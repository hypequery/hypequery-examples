# Multi-Tenant Auth Example (Next.js)

This example shows a multi-tenant analytics service with tenant-scoped queries, an admin-only view, and a Next.js dashboard that switches tenants via a header key.

## Prereqs

- Docker
- pnpm

## Quick start

1. `docker-compose up -d`
2. `pnpm install`
3. `pnpm --filter analytics dev`
4. `pnpm --filter dashboard dev`

The dashboard runs on `http://localhost:3000` and the analytics service runs on `http://localhost:4200`.
Docs: `http://localhost:4200/api/docs` (OpenAPI at `/api/openapi.json`).

The dashboard proxies `/api/*` to the analytics service, so the browser avoids CORS issues.

## Default keys

- `acme-demo-key`
- `globex-demo-key`
- `admin-demo-key`

## Environment variables

- `CLICKHOUSE_URL` (analytics service, defaults to `http://localhost:8123`)
- `ACME_API_KEY`, `GLOBEX_API_KEY`, `ADMIN_API_KEY` (optional overrides)
- `NEXT_PUBLIC_SERVE_URL` (dashboard to analytics base URL, defaults to `http://localhost:4200/api`)
- `DASHBOARD_TENANT_KEY` (optional server-side default key)
- `NEXT_PUBLIC_DEFAULT_TENANT_KEY` (client-side default key, defaults to `acme-demo-key`)

The local ClickHouse container is configured with `default` / `demo` credentials.
Seed data is applied by a one-shot `seed` service on `docker-compose up -d`.

## What to try

- Switch tenants in the selector to confirm tenant scoping.
- Visit `/admin` with a non-admin key to confirm access is denied.
- Run `pnpm --filter analytics digest` to execute the background digest script.

## Project layout

- `analytics/`: HypeQuery Serve API + ClickHouse queries.
- `dashboard/`: Next.js app that calls the Serve API.
- `seed/init.sql`: ClickHouse seed data loaded by Docker.
- `scripts/seed.ts`: Notes about seeding behavior.
