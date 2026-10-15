# Source ledger

**Owner:** Source decisions

## Decision rules

Keep adopted dependencies, reference sources, imported guidance, available plugins, and qualified runtimes separate.
Pin npm dependencies and retain one lockfile. A dependency needs a consumer or an explicit setup reservation.
Base UI has shared Button and dialog consumers. DayPicker has a lazy development calendar consumer.
QRCode is a development dependency with a development-only fixture consumer.
The HTTP client is a tested extension seam. FastAPI is guidance only, with no Python application dependency.
New dependencies need a license, purpose, and replacement boundary.

## Adopted component source

[Neobrutalism.dev](https://neobrutalism.dev/) supplies style direction. We copied no component source.
[Neubrutalism.com](https://www.neubrutalism.com/) is a visual reference.
[shadcn](https://ui.shadcn.com/) and [React Bits](https://reactbits.dev/) are REFERENCE_ONLY.
[Base UI](https://base-ui.com/) supplies accessible interaction primitives.
[oneko.js](https://github.com/adryd325/oneko.js) supplies the MIT-licensed cat sprite and sprite coordinates. The application uses a local React implementation and retains the upstream license.

Project covers are original generated concept illustrations. They are not application screenshots or personal photographs.
The latest UniSpace cover uses the built-in image generator; its [exact prompt and source receipt](references/unispace-art-receipt.json) identify the new asset.
The earlier original PNGs also supply larger responsive WebP exports. No reference-site event photographs or portraits were reused.

## Stack sources

[Vite setup](https://vite.dev/guide/), [TypeScript 6](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html), and [Playwright setup](https://playwright.dev/docs/intro) are primary references.
Package metadata and exact resolved integrity values belong in `package-lock.json`.
The initial resolution reused Smolink's lock, then npm reconciled the portfolio manifest.
Smolink application code, API models, personal data, product documentation, and assets were not copied.

## Direct dependency inventory

| Package                       | Pinned version | Declared license | Scope       |
| ----------------------------- | -------------- | ---------------- | ----------- |
| `@base-ui/react`              | 1.8.0          | MIT              | Runtime     |
| `@fontsource/inter`           | 5.3.0          | OFL-1.1          | Runtime     |
| `@fontsource/space-grotesk`   | 5.3.0          | OFL-1.1          | Runtime     |
| `@fontsource/space-mono`      | 5.3.0          | OFL-1.1          | Runtime     |
| `react`                       | 19.3.0         | MIT              | Runtime     |
| `react-day-picker`            | 9.14.0         | MIT              | Runtime     |
| `react-dom`                   | 19.3.0         | MIT              | Runtime     |
| `react-router`                | 8.4.0          | MIT              | Runtime     |
| `@axe-core/playwright`        | 4.13.0         | MPL-2.0          | Development |
| `@eslint/js`                  | 10.0.1         | MIT              | Development |
| `@playwright/test`            | 1.63.0         | Apache-2.0       | Development |
| `@types/node`                 | 22.20.5        | MIT              | Development |
| `@types/qrcode`               | 1.5.6          | MIT              | Development |
| `@types/react`                | 19.3.0         | MIT              | Development |
| `@types/react-dom`            | 19.3.0         | MIT              | Development |
| `@vitejs/plugin-react`        | 6.1.2          | MIT              | Development |
| `eslint`                      | 10.12.0        | MIT              | Development |
| `eslint-plugin-react-hooks`   | 7.1.1          | MIT              | Development |
| `eslint-plugin-react-refresh` | 0.5.7          | MIT              | Development |
| `globals`                     | 17.13.0        | MIT              | Development |
| `prettier`                    | 3.9.9          | MIT              | Development |
| `typescript`                  | 6.0.3          | Apache-2.0       | Development |
| `typescript-eslint`           | 8.71.0         | MIT              | Development |
| `vite`                        | 8.3.2          | MIT              | Development |
| `vitest`                      | 5.0.3          | MIT              | Development |
| `qrcode`                      | 1.5.4          | MIT              | Development |

## Skills and licenses

The setup imported nineteen local bundles from existing guidance. `skills-lock.json` retains upstream source revisions when available.
It records imported origins, file hashes, and aggregate integrity independently of upstream hashes.
[Third-party notices](../THIRD_PARTY_NOTICES.md) records copied guidance and retained notices.
[Tooling](TOOLING.md) tracks external plugin setup. Availability does not mean account connection or project use.

## Browser infrastructure

The pinned Playwright browsers remain workspace-local in `.local/browsers/`.
The official CDN fallback serves Firefox and WebKit downloads.
WebKit needs two locally extracted Ubuntu 24.04 packages on this host:

| Package                       | Version                  | Purpose                     |
| ----------------------------- | ------------------------ | --------------------------- |
| libevent-2.1-7t64             | 2.1.12-stable-9ubuntu2.2 | WebKit event library        |
| libgstreamer-plugins-bad1.0-0 | 1.24.2-1ubuntu4          | WebKit media parser library |

Ubuntu archive downloads retain their package notices under `.local/system-libs/usr/share/doc/`.
These libraries do not ship in the portfolio production bundle.

WebKit loopback checks use GIO’s direct resolver in test-process configuration.
[GLib implementation](https://github.com/GNOME/glib/blob/main/gio/gdummyproxyresolver.c) defines this resolver and returns direct connections.
This setting applies only to local browser verification.

## Personal portfolio design sources

CURRENT: [reference analysis](reference-analysis.md) records the supplied video and external portfolio observations.
The [content inventory](content-inventory.md) records resume claims, PDF hyperlinks, missing evidence, and source fingerprints.
Recording frames under `docs/design/evidence/` are review evidence only. Do not ship them as portfolio artwork.
The [light concept](design/concept-light.png) and [dark concept](design/concept-dark.png) came from the built-in ImageGen tool.
They are static proposals. They do not establish working interactions or personal photographs.
No external portfolio code, personal photographs, company marks, or reference illustrations were adopted.
Historical proposal state: font changes, animation packages, contribution access and page-view storage were TARGET or PLANNED.
The current README and handoff supersede that proposal state. No runtime dependencies changed during that design stage.

## Recording and public source refinement

CURRENT: the [recording audit](video-component-analysis.md) records 98 overview samples, fourteen full-resolution stills and two motion sequences.
The [public GitHub review](github-source-review.md) records fixed revisions for Anurag, Sakthi, Garvit and Parth's older template.
Parth's current deployment source remains UNKNOWN. Repository commits do not establish the code deployed during the recording.
Reference code and assets remain outside the application. No runtime dependency changed for this revision.
The larger type scale supersedes the earlier compact height target. Scene artwork remains DEFERRED.

## Connected public services

CURRENT: [GitHub Contributions API](https://github.com/grubersjoe/github-contributions-api) supplies cached public-profile calendar data without private repository access.
The browser adapter validates the full payload and labels the relay in the interface. The official GitHub GraphQL gateway remains an optional configured path.
[Miles Hilliard CountAPI](https://countapi.mileshilliard.com/) stores the page-load counter without a browser secret.
The counter describes page loads, including repeats. It does not claim unique people or analytics accuracy.

CURRENT: `public/images/oneko.gif` is the original MIT-licensed sprite from [adryd325/oneko.js](https://github.com/adryd325/oneko.js).
The downloaded bytes have SHA-256 `f4c5688eb8ee6f22b08ab8df361222307dc6fe2d5bdcfa12582cea694707e66d`.
`public/licenses/oneko-LICENSE.txt` retains the upstream license. No external cat script enters the bundle.

## Anurag structure revision

CURRENT: inspected [nodeanurag/my-portfolio](https://github.com/nodeanurag/my-portfolio) through the GitHub connector.
The [source analysis](reference-analysis.md#anurag-source-inspection-and-structural-correction) records active imports, column geometry, section bands, index and GitHub presentation.
The owner requested this structure as the main inspiration. The original wide concepts are superseded.
No reference application code, artwork, fonts or personal content was adopted.
Contribution loading retains the portfolio's real-data contract rather than the reference's synthetic fallback.

## Heatmap and originality research

CURRENT: [heatmap research](heatmap-research.md) compares React Activity Calendar, UIW HeatMap, shadcn-heatmap and React Calendar Heatmap.
Repository metadata, manifests and selected component source were inspected through the GitHub connector.
React Activity Calendar is the recommended TARGET renderer. No dependency was added or accepted for production.
The owner rejected the literal Anurag-style concepts. Anurag remains structural inspiration, with Sakthi's hover atmosphere and Parth's achievement-wall interaction.
The next proposal must establish an original visual identity. Both earlier concept sets remain historical artifacts.

CURRENT: [expanded heatmap alternatives](heatmap-research.md#expanded-visual-alternatives-after-the-garvit-reference) adds eight visual directions after the owner supplied Garvit's portfolio.
Garvit's matching source uses Rough.js cross-hatching. The recorded frame supports its appearance, while the deployed revision is unverified.
Additional references include heatmap-ui, ns-ui's stipple calendar, Cal-Heatmap and GitCalendarUI.
Sketch ledger and ink stipple are the TARGET visual shortlist. No new component or dependency was adopted.

## Selected screenshot implementation

The owner supplied two light/dark screenshots and requested the layout. Both references are preserved under `docs/design/`.
They are review evidence only. No screenshot artwork, example job, unsupported award, photograph or counter value was copied into the application.
The owner will supply the four landscape images. The [artwork contract](artwork-contract.md) records that boundary.
The implementation reuses installed React, Router, Base UI and fonts. Georgia is a system serif fallback.
No dependency, reference application code, external artwork or generated personal photograph was adopted.

## Foreground assets and current references

Instrument Serif and Caveat were retrieved from the Google Fonts repository under SIL OFL 1.1. Phosphor regular icons were retrieved from the official core repository under MIT.
The full licenses are retained in `public/licenses/`. [Asset receipt](references/foreground-assets.json) records source URLs, hashes, export sizes and the three original concept-art prompts.
Project WebP covers are generated illustrations. They are never used as personal photographs, product screenshots or research results. No reference-site assets or component source were copied.
The selected mockups and four live sites guide foreground composition. [Reference analysis](reference-analysis.md) separates observed behavior from adaptation.
The GitHub gateway follows the [official GraphQL schema](https://docs.github.com/en/graphql/reference/users). It requests calendar counts, levels and dates, with no private repository detail.
