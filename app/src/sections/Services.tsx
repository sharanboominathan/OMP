import { useCallback, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Camera, Film, Heart, Sun, Sparkles, Baby, PartyPopper } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: Camera,
    title: 'Wedding Photography',
    description:
      'From getting ready to the last dance, we document every layer of your day with candid, traditional, photojournalistic, and fine-art styles.',
  },
  {
    icon: Film,
    title: 'Wedding Films',
    description:
      'Short films with narrative arc, authentic sound design, and colour grading to match our photographic aesthetic.',
  },
  {
    icon: Heart,
    title: 'Engagement Shoots',
    description:
      'An unhurried session before the wedding day, at a location that speaks to your relationship.',
  },
  {
    icon: Sun,
    title: 'Outdoor Shoots',
    description:
      'On-location sessions in scenic backdrops and natural landscapes, capturing authentic, unscripted moments.',
  },
  {
    icon: Sparkles,
    title: 'Model Shoots',
    description:
      'Editorial-style portrait sessions for models and creatives, blending fine-art composition with documentary sensibility.',
  },
  {
    icon: Baby,
    title: 'Maternity & Baby Shower',
    description:
      'Gentle, joyful photography for maternity sessions and baby showers, preserving fleeting moments with warmth.',
  },
  {
    icon: PartyPopper,
    title: 'Birthday Celebrations',
    description:
      'From intimate gatherings to large celebrations, capturing the candid, joyful moments that make the day memorable.',
  },
]

function ServiceCard({ service }: { service: typeof services[0] }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const Icon = service.icon

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`

    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(166,124,69,0.14), transparent 60%)`
      glowRef.current.style.opacity = '1'
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)'
    if (glowRef.current) glowRef.current.style.opacity = '0'
  }, [])

  return (
    <div
      ref={cardRef}
      className="service-card relative rounded-xl p-8 transition-transform duration-300 ease-out cursor-default overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: 'var(--ivory)',
        border: '1px solid rgba(28,22,16,0.08)',
        boxShadow: '0 4px 20px rgba(28,22,16,0.05)',
        transformStyle: 'preserve-3d',
      }}
    >
      <div ref={glowRef} className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none" />
      <div className="relative" style={{ zIndex: 1 }}>
        <Icon size={24} strokeWidth={1.3} style={{ color: 'var(--gold)' }} />
        <h3 className="font-display text-heading-s text-charcoal mt-6" style={{ letterSpacing: '0.01em' }}>
          {service.title}
        </h3>
        <p className="text-body-sm mt-2" style={{ color: 'rgba(28,22,16,0.55)', lineHeight: '1.65' }}>
          {service.description}
        </p>
        <p className="text-body-sm mt-4" style={{ color: 'var(--gold)' }}>
          Contact us for pricing
        </p>
      </div>
    </div>
  )
}

export default function Services() {
  const sectionRef  = useRef<HTMLElement>(null)
  const labelRef    = useRef<HTMLSpanElement>(null)
  const headingRef  = useRef<HTMLHeadingElement>(null)
  const noteRef     = useRef<HTMLParagraphElement>(null)
  const imageRef    = useRef<HTMLDivElement>(null)
  const gridRef     = useRef<HTMLDivElement>(null)
  const cardsRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (labelRef.current) {
        gsap.fromTo(labelRef.current, { opacity: 0, y: 18 }, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: labelRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        })
      }
      if (noteRef.current) {
        gsap.fromTo(noteRef.current, { opacity: 0, y: 18 }, {
          opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power2.out',
          scrollTrigger: { trigger: noteRef.current, start: 'top 85%', toggleActions: 'play none none none' },
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

      // Featured image entrance
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          opacity: 0, y: 60, scale: 0.95, duration: 1.0, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none none' },
        })
      }

      // Cards stagger entrance
      const cards = cardsRef.current?.querySelectorAll('.service-card')
      if (cards && cards.length) {
        gsap.from(cards, {
          opacity: 0, y: 40, duration: 0.8, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: cardsRef.current, start: 'top 75%', toggleActions: 'play none none none' },
        })
      }

      // Perspective flatten on scroll
      if (gridRef.current) {
        gsap.to(gridRef.current, {
          rotateY: 0, rotateX: 0, ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top center', end: 'bottom center', scrub: true },
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-[140px]" style={{ background: 'var(--champagne)' }}>
      <div className="max-w-[1400px] mx-auto px-8">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4" style={{ marginBottom: '5rem' }}>
          <span ref={labelRef} className="text-label opacity-0" style={{ color: 'var(--gold)' }}>
            What We Offer
          </span>

          <h2 ref={headingRef} className="text-display-l text-charcoal">
            Our Collections
          </h2>

          <p
            ref={noteRef}
            className="text-body-sm text-center max-w-[380px] opacity-0"
            style={{ color: 'rgba(28,22,16,0.42)', fontStyle: 'italic' }}
          >
            7+ years of experience and 750+ weddings captured, with a full range of photography services in Chennai.
          </p>
        </div>

        {/* Featured image + card grid */}
        <div
          ref={gridRef}
          style={{ transformStyle: 'preserve-3d', perspective: '1600px', transform: 'rotateX(6deg)' }}
        >
          <div
            ref={imageRef}
            className="overflow-hidden mb-16"
            style={{ borderRadius: '2px', boxShadow: '0 24px 64px rgba(28,22,16,0.12)' }}
          >
            <img
              src="./images/vignesh-elayabharathi-04.jpg"
              alt="Once More Photography -- wedding services"
              className="w-full object-cover"
              style={{ aspectRatio: '21/9', display: 'block' }}
              loading="lazy"
            />
          </div>

          <div
            ref={cardsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
