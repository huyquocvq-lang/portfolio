# Full Technical Documentation — Jenny Tang Portfolio

**Repository:** `huyquocvq-lang/portfolio`  
**Document version:** 1.0  
**Last aligned to codebase:** React 18 + Vite 5 SPA (web)

---

## ⚠️ Platform clarification

This repository is **not a React Native application**. It is a **React single-page website** built with Vite, targeting browsers (desktop and mobile web). Sections below that refer to iOS, Android, native modules, Metro, or mobile-specific APIs are marked **N/A** with brief rationale.

For mobile-native documentation, a separate React Native codebase would be required.

---

# 1. Project Overview

## What the application does

A personal portfolio website for **Jenny Tang**, showcasing media operations, marketing analytics, programmatic optimization, and AI workflow automation experience at Gen Digital (Personal Finance vertical).

**User-facing capabilities:**
- Animated full-screen hero with scroll-driven transitions
- Impact metrics, about narrative, and skills grid
- Featured + grid project previews linking to dedicated case study pages
- Six uniquely designed project detail pages
- Contact links (LinkedIn, resume)
- Responsive layout with mobile navigation drawer

## Main business purpose

Present professional credibility to recruiters, hiring managers, and clients through quantified impact ($10M Q1 revenue, $3–4M monthly spend, 30+ publishers, AI workflow efficiency) and detailed project narratives.

## Key technologies

| Technology | Version (package.json) | Role |
|------------|------------------------|------|
| React | ^18.3.1 | UI library |
| react-dom | ^18.3.1 | DOM rendering |
| Vite | ^5.4.0 | Dev server + production build |
| @vitejs/plugin-react | ^4.3.1 | JSX, Fast Refresh |
| react-router-dom | ^7.15.1 | Client-side routing |
| react-icons | ^5.6.0 | Skill + UI icons (Font Awesome) |

## React version

**React 18.3** (not React Native).

## Main libraries / frameworks

- **Routing:** `react-router-dom` (`BrowserRouter`, `Routes`, `Route`, `Link`, `Navigate`)
- **Icons:** `react-icons/fa` (`FaChevronDown`, `FaBars`, `FaTimes`, skill icons)
- **Styling:** Global CSS + per-page CSS (no UI framework)

---

# 2. Project Structure

```
portfolio/
├── index.html                 # HTML shell, font CDN links
├── package.json
├── vite.config.js             # Vite + SPA mode
├── .gitignore
├── README.md                  # Developer setup guide
├── docs/
│   ├── CONTENT_SOURCE.md      # Authoring / mapping reference (not bundled)
│   ├── USAGE_GUIDE.md
│   ├── FULL_DOCUMENTATION.md
│   ├── AI_AGENT_GUIDE.md
│   ├── ARCHITECTURE_OVERVIEW.md
│   ├── FEATURE_MAP.md
│   └── API_FLOW.md
├── public/
│   └── images/                # Static assets (served at /images/...)
│       ├── hero-bg.jpg        # (expected — may be placeholder)
│       └── projects/*.jpg
└── src/
    ├── main.jsx               # ReactDOM.createRoot entry
    ├── App.jsx                # Route definitions
    ├── pages/
    │   └── HomePage.jsx       # Landing page composition
    ├── components/
    │   ├── Hero.jsx
    │   ├── Nav.jsx
    │   ├── Impact.jsx
    │   ├── AboutSkills.jsx
    │   ├── Skill.jsx
    │   ├── Projects.jsx
    │   ├── FeaturedProject.jsx
    │   ├── OtherProject.jsx
    │   ├── Footer.jsx
    │   └── project/
    │       └── ProjectShell.jsx
    ├── projects/              # One file per case study (unique UI)
    │   ├── WinterplaceProject.jsx
    │   ├── ProgrammaticCutoverProject.jsx
    │   ├── PublisherTrendProject.jsx
    │   ├── PfMasterProject.jsx
    │   ├── GleanPlannerProject.jsx
    │   └── AiRewriterProject.jsx
    ├── data/                  # Static content modules
    │   ├── profile.js
    │   ├── stats.js
    │   ├── about.js
    │   ├── skills.js
    │   ├── skillIcons.js
    │   └── projects.js
    └── styles/
        ├── global.css
        ├── project-shell.css
        └── projects/          # Per-project stylesheets
```

