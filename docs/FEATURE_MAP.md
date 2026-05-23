# Feature Map - Jenny Tang Portfolio

## Feature index

| ID | Feature | Primary files | Route / anchor |
|----|---------|---------------|----------------|
| F1 | Hero banner | `src/components/Hero.jsx` | `/#top` |
| F2 | Sticky navigation | `src/components/Nav.jsx` | global |
| F3 | Impact highlights | `src/components/Impact.jsx` | `/#impact` |
| F3b | Education list | `src/components/Education.jsx`, `src/data/education.js` | `/#education` |
| F3c | Work experience timeline | `src/components/Experience.jsx`, `src/data/experience.js` | `/#experience` |
| F4 | About + skills grid | `src/components/AboutSkills.jsx`, `Skill.jsx` | `/#about` |
| F4b | Personal interest + masonry image wall | `src/components/PersonalInterest.jsx`, `src/data/personal.js` | `/#personal` |
| F5 | Projects listing (animated banner thumbs) | `src/components/Projects.jsx`, `FeaturedProject.jsx`, `OtherProject.jsx`, `BannerEmbed.jsx` | `/#work` |
| F6 | Footer / CTA | `src/components/Footer.jsx` | footer |
| F7-F14 | Individual project case studies | `src/projects/*Project.jsx` | `/projects/:slug` |
| FX | Theme tokens (charcoal + bronze) + dark/light toggle | `src/styles/global.css` `:root` / `[data-theme="light"]`, `src/context/ThemeContext.jsx`, `src/components/ThemeToggle.jsx` | global |
| FY | Dashboard embed system | `src/components/project/EmbedSlot.jsx`, `src/embeds/*.tsx`, `src/data/projectEmbeds.js` | every detail page |
| FZ | Banner system (home thumbs + detail hero) | `public/banners/*.html`, `BannerEmbed.jsx`, `ProjectShell.jsx` | home + detail |

---

## F1 - Hero banner

**Purpose:** Full-viewport intro (`100vw × 100dvh`) with a responsive art-directed background image and left-anchored text panel.

**Data sources:**
- `src/data/profile.js` - `name` (split into lead + accent), `role` (separator transformed `· → |` for the subtitle)

**Responsive image (`<picture>`):** Browser picks the first `<source>` whose `media` matches AND whose `type` is supported. WebP first, PNG fallback for each art-direction.

| Media query | Variant |
|-------------|---------|
| `(max-aspect-ratio: 3/4)` | `hero_mobile_portrait` |
| `(min-aspect-ratio: 21/10)` | `hero_ultrawide` |
| `(min-width: 3000px)` | `hero_desktop_4k` |
| `(min-width: 2200px)` | `hero_desktop_qhd` |
| `(min-aspect-ratio: 14/10) and (max-aspect-ratio: 17/10)` | `hero_macbook_13` |
| `(max-aspect-ratio: 14/10)` | `hero_tablet` |
| default `<img>` | `hero_desktop_fhd` |

Order in `Hero.jsx` matters - most specific first; width caps before generic aspect-ratio buckets.

