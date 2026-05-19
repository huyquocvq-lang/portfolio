# Dashboard embeds (TSX)

Claude artifact exports live here. Vite compiles them; project pages load via `EmbedSlot` (lazy chunks).

| File | Embed key | Project route |
|------|-----------|----------------|
| `WinterplaceDashboard.tsx`    | `winterplace`    | `/projects/winterplace` |
| `CutoverDashboard.tsx`        | `cutover`        | `/projects/programmatic-cutover` |
| `MomTrendDashboard.tsx`       | `momTrend`       | `/projects/publisher-trend-analysis` |
| `PfMasterDashboard.tsx`       | `pfMaster`       | `/projects/pf-master` |
| `GleanPlannerDashboard.tsx`   | `gleanPlanner`   | `/projects/glean-planner` |
| `AiRewriterDashboard.tsx`     | `aiRewriter`     | `/projects/ai-rewriter` |
| `MediaOpsRetroDashboard.tsx`  | `mediaOpsRetro`  | `/projects/media-ops-retro` |

## How it wires together

1. Drop the TSX file into `src/embeds/` (must `export default function …`).
2. Register the lazy import in `src/components/project/EmbedSlot.jsx`:
   ```js
   const dashboards = {
     yourKey: lazy(() => import('../../embeds/YourDashboard'))
   }
   ```
3. Add an entry to `src/data/projectEmbeds.js`:
   ```js
   yourKey: { embedKey: 'yourKey', title: 'Your dashboard title' }
   ```
4. Mount it on the project page:
   ```jsx
   <EmbedSlot {...projectEmbeds.yourKey} />
   ```

## Dependencies

`recharts` is used by chart-based embeds. Install (already in `package.json`) if a build fails on import.

## Notes

- Replacement: overwrite the `.tsx` in place; keep `export default function …`.
- `public/embeds/` is legacy placeholder HTML - not loaded when TSX embeds are wired.
- Embeds render inside `.embed-slot__canvas` (max-height ~520px desktop; fullscreen toggle available).
- Dashboards keep their own internal color palette; the site shell applies the dark charcoal + bronze theme around them.