## Folder responsibilities

### `/src/pages`

| File | Purpose |
|------|---------|
| `HomePage.jsx` | Composes homepage sections; handles hash scroll on mount |

### `/src/components`

| File | Purpose |
|------|---------|
| `Hero.jsx` | Full-viewport responsive `<picture>` background + left-anchored text panel + CTA |
| `Nav.jsx` | Sticky nav, mobile hamburger |
| `Impact.jsx` | Impact metrics grid |
| `AboutSkills.jsx` | About column + skills grid |
| `Skill.jsx` | Single skill cell with icon |
| `PersonalInterest.jsx` | Personal copy + Pinterest-style masonry image wall |
| `Projects.jsx` | Featured + other projects section (auto-counts) |
| `FeaturedProject.jsx` | Large project card; renders `<BannerEmbed>` when `banner` set |
| `OtherProject.jsx` | Grid project card; ditto |
| `BannerEmbed.jsx` | Sandboxed `<iframe>` wrapper for `public/banners/*.html` |
| `Footer.jsx` | CTA + contact columns |
| `project/ProjectShell.jsx` | Wrapper for all project detail pages — hero banner + breadcrumbs + pager |
| `project/EmbedSlot.jsx` | Lazy slot for dashboards; fullscreen toggle |

### `/src/projects`

**One React component per case study** — each with custom markup and dedicated CSS. This is intentional; do not merge into a generic template.

### `/src/data`

**Single source of truth for homepage content and project card metadata.** Editing these files does not change long-form copy inside `src/projects/*.jsx` (that content is co-located in each project file).

### `/src/styles`

| File | Scope |
|------|-------|
| `global.css` | Reset, typography, `:root` theme tokens, homepage, nav, responsive breakpoints |
| `project-shell.css` | Hero banner, breadcrumbs, prev/next pager |
| `project-intro.css` | Shared project intro block |
| `embed-slot.css` | Dashboard slot (canvas + fullscreen) |
| `projects/*.css` | Scoped to one project page (`.wp-*`, `.pgm-*`, `.retro-*`, `.air-*`, etc.) |

### `/src/embeds`

Claude artifact dashboards as `.tsx` files. One file per detail page; lazy-loaded by `EmbedSlot`. See `src/embeds/README.md` for the full wiring guide.

### `/public`

Files copied verbatim to build output root. Image URLs start with `/images/`. Banner URLs start with `/banners/`.

| Subfolder | Purpose |
|-----------|---------|
| `public/hero-banners/` | 8 responsive hero variants (`hero_*.webp` + `.png`) consumed by `<picture>` in `Hero.jsx` |
| `public/images/` | Project thumbnails, personal masonry photos, agent screenshots |
| `public/banners/` | Self-contained animated HTML banner per project (canonical source, edit in place) |

---

# 3. Application Architecture

## Pattern: Data-driven static SPA

- **Presentation components** read imported JSON-like modules from `src/data/`.
- **Project pages** embed narrative structure in dedicated JSX files.
- **No global state manager** — local state only where interaction requires it (hero, nav menu).

## Data flow

```
src/data/*.js  →  import in components  →  render HTML
public/images  →  URL references       →  browser fetches static files
User click     →  react-router Link    →  swap route component, no full reload
```

## State management flow

| Component | State | Purpose |
|-----------|-------|---------|
| `Hero` | (none) | Pure presentation — `<picture>` handles art direction, CSS handles layout/hover |
| `Nav` | `open` | Mobile drawer |
| `EmbedSlot` | `fullscreen` | Toggle dashboard fullscreen view |
| `AiRewriterProject` | `zoomed` | Screenshot lightbox overlay |
| Banner iframe (inline JS) | `--scale` CSS var | Scale 560×510 canvas to iframe width |

