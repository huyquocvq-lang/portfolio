import ProjectShell from '../components/project/ProjectShell'
import EmbedSlot from '../components/project/EmbedSlot'
import { getProjectCard } from '../data/projects'
import { projectEmbeds } from '../data/projectEmbeds'
import '../styles/projects/media-ops-retro.css'

const meta = getProjectCard('media-ops-retro')

const DASHBOARD_URL =
  'https://claude.ai/public/artifacts/ef2e3a00-55d1-4f5e-a550-426bc01c20bd'

const PIPELINE_STEPS = [
  { title: 'Load publisher history', text: '12-month revenue, GPM, eCPA, funding, bank CPM per publisher.' },
  { title: 'Load offer data', text: 'Offer-by-publisher table for the target month.' },
  { title: 'Compute YTD rankings', text: 'Rank each publisher’s month vs. its own YTD history.' },
  { title: 'Generate retro', text: 'Auto-write wins, misses & action plans from the data.' },
  { title: 'Flag sub-$20K', text: 'Tiny noisy rows ignored; sub-scale publishers surfaced.' }
]

const RULES = [
  'Revenue is only a "win" if it’s top-3 YTD for that publisher.',
  'eCPA isn’t over-indexed for obvious CPA offers.',
  'High bank CPM → placement cleanup; strong funding + healthy GPM → scale; negative margin → pause.',
  'Sub-$20K rows are flagged separately so they don’t pollute the headline retro.'
]

const TABS = [
  {
    name: 'Retro Output',
    body:
      'Publisher-by-publisher table with auto-generated wins, misses, and action plans. Revenue is praised only if it’s top-3 YTD (e.g., CNNMoney $352K, 1st YTD, GPM 100%); misses fire when it’s a 1st/2nd-lowest month or GPM goes negative (NAF Digital -5% GPM). Below: under-$20K flags (NAF Digital $18K, Earnin $14K, SmartNews $7K) and 8 offer-level callouts.'
  },
  {
    name: 'Publisher Trends',
    body:
      'Pick any publisher to see 12-month revenue bars + GPM line, with April highlighted. Plus an all-publishers overlay showing how Google SEM dominates while Facebook Media is volatile.'
  },
  {
    name: 'MoM Compare',
    body:
      'March → April comparison with exact revenue/GPM deltas and color-coded badges. Highlight: Facebook Media GPM swung from −8% to +5% (still weakest), while Google SEM hit 72% GPM on $485K (best month on record).'
  }
]

export default function MediaOpsRetroProject() {
  return (
    <ProjectShell slug="media-ops-retro">
      <article className="retro">
        <header className="project-intro project-intro--center">
          <span className="project-intro__eyebrow">{meta.type}</span>
          <h1>{meta.title}</h1>
          <p className="project-intro__lead">{meta.subtitle}</p>
        </header>

        <section className="retro-why">
          <h2>The problem</h2>
          <p>
            Writing a monthly publisher cutover retro manually takes ~2 hours of pulling data across
            spreadsheets, ranking performance, and writing up insights — and the quality varies
            depending on who does it.
          </p>
        </section>

        <section className="retro-how">
          <h2>What the agent does</h2>
          <p>
            The agent ingests two files (12-month publisher history + offer-by-publisher data for
            the target month), then automatically ranks each publisher’s revenue against their YTD
            history, computes GPM / eCPA / funding / bank CPM trends, flags anyone under $20K as
            sub-scale, and produces a structured retro table with wins, misses, and action plans
            that logically follow from the data. It also surfaces scalable offer-level callouts —
            the kind of insight that usually gets buried in a pivot table.
          </p>
        </section>

        <section className="retro-rules">
          <h2>Rules baked in</h2>
          <ul>
            {RULES.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </section>

        <section className="retro-flow">
          <h2>How the dashboard runs</h2>
          <p className="retro-flow-lead">
            The dashboard has a <strong>“Run retro agent”</strong> button that animates through 5
            processing steps:
          </p>
          <div className="retro-steps">
            {PIPELINE_STEPS.map((step, i) => (
              <div key={step.title} className="retro-step">
                <span className="retro-step-n">{i + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="retro-tabs">
          <h2>Three tabs of output</h2>
          <div className="retro-tab-grid">
            {TABS.map((t) => (
              <div key={t.name} className="retro-tab-card">
                <div className="retro-tab-name">{t.name}</div>
                <p>{t.body}</p>
              </div>
            ))}
          </div>
        </section>

        <EmbedSlot {...projectEmbeds.mediaOpsRetro} />

        <section className="retro-dashboard">
          <p>
            Want the original Claude artifact? <a
              href={DASHBOARD_URL}
              target="_blank"
              rel="noreferrer"
              className="retro-dashboard-link"
            >Open dashboard in a new tab ↗</a>
          </p>
        </section>

        <aside className="retro-note">
          <p>
            <strong>Note:</strong> All data shown here is sample / mock data created for testing the
            agent. The logic, ranking, and write-up structure mirror what runs against real media ops
            retros.
          </p>
        </aside>
      </article>
    </ProjectShell>
  )
}
