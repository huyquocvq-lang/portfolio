import { Fragment, useEffect, useRef, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { profile } from '../data/profile'
import { heroStats } from '../data/stats'

const HERO_BASE = '/hero-banners'
const HERO_FALLBACK = 'hero_desktop_fhd'

// Order matters: <picture> picks the first <source> whose media matches AND
// whose format is supported. Most specific first; ultrawide before generic
// landscape; width caps (4K, QHD) before aspect-ratio buckets.
//
// NOTE: WebP variants are commented out — only `.png` files exist in
// public/hero-banners/ today. To enable WebP delivery, generate `.webp`
// next to each `.png` (e.g. `cwebp -q 85 file.png -o file.webp`) and
// uncomment the WebP <source> lines below.
const HERO_SOURCES = [
  ['(max-aspect-ratio: 3/4)', 'hero_mobile_portrait'],
  ['(min-aspect-ratio: 21/10)', 'hero_ultrawide'],
  ['(min-width: 3000px)', 'hero_desktop_4k'],
  ['(min-width: 2200px)', 'hero_desktop_qhd'],
  ['(min-aspect-ratio: 14/10) and (max-aspect-ratio: 17/10)', 'hero_macbook_13'],
  ['(max-aspect-ratio: 14/10)', 'hero_tablet']
]

const WEBP_ENABLED = false

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
      <picture className="hero-bg" aria-hidden="true">
        {HERO_SOURCES.map(([media, slug]) => (
          <Fragment key={slug}>
            {WEBP_ENABLED && (
              <source media={media} srcSet={`${HERO_BASE}/${slug}.webp`} type="image/webp" />
            )}
            <source media={media} srcSet={`${HERO_BASE}/${slug}.png`} type="image/png" />
          </Fragment>
        ))}
        {WEBP_ENABLED && (
          <source srcSet={`${HERO_BASE}/${HERO_FALLBACK}.webp`} type="image/webp" />
        )}
        <img
          src={`${HERO_BASE}/${HERO_FALLBACK}.png`}
          alt=""
          className="hero-bg-img"
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />
      </picture>

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