No Redux, Zustand, MobX, Context API (for app state), or React Query.

## API communication flow

**None internally.** See [API_FLOW.md](./API_FLOW.md).

## Navigation structure

- **Router-level:** 1 home + 7 project routes (`src/App.jsx`)
- **Within home:** hash anchors `#impact`, `#about`, `#personal`, `#work`, `#top`
- **Between projects:** `ProjectShell` prev/next uses `getAllProjects()` order

## Dependency relationships

See diagram in [ARCHITECTURE_OVERVIEW.md](./ARCHITECTURE_OVERVIEW.md).

---

# 4. Environment Setup

## Required tools

| Tool | Version |
|------|---------|
| Node.js | **18+** recommended (Vite 5 requirement) |
| npm | 8+ |

## Installation

```bash
git clone git@github.com:huyquocvq-lang/portfolio.git
cd portfolio
npm install
```

## Environment variables

**None configured.** No `.env` files in repo. Optional future: `VITE_*` for CMS/API.

## iOS setup

**N/A** — not a native iOS project.

## Android setup

**N/A** — not a native Android project.

## Run commands

```bash
npm run dev       # Development: http://localhost:5173 (auto-open per vite.config)
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
```

## Build output

`dist/` contains `index.html`, hashed JS/CSS assets, and copied `public/` files. Deploy as static site with SPA fallback.

---

# 5. Navigation System

## Hierarchy

```
/  (HomePage)
├── #top       Hero
├── #impact    Impact
├── #about     About + Skills
├── #personal  Personal Interest + masonry
├── #work      Projects
└── (Footer)

/projects/winterplace
/projects/programmatic-cutover
/projects/publisher-trend-analysis
/projects/pf-master
/projects/glean-planner
/projects/ai-rewriter
/projects/media-ops-retro
```

## Stack navigation

**N/A** — web SPA uses flat route table, not React Navigation stacks.

## Tab navigation

**N/A.**

## Deep linking

| Type | Example | Handler |
|------|---------|---------|
| Project route | `/projects/pf-master` | `react-router-dom` |
| Home section | `/#work` | `HomePage` useEffect + `getElementById` |
| External | LinkedIn URL | `<a target="_blank">` |

## Route naming convention

- Lowercase kebab-case slugs: `programmatic-cutover`, `publisher-trend-analysis`
- Prefix: `/projects/`
- Slug defined in `projects.js` → must match `App.jsx` route and `ProjectShell` `slug` prop

## Navigation guards / auth

**None.** All routes are public.

---

# 6. State Management

## Global state

**Not implemented.**

## Local state examples

### Hero entrance (`src/components/Hero.jsx`)

```javascript
const [ready, setReady] = useState(false)

useEffect(() => {
  const id = requestAnimationFrame(() => {
    requestAnimationFrame(() => setReady(true))
  })
  return () => cancelAnimationFrame(id)
}, [])
```

CSS class: `hero--preload` → `hero--ready`.

### Hero scroll (`Hero.jsx`)

```javascript
const progress = Math.min(1, Math.max(0, scrolled / (height * 0.55)))
```

Drives inline `opacity` / `transform` on `.hero-main` and `.hero-scroll-name`.

### Nav drawer (`Nav.jsx`)

```javascript
const [open, setOpen] = useState(false)
// Side effect: document.body.style.overflow = open ? 'hidden' : ''
```

## Store / actions / reducers / async / side effects

**N/A** — no Redux or similar.

Side effects limited to:
- `useEffect` for scroll listeners, keyboard Escape, hash scroll
- No `async` data fetching

---

# 7. API Layer

**Not present.** See [API_FLOW.md](./API_FLOW.md) for external links and future migration notes.

---

# 8. Authentication & Security

