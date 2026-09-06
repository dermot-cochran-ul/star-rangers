# `.github/` — CI, Pages, and the issue door

## `workflows/ci.yml`

Runs on every pull request: `npm test` (unit suite, changelog checks, content validation, link and related-term checks, version check, Eleventy dry run), then the theme step (`generate-themes` followed by `check-contrast.js`, failing if any `theme-*.css` changed), `shellcheck --severity=warning` over the five deploy scripts, and the shared-scripts job that diffs `deploy-lib.sh`, `mail-lib.sh`, `ensure-node.sh` and `cpanel-autopull.sh` against `dermot-cochran-photography`'s `main` (pre-existing drift fails; a PR changing one of them only warns). `TestingStrategy.md` is the reference.

## `workflows/deploy.yml`

Builds and deploys to GitHub Pages on every push to `main`, under the `/star-rangers/` prefix with `COMMENTS_ENABLED=false` (pathname-mapped comments would otherwise create a disconnected discussion set). The production domains do not deploy from here: each is a cPanel clone pulled by cron (`scripts/cpanel-autopull.sh`), so a merge reaches them on the next pull, not on this workflow.

## `ISSUE_TEMPLATE/`

Blank issues are disabled and the tracker is the author's own backlog; `config.yml` routes readers to the discussion forum instead. Two templates exist for findings deferred out of the two review processes: `critic-finding.md` (`story-bible/benevolent-critic.md`) and `pr-review-finding.md` (`story-bible/pr-review.md`). Third-party pull requests are not accepted (`CONTRIBUTING.md`).

There is no pull request template; a PR body says what the change commits the story to and names any decision that is Dermot's and not yet made (`CLAUDE.md`, *Authority and review boundary*).
