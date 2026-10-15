# Design system

**Owner:** Design and accessibility

## Visual direction

CURRENT: the supplied screenshot direction with cream/charcoal themes, orange accents, serif identity, thin borders and compact sections.
The earlier neobrutalist foundation remains historical setup context and in the development toolkit.
Neobrutalism.dev is the adopted setup style source. Neubrutalism.com is a visual reference.
CURRENT: readable editorial foreground, designed light/dark modes, original project illustrations and a Parth-inspired event card. Final photographs and the Sakthi-inspired scene reveal remain DEFERRED.
Anurag guides the close structural treatment. The supplied mockups guide visual identity. The later readability request supersedes their compact scale. Earlier concept sets are superseded.
The owner selected the supplied screenshots and explicitly deferred backgrounds in the latest brief. Foreground acceptance is separate from future artwork registration.
The [design review](design-decisions.md) records this selection and the partial implementation boundary.
Use the [owner-selected references](reference-analysis.md#owner-selected-references-october-15) for future visual and interaction refinements.
shadcn and React Bits remain REFERENCE_ONLY.

## Tokens and typography

`src/styles/tokens.css` owns color, typography, spacing, border, shadow, and content-width values.
Inter handles body text. Instrument Serif handles editorial headings; Caveat supplies limited margin notes. Space Mono handles small technical labels. Georgia is the serif fallback.
Space Grotesk remains installed for shared setup components.
Fontsource CSS and local font files serve these fonts. Retain their OFL license files under `public/licenses/`.
Do not repeat CSS token values in documents.
Shared body, secondary and label tokens now govern the home, archives, details and galleries.
Larger text and control targets take priority over the earlier compact page-height budget.
The desktop index appears only when its full labels fit beside the reading column. Other widths use the section selector.
The index scrolls within short viewports. Document guides sit outside the content. Skills use the full section width.
Collection cards keep their thumbnail, label and arrow in a grid, including at phone widths.
Project cards use two-column image-first editorial frames, with one column on phones. The home shows four existing projects and all four share the same card geometry.
Native disclosures expose sourced engineering notes. Repository links appear only for projects with a supplied public URL.
Card footers reserve shared geometry. Cover images use responsive WebP sources from the original artwork. The achievement record uses one hanging paper card because only one sourced event exists.
The activity area combines Garvit's grouped panel treatment with an exact seven-row calendar and visible source attribution. Compact daily cells preserve square geometry as the calendar width changes.

The owner selected the sketch-ledger calendar after the component review. Hatched daily cells, thin outlines and shared panel geometry connect it to the event records.
Month labels remain available through contained scrolling on narrow screens. The scroller keeps keyboard access in every provider state.
The reading scale and interaction size remain centralized in CSS tokens.
Photography rotation starts only when multiple collections contain real images. Empty collections remain manual and still.
The Play/Pause control preserves its geometry across state changes. The gallery action shares the strip footer and wraps within doubled text layouts.
Populated collection images use larger film frames. Empty collections keep explicit labels until original photographs arrive.

## Controls and responsive behavior

Use semantic HTML, visible focus, accessible names, and Base UI interaction primitives.
Shared controls need disabled, focused, pressed, and error states when applicable.
Calendar controls use DayPicker only where date choice serves the task.
Use content-based breakpoints and flexible grids. Preserve loading geometry and image dimensions.
Test 320px reflow, 200 percent text size, touch target size, zoom, and text spacing.

## Motion and accessibility

Use CSS motion for small transitions. Honor `prefers-reduced-motion`.
Route focus and keyboard recovery are part of journey behavior.
The name reserves its final geometry. Quote exits finish before new text appears, with space reserved for every quote.
Photography arrows move the horizontal track without scrolling the page vertically.
The [recording audit](video-component-analysis.md) and [public source review](github-source-review.md) explain the motion choices.
The final scene remains deferred. Its pointer reveal and theme wipe are separate future interactions.
The current theme control uses a circular View Transition wipe when the browser supports it. Storage updates before the visual transition so immediate reloads keep the selected theme.
The running cat is the single persistent playful motion. It follows fine mouse pointers, remains click-through and stops for reduced motion.
TARGET: WCAG 2.2 AA. Automated checks are evidence for tested pages only.
Desktop and mobile screenshots belong in [design QA](../design-qa.md).
Manual screen-reader and complete conformance review remain PLANNED.
