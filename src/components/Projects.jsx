import { featuredProject, otherProjects } from '../data/projects'
import FeaturedProject from './FeaturedProject'
import OtherProject from './OtherProject'

export default function Projects() {
  // Tổng số project (1 featured + danh sách còn lại) - dùng cho count badge
  const totalCount = 1 + otherProjects.length
  const countLabel = String(totalCount).padStart(2, '0') + ' Projects'

  return (
    <section className="projects" id="work">
      <div className="projects-inner">

        <div className="projects-header">
          <div className="titles">
            <div className="eyebrow">Selected Work</div>
            <h2>Projects</h2>
          </div>
          <div className="count">{countLabel}</div>
        </div>

        {/* FEATURED */}
        <FeaturedProject project={featuredProject} />

        {/* OTHERS GRID */}
        <div className="other-projects-label">More Work</div>
        <div className="other-projects">
          {otherProjects.map((p, i) => (
            <OtherProject key={i} project={p} />
          ))}
        </div>

      </div>
    </section>
  )
}
