import { experience } from '../data/experience'

export default function Experience() {
  return (
    <section className="experience" id="experience">
      <div className="experience-inner">
        <div className="experience-eyebrow">Work Experience</div>
        <h2>Where I&apos;ve worked.</h2>

        <ol className="exp-timeline">
          {experience.map((entry, i) => (
            <li className="exp-item" key={i}>
              <div className="exp-period">
                <span className="exp-period-start">{entry.start}</span>
                <span className="exp-period-sep" aria-hidden="true">–</span>
                <span className="exp-period-end">{entry.end}</span>
              </div>

              <div className="exp-body">
                <h3 className="exp-role">{entry.role}</h3>
                <div className="exp-company">
                  <span>{entry.company}</span>
                  {entry.location && (
                    <>
                      <span className="exp-company-sep" aria-hidden="true">·</span>
                      <span>{entry.location}</span>
                    </>
                  )}
                </div>

                {entry.paragraphs.map((p, j) => (
                  <p key={j} className="exp-para">{p}</p>
                ))}

                {entry.meta && entry.meta.length > 0 && (
                  <dl className="exp-meta">
                    {entry.meta.map((m, j) => (
                      <div className="exp-meta-row" key={j}>
                        <dt>{m.label}</dt>
                        <dd>{m.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
