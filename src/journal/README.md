# `src/journal/` — the out-of-character notes

Dermot's own essays on the reasoning, wrong turns and small decisions behind the story. With `about/`, one of the site's two non-diegetic sections; it sits under `/story-engine/`, whose `index.md` is the parent page. Rendered by `_includes/journal-entry.njk`. Note the licence split in the root README lists neither `journal/` nor `about/` among the content paths, so by its wording they fall on the MIT side with the engine; if that is not the intent, the list there is the place to fix it.

Front matter: `title` and `date` required; `tags`, `description` optional. Scaffold with `npm run new -- journal`.

**What goes here versus the changelog** (agreed 2026-08-16, amended 2026-08-31): `CHANGELOG.md` answers *what changed*, complete and for retrieval; the Journal answers *what did I learn*, selective and for reading. Reasoning worth real prose belongs in an entry here, and the changelog line then says what changed and where without repeating it.

**What may be published here** is derived from `story-bible/`, never mirrored from it: craft vocabulary and reasoning only. The test before publishing anything drawn from the story bible is not *is this interesting?* but *does this tell a reader something the story has not told them yet?* `story-bible/` itself is permanently unpublished.
