import { Link } from 'react-router-dom'

export default function FeaturedProject({ project }) {
  const imgStyle = { backgroundImage: `url(${project.image})` }

  return (
    <article className="featured-project">
      <div className="featured-tag">01 / Featured</div>
      <Link to={project.link} className="featured-img">
        <div className="featured-img-inner" style={imgStyle} aria-hidden="true" />
      </Link>
      <div className="featured-content">
        <div className="ftype">{project.type}</div>
        <h3>
          <Link to={project.link}>{project.title}</Link>
        </h3>
        <div className="fsub">{project.subtitle}</div>
        <p>{project.description}</p>
        <div className="featured-meta">
          <div><strong>Tools</strong> {project.tools}</div>
          <div><strong>Impact</strong> {project.impact}</div>
        </div>
        <Link to={project.link} className="btn-outline">View Project</Link>
      </div>
    </article>
  )
}
