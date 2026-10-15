# Proposed page architecture

**Status:** TARGET architecture with partial implementation. Current routes are `/`, `/photography`, development `/toolkit`, and recovery.

The selected screenshots now control homepage order: About, Projects, Experience, Hackathons, In Code, Skills, Train of Thought, Photography and Contact.
Remaining archives, case studies, photographic detail routes and live integrations are pending. The earlier proposal below is historical where superseded.

## Homepage hierarchy

The owner clarified the roles of all three references.
Use Anurag's content organization, Sakthi's hover-responsive scene, and Parth's hanging hackathon photographs with an original visual identity.

| Section              | Presentation and purpose                                                                             | Relative weight                  |
| -------------------- | ---------------------------------------------------------------------------------------------------- | -------------------------------- |
| 00 Introduction      | Original hover-responsive scene, compact name scramble, identity, GitHub profile and search shortcut | Compact document header          |
| 01 About             | Concise introduction across engineering, research and photography                                    | Short prose                      |
| Early contact strip  | GitHub, LinkedIn, Email, and public Resume when available                                            | One compact row, before projects |
| 02 Selected Projects | OncoSyn, Cryptalis, Smolink. Header filters, dense editorial previews, statuses and case-study links | Main evidence section            |
| 03 Experience        | Two vertically stacked internships, expandable responsibilities and education                        | Compact timeline                 |
| 04 Hackathons        | Hanging real event photographs, exact results and a bounded browsable wall                           | Content-dependent preview        |
| 05 Skills            | Useful engineering domain groups                                                                     | Compact grouped text             |
| 06 Train of Thought  | Up to three available articles and archive link                                                      | Typography-first preview         |
| 07 Photography       | Rotating actual-image filmstrip with Pause/Play and photo/collection detail links                    | Bounded visual sequence          |
| 08 In Code           | Real GitHub matrix, source-profile link, period/totals/legend and sourced engineering milestones     | Compact evidence panel           |
| 09 Contact           | Final contact invitation, sourced quote controls and real page views                                 | Compact footer                   |

Anurag's standalone Open Source section inspires the milestone/repository presentation inside In Code.
Do not claim open-source contributions without actual contribution evidence.
The early contact strip and closing contact section serve different positions in the same document.
All original feature requirements remain in scope. Their section order changes to reflect the owner's correction.
Missing material needs a clear dependency, not fabricated public content.
Before launch, agree whether incomplete media sections remain as honest notices or wait for their assets.

## Route map

| Route                | Content and states                                                                                                                                       |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                  | Homepage, anchored sections                                                                                                                              |
| `/projects`          | Project archive with domain/status filters in URL state                                                                                                  |
| `/projects/:slug`    | Case study with Problem, Motivation and constraints, Architecture, Decisions, Implementation, Trade-offs, Evidence, Limitations, Future work, References |
| `/hackathons`        | Chronological event history, exact results, sources, approved team names, photo gallery                                                                  |
| `/thoughts`          | Search, topic filter, date sort, sourced metadata, external article links                                                                                |
| `/photography`       | Collections and thumbnails, accessible full-size viewing                                                                                                 |
| `/photography/:slug` | Collection or photograph, supplied captions and approved metadata                                                                                        |
| Unmatched route      | Useful 404 with home and work links                                                                                                                      |
| Route/data failure   | Accessible recovery with relevant retry action                                                                                                           |

Do not add local article routes until local writing content exists.
Do not add a hackathon detail route solely for one event. The archive can link to an event anchor.
Nested hosting paths require a router/base-path decision when hosting is selected.

## Navigation and focus

Top navigation aligns to the document column and offers Home, Work, Thoughts, Contact, Search and Theme.
Photography remains accessible through the section index and its dedicated route.
Desktop adds a compact numbered section index with active state and ordinary anchor links.
An IntersectionObserver determines the active section using the sticky header offset.
Anchor navigation updates the hash and focuses the target heading without hiding it beneath the header.
Native scrolling remains available. No scroll interception or mandatory animated transitions occur.

Mobile uses a named section-menu button with an accessible dialog/list and explicit dismissal.
The index disappears before it competes with reading width.
Route changes retain the current route-focus contract. Back navigation restores useful scroll and filter state.
Each route has its own title, description, primary heading and useful loading/error state.

## Content models

Keep projects, experiences, events, articles, photographs and quotations outside presentation components.
Project records include slug, domain, status, summary, stack, implemented scope, evidence, limitations and verified links.
Event records include result enum, date precision, associated project, media and sources. Unknown dates do not become invented dates.
Article records permit missing date, excerpt, topic and reading time. Never derive these from a URL alone.
Photo records require actual asset paths, dimensions, alternate text and ownership/permission information.
Contribution records require original dates/counts/levels, period, source and retrieval timestamp.

Use the existing module direction: app → routes → features → shared controls/libraries.
Transport and response validation stay below the presentation layer.
