# Routes and journeys

**Owner:** Frontend route behavior

## Route map

| Route          | Behavior                                                               |
| -------------- | ---------------------------------------------------------------------- |
| `/`            | Continuous portfolio with nine anchored sections and inline disclosure |
| `/blogs`       | Complete writing archive with verified original-publication links      |
| `/photography` | Complete collection gallery; published images open in a lightbox       |
| Other paths    | Page not found with recovery to the homepage                           |

These are the only internal portfolio routes. Projects, experience, skills,
hackathons, achievements, and GitHub activity remain on `/`. Do not add project,
event, article-detail, achievement, or photography-collection routes.

## Focus and recovery

The skip link moves to main content. Route changes focus the new page heading and
reset scroll. Homepage hashes remain in browser history, scroll to the matching
section, and focus its heading. A project hash also opens the matching project
brief and focuses its title.

Project cards expose status, summary, stack, repository action, engineering
context, limits, and sources on the homepage. Their native details element keeps
longer evidence optional without moving the visitor to another page.

The compact hackathon record keeps each event inline. Previous/next controls
and arrow keys share its selection; controls stay hidden when only one verified
record exists. No missing event image is replaced with invented media.

The photography preview links to collection anchors on `/photography`. The
gallery renders every collection in one document. Published thumbnails open the
focus-managed lightbox; empty collections remain explicit.

Dialog Escape returns focus to its keyboard invoker or clicked trigger. The
shell error boundary gives safe feedback and reload recovery.

## Navigation and commands

| Surface                            | Destination                                   |
| ---------------------------------- | --------------------------------------------- |
| Logo and Home                      | `/` and hero focus                            |
| Main Projects, Experience, Contact | Homepage hashes                               |
| Desktop index and mobile selector  | Nine homepage section IDs                     |
| Project commands                   | Homepage project hashes with inline expansion |
| Writing preview                    | `/blogs`                                      |
| Published articles                 | Verified original publication                 |
| Photography cards                  | Collection anchors on `/photography`          |
| Social, mail, resume               | `src/lib/links.ts` destinations               |

The command palette can jump to homepage sections and projects, open either
archive, change theme, download the resume, or open approved external contact
destinations. It does not expose removed legacy routes.

Source evidence is in [the content inventory](content-inventory.md). Browser
checks cover direct reloads of all three routes, hash focus, inline expansion,
legacy-route rejection, public PDF download, and command destinations.