**Assets:** `public/hero-banners/<variant>.{webp,png}` (8 variants × 2 formats; `hero_mobile_landscape.*` exists but isn't wired by default - add a `(orientation: landscape) and (max-width: 900px)` source if needed). `<img>` uses `loading="eager"`, `fetchpriority="high"`, `decoding="async"`.

**Layout (`.hero-content`):** flex column, vertically centered, `max-width: 50%`, left padding `clamp(24px, 6vw, 96px)`. Mobile (≤768px) → `max-width: 100%`; portrait (`max-aspect-ratio: 3/4`) → content sticks to bottom with gradient flipping to a bottom-up dim.

**Text:**
- Kicker (`.hero-kicker`) - monospace, bronze, wide letter-spacing - `"Portfolio · 2026"`
- Title (`.hero-title`) - light weight; second word wrapped in `.hero-title-accent` (Cormorant Garamond italic, bronze, trailing `.`)
- Subtitle (`.hero-subtitle`) - derived from `profile.role` with ` · ` replaced by ` | `
- CTA (`.hero-cta`) - outline bronze button, hover fills accent; `href="#work"` (smooth scroll via `html { scroll-behavior: smooth }`)

**CSS:** `src/styles/global.css` - `.hero`, `.hero-picture`, `.hero-img`, `.hero-overlay`, `.hero-content`, `.hero-kicker`, `.hero-title`, `.hero-title-accent`, `.hero-subtitle`, `.hero-cta`.

---

## F2 - Navigation

**Purpose:** Sticky header; section links on home; hamburger drawer on mobile.

**Data:** `profile.js` - name, `contact.linkedin`, `contact.resume`, optional `contact.github`

**State:** `open` boolean for mobile menu; locks `document.body.overflow`

**Links pattern:**
- In-page (home): `/#impact`, `/#about`, `/#work`
- External: LinkedIn, Resume (Google Docs)
- Logo: `/`

**CSS:** `src/styles/global.css` - `.nav`, `.nav--open`, `.nav-toggle` (visible ≤768px)

---

## F3 - Impact highlights

**Purpose:** Six quantitative achievements in a responsive grid.

**Data:** `src/data/stats.js` - `impactHighlights[]` with `{ big, desc }`

**Component:** `src/components/Impact.jsx` - maps array to `.impact-item`

**Anchor:** `id="impact"`

---

## F3b - Education

**Purpose:** List of graduate programs below Impact, ordered most-recent first.

**Data:** `src/data/education.js` - array of `{ school, degree, focus, location, date, gpa, honors[] }`.

**Component:** `src/components/Education.jsx` - 2-column grid (`220px 1fr` desktop, stacked on mobile). Date is the eyebrow column; body lists school → degree + focus → location · GPA → honors (em-dash bullets).

**Anchor:** `id="education"`.

**CSS:** `src/styles/global.css` - `.education`, `.education-inner`, `.education-eyebrow`, `.edu-item`, `.edu-date`, `.edu-body`, `.edu-degree`, `.edu-focus`, `.edu-meta`, `.edu-honors`.

---

## F3c - Work Experience

**Purpose:** Reverse-chronological work history below Education. Bullets from the resume are rewritten as flowing paragraphs (per user request - no list markers).

**Data:** `src/data/experience.js` - array of `{ company, role, location, start, end, paragraphs[], meta?[] }`. The optional `meta` is a `dt/dd` table for things like *Banking clients* / *Partners & channels*.

**Component:** `src/components/Experience.jsx` - ordered list with the same 2-column grid as Education. Period (start–end) on the left; role → company · location → paragraphs → meta on the right.

**Anchor:** `id="experience"` (linked from Nav).

**CSS:** `src/styles/global.css` - `.experience`, `.experience-inner`, `.experience-eyebrow`, `.exp-timeline`, `.exp-item`, `.exp-period`, `.exp-role`, `.exp-company`, `.exp-para`, `.exp-meta`, `.exp-meta-row`.

---

## F4 - About + skills

**Purpose:** Two-column layout (about text sticky on desktop); 2×3 skills grid with Font Awesome icons via react-icons.

**Data:**
- `src/data/about.js` - `eyebrow`, `heading`, `paragraphs[]`
- `src/data/skills.js` - skill objects with `icon` key
- `src/data/skillIcons.js` - maps keys to `react-icons/fa` components

**Components:**
- `AboutSkills.jsx` - layout wrapper
- `Skill.jsx` - single card; resolves icon via `skillIconMap[icon]`

**Anchor:** `id="about"`

---

## F4b - Personal interest + masonry wall

**Purpose:** Personal copy + Pinterest-style masonry of personal photos between About and Projects.

**Data:** `src/data/personal.js` - `eyebrow`, `heading`, `paragraphs[]`, `images[]`

**Component:** `src/components/PersonalInterest.jsx` - header + `.personal-masonry` (CSS `column-count: 3 / 2 / 1` responsive)

**Images:** `public/images/personal/personal_1.jpeg` … `personal_6.jpeg`. Hover scales image to 1.05.

**Anchor:** `id="personal"` · Nav link: "Interests"

**CSS:** `src/styles/global.css` - `.personal*` block

---

## F5 - Projects listing

**Purpose:** One featured project (large layout) + grid of six additional projects (7 total).

**Data:** `src/data/projects.js`
- `featuredProject` - full card + detail route
- `otherProjects[]` - grid cards
- Each card carries `slug`, `link`, `image` (fallback) and optional `banner` (`/banners/<slug>.html`)
- Helpers: `getAllProjects()`, `getProjectCard(slug)`

**Navigation:** Each card uses `react-router-dom` `<Link to={project.link}>`

**Subcomponents:**
- `FeaturedProject.jsx` - image link + meta + CTA; renders `<BannerEmbed>` iframe when `project.banner` set
- `OtherProject.jsx` - thumb + title + impact line; ditto
- `BannerEmbed.jsx` - sandboxed iframe (`allow-scripts allow-same-origin`, lazy-loaded) - single source for home thumbs + detail hero

**Card aspect-ratio:** `560/510` when a banner is present (matches banner native canvas); falls back to `16/10` for image-only cards. Classes `thumb--banner` / `featured-img--banner` + `:has(iframe)` both trigger the override.

**Anchor:** `id="work"`

---

## F6 - Footer

**Purpose:** CTA, contact columns (address/email/social from profile).

**Data:** `profile.js`

**File:** `src/components/Footer.jsx`

---

## Project shell (all detail pages)

| Piece | File |
|-------|------|
| Hero banner | `ProjectShell` - embeds `public/banners/<slug>.html` via `<BannerEmbed>` when `project.banner` ends in `.html/.svg`; otherwise `project.image` as background-image; fallback dark gradient |
| Hero overlay | `radial-gradient` + `linear-gradient` dim layer (`.project-shell-banner--embed::after`) - banner reads as a hero image, not a card |
| Hero height | `clamp(280px, 38vw, 420px)` - banner fits width, top/bottom cropped centered |
| Breadcrumbs | Home → Projects → **current title** (below banner) |
| Pager | Prev / next project links |

---

## F7 - Winterplace Ski Resort

| Field | Value |
|-------|-------|
| Route | `/projects/winterplace` |
| Component | `src/projects/WinterplaceProject.jsx` |
| Styles | `src/styles/projects/winterplace.css` |
| Layout | Hero image → insight banner → **TSX dashboard** → split problem/approach → recommendation → impact stats |
| Embed | `EmbedSlot` · `WinterplaceDashboard.tsx` · `recharts` |

**Design intent:** Marketing case study (`.wp-*` classes).

---

## F8 - Programmatic Placement Cutover Sheet

| Field | Value |
|-------|-------|
| Route | `/projects/programmatic-cutover` |
| Component | `src/projects/ProgrammaticCutoverProject.jsx` |
| Styles | `src/styles/projects/programmatic.css` |
| Layout | Dark header → **TSX dashboard** → 3 layers → formula → score cards → outputs |
| Embed | `EmbedSlot` · `CutoverDashboard.tsx` · `recharts` |

---

## F9 - Publisher Trend Analysis

| Field | Value |
|-------|-------|
| Route | `/projects/publisher-trend-analysis` |
| Component | `src/projects/PublisherTrendProject.jsx` |
| Styles | `src/styles/projects/publisher-trend.css` |
| Layout | Large number hero → **TSX dashboard** → metric chips → problem/method → recommendations |
| Embed | `EmbedSlot` · `MomTrendDashboard.tsx` |

---

## F10 - PF Master Reporting Dashboard

| Field | Value |
|-------|-------|
| Route | `/projects/pf-master` |
| Component | `src/projects/PfMasterProject.jsx` |
| Styles | `src/styles/projects/pf-master.css` |
| Layout | Gradient hero → context → **TSX dashboard** → bento feature cards |
| Embed | `EmbedSlot` · `PfMasterDashboard.tsx` |

---

## F11 - Glean Daily Action Planner

| Field | Value |
|-------|-------|
| Route | `/projects/glean-planner` |
| Component | `src/projects/GleanPlannerProject.jsx` |
| Styles | `src/styles/projects/glean-planner.css` |
| Layout | Centered hero → source pills → vertical timeline steps → example trigger → **TSX dashboard** |
| Embed | `EmbedSlot` · `GleanPlannerDashboard.tsx` |

---

## F12 - AI Stakeholder Update Rewriter

| Field | Value |
|-------|-------|
| Route | `/projects/ai-rewriter` |
| Component | `src/projects/AiRewriterProject.jsx` |
| Styles | `src/styles/projects/ai-rewriter.css` |
| Layout | Draft→polished mock → audience pills → output format list → demo description + screenshots (click-to-zoom) → **TSX dashboard** |
| Embed | `EmbedSlot` · `AiRewriterDashboard.tsx` |
| Extras | Inline lightbox: each `.air-shot-trigger` opens an overlay (`.air-lightbox`) showing the enlarged image; close via overlay click, × button, or Escape. Body scroll-locked while open. |

---

## F13 - Monthly Media Ops Retro Analyst

| Field | Value |
|-------|-------|
| Route | `/projects/media-ops-retro` |
| Component | `src/projects/MediaOpsRetroProject.jsx` |
| Styles | `src/styles/projects/media-ops-retro.css` |
| Layout | Centered hero → problem → what-it-does → rules → 5-step pipeline → 3 tab cards → **TSX dashboard** → mock-data note |
| Embed | `EmbedSlot` · `MediaOpsRetroDashboard.tsx` · `recharts` |

---

## F14 - CPA Lineup Intelligence Agent

| Field | Value |
|-------|-------|
| Route | `/projects/cpa-lineup` |
| Component | `src/projects/CpaLineupProject.jsx` |
| Styles | `src/styles/projects/cpa-lineup.css` |
| Layout | Centered hero with 26 publishers / 6 offers / 433 combos stat row → problem → 3 numbered steps → 3 impact cards (Scale revenue / Reduce cost / Net effect) → **TSX dashboard** → mock-data note |
| Embed | `EmbedSlot` · `CpaLineupDashboard.tsx` · `recharts` |
| Notes | Dashboard's "Ask AI" tab calls `api.anthropic.com` directly without auth - request fails in production; filters / KPIs / charts / ranked lineup all run client-side and work standalone. |

---

## Shared project chrome (all F7-F14)

**Component:** `src/components/project/ProjectShell.jsx`

Provides:
- `Nav`
- Banner (image or `<BannerEmbed>` iframe) + dim overlay
- Breadcrumbs strip (Home → Projects → current title)
- `children` (unique page body)
- Prev/Next pager from `getAllProjects()` order
- `Footer`
- `window.scrollTo(0, 0)` on slug change

---

## FX - Theme tokens + dark/light toggle

Charcoal + bronze gold theme with a runtime **dark ↔ light** toggle. Tokens are CSS variables on `:root` in `src/styles/global.css`; the light theme is an attribute override on `:root[data-theme="light"]`. Use `var(...)` everywhere new - never hardcode the swatches.

### Theme switching

| Piece | File | Notes |
|-------|------|-------|
| Provider + hook | `src/context/ThemeContext.jsx` | `theme`, `setTheme`, `toggleTheme`. `localStorage` key `portfolio-theme`. Falls back to `prefers-color-scheme`. Writes `document.documentElement.dataset.theme` + updates `<meta name="theme-color">`. |
| Mount | `src/main.jsx` | Wraps `<App />` in `<ThemeProvider>`. |
| UI | `src/components/ThemeToggle.jsx` | Sun/moon icon button. Mounted in `Nav.jsx` `.nav-actions` (visible on desktop + mobile, both home and project pages - `ProjectShell` reuses `Nav`). |
| Anti-FOUC | `index.html` inline `<script>` in `<head>` | Resolves theme before bundle loads to avoid flash. Mirrors `ThemeContext` defaults. |

### Token table (defaults = dark, overrides = light)

| Variable | Dark | Light | Use |
|----------|------|-------|-----|
| `--bg-primary` | `#1a1a1a` | `#ffffff` | Body + most section backgrounds |
| `--bg-elevated` | `#222222` | `#f4f4f4` | Cards, panels, raised surfaces |
| `--bg-elevated-2` | `#2a2a2a` | `#ececec` | Tiles, dashboard internal surfaces |
| `--accent` | `#c5a47e` | `#c5a47e` | Eyebrows, links, accent borders, CTA (kept bronze for brand) |
| `--accent-hover` | `#d4b896` | `#b89468` | Hover state for accent |
| `--text-heading` | `#ffffff` | `#1a1a1a` | h1/h2/h3, big stat numbers, nav links |
| `--text-body` | `#a0a0a0` | `#555555` | Paragraph copy, footer body |
| `--text-muted` | `#808080` | `#888888` | Labels, captions, meta, footer-bottom |
| `--text-on-accent` | `#ffffff` | `#ffffff` | Text inside accent-filled buttons |
| `--border-subtle` | `#2a2a2a` | `#e5e5e5` | Quiet section dividers, footer rules |
| `--border-accent` | `rgba(197,164,126,0.35)` | `rgba(197,164,126,0.5)` | Accented separators (impact, featured-project top rule) |
| `--text-on-dark*` | white-on-dark family | unchanged | Surfaces that **stay dark** regardless of theme (hero overlay copy, lightbox chrome) |

### Surfaces excluded from theme switching

- **Hero (`Hero.jsx`)** - image + dark gradient overlay; copy stays white in both themes for readability.
- **AI rewriter lightbox** (`src/styles/projects/ai-rewriter.css`) - full-screen overlay always dim.
- **Animated banners** (`public/banners/*.html`) - self-contained iframed docs with their own palette; not driven by `data-theme`. Cards/wrappers around them follow the site theme.
- **Dashboard embeds** (`src/embeds/*Dashboard.tsx`) - internal palettes are hard-coded (Claude artifact exports). The surrounding `EmbedSlot` chrome (border, header, fullscreen background) follows the site theme.

---

## FY - Dashboard embed system

| Piece | File |
|-------|------|
| Slot component | `src/components/project/EmbedSlot.jsx` - lazy-loads from `dashboards` map; supports Fullscreen toggle (Esc to exit) |
| Keys + titles | `src/data/projectEmbeds.js` (one entry per embed) |
| TSX dashboards | `src/embeds/*Dashboard.tsx` - Claude artifact exports, default-exported React components |
| Styles | `src/styles/embed-slot.css` |
| Docs | `src/embeds/README.md` (full wiring guide) |

Every detail page (F7-F14) mounts one `<EmbedSlot {...projectEmbeds.<key>} />`. `recharts` is the only chart dependency.

---

## FZ - Banner system

Animated/interactive project banners shared between the home page cards and detail page heroes.

| Piece | File |
|-------|------|
| Banner HTML | `public/banners/<slug>.html` - self-contained doc with native 560×510 canvas + inline `<script>` that sets a CSS var to scale to iframe width |
| Iframe wrapper | `src/components/BannerEmbed.jsx` - sandboxed `<iframe>` (`allow-scripts allow-same-origin`), `loading="lazy"`, `scrolling="no"` |
| Home card mount | `FeaturedProject.jsx` / `OtherProject.jsx` - passes `className="featured-img-inner"` / `"thumb-inner"` |
| Detail hero mount | `ProjectShell.jsx` - detects `.html`/`.svg` banner, renders `<BannerEmbed>` + dim overlay |
| Source of truth | `public/banners/*.html` - edit in place; no separate `docs/` source dir |

Scaling pattern inside each banner:
```js
function setScale() {
  document.documentElement.style.setProperty('--scale', window.innerWidth / 560);
}
setScale(); window.addEventListener('resize', setScale);
```
```css
.banner-fit { width: 560px; height: 510px; transform: scale(var(--scale, 1)); }
```
This is required because `transform: scale(calc(100vw / 560))` is invalid CSS (calc returns a `length`, scale needs `<number>`).

---

## Content source of truth

| Layer | File | Role |
|-------|------|------|
| Mapping reference | `docs/CONTENT_SOURCE.md` | Original long-form copy; update on content requests for traceability |
| Homepage runtime | `src/data/*` | What the app actually renders |
| Project runtime | `src/projects/*Project.jsx` | Case study copy and layout |

**Priority:** explicit user instructions in chat override `CONTENT_SOURCE.md`.  
When updating narrative (unless the user says otherwise): sync `CONTENT_SOURCE.md`, `src/data/*`, and the relevant `src/projects/*` file.

---

## Feature dependency matrix

| Feature | Depends on |
|---------|------------|
| Hero | `profile`, `stats.heroStats`, `#impact` existing |
| Nav | `profile.contact` + section anchors `#impact`, `#about`, `#personal`, `#work` |
| Personal Interest | `personal.images[]` files present in `public/images/personal/` |
| Projects cards | `projects.js` links matching `App.jsx` routes; `banner` path matching a file in `public/banners/` |
| Project pages | `projects.js` for pager + optional `getProjectCard`; matching key in `projectEmbeds.js` + lazy entry in `EmbedSlot.jsx` for dashboards |
| Skill icons | `skills.icon` key ∈ `skillIconMap` keys |
| Theme | All non-hero/non-dashboard surfaces must reference `var(--*)` tokens from global.css `:root`. Toggle state owned by `ThemeContext` + persisted in `localStorage` key `portfolio-theme`. |
