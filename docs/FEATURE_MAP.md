# Feature Map — Jenny Tang Portfolio

## Feature index

| ID | Feature | Primary files | Route / anchor |
|----|---------|---------------|----------------|
| F1 | Hero banner | `src/components/Hero.jsx` | `/#top` |
| F2 | Sticky navigation | `src/components/Nav.jsx` | global |
| F3 | Impact highlights | `src/components/Impact.jsx` | `/#impact` |
| F4 | About + skills grid | `src/components/AboutSkills.jsx`, `Skill.jsx` | `/#about` |
| F5 | Projects listing | `src/components/Projects.jsx`, `FeaturedProject.jsx`, `OtherProject.jsx` | `/#work` |
| F6 | Footer / CTA | `src/components/Footer.jsx` | footer |
| F7–F12 | Individual project case studies | `src/projects/*Project.jsx` | `/projects/:slug` |

---

## F1 — Hero banner

**Purpose:** Full-viewport introduction with animated entrance, scroll-driven content fade, author name reveal, scroll-down affordance.

**Data sources:**
- `src/data/profile.js` — name, role, tagline, intro, `heroImage`
- `src/data/stats.js` — `heroStats` (3 metrics; intro/stats hidden on mobile via CSS)

**Key behavior (`Hero.jsx`):**

```javascript
// Scroll progress: 0 at top → 1 after ~55% of hero height scrolled
const progress = Math.min(1, Math.max(0, scrolled / (height * 0.55)))

// Main content fades out; scroll-name fades in from bottom
const mainOpacity = 1 - scrollProgress
const nameOpacity = scrollProgress
```

**CSS:** `src/styles/global.css` — `.hero`, `.hero--ready`, `.hero--preload`, `.hero-scroll-name`, `.hero-scroll-down`

**User interactions:**
- Click scroll icon → smooth scroll to `#impact`
- Scroll down → crossfade to author name overlay

---

## F2 — Navigation

**Purpose:** Sticky header; section links on home; hamburger drawer on mobile.

**Data:** `profile.js` — name, `contact.linkedin`, `contact.resume`, optional `contact.github`

**State:** `open` boolean for mobile menu; locks `document.body.overflow`

**Links pattern:**
- In-page (home): `/#impact`, `/#about`, `/#work`
- External: LinkedIn, Resume (Google Docs)
- Logo: `/`

**CSS:** `src/styles/global.css` — `.nav`, `.nav--open`, `.nav-toggle` (visible ≤768px)

---

## F3 — Impact highlights

**Purpose:** Six quantitative achievements in a responsive grid.

**Data:** `src/data/stats.js` — `impactHighlights[]` with `{ big, desc }`

**Component:** `src/components/Impact.jsx` — maps array to `.impact-item`

**Anchor:** `id="impact"`

---

## F4 — About + skills

**Purpose:** Two-column layout (about text sticky on desktop); 2×3 skills grid with Font Awesome icons via react-icons.

**Data:**
- `src/data/about.js` — `eyebrow`, `heading`, `paragraphs[]`
- `src/data/skills.js` — skill objects with `icon` key
- `src/data/skillIcons.js` — maps keys to `react-icons/fa` components

**Components:**
- `AboutSkills.jsx` — layout wrapper
- `Skill.jsx` — single card; resolves icon via `skillIconMap[icon]`

**Anchor:** `id="about"`

---

## F5 — Projects listing

**Purpose:** One featured project (large layout) + grid of five additional projects.

**Data:** `src/data/projects.js`
- `featuredProject` — full card + detail route
- `otherProjects[]` — grid cards
- Helpers: `getAllProjects()`, `getProjectCard(slug)`

**Navigation:** Each card uses `react-router-dom` `<Link to={project.link}>`

**Subcomponents:**
- `FeaturedProject.jsx` — image link + meta + CTA
- `OtherProject.jsx` — thumb + title + impact line

**Anchor:** `id="work"`

---

## F6 — Footer

**Purpose:** CTA, contact columns (address/email/social from profile).

**Data:** `profile.js`

**File:** `src/components/Footer.jsx`

---

## F7 — Winterplace Ski Resort

| Field | Value |
|-------|-------|
| Route | `/projects/winterplace` |
| Component | `src/projects/WinterplaceProject.jsx` |
| Styles | `src/styles/projects/winterplace.css` |
| Layout | Hero image → insight banner → split problem/approach → recommendation → impact stats |

**Design intent:** Marketing case study (`.wp-*` classes).

---

## F8 — Programmatic Placement Cutover Sheet

| Field | Value |
|-------|-------|
| Route | `/projects/programmatic-cutover` |
| Component | `src/projects/ProgrammaticCutoverProject.jsx` |
| Styles | `src/styles/projects/programmatic.css` |
| Layout | Dark header + publisher tags → 3 layers → formula → score cards → outputs |

---

## F9 — Publisher Trend Analysis

| Field | Value |
|-------|-------|
| Route | `/projects/publisher-trend-analysis` |
| Component | `src/projects/PublisherTrendProject.jsx` |
| Styles | `src/styles/projects/publisher-trend.css` |
| Layout | Large number hero → metric chips → problem/method columns → numbered recommendations |

---

## F10 — PF Master Reporting Dashboard

| Field | Value |
|-------|-------|
| Route | `/projects/pf-master` |
| Component | `src/projects/PfMasterProject.jsx` |
| Styles | `src/styles/projects/pf-master.css` |
| Layout | Gradient hero + bento grid of 5 feature cards |

---

## F11 — Glean Daily Action Planner

| Field | Value |
|-------|-------|
| Route | `/projects/glean-planner` |
| Component | `src/projects/GleanPlannerProject.jsx` |
| Styles | `src/styles/projects/glean-planner.css` |
| Layout | Centered hero → source pills → vertical timeline steps |

---

## F12 — AI Stakeholder Update Rewriter

| Field | Value |
|-------|-------|
| Route | `/projects/ai-rewriter` |
| Component | `src/projects/AiRewriterProject.jsx` |
| Styles | `src/styles/projects/ai-rewriter.css` |
| Layout | Draft→polished mock → audience pills → output format list |

---

## Shared project chrome (all F7–F12)

**Component:** `src/components/project/ProjectShell.jsx`

Provides:
- `Nav`
- “← All Projects” → `/#work`
- `children` (unique page body)
- Prev/Next pager from `getAllProjects()` order
- `Footer`
- `window.scrollTo(0, 0)` on slug change

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
| Nav | `profile.contact` |
| Projects cards | `projects.js` links matching `App.jsx` routes |
| Project pages | `projects.js` for pager + optional `getProjectCard` |
| Skill icons | `skills.icon` key ∈ `skillIconMap` keys |
