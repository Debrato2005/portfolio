# Testing and quality

**Owner:** Frontend quality

## Test selection

Write failing checks for observable behaviors before behavioral implementation.
Use the highest practical boundary. Do not write tests that repeat source structure.
Vitest covers runtime configuration and a real loopback HTTP boundary.
Playwright covers the three-route contract, anchor focus, inline project disclosure, keyboard dialog recovery, calendar state, page-view deduplication, the running cat, reflow, and Axe.
The background browser suite reads GPU pixels against the supplied assets, exercises both themes, trail settling/idle draws, passive touch, reduced motion, WebGL failure, context loss, pending-decode races and texture disposal. It runs against both development and production builds.
Test Chromium, Firefox, and WebKit with the pinned package runtimes.
Linux loopback journeys use GIO’s direct proxy resolver through test-process configuration.
A substitute browser pass must name the substitute. Do not call it a pinned-engine pass.

## Quality commands

Run `npm run check` for typecheck, ESLint, Prettier, unit tests, build, docs, and skill integrity.
Run `npm run browsers:install` once when browser versions change.
On Ubuntu 24.04, use `npm run browsers:deps` when WebKit lacks native libraries.
The helper extracts two pinned Ubuntu packages and links libraries into WebKit’s bundled loader directories.
It does not run system installation scripts or replace browser executables.
Run `npm run test:e2e` for development and `npm run test:e2e:production` for production.
Production checks use dedicated port 4317. The normal preview keeps port 4173.
Development browser checks use dedicated port 5197 so an interactive development
server on port 5173 can stay running. `PORTFOLIO_E2E_PORT` overrides the test port.
Keep `reuseExistingServer` disabled to verify the server started by the test run.
Run `git diff --check` and inspect scoped diffs before reporting completion.
Network and loopback restrictions are environment limits. Do not silently replace required HTTP or browser evidence with mocks.

## Production and performance gate

Production rejects fixture configuration. The build manifest and emitted JavaScript must exclude the toolkit and fixture marker.
Production browser checks confirm that only `/`, `/blogs`, and `/photography` render portfolio content and that legacy/detail paths recover as not found.
Maintain declared image sizes and stable loading space. Lazy-load heavy controls.
PLANNED: measured performance budgets after real portfolio content exists.

## Evidence limits

Fixture behavior does not prove a live API. A build does not prove runtime behavior.
Axe does not prove complete WCAG conformance. Documentation checks do not prove semantic truth.
Record actual commands, exit results, engine versions, and blocked checks in handoff.
Screenshots support layout review. They do not replace interaction tests.

## Complete-brief coverage

The daily calendar tests use explicit provider responses to check count validation, seven-row placement, retry, cancellation, UTC dates and accessible exploration.
Separate live-browser evidence checks the public relay and counter without network interception. Routine journeys intercept both services so test runs do not add page views.
The gallery test injects development-module test images inside the browser test only. No fixture photo is shipped as personal content.
The production gate rejects the toolkit, fixture markers and server-only GitHub identifiers in emitted JavaScript.
Current runtime receipts and controlled local performance measurements belong in the handoff and design QA. They are not field Core Web Vitals.
