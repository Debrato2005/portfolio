# Portfolio frontend

**Owner:** Frontend entrypoint

## Current status

CURRENT (October 29, 2026): the homepage is a paper **case file**: a manila folder cover, then divider-tabbed sheets for Work, Experience, Skills, Beyond code, GitHub and Contact, and a kraft back cover. See [the design record](DESIGN.md) and [the handoff](docs/HANDOFF.md).
All content is taken from the owner's resume (`public/Debrato-Ghosh-Resume.pdf`) and the public GitHub profile. The former hackathon records, blog links and photography placeholders were removed because neither source supports them; the Bear Blog address returns 404.
Only `/` is a portfolio route; every other address shows the 404 page. GitHub counts and the contribution calendar load live and show honest unavailable states. The back cover shows the persistent page-view counter. No deployment has been made.

## Commands

Use Node from `.nvmrc`. Install with `npm ci` and retain one `package-lock.json`.

| Command                        | Purpose                                                                  |
| ------------------------------ | ------------------------------------------------------------------------ |
| `npm run dev`                  | Static-content development at http://127.0.0.1:5173                      |
| `npm run dev:fixture`          | Explicit development fixtures                                            |
| `npm run dev:live`             | Validate the optional general API boundary                               |
| `npm run preview`              | Production preview at http://127.0.0.1:4173                              |
| `npm run typecheck`            | Strict TypeScript                                                        |
| `npm run lint`                 | ESLint and module/transport boundaries                                   |
| `npm run format:check`         | Prettier                                                                 |
| `npm test`                     | Vitest contracts and real loopback HTTP                                  |
| `npm run build`                | Production build and fixture exclusion                                   |
| `npm run docs:check`           | Document structure, links, anchors, and queue                            |
| `npm run skills:check`         | Bundle integrity                                                         |
| `npm run check`                | All non-browser gates                                                    |
| `npm run browsers:install`     | Workspace-local Chromium, Firefox, and WebKit downloads                  |
| `npm run browsers:deps`        | Extract two pinned Ubuntu 24.04 libraries locally when WebKit needs them |
| `npm run test:e2e`             | Development browser journeys and Axe                                     |
| `npm run test:e2e:production`  | Production browser checks                                                |
| `npm run graph:build`          | Code-only Graphify graph with the configured local runtime               |
| `npm run graph:query -- "App"` | Query the existing code graph                                            |

## Environment

Copy `.env.example` only when configuration is needed. Static mode works without a backend.
Live mode requires `VITE_DATA_MODE=live` and an HTTP `VITE_API_BASE_URL` without credentials.
The general API URL config is separate from the same-origin GitHub gateway.
Production rejects fixture mode. There is no automatic fallback from live mode.
`VITE_GITHUB_CONTRIBUTIONS_SOURCE` defaults to `public-calendar`. Set it to `github-graphql` only when the hosting environment runs the same-origin gateway and supplies `GITHUB_TOKEN`.
Browsers live in ignored `.local/browsers/`. Optional `PLAYWRIGHT_BROWSERS_PATH` overrides this location.
Downloads and loopback tests can need permission under sandbox restrictions.
Development browser checks start their own server on port 5197, separate from
the interactive preview on port 5173. Set `PORTFOLIO_E2E_PORT` to use another port.
Firefox and WebKit downloads use the official fallback CDN by default.
On Ubuntu 24.04, `npm run browsers:deps` extracts libraries into `.local/system-libs/` without system installation.
The helper links missing libraries into WebKit’s bundled loader directories.

## Structure

`src/app/` owns the shell, router, focus, and error recovery.
`src/routes/` composes pages. `src/features/` owns behavior.
`src/components/ui/` wraps shared controls. `src/lib/api/` owns transport and validation seams.
`src/lib/config/` owns public runtime configuration. `src/styles/` owns CSS tokens.
`public/` owns assets and licenses. `tests/e2e/` owns browser journeys.
`docs/` owns contracts and evidence. `.agents/skills/` owns imported guidance.

Read the [document index](docs/README.md) and [current handoff](docs/HANDOFF.md).

## Design context

Run `sh scripts/impeccable.sh context` from `frontend/`, or
`sh frontend/scripts/impeccable.sh context` from the repository root.
The wrapper loads project context from the frontend and keeps the pinned engine in
ignored `.local/impeccable/`. The first run downloads the engine and verifies its checksum.
It can need download permission; later runs reuse the cached executable.
Imported skill files and the lock remain unchanged.

## Live public services

The default calendar reads Debrato's public profile through the open-source GitHub Contributions API relay.
The adapter checks the account, year, ordered UTC dates, daily values, levels and exact total before rendering.
The relay can lag GitHub by up to one hour. A provider failure stays unavailable and never becomes fixture data.

The optional official path needs `GITHUB_TOKEN` in the server process. Never use a `VITE_` token.
`GET /api/github-contributions?year=2026` accepts only a supported year and a fixed public profile. Without a server token it returns a safe 503 response.
The handler in `api/github-contributions.ts` is compatible with a Node serverless function. A static Vite preview alone does not execute it.
The gateway shares pending requests and caches every supported year for five minutes. Each Node process permits twelve upstream attempts per minute window.
Before exposing the optional gateway, configure shared host rate limits across instances. Deployment also needs tested security headers for the HTML document.
The page-view counter records one page load per browser document through Miles Hilliard CountAPI. It includes repeat visits and is not a unique-visitor measure.
No deployment has been made.
