# Proposed interaction specification

**Status:** TARGET contracts with partial implementation. The supplied screenshots authorize the layout revision.

## Theme and hero

Offer Light, Dark and System through one labeled theme control and palette commands.
Read the saved explicit preference before first paint. Otherwise use the system preference.
Store only the theme choice locally. Storage failure falls back to the system without blocking rendering.
While System is active, respond to operating-system changes. A manual choice persists across routes and reloads.
Text/surface colors change together. Fade the decorative scene over 240–320ms without a circular wipe over content.

Render the real name in the heading from the first paint.
Place the scrambled visual layer outside the accessibility tree and preserve final line geometry.
Resolve left-to-right in approximately one second, once per page session.
Re-renders, section scrolling and internal navigation do not restart it.
An explicit replay may be offered. Reduced motion shows the final name immediately.
Cancel its scheduler on unmount and recover the final name after interrupted animation.

## Chosen background mechanism

Hover must change the background's visible color and detail, as the owner requested.
Use two aligned versions per theme: a monochrome sketch and its colored counterpart. The owner will supply all four images.
A soft pointer-centered mask reveals the second layer on fine-pointer devices.
Light mode reveals daylight color/atmosphere. Dark mode reveals celestial color/depth.
Keep foreground text and controls outside the reveal's contrast changes.

| Approach                          | Fit                                                             | Cost and limits                                                                     |
| --------------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| WebGL image-pair shader, selected | Mix registered sketch/color layers under a soft pointer mask    | Needs owner artwork, shared image mapping, context-loss recovery and device testing |
| Static image fallback             | Readable composition for reduced motion, touch or WebGL failure | No pointer reveal                                                                   |

Use a soft reveal radius around 120–180px as an initial desktop target.
Fade the reveal on scene entry/exit over approximately 180–240ms. Avoid drawing when the pointer and scene are idle.
Coalesce pointer updates with requestAnimationFrame. Pause scheduling offscreen and while the document is hidden.
Reduced motion and coarse pointers receive a stable scene with a readable composed color treatment.
The scene does not intercept content clicks, keyboard focus, or page scrolling.
Theme switching fades coordinated scene layers without a large circular wipe over the text.
See the [artwork contract](artwork-contract.md). Implement the shader after the owner supplies the images.
The scene choice belongs to the owner. The current layout does not implement the shader.

## Command palette and projects

Ctrl+K or Cmd+K opens the search dialog when the event is not part of text composition or a conflicting editable field.
The visible Search button provides the same entry point. Escape closes, and focus returns to the invoker.
Focus begins in the labeled query input. Arrow keys move through results. Enter activates the selected result.
The dialog traps focus. Announce the result count without narrating every keystroke.
Use installed Base UI dialog/focus primitives with a tested search/listbox pattern.
The palette searches sections, projects, available articles, contact links and theme commands.
An empty query shows useful navigation commands. No matches shows a clear empty state.
External destinations retain ordinary link behavior and a clear external label.

Project previews show their summary, status and domain before interaction.
Use compact category filters and useful visual previews, with a distinct featured-project treatment.
Hover and keyboard focus reveal a preview. On touch, a separate named preview button toggles an inline region.
Keep a dedicated case-study link distinct from expansion. Never make a hover panel the only source of essential content.
Filters preserve URL state, use pressed/selected semantics, and show result counts and an empty state.
Avoid whole-row links containing nested buttons or other links.

## Contributions and engineering timeline

The owner explicitly selected a seven-row calendar heatmap. Do not replace it with another graph type.
Recommend React Activity Calendar with portfolio theme tokens and custom keyboard/focus behavior.
Fetch actual GitHub calendar data through a validated server boundary and custom React hook. Use UTC year boundaries and the source's date/count semantics.
The current year ends at the current date. Future days appear as unavailable cells rather than zero contributions.
Use server totals, original counts and source contribution levels. Include period, source-profile link, legend and last-updated time.
Do not interpret contribution volume as quality or impact.

Use seven weekday rows and week columns. Label months and the calendar's period.
A roving tab stop prevents hundreds of consecutive Tab presses.
Arrow Up/Down moves one day. Left/Right moves one week. Home/End moves within the relevant row.
Each date exposes its full date and count. Focus, hover or tap opens the same tooltip.
Escape dismisses the tooltip. Counts also remain available in an accessible daily list/table view.
On mobile, provide a contained calendar scroller with clear controls and preserve page width.

Changing year cancels obsolete requests and preserves the newest selection.
Distinguish loading, real zero-activity, failure, rate-limit and stale-cache states.
Initial recommendation: six-hour current-year cache, longer historical cache, and at most seven-day clearly dated stale evidence after failure.
When no authentic cache exists, show unavailable and the GitHub link. Never fill cells with generated activity.
The timeline lists only sourced pull requests, releases or milestones with dates and links.

## Hackathons and photography

Hackathons use a hanging-photo achievement wall with restrained clips or tape and real event photographs.
Keep it inside a bounded horizontal strip with manual previous/next controls and touch scrolling.
Photographs have restrained rotations up to two degrees, steady captions and subtle depth. There is no automatic event carousel.
Results use Winner, Runner-up, Finalist, Qualified, Participant, or Pending result, with exact rank where supported.
With one supported event, present one event rather than duplicating it to create a wall.

Photography uses a horizontal filmstrip with preserved aspect ratios and CSS scroll snap.
Support drag after a small movement threshold, native touch swipe, previous/next buttons and keyboard navigation while the strip has focus.
A drag must suppress accidental image activation. Ordinary page scrolling stays intact.
Advance one image every six seconds while the filmstrip is visible and reduced motion is off.
Provide persistent Pause/Play controls. Pause on hover, focus, drag, swipe, manual selection or visibility loss.
Require explicit Play to resume after interaction. Reduced motion uses manual navigation only.
Do not duplicate focusable image clones or force the entire page sideways.

Activate an image to open its detail route or labeled full-size dialog.
The dialog supports Escape, previous/next, a close control and focus restoration to the originating thumbnail.
Load thumbnails first, nearby full-size images on demand, with dimensions and responsive sizes.
Captions, equipment and locations appear only when supplied and approved.
Missing photographs produce a clear dependency during development. Stock or generated images cannot represent the owner's photography.

## Writing, quotes and page views

Writing archive search matches verified title and excerpt text. Topic filters use supplied categories only.
Default sort places known dates newest first and groups undated items separately.
Publish only sourced excerpts and reading times. Keep external Bear Blog links until migration has actual local content.

Quotes cycle every eight seconds while visible, with a short opacity fade and previous/next controls.
Provide Pause/Play controls. Reduced motion uses manual changes without fading.
Reserve enough panel height to prevent layout shifts between quotes.
Pause on hover, focus or hidden document. Reduced motion disables fading and automatic advance.
Automatic changes do not create live-region announcements. Manual selection identifies the selected quotation and author.

Page views display a real total and its coverage start when the source supports one.
Do not label the count unique visitors. One navigation event may count as a page view under the selected policy.
The actual counter requires a hosted data source. Show unavailable when that source fails, never zero as an error substitute.
Bot filtering and duplicate prevention have explicit limits. The count is a descriptive statistic, not an audited traffic guarantee.
