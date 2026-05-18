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
| Copy / metrics | `src/data/profile.js`, `stats.js`, `about.js`, `skills.js`, `personal.js` | Low |
| Project card blurbs | `src/data/projects.js` | Low — keep `slug` + `link` + `banner` in sync |
| Single project layout | `src/projects/<Name>Project.jsx` + matching `src/styles/projects/*.css` | Low if isolated |
| Homepage section styles | `src/styles/global.css` | Medium — affects whole site (theme vars in `:root` are global) |
| Footer / Impact text | `src/components/Footer.jsx`, `Impact.jsx` | Low |
| Personal photos | `public/images/personal/personal_*.jpeg` | Low |
| Banner HTML | `public/banners/<slug>.html` | Low — keep the `.banner-fit` wrapper + scale JS |
| Dashboard embed body | `src/embeds/*Dashboard.tsx` (overwrite in place; keep default export) | Low |
| Images | `public/images/**` | Low |
| Content mapping reference | `docs/CONTENT_SOURCE.md` | Low (not bundled; user chat overrides) |

## Dangerous / core ⚠️

| Area | Why |
|------|-----|
| `src/App.jsx` routes | Missing route = 404 on deploy; wrong component = broken page |
| `projects.js` slug/link order | Breaks prev/next pager in `ProjectShell` |
| `getAllProjects()` order | Featured is always index 0 for pager |
| `Hero.jsx` `<picture>` source order | Most-specific media first; WebP before PNG within each art-direction. Reordering can pick the wrong image (or none) |
| `public/hero-banners/*` filenames | Hard-coded slugs (`hero_mobile_portrait`, `hero_ultrawide`, …) — renaming breaks `Hero.jsx` |
| `Nav.jsx` body scroll lock | Regressions trap scroll on mobile |
| `skillIcons.js` keys | Unknown `icon` key in `skills.js` → blank icon |
| `ProjectShell.jsx` | Shared by all 7 project pages |
| `BannerEmbed.jsx` + `public/banners/*.html` | Banner HTML must keep `.banner-fit` 560×510 + inline JS that sets `--scale` |
| `EmbedSlot.jsx` `dashboards` map | Missing entry for an embed key in `projectEmbeds.js` → silently renders nothing |
| Theme tokens in `:root` (`global.css`) | Renaming a `--*` variable breaks every file that consumes it — refactor with care |

## Project dashboard embeds (F8–F10)

TSX exports in `src/embeds/`, lazy-loaded by `EmbedSlot.jsx` + `projectEmbeds.js`. All 7 projects now have a live embed.

| File | Embed key | Route |
|------|-----------|-------|
| `WinterplaceDashboard.tsx`    | `winterplace`    | `/projects/winterplace` |
| `CutoverDashboard.tsx`        | `cutover`        | `/projects/programmatic-cutover` |
| `MomTrendDashboard.tsx`       | `momTrend`       | `/projects/publisher-trend-analysis` |
| `PfMasterDashboard.tsx`       | `pfMaster`       | `/projects/pf-master` |
| `GleanPlannerDashboard.tsx`   | `gleanPlanner`   | `/projects/glean-planner` |
| `AiRewriterDashboard.tsx`     | `aiRewriter`     | `/projects/ai-rewriter` |
| `MediaOpsRetroDashboard.tsx`  | `mediaOpsRetro`  | `/projects/media-ops-retro` |

Requires `recharts`. `EmbedSlot` — inline preview + **Fullscreen ↗** text control (same style as former external link). To add a new embed: see `src/embeds/README.md`.

## Banner system (home thumbs + detail hero)

Each project ships an animated/interactive HTML banner used both as the home-card thumbnail and the detail-page hero.

| Piece | Detail |
|-------|--------|
| Files | `public/banners/<slug>.html` (one per project) — canonical source, edit in place |
| Native canvas | 560 × 510 inside `.banner-fit` |
| Scaling | Inline `<script>` sets `--scale = window.innerWidth / 560` on `<html>`; CSS uses `transform: scale(var(--scale))`. **Do not** revert to `transform: scale(calc(100vw/560))` — that's invalid CSS (length where a number is required) and silently leaves scale at 1 |
| Wrapper | `src/components/BannerEmbed.jsx` — sandboxed iframe (`allow-scripts allow-same-origin`), `loading="lazy"` |
| Mount | Home: `FeaturedProject` / `OtherProject`; Detail: `ProjectShell` when `project.banner` ends in `.html`/`.svg` |
| Detail overlay | `radial-gradient` + `linear-gradient` dim on `.project-shell-banner--embed::after` |

