import { skillIconMap } from '../data/skillIcons'

export default function Skill({ icon, title, desc }) {
  const Icon = skillIconMap[icon]

  return (
    <div className="skill">
      <span className="icon" aria-hidden="true">
        {Icon ? <Icon /> : null}
      </span>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  )
}
