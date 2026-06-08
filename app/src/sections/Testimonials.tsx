import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    img:    '/images/gallery-1.jpg',
    quote:  'Working with Once More was the single best decision we made for our entire wedding. Every image is a painting. We cry every time we look at the album.',
    couple: 'Isabella & James',
    venue:  'Villa Antinori, Tuscany',
  },
  {
    img:    '/images/gallery-3.jpg',
    quote:  'The photographs captured emotions we had forgotten we felt. Every time we look at the album, we are transported back to that day completely. Truly extraordinary.',
    couple: 'Sophie & Luca',
    venue:  'Grand Hotel Tremezzo, Lake Como',
  },
  {
    img:    '/images/gallery-4.jpg',
    quote:  'We were hesitant about the investment. Now, three years later, our photographs are the most treasured thing we own. Worth every penny and so much more.',
    couple: 'Amelia & Noah',
    venue:  'Chateau des Alpilles, Provence',
  },
]

export default function Testimonials() {
  const sectionRef  = useRef<HTMLElement>(null)
  const labelRef    = useRef<HTMLSpanElement>(null)
  const line1Ref    = useRef<HTMLSpanElement>(null)
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([])
  const imgRefs     = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (labelRef.current) {
        gsap.fromTo(labelRef.current, { opacity: 0, y: 18 }, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: labelRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        })
      }
      if (line1Ref.current) {
        gsap.to(line1Ref.current, {
          y: 0, duration: 1.05, ease: 'power3.out',
          scrollTrigger: { trigger: line1Ref.current, start: 'top 88%', toggleActions: 'play none none none' },
        })
      }

      // Cards stagger in
      cardRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(el, { opacity: 0, y: 50 }, {
          opacity: 1, y: 0, duration: 1.0, delay: i * 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        })
      })

      // Image parallax per card
      imgRefs.current.forEach((el) => {
        if (!el) return
        gsap.fromTo(el, { yPercent: -6 }, {
          yPercent: 6, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-[140px]"
      style={{ background: 'var(--parchment)' }}
    >
      <div className="max-w-[1400px] mx-auto px-8">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4" style={{ marginBottom: '4.5rem' }}>
          <span ref={labelRef} className="text-label opacity-0" style={{ color: 'var(--gold)' }}>
            Kind Words
          </span>
          <h2 className="text-display-l text-charcoal">
            <span className="line-reveal-wrap">
              <span ref={line1Ref} className="line-reveal-inner" style={{ transform: 'translateY(110%)' }}>
                What Our Couples Say
              </span>
            </span>
          </h2>
        </div>

        {/* Three-column testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {testimonials.map((t, i) => (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el }}
              className="flex flex-col opacity-0 group"
              style={{
                background: 'var(--ivory)',
                borderRadius: '2px',
                overflow: 'hidden',
              }}
            >
              {/* Image */}
              <div
                className="overflow-hidden"
                style={{ aspectRatio: '4/5', position: 'relative' }}
              >
                <div
                  ref={(el) => { imgRefs.current[i] = el }}
                  className="w-full h-full"
                  style={{ willChange: 'transform' }}
                >
                  <img
                    src={t.img}
                    alt={`${t.couple} wedding`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                </div>
                {/* Bottom vignette */}
                <div
                  className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(28,22,16,0.35) 0%, transparent 100%)' }}
                />
                {/* Quote mark overlay on image */}
                <span
                  className="absolute bottom-4 left-5 font-display"
                  style={{
                    fontSize: '4rem',
                    lineHeight: 1,
                    color: 'rgba(166,124,69,0.55)',
                    fontWeight: 500,
                  }}
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
              </div>

              {/* Text */}
              <div className="flex flex-col gap-4 p-7">
                <p
                  className="font-display"
                  style={{
                    fontSize: 'clamp(1rem, 1.6vw, 1.15rem)',
                    fontStyle: 'italic',
                    fontWeight: 400,
                    color: 'var(--charcoal)',
                    lineHeight: 1.65,
                  }}
                >
                  {t.quote}
                </p>

                <div className="gold-rule" style={{ width: '36px', margin: '4px 0' }} />

                <div className="flex flex-col gap-0.5">
                  <span
                    className="font-display"
                    style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--charcoal)', letterSpacing: '0.02em' }}
                  >
                    {t.couple}
                  </span>
                  <span
                    className="text-label"
                    style={{ color: 'var(--gold)', fontStyle: 'normal', fontSize: '0.62rem' }}
                  >
                    {t.venue}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom editorial image */}
        <div className="mt-16 overflow-hidden" style={{ borderRadius: '2px', position: 'relative' }}>
          <img
            src="/images/testimonial-editorial.jpg"
            alt="Wedding editorial"
            className="w-full object-cover"
            style={{ aspectRatio: '21/8', display: 'block', filter: 'saturate(0.85)' }}
            loading="lazy"
          />
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: 'rgba(28,22,16,0.35)' }}
          >
            <p
              className="font-display text-center px-8"
              style={{
                fontSize: 'clamp(1.4rem, 3.5vw, 2.8rem)',
                fontStyle: 'italic',
                fontWeight: 400,
                color: 'rgba(253,250,244,0.88)',
                maxWidth: '780px',
                lineHeight: 1.3,
              }}
            >
              &ldquo;The bravest thing you can do is let someone else hold your memories.&rdquo;
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
