# Contribution heatmap research

**Status:** CURRENT source research and TARGET recommendation. October 14, 2026.

## Owner's clarified requirement

Use an actual seven-row contribution heatmap. Do not replace it with a waveform, constellation, or orbital visualization.
Research existing web and GitHub implementations that fit the portfolio's original visual identity.
Keep exact daily counts, calendar-year navigation, dark/light themes, tooltips, responsive layout, and keyboard access.
This research does not install a dependency or establish runtime acceptance.

## Shortlist

| Candidate                                                                        | Source-backed capabilities                                                                             | Fit and trade-off                                                                                                           | Decision                     |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| [React Activity Calendar](https://github.com/grubersjoe/react-activity-calendar) | Explicit theme palettes, dark/light scheme, tooltips, cell rendering, date/count/level input           | Good base for a restrained custom calendar. Data access and keyboard date navigation remain separate responsibilities       | Recommended renderer         |
| [UIW HeatMap](https://github.com/uiwjs/react-heat-map)                           | SVG calendar, threshold colors, cell radius, date range, custom cell and legend rendering              | Strong visual flexibility. Tooltip examples use a separate component. Date parsing and keyboard behavior need qualification | Good alternative             |
| [shadcn-heatmap](https://github.com/rutopio/shadcn-heatmap)                      | Yearly calendar, custom colors, tooltip control, month grouping and continuous-month layout            | Useful reference for a grouped editorial calendar. Its documented stack includes React 19, Tailwind 4, and shadcn setup     | Visual/component alternative |
| [React Calendar Heatmap](https://github.com/kevinsqi/react-calendar-heatmap)     | SVG calendar, CSS color classes, horizontal/vertical layout, event handlers and day-element transforms | Older development baseline. Current React compatibility needs qualification beyond its broad peer range                     | Secondary reference          |

All four repositories identify MIT licenses. No code was imported.

## Runtime and maintenance observations

| Repository              | Observed source manifest                                                                                                     | Most recent repository push | Important limit                                                       |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------- | --------------------------- | --------------------------------------------------------------------- |
| React Activity Calendar | [3.2.2, React 18/19 peer range](https://github.com/grubersjoe/react-activity-calendar/blob/main/package.json)                | October 13, 2026            | Source version is not independently checked as the latest npm release |
| UIW HeatMap             | [2.3.4, React/React DOM ≥16.9](https://github.com/uiwjs/react-heat-map/blob/main/core/package.json)                          | May 28, 2026                | A broad peer range does not prove this app's browser acceptance       |
| shadcn-heatmap          | [README requires React 19+, Tailwind 4, shadcn setup](https://github.com/rutopio/shadcn-heatmap)                             | July 13, 2026               | Current portfolio does not adopt this full stack                      |
| React Calendar Heatmap  | [1.10.0, development dependencies use React 16](https://github.com/kevinsqi/react-calendar-heatmap/blob/master/package.json) | February 23, 2025           | No current React 19 test result was established                       |

The GitHub connector returned current repository metadata. None of these repositories was archived in that response.
Push recency is a maintenance signal, not proof of component quality or compatible behavior.
React Activity Calendar's manifest includes unit and visual test commands. Those upstream tests were not run here.

## Proposed heatmap treatments

These remain calendar heatmaps, with daily cells and exact source counts.

1. **Signal calendar, recommended.** A continuous seven-row year grid with small softly squared cells, mono month labels, and a five-level vermilion palette.
2. **Editorial contact sheet.** Monthly mini-calendars arranged like a photographic contact sheet. Keep a continuous-year view and exact date mapping available.
3. **Observatory grid.** A continuous calendar with fine reference lines, square cells, and a restrained focus marker. Avoid stars, particle motion, or decorative data.

Recommend the signal calendar inside a simple section rather than a large dashboard card.
Use 11–12px cells and approximately 3px gaps as initial targets.
Provide a compact year selector, source-profile link, period total, intensity legend and retrieval timestamp.
Light mode moves from quiet paper-gray cells to terracotta/vermilion.
Dark mode moves from muted charcoal cells to increasingly clear coral tones.
The legend and date/count labels preserve meaning when colors are hard to distinguish.

## Accessibility findings from inspected source

[React Activity Calendar's cell renderer](https://github.com/grubersjoe/react-activity-calendar/blob/main/src/components/ActivityCalendar.tsx) creates SVG rectangles and exposes `renderBlock`.
The default cells do not supply roving keyboard date navigation.
Its [tooltip component](https://github.com/grubersjoe/react-activity-calendar/blob/main/src/components/Tooltip.tsx) connects hover, dismissal and tooltip semantics.
The inspected tooltip implementation does not use a focus-opening hook.
Do not label the library fully keyboard accessible without the required adapter and browser evidence.

[shadcn's calendar blocks](https://github.com/rutopio/shadcn-heatmap/blob/master/src/components/heatmap/calendar-heatmap.tsx) expose labels and keyboard handlers for clickable cells.
Those handlers still do not establish our complete calendar navigation contract.
UIW exposes SVG props and custom cell rendering. A focus/tooltip adapter remains our responsibility there too.

Implement one roving tab stop, arrow-key date movement, focus-visible selection and the same tooltip on hover, focus or touch.
Offer a readable daily list as an alternate representation. Keep mobile overflow inside the heatmap container.
No candidate received a full browser or screen-reader audit in this research stage.

## Real data boundary

Use a custom React hook for the portfolio's validated contribution model.
Its protected server boundary requests the original [GitHub contribution calendar](https://docs.github.com/en/graphql/reference/users).
Keep tokens outside the browser. Preserve dates, counts and source levels through the adapter.
The renderer does not determine the authenticity of the dataset it receives.
Show loading, real zero activity, errors, rate limits, and dated authentic cache states separately.
Never substitute synthetic cells or artificial totals after a live failure.

## Inspectable examples

- [React Activity Calendar Storybook](https://grubersjoe.github.io/react-activity-calendar/)
- [UIW HeatMap examples](https://uiwjs.github.io/react-heat-map/)
- [shadcn-heatmap demo](https://heatmap.chingru.com/)
- [React Calendar Heatmap demo](https://www.kevinqi.com/react-calendar-heatmap/)

These demos show library examples rather than Debrato's contributions.
The text browser did not render the JavaScript demos. The recommendation uses repository documentation and inspected source.
No candidate was installed, benchmarked, or accepted for production.

The [research receipt](design/heatmap-source-receipt.json) preserves inspected metadata and source-version limits.

## Expanded visual alternatives after the Garvit reference

CURRENT: the owner requested more heatmap alternatives and supplied [Garvit's portfolio](https://www.garvitsingla.in/).
The recording's [45.6-second frame](design/evidence/reference-45-6s.png) shows the GitHub panel clearly.
Garvit's [component source](https://github.com/garvittsingla/portfolio/blob/main/components/GithubContributionsSticky.tsx) uses Rough.js rectangles with cross-hatched fills.
Live domain retrieval failed. The recording and matching component source support the style description; the deployed revision is unverified.

These are visual directions, not adopted components. Each proposal keeps a seven-row daily calendar, exact counts, year controls, and both themes.

| Direction             | Inspectable reference                                                                                             | Proposed portfolio treatment                                                                                                                  |
| --------------------- | ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Sketch ledger         | [Garvit component](https://github.com/garvittsingla/portfolio/blob/main/components/GithubContributionsSticky.tsx) | Thin irregular outlines and denser cross-hatching for higher levels. Paper in light mode, charcoal in dark mode, restrained vermilion accents |
| Ink stipple           | [ns-ui Stipple Year](https://design.helpmarq.com/components/heatmap-year-stipple)                                 | Tiny ink dots inside each day square; density indicates intensity. A hover/focus loupe reveals the day and exact count                        |
| Dot matrix            | [heatmap-ui: Quiet orbit preset](https://heatmapui.dev/github-contributions)                                      | Circular day cells, quiet labels and generous spacing. This remains a calendar, regardless of the reference preset's name                     |
| Hollow rings          | [heatmap-ui: Rings preset](https://heatmapui.dev/github-contributions)                                            | Ring cells with intensity colors. Retain month labels, date/count tooltips and the legend in our adaptation                                   |
| Honeycomb             | [heatmap-ui: Honeycomb preset](https://heatmapui.dev/github-contributions)                                        | Hexagonal day cells with clear weekday alignment; a more technical appearance                                                                 |
| Monthly contact sheet | [Cal-Heatmap](https://github.com/wa0x6e/cal-heatmap)                                                              | Proposed monthly calendar panels with small captions, echoing the photography section. Keep the continuous seven-row year view available      |
| Shallow 3D blocks     | [heatmap-ui: After hours preset](https://heatmapui.dev/github-contributions)                                      | Contribution intensity controls block height. Keep the flat calendar available and use it on small screens                                    |
| Number ledger         | [heatmap-ui: By the numbers preset](https://heatmapui.dev/github-contributions)                                   | Daily counts printed within cells. Use larger cells and contained horizontal scrolling to preserve legibility                                 |

TARGET recommendation: sketch ledger or ink stipple. The first stays close to the requested Garvit component style.
The second offers a more distinct identity and suits an editorial portfolio with research and photography.
Dot matrix is the simplest quiet alternative. Do not combine all treatments into one section.
The earlier signal calendar remains available, but it is no longer the only proposed visual direction.
React Activity Calendar remains the conservative renderer candidate; the final style can require a different rendering approach.

### Additional source findings

[heatmap-ui](https://github.com/tb962/heatmap-ui) declares MIT licensing and React/React DOM peers of at least 18.2 in its inspected 0.3.0 manifest.
Its examples include 2D shapes and SVG 3D rendering. Neither the peer range nor source inspection qualifies this app's runtime behavior.
The contribution generator uses a public cached endpoint. It also offers a view accepting supplied daily counts.
Our proposed integration must use the portfolio's validated real-data boundary.
The generator's fitted layout can omit older weeks on narrow containers; our selected period must remain fully reachable.

The stipple source accepts date/count input and includes arrow-key focus movement and a count loupe.
Its missing values become zero and its range rolls backward from an end date.
Our adaptation needs explicit unknown states and calendar-year navigation. Its license was not verified; retain it as visual reference only.

[GitCalendarUI](https://gitcalendarui.vercel.app/) is another palette and cell-shape explorer.
It is useful for comparing color treatments after selecting a visual direction.
Cal-Heatmap is a general JavaScript calendar reference rather than an adopted React component.

No package, external code or artwork was added. JavaScript demo interactions and browser accessibility remain unverified.
The [expanded receipt](design/expanded-heatmap-source-receipt.json) records the source and recording boundaries.
