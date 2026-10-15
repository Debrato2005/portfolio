# Illustrated portfolio implementation plan

> Use superpowers:executing-plans for native implementation in this workspace. Leave work uncommitted.

**Goal:** Build the supplied light/dark layout and its controls, retaining explicit boundaries for missing artwork and live data.
**Architecture:** The app owns persistent navigation, theme and search. The portfolio feature owns sourced content and section interactions. The homepage and photography route compose these features.
**Tech stack:** Existing React, TypeScript, Base UI, CSS and Playwright. No new dependencies.
**Spec:** [selected design](../../design-decisions.md), [interactions](../../interaction-spec.md), and the two user-supplied screenshots.

## Constraints

- The owner's new screenshots replace earlier visual proposals as the target.
- The owner will supply four artwork files. Implement the shader after those files arrive.
- Preserve real content boundaries: no invented jobs, awards, photographs, contribution totals or visitor counts.
- Preserve the development toolkit and production exclusion checks.
- Do not install packages, publish, commit or alter protected root files.

## Review focus

- Theme choice survives reload; unavailable storage still allows a current-session choice.
- Search opens by keyboard, filters results, navigates and returns focus after Escape.
- Reduced motion bypasses name scrambling and automatic quote changes.
- Missing photographs and activity data stay distinguishable from real zero values.
- The layout remains within the viewport at 320px and 200 percent text size.

## Task 1: Observable behavior checks

Files: `tests/e2e/portfolio.spec.ts`, existing foundation and production specs.

- [x] Add tests for saved theme, search navigation/focus, project filters, photography route and reduced motion.
- [x] Run the new Chromium checks and observe failures caused by absent controls.
- [x] Update the old heading expectation to the supplied identity.

## Task 2: Layout and interactions

Files: `src/app/App.tsx`, `src/routes/HomePage.tsx`, `src/routes/PhotographyPage.tsx`, `src/features/portfolio/`, `src/styles/portfolio.css`, `index.html`.

- [x] Build the screenshot's section order, serif identity, orange accent, compact cards and cream/charcoal surfaces.
- [x] Implement theme persistence, Base UI palette, one-run name scramble, project filters and controllable quotes.
- [x] Create a photography detail route with honest empty content until personal images arrive.
- [x] Keep contribution and view totals unavailable until a real service exists. Do not render generated counts.
- [x] Run the behavior suite and fix failures.

## Task 3: Verification and ownership

- [x] Run configured static, unit, build, document and skill checks.
- [x] Run browser suites and capture light/dark/mobile screenshots.
- [x] Compare screenshots with the supplied references; record missing artwork as an acceptance limit.
- [x] Record the four-image alignment contract and current implementation in canonical owners; write handoff last.

Full artwork fidelity, populated photography, official GitHub integration and page-view persistence require supplied assets or a hosting/service decision.