| Topic | Status |
|-------|--------|
| Login flow | N/A |
| Session management | N/A |
| Secure storage | N/A |
| Permissions | N/A |
| Biometric | N/A |
| Encryption | N/A |

**Security considerations for static site:**
- No secrets in frontend bundle
- External links use `rel="noreferrer"` where `target="_blank"`
- No user-submitted data / forms

---

# 9. Components System

## Shared UI components

| Component | Reusable? | Notes |
|-----------|-----------|-------|
| `Skill` | Yes | Props: `icon`, `title`, `desc` |
| `FeaturedProject` | Yes | Props: `project` object; renders `<BannerEmbed>` if `project.banner` set |
| `OtherProject` | Yes | Props: `project` object; ditto |
| `BannerEmbed` | Yes | Props: `src`, `title`, `className`; sandboxed iframe |
| `PersonalInterest` | No (singleton) | Reads `personal.js` |
| `ProjectShell` | Yes (project pages only) | Props: `slug`, `children`; embeds banner + breadcrumbs + pager |
| `EmbedSlot` | Yes (project pages only) | Props: `embedKey`, `title`; lazy-loads from `src/embeds/` |
| Section components | Homepage-specific | Hero, Impact, etc. |

## Styling system

- **Global CSS** with BEM-like section classes (`.hero`, `.impact`, `.projects`, `.personal`)
- **Project-specific** class prefixes (`.wp-`, `.pgm-`, `.trend-`, `.retro-`, `.air-`, `.glean-`, `.pfm-`)
- **CSS variables** in `:root` for theme tokens, fonts, and base size

## Theme system

Charcoal + bronze gold dark theme. All tokens defined on `:root` of `src/styles/global.css`:

| Token | Value | Use |
|-------|-------|-----|
| `--bg-primary` | `#1a1a1a` | Body + most sections |
| `--bg-elevated` | `#222222` | Cards, panels |
| `--bg-elevated-2` | `#2a2a2a` | Tiles, dashboard surrounds |
| `--accent` | `#c5a47e` | Eyebrows, links, CTA, accent borders (bronze) |
| `--accent-hover` | `#d4b896` | Accent hover state |
| `--text-heading` | `#ffffff` | Headings, big stat numbers |
| `--text-body` | `#a0a0a0` | Paragraph copy |
| `--text-muted` | `#808080` | Labels, captions, meta |
| `--text-on-accent` | `#ffffff` | Text inside accent-filled buttons |
| `--border-subtle` | `#2a2a2a` | Quiet section dividers |
| `--border-accent` | `rgba(197,164,126,0.35)` | Accented separators |

Display font: Cormorant Garamond (`.author-name`). Body: Source Sans Pro.

## Design conventions

- Uppercase eyebrows with wide letter-spacing (bronze accent)
- Light font weights (300) for headings on dark surfaces
- Hover accent on project titles and CTAs
- Hero overlays + embedded dashboards keep their own internal palettes — site shell theme applies around them
- Mobile breakpoint: **768px** (primary), **960px**, **520px**

---

# 10. Business Logic

## Homepage features

| Feature | Screens / sections | Data | Logic location |
|---------|-------------------|------|----------------|
| Hero | `#top` | `profile`, `heroStats` | `Hero.jsx` |
| Impact | `#impact` | `impactHighlights` | `Impact.jsx` |
| About | `#about` | `about` | `AboutSkills.jsx` |
| Skills | `#about` | `skills`, `skillIcons` | `Skill.jsx` |
| Personal Interest | `#personal` | `personal.js` | `PersonalInterest.jsx` |
| Projects | `#work` | `projects.js`, `public/banners/*.html` | `Projects.jsx`, `BannerEmbed.jsx` |

## Project features (F7–F13)

Documented in [FEATURE_MAP.md](./FEATURE_MAP.md). Each project file contains its own static narrative — no shared business logic module. Every detail page mounts one `<EmbedSlot {...projectEmbeds.<key>} />` (lazy `src/embeds/*Dashboard.tsx`).

