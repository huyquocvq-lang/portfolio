import ProjectShell from '../components/project/ProjectShell'
import { getProjectCard } from '../data/projects'
import '../styles/projects/ai-rewriter.css'

const meta = getProjectCard('ai-rewriter')

const AUDIENCES = [
  'Executive leadership',
  'Media Buyers',
  'Account Strategy',
  'Yield',
  'Internal teammates',
  'Client-facing'
]

const OUTPUTS = [
  'Executive summary',
  'Slack update',
  'Media Buyer action note',
  'Manager update',
  'Client explanation',
  'Retro summary',
  'Escalation note'
]

export default function AiRewriterProject() {
  return (
    <ProjectShell slug="ai-rewriter">
      <article className="air">
        <header className="air-hero">
          <div className="air-hero-text">
            <span className="air-num">06</span>
            <h1>{meta.title}</h1>
            <p>{meta.subtitle}</p>
          </div>
          <div className="air-mock">
            <div className="air-mock-in">
              <span className="air-mock-label">Draft in</span>
              <p>Rough notes, bullets, half sentences…</p>
            </div>
            <span className="air-arrow">→</span>
            <div className="air-mock-out">
              <span className="air-mock-label">Polished out</span>
              <p>Audience-ready update with right tone & detail.</p>
            </div>
          </div>
        </header>

        <section className="air-problem">
          <h2>Same story, different audience</h2>
          <p>
            Media Buyers need tactical traffic detail; managers need impact, risk, and next steps.
            Rewriting manually is slow and inconsistent.
          </p>
        </section>

        <section className="air-audiences">
          <h2>Select audience</h2>
          <div className="air-pills">
            {AUDIENCES.map((a) => (
              <span key={a} className="air-pill">{a}</span>
            ))}
          </div>
        </section>

        <section className="air-outputs">
          <h2>Output formats</h2>
          <ul className="air-output-list">
            {OUTPUTS.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </section>
      </article>
    </ProjectShell>
  )
}
