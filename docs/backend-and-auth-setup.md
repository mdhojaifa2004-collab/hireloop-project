# HireLoop — auth, backend, and data integration notes

No secret values belong in this file. Configure them only in `.env` files.

## Required environment variables

Root `.env` (loaded by `apps/web/next.config.ts`):

| Name | Purpose |
| --- | --- |
| `BETTER_AUTH_SECRET` | better-auth signing secret |
| `BETTER_AUTH_URL` | Public app URL used by better-auth |
| `BETTER_AUTH_MONGO_DB_URL` | MongoDB connection string for auth (`hireloopdb`) |
| `NEXT_PUBLIC_API_URL` | Express backend base URL, e.g. `http://localhost:5000` |
| `GOOGLE_CLIENT_ID` | Optional; Google OAuth client id |
| `GOOGLE_CLIENT_SECRET` | Optional; Google OAuth client secret |
| `NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED` | Set to `true` only after both Google values are valid |

Backend `.env` (`hireloop-server`):

| Name | Purpose |
| --- | --- |
| `DB_USER` | MongoDB user |
| `DB_PASSWORD` | MongoDB password |
| `PORT` | Express port (default `5000`) |
| `DNS_SERVER` | Optional DNS override for Atlas on some networks |

Google sign-in stays disabled in the UI unless
`NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED=true` and both Google credentials exist.
The provider is only registered server-side when credentials are present.

## Backend API (existing Express app)

- `GET /` — health check
- `GET /user` — reads the `user` collection
- `GET /jobs` — reads the `jobs` collection (newly added; previously 404)
- `POST /jobs` — inserts one job into the same `jobs` collection

Database: `hireloopdb`; collections: `user`, `jobs`.

## Static dashboard data (not yet connected)

- Admin: overview, users, jobs, payments
- Recruiter: overview, manage jobs (`initialJobs`)
- Seeker: overview, saved jobs, applications, billing, settings
- Recruiter edit page uses local demo jobs

These pages are still sample/demo data and are labelled as such in the UI.

## Safe integration plan

1. Add read-only backend endpoints first (`GET /jobs` is done; add
   `GET /jobs?recruiterId=...` only when ownership data exists).
2. Replace one page at a time with a server-side fetch, keeping the existing
   layout and components. Start with recruiter manage jobs, then admin jobs.
3. Add authenticated mutations only after the backend verifies the better-auth
   session/role. Never trust a role sent from the browser.
4. Keep sample data as an explicit loading/empty fallback, not as silent
   production data.
5. Test against a dedicated development database; never POST test records to
   production.