---

# 11. Custom Hooks

**No `src/hooks/` directory.** Custom hook patterns are inlined:

| Pattern | File | Equivalent hook name (conceptual) |
|---------|------|-----------------------------------|
| Scroll progress | `Hero.jsx` | Would be `useHeroScrollProgress` |
| Menu lock | `Nav.jsx` | Would be `useMobileNav` |
| Hash scroll | `HomePage.jsx` | Would be `useHashScroll` |
| Scroll to top | `ProjectShell.jsx` | Would be `useScrollOnMount` |

If extracting hooks, prefer:

```
src/hooks/useHeroScrollProgress.js
```

---

# 12. Utilities & Helpers

## Shared helpers (`src/data/projects.js`)

```javascript
export function getAllProjects() {
  return [featuredProject, ...otherProjects]
}

export function getProjectCard(slug) {
  return getAllProjects().find((p) => p.slug === slug)
}
```

## Icon map (`src/data/skillIcons.js`)

Maps string keys → React icon components.

## Validation logic

**None** — static content, no forms.

## Constants

Content constants live in data files, not a separate `constants.js`.

---

# 13. Error Handling

| Layer | Implementation |
|-------|----------------|
| Global error boundary | **Not implemented** |
| API errors | N/A |
| Crash reporting | N/A |
| Logging | `console` only (none in production code) |
| Invalid routes | No catch-all `Route`; host must SPA-fallback |

**Recommendation:** Add React error boundary at `App.jsx` level for production.

---

# 14. Performance Optimization

| Technique | Usage |
|-----------|--------|
| Memoization (`useMemo`/`memo`) | **Not used** — small static tree |
| Lazy loading (`React.lazy`) | **Not used** — bundle is small |
| List virtualization | N/A — short lists |
| Image optimization | Manual — use compressed JPG/WebP in `public/` |
| Scroll listeners | `{ passive: true }` on hero scroll |
| CSS animations | GPU-friendly `transform`/`opacity` on hero |

**Caching:** Browser HTTP cache for static assets; no service worker.

---

# 15. Native Modules

**N/A** — web-only project. No `ios/`, `android/`, or native bridges.

---

# 16. Testing

| Type | Status |
|------|--------|
| Unit tests | Not present |
| Integration tests | Not present |
| E2E (Detox, Playwright) | Not configured |
| Test structure | N/A |

**Suggested:** Playwright for smoke tests (home load, each project route, mobile nav).

---

# 17. CI/CD

| Item | Status |
|------|--------|
| GitHub Actions | Not in repo |
| Fastlane | N/A |
| Bitrise | N/A |
| CodePush / OTA | N/A |

**Manual deploy:** `npm run build` → upload `dist/` to static host (e.g. GitHub Pages).

---

# 18. Coding Conventions

## Naming

| Entity | Convention | Example |
|--------|------------|---------|
| Components | PascalCase | `WinterplaceProject.jsx` |
| Data files | camelCase exports | `featuredProject` |
| CSS classes | kebab-case, prefixed per page | `.wp-insight` |
| Routes | kebab-case | `/projects/pf-master` |
| Slugs | kebab-case | `publisher-trend-analysis` |

## Folder conventions

- Homepage components in `src/components/`
- Case study pages in `src/projects/`
- Content in `src/data/`

## Component patterns

- Function components only
- Default exports for pages/components
- Named exports for data arrays/objects

## Styling conventions

- One global CSS import in `main.jsx`
- Per-project CSS imported in that project file only
- Avoid inline styles except dynamic hero scroll values

## Git

- `main` branch
- Remote: `git@github.com:huyquocvq-lang/portfolio.git`

---

# 19. AI Agent Guidelines

See dedicated [AI_AGENT_GUIDE.md](./AI_AGENT_GUIDE.md).

