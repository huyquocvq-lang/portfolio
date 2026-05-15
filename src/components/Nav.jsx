import { useEffect, useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { profile } from '../data/profile'

export default function Nav() {
  const { contact } = profile
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') close()
    }
    document.body.style.overflow = open ? 'hidden' : ''
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <nav className={`nav${open ? ' nav--open' : ''}`} id="header">
      <div className="nav-inner">
        <a href="/" className="nav-logo author-name" onClick={close}>
          {profile.name}
        </a>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="nav-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>

        <ul className="nav-links" id="nav-menu">
          <li><a href="/#impact" onClick={close}>Impact</a></li>
          <li><a href="/#about" onClick={close}>About</a></li>
          <li><a href="/#work" onClick={close}>Projects</a></li>
          {contact.linkedin && (
            <li><a href={contact.linkedin} target="_blank" rel="noreferrer" onClick={close}>LinkedIn</a></li>
          )}
          {contact.resume && (
            <li><a href={contact.resume} target="_blank" rel="noreferrer" onClick={close}>Resume</a></li>
          )}
          {contact.github && (
            <li><a href={contact.github} target="_blank" rel="noreferrer" onClick={close}>GitHub</a></li>
          )}
        </ul>
      </div>

      {open && <button type="button" className="nav-backdrop" aria-label="Close menu" onClick={close} />}
    </nav>
  )
}
