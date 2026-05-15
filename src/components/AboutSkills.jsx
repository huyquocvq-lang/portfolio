import { about } from '../data/about'
import { skills } from '../data/skills'
import Skill from './Skill'

export default function AboutSkills() {
  return (
    <section className="about-skills" id="about">
      <div className="about-skills-inner">

        {/* LEFT: About */}
        <div className="about-col">
          <div className="about-eyebrow">{about.eyebrow}</div>
          <h2>{about.heading}</h2>
          {about.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* RIGHT: Skills grid */}
        <div className="skills-grid">
          {skills.map((s, i) => (
            <Skill key={i} icon={s.icon} title={s.title} desc={s.desc} />
          ))}
        </div>

      </div>
    </section>
  )
}
