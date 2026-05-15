import ProjectShell from '../components/project/ProjectShell'
import { getProjectCard } from '../data/projects'
import '../styles/projects/glean-planner.css'

const meta = getProjectCard('glean-planner')

const SOURCES = ['Email', 'Slack', 'Jira', 'Airtable', 'Confluence', 'Work notes']

const STEPS = [
  { title: 'Search', text: 'Agent scans connected platforms for open threads and context.' },
  { title: 'Classify', text: 'Urgent, blocked, follow-up, revenue/budget risk, or defer.' },
  { title: 'Summarize', text: 'Daily Slack digest with priority, why it matters, next steps, owners.' }
]

export default function GleanPlannerProject() {
  return (
    <ProjectShell slug="glean-planner">
      <article className="glean">
        <header className="glean-hero">
          <span className="glean-badge">AI Workflow</span>
          <h1>{meta.title}</h1>
          <p>{meta.subtitle}</p>
        </header>

        <section className="glean-why">
          <p>
            Media Ops priorities shift fast — offers pause, KPIs change, data delays, traffic spikes.
            This agent reduces context switching by surfacing what matters in one Slack summary.
          </p>
        </section>

        <section className="glean-sources">
          <h2>Connected sources</h2>
          <ul>
            {SOURCES.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>

        <section className="glean-flow">
          <h2>How it runs</h2>
          <div className="glean-steps">
            {STEPS.map((step, i) => (
              <div key={step.title} className="glean-step">
                <span className="glean-step-n">{i + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="glean-example">
          <h2>Example trigger</h2>
          <p>
            CPC offer pacing hot, missing publisher cost, or client KPI change → surfaced as
            high priority. Documentation tweaks sink below revenue-impacting work.
          </p>
        </aside>
      </article>
    </ProjectShell>
  )
}
