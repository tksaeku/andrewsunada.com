# Git and release

## Repository

- Public GitHub repo: `tksaeku/andrewsunada.com`. Use the `gh` CLI for pull requests, Actions runs, secrets and variables.
- `main` is the live site. Work on a feature branch named per `/tkgithub` and merge to `main` to release.
- `archive/old-main` keeps the previous site's history. Leave it alone.
- `dev`, `rework`, `feat/image`, `update/design` and `reset` hold previous sites, and `dev` history contains old credentials. Never merge, rebase onto or cherry-pick from them.

## Release

A push to `main` runs `.github/workflows/ci.yml`: `npm run verify`, then `rsync --delete` of `build/` to DreamHost over SSH. Pull requests run the checks without deploying. The secrets and variables the workflow reads are listed in the [README](../README.md#release-it).

The site is on DreamHost shared hosting, which serves static files only. The domain's web directory is `andrewsunada.com/public` in the shell user's home, and the deploy copies `build/` into it. The rsync excludes `.well-known/` (Let's Encrypt renewals), `cgi-bin/` and DreamHost's `.dh-diag` link. HTTPS uses DreamHost's free Let's Encrypt certificate, managed in the panel under the domain's Security tab.

The deploy logs in with a deploy-only SSH key whose public half is in the shell user's `~/.ssh/authorized_keys`. The private half is the `DREAMHOST_SSH_KEY` secret and `~/.ssh/andrewsunada_deploy` on Andrew's machine.

To deploy by hand when Actions is unavailable, build locally and run the same rsync, with a dry run (`-n`) first:

```bash
npm run verify
rsync -rlvzn --delete --checksum --exclude='.well-known/' --exclude='cgi-bin/' --exclude='.dh-diag' \
  -e "ssh -i ~/.ssh/andrewsunada_deploy" build/ <user>@<host>:<web directory>/
```

Drop the `n` from `-rlvzn` to copy for real. The user, host and web directory are the `DREAMHOST_USER`, `DREAMHOST_HOST` and `DREAMHOST_PATH` secrets.

Ask Andrew before pushing, opening a pull request, merging, or touching DreamHost. Before any push, run `npm run verify` and check the preview (see [local-development.md](local-development.md)).

## What must not be committed

- `docs/research/` and `assets/photos/` are git-ignored and stay that way.
- No student names, coach or partner names from private notes, home address, phone number, or email address other than `andrew@andrewsunada.com`. Partner names that appear in public YouTube titles are allowed in `videos.ts`.
- `.env*` files other than `.env.example`.
- `.DS_Store` files. They are git-ignored.

## Conventions

Follow the `/tkgithub` skill for branch names, commit messages and pull requests, and `/tkjs` for code.
