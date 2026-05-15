import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../Nav'
import Footer from '../Footer'
import { getAllProjects } from '../../data/projects'

export default function ProjectShell({ slug, children }) {
  const all = getAllProjects()
  const index = all.findIndex((p) => p.slug === slug)
  const prev = index > 0 ? all[index - 1] : null
  const next = index < all.length - 1 ? all[index + 1] : null

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  return (
    <>
      <Nav />
      <div className="project-shell">
        <div className="project-shell-top">
          <Link to="/#work" className="project-shell-back">
            ← All Projects
          </Link>
        </div>
        {children}
        {(prev || next) && (
          <nav className="project-shell-pager" aria-label="Project navigation">
            {prev ? (
              <Link to={prev.link} className="project-shell-pager-link">
                <span className="dir">Previous</span>
                <span className="name">{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link to={next.link} className="project-shell-pager-link project-shell-pager-link--next">
                <span className="dir">Next</span>
                <span className="name">{next.title}</span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        )}
      </div>
      <Footer />
    </>
  )
}
