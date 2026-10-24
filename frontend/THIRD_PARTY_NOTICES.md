# Third-party notices

**Owner:** Third-party attribution

## Application dependencies

[Source ledger](docs/SOURCE_LEDGER.md) lists direct versions and licenses.
`package-lock.json` and installed notices retain transitive license metadata.
React, React DOM, React Router, Base UI, DayPicker, and QRCode retain their upstream notices.
The setup copied no shadcn, React Bits, or neobrutalist component source.

## Fonts

JetBrains Mono, Inter, Space Grotesk, Space Mono, Instrument Serif and Caveat use the SIL Open Font License 1.1.
The current runtime loads JetBrains Mono Latin variable from Fontsource 5.3.0 and Inter Latin regular from the existing pinned package. Earlier font assets and notices remain preserved but are not imported by the application.
Full font license texts live in `public/licenses/`. Vite serves the fonts locally; Latin WOFF2 exports keep the display-font download small.

## Imported agent guidance

The bundles are tooling sources outside the production bundle.
The lock records exact upstream repositories and revisions, when available, in `skills-lock.json`.
Retained LICENSE and NOTICE files remain with their bundles.
Some local source bundles contain no standalone license file.

The [guidance license record](docs/licenses/README.md) lists upstream terms for all nineteen bundles.
Missing license texts and required notices now live in `docs/licenses/`, outside the preserved bundles.
The record distinguishes locked revisions, matched historical source, and Graphify's unrecorded original import revision.
ASD-STE100's implementation license does not grant rights to the ASD-STE100 specification itself.

## Icons and project illustrations

Phosphor regular SVG icons use the MIT license. The full notice is retained in `public/licenses/Phosphor-LICENSE.txt`.
The three project covers are original generated concept art. Provenance and prompts are recorded in [the foreground asset receipt](docs/references/foreground-assets.json).
No personal photographs or landscape scene artwork were generated. Reference-site artwork was not copied.

## Running cat

The cat sprite comes from [oneko.js](https://github.com/adryd325/oneko.js), Copyright © 2022 adryd, under the MIT license.
The retained license is `public/licenses/oneko-LICENSE.txt`. The React motion code is an independent local implementation that uses the sprite coordinates documented by the source.