## Theme tokens

CSS variables defined on `:root` in `src/styles/global.css`. Use `var(--*)`, never hardcode the swatch.

| Token | Purpose |
|-------|---------|
| `--bg-primary` `#1a1a1a` | Body / most sections |
| `--bg-elevated` `#222222` | Cards, panels |
| `--bg-elevated-2` `#2a2a2a` | Tiles, dashboard surrounds |
| `--accent` `#c5a47e` | Eyebrows, links, CTA, accent borders (bronze) |
| `--accent-hover` `#d4b896` | Accent hover |
| `--text-heading` `#ffffff` | Headings, big numbers |
| `--text-body` `#a0a0a0` | Paragraph copy |
| `--text-muted` `#808080` | Labels, captions |
| `--text-on-accent` `#ffffff` | Text on accent-filled buttons |
| `--border-subtle` `#2a2a2a` | Section dividers |
| `--border-accent` `rgba(197,164,126,0.35)` | Featured / Impact separators |

Hero overlays (black gradients) and dashboard internal palettes stay as-is — they're already dark and visually separate.

## Personal interest section (F4b)

- Component: `src/components/PersonalInterest.jsx` · anchor `#personal`
- Data: `src/data/personal.js` (eyebrow, heading, paragraphs, images)
- Layout: Pinterest-style CSS-columns masonry (3 / 2 / 1 cols responsive)
- Photos: `public/images/personal/personal_1.jpeg` … `personal_6.jpeg`

## AI rewriter lightbox (F12)

Click a screenshot in `/projects/ai-rewriter` → fullscreen overlay (`.air-lightbox`). Local component state in `AiRewriterProject.jsx`; close via overlay click, × button, or Escape. Body scroll is locked while open.

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

## Workflow: add a new project (8th)

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
  banner: '/banners/my-new-project.html', // optional animated banner
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

5. **Assets** — `public/images/projects/my-new-project.jpg` (fallback) + optionally `public/banners/my-new-project.html` (use any existing banner file as a template — keep the `.banner-fit` 560×510 wrapper and inline `--scale` script).

6. **Dashboard (optional)** — Drop `MyNewDashboard.tsx` in `src/embeds/`; register in `src/components/project/EmbedSlot.jsx` `dashboards` map; add `myNew: { embedKey: 'myNew', title: '…' }` to `src/data/projectEmbeds.js`; mount `<EmbedSlot {...projectEmbeds.myNew} />` on the page.

7. **Verify** — Homepage card links, project page, prev/next pager order, banner fits at any width.

8. **Docs** — Update `FEATURE_MAP.md`, `ARCHITECTURE_OVERVIEW.md`, `FULL_DOCUMENTATION.md`, `API_FLOW.md`, `src/embeds/README.md` (if you added an embed), and `AGENTS.md` if routes changed.

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
src/components/PersonalInterest.jsx  Interest copy + masonry wall
src/components/BannerEmbed.jsx       Sandboxed iframe for project banners
src/data/profile.js       Name, role, tagline, intro, contact
src/data/projects.js      Cards + slugs + helpers + banner paths
src/data/personal.js      Personal interest copy + image list
src/data/projectEmbeds.js Embed keys → titles
src/embeds/*Dashboard.tsx Lazy-loaded Claude artifact exports
src/components/project/EmbedSlot.jsx    Dashboard slot + fullscreen
src/components/project/ProjectShell.jsx Shared project wrapper (hero banner + breadcrumbs + pager)
src/projects/*Project.jsx               Individual case studies
src/styles/global.css                   Theme vars (:root) + homepage responsive
src/styles/project-shell.css            Shell chrome
src/styles/projects/*.css               Per-project page styles
public/hero-banners/hero_*.{webp,png}   Art-directed hero variants (8 sizes × 2 formats)
public/banners/<slug>.html              Canonical animated banner per project
public/images/personal/*.jpeg           Personal interest masonry photos
public/images/agents/*.png              AI rewriter demo screenshots
docs/CONTENT_SOURCE.md                  Authoring reference for mapping (not runtime)
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
