# Usage Guide — Jenny Tang Portfolio

For **developers** and **AI agents (Cursor / Claude)**. Read with [AGENTS.md](../AGENTS.md) at the repo root.

---

## 1. What this project is

A static portfolio SPA for Jenny Tang — React + Vite, deployed as static files (GitHub Pages, Netlify, Vercel, etc.).

**This is not a React Native mobile app.**

---

## 2. Run locally

```bash
cd portfolio
npm install
npm run dev
```

Open http://localhost:5173

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Serve production build locally |

**Requirement:** Node.js 18+

---

## 3. Folder structure (quick reference)

```
src/data/          ← Homepage + project copy (edit here)
src/components/    ← Homepage UI (Nav, Hero, Impact, AboutSkills, PersonalInterest, Projects, Footer, BannerEmbed)
src/pages/         ← HomePage
src/projects/      ← One JSX file per project (unique layout)
src/embeds/        ← TSX dashboard exports (lazy-loaded by EmbedSlot)
src/styles/        ← CSS (theme vars live in :root of global.css)
public/images/     ← Images (paths like /images/...)
public/banners/    ← Self-contained HTML banner files for each project (one per slug)
docs/              ← Technical docs (MUST update when code changes)
docs/CONTENT_SOURCE.md  ← Authoring reference (mapping only, not bundled)
```

---

## 3.1 Content source file (`CONTENT_SOURCE.md`)

`docs/CONTENT_SOURCE.md` holds the **original long-form copy** for homepage sections and project case studies. Use it to map text into code — it is **not** imported at runtime.

| Rule | Detail |
|------|--------|
| Purpose | Mapping reference between business copy and `src/data/*` / `src/projects/*` |
| User wins | If the user says something different in chat, **follow the user**, not this file |
| When to update | On content-change requests, update this file **and** the runtime files (`src/data/*`, project JSX) unless the user says otherwise |
| When to skip | Pure layout/CSS changes with no copy change |

---

## 4. Golden rules for AI and developers

### 4.1 Every code change → update docs

When you change **any** code, config, or repo structure, **you must** update the related docs in the same change (same commit/PR).

Do not leave docs describing old behavior.

### 4.2 Mapping: code change → documentation

| You change | Update at minimum | May also need |
|------------|-------------------|---------------|
| `src/data/profile.js` | `FEATURE_MAP` (F2, F6), `FULL_DOCUMENTATION` §10 | `CONTENT_SOURCE.md` (if narrative changes; user instructions override) |
| `src/data/stats.js` | `FEATURE_MAP` (F1, F3), `FULL_DOCUMENTATION` | `CONTENT_SOURCE.md` |
| `src/data/about.js`, `skills.js`, `skillIcons.js` | `FEATURE_MAP` (F4) | |
| `src/data/personal.js` (interest copy + images) | `FEATURE_MAP` (F4b), `CONTENT_SOURCE.md` | |
| `src/data/projects.js` (card/slug/link/banner) | `FEATURE_MAP`, `ARCHITECTURE_OVERVIEW`, `AI_AGENT_GUIDE`, `API_FLOW` | `FULL_DOCUMENTATION` Appendix B |
| `src/data/projectEmbeds.js` (embed keys) | `AI_AGENT_GUIDE` embed table, `src/embeds/README.md` | `FEATURE_MAP` |
| `src/App.jsx` (routes) | `ARCHITECTURE_OVERVIEW`, `FEATURE_MAP`, `AI_AGENT_GUIDE`, `FULL_DOCUMENTATION` §5 | `USAGE_GUIDE` §3 |
| `src/components/Hero.jsx` or hero CSS | `FEATURE_MAP` F1, `FULL_DOCUMENTATION` | |
| `src/components/Nav.jsx` | `FEATURE_MAP` F2 | |
| `src/components/PersonalInterest.jsx` / `BannerEmbed.jsx` | `FEATURE_MAP` (F4b / banner system), `AI_AGENT_GUIDE` | |
| `src/components/project/EmbedSlot.jsx` | `AI_AGENT_GUIDE` embed table, `src/embeds/README.md` | `ARCHITECTURE_OVERVIEW` |
| `src/embeds/*Dashboard.tsx` | `src/embeds/README.md`, `AI_AGENT_GUIDE` embed table, `FEATURE_MAP` (matching Fx) | |
| `public/banners/*.html` | `FEATURE_MAP` banner section, `AI_AGENT_GUIDE` banner notes | `API_FLOW` |
| `src/projects/*Project.jsx` | `FEATURE_MAP` (matching Fx), layout notes in FEATURE_MAP | `CONTENT_SOURCE.md` (matching project section) |
| Theme tokens in `src/styles/global.css :root` | `FEATURE_MAP` theme section, `AI_AGENT_GUIDE` theme notes | `FULL_DOCUMENTATION` |
| `docs/CONTENT_SOURCE.md` | `USAGE_GUIDE` §3.1 if policy changes | `FEATURE_MAP` content-source section |
| `src/styles/projects/*.css` | Note in FEATURE_MAP if layout changes significantly | |
| `src/components/project/ProjectShell.jsx` | `ARCHITECTURE_OVERVIEW`, `AI_AGENT_GUIDE` (dangerous) | `FULL_DOCUMENTATION` |
| `package.json` (dependencies) | `FULL_DOCUMENTATION` §1, `ARCHITECTURE_OVERVIEW` | `README.md` |
| `vite.config.js`, deploy | `FULL_DOCUMENTATION` §4, `API_FLOW` | |
| New project | All: `FEATURE_MAP`, `ARCHITECTURE`, `AI_AGENT_GUIDE`, `FULL_DOCUMENTATION` §5/10, `API_FLOW` paths | `AGENTS.md` route table |
| `public/images/` only | `API_FLOW` (path table), `FEATURE_MAP` if filenames change | |
| Team workflow / process | `AI_AGENT_GUIDE`, `USAGE_GUIDE`, `AGENTS.md` | |

