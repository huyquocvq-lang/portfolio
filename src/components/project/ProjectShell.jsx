import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../Nav'
import Footer from '../Footer'
import { getAllProjects, getProjectCard } from '../../data/projects'

export default function ProjectShell({ slug, children }) {
  const project = getProjectCard(slug)
  const all = getAllProjects()
  const index = all.findIndex((p) => p.slug === slug)
  const prev = index > 0 ? all[index - 1] : null
  const next = index < all.length - 1 ? all[index + 1] : null
  const bannerSrc = project?.banner ?? project?.image
  const [bannerOk, setBannerOk] = useState(!bannerSrc)

  useEffect(() => {
    window.scrollTo(0, 0)
    setBannerOk(!bannerSrc)
  }, [slug, bannerSrc])

  useEffect(() => {
    if (!bannerSrc) return undefined
    const img = new Image()
    img.onload = () => setBannerOk(true)
    img.onerror = () => setBannerOk(false)
    img.src = bannerSrc
  }, [bannerSrc])

  const showImageBanner = bannerSrc && bannerOk

  return (
    <>
      <Nav />
      <div className="project-shell">
        <div
          className={`project-shell-banner${showImageBanner ? '' : ' project-shell-banner--fallback'}`}
          style={showImageBanner ? { backgroundImage: `url(${bannerSrc})` } : undefined}
          role="img"
          aria-label=""
        />

        <div className="project-shell-breadcrumbs-bar">
          <div className="project-shell-breadcrumbs-wrap">
            <nav className="project-shell-breadcrumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span className="project-shell-breadcrumbs__sep" aria-hidden="true">
                /
              </span>
              <Link to="/#work">Projects</Link>
              <span className="project-shell-breadcrumbs__sep" aria-hidden="true">
                /
              </span>
              <span className="project-shell-breadcrumbs__current" aria-current="page">
                {project?.title ?? 'Project'}
              </span>
            </nav>
          </div>
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
              <Link
                to={next.link}
                className="project-shell-pager-link project-shell-pager-link--next"
              >
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
