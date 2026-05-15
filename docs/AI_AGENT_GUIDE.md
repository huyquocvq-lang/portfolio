# AI Agent Guide — Jenny Tang Portfolio

> **Read this first.** This repo is a **React 18 + Vite 5** marketing portfolio website, **not React Native**. Do not add `react-native`, `expo`, or mobile native folders unless explicitly requested.

## Mandatory: sync documentation

**Every code/config change must update the relevant docs in the same task** (same commit/PR).  
See mapping table: [USAGE_GUIDE.md](./USAGE_GUIDE.md#42-mapping-code-change--documentation).  
Entry points: [AGENTS.md](../AGENTS.md); Cursor: rule `.cursor/rules/sync-documentation.mdc`, skill `.cursor/skills/portfolio-site/SKILL.md`; Claude Code: `.claude/skills/portfolio-site/SKILL.md` (`/portfolio-site`), `.claude/skills/sync-documentation/SKILL.md` (`/sync-documentation`).

## Quick facts

| Item | Value |
|------|-------|
| Framework | React 18.3 |
| Bundler | Vite 5.4 |
| Router | react-router-dom 7.x |
| Icons | react-icons (Font Awesome subset) |
| State | Local `useState` / `useEffect` only |
| Backend | None |
| Styling | Plain CSS files (no Tailwind, no CSS modules) |

## Safe to modify ✅

| Area | Files | Risk |
|------|-------|------|
| Copy / metrics | `src/data/profile.js`, `stats.js`, `about.js`, `skills.js` | Low |
| Project card blurbs | `src/data/projects.js` | Low — keep `slug` + `link` in sync |
| Single project layout | `src/projects/<Name>Project.jsx` + matching `src/styles/projects/*.css` | Low if isolated |
| Homepage section styles | `src/styles/global.css` | Medium — affects whole site |
| Footer / Impact text | `src/components/Footer.jsx`, `Impact.jsx` | Low |
| Images | `public/images/**` | Low |
| Content mapping reference | `docs/CONTENT_SOURCE.md` | Low (not bundled; user chat overrides) |

## Dangerous / core ⚠️

| Area | Why |
|------|-----|
| `src/App.jsx` routes | Missing route = 404 on deploy; wrong component = broken page |
| `projects.js` slug/link order | Breaks prev/next pager in `ProjectShell` |
| `getAllProjects()` order | Featured is always index 0 for pager |
| `Hero.jsx` scroll math | Easy to break crossfade / mobile layout |
| `Nav.jsx` body scroll lock | Regressions trap scroll on mobile |
| `skillIcons.js` keys | Unknown `icon` key in `skills.js` → blank icon |
| `ProjectShell.jsx` | Shared by all 6 project pages |

## Project dashboard embeds (F8–F10)

TSX exports in `src/embeds/`, lazy-loaded by `EmbedSlot.jsx` + `projectEmbeds.js`.

| File | Route |
|------|-------|
| `PfMasterDashboard.tsx` | `/projects/pf-master` |
| `MomTrendDashboard.tsx` | `/projects/publisher-trend-analysis` |
| `CutoverDashboard.tsx` | `/projects/programmatic-cutover` |

Requires `recharts`. `EmbedSlot` — inline preview + **Fullscreen ↗** text control (same style as former external link).

---

## Do NOT assume exists

- Redux / Zustand / Context providers
- `src/api/`, `src/services/`, `src/hooks/` (no custom hooks folder yet)
- Environment variables (none configured)
- Tests (`*.test.*` absent)
- CI config in repo
- React Native / Expo / `app.json`

## Workflow: edit homepage text

1. Check `docs/CONTENT_SOURCE.md` for the intended copy (mapping only).
2. Apply changes to `src/data/*` — **user chat instructions override** `CONTENT_SOURCE.md`.
3. If narrative changed, update the matching section in `docs/CONTENT_SOURCE.md` unless the user gave one-off copy.
4. Run `npm run dev` and verify `/#impact`, `/#about`, `/#work`.
5. Update `docs/FEATURE_MAP.md` if feature scope changed.
6. Check mobile (`≤768px`) in DevTools.

## Workflow: add a new project (7th)

1. **Data** — Add object to `otherProjects` (or swap featured) in `src/data/projects.js`:

```javascript
{
  slug: 'my-new-project',
  type: 'Category · Tags',
  title: 'Short Title',
  subtitle: 'One line',
  description: 'Card teaser for homepage grid',
  impact: 'One line impact',
  image: '/images/projects/my-new-project.jpg',
  link: '/projects/my-new-project'
}
```

2. **Page** — Create `src/projects/MyNewProject.jsx`:

```javascript
import ProjectShell from '../components/project/ProjectShell'
import { getProjectCard } from '../data/projects'
import '../styles/projects/my-new-project.css'

const meta = getProjectCard('my-new-project')

export default function MyNewProject() {
  return (
    <ProjectShell slug="my-new-project">
      <article className="myproj">
        {/* Custom layout — do not copy generic template */}
        <h1>{meta.title}</h1>
      </article>
    </ProjectShell>
  )
}
```

3. **Styles** — `src/styles/projects/my-new-project.css` (unique class prefix).

4. **Route** — `src/App.jsx`:

```javascript
import MyNewProject from './projects/MyNewProject'
// ...
<Route path="/projects/my-new-project" element={<MyNewProject />} />
```

5. **Asset** — `public/images/projects/my-new-project.jpg`

6. **Verify** — Homepage card links, project page, prev/next pager order.

7. **Docs** — Update `FEATURE_MAP.md`, `ARCHITECTURE_OVERVIEW.md`, `FULL_DOCUMENTATION.md`, `API_FLOW.md`, and `AGENTS.md` if routes changed.

## Workflow: add homepage section

1. Create `src/components/MySection.jsx` with `id="my-section"` on root element.
2. Add data file if needed: `src/data/mySection.js`.
3. Import in `src/pages/HomePage.jsx` (order matters visually).
4. Style in `src/styles/global.css`.
5. Add nav link in `src/components/Nav.jsx`: `<a href="/#my-section">`.

## Workflow: change project page design only

- Edit **only** `src/projects/<Project>.jsx` and `src/styles/projects/<project>.css`.
- Do **not** change `ProjectShell` unless all projects need the change.
- `ProjectShell` slug prop must match `projects.js` slug.

## Workflow: add skill card

1. Add icon key to `src/data/skillIcons.js` (import from `react-icons/fa` or other pack).
2. Add entry to `src/data/skills.js` with matching `icon` key.
3. Grid auto-updates via `AboutSkills.jsx` map.

## Commands

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # output: dist/
npm run preview  # serve production build
```

**Node:** Vite 5 requires Node 18+ (see `package.json` engines warnings on Node 16).

## Deployment note for agents

After `npm run build`, deploy `dist/` with SPA fallback to `index.html` for `/projects/*` routes.

## Common mistakes

| Mistake | Fix |
|---------|-----|
| `href="#work"` on project page | Use `href="/#work"` or `<Link to="/#work">` |
| `motion.div` typo in JSX | Use `motion.div` — project has no framer-motion; use `div` |
| Shared generic project template | Each project must keep its own JSX/CSS file |
| Huge images in repo | Optimize; reference paths under `public/images/` |
| Editing only `projects.js` for case study body | Long-form content lives in `src/projects/*.jsx` |

## File path cheat sheet

```
src/main.jsx              Entry, CSS imports
src/App.jsx               Routes
src/pages/HomePage.jsx    Landing composition
src/components/Hero.jsx   Banner + scroll effects
src/components/Nav.jsx    Header + mobile menu
src/data/projects.js      Cards + slugs + helpers
src/projects/*Project.jsx Individual case studies
src/components/project/ProjectShell.jsx  Shared project wrapper
src/styles/global.css     Global + homepage responsive
docs/CONTENT_SOURCE.md      Authoring reference for mapping (not runtime)
```

## When to ask the human

- Adding npm dependencies (keep bundle lean)
- Changing URL structure / slugs (breaks bookmarks)
- Adding backend, auth, or forms
- Converting to React Native (greenfield, not migration)
- Committing secrets or `.env` files

## Related docs

- [USAGE_GUIDE.md](./USAGE_GUIDE.md) — usage guide + doc sync table
- [AGENTS.md](../AGENTS.md) — root entry for Cursor / Claude
- [ARCHITECTURE_OVERVIEW.md](./ARCHITECTURE_OVERVIEW.md)
- [FEATURE_MAP.md](./FEATURE_MAP.md)
- [API_FLOW.md](./API_FLOW.md)
- [FULL_DOCUMENTATION.md](./FULL_DOCUMENTATION.md)