**Summary:**
- ✅ Edit `src/data/*` for homepage copy
- ✅ Edit individual `src/projects/*` + CSS for case study design
- ⚠️ Keep `slug`, routes, and links synchronized
- ❌ Do not add Redux/API without explicit request
- ❌ Do not treat as React Native

---

# 20. Suggested Improvements

## Architecture

| Improvement | Benefit |
|-------------|---------|
| `React.lazy` per project route | Smaller initial bundle |
| Catch-all route + 404 page | Better unknown URL handling |
| Extract `useHeroScroll`, `useBodyScrollLock` hooks | Cleaner components |
| Optional MDX for project content | Edit copy without touching JSX |

## Performance

| Improvement | Benefit |
|-------------|---------|
| WebP images + `srcset` | Faster LCP on hero |
| Preload hero image in `index.html` | Faster first paint |
| `font-display: swap` already via Google Fonts | — |

## Refactoring

| Improvement | Benefit |
|-------------|---------|
| TypeScript migration | Safer data shape for projects |
| Shared `Section` primitives | Less duplicated CSS for eyebrows/headings |
| Centralize project meta in data files | Single edit for title/tools/impact on detail pages |

## Security

| Improvement | Benefit |
|-------------|---------|
| CSP headers on host | Mitigate XSS if forms added later |
| `rel="noopener noreferrer"` on all external links | Tab-nabbing protection (partially done) |

## Scalability

| Improvement | Benefit |
|-------------|---------|
| CMS (Sanity/Contentful) | Non-dev content updates |
| Auto-generate route table from `projects.js` | Fewer manual `App.jsx` edits |
| Component tests for `getAllProjects` ordering | Stable pager |

---

## Appendix A — `profile.js` schema

```javascript
{
  name: string,         // "Jenny Tang" — split into lead + accent for hero title
  role: string,         // ` · `-separated; hero subtitle replaces with ` | `
  tagline: string,
  intro: string,
  currentRole: { title, company },
  industries: string,
  contact: { linkedin, resume, github | null }
}
```

Hero background images live in `public/hero-banners/` and are not referenced from `profile.js` (the old `heroImage` field is gone).

## Appendix B — Project card schema (`projects.js`)

```javascript
{
  slug: string,
  type: string,
  title: string,
  headline?: string,      // featured only
  subtitle: string,
  description: string,
  tools?: string,         // featured only
  impact: string,
  image: string,          // fallback for ProjectShell hero when no banner
  banner?: string,        // /banners/<slug>.html — enables BannerEmbed on home + detail
  link: string            // must match App.jsx path
}
```

## Appendix B-bis — Personal interest schema (`personal.js`)

```javascript
{
  eyebrow: string,
  heading: string,
  paragraphs: string[],
  images: Array<{ src: string, alt: string }>
}
```

## Appendix B-ter — Dashboard embed schema (`projectEmbeds.js`)

```javascript
{
  [key: string]: {
    embedKey: string,     // matches a key in EmbedSlot dashboards map
    title: string         // shown above the slot
  }
}
```

The matching entry in `src/components/project/EmbedSlot.jsx`:

```javascript
const dashboards = {
  [key]: lazy(() => import('../../embeds/MyDashboard'))
}
```

## Appendix C — Related documentation

| Document | Audience |
|----------|----------|
| [AI_AGENT_GUIDE.md](./AI_AGENT_GUIDE.md) | AI coding agents |
| [ARCHITECTURE_OVERVIEW.md](./ARCHITECTURE_OVERVIEW.md) | Architects / senior devs |
| [FEATURE_MAP.md](./FEATURE_MAP.md) | Product / feature owners |
| [API_FLOW.md](./API_FLOW.md) | Backend engineers (future API) |
| [CONTENT_SOURCE.md](./CONTENT_SOURCE.md) | Authoring / mapping reference (user instructions override) |
| [USAGE_GUIDE.md](./USAGE_GUIDE.md) | Usage + doc sync |

---

*End of full documentation.*
