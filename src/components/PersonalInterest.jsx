import { personal } from '../data/personal'

export default function PersonalInterest() {
  return (
    <section className="personal" id="personal">
      <div className="personal-inner">
        <div className="personal-head">
          <div className="personal-eyebrow">{personal.eyebrow}</div>
          <h2>{personal.heading}</h2>
          <div className="personal-copy">
            {personal.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        <div className="personal-masonry">
          {personal.images.map((img, i) => (
            <figure className="personal-tile" key={i}>
              <img src={img.src} alt={img.alt} loading="lazy" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
