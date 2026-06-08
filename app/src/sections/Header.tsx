import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { Phone } from 'lucide-react'

interface HeaderProps {
  navOpen: boolean
  setNavOpen: (open: boolean) => void
}

const NAV_LINKS = [
  { label: 'Portfolio', id: 'portfolio' },
  { label: 'Services',  id: 'services'  },
  { label: 'About',     id: 'story'     },
  { label: 'Contact',   id: 'contact'   },
]

export default function Header({ navOpen, setNavOpen }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (navOpen) {
      gsap.fromTo('.nav-overlay',   { yPercent: -100 }, { yPercent: 0, duration: 0.65, ease: 'power3.out' })
      gsap.fromTo('.nav-overlay a', { y: 44, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, stagger: 0.08, delay: 0.22, ease: 'power2.out' })
    }
  }, [navOpen])

  const scrollToSection = (id: string) => {
    setNavOpen(false)
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 320)
  }

  const linkColor      = scrolled ? 'var(--charcoal)' : 'rgba(253,250,244,0.82)'
  const linkHoverColor = scrolled ? 'var(--gold)' : 'rgba(253,250,244,1)'
  const logoColor      = scrolled ? 'var(--charcoal)' : 'rgba(253,250,244,0.95)'
  const subColor       = scrolled ? 'rgba(28,22,16,0.38)' : 'rgba(253,250,244,0.38)'
  const phoneColor     = scrolled ? 'rgba(28,22,16,0.55)' : 'rgba(253,250,244,0.55)'

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'header-frosted' : 'bg-transparent'}`}>
        <div className="flex items-center justify-between px-8 py-5 max-w-[1400px] mx-auto">

          {/* Wordmark + tagline */}
          <a href="#" className="flex flex-col items-start gap-[3px]" style={{ textDecoration: 'none' }}
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
            <span className="font-display text-heading-s"
              style={{ letterSpacing: '0.06em', color: logoColor, transition: 'color 0.4s', lineHeight: 1 }}>
              Once More
            </span>
            <span className="text-label"
              style={{ color: subColor, transition: 'color 0.4s', fontStyle: 'italic', fontSize: '0.58rem', letterSpacing: '0.16em' }}>
              Photography
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map(({ label, id }) => (
              <a key={id} href={`#${id}`}
                onClick={(e) => { e.preventDefault(); scrollToSection(id) }}
                className="text-label transition-colors duration-300"
                style={{ color: linkColor, textDecoration: 'none', fontStyle: 'normal', letterSpacing: '0.1em', transition: 'color 0.3s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = linkHoverColor)}
                onMouseLeave={(e) => (e.currentTarget.style.color = linkColor)}>
                {label}
              </a>
            ))}
          </nav>

          {/* Right: phone + Book Now */}
          <div className="hidden md:flex items-center gap-5">
            <a href="tel:+12125550147"
              className="flex items-center gap-2 transition-colors duration-300"
              style={{ color: phoneColor, textDecoration: 'none' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = scrolled ? 'var(--gold)' : 'rgba(253,250,244,0.9)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = phoneColor)}>
              <Phone size={13} strokeWidth={1.5} />
              <span className="text-label" style={{ fontStyle: 'normal', letterSpacing: '0.06em', fontSize: '0.7rem' }}>
                +1 212 555 0147
              </span>
            </a>
            <a href="#contact"
              onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}
              className="text-label px-6 py-3 transition-all duration-300"
              style={{ background: 'var(--gold)', color: 'var(--ivory)', textDecoration: 'none', fontStyle: 'normal', letterSpacing: '0.12em' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--deep-gold)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--gold)' }}>
              Book Now
            </a>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setNavOpen(!navOpen)}
            className="md:hidden relative w-6 h-5 flex flex-col justify-center items-end gap-[5px] group"
            aria-label="Toggle navigation">
            <span className="block h-[1px] transition-all duration-350"
              style={{ width: '24px', background: scrolled ? 'var(--charcoal)' : 'rgba(253,250,244,0.9)',
                transform: navOpen ? 'rotate(45deg) translateY(3px)' : 'none' }} />
            <span className="block h-[1px] transition-all duration-350"
              style={{ width: navOpen ? '24px' : '16px', background: scrolled ? 'var(--charcoal)' : 'rgba(253,250,244,0.9)',
                transform: navOpen ? 'rotate(-45deg) translateY(-3px)' : 'none' }} />
          </button>
        </div>
      </header>

      {navOpen && (
        <div className="nav-overlay md:hidden">
          <button onClick={() => setNavOpen(false)}
            className="absolute top-7 right-8 w-8 h-8 flex items-center justify-center text-charcoal"
            aria-label="Close navigation">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <line x1="4" y1="4" x2="20" y2="20" />
              <line x1="20" y1="4" x2="4" y2="20" />
            </svg>
          </button>
          <a href="tel:+12125550147" className="flex items-center gap-2 mb-4"
            style={{ color: 'rgba(28,22,16,0.45)', textDecoration: 'none' }}>
            <Phone size={13} strokeWidth={1.5} />
            <span className="text-label" style={{ fontStyle: 'normal', fontSize: '0.72rem' }}>+1 212 555 0147</span>
          </a>
          {[
            { label: 'Home',      id: 'hero'      },
            { label: 'Portfolio', id: 'portfolio' },
            { label: 'Services',  id: 'services'  },
            { label: 'About',     id: 'story'     },
            { label: 'Contact',   id: 'contact'   },
          ].map(({ label, id }) => (
            <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollToSection(id) }}>{label}</a>
          ))}
          <a href="#contact"
            onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}
            className="mt-4 text-label px-8 py-4"
            style={{ background: 'var(--gold)', color: 'var(--ivory)', textDecoration: 'none', fontStyle: 'normal', letterSpacing: '0.12em' }}>
            Book Now
          </a>
        </div>
      )}
    </>
  )
}
