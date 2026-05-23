import ProjectShell from '../components/project/ProjectShell'
import EmbedSlot from '../components/project/EmbedSlot'
import { getProjectCard } from '../data/projects'
import { projectEmbeds } from '../data/projectEmbeds'
import '../styles/projects/cpa-lineup.css'

const meta = getProjectCard('cpa-lineup')

const SCOPE = [
  { label: 'Publishers', value: '26' },
  { label: 'Offers', value: '6' },
  { label: 'Placement-offer combos', value: '433' }
]

const STEPS = [
  {
    title: 'Auto-surfaces what matters',
    text: 'Scans every combo and flags the high-RPM winners (MyPoints × Synchrony CD at $1,260 RPM), scale opportunities where C2C is strong but volume is low, and waste spots burning millions of impressions with zero conversions (e.g. CNN placements at 50M+ impressions returning near-zero).'
  },
  {
    title: 'Builds your lineup for you',
    text: 'Generates a prioritized lineup sorted by RPM with clear action tags - MAX PRIORITY, PRIORITIZE, MAINTAIN, or TEST MORE - so the next move is unambiguous instead of buried in a pivot table.'
  },
  {
    title: 'Answers ad-hoc questions on demand',
    text: 'The Ask AI tab takes natural-language queries ("what is my best offer for Benzinga?", "where should I cut spending?") and returns an analyst-style answer grounded in the live data - no formulas, no pivot, no waiting.'
  }
]

const IMPACT = [
  {
    label: 'Scale revenue',
    body:
      'The top 10 placement-offer combos (MyPoints, Business-Insider Below-Article, Facebook Marketplace, Benzinga Marketplace) run at $30 - $1,260 RPM but only carry a fraction of total impression volume. Shifting 10 - 15% of traffic from low-RPM placements into these proven winners can 2 - 3x revenue output from the same impression pool.'
  },
  {
    label: 'Reduce cost',
    body:
      'Hundreds of millions of impressions are still flowing through combos returning $0.01 - $0.17 RPM or flat-out zero conversions - CNN Mobile-Web-Partner-Bin alone burned 148M+ impressions at near-zero return. Identifying and pausing these recovers ad-serving cost and frees budget for what actually converts.'
  },
  {
    label: 'Net effect',
    body:
      "You are not spending more - you are spending smarter. Every dollar and every impression works harder, and the time from \"data sitting in a spreadsheet\" to \"actionable lineup decision\" compresses from hours to seconds."
  }
]

export default function CpaLineupProject() {
  return (
    <ProjectShell slug="cpa-lineup">
      <article className="cpa">
        <header className="project-intro project-intro--center">
          <span className="project-intro__eyebrow">{meta.type}</span>
          <h1>{meta.title}</h1>
          <p className="project-intro__lead">{meta.subtitle}</p>

          <ul className="cpa-scope">
            {SCOPE.map((s) => (
              <li key={s.label}>
                <span className="cpa-scope-val">{s.value}</span>
                <span className="cpa-scope-lbl">{s.label}</span>
              </li>
            ))}
          </ul>
        </header>

        <section className="cpa-problem">
          <h2>The problem</h2>
          <p>
            With 433 placement-offer combinations across 26 publishers and 6 offers, deciding what to
            prioritize, what to cut, and where to shift traffic means digging through spreadsheets,
            comparing RPMs, eyeballing conversion rates, and trusting gut feel. That is slow,
            error-prone, and leaves money on the table - running traffic through low-RPM combos while
            high-performing ones stay underserved.
          </p>
        </section>

        <section className="cpa-how">
          <h2>How the AI agent solves it</h2>
          <ol className="cpa-steps">
            {STEPS.map((step, i) => (
              <li key={step.title} className="cpa-step">
                <span className="cpa-step-n">{i + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="cpa-impact">
          <h2>Impact</h2>
          <div className="cpa-impact-grid">
            {IMPACT.map((row) => (
              <article key={row.label} className="cpa-impact-card">
                <div className="cpa-impact-label">{row.label}</div>
                <p>{row.body}</p>
              </article>
            ))}
          </div>
        </section>

        <EmbedSlot {...projectEmbeds.cpaLineup} />

        <aside className="cpa-note">
          <p>
            <strong>Note:</strong> The data shown in the live dashboard is sample/mock data
            structured to mirror real publisher-offer performance. The Ask AI tab calls a Claude API
            endpoint that requires authentication - in this static portfolio environment the request
            will fail; the rest of the dashboard (filters, KPIs, charts, ranked lineup) runs
            entirely client-side.
          </p>
        </aside>
      </article>
    </ProjectShell>
  )
}
