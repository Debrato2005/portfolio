# Selected visual identity

**Owner:** Design direction record

CURRENT (October 29, 2026, second pass): the owner rejected the risograph "Field notes" pass as loud and incoherent, and asked for a paper aesthetic that is intuitive, beautiful and coherent (bold is fine). The controlling direction is **the case file**: everything is stationery on a desk.

- One metaphor: a manila folder cover with a paper-clipped photo and a typed contents card, coloured divider tabs (top-left of each sheet and a fixed rail on the right edge at 1260px and up), index cards for projects, label-maker tape for statuses and buttons, swing tags for skills, sticky notes for activities, graph paper for GitHub and an opened envelope for contact. The back cover closes the page.
- Colour: off-white paper on a warm grey desk (dark walnut at night; the paper stays paper). Each section owns one tab colour (cobalt, tomato, mustard, sage, lilac, rose) and uses it only for its tab, band and small accents.
- Type: Fraunces for headings and numbers, Instrument Sans for reading text, Space Mono for labels and tape, Caveat only for handwriting (photo caption, sticky-note titles, the letter).
- Motion: sheets land on the desk as they scroll in, cover layers drift with the pointer, cards lift and straighten on hover, tags swing, the letter slides out of the envelope, and the day/night switch wipes like a lamp. Reduced motion removes all of it.
- Content comes only from the owner's resume and the public GitHub profile; see `src/features/portfolio/content.ts`.

Source lives in `src/features/paper/`, `src/routes/HomePage.tsx` and `src/styles/paper.css`.

SUPERSEDED (October 29, 2026, second pass): the risograph "Field notes" pass from earlier the same day.

SUPERSEDED (October 29, 2026): the Material 3 Expressive redesign of October 26 ([record](docs/m3-expressive-redesign.md)) is replaced by Field notes.

The owner selected a minimal, technically precise portfolio led by JetBrains Mono. This document records that choice; [the design system](docs/DESIGN_SYSTEM.md) owns reusable implementation rules and CSS owns token values.

## Reference roles

The supplied light and dark screenshots control compact section structure, shared gutters, thin dividers and the project overview. [Anurag](https://anuragdotdev.vercel.app/) guides section order and editorial alignment. The supplied Parth screenshot guides the paper event record's portrait proportions; only Debrato's one existing record is shown. Previous research for Sakthi and Garvit remains in the source review. The later owner request authorizes original generated editorial covers. These are clearly illustrated previews rather than borrowed reference photographs or new personal gallery items.

The owner explicitly selected Mono over the references' serif display treatment. Font extraction is supporting research, while the rendered comparisons and the owner's requirements control the implementation.

## Foreground system

- Use JetBrains Mono for interface and technical roles, with Inter regular for longer paragraphs. Keep a consistent role scale and normal tracking for reading. The owner rejected the initial Mono pass as too tall; use compact desktop dimensions and preserve larger phone reading and interaction sizes.
- Align section labels and body rails across About, Experience and Skills; give Projects the full section width. Preserve the reference outer-margin and label-gutter proportions on wider desktop screens. Keep all six closed projects visible together in three desktop columns and two rows, with complete summaries and technologies.
- Use restrained orange accents, quiet borders, transparent panels and small corner radii. Each section uses one rule attached to its title. Row labels use a short rule, while full-width headings extend the rule to their action. Keep the same structures and dimensions across themes.
- Use the existing shared React components and the typography/control/tag rules in `primitives.css`; avoid an additional component library.
- Let narrow screens stack naturally and preserve enlarged text, keyboard access and phone touch targets. Keep the static, reduced-motion render fully usable.

The illustrated sketch-to-color hero remains the experimental feature. Its current source, artwork and behavior are preserved by this foreground change. Pending original photographs and official event evidence remain explicitly labeled. Four generated graphite/watercolor covers supply the collection, writing and event previews.

## Current evidence

The [Mono refinement](docs/mono-refinement-2026-10-18.md) records actual captures, the Inter/Mono paragraph trial and check results. Earlier style proposals and size targets are historical. Owner visual acceptance remains open.
