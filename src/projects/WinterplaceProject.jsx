import ProjectShell from '../components/project/ProjectShell'
import EmbedSlot from '../components/project/EmbedSlot'
import { featuredProject as meta } from '../data/projects'
import { projectEmbeds } from '../data/projectEmbeds'
import '../styles/projects/winterplace.css'

export default function WinterplaceProject() {
  return (
    <ProjectShell slug="winterplace">
      <article className="wp">
        <header className="project-intro">
          <span className="project-intro__eyebrow">{meta.type}</span>
          <h1 className="wp-title">{meta.headline}</h1>
          <p className="project-intro__lead">{meta.subtitle}</p>
        </header>

        <div className="wp-insight">
          <p className="wp-insight-label">Key insight</p>
          <p className="wp-insight-text">
            Social media was outperforming all other channels despite receiving the{' '}
            <strong>lowest budget allocation</strong>.
          </p>
        </div>

        <EmbedSlot {...projectEmbeds.winterplace} />

        <div className="wp-body">
          <div className="wp-split">
            <section className="wp-block">
              <h2>Business problem</h2>
              <p>
                Winterplace was investing across multiple marketing channels, but the budget was not
                fully aligned with actual performance. The challenge was to understand which channels
                drove the highest return and how to reallocate spend to maximize revenue.
              </p>
            </section>
            <section className="wp-block">
              <h2>Approach</h2>
              <p>
                I analyzed channel performance, compared ROI across investments, and built revenue models
                with sensitivity analysis to test budget allocation scenarios and estimate revenue impact
                from shifting spend toward higher-performing channels.
              </p>
            </section>
          </div>

          <aside className="wp-rec">
            <h2>Recommendation</h2>
            <p className="wp-rec-main">$200K budget shift to LinkedIn</p>
            <p>Diversify channel spend, maximize ROI, and support stronger revenue growth.</p>
          </aside>

          <section className="wp-impact">
            <div className="wp-stat">
              <span className="wp-stat-val">$1.6M</span>
              <span className="wp-stat-lbl">Projected incremental revenue</span>
            </div>
            <div className="wp-stat">
              <span className="wp-stat-val">$200K</span>
              <span className="wp-stat-lbl">Reallocated to LinkedIn</span>
            </div>
          </section>

          <p className="wp-tools">
            <strong>Tools</strong> {meta.tools}
          </p>
        </div>
      </article>
    </ProjectShell>
  )
}
