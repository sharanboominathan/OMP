import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const couples = [
  {
    src:      './images/gallery-1.jpg',
    names:    'Isabella & James',
    location: 'Villa Antinori, Tuscany',
    year:     '2024',
  },
  {
    src:      './images/gallery-2.jpg',
    names:    'Sophie & Luca',
    location: 'Grand Hotel Tremezzo, Lake Como',
    year:     '2024',
  },
  {
    src:      './images/gallery-3.jpg',
    names:    'Amelia & Noah',
    location: 'Château des Alpilles, Provence',
    year:     '2023',
  },
  {
    src:      './images/gallery-4.jpg',
    names:    'Charlotte & Ethan',
    location: 'The Plaza, New York City',
    year:     '2024',
  },
  {
    src:      './images/gallery-5.jpg',
    names:    'Olivia & William',
    location: 'Oia, Santorini',
    year:     '2023',
  },
  {
    src:      './images/gallery-6.jpg',
    names:    'Evelyn & Thomas',
    location: 'Palazzo Papadopoli, Venice',
    year:     '2024',
  },
]

const MARQUEE_NAMES = [
  'Isabella & James', 'Sophie & Luca', 'Amelia & Noah',
  'Charlotte & Ethan', 'Olivia & William', 'Evelyn & Thomas',
  'Clara & James', 'Natalie & Sebastian', 'Emma & Oliver',
  'Aria & Finn', 'Grace & Henry', 'Luna & Mateo',
]

export default function CouplesMarquee() {
  const sectionRef   = useRef<HTMLElement>(null)
  const labelRef     = useRef<HTMLSpanElement>(null)
  const headingRef   = useRef<HTMLSpanElement>(null)
  const trackRef     = useRef<HTMLDivElement>(null)
  const cardRefs     = useRef<(HTMLDivElement | null)[]>([])
  const imgRefs      = useRef<(HTMLDivElement | null)[]>([])

  // Marquee animation
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const raf = requestAnimationFrame(() => {
      const totalWidth = track.scrollWidth / 2
      const tween = gsap.fromTo(track, { x: 0 }, { x: -totalWidth, duration: 36, ease: 'none', repeat: -1 })
      return () => tween.kill()
    })
    return () => {
      cancelAnimationFrame(raf)
      gsap.killTweensOf(track)
    }
  }, [])

  // Scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (labelRef.current) {
        gsap.fromTo(labelRef.current, { opacity: 0, y: 18 }, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: labelRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        })
      }
      if (headingRef.current) {
        gsap.to(headingRef.current, {
          y: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 88%', toggleActions: 'play none none none' },
        })
      }

      cardRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(el, { opacity: 0, y: 50 }, {
          opacity: 1, y: 0, duration: 1.0, delay: (i % 3) * 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        })
      })

      imgRefs.current.forEach((el) => {
        if (!el) return
        gsap.fromTo(el, { yPercent: -5 }, {
          yPercent: 5, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const text = MARQUEE_NAMES.map(n => `${n}  —  `).join('   ')

  return (
    <section ref={sectionRef} id="couples" className="py-[120px] overflow-hidden" style={{ background: 'var(--champagne)' }}>

      {/* Section header */}
      <div className="max-w-[1400px] mx-auto px-8 mb-16 text-center">
        <span ref={labelRef} className="text-label opacity-0" style={{ color: 'var(--gold)' }}>
          True Love Stories
        </span>
        <h2 className="text-display-l text-charcoal mt-6">
          <span className="line-reveal-wrap">
            <span ref={headingRef} className="line-reveal-inner" style={{ transform: 'translateY(110%)' }}>
              Couples We&apos;ve Celebrated
            </span>
          </span>
        </h2>
      </div>

      {/* Scrolling couple name marquee */}
      <div
        style={{
          overflow: 'hidden',
          padding: '18px 0',
          borderTop: '1px solid rgba(28,22,16,0.08)',
          borderBottom: '1px solid rgba(28,22,16,0.08)',
          marginBottom: '72px',
          background: 'rgba(28,22,16,0.03)',
        }}
      >
        <div ref={trackRef} style={{ display: 'flex', whiteSpace: 'nowrap', willChange: 'transform' }}>
          {[text, text].map((t, i) => (
            <span
              key={i}
              style={{
                flexShrink: 0,
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(0.85rem, 1.4vw, 1.0rem)',
                fontStyle: 'italic',
                fontWeight: 400,
                letterSpacing: '0.06em',
                color: 'rgba(28,22,16,0.42)',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Couple cards grid */}
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {couples.map((couple, i) => (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el }}
              className="group cursor-pointer opacity-0"
              style={{ position: 'relative' }}
            >
              {/* Photo */}
              <div
                className="overflow-hidden"
                style={{ borderRadius: '2px', position: 'relative' }}
              >
                <div
                  ref={(el) => { imgRefs.current[i] = el }}
                  style={{ willChange: 'transform' }}
                >
                  <img
                    src={couple.src}
                    alt={`${couple.names} — ${couple.location}`}
                    className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    style={{ aspectRatio: '4/5', display: 'block' }}
                    loading="lazy"
                  />
                </div>

                {/* Overlay on hover */}
                <div
                  className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(to top, rgba(28,22,16,0.72) 0%, rgba(28,22,16,0.0) 55%)' }}
                >
                  <span
                    className="text-label"
                    style={{ color: 'rgba(253,250,244,0.6)', fontStyle: 'normal', fontSize: '0.6rem' }}
                  >
                    {couple.year}
                  </span>
                  <span
                    className="font-display"
                    style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: 'rgba(253,250,244,0.95)', fontWeight: 400 }}
                  >
                    {couple.names}
                  </span>
                  <span
                    className="text-label mt-1"
                    style={{ color: 'rgba(166,124,69,0.85)', fontStyle: 'normal', fontSize: '0.6rem' }}
                  >
                    {couple.location}
                  </span>
                </div>

                {/* Year badge */}
                <div
                  className="absolute top-4 right-4"
                  style={{
                    background: 'rgba(28,22,16,0.55)',
                    backdropFilter: 'blur(4px)',
                    padding: '4px 10px',
                    borderRadius: '1px',
                  }}
                >
                  <span className="text-label" style={{ color: 'rgba(253,250,244,0.7)', fontStyle: 'normal', fontSize: '0.58rem' }}>
                    {couple.year}
                  </span>
                </div>
              </div>

              {/* Caption below */}
              <div className="mt-4 flex flex-col gap-1">
                <span
                  className="font-display"
                  style={{ fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', fontWeight: 500, color: 'var(--charcoal)', letterSpacing: '0.01em' }}
                >
                  {couple.names}
                </span>
                <span className="text-label" style={{ color: 'var(--gold)', fontStyle: 'normal', fontSize: '0.62rem' }}>
                  {couple.location}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-16">
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="inline-flex items-center gap-3 group"
            style={{ color: 'var(--gold)', textDecoration: 'none' }}
          >
            <span className="text-label" style={{ fontStyle: 'normal', letterSpacing: '0.14em' }}>
              Begin your love story
            </span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1" style={{ color: 'var(--gold)' }}>
              &rarr;
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
