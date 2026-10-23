# Push and security review, October 23, 2026

**Owner:** Bounded push review

## Decision

PARTIAL: no apparent committed credential or current dependency advisory was found. Repository-wide publication clearance remains UNKNOWN for imported skill bundles. The optional authenticated GitHub gateway needs abuse controls before public deployment. The quote-focus test still fails in all three browser engines. Do not treat this audit as unconditional push clearance.

This review leaves application code, existing frontend work, imported skills, and Git history unchanged. Only this report and the current handoff receive review notes. No install, stage, commit, push, or deployment occurred.

## Scope and method

- Non-shallow checkout on `main`, at `2a5813cbbc91f80f927885516977fa0076e164f7`. A live `git ls-remote --heads origin main` returned the same commit. No staged or untracked files existed at entry. Eleven frontend files were modified.
- All three locally referenced commits were reviewed through their file inventories, change scope, dependency locks, and secret scan. They are `aa58519` (initial ignore rules), `0fe0e55` (frontend foundation), and `2a5813c` (homepage and artwork revision).
- A temporary Python scanner examined all 961 reachable blob objects, three commit objects, and all 861 current tracked files. It used eleven rules for private keys, provider credentials, credential URLs, JSON Web Tokens, and assigned secrets. Fourteen distinct matched locations were reviewed: one illustrative FastAPI secret field, twelve dynamic token references in the imported local browser helper, and the deliberate invalid-credential URL in `src/lib/config/runtime.test.ts:15`. No apparent credential remained after classification. The tracked `.npmrc` contains only exact-version and engine settings.
- The resume received a separate scan of six decoded PDF streams. No secret pattern or PDF script, launch action, embedded file, or open action matched. Its email and profile links are intentionally public. Image pixels did not receive optical character recognition. This heuristic scan does not replace Gitleaks or prove that every possible secret format is absent.
- Manual application review covered the Node endpoint, external HTTP calls, response parsers, runtime config, routing, links, local storage, HTML, production boundaries, dependency metadata, and executable project helpers. Imported guidance received integrity and secret checks, not a line-by-line review of every bundled script. The existing Graphify graph helped find relationships; current source controlled conclusions.
- The requested Cloudflare skills were absent locally. Official [Cloudflare guidance](https://github.com/cloudflare/skills/blob/main/skills/cloudflare/SKILL.md), [Workers review skill](https://github.com/cloudflare/skills/blob/main/skills/workers-best-practices/SKILL.md), and [runtime security reference](https://github.com/cloudflare/skills/blob/main/skills/workers-best-practices/references/runtime-patterns.md) were read through Firecrawl. Relevant checks covered secrets, safe errors, request lifetime, and resource abuse. This repository has no Cloudflare deployment config or Worker entrypoint, so Workers-specific runtime checks do not apply. No Cloudflare account, WAF, or live edge configuration was tested.

## Findings

### 1. Medium: optional GitHub gateway permits quota exhaustion

Location: `api/github-contributions.ts:96-108` and `api/github-contributions.ts:130-131`.

With `GITHUB_TOKEN` configured and the function publicly mounted, unauthenticated requests can repeatedly consume the token's GitHub quota. The cache retains only five years, while input accepts many more. Concurrent misses for one year also start separate upstream requests.

A controlled, in-process reproduction used synthetic provider responses and a placeholder token. Twelve simultaneous requests for 2024 produced twelve upstream calls. Eighteen sequential requests rotating six valid years produced eighteen upstream calls. It sent no GitHub traffic and performed no production load test.

Before exposing this optional function, add rate limits at the host and share pending requests for each year. Keep the small supported-year set cached within the existing expiry, or restrict accepted years to the actual UI requirement. The default browser source uses the public relay, but a host that automatically publishes `api/` can still expose the function. Without a configured token, the existing handler returns 503 before transport.

### 2. Deployment gap: security response headers remain unverified

Location: `index.html:26-42`, `vite.config.ts:1`, and the tracked deployment-file inventory.

No tracked edge configuration sets the app shell's Content Security Policy, framing restrictions, referrer policy, or permission policy. The API sets `nosniff`, but that does not establish headers for the HTML document. No deployed target was available, so absence at an actual host is UNKNOWN.

Before deployment, set appropriate response headers at the selected host and test real responses. Account for the inline theme script with an approved hash or another explicit policy. Use only the existing service origins required by the application. A repository push alone does not prove deployment hardening.

### 3. Publication gate: imported-bundle redistribution remains UNKNOWN

Location: `THIRD_PARTY_NOTICES.md:18-26` and `skills-lock.json`.

The repository already records incomplete redistribution clearance for imported guidance. Fifteen bundles lack a top-level standalone license file. Two of those declare MIT in skill metadata. Missing local notices alone do not prove an upstream license violation, but integrity hashes do not grant redistribution rights.

Resolve the upstream terms and required notices before claiming the whole public repository is cleared for redistribution. These bundles already exist in both frontend commits. Excluding them from the next staging command cannot remove them from Git history. Any removal or history rewrite needs a separate, explicit scope.

### 4. Historical high dependency finding: corrected at current HEAD

Location: the package manifests and locks in `0fe0e55` versus `2a5813c`.

Live npm audits covered both distinct committed dependency trees. The older Vite 8.3.2 tree reports one vulnerable package with six advisories, including a high-severity editor issue. The current Vite 8.3.5 tree reports zero vulnerabilities across 256 dependencies. No package install or audit fix ran.

The historical finding does not require a Git history rewrite. Use the current lockfile when building or developing. The advisory links returned by npm include [GHSA-587h-7wmj-h5pm](https://github.com/advisories/GHSA-587h-7wmj-h5pm) and [GHSA-rq7h-c2jc-7f22](https://github.com/advisories/GHSA-rq7h-c2jc-7f22). The source-ledger version row still lists the older Vite version and is stale.

### 5. Informational: the public counter is not trusted analytics

Location: `src/lib/api/pageViews.ts:3-4` and `src/lib/api/pageViews.ts:26-35`.

The browser exposes the public counter key and increment URL by design. Its once-per-document guard cannot stop a separate client from requesting increments. Existing copy describes repeat page loads, rather than unique visitors. Keep this value decorative and do not use it for access, billing, or security decisions. No external counter increments were sent by the audit reproductions.

### 6. Quality gate: quote-focus test fails in every browser engine

Location: `tests/e2e/interaction-motion.spec.ts:46-56`.

The test expects `data-fading="true"` after its clock advance, but receives `false` before it can exercise focus cancellation. It fails in Chromium, Firefox, and WebKit, including a sequential single-worker rerun. This establishes a failing quality gate, not a confirmed security exploit or a diagnosed runtime defect. Resolve the behavior or test-timing cause before claiming the full development suite passes. No test assertion was weakened for this audit.

## Passing controls and repository checks

- The GraphQL endpoint fixes the GitHub host and profile, validates the method and year, rejects extra parameters, limits request time, and returns safe errors. The token remains server-side. The application uses escaped React text and fixed or locally owned links. No raw HTML injection, dynamic code execution, arbitrary outbound destination, or authentication token in browser storage was found in application source.
- All 256 lockfile resolutions use the npm registry and retain integrity values. Installed top-level versions match the manifest. Production disables source maps and excludes toolkit, fixture, and GitHub server-only identifiers. No dependency or lockfile changed during this review.
- `git fsck --full --no-reflogs` found no corruption. It reported 21 dangling trees, which are local objects outside the referenced push history. No tracked symlink, submodule, active Git hook, or custom hooks path exists. Twenty public SVG icons contained no matched active-content pattern. The largest reachable blob is 4,257,782 bytes. Current tracked contents total 236,605,347 bytes, mostly review images and artwork. No file exceeds 50 MiB.
- Environment files, browser caches, build output, and test output remain ignored. Root `.agents/`, `.codex/`, and `.aws/` contain no listed files and remain untouched. The staging instructions must stay inside `frontend/`.

## Current validation

Checks used Node 22.23.4 with the existing installed dependencies. The default shell uses Node 18, which does not satisfy the project engine requirement.

| Check                             | Current observation                                                                                                                                                                                                                                           |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Live current dependency audit     | Exit 0. Zero known vulnerabilities across 256 dependencies.                                                                                                                                                                                                   |
| Historical dependency audit       | Exit 1. One vulnerable Vite package in `0fe0e55`, corrected in current `HEAD`.                                                                                                                                                                                |
| TypeScript, ESLint, Prettier      | Passed again in the final `npm run check`, exit 0.                                                                                                                                                                                                            |
| Unit and HTTP contract tests      | The sandbox blocked loopback. With loopback access, all 23 tests passed.                                                                                                                                                                                      |
| Production build                  | Passed, including development-fixture and server-secret exclusion checks.                                                                                                                                                                                     |
| Documentation and skill integrity | Passed: 13 canonical owners, 13 task IDs, and 19 bundles.                                                                                                                                                                                                     |
| Production browsers               | Initial simultaneous run: 23 passed, 13 failed. A sequential rerun of the failed cases with one worker passed 13/13 in 36.1 seconds. All 36 planned cases have a passing observation on unchanged source. This was not a clean full-suite run.                |
| Development browsers              | Initial simultaneous run: 263 passed, 13 failed. Sequential rerun with one worker: 10 passed, 3 failed in 64.2 seconds. The three remaining failures are the same quote-focus test across all engines. A total of 273 unique cases have passing observations. |
| Final document checks and diff    | Passed after the final review note: scoped Prettier, `docs:check`, and `git diff --check`.                                                                                                                                                                    |

The production and development suites initially ran at the same time, with two workers each. Their failures include timeouts, closed browser sessions, GPU assertions, and quote-fade assertions. Simultaneous GPU use can affect timing, but no cause is assumed for failures that remain after isolation.

Browser versions were Chromium 153.0.8010.12, Firefox 155.0, and WebKit 26.6. External calendar and counter responses were controlled. These runs do not prove live-service availability.

The application-and-test diff SHA-256 is `8d8c6301101aa4340d6c37caaf1f7d9bdb63f27cc7827d5ae17519f934a7d5cb`. This fingerprint excludes documentation and generated test output. Older handoff receipts were not treated as current test evidence.

## Manual Git commands

After resolving any remaining publication and quality gates, use the reviewed paths below. These commands do not install dependencies or force-push.

```bash
cd /home/debrato/Projects/portfolio &&
git diff --check &&
git add -u -- frontend/ &&
git add -- frontend/docs/push-security-review-2026-10-23.md &&
git diff --cached --check &&
git diff --cached --stat &&
git commit -m "Refine homepage layout and record security review" &&
git push origin main
```

At review time, `origin/main` equals `HEAD`. A normal push rejects a later conflicting remote update. Do not use a force push to bypass that rejection.
