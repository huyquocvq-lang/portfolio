# Portfolio — React JS

Portfolio React project built from the original HTML template.
Data is centralized in `src/data/` for easy editing.

## Content source

Long-form copy for mapping lives in **[docs/CONTENT_SOURCE.md](./docs/CONTENT_SOURCE.md)** (not bundled in the app).  
Runtime text is in `src/data/*` and `src/projects/*`. User instructions override the content source file.

## AI / Cursor / Claude

| File | Purpose |
|------|---------|
| [AGENTS.md](./AGENTS.md) | Entry point for AI agents |
| [docs/USAGE_GUIDE.md](./docs/USAGE_GUIDE.md) | Usage guide + doc sync table |
| [docs/AI_AGENT_GUIDE.md](./docs/AI_AGENT_GUIDE.md) | Agent workflows (EN) |
| `.cursor/rules/sync-documentation.mdc` | Rule: every code change must update docs |
| `.cursor/skills/portfolio-site/SKILL.md` | Cursor skill → invoke or auto-load |
| `.claude/skills/portfolio-site/SKILL.md` | Claude Code skill → `/portfolio-site` |
| `.claude/skills/sync-documentation/SKILL.md` | Claude Code skill → `/sync-documentation` |
| [CLAUDE.md](./CLAUDE.md) | Claude Code project instructions |

**Rule:** any code change → update the matching docs in the same commit.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build for production

```bash
npm run build
# Output: dist/
```

## Folder structure

```
portfolio/
├── public/
│   └── images/                 ← Place all images here
│       ├── hero-bg.jpg         ← Hero background
│       └── projects/           ← Project thumbnails
│           ├── winterplace.jpg
│           ├── programmatic.jpg
│           ├── trend-analysis.jpg
│           ├── pf-master.jpg
│           ├── glean-planner.jpg
│           └── ai-rewriter.jpg
├── src/
│   ├── data/                   ← ALL CONTENT LIVES HERE
│   │   ├── profile.js          ← Name, role, tagline, contact
│   │   ├── stats.js            ← Hero stats + Impact highlights
│   │   ├── about.js            ← About section text
│   │   ├── skills.js           ← Skills grid
│   │   └── projects.js         ← Featured + Other projects
│   ├── components/             ← UI components (reusable)
│   │   ├── Hero.jsx
│   │   ├── Nav.jsx
│   │   ├── Impact.jsx
│   │   ├── AboutSkills.jsx
│   │   ├── Skill.jsx           ← Reusable skill card
│   │   ├── Projects.jsx
│   │   ├── FeaturedProject.jsx
│   │   ├── OtherProject.jsx    ← Reusable project card
│   │   └── Footer.jsx
│   ├── styles/
│   │   └── global.css          ← All styles in one file
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## How to edit content

All editable content lives in `src/data/`. You don't need to touch components.

### Change name, tagline, contact
Edit `src/data/profile.js`

### Change hero stats or impact numbers
Edit `src/data/stats.js`

### Change About text
Edit `src/data/about.js` — `paragraphs` is an array, add/remove freely.

### Change skills
Edit `src/data/skills.js` — array of skill objects.

### Add / edit / reorder projects
Edit `src/data/projects.js`:
- `featuredProject` — the pinned project at the top
- `otherProjects` — array; add/remove/reorder items

To swap which project is featured: move the object between `featuredProject` 
and `otherProjects`.

## How to add images

1. Put your image file in `public/images/` (or `public/images/projects/`)
2. Reference it in the data file as `/images/your-file.jpg` 
   (path starts with `/`, no `public` prefix — Vite serves `public/` at root)

Example:
```js
image: '/images/projects/winterplace.jpg'
```

## Replacing the placeholder images

The data files reference image paths that don't exist yet. Add real images at:

- `public/images/hero-bg.jpg`           (hero background)
- `public/images/projects/winterplace.jpg`
- `public/images/projects/programmatic.jpg`
- `public/images/projects/trend-analysis.jpg`
- `public/images/projects/pf-master.jpg`
- `public/images/projects/glean-planner.jpg`
- `public/images/projects/ai-rewriter.jpg`

Recommended sizes:
- Hero: 2000×1200 (will be cropped to viewport)
- Featured project: 1400×900 (16:10 aspect)
- Other projects: 1200×750 (16:10 aspect)

Per the original brief, avoid uploading internal dashboards or confidential 
data — use mockups or anonymized visuals.
