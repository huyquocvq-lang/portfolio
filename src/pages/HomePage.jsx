import { useEffect } from 'react'
import Hero from '../components/Hero'
import Nav from '../components/Nav'
import Impact from '../components/Impact'
import AboutSkills from '../components/AboutSkills'
import Projects from '../components/Projects'
import Footer from '../components/Footer'

export default function HomePage() {
  useEffect(() => {
    if (!window.location.hash) return
    const id = window.location.hash.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth' }))
    }
  }, [])

  return (
    <>
      <Hero />
      <Nav />
      <Impact />
      <AboutSkills />
      <Projects />
      <Footer />
    </>
  )
}
