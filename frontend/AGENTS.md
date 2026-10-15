# Frontend agent instructions

**Owner:** Frontend workflow

## Scope

Writes for frontend tasks belong in `frontend/`. Read [root rules](../AGENTS.md).
Do not modify unrelated root, backend, deployment, or database files.
Preserve `skills-lock.json` and imported bundles. Do not enable caveman voice merely because the bundle exists.

## Startup order

1. Read root instructions, this file, [README](README.md), and [handoff](docs/HANDOFF.md).
2. Read the exact task in [queue](docs/BUILD_CHECKLIST.md).
3. Select the stable owner from the [document index](docs/README.md).
4. Inspect source and nearest tests before changes.

## Skills and tools

Read relevant bundles in `.agents/skills/` before use. The lock records source revisions and imported file hashes.
Run Impeccable commands through `sh scripts/impeccable.sh <verb>` from this directory,
or `sh frontend/scripts/impeccable.sh <verb>` from the repository root.
Use `context` once per design session. The wrapper sets the frontend working directory
and defaults the engine cache to ignored `.local/impeccable/`, inside the writable workspace.
This project launcher takes precedence over direct launcher paths in the imported guidance.
Run `npm run skills:check` after bundle changes. Skills are not browser dependencies.
Use [tooling](docs/TOOLING.md) to distinguish guidance, runtime tools, and plugin availability.
Apply React guidance that fits Vite. Next.js server rules do not apply here.
Use Graphify for relationship discovery when a graph exists. Confirm conclusions against current source and Git state.
Use FastAPI and Python testing guidance only for a separately authorized backend task.

## Implementation rules

Follow [architecture](docs/FRONTEND_ARCHITECTURE.md) and [design](docs/DESIGN_SYSTEM.md).
Presentation code must not call HTTP transport. Validate unknown responses before frontend models.
Do not use fixture fallback after a live failure. Never ship QR fixtures or the development toolkit.
Keep runtime secrets outside browser code. Every `VITE_` value is public.

## Completion procedure

1. Establish meaningful failing checks for behavioral changes. Do not add tests that mirror source text.
2. Run the proportional [quality gates](docs/TESTING_AND_QUALITY.md).
3. Review keyboard, responsive, failure, and reduced-motion behavior when relevant.
4. Inspect the diff and run `git diff --check`.
5. Update stable truth, task evidence, and handoff. Write the handoff last.

Use CURRENT, TARGET, PLANNED, BLOCKED, and DEFERRED to bound claims.
An automated Axe result does not prove full WCAG conformance. A loopback API test does not prove a live backend.
