# Proposed page architecture

**Status:** CURRENT architecture. The only portfolio routes are `/`, `/blogs`, `/photography`, and unmatched-path recovery.

The selected screenshots now control homepage order: About, Projects, Experience, Hackathons, In Code, Skills, Train of Thought, Photography and Contact.
Project, experience, hackathon, achievement, skills, and GitHub content remain in one homepage flow. Writing and photography have the only archive routes. The earlier multi-route proposal is historical where superseded.

## Homepage hierarchy

The owner's October 18 clarification makes the supplied light and dark Debrato compositions the structural authority.
Use compact left labels, shared body gutters, divided rows and a wide hero. Anurag supplies alignment principles, Sakthi informs the deferred scene, and Parth informs event framing.

| Section              | Presentation and purpose                                                                           | Relative weight                 |
| -------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------- |
| 00 Introduction      | Name scramble, identity, metadata, contact/project actions and responsive section index            | Wide hero, scene deferred       |
| 01 About             | Concise introduction beside a developer snapshot, with the note in the label gutter                | Short prose row                 |
| 02 Selected Projects | Six portrait cards with filters, complete summaries, visible technologies and native inline briefs | Three desktop columns, two rows |
| 03 Experience        | Two sourced internships and education beside the section label                                     | Compact desktop timeline        |
| 04 Hackathons        | One paper event record with exact result and honest pending-media labels                           | Content-dependent preview       |
| 05 In Code           | Seven-row GitHub calendar beside profile metrics, source links and sourced engineering notes       | Adjacent desktop panels         |
| 06 Skills            | Five engineering domain groups beside the section label                                            | Compact grouped text            |
| 07 Train of Thought  | One sourced article preview, writing archive and original-publication link                         | Quiet article row               |
| 08 Photography       | Horizontal collection strip, rotation for populated collections, gallery navigation                | Bounded filmstrip               |
| 09 Contact           | Contact actions followed by sourced quotes and truthful page views                                 | Compact closing rows            |

Anurag's standalone Open Source section inspires the milestone/repository presentation inside In Code.
Do not claim open-source contributions without actual contribution evidence.
All original feature requirements remain in scope. Their section order changes to reflect the owner's correction.
Missing material needs a clear dependency, not fabricated public content.
Before launch, agree whether incomplete media sections remain as honest notices or wait for their assets.

## Route map

| Route           | Content and states                                                                                   |
| --------------- | ---------------------------------------------------------------------------------------------------- |
| `/`             | Continuous homepage, anchored sections, filters, inline project briefs and inline hackathon carousel |
| `/blogs`        | Complete writing archive with verified external publication links                                    |
| `/photography`  | Every collection in one gallery with empty states and accessible full-size lightbox viewing          |
| Unmatched route | Useful 404 with a homepage recovery action                                                           |
| Data failure    | Accessible in-place recovery with relevant retry action                                              |

Do not add project, case-study, event, article-detail, achievement, or collection routes. Use homepage disclosure or a collection anchor/lightbox.
Nested hosting paths require a router/base-path decision when hosting is selected.

## Navigation and focus

Top navigation offers Home, Projects, Experience and Contact, with Search and Theme controls. Writing and photography archive links sit in their section headings and remain available through command search.
Homepage content uses hashes; writing and photography use their dedicated archive routes.
Desktop adds a hero index or outer rail when its readable labels fit. Scroll positions determine the active section.
Anchor navigation updates the hash and focuses the target heading.
Native scrolling remains available. No scroll interception or mandatory animated transitions occur.

Mobile and enlarged text use a named native section selector. The index disappears before it competes with reading width.
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
