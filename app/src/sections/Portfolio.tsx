import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lightbox from './Lightbox'

gsap.registerPlugin(ScrollTrigger)

const portfolioItems = [
  { src: '/images/gallery-1.jpg', caption: 'Isabella & James -- Villa Antinori, Tuscany',      colSpan: 'col-span-12 md:col-span-7', aspect: 'aspect-[4/5]',   from: 'left'   },
  { src: '/images/gallery-2.jpg', caption: 'Sophie & Luca -- Grand Hotel Tremezzo, Lake Como', colSpan: 'col-span-12 md:col-span-5', aspect: 'aspect-[3/4]',   from: 'right'  },
  { src: '/images/gallery-3.jpg', caption: 'Amelia & Noah -- Chateau des Alpilles, Provence',  colSpan: 'col-span-12 md:col-span-5', aspect: 'aspect-[4/5]',   from: 'left'   },
  { src: '/images/gallery-4.jpg', caption: 'Charlotte & Ethan -- The Plaza, New York',         colSpan: 'col-span-12 md:col-span-7', aspect: 'aspect-[16/10]', from: 'right'  },
  { src: '/images/gallery-5.jpg', caption: 'Olivia & William -- Oia, Santorini',               colSpan: 'col-span-12',               aspect: 'aspect-[21/9]',  from: 'bottom' },
  { src: '/images/gallery-6.jpg', caption: 'Evelyn & Thomas -- Palazzo Papadopoli, Venice',   colSpan: 'col-span-12 md:col-span-6', aspect: 'aspect-[3/4]',   from: 'left'   },
  { src: '/images/gallery-7.jpg', caption: 'Clara & James -- Chateau de Varennes, Loire',     colSpan: 'col-span-12 md:col-span-6', aspect: 'aspect-[3/4]',   from: 'right'  },
]

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef   = useRef<HTMLSpanElement>(null)
  const line1Ref   = useRef<HTMLSpanElement>(null)
  const line2Ref   = useRef<HTMLSpanElement>(null)
  const sublineRef = useRef<HTMLParagraphElement>(null)
  const itemRefs   = useRef<(HTMLDivElement | null)[]>([])
  const imgRefs    = useRef<(HTMLDivElement | null)[]>([])

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const prevImage = useCallback(() => setLightboxIndex((i) => i !== null ? (i - 1 + portfolioItems.length) % portfolioItems.length : null), [])
  const nextImage = useCallback(() => setLightboxIndex((i) => i !== null ? (i + 1) % portfolioItems.length : null), [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (labelRef.current) {
        gsap.fromTo(labelRef.current, { opacity: 0, y: 18 }, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: labelRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        })
      }
      ;[line1Ref, line2Ref].forEach((ref, i) => {
        if (!ref.current) return
        gsap.to(ref.current, {
          y: 0, duration: 1.05, delay: i * 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 88%', toggleActions: 'play none none none' },
        })
      })
      if (sublineRef.current) {
        gsap.fromTo(sublineRef.current, { opacity: 0, y: 18 }, {
          opacity: 1, y: 0, duration: 0.8, delay: 0.25, ease: 'power2.out',
          scrollTrigger: { trigger: sublineRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        })
      }

      portfolioItems.forEach((item, i) => {
        const el  = itemRefs.current[i]
        const img = imgRefs.current[i]
        if (!el) return
        const fromX = item.from === 'left' ? -60 : item.from === 'right' ? 60 : 0
        const fromY = item.from === 'bottom' ? 60 : 20
        gsap.fromTo(el, { opacity: 0, x: fromX, y: fromY }, {
          opacity: 1, x: 0, y: 0, duration: 1.1, delay: (i % 2) * 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        })
        if (img) {
          gsap.fromTo(img, { scale: 1.08 }, {
            scale: 1, duration: 1.4, delay: (i % 2) * 0.12, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
          })
          gsap.fromTo(img, { yPercent: -4 }, {
            yPercent: 4, ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
          })
        }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="portfolio" ref={sectionRef} className="py-[140px]" style={{ background: 'var(--ivory)' }}>
      <div className="max-w-[1400px] mx-auto px-8">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4" style={{ marginBottom: '4rem' }}>
          <span ref={labelRef} className="text-label opacity-0" style={{ color: 'var(--gold)' }}>
            Selected Work
          </span>
          <h2 className="text-display-l text-charcoal">
            <span className="line-reveal-wrap">
              <span ref={line1Ref} className="line-reveal-inner" style={{ transform: 'translateY(110%)' }}>
                Stories We Have
              </span>
            </span>
            <span className="line-reveal-wrap">
              <span ref={line2Ref} className="line-reveal-inner" style={{ transform: 'translateY(110%)' }}>
                Told
              </span>
            </span>
          </h2>
          <p ref={sublineRef} className="text-body-sm max-w-[400px] opacity-0" style={{ color: 'rgba(28,22,16,0.42)', fontStyle: 'italic' }}>
            A curated selection from our archive. Click any image to view full screen.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          {portfolioItems.map((item, index) => (
            <div
              key={index}
              ref={(el) => { itemRefs.current[index] = el }}
              className={`portfolio-item ${item.colSpan} opacity-0`}
            >
              <div
                className={`portfolio-img-wrap ${item.aspect} group cursor-pointer relative overflow-hidden`}
                style={{ borderRadius: '2px' }}
                onClick={() => openLightbox(index)}
                role="button"
                tabIndex={0}
                aria-label={`View ${item.caption} in full screen`}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openLightbox(index) }}
              >
                <div
                  ref={(el) => { imgRefs.current[index] = el }}
                  className="portfolio-img-inner w-full h-full"
                >
                  <img
                    src={item.src}
                    alt={item.caption}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    loading="lazy"
                  />
                </div>

                {/* Hover overlay */}
                <div className="portfolio-hover-overlay" aria-hidden="true">
                  <span className="portfolio-hover-label">View</span>
                </div>

                {/* Bottom gradient caption on hover */}
                <div
                  className="absolute inset-x-0 bottom-0 py-6 px-5 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(28,22,16,0.65) 0%, transparent 100%)' }}
                  aria-hidden="true"
                >
                  <p className="text-body-sm" style={{ color: 'rgba(253,250,244,0.88)', fontStyle: 'italic' }}>
                    {item.caption}
                  </p>
                </div>
              </div>

              <p className="text-body-sm mt-3" style={{ color: 'rgba(28,22,16,0.45)', fontStyle: 'italic' }}>
                {item.caption}
              </p>
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
            <span className="text-label" style={{ fontStyle: 'normal', letterSpacing: '0.12em' }}>
              Reserve your date
            </span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1" style={{ color: 'var(--gold)' }}>
              &rarr;
            </span>
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={portfolioItems}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </section>
  )
}
