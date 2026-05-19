import { useEffect, useState } from 'react'
import ProjectShell from '../components/project/ProjectShell'
import EmbedSlot from '../components/project/EmbedSlot'
import { getProjectCard } from '../data/projects'
import { projectEmbeds } from '../data/projectEmbeds'
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

const SHOTS = [
  {
    src: '/images/agents/ai-rewriter-input.png',
    alt: 'AI rewriter agent - loading a media ops draft and choosing the Account Manager audience',
    caption: 'Load a sample draft, choose audience, run the agent.'
  },
  {
    src: '/images/agents/ai-rewriter-output.png',
    alt: 'AI rewriter agent - final polished output rewritten for an Account Manager',
    caption: 'Final polished output, tailored to the chosen audience.'
  }
]

export default function AiRewriterProject() {
  const [zoomed, setZoomed] = useState(null)

  useEffect(() => {
    if (!zoomed) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setZoomed(null)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [zoomed])

  return (
    <ProjectShell slug="ai-rewriter">
      <article className="air">
        <header className="project-intro project-intro--air">
          <div className="air-hero-text">
            <span className="project-intro__eyebrow">{meta.type}</span>
            <h1>{meta.title}</h1>
            <p className="project-intro__lead">{meta.subtitle}</p>
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

        <section className="air-demo">
          <h2>How the demo agent works</h2>
          <p>
            The interactive demo lets you experience the agent end-to-end. You can load two
            pre-built sample drafts (a media ops weekly update and a performance review), pick your
            audience (<strong>Executive</strong> or <strong>Account Manager</strong>), and hit
            <strong> “Run content agent.”</strong> The workflow animates through five steps -
            trigger, branch detection, audience-tailored thinking, refinement, and output. The
            final polished text types out live with markdown-style bold headers, and you can click
            <strong> “Switch to Account Manager version”</strong> to instantly see the same draft
            rewritten in a completely different tone without restarting. The before/after metrics
            (word count, structure quality, audience tag) show the transformation.
          </p>
          <p>
            The two audience outputs are genuinely different: the Executive version uses strategic
            framing with <em>“Recommendation”</em> sections, while the Account Manager version is
            conversational with <em>“Hey team”</em> openers, inline action items, and{' '}
            <em>“let me know”</em> closers.
          </p>

          <div className="air-example">
            <span className="air-example-label">Example flow</span>
            <p>
              Select <strong>“Media Ops Update”</strong> for this week, type{' '}
              <strong>“Update CNN performance,”</strong> choose audience{' '}
              <strong>“Account Manager,”</strong> then click <strong>“Run Agent.”</strong> The
              agent generates a polished message you can send to an Account Manager with the latest
              performance update for that publisher.
            </p>
          </div>

          <div className="air-shots">
            {SHOTS.map((shot, i) => (
              <figure className="air-shot" key={shot.src}>
                <button
                  type="button"
                  className="air-shot-trigger"
                  onClick={() => setZoomed(i)}
                  aria-label={`Open enlarged screenshot: ${shot.caption}`}
                >
                  <img src={shot.src} alt={shot.alt} loading="lazy" />
                  <span className="air-shot-zoom" aria-hidden="true">⤢</span>
                </button>
                <figcaption>{shot.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <EmbedSlot {...projectEmbeds.aiRewriter} />
      </article>

      {zoomed !== null && (
        <div
          className="air-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged screenshot"
          onClick={() => setZoomed(null)}
        >
          <button
            type="button"
            className="air-lightbox-close"
            onClick={() => setZoomed(null)}
            aria-label="Close enlarged view"
          >
            ×
          </button>
          <img
            src={SHOTS[zoomed].src}
            alt={SHOTS[zoomed].alt}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </ProjectShell>
  )
}
