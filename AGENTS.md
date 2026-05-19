# AGENTS.md — Jenny Tang Portfolio

> **Read this file before changing code.** This repo is **React 18 + Vite 5** (web), **not React Native**.

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/
```

Node **18+** required.

## Required when changing code

**Every code or config change must update the matching documentation in the same PR/commit.**  
See mapping table: [docs/USAGE_GUIDE.md](docs/USAGE_GUIDE.md#42-mapping-code-change--documentation).

Do not merge if docs are out of sync with the code.

## Documentation map

| Goal | File |
|------|------|
| Usage guide + doc sync table | [docs/USAGE_GUIDE.md](docs/USAGE_GUIDE.md) |
| AI agent quick reference | [docs/AI_AGENT_GUIDE.md](docs/AI_AGENT_GUIDE.md) |
| Architecture | [docs/ARCHITECTURE_OVERVIEW.md](docs/ARCHITECTURE_OVERVIEW.md) |
| Feature → file | [docs/FEATURE_MAP.md](docs/FEATURE_MAP.md) |
| Static assets | [docs/API_FLOW.md](docs/API_FLOW.md) |
| Full reference | [docs/FULL_DOCUMENTATION.md](docs/FULL_DOCUMENTATION.md) |
| Content source (mapping reference) | [docs/CONTENT_SOURCE.md](docs/CONTENT_SOURCE.md) |

## Quick content edits

| Change | File |
|--------|------|
| Name, tagline, contact | `src/data/profile.js` |
| Impact / hero stats | `src/data/stats.js` |
| About | `src/data/about.js` |
| Skills | `src/data/skills.js` + `src/data/skillIcons.js` |
| Personal Interest (copy + photos) | `src/data/personal.js` (+ `public/images/personal/*.jpeg`) |
| Project card (homepage) | `src/data/projects.js` |
| Project page (layout + copy) | `src/projects/<Name>Project.jsx` + `src/styles/projects/<name>.css` |
| Animated banner (home thumb + detail hero) | `public/banners/<slug>.html` (edit in place) |
| Dashboard embed | `src/embeds/<Name>Dashboard.tsx` + register in `EmbedSlot.jsx` + `projectEmbeds.js` |
| Theme tokens (dark + light) | `src/styles/global.css` `:root` (dark defaults) + `:root[data-theme="light"]` (light overrides) |
| Theme toggle wiring | `src/context/ThemeContext.jsx`, `src/components/ThemeToggle.jsx`, anti-FOUC script in `index.html` |
| New route | `src/App.jsx` + `projects.js` slug/link |

## Architecture summary

- **Home:** `src/pages/HomePage.jsx` → Hero, Nav, Impact, AboutSkills, **PersonalInterest**, Projects, Footer
- **Projects:** 7 separate files in `src/projects/` — **no** shared generic template
- **Shell:** `src/components/project/ProjectShell.jsx` — Nav, hero banner (iframe or image) + dim overlay, breadcrumbs, prev/next, Footer
- **Banners:** `BannerEmbed.jsx` renders `public/banners/<slug>.html` as a sandboxed iframe (home cards + detail hero)
- **Dashboards:** `EmbedSlot.jsx` lazy-loads `src/embeds/*Dashboard.tsx` (1 per project)
- **Theme:** charcoal + bronze gold dark default; light theme via `:root[data-theme="light"]` override. Tokens on `:root` of `global.css`, referenced via `var(--*)`. Toggle in nav (`ThemeToggle`), state in `ThemeContext`, persisted to `localStorage`.
- **State:** local only for most components (`Hero`, `Nav`, `EmbedSlot` fullscreen, `AiRewriterProject` lightbox) + one React Context (`ThemeContext`) for the dark/light toggle. No Redux, no API.

## AI tooling

| Tool | What | Path |
|------|------|------|
| Cursor rule | Doc sync (always on) | `.cursor/rules/sync-documentation.mdc` |
| Cursor skill | Portfolio workflow | `.cursor/skills/portfolio-site/SKILL.md` |
| Claude Code skill | Portfolio workflow | `.claude/skills/portfolio-site/SKILL.md` → `/portfolio-site` |
| Claude Code skill | Doc sync | `.claude/skills/sync-documentation/SKILL.md` → `/sync-documentation` |

## Do not assume

- React Native, Expo, iOS/Android native
- Backend API, auth, or `.env` secrets
- `framer-motion` (not in this project)
