import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Instagram } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const GRID_IMAGES = [
  './images/gallery-1.jpg',
  './images/gallery-3.jpg',
  './images/gallery-5.jpg',
  './images/gallery-2.jpg',
  './images/gallery-6.jpg',
  './images/gallery-8.jpg',
]

export default function InstagramCTA() {
  const sectionRef  = useRef<HTMLElement>(null)
  const labelRef    = useRef<HTMLSpanElement>(null)
  const handleRef   = useRef<HTMLHeadingElement>(null)
  const subRef      = useRef<HTMLParagraphElement>(null)
  const btnRef      = useRef<HTMLAnchorElement>(null)
  const gridRef     = useRef<HTMLDivElement>(null)
  const imgRefs     = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (labelRef.current) {
        gsap.fromTo(labelRef.current, { opacity: 0, y: 14 }, {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: labelRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        })
      }
      if (handleRef.current) {
        gsap.fromTo(handleRef.current, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 1.0, ease: 'power3.out',
          scrollTrigger: { trigger: handleRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        })
      }
      if (subRef.current) {
        gsap.fromTo(subRef.current, { opacity: 0, y: 18 }, {
          opacity: 1, y: 0, duration: 0.8, delay: 0.15, ease: 'power2.out',
          scrollTrigger: { trigger: subRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        })
      }
      if (btnRef.current) {
        gsap.fromTo(btnRef.current, { opacity: 0, y: 14 }, {
          opacity: 1, y: 0, duration: 0.7, delay: 0.25, ease: 'power2.out',
          scrollTrigger: { trigger: btnRef.current, start: 'top 88%', toggleActions: 'play none none none' },
        })
      }
      if (gridRef.current) {
        gsap.fromTo(gridRef.current, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 1.0, delay: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 88%', toggleActions: 'play none none none' },
        })
      }

      imgRefs.current.forEach((el) => {
        if (!el) return
        gsap.fromTo(el, { yPercent: -4 }, {
          yPercent: 4, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="instagram"
      className="py-[120px] overflow-hidden"
      style={{ background: 'var(--charcoal)' }}
    >
      <div className="max-w-[1400px] mx-auto px-8">

        {/* Top text block — centered */}
        <div className="flex flex-col items-center text-center mb-16">
          <span
            ref={labelRef}
            className="text-label opacity-0 flex items-center gap-2"
            style={{ color: 'rgba(253,250,244,0.45)', fontStyle: 'normal' }}
          >
            <Instagram size={13} strokeWidth={1.5} />
            Follow Our Journey
          </span>

          <h2
            ref={handleRef}
            className="font-display mt-6 opacity-0"
            style={{
              fontSize: 'clamp(2.8rem, 7vw, 6.5rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'rgba(253,250,244,0.92)',
              letterSpacing: '-0.02em',
              lineHeight: 1.0,
            }}
          >
            @oncemorephotography
          </h2>

          <p
            ref={subRef}
            className="text-body mt-5 opacity-0 max-w-[480px]"
            style={{ color: 'rgba(253,250,244,0.42)' }}
          >
            Behind the scenes, real moments, and stories from weddings around the world. Join our community of couples and creatives.
          </p>

          <a
            ref={btnRef}
            href="https://www.instagram.com/oncemorephotography"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 opacity-0 inline-flex items-center gap-2.5 px-8 py-3.5 transition-all duration-300 text-label"
            style={{
              border: '1px solid rgba(166,124,69,0.55)',
              color: 'var(--gold)',
              textDecoration: 'none',
              fontStyle: 'normal',
              letterSpacing: '0.12em',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--gold)'
              e.currentTarget.style.color = 'var(--ivory)'
              e.currentTarget.style.borderColor = 'var(--gold)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--gold)'
              e.currentTarget.style.borderColor = 'rgba(166,124,69,0.55)'
            }}
          >
            <Instagram size={14} strokeWidth={1.5} />
            Follow on Instagram
          </a>
        </div>

        {/* 6-image grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3 opacity-0"
        >
          {GRID_IMAGES.map((src, i) => (
            <a
              key={i}
              href="https://www.instagram.com/oncemorephotography"
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden block"
              style={{ position: 'relative', borderRadius: '2px' }}
            >
              <div
                ref={(el) => { imgRefs.current[i] = el }}
                style={{ willChange: 'transform' }}
              >
                <img
                  src={src}
                  alt="Instagram post"
                  className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                  style={{ aspectRatio: '1/1', display: 'block', filter: 'saturate(0.88)' }}
                  loading="lazy"
                />
              </div>
              {/* Hover overlay */}
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: 'rgba(28,22,16,0.42)' }}
              >
                <Instagram size={22} strokeWidth={1.4} style={{ color: 'rgba(253,250,244,0.85)' }} />
              </div>
            </a>
          ))}
        </div>

        {/* Bottom divider */}
        <div className="mt-16 h-px" style={{ background: 'rgba(253,250,244,0.06)' }} />

        {/* Social row */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-body-sm" style={{ color: 'rgba(253,250,244,0.28)' }}>
            Over 400 love stories documented. Yours could be next.
          </p>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="inline-flex items-center gap-2 text-label transition-colors duration-300 group"
            style={{ color: 'var(--gold)', textDecoration: 'none', fontStyle: 'normal', letterSpacing: '0.12em' }}
          >
            Reserve your date
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </a>
        </div>

      </div>
    </section>
  )
}
