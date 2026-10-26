# Tooling and skill states

**Owner:** Tooling inventory

## Installed project guidance

| Skill                            | Location                                        | State                   |
| -------------------------------- | ----------------------------------------------- | ----------------------- |
| `caveman`                        | `.agents/skills/caveman`                        | Local guidance imported |
| `design-taste-frontend`          | `.agents/skills/design-taste-frontend`          | Taste Skill v2 imported |
| `frontend-design`                | `.agents/skills/frontend-design`                | Local guidance imported |
| `baseline-ui`                    | `.agents/skills/baseline-ui`                    | Local guidance imported |
| `bencium-innovative-ux-designer` | `.agents/skills/bencium-innovative-ux-designer` | Local guidance imported |
| `neobrutalism`                   | `.agents/skills/neobrutalism`                   | Local guidance imported |
| `impeccable`                     | `.agents/skills/impeccable`                     | Local guidance imported |
| `investigate-first`              | `.agents/skills/investigate-first`              | Local guidance imported |
| `lean-build`                     | `.agents/skills/lean-build`                     | Local guidance imported |
| `playwright`                     | `.agents/skills/playwright`                     | Local guidance imported |
| `playwright-interactive`         | `.agents/skills/playwright-interactive`         | Local guidance imported |
| `ponytail`                       | `.agents/skills/ponytail`                       | Local guidance imported |
| `vercel-react-best-practices`    | `.agents/skills/react-best-practices`           | Local guidance imported |
| `safe-refactor`                  | `.agents/skills/safe-refactor`                  | Local guidance imported |
| `screenshot`                     | `.agents/skills/screenshot`                     | Local guidance imported |
| `surgical-patch`                 | `.agents/skills/surgical-patch`                 | Local guidance imported |
| `ui-ux-pro-max`                  | `.agents/skills/ui-ux-pro-max`                  | Local guidance imported |
| `verify-and-stop`                | `.agents/skills/verify-and-stop`                | Local guidance imported |
| `web-design-guidelines`          | `.agents/skills/web-design-guidelines`          | Local guidance imported |
| `graphify`                       | `.agents/skills/graphify`                       | Local guidance imported |
| `fastapi`                        | `.agents/skills/fastapi`                        | Local guidance imported |
| `python-testing`                 | `.agents/skills/python-testing`                 | Local guidance imported |
| `asd-ste100`                     | `.agents/skills/asd-ste100`                     | Local guidance imported |

The React bundle uses the folder `react-best-practices` and declared name `vercel-react-best-practices`.
Frontend instructions route later tasks to these local bundles.
Integrity does not prove runtime qualification or licensing review.

## Runtime qualification

CURRENT: npm dependencies and all three pinned browser runtimes installed.
Two Ubuntu libraries support WebKit from `.local/system-libs/`. Build and test evidence belongs in HANDOFF.md.
CURRENT: Graphify's existing Linux executable responds to `--help`.
The graph wrapper uses `GRAPHIFY_BIN`, PATH, or the existing uv tool path. A new machine must install Graphify separately.
The initial graph is code-only. It contains no semantic document extraction or live Git evidence.
CURRENT: Impeccable engine 0.1.11 is cached in ignored `.local/impeccable/`.
The imported launcher verified the release checksum before execution. Its engine probe
and context command passed on October 15, 2026.
Use `sh scripts/impeccable.sh <verb>` from the frontend, or
`sh frontend/scripts/impeccable.sh <verb>` from the repository root.
The wrapper defaults `IMPECCABLE_HOME` to the frontend cache and sets the working directory.
This avoids the launcher's default home cache outside the writable workspace.
The earlier context-loading message is an imported fallback instruction, not an application error.
Context resolves `PRODUCT.md`. There is no `DESIGN.md`; the existing implementation and
[design owner](DESIGN_SYSTEM.md) remain the visual evidence. No context document was invented.
Engine startup and context loading do not qualify design detector results or automatic hooks.
FastAPI and Python testing are imported backend guidance. No backend was created or Python package installed.
ASD-STE100 supplies writing guidance. Its Python linter can run from the imported bundle.

## Agent plugins available here

| Plugin         | Evidence                 | Project state                                    |
| -------------- | ------------------------ | ------------------------------------------------ |
| Superpowers    | Session skill catalog    | Workflow guidance available                      |
| Product Design | Session skill catalog    | Available. final portfolio design pending        |
| Figma          | Session tools and skills | Available. no file or synchronization configured |
| Firecrawl      | Session tools and skills | Available. no project research job configured    |
| Computer Use   | Session skill catalog    | Available. Windows control not used              |
| Visualize      | Session skill catalog    | Available. no visualization configured           |
| Higgsfield     | Session tools and skills | Available. no media or hosted site created       |
| Sites          | Session tools and skills | Available. local setup only for this slice       |

These are desktop capabilities, not npm plugins. No global config or account permission was changed.
Figma synchronization and publishing remain separate future decisions.

## Graph commands

`npm run graph:build` runs a local code-only extraction and writes ignored `.local/graph/graphify-out/`.
`npm run graph:query -- "App"` queries that graph. Set `GRAPHIFY_BIN` when the runtime is outside PATH.
Confirm every relationship against source. Rebuild after meaningful source changes.
