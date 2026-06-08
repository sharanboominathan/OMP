import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from './sections/Header'
import Hero from './sections/Hero'
import Story from './sections/Story'
import MarqueeBand from './sections/MarqueeBand'
import CouplesMarquee from './sections/CouplesMarquee'
import StatsAndPress from './sections/StatsAndPress'
import Services from './sections/Services'
import Portfolio from './sections/Portfolio'
import Testimonials from './sections/Testimonials'
import InstagramCTA from './sections/InstagramCTA'
import FAQ from './sections/FAQ'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import CustomCursor from './sections/CustomCursor'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [navOpen, setNavOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const lenisRef = useRef<Lenis | null>(null)

  const loadingPanelTopRef = useRef<HTMLDivElement>(null)
  const loadingPanelBotRef = useRef<HTMLDivElement>(null)
  const loadingLogoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1 })
    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const updateLenis = (time: number) => { lenis.raf(time * 1000) }
    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)

    const timer = setTimeout(() => {
      gsap.timeline({ onComplete: () => setLoading(false) })
        .to(loadingLogoRef.current, { opacity: 0, scale: 0.92, duration: 0.45, ease: 'power3.in' })
        .to(
          [loadingPanelTopRef.current, loadingPanelBotRef.current],
          { scaleY: 0, duration: 0.95, ease: 'expo.inOut', stagger: 0.05 },
          '-=0.1'
        )
    }, 1600)

    return () => {
      lenis.destroy()
      clearTimeout(timer)
      gsap.ticker.remove(updateLenis)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = navOpen ? 'hidden' : ''
  }, [navOpen])

  return (
    <div className="relative">
      {loading && (
        <>
          <div ref={loadingPanelTopRef} className="loading-panel-top" />
          <div ref={loadingLogoRef} className="loading-logo-center">
            <div className="loading-vert-line" />
            <div className="loading-brand-clip">
              <span className="loading-brand-inner font-display text-heading-s text-charcoal">
                Once More
              </span>
            </div>
          </div>
          <div ref={loadingPanelBotRef} className="loading-panel-bottom" />
        </>
      )}

      <CustomCursor />
      <Header navOpen={navOpen} setNavOpen={setNavOpen} />

      <main>
        <Hero />
        <MarqueeBand />
        <Story />
        <CouplesMarquee />
        <Services />
        <Portfolio />
        <StatsAndPress />
        <Testimonials />
        <InstagramCTA />
        <FAQ />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App
