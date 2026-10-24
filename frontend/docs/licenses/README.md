# Imported guidance licenses

**Owner:** Imported guidance attribution

The nineteen bundles remain unchanged. License texts and notices live beside this record so the existing integrity lock stays valid.
These records cover tooling source in the repository. The application build excludes this tooling.

| Bundles                                                                                | Upstream and revision                                                                                                                         | Retained terms                                                                                                                              |
| -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| caveman, investigate-first, lean-build, safe-refactor, surgical-patch, verify-and-stop | [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman/tree/6571943370f7c9d4de1946481177ee7b306cd8e8)                               | [Apache 2.0](caveman-Apache-2.0.txt), [legacy MIT](caveman-MIT.txt), [NOTICE](caveman-NOTICE.txt), [licensing scope](caveman-LICENSING.txt) |
| design-taste-frontend                                                                  | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill/tree/ce26fc25c0e5e8cab638f883de62d9a86ee5e45b)                                 | [MIT](taste-skill-MIT.txt)                                                                                                                  |
| impeccable                                                                             | [pbakaus/impeccable](https://github.com/pbakaus/impeccable/tree/ece38d9904b8a619b3f77cab476eacad09c4fb11)                                     | [Apache 2.0](impeccable-Apache-2.0.txt), [NOTICE](impeccable-NOTICE.txt)                                                                    |
| playwright, playwright-interactive, screenshot                                         | [openai/skills](https://github.com/openai/skills/tree/49f948faa9258a0c61caceaf225e179651397431)                                               | Existing Apache 2.0 license files and notices stay inside these bundles.                                                                    |
| ponytail                                                                               | [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail/tree/e15862bb04d04285233a164460ced063941d9ef5)                           | [MIT](ponytail-MIT.txt)                                                                                                                     |
| react-best-practices, web-design-guidelines                                            | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills/tree/063bee94c3f4df8453406c830b0a7df0f2860278)                         | [MIT terms and author attribution](vercel-agent-skills-MIT.txt), [upstream declaration](vercel-agent-skills-upstream-README.txt)            |
| ui-ux-pro-max                                                                          | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/tree/477bcb28c9812b385cb51a4605ddf30d7b2266e2) | [MIT](ui-ux-pro-max-MIT.txt)                                                                                                                |
| graphify                                                                               | [safishamsi/graphify](https://github.com/safishamsi/graphify/tree/92741d162b2094ffc2fed58cfbd8ee823e9da62c)                                   | [Apache 2.0](graphify-Apache-2.0.txt), [legacy MIT](graphify-MIT.txt), [NOTICE](graphify-NOTICE.txt)                                        |
| fastapi                                                                                | [fastapi/fastapi](https://github.com/fastapi/fastapi/tree/7a0a3f0b286c6c865cf4398ea0e957a87b8bffa4/fastapi/.agents/skills/fastapi)            | [MIT](fastapi-MIT.txt)                                                                                                                      |
| python-testing                                                                         | [ahgraber/skills](https://github.com/ahgraber/skills/tree/27672dd7726310815ebe51b660fb355a9a1c5558/skills/python-testing)                     | [CC0 1.0](python-testing-CC0-1.0.txt)                                                                                                       |
| asd-ste100                                                                             | Existing local import by Ege Chelebi                                                                                                          | [Existing MIT license and specification exclusion](../../.agents/skills/asd-ste100/LICENSE)                                                 |

The Vercel README declares MIT, but that snapshot has no standalone license text or copyright line.
The retained terms file combines standard MIT terms with the upstream author attribution. It does not invent a copyright line.

The Python-testing entrypoint exactly matches the historical source above.
The FastAPI entrypoint matches that source apart from eleven added upstream lines.
Graphify's original import revision remains unrecorded. Its embedded upstream link and source structure support the origin listed above.
The Graphify license snapshot preserves both current Apache terms and the legacy MIT grant. It does not identify the original import commit.

Impeccable includes platform references derived from [ehmo/platform-design-skills](https://github.com/ehmo/platform-design-skills).
Its upstream notice and the [platform MIT license](platform-design-skills-MIT.txt) remain here.
Its bundled screenshot helper also needs the [modern-screenshot MIT license](modern-screenshot-MIT.txt), copyright wxm.
No runtime, font atlas, or executable from Caveman or Graphify is added by these notices.

The ASD-STE100 implementation license excludes the specification itself. The repository does not include the complete specification.
The [source receipt](sources.json) records retrieval URLs and SHA-256 hashes. Check `skills-lock.json` for imported file hashes and origins.