### 4.3 Checklist before finishing a task

```
[ ] Code runs (npm run dev)
[ ] Routes/slug/link aligned (projects.js ↔ App.jsx ↔ ProjectShell slug)
[ ] Docs updated per table above
[ ] No unnecessary dependencies added
[ ] Mobile: test ≤768px width if CSS/layout changed
```

---

## 5. Common workflows

### Change homepage text

1. Open `src/data/<file>.js`
2. Edit strings
3. Update `docs/FEATURE_MAP.md` if feature meaning changes
4. `npm run dev` → verify `/#impact`, `/#about`, `/#work`

### Change one project page (design + content)

1. Edit `src/projects/<Name>Project.jsx`
2. Edit `src/styles/projects/<name>.css`
3. Homepage card teaser only: `src/data/projects.js`
4. Update `docs/FEATURE_MAP.md` (section Fx)
5. **Do not** merge into a shared template — each project keeps its own files

### Add a new project (e.g. 8th)

1. `src/data/projects.js` — add object with `slug`, `link`, `image`, optional `banner` (`/banners/<slug>.html`)
2. `src/projects/MyProject.jsx` + `src/styles/projects/my-project.css`
3. `src/App.jsx` — add `<Route path="/projects/<slug>" element={<MyProject />} />`
4. `public/images/projects/my-project.jpg` (still useful as ProjectShell fallback)
5. `public/banners/<slug>.html` (optional — animated hero banner, see existing files for wrapper CSS / JS scale pattern)
6. Optional dashboard: drop `MyDashboard.tsx` in `src/embeds/`, register in `EmbedSlot.jsx` + `projectEmbeds.js`, mount `<EmbedSlot {...projectEmbeds.myKey} />` on the page
7. Update docs: `FEATURE_MAP`, `ARCHITECTURE_OVERVIEW`, `AI_AGENT_GUIDE`, `FULL_DOCUMENTATION`, `API_FLOW`
8. Verify prev/next on `ProjectShell`

### Deploy

```bash
npm run build
# Upload dist/ — enable SPA fallback (all paths → index.html)
```

---

## 6. Routes

| URL | Component |
|-----|-----------|
| `/` | HomePage |
| `/projects/winterplace` | WinterplaceProject |
| `/projects/programmatic-cutover` | ProgrammaticCutoverProject |
| `/projects/publisher-trend-analysis` | PublisherTrendProject |
| `/projects/pf-master` | PfMasterProject |
| `/projects/glean-planner` | GleanPlannerProject |
| `/projects/ai-rewriter` | AiRewriterProject |
| `/projects/media-ops-retro` | MediaOpsRetroProject |

---

## 7. Using with Cursor

1. Open the repo in Cursor
2. Rule **sync-documentation** applies automatically (`alwaysApply: true`)
3. Skill: `.cursor/skills/portfolio-site/SKILL.md` — say *"follow portfolio-site skill"* or let Cursor auto-load it
4. @ mention: `@AGENTS.md`, `@docs/AI_AGENT_GUIDE.md`

## 8. Using with Claude Code

Project skills live in `.claude/skills/` (committed to Git, same repo as Cursor skills).

| Skill | Slash command | Purpose |
|-------|---------------|---------|
| `portfolio-site` | `/portfolio-site` | Full workflow: data, routes, project pages, doc sync |
| `sync-documentation` | `/sync-documentation` | Verify/update docs after code changes |

1. Run `claude` from the repo root (or any subdirectory — parent `.claude/skills/` is discovered)
2. Claude auto-loads skills when the task matches their `description`
3. Or invoke directly: `/portfolio-site` or `/sync-documentation`
4. `CLAUDE.md` at the repo root loads every session

**Claude Projects (web):** attach `AGENTS.md` + `docs/USAGE_GUIDE.md` and paste the skill body from `.claude/skills/portfolio-site/SKILL.md` into project instructions if slash commands are unavailable.

---

## 9. Full documentation index

| File | Contents |
|------|----------|
| [FULL_DOCUMENTATION.md](./FULL_DOCUMENTATION.md) | Complete technical reference |
| [AI_AGENT_GUIDE.md](./AI_AGENT_GUIDE.md) | Short guide for AI agents |
| [ARCHITECTURE_OVERVIEW.md](./ARCHITECTURE_OVERVIEW.md) | Architecture diagrams |
| [FEATURE_MAP.md](./FEATURE_MAP.md) | Feature → file map |
| [API_FLOW.md](./API_FLOW.md) | Static assets (no backend API) |
| [CONTENT_SOURCE.md](./CONTENT_SOURCE.md) | Authoring / mapping reference (not runtime) |

---

## 10. Repository

- GitHub: `git@github.com:huyquocvq-lang/portfolio.git`
- Default branch: `main`
