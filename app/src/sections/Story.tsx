import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Story() {
  const sectionRef      = useRef<HTMLElement>(null)
  const imgRef          = useRef<HTMLDivElement>(null)
  const accentImgRef    = useRef<HTMLDivElement>(null)
  const labelRef        = useRef<HTMLSpanElement>(null)
  const headingLine1Ref = useRef<HTMLSpanElement>(null)
  const headingLine2Ref = useRef<HTMLSpanElement>(null)
  const bodyRef         = useRef<HTMLParagraphElement>(null)
  const ctaRef          = useRef<HTMLAnchorElement>(null)
  const ruleRef         = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Primary image parallax
      if (imgRef.current) {
        gsap.fromTo(imgRef.current,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: 'none',
            scrollTrigger: { trigger: imgRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        )
      }

      // Accent image parallax (offset)
      if (accentImgRef.current) {
        gsap.fromTo(accentImgRef.current,
          { yPercent: -12 },
          {
            yPercent: 4,
            ease: 'none',
            scrollTrigger: { trigger: accentImgRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        )
      }

      if (labelRef.current) {
        gsap.fromTo(labelRef.current, { opacity: 0, y: 18 }, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: labelRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        })
      }

      ;[headingLine1Ref, headingLine2Ref].forEach((ref, i) => {
        if (!ref.current) return
        gsap.to(ref.current, {
          y: 0, duration: 1.05, delay: i * 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 88%', toggleActions: 'play none none none' },
        })
      })

      ;[bodyRef, ctaRef].forEach((ref, i) => {
        if (!ref.current) return
        gsap.fromTo(ref.current, { opacity: 0, y: 28 }, {
          opacity: 1, y: 0, duration: 0.9, delay: 0.2 + i * 0.15, ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 86%', toggleActions: 'play none none none' },
        })
      })

      if (ruleRef.current) {
        gsap.fromTo(ruleRef.current, { scaleX: 0, opacity: 0 }, {
          scaleX: 1, opacity: 1, duration: 1.1, ease: 'power3.out',
          transformOrigin: 'left center',
          scrollTrigger: { trigger: ruleRef.current, start: 'top 88%', toggleActions: 'play none none none' },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="story" ref={sectionRef} className="py-[140px] overflow-hidden" style={{ background: 'var(--ivory)' }}>
      <div className="max-w-[1400px] mx-auto px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">

          {/* Image column -- two layered portraits */}
          <div className="relative">
            {/* Primary portrait */}
            <div
              className="overflow-hidden"
              style={{ borderRadius: '2px', position: 'relative', zIndex: 2 }}
            >
              <div ref={imgRef}>
                <img
                  src="./images/story-tight.jpg"
                  alt="Once More Photography artists at work"
                  className="w-full object-cover"
                  style={{ aspectRatio: '3/4', display: 'block' }}
                  loading="lazy"
                />
              </div>
            </div>

            {/* Accent wide image -- offset bottom-right */}
            <div
              className="hidden md:block overflow-hidden"
              style={{
                position: 'absolute',
                bottom: '-48px',
                right: '-48px',
                width: '52%',
                zIndex: 3,
                borderRadius: '2px',
                boxShadow: '0 24px 64px rgba(28,22,16,0.18)',
              }}
            >
              <div ref={accentImgRef}>
                <img
                  src="./images/story-wide.jpg"
                  alt="Wedding detail moment"
                  className="w-full object-cover"
                  style={{ aspectRatio: '4/3', display: 'block' }}
                  loading="lazy"
                />
              </div>
            </div>

            {/* Gold rule accent */}
            <div
              ref={ruleRef}
              className="gold-rule absolute bottom-[-28px] left-0 opacity-0"
              style={{ transformOrigin: 'left center', zIndex: 1 }}
            />
          </div>

          {/* Text column */}
          <div className="flex flex-col items-start gap-0 md:pl-8">

            <span ref={labelRef} className="text-label opacity-0" style={{ color: 'var(--gold)' }}>
              Our Story
            </span>

            <h2 className="text-display-l text-charcoal mt-16">
              <span className="line-reveal-wrap">
                <span ref={headingLine1Ref} className="line-reveal-inner" style={{ transform: 'translateY(110%)' }}>
                  We Are Not Simply
                </span>
              </span>
              <span className="line-reveal-wrap">
                <span ref={headingLine2Ref} className="line-reveal-inner" style={{ transform: 'translateY(110%)' }}>
                  Photographers
                </span>
              </span>
            </h2>

            <p
              ref={bodyRef}
              className="text-body mt-8 opacity-0"
              style={{ color: 'rgba(28,22,16,0.58)', lineHeight: '1.85', maxWidth: '520px' }}
            >
              We are visual storytellers, entrusted with the most intimate chapters of your life.
              For fifteen years, we have had the profound privilege of witnessing and preserving
              the raw, unscripted emotion of wedding days across three continents. We accept only
              a carefully curated number of weddings each year, ensuring every couple receives
              our complete creative devotion and uncompromising artistic vision.
            </p>

            <a
              ref={ctaRef}
              href="#contact"
              className="mt-10 opacity-0 inline-flex items-center gap-3 group"
              style={{ color: 'var(--gold)', textDecoration: 'none' }}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <span className="text-label" style={{ fontStyle: 'normal', letterSpacing: '0.12em' }}>
                Begin Your Journey
              </span>
              <span
                className="inline-block transition-transform duration-400 group-hover:translate-x-1"
                style={{ fontSize: '0.8rem', color: 'var(--gold)' }}
              >
                &rarr;
              </span>
            </a>

          </div>
        </div>
      </div>
    </section>
  )
}
