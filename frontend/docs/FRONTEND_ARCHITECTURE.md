# Frontend architecture

**Owner:** Frontend architecture

## One-way module dependencies

Application shell → routes → features → shared controls and libraries.
Shared controls and libraries do not import app, routes, or features. Use direct imports without barrel files.
ESLint blocks upward imports from shared modules and transport calls in presentation code.
A future cross-feature dependency needs an explicit boundary review.

## API transport and contracts

`src/lib/api/client.ts` owns HTTP GET transport, optional AbortSignal, HTTP status checks, and safe errors.
It parses JSON as unknown and calls a required adapter before returning a frontend model.
Tests exercise successful, invalid, failed, and canceled responses against a real loopback server.
CURRENT: GitHub profile, contribution and page-view adapters validate unknown data. The contribution adapter defaults to the public calendar relay so static production works without a secret.
`api/github-contributions.ts` owns optional server-only GraphQL access; Vite mounts it for development. The static production preview does not execute the serverless handler.
Never replace a failed live call with fixture data. Production builds reject fixture mode and exclude development fixture modules.

## State and submissions

Use component-local React state for temporary UI choices and URL query state for shareable filters.
Pass AbortSignal to requests. Ignore stale completion after unmount or a newer request.
The QR example cancels its local state updates after cleanup.
PLANNED: duplicate-submit protection and uncertain mutation feedback when mutation flows exist.
Do not claim these policies are implemented without a consumer and tests.

## Authentication and privacy

Every browser environment value is public. Keep credentials and tokens out of config, URL queries, logs, and local storage.
The current HTTP client omits credentials. Authentication is DEFERRED until an explicit server contract exists.
Do not place database access in browser code. Safe user errors exclude raw payloads and stack traces.
The shell has an error boundary with reload recovery. API errors stay visible to the owning future feature.

## Loading and replacement boundaries

CURRENT: `features/portfolio/` owns supplied content, theme state, command search, name animation, project filters and quotes.
The route tree contains `/`, `/blogs` and `/photography` plus unmatched-path recovery. The homepage composes projects, experience, hackathons, GitHub activity, skills and contact; project and event depth uses inline disclosure. Typed content owns projects, experience, articles and photo collections; `src/lib/links.ts` owns contact and repository destinations. Base UI owns dialog focus trapping and dismissal.
The palette waits for dialog close completion before navigation. Contribution requests cancel stale work and allow retry.
The page-view request is shared across StrictMode and route remounts. It increments once per document load. After an uncertain failure, retries only read the persistent total.
The running cat is decorative, ignores pointer input, stops when hidden and does not render for coarse pointers or reduced motion.
The [artwork contract](artwork-contract.md) owns the hero scene boundary. `BackgroundScene` keeps decorative sketch fallbacks independent of a lazily imported WebGL renderer. Artwork/defaults, GPU lifecycle, shaders and CSS contrast/crop have separate owners. [Background review](sketch-to-color-background.md) records the implementation and acceptance limits.

`styles/reference-refinement.css` owns the shared screenshot composition and responsive reading geometry. `styles/project-cards.css` owns the complete compact project overview and native brief presentation. Feature styles retain the activity and photography behavior. The app imports these after the base portfolio styles.

The development toolkit is not part of the application route tree. Its fixtures never enter the production bundle.
Self-hosted font CSS emits local WOFF2 assets. No external font service is required.
Wrap Base UI in shared controls. Keep the DayPicker consumer in its calendar feature.
Use [source rules](SOURCE_LEDGER.md) for consumers, licenses, and replacement choices.

## GitHub deployment boundary

The fixed-profile gateway accepts a validated GET year, keeps `GITHUB_TOKEN` server-side, limits provider time and cache size, and returns safe errors.
The shared calendar parser checks ordered UTC dates, daily counts, levels and the exact total. It rejects incomplete data.
The public relay returns public profile calendar data and caches responses for up to one hour. The adapter rejects malformed, incomplete, reordered or inconsistent values.
`VITE_GITHUB_CONTRIBUTIONS_SOURCE=github-graphql` selects the optional official path. Missing credentials block only that path.
No private repository detail is queried. No static bundle may contain a token.
