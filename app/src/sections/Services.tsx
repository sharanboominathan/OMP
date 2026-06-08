import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Camera, Film, Heart } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: Camera,
    title: 'Fine-Art Photography',
    subtitle: 'Full-day coverage',
    description:
      'From the quiet intimacy of getting ready to the last dance under the stars, we document every layer of your day with a painterly, editorial eye. Each image is a considered composition, not a snapshot.',
    detail: 'Starting from $8,500',
    offset: '0',
  },
  {
    icon: Film,
    title: 'Cinematic Films',
    subtitle: 'Feature-length & highlights',
    description:
      'Our wedding films are not slideshows. They are short films with narrative arc, authentic sound design, and colour graded to match our photographic aesthetic. Delivered in 4K.',
    detail: 'Starting from $6,200',
    offset: '0',
  },
  {
    icon: Heart,
    title: 'Engagement Sessions',
    subtitle: 'Pre-wedding portraits',
    description:
      'An unhurried afternoon together before the wedding day. We travel to a location that speaks to your relationship and create images that feel genuinely, beautifully yours.',
    detail: 'From $1,800 | Destination available',
    offset: '0',
  },
]

export default function Services() {
  const sectionRef     = useRef<HTMLElement>(null)
  const labelRef       = useRef<HTMLSpanElement>(null)
  const headingLineRef = useRef<HTMLSpanElement>(null)
  const noteRef        = useRef<HTMLParagraphElement>(null)
  const serviceRowRefs = useRef<(HTMLDivElement | null)[]>([])

  const handleMagneticMove = (e: React.MouseEvent, index: number) => {
    const el = serviceRowRefs.current[index]
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top  + rect.height / 2
    const dx = (e.clientX - cx) * 0.06
    const dy = (e.clientY - cy) * 0.06
    gsap.to(el, { x: dx, y: dy, duration: 0.35, ease: 'power2.out' })
  }

  const handleMagneticLeave = (index: number) => {
    const el = serviceRowRefs.current[index]
    if (!el) return
    gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' })
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (labelRef.current) {
        gsap.fromTo(labelRef.current, { opacity: 0, y: 18 }, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: labelRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        })
      }
      if (headingLineRef.current) {
        gsap.to(headingLineRef.current, {
          y: 0, duration: 1.05, ease: 'power3.out',
          scrollTrigger: { trigger: headingLineRef.current, start: 'top 88%', toggleActions: 'play none none none' },
        })
      }
      if (noteRef.current) {
        gsap.fromTo(noteRef.current, { opacity: 0, y: 18 }, {
          opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power2.out',
          scrollTrigger: { trigger: noteRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        })
      }
      serviceRowRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(el, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.9, delay: i * 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-[140px]" style={{ background: 'var(--champagne)' }}>
      <div className="max-w-[1060px] mx-auto px-8">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4" style={{ marginBottom: '5rem' }}>
          <span ref={labelRef} className="text-label opacity-0" style={{ color: 'var(--gold)' }}>
            What We Offer
          </span>

          <h2 className="text-display-l text-charcoal">
            <span className="line-reveal-wrap">
              <span ref={headingLineRef} className="line-reveal-inner" style={{ transform: 'translateY(110%)' }}>
                Our Collections
              </span>
            </span>
          </h2>

          <p
            ref={noteRef}
            className="text-body-sm text-center max-w-[380px] opacity-0"
            style={{ color: 'rgba(28,22,16,0.42)', fontStyle: 'italic' }}
          >
            We accept only 12 weddings annually, ensuring every couple receives our full creative dedication.
          </p>
        </div>

        <div className="flex flex-col gap-24">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                ref={(el) => { serviceRowRefs.current[index] = el }}
                className="service-row flex flex-col md:flex-row md:items-start gap-8 md:gap-20 cursor-default opacity-0"
                style={{ marginLeft: service.offset }}
                onMouseMove={(e) => handleMagneticMove(e, index)}
                onMouseLeave={() => handleMagneticLeave(index)}
              >
                {/* Icon + number */}
                <div className="flex items-start gap-4 shrink-0 md:w-[160px]">
                  <span
                    className="text-label"
                    style={{ color: 'rgba(28,22,16,0.18)', fontSize: '0.6rem', paddingTop: '3px', minWidth: '24px' }}
                  >
                    0{index + 1}
                  </span>
                  <Icon size={22} strokeWidth={1.2} style={{ color: 'var(--gold)', marginTop: '2px' }} />
                </div>

                {/* Text block */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 md:gap-6 mb-4">
                    <h3 className="font-display text-heading-m text-charcoal" style={{ letterSpacing: '0.02em' }}>
                      {service.title}
                    </h3>
                    <span className="text-label" style={{ color: 'var(--gold)', fontStyle: 'normal' }}>
                      {service.subtitle}
                    </span>
                  </div>
                  <p className="text-body" style={{ color: 'rgba(28,22,16,0.58)', lineHeight: '1.8', maxWidth: '560px' }}>
                    {service.description}
                  </p>
                  <p className="text-body-sm mt-4" style={{ color: 'var(--gold)' }}>
                    {service.detail}
                  </p>
                </div>

                {/* Divider */}
                <div
                  className="hidden md:block self-stretch w-px"
                  style={{ background: 'rgba(28,22,16,0.07)' }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
