import { education } from '../data/education'

export default function Education() {
  return (
    <section className="education" id="education">
      <div className="education-inner">
        <div className="education-eyebrow">Education</div>
        <h2>Two graduate programs · two continents.</h2>

        <div className="education-list">
          {education.map((entry, i) => (
            <article className="edu-item" key={i}>
              <div className="edu-date">{entry.date}</div>
              <div className="edu-body">
                <h3>{entry.school}</h3>
                <div className="edu-degree">
                  {entry.degree}
                  {entry.focus && <span className="edu-focus"> · {entry.focus}</span>}
                </div>
                <div className="edu-meta">
                  <span>{entry.location}</span>
                  {entry.gpa && (
                    <>
                      <span className="edu-meta-sep" aria-hidden="true">·</span>
                      <span>GPA {entry.gpa}</span>
                    </>
                  )}
                </div>
                {entry.honors && entry.honors.length > 0 && (
                  <ul className="edu-honors">
                    {entry.honors.map((h, j) => (
                      <li key={j}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
