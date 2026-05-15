---
name: portfolio-site
description: >-
  Work on the Jenny Tang React+Vite portfolio site: edit content, routes, per-project
  pages, styles, and mandatory documentation sync. Use when modifying this portfolio
  repo, adding projects, changing homepage sections, or when the user mentions AGENTS.md,
  USAGE_GUIDE, or portfolio documentation.
---

# Portfolio site workflow

## Before coding

1. Read [AGENTS.md](../../AGENTS.md)
2. Read [docs/USAGE_GUIDE.md](../../docs/USAGE_GUIDE.md) — doc sync table
3. Confirm: **web React 18 + Vite**, not React Native

## Mandatory: update docs

After **any** code change, update docs per the mapping table in `USAGE_GUIDE.md`.

Tell the user which doc files you updated.

## Content source (`docs/CONTENT_SOURCE.md`)

- Mapping reference only — **not** imported at runtime
- On content changes: update `CONTENT_SOURCE.md` **and** runtime files (`src/data/*`, `src/projects/*`)
- **User instructions in chat override** `CONTENT_SOURCE.md`

## Edit homepage copy

| Content | File |
|---------|------|
| Profile, contact | `src/data/profile.js` |
| Hero + impact numbers | `src/data/stats.js` |
| About | `src/data/about.js` |
| Skills | `src/data/skills.js`, `src/data/skillIcons.js` |
| Project cards | `src/data/projects.js` |

→ Update `docs/FEATURE_MAP.md` for affected features.

## Edit one project page (custom design)

- JSX: `src/projects/<Name>Project.jsx`
- CSS: `src/styles/projects/<name>.css`
- Wrap with `ProjectShell` + matching `slug` prop
- **Do not** merge into a shared generic template

→ Update `docs/FEATURE_MAP.md` for that project.

## Add new project

1. `src/data/projects.js` — `{ slug, link: '/projects/<slug>', ... }`
2. `src/projects/NewProject.jsx` + `src/styles/projects/new-project.css`
3. `src/App.jsx` — `<Route path="/projects/<slug>" element={<NewProject />} />`
4. `public/images/projects/<slug>.jpg`
5. Update docs: `FEATURE_MAP.md`, `ARCHITECTURE_OVERVIEW.md`, `AI_AGENT_GUIDE.md`, `FULL_DOCUMENTATION.md`, `API_FLOW.md`, `AGENTS.md` if routes change

## Sync invariants

```
projects.js slug === App.jsx path segment === ProjectShell slug prop
projects.js link === '/projects/' + slug
getAllProjects() order === prev/next pager order
```

## Commands

```bash
npm install && npm run dev
```

## Avoid

- `motion.div` typos (no framer-motion)
- `href="#work"` on project pages → use `href="/#work"` or `<Link to="/#work">`
- Editing only `projects.js` for long case study body (content lives in `src/projects/*.jsx`)

## Deep reference

- [docs/AI_AGENT_GUIDE.md](../../docs/AI_AGENT_GUIDE.md)
- [docs/ARCHITECTURE_OVERVIEW.md](../../docs/ARCHITECTURE_OVERVIEW.md)
