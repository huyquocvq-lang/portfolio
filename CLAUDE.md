# CLAUDE.md

Instructions for Claude Code / Claude Projects working on this repo.

## Read first

1. [AGENTS.md](./AGENTS.md)
2. [docs/USAGE_GUIDE.md](./docs/USAGE_GUIDE.md)
3. [docs/AI_AGENT_GUIDE.md](./docs/AI_AGENT_GUIDE.md)

## Hard rules

- **React 18 + Vite 5 web portfolio** — not React Native.
- **Every code change must update documentation** per the mapping table in `USAGE_GUIDE.md`.
- Each project page has its own `src/projects/*.jsx` + `src/styles/projects/*.css` — no shared generic template.
- Keep `projects.js` slug/link aligned with `App.jsx` routes and `ProjectShell` slug prop.
- `docs/CONTENT_SOURCE.md` is the authoring mapping reference — update on content changes; user chat overrides it.

## Claude Code skills (project)

| Skill | Path | Invoke |
|-------|------|--------|
| Portfolio workflow | `.claude/skills/portfolio-site/SKILL.md` | `/portfolio-site` |
| Doc sync check | `.claude/skills/sync-documentation/SKILL.md` | `/sync-documentation` |

Claude auto-loads these when relevant. Skills load from `.claude/skills/` in this repo (shared via Git).

## Commands

```bash
npm install && npm run dev
```

Node 18+.
