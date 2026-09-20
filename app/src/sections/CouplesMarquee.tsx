import { useEffect, useRef, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const couples = [
  {
    src:      './images/balaji-janasri-02.jpg',
    names:    'Balaji & Janasri',
    location: 'Wedding Day',
    year:     '2026',
    ratio:    '3/4',
  },
  {
    src:      './images/vignesh-elayabharathi-01.jpg',
    names:    'Vignesh & Elayabharathi',
    location: 'Temple Wedding, Tamil Nadu',
    year:     '2026',
    ratio:    '1/1',
  },
  {
    src:      './images/nishanth-preethi-01.jpg',
    names:    'Nishanth & Preethi',
    location: 'Reception',
    year:     '2026',
    ratio:    '2/3',
  },
  {
    src:      './images/balasubramaniyan-tamilarasi-03.jpg',
    names:    'Balasubramaniyan & Tamilarasi',
    location: 'Beachside Celebration',
    year:     '2026',
    ratio:    '1/1',
  },
  {
    src:      './images/vignesh-elayabharathi-06.jpg',
    names:    'Vignesh & Elayabharathi',
    location: 'Temple Wedding, Tamil Nadu',
    year:     '2026',
    ratio:    '3/4',
  },
  {
    src:      './images/nishanth-preethi-02.jpg',
    names:    'Nishanth & Preethi',
    location: 'Reception',
    year:     '2026',
    ratio:    '2/3',
  },
]

const MARQUEE_NAMES = [
  'Balaji & Janasri', 'Vignesh & Elayabharathi', 'Nishanth & Preethi',
  'Balasubramaniyan & Tamilarasi', 'Balaji & Janasri', 'Vignesh & Elayabharathi',
  'Nishanth & Preethi', 'Balasubramaniyan & Tamilarasi', 'Balaji & Janasri',
  'Vignesh & Elayabharathi', 'Nishanth & Preethi', 'Balasubramaniyan & Tamilarasi',
]

const NUM_COLS = 3

function distributeToColumns<T>(items: T[], numCols: number): T[][] {
  const columns: T[][] = Array.from({ length: numCols }, () => [])
  items.forEach((item, i) => columns[i % numCols].push(item))
  return columns
}

function generateParallaxParams(count: number) {
  const params: { y: number; scale: number }[] = []
  for (let i = 0; i < count; i++) {
    params.push({
      y: 100 + Math.random() * 300,
      scale: 0.55 + Math.random() * 0.45,
    })
  }
  return params
}

export default function CouplesMarquee() {
  const sectionRef   = useRef<HTMLElement>(null)
  const labelRef     = useRef<HTMLSpanElement>(null)
  const headingRef   = useRef<HTMLHeadingElement>(null)
  const trackRef     = useRef<HTMLDivElement>(null)
  const gridRef      = useRef<HTMLDivElement>(null)

  const columns = useMemo(() => distributeToColumns(couples, NUM_COLS), [])
  const parallaxParams = useMemo(() => generateParallaxParams(couples.length), [])

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

  // Header + masonry parallax animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (labelRef.current) {
        gsap.fromTo(labelRef.current, { opacity: 0, y: 18 }, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: labelRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        })
      }

      // Character-by-character headline reveal
      const headlineEl = headingRef.current
      if (headlineEl) {
        const text = headlineEl.textContent || ''
        headlineEl.innerHTML = ''
        const allChars: HTMLSpanElement[] = []

        text.split(' ').forEach((word, wi, arr) => {
          const wordWrapper = document.createElement('span')
          wordWrapper.style.display = 'inline-block'
          wordWrapper.style.whiteSpace = 'nowrap'

          word.split('').forEach((char) => {
            const charWrapper = document.createElement('span')
            charWrapper.style.display = 'inline-block'
            charWrapper.style.overflow = 'hidden'

            const inner = document.createElement('span')
            inner.textContent = char
            inner.style.display = 'inline-block'
            inner.style.transform = 'translateY(120%)'

            charWrapper.appendChild(inner)
            wordWrapper.appendChild(charWrapper)
            allChars.push(inner)
          })

          headlineEl.appendChild(wordWrapper)
          if (wi < arr.length - 1) {
            headlineEl.appendChild(document.createTextNode(' '))
          }
        })

        gsap.to(allChars, {
          y: 0, duration: 1.0, ease: 'power3.out', stagger: 0.025, delay: 0.1,
          scrollTrigger: { trigger: headlineEl, start: 'top 88%', toggleActions: 'play none none none' },
        })
      }

      // Alternating-direction column parallax + randomized per-item parallax/scale
      if (gridRef.current) {
        const colElements = gridRef.current.querySelectorAll<HTMLElement>('.parallax-column')

        colElements.forEach((col, colIndex) => {
          const direction = colIndex % 2 === 0 ? 1 : -1
          const items = col.querySelectorAll<HTMLElement>('.parallax-item')

          const tl = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top bottom+=5%',
              end: 'bottom top-=5%',
              scrub: true,
            },
          })

          tl.fromTo(col, { yPercent: direction * -20 }, { yPercent: direction * 20 }, 0)

          items.forEach((item, itemIndex) => {
            const globalIndex = colIndex + itemIndex * NUM_COLS
            const param = parallaxParams[globalIndex] || { y: 150, scale: 1 }

            tl.fromTo(
              item,
              { yPercent: (direction * -1 * param.y) / 8, scale: param.scale },
              { yPercent: (direction * param.y) / 8, scale: 1 },
              0
            )
          })
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [parallaxParams])

  const text = MARQUEE_NAMES.map(n => `${n}  —  `).join('   ')

  return (
    <section ref={sectionRef} id="couples" className="py-[120px] overflow-hidden" style={{ background: 'var(--champagne)' }}>

      {/* Section header */}
      <div className="max-w-[1400px] mx-auto px-8 mb-16 text-center">
        <span ref={labelRef} className="text-label opacity-0" style={{ color: 'var(--gold)' }}>
          True Love Stories
        </span>
        <h2 ref={headingRef} className="text-display-l text-charcoal mt-6">
          Couples We&apos;ve Celebrated
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

      {/* Parallax masonry grid */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        <div ref={gridRef} className="flex flex-col md:flex-row gap-4 md:gap-5">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="parallax-column flex-1 flex flex-col gap-4 md:gap-5">
              {column.map((couple, imgIndex) => (
                <div
                  key={imgIndex}
                  className="parallax-item group cursor-pointer overflow-hidden rounded-xl"
                  style={{ position: 'relative', aspectRatio: couple.ratio, willChange: 'transform' }}
                >
                  <img
                    src={couple.src}
                    alt={`${couple.names} — ${couple.location}`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    style={{ display: 'block' }}
                    loading="lazy"
                  />

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
              ))}
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
