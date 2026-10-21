# Portfolio product context

**Owner:** Product purpose

## Intended outcome

Create Debrato Ghosh's personal portfolio across software systems, scientific research, and photography.
Show credible work and engineering decisions, with clear status, evidence, and contact paths.
The [master design review](docs/design-decisions.md) records the proposed audience and visual direction.

## Current slice

CURRENT: the full portfolio foundation follows the supplied light/dark mockups and the selected references. It is one continuous homepage with compact labeled rows, portrait project previews, inline briefs, a compact hackathon record, command search, saved themes, name scramble, a connected seven-row contribution renderer, a persistent page-view counter, the running cat and photography collection navigation.
Only `/`, `/blogs` and `/photography` are portfolio routes. Writing keeps one archive; photography keeps one complete gallery with a lightbox. Project, event, article-detail and collection-detail routes are intentionally absent.
Missing original media and services have explicit empty or unavailable states. No fictional counts, results, article dates or personal photographs are published.

## Next product decisions

CURRENT: the owner supplied four landscape images and authorized the hero sketch-to-color reveal. The [background review](docs/sketch-to-color-background.md) records registration, configuration, fallbacks and verification limits.
BLOCKED_EXTERNAL: original photographs and official event evidence. A server GitHub token is required only for the optional official GraphQL calendar path.
Publishing remains DEFERRED. See the [content inventory](docs/content-inventory.md) and [handoff](docs/HANDOFF.md).
