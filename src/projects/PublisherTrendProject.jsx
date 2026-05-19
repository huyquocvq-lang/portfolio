import ProjectShell from '../components/project/ProjectShell'
import EmbedSlot from '../components/project/EmbedSlot'
import { getProjectCard } from '../data/projects'
import { projectEmbeds } from '../data/projectEmbeds'
import '../styles/projects/publisher-trend.css'

const meta = getProjectCard('publisher-trend-analysis')

const METRICS = [
  'Impressions', 'Clicks', 'CTR', 'C2C', 'Revenue', 'Conversions', 'RPM', 'eCPA', 'Bank CPM', 'GPM'
]

const RECS = [
  'Publishers to ramp',
  'Placements to slow or pause',
  'Offers to move higher in lineup',
  'Publishers needing further testing',
  'Traffic sources with efficiency risk'
]

export default function PublisherTrendProject() {
  return (
    <ProjectShell slug="publisher-trend-analysis">
      <article className="trend">
        <header className="project-intro project-intro--trend">
          <span className="project-intro__eyebrow">{meta.type}</span>
          <h1>{meta.title}</h1>
          <p className="project-intro__lead">{meta.subtitle}</p>
        </header>

        <EmbedSlot {...projectEmbeds.momTrend} />

        <section className="trend-metrics">
          <p className="trend-label">Metrics tracked</p>
          <div className="trend-chips">
            {METRICS.map((m) => (
              <span key={m} className="trend-chip">{m}</span>
            ))}
          </div>
        </section>

        <section className="trend-narrative">
          <div className="trend-col">
            <h2>Problem</h2>
            <p>
              The team needed a faster way to see which publishers were improving, declining, or
              creating risk - shifts driven by traffic quality, offer/creative changes, APY updates, or
              budget allocation.
            </p>
          </div>
          <div className="trend-col">
            <h2>Method</h2>
            <p>
              Compared publisher and placement performance across current month, prior month, and
              historical trends - revenue growth, conversion quality, rising eCPA, weaker RPM, volume
              shifts.
            </p>
          </div>
        </section>

        <section className="trend-recs">
          <h2>Report outputs</h2>
          <ol>
            {RECS.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ol>
        </section>

        <p className="trend-impact">{meta.impact}</p>
      </article>
    </ProjectShell>
  )
}
