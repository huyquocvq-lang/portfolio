import { profile } from '../data/profile'

export default function Footer() {
  const { contact, currentRole, industries, name } = profile
  const year = new Date().getFullYear()

  return (
    <footer id="contact">
      <div className="footer-cta">
        <div className="eyebrow">Let's Talk</div>
        <h2>Have a data problem worth solving?</h2>
        {contact.linkedin && (
          <a href={contact.linkedin} className="btn-outline">
            Connect on LinkedIn
          </a>
        )}
      </div>

      <div className="footer-inner">
        <div className="footer-col">
          <h3>Currently</h3>
          <p>
            {currentRole.title}<br />
            {currentRole.company}
          </p>
        </div>
        <div className="footer-col">
          <h3>Contact</h3>
          <ul>
            {contact.linkedin && <li><a href={contact.linkedin}>LinkedIn</a></li>}
            {contact.phone && (
              <li><a href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`}>{contact.phone}</a></li>
            )}
            {contact.resume && <li><a href={contact.resume}>Resume</a></li>}
            {contact.github && <li><a href={contact.github}>GitHub</a></li>}
          </ul>
        </div>
        <div className="footer-col">
          <h3>Industries</h3>
          <p>{industries}</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {name} · Portfolio {year}
      </div>
    </footer>
  )
}
