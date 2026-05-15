import { useEffect, useRef, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { profile } from '../data/profile'
import { heroStats } from '../data/stats'

export default function Hero() {
  const [ready, setReady] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const heroRef = useRef(null)

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setReady(true))
    })
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const el = heroRef.current
      if (!el) return
      const height = el.offsetHeight
      const scrolled = window.scrollY
      const progress = Math.min(1, Math.max(0, scrolled / (height * 0.55)))
      setScrollProgress(progress)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const handleScrollDown = (e) => {
    e.preventDefault()
    document.getElementById('impact')?.scrollIntoView({ behavior: 'smooth' })
  }

  const bgStyle = { backgroundImage: `url(${profile.heroImage})` }
  const mainOpacity = 1 - scrollProgress
  const mainShift = scrollProgress * 32
  const nameOpacity = scrollProgress
  const nameShift = (1 - scrollProgress) * 40

  return (
    <section
      ref={heroRef}
      className={`hero ${ready ? 'hero--ready' : 'hero--preload'}${scrollProgress > 0.02 ? ' hero--scrolling' : ''}`}
      id="top"
    >
      <div className="hero-bg" style={bgStyle} aria-hidden="true" />
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-curtain" aria-hidden="true" />

      <div className="hero-content">
        <div
          className="hero-main"
          style={{
            opacity: mainOpacity,
            transform: `translateY(-${mainShift}px)`,
            pointerEvents: scrollProgress > 0.85 ? 'none' : 'auto'
          }}
        >
          <h1 className="author-name">{profile.name}</h1>
          <div className="role">{profile.role}</div>
          <div className="tagline">{profile.tagline}</div>
          <p className="intro">{profile.intro}</p>
          <div className="hero-stats">
            {heroStats.map((stat, i) => (
              <div className="hero-stat" key={i}>
                <span className="num">{stat.num}</span>
                <span className="label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="hero-scroll-name author-name"
        style={{
          opacity: nameOpacity,
          transform: `translateY(${nameShift}px)`
        }}
        aria-hidden={nameOpacity < 0.1}
      >
        {profile.name}
      </div>

      <a
        href="#impact"
        className="hero-scroll-down"
        onClick={handleScrollDown}
        aria-label="Scroll to content"
        style={
          scrollProgress > 0
            ? { opacity: Math.max(0.35, 1 - scrollProgress * 0.5) }
            : undefined
        }
      >
        <FaChevronDown />
      </a>
    </section>
  )
}
