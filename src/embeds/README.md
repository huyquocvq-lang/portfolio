# Dashboard embeds (TSX)

Claude artifact exports live here. Vite compiles them; project pages load via `EmbedSlot` (lazy).

| File | Project route |
|------|----------------|
| `PfMasterDashboard.tsx` | `/projects/pf-master` |
| `MomTrendDashboard.tsx` | `/projects/publisher-trend-analysis` |
| `CutoverDashboard.tsx` | `/projects/programmatic-cutover` |

**Dependency:** `recharts` (install if build fails on import).

**Replace:** overwrite the `.tsx` file, keep `export default function ...`.

`public/embeds/` is legacy placeholder HTML — not used when TSX embeds are wired.
