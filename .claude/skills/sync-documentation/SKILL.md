---
name: sync-documentation
description: >-
  Enforce documentation updates after code changes in the Jenny Tang portfolio repo.
  Use whenever editing src/, package.json, vite.config.js, routes, or public/images paths.
  Invoke with /sync-documentation before closing a task to verify docs match code.
---

# Sync documentation

Repo: **React 18 + Vite portfolio** (web, not React Native).

## Rule

**Every code, config, route, dependency, or asset path change must update matching docs in the same commit/task.**

Do not mark work complete if docs describe old behavior.

## Read

1. `AGENTS.md`
2. `docs/USAGE_GUIDE.md` §4.2 — full mapping table

## Quick mapping

| Change | Update |
|--------|--------|
| `src/data/*` | `docs/FEATURE_MAP.md`, `FULL_DOCUMENTATION.md`; `CONTENT_SOURCE.md` if copy changed (user overrides) |
| `docs/CONTENT_SOURCE.md` | `USAGE_GUIDE.md` §3.1, `FEATURE_MAP.md` |
| `src/App.jsx` routes | `ARCHITECTURE_OVERVIEW.md`, `FEATURE_MAP.md`, `AI_AGENT_GUIDE.md`, `USAGE_GUIDE.md` |
| `src/projects/*` | `FEATURE_MAP.md` (Fx) |
| `src/components/*` (homepage) | `FEATURE_MAP.md` |
| `ProjectShell.jsx` | `AI_AGENT_GUIDE.md`, `ARCHITECTURE_OVERVIEW.md` |
| `package.json` | `FULL_DOCUMENTATION.md` §1, `README.md` if scripts change |
| New project | `FEATURE_MAP`, `ARCHITECTURE`, `AI_AGENT_GUIDE`, `FULL_DOCUMENTATION`, `API_FLOW`, `AGENTS.md` |

## Done checklist

- [ ] All applicable doc files from the table are updated
- [ ] `slug` / `link` / `App.jsx` route align with `projects.js`
- [ ] User is told which docs were changed
