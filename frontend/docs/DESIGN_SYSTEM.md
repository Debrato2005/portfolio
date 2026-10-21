# Design system

**Owner:** Design and accessibility

## Visual direction

CURRENT: the owner selected a minimal technical foreground with JetBrains Mono-led typography. The supplied light/dark compositions and Anurag's close section structure guide alignment and density; Debrato's identity, real content and original project artwork remain authoritative. The latest Mono requirement supersedes the earlier serif and handwritten direction, while the rejection of an enlarged layout still controls proportions.

Foreground surfaces are quiet and mostly transparent, with one title rule per section, restrained orange accents and shared gutters. Row sections use short rules inside the label gutter. Full-width headings extend their rule between the title and action. Matching outlines group projects, skills, activity, writing and photography without page-height rails. All six projects remain together in the closed desktop overview. The already implemented sketch-to-color hero is preserved; this foreground pass changes neither its artwork nor its reveal behavior. Original photographs remain DEFERRED.

[DESIGN.md](../DESIGN.md) records the chosen identity and reference roles. The [Mono review](mono-refinement-2026-10-18.md) contains current rendered evidence. Earlier composition and scale reviews remain historical. shadcn and React Bits remain REFERENCE_ONLY.

## Tokens and typography

`src/styles/tokens.css` owns color, typography, spacing, border, shadow, and content-width values.
JetBrains Mono is the primary family for navigation, headings, section labels, project titles, buttons, tags, metadata and technical data. Inter regular serves longer prose, including summaries, introductions and article copy. A same-width About comparison showed that all-Mono prose required additional lines without improving the hierarchy. These are the only two runtime families.

`src/styles/fonts.css` declares one locally hosted Latin variable Mono file and one Inter regular file, both preloaded with `font-display: swap` and system fallbacks. Mono permits weights 400–700; UI roles chiefly use 400, 500 and 600. Do not request unused weights or add external font services. Retain their OFL notices under `public/licenses/`.

`src/styles/primitives.css` owns the shared prose, control, tag and margin-note treatment. `project-cards.css` is the single project-card styling owner. Existing React components remain the reusable structure; no new component library is required. General prose uses normal tracking and sentence case, while the owner's name retains its existing uppercase treatment. Type roles and dimensions belong in CSS tokens rather than duplicated document values.

Shared body, secondary and label tokens now govern the home, archives, details and galleries.
Primary copy, secondary text and metadata form a restrained hierarchy. Desktop widths share one body scale without an abrupt increase at the intermediate breakpoint. Phone and coarse-pointer controls retain larger targets. The owner subsequently rejected the first Mono comparison as too tall; compact desktop roles now have a smaller type and control scale while phone prose and touch controls retain their prior sizes.
The shared homepage column preserves the supplied outer-margin and label-gutter proportions at wider desktop sizes, with a separate narrower reading width for archives. The hero index aligns to the content edge and occupies an outer rail only when enough space exists. Smaller widths and enlarged text use the section selector.
Its fit calculation includes the current text scale. The hero reserves separate areas for its copy, margin note and index.
The index scrolls within short viewports. Document guides sit outside the content. Skills use the full section width.
Collection cards keep their thumbnail, label and arrow in a grid, including at phone widths.
The closed project overview shows all six projects together in three desktop columns and two rows, including at the supplied reference width. Smaller tablets use two columns; phones use one. Compact portrait covers sit beside the readable title, full summary, status and visible technologies on desktop. Phone summaries use the full card width. Full engineering detail appears inside native briefs.
Projects without supplied covers use decorative geometric thumbnails. Status labels stay in normal flow beside the title so enlarged text remains complete.
Native disclosures expose sourced engineering notes. Repository links appear only for projects with a supplied public URL.
Closed cards align their brief controls at the top right. Repository links share the title. Portraits use responsive WebP sources from the original artwork. One compact paper event record preserves the single sourced result and pending evidence. Its generated cover is explicitly illustrative.
About, Experience and Skills share a label gutter beside their content. Hackathons, Train of Thought and Photography use a heading band above their content and a note in the left body rail. Contact keeps its label and invitation beside the action row.
The activity area has adjacent calendar and profile panels on desktop. Phones stack them. The exact seven-row calendar retains source attribution and square daily cells.

The owner selected the sketch-ledger calendar after the component review. Hatched daily cells, thin outlines and shared panel geometry connect it to the event records.
Each theme has increasing visual intensity. The legend uses the same colors and hatching as the daily cells.
Month labels remain available through contained scrolling on narrow screens. The scroller keeps keyboard access in every provider state.
The expanded calendar focuses the selected day. Escape returns to the compact view and its control.
Profile statistics use complete label/value rows on narrow screens.
The reading scale and interaction size remain centralized in CSS tokens.
Photography rotation starts only when multiple collections contain real images. Empty collections remain manual and still.
The Play/Pause control preserves its geometry across state changes. The gallery action shares the photography heading. Desktop notes and strip controls occupy the left rail; phones place the controls below the track.
Populated collection images use larger film frames. Empty collections keep explicit labels until original photographs arrive. The owner authorized original generated covers for those collection previews, the event paper and the existing article; they are separate from personal photograph data and never create gallery items.

## Controls and responsive behavior

Use semantic HTML, visible focus, accessible names, and Base UI interaction primitives.
Shared controls need disabled, focused, pressed, and error states when applicable.
Calendar controls use DayPicker only where date choice serves the task.
Use content-based breakpoints and flexible grids. Preserve loading geometry and image dimensions.
Test 320px reflow, 200 percent text size, touch target size, zoom, and text spacing.
Navigation links keep whole labels inside a contained phone scroller. Contact columns adapt to the current text size. Narrow project names move below their portraits so enlarged text stays readable.
The decorative snapshot icon is hidden on phones to keep enlarged text clear.

## Motion and accessibility

Use CSS motion for small transitions. Honor `prefers-reduced-motion`.
Route focus and keyboard recovery are part of journey behavior.
The name reserves its final geometry. Its active frame reads the native motion preference, so a delayed change notification cannot leave scrambling active after reduction applies. Quote exits finish before new text appears, with space reserved for every quote. Pause and focus cancel pending fades.
Reopening command search during its exit cancels the pending command and resets the query.
Photography arrows move the horizontal track without scrolling the page vertically.
The [recording audit](video-component-analysis.md) and [public source review](github-source-review.md) explain the motion choices.
The hero scene uses registered sketch/color artwork, an organic WebGL trail and static reduced-motion/failure fallbacks. Strong contrast veils protect copy and stable backing protects the note/index. The existing theme transition remains separate from the reveal. See [background review](sketch-to-color-background.md).
The current theme control uses a circular View Transition wipe when the browser supports it. Storage updates before the visual transition so immediate reloads keep the selected theme.
The running cat is the single persistent playful motion. It follows fine mouse pointers, remains click-through and stops for reduced motion.
TARGET: WCAG 2.2 AA. Automated checks are evidence for tested pages only.
Desktop and mobile screenshots belong in [design QA](../design-qa.md).
Manual screen-reader and complete conformance review remain PLANNED.
