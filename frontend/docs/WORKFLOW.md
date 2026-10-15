# Routes and journeys

**Owner:** Frontend route behavior

## Route map

| Route                          | Mode             | Behavior                                                           |
| ------------------------------ | ---------------- | ------------------------------------------------------------------ |
| `/`                            | All              | Nine anchored sections, filters, calendar, collections and contact |
| `/projects`                    | All              | Six projects with URL-backed category filters                      |
| `/projects/:slug`              | All              | Case study, status, sources, limits and adjacent projects          |
| `/hackathons`                  | All              | Resume-reported event archive                                      |
| `/hackathons/:slug`            | All              | Event details with missing evidence identified                     |
| `/thoughts`                    | All              | Existing article archive and publication link                      |
| `/thoughts/:slug`              | All              | Editorial introduction and original publication action             |
| `/photography`                 | All              | Planned collections and photography workflow                       |
| `/photography/:collectionSlug` | All              | Collection, empty state or full-size image viewer                  |
| `/toolkit`                     | Development only | Dialog, calendar and QR examples                                   |
| Other paths                    | All              | Contextual recovery or page not found                              |

## Focus and recovery

The skip link moves to main content. Route changes focus the new heading and reset scroll.
Dialog Escape returns focus to its keyboard invoker or clicked trigger. Page-not-found includes a home link.
The shell error boundary gives safe feedback and reload recovery.
The lazy toolkit has stable loading space. Heavy controls belong behind lazy routes or feature boundaries.

## Feature availability

The shell has no sign-in, contact form or scheduling flow. Mail opens the supplied address.
The resume downloads an actual public PDF. Internal links use Router; external destinations come from `src/lib/links.ts` or sourced content records.
Project filters survive reload and history. The palette can open sections, archives, projects, the article, profiles, themes or the resume.
On mobile, the section selector provides direct jumps. Desktop index marks the section in view.
Photography uses native horizontal scrolling and collection arrows. Published photos will open the viewer; empty collections never show invented media.
The calendar gateway and profile API fail visibly without fixture fallback. Page views remain explicitly unavailable until a real service is configured.

## Link inventory

| Surface                           | Destination owner              | Current behavior                                               |
| --------------------------------- | ------------------------------ | -------------------------------------------------------------- |
| Logo and Home                     | `/`                            | Restore hero scroll and heading focus                          |
| Main Projects                     | `/projects`                    | Archive with category query state                              |
| Main Experience and Contact       | Home hashes                    | Jump and focus the section heading                             |
| Desktop index and mobile selector | Nine section IDs in content    | Correct hash and current-section indication                    |
| Project cards and adjacent links  | Typed project slugs            | Case studies; unknown slugs recover to archive                 |
| Event card                        | `/hackathons/svasth`           | Resume-reported result; original source has no public download |
| Writing preview and archive       | Article slug and link registry | Editorial introduction or existing Bear Blog publication       |
| Photography cards                 | Typed collection slugs         | Empty collection now; original-image viewer when populated     |
| Social, mail, writing and resume  | `src/lib/links.ts`             | Supplied external links, mail handler, valid public PDF        |
| Quote attribution                 | Typed quotation source         | Original source page                                           |
| Footer top link                   | `#main`                        | Return to main content                                         |

Source evidence is in [the content inventory](content-inventory.md). Browser checks cover nested reloads, history, unknown paths, public PDF download and command destinations.
