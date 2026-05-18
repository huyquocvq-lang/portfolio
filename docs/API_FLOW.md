# API & External Data Flow — Jenny Tang Portfolio

> This project has **no first-party REST/GraphQL API** and **no authentication layer**. It is a static content site. This document describes actual external data flows and what to do if you add a backend later.

## Current architecture: static content

```mermaid
sequenceDiagram
  participant Browser
  participant Vite as Vite dev / static host
  participant JS as React bundle
  participant Data as src/data/*.js
  participant CDN as Google Fonts CDN
  participant Ext as External sites

  Browser->>Vite: GET /index.html
  Vite-->>Browser: HTML + JS assets
  Browser->>JS: Execute main.jsx
  JS->>Data: import profile, projects, etc.
  Data-->>JS: Plain objects (bundled at build time)
  JS-->>Browser: Render DOM
  Browser->>CDN: GET fonts (index.html link)
  Note over Browser,Ext: User clicks LinkedIn/Resume
  Browser->>Ext: Navigate away (full page)
```

## HTTP client

**Not present.** No `axios`, `fetch` wrappers, or `react-query` in `package.json`.

## “Endpoints” (external only)

| URL | Method | Used by | Purpose |
|-----|--------|---------|---------|
| N/A (bundled modules) | — | All components | Content from `src/data` and project JSX |
| `https://fonts.googleapis.com/...` | GET | `index.html` | Source Sans Pro + Cormorant Garamond |
| `profile.contact.linkedin` | GET (browser navigation) | `Nav.jsx` | User profile |
| `profile.contact.resume` | GET (browser navigation) | `Nav.jsx` | Google Docs resume |
| `/images/*` | GET | Hero, project heroes, personal masonry | Static assets from `public/images/` |
| `/banners/<slug>.html` | GET (iframe) | `BannerEmbed` on home cards + `ProjectShell` on detail | Self-contained animated banner per project |

### Image asset paths (static files)

| Path | Referenced in |
|------|----------------|
| `/hero-banners/hero_*.{webp,png}` | `Hero.jsx` — 8 art-directed variants × 2 formats (mobile portrait, mobile landscape, tablet, MacBook 13, FHD, QHD, 4K, ultrawide) |
| `/images/projects/winterplace.jpg` | `featuredProject.image` |
| `/images/projects/programmatic.jpg` | `otherProjects[0]` |
| `/images/projects/trend-analysis.jpg` | `otherProjects[1]` |
| `/images/projects/pf-master.jpg` | `otherProjects[2]` |
| `/images/projects/glean-planner.jpg` | `otherProjects[3]` |
| `/images/projects/ai-rewriter.jpg` | `otherProjects[4]` |
| `/images/projects/media-ops-retro.jpg` | `otherProjects[5]` (optional fallback) |
| `/images/personal/personal_1.jpeg` … `personal_6.jpeg` | `personal.images[]` (masonry wall) |
| `/images/agents/ai-rewriter-input.png` | `AiRewriterProject` demo screenshot 1 |
| `/images/agents/ai-rewriter-output.png` | `AiRewriterProject` demo screenshot 2 |

### Banner asset paths (static HTML, served as iframe documents)

| Path | Referenced in |
|------|----------------|
| `/banners/winterplace.html` | `featuredProject.banner` |
| `/banners/programmatic-cutover.html` | `otherProjects[0].banner` |
| `/banners/publisher-trend-analysis.html` | `otherProjects[1].banner` |
| `/banners/pf-master.html` | `otherProjects[2].banner` |
| `/banners/glean-planner.html` | `otherProjects[3].banner` |
| `/banners/ai-rewriter.html` | `otherProjects[4].banner` |
| `/banners/media-ops-retro.html` | `otherProjects[5].banner` |

Each file is loaded as an `<iframe>` document — keeps animation CSS / inline `<script>` self-contained. The sandbox flags are `allow-scripts allow-same-origin`.

### Lazy-loaded dashboard chunks

Compiled by Vite from `src/embeds/*Dashboard.tsx` and split into per-project chunks (loaded only when the matching detail page mounts the `EmbedSlot`). Filenames are hash-suffixed in `dist/assets/` and not referenced from outside JS.

See `public/images/README.txt` for placement notes.

## Authentication flow

**Not applicable.** No login, tokens, sessions, or secure storage.

## Error handling (network)

No API error boundaries. Possible runtime issues:

| Scenario | Behavior |
|----------|----------|
| Missing image file | Broken background image (browser 404) |
| Missing banner HTML | iframe shows empty document (cards keep aspect-ratio + dark `--bg-primary` background) |
| Banner JS error inside iframe | Iframe renders at native 560×510 with no scaling; visible black margins on wider containers |
| Missing embed in `EmbedSlot.dashboards` map | `EmbedSlot` silently renders nothing (returns `null`) |
| Invalid project slug | `ProjectPage` pattern removed; unknown routes fall through unless host returns SPA index |
| Missing route in `App.jsx` | Blank or host 404 depending on deployment |

To add a catch-all route, extend `App.jsx`:

```jsx
<Route path="*" element={<Navigate to="/" replace />} />
```

(Currently only defined routes exist; direct URL to unknown path depends on host SPA config.)

## Routing vs “API”

`react-router-dom` handles client-side navigation only:

```javascript
// src/App.jsx — explicit route table
<Route path="/projects/winterplace" element={<WinterplaceProject />} />
```

No route loaders, no data fetching on navigation.

## Hash-based deep linking (home)

```javascript
// src/pages/HomePage.jsx
useEffect(() => {
  if (!window.location.hash) return
  const id = window.location.hash.replace('#', '')
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}, [])
```

Flow: User opens `https://site.com/#work` → Home mounts → scrolls to `#work`.

## If you add a real API later (recommended pattern)

This repo does not implement the following; use as migration guide:

```
src/
  api/
    client.js          # fetch wrapper, base URL from import.meta.env
    endpoints.js       # path constants
  services/
    portfolioService.js
  hooks/
    useProjects.js     # optional react-query
```

### Suggested env vars (Vite)

```bash
# .env.local (not committed)
VITE_API_BASE_URL=https://api.example.com
```

Access via `import.meta.env.VITE_API_BASE_URL`.

### Token handling (if auth added)

Not in scope today. Would typically use:
- HttpOnly cookies (preferred for web), or
- Bearer token in memory + refresh flow

Do not store secrets in `src/data/*` — those files are public in the bundle.

## Third-party services summary

| Service | Data sent | Privacy note |
|---------|-----------|--------------|
| Google Fonts | IP, referrer | CDN request from visitor browser |
| LinkedIn / Google Docs | Standard referrer when user clicks | Leaves site |

## CMS / headless content (future)

To avoid redeploying for copy changes, consider:
- Contentful / Sanity / markdown in repo
- Build-time fetch in `vite.config.js`

Current design optimizes for **simplicity and full design control per project page**.
