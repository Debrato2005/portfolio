# Push and security fixes, October 24, 2026

**Owner:** Security remediation evidence

## Decision

CURRENT: source fixes address the dependency advisory, upstream request amplification, quote-test setup, and missing guidance notices from the previous review.
The handoff records the final push decision and browser results.
Public deployment remains DEFERRED until the selected host applies shared traffic limits and security headers.

## Scope

The worktree was clean at entry on `main`, at `e63f98f57a292705ff6ba61fe766e113553b78a3`.
A live remote check returned the same commit for `origin/main`.
The review covered four reachable commits, 962 reachable blobs, and 862 tracked files.
Eleven credential-pattern rules scanned reachable blobs and current files without printing matched values.
The only match was the deliberate invalid-credential URL at `src/lib/config/runtime.test.ts:15`.
The scan found no apparent credential. This heuristic scan does not prove that every possible secret format is absent.
The largest reachable blob is 4,257,782 bytes. No tracked symlink or submodule exists.

Application review covered HTTP boundaries, response adapters, environment handling, browser storage, links, dynamic execution, and the optional Node handler.
The browser source keeps credentials out of client config and omits request credentials.
The application source contains no raw HTML insertion, string evaluation, or cross-window message handler.
No private GitHub data or real token was used for the handler tests.

## Findings and fixes

### 1. High dependency advisory: corrected

Location: `package-lock.json:3656`.

The live npm audit identified Zod 4.6.5 through ESLint's React hooks tooling.
The [upstream advisory](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5) describes memory exhaustion during validation of oversized collections.
Zod is a development dependency here. The review found no application request path that exposes its vulnerable parser.
The targeted update installed Zod 4.6.7 without package lifecycle scripts. Only the Zod lock entry changed.
The final live audit reports zero known vulnerabilities.

### 2. Medium quota amplification: corrected within each process

Location: `api/github-contributions.ts:106` through `api/github-contributions.ts:169`.

Concurrent callers now share one pending request per year.
All supported years remain cached for five minutes, so rotating six years no longer evicts the first one.
A process-wide budget permits twelve upstream attempts per sixty-second window. Failed attempts also consume the budget.
The handler returns 429 with `Retry-After` when this budget is exhausted.
Cached data and pending requests remain available without another upstream attempt.
Failed shared requests clear so later calls can retry. Existing timeouts and safe errors remain intact.

Four regression assertions failed before the implementation changed. The resulting contract tests pass.
The tests cover twelve concurrent callers, failure recovery, year rotation, exhausted budgets, cache access during exhaustion, and window expiry.
The controls protect one process. They do not coordinate serverless instances or replace host traffic limits.

### 3. Quality gate: corrected quote-test setup

Location: `tests/e2e/interaction-motion.spec.ts:25` through `tests/e2e/interaction-motion.spec.ts:85`.

The previous quote-focus failure reproduced in Chromium, Firefox, and WebKit.
The test now explicitly starts a fresh playback cycle before it advances the paused browser clock into the fade.
Keyboard activation avoids pointer actionability waits while that clock is paused.
The assertions still require a pending fade, cancellation on source focus, preserved text, and preserved keyboard focus.
The application quote component did not change.

### 4. Guidance notices: recorded

Location: `THIRD_PARTY_NOTICES.md:25` and [guidance licenses](licenses/README.md).

The license record lists declared upstream terms for all nineteen preserved bundles.
Missing Apache, MIT, CC0, and attribution texts now live outside the bundles.
The record also includes notices for Impeccable's platform references and screenshot helper.
The source receipt retains download URLs and hashes.
Graphify's original import commit remains unrecorded. The record identifies the upstream license snapshot separately from the original import.
The existing skill lock and all imported bundle files remain unchanged.

## Checks

The development browser run passed 275 of 276 cases with one worker. One WebKit document load timed out at a legacy address.
That unchanged navigation case then passed three isolated repetitions. Every development case has a passing observation, but the complete run was not clean.
All twelve motion cases passed across Chromium, Firefox, and WebKit, including the formerly failing quote-focus case.
The final isolated production run passed all 36 cases across the three engines with one worker.
The first production run passed 35 cases. Its WebKit mobile case received a 404 for the renderer chunk during an overlapping check build.
The isolated rerun used a stable build. No renderer source changed to obtain that pass.
The bounded diff and `git diff --check` passed. New license files also passed whitespace and receipt-hash checks.
The non-browser suite passes with Node 22.23.4: TypeScript, ESLint, Prettier, 26 unit and contract tests, production build, docs, and nineteen skill bundles.
The production boundary excludes development toolkit, fixture, and server-only GitHub identifiers from browser JavaScript.
The registry audit reports zero known vulnerabilities after the targeted Zod update.

## Deployment limits

No hosting target, Cloudflare account, WAF, or deployed response was configured or tested.
Before public deployment, apply shared request limits across instances if the authenticated gateway is exposed.
Set and test the HTML response policy for content sources, framing, referrers, browser permissions, and MIME sniffing.
The content policy must account for the existing inline theme script and required public service origins.
Keep `GITHUB_TOKEN` server-side. The default public calendar needs no token and static Vite hosting does not execute the optional handler.
The public counter remains a page-load indicator, not trusted analytics.

## Manual Git commands

The handoff records the final push decision. These commands keep staging inside the reviewed frontend scope.

```bash
cd /home/debrato/Projects/portfolio &&
git diff --check &&
git add -- frontend/ &&
git diff --cached --check &&
git diff --cached --stat &&
git commit -m "Harden contribution gateway and resolve push-readiness checks" &&
git push origin main
```

No stage, commit, push, history rewrite, or deployment occurred during this review.
The report draft scored 1.35 findings per 100 words with the plain-language checker.
