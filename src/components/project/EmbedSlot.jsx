import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import '../../styles/embed-slot.css'

const dashboards = {
  winterplace: lazy(() => import('../../embeds/WinterplaceDashboard')),
  cutover: lazy(() => import('../../embeds/CutoverDashboard')),
  momTrend: lazy(() => import('../../embeds/MomTrendDashboard')),
  pfMaster: lazy(() => import('../../embeds/PfMasterDashboard')),
  gleanPlanner: lazy(() => import('../../embeds/GleanPlannerDashboard')),
  aiRewriter: lazy(() => import('../../embeds/AiRewriterDashboard')),
  mediaOpsRetro: lazy(() => import('../../embeds/MediaOpsRetroDashboard'))
}

export default function EmbedSlot({ embedKey, title }) {
  const [fullscreen, setFullscreen] = useState(false)
  const Dashboard = dashboards[embedKey]

  const exitFullscreen = useCallback(() => setFullscreen(false), [])

  useEffect(() => {
    if (!fullscreen) return undefined

    const onKeyDown = (e) => {
      if (e.key === 'Escape') exitFullscreen()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [fullscreen, exitFullscreen])

  if (!Dashboard) {
    return null
  }

  return (
    <section
      className={`embed-slot${fullscreen ? ' embed-slot--fullscreen' : ''}`}
      aria-label={title}
    >
      <div className="embed-slot__inner">
        <div className="embed-slot__head">
          <h2 className="embed-slot__title">{title}</h2>
          <button
            type="button"
            className="embed-slot__fs-btn"
            onClick={() => setFullscreen((v) => !v)}
            aria-pressed={fullscreen}
          >
            {fullscreen ? 'Exit fullscreen' : 'Fullscreen ↗'}
          </button>
        </div>

        <Suspense fallback={<p className="embed-slot__loading">Loading dashboard…</p>}>
          <div className="embed-slot__canvas">
            <Dashboard />
          </div>
        </Suspense>
      </div>
    </section>
  )
}
