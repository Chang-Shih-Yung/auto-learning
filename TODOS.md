# TODOs

## Auto-schedule daily digest generation via CC scheduled task
**What:** Set up a Claude Code scheduled task (via `/schedule`) that runs the digest generation session automatically each morning.
**Why:** The current flow is manually triggered. The personalized annotation pipeline (reading skill-taxonomy.yaml, outputting AnnotationCard blocks) is already handled by the updated prompt — the only missing piece is automated invocation.
**Context:** The digest generation prompt in `memory/learning-context.md` (after the annotation feature ships) will be self-contained: it reads skill-taxonomy.yaml, fetches AI news, and writes the annotated MDX file. A CC scheduled task can run this without human intervention. The `/schedule` skill handles this.
**Depends on:** Annotation feature (this PR) must ship first so the prompt produces annotated output.
