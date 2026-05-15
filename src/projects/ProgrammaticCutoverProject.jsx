import ProjectShell from '../components/project/ProjectShell'
import { getProjectCard } from '../data/projects'
import '../styles/projects/programmatic.css'

const meta = getProjectCard('programmatic-cutover')

const LAYERS = [
  {
    num: '01',
    title: 'Placement breakdown by publisher',
    text: 'Identifies how much allocation each offer runs across placements within each publisher — estimating planned revenue and cost at placement level.'
  },
  {
    num: '02',
    title: 'Offer allocation at publisher level',
    text: 'Summarizes expected offer volume per publisher from the Yield Plan and recent performance — revenue, cost, conversions, and pacing.'
  },
  {
    num: '03',
    title: 'Placement allocation within publisher + offer',
    text: 'Breaks publisher-level allocation into individual placements, scored against peers in the same publisher + offer group.'
  }
]

const SCORES = [
  { name: 'Revenue Score', desc: 'Normalized 0–1 vs. peer placements in the same group.' },
  { name: 'GPM Score', desc: 'Profitability vs. group range and monthly target GPM.' },
  { name: 'eCPA Score', desc: 'Efficiency vs. client KPI; zero-conversion placements penalized.' }
]

export default function ProgrammaticCutoverProject() {
  return (
    <ProjectShell slug="programmatic-cutover">
      <article className="pgm">
        <header className="pgm-header">
          <span className="pgm-num">02 / Programmatic Media</span>
          <h1>{meta.title}</h1>
          <p className="pgm-lead">{meta.subtitle}</p>
          <div className="pgm-tags">
            <span>NAF</span>
            <span>DV360</span>
            <span>Yahoo DSP</span>
            <span>Dianomi</span>
            <span>Xandr</span>
          </div>
          <p className="pgm-budget">Planning budget: $500K–$600K / month</p>
        </header>

        <section className="pgm-problem">
          <h2>Why this existed</h2>
          <p>
            Programmatic cost planning was highly manual. Performance varied by publisher, offer, and
            placement — some drove revenue but weak GPM, others had low eCPA but limited scale. The team
            needed a structured way to balance revenue growth, client KPI, and profitability at month start.
          </p>
        </section>

        <section className="pgm-layers">
          <h2 className="pgm-section-title">Three-layer model</h2>
          <div className="pgm-layer-stack">
            {LAYERS.map((layer) => (
              <div key={layer.num} className="pgm-layer">
                <span className="pgm-layer-num">{layer.num}</span>
                <div>
                  <h3>{layer.title}</h3>
                  <p>{layer.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="pgm-formula">
          <h2>Placement weight</h2>
          <code>
            Weight = (Revenue Wt × Revenue Score) + (Performance Wt × eCPA Score) + (GPM Wt × GPM
            Score)
          </code>
          <p>Weights adjust monthly for scale, efficiency, or margin protection priorities.</p>
        </section>

        <section className="pgm-scores">
          <h2 className="pgm-section-title">Scoring inputs</h2>
          <div className="pgm-score-grid">
            {SCORES.map((s) => (
              <div key={s.name} className="pgm-score-card">
                <h3>{s.name}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="pgm-outputs">
          <h2>Sheet output</h2>
          <ul>
            <li>Planned daily revenue by placement</li>
            <li>Monthly revenue & cost</li>
            <li>Projected conversions & estimated GPM</li>
            <li>Risk status: okay · watch · risk</li>
          </ul>
        </section>

        <footer className="pgm-footer">
          <div>
            <span className="val">~10%</span>
            <span className="lbl">GPM improvement</span>
          </div>
          <div>
            <span className="val">≈ $50K</span>
            <span className="lbl">Monthly impact</span>
          </div>
        </footer>
      </article>
    </ProjectShell>
  )
}
