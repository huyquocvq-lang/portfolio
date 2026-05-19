import ProjectShell from '../components/project/ProjectShell'
import EmbedSlot from '../components/project/EmbedSlot'
import { getProjectCard } from '../data/projects'
import { projectEmbeds } from '../data/projectEmbeds'
import '../styles/projects/pf-master.css'

const meta = getProjectCard('pf-master')

const FEATURES = [
  {
    title: 'Offer overview',
    text: 'Track active offers, APY/promo changes, and before/after impact on revenue, conversions, and GPM.'
  },
  {
    title: 'Publisher lineup view',
    text: 'Per-publisher offer lineup with RPM, revenue, and GPM to decide keep, promote, pause, or replace.'
  },
  {
    title: 'Manual cost ingestion',
    text: 'Input platform costs missing from Tableau (e.g. DV360) for accurate pacing and GPM.'
  },
  {
    title: 'Placement notes',
    text: 'QL on/off, SS, backfill, row position, paused, testing, ramping - ops context beside metrics.'
  },
  {
    title: 'Discrepancy checks',
    text: 'Flag 1P vs 3P click mismatches - e.g. AOL bot-like spike on CPC offers before budget waste.'
  }
]

export default function PfMasterProject() {
  return (
    <ProjectShell slug="pf-master">
      <article className="pfm">
        <header className="project-intro">
          <p className="project-intro__eyebrow">{meta.type}</p>
          <h1>{meta.title}</h1>
          <p className="project-intro__lead">
            One Excel hub: pull Tableau once, update 30+ publisher views automatically.
          </p>
          <div className="pfm-stat-row">
            <span><strong>30+</strong> publishers</span>
            <span><strong>~30%</strong> efficiency gain</span>
          </div>
        </header>

        <section className="pfm-context">
          <p>
            Before PF Master, the team pulled Tableau and maintained separate publisher files - manual,
            slow, and hard to scale. Stakeholders needed one place for performance, lineups, cost, and
            operational notes.
          </p>
        </section>

        <EmbedSlot {...projectEmbeds.pfMaster} />

        <div className="pfm-bento">
          {FEATURES.map((f, i) => (
            <article key={f.title} className={`pfm-card pfm-card--${i + 1}`}>
              <h2>{f.title}</h2>
              <p>{f.text}</p>
            </article>
          ))}
        </div>

        <section className="pfm-daily">
          <h2>Daily reference</h2>
          <p>
            Became the team&apos;s go-to for ramp/pause/reallocate decisions - without jumping across
            Tableau, spreadsheets, and platform cost exports.
          </p>
        </section>
      </article>
    </ProjectShell>
  )
}
