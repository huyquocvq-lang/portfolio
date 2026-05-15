import { impactHighlights } from '../data/stats'

export default function Impact() {
  return (
    <section className="impact" id="impact">
      <div className="impact-inner">
        <div className="eyebrow">Impact Highlights</div>
        <h2>Numbers that show the work.</h2>

        <div className="impact-grid">
          {impactHighlights.map((item, i) => (
            <div className="impact-item" key={i}>
              <div className="big">{item.big}</div>
              <div className="desc">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
