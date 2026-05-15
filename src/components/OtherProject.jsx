import { Link } from 'react-router-dom'

export default function OtherProject({ project }) {
  const imgStyle = { backgroundImage: `url(${project.image})` }

  return (
    <article className="other-project">
      <Link to={project.link} className="thumb">
        <span className="thumb-inner" style={imgStyle} aria-hidden="true" />
      </Link>
      <div className="ptype">{project.type}</div>
      <h4>
        <Link to={project.link}>{project.title}</Link>
      </h4>
      <div className="sub">{project.subtitle}</div>
      <p>{project.description}</p>
      <div className="impact-line">{project.impact}</div>
      <Link to={project.link} className="link-arrow">View Project →</Link>
    </article>
  )
}
