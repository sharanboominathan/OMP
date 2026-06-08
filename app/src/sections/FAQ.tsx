import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Plus } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const FAQS = [
  {
    q: 'How far in advance should we book?',
    a: 'We accept only 12 weddings per year, and our calendar typically fills 14 to 20 months in advance. We recommend reaching out as soon as you have a date in mind. A 30% deposit secures your date immediately.',
  },
  {
    q: 'Do you travel internationally?',
    a: 'Absolutely. Approximately 60% of our weddings take place outside the United States. We have photographed weddings across Italy, France, Greece, Indonesia, the UK, and beyond. Travel fees vary by destination and are quoted transparently.',
  },
  {
    q: 'What is your editing style?',
    a: 'We describe our work as fine-art documentary. We do not use heavy presets or HDR processing. Images are colour-graded to feel timeless, warm, and filmic. The goal is that your photographs look extraordinary in 30 years.',
  },
  {
    q: 'How many images will we receive?',
    a: 'Full-day coverage typically yields 700 to 900 fully edited, high-resolution images delivered via a private online gallery. We do not deliver unedited files. Every image is individually retouched.',
  },
  {
    q: 'What is your turnaround time?',
    a: 'Your online gallery will be delivered within 10 to 14 weeks. A sneak preview of 30 to 40 images is shared within 72 hours of your wedding day so you can begin sharing with family.',
  },
  {
    q: 'Do you offer albums and prints?',
    a: 'Yes. We design bespoke lay-flat albums printed on archival paper with linen covers. Albums start at $2,800. All prints are produced at fine-art labs and delivered mounted and ready to hang.',
  },
  {
    q: 'What if our venue has low light?',
    a: 'Low light is where we excel. We use a hybrid mix of natural light, carefully placed off-camera flash, and available ambient lighting. We scout every venue before the wedding day to understand the light conditions.',
  },
]

export default function FAQ() {
  const sectionRef  = useRef<HTMLElement>(null)
  const labelRef    = useRef<HTMLSpanElement>(null)
  const headingRef  = useRef<HTMLHeadingElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const bodyRefs    = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (labelRef.current) {
        gsap.fromTo(labelRef.current, { opacity: 0, y: 18 }, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: labelRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        })
      }
      if (headingRef.current) {
        gsap.fromTo(headingRef.current, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 1.0, ease: 'power2.out', delay: 0.1,
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        })
      }
      // Stagger row reveals
      gsap.utils.toArray<HTMLElement>('.faq-row').forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, y: 24 }, {
          opacity: 1, y: 0, duration: 0.75, delay: i * 0.06, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Animate open/close
  useEffect(() => {
    bodyRefs.current.forEach((el, i) => {
      if (!el) return
      if (i === openIndex) {
        gsap.fromTo(el, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.45, ease: 'power3.out' })
      } else {
        gsap.to(el, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in' })
      }
    })
  }, [openIndex])

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i))

  return (
    <section ref={sectionRef} className="py-[140px]" style={{ background: 'var(--champagne)' }}>
      <div className="max-w-[900px] mx-auto px-8">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4" style={{ marginBottom: '4.5rem' }}>
          <span ref={labelRef} className="text-label opacity-0" style={{ color: 'var(--gold)' }}>
            Questions
          </span>
          <h2 ref={headingRef} className="text-display-l text-charcoal opacity-0">
            Frequently Asked
          </h2>
        </div>

        {/* Accordion */}
        <div className="flex flex-col" role="list">
          {FAQS.map((item, i) => (
            <div
              key={i}
              className="faq-row opacity-0"
              role="listitem"
              style={{ borderTop: '1px solid rgba(28,22,16,0.1)' }}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between py-7 text-left group"
                aria-expanded={openIndex === i}
                aria-controls={`faq-body-${i}`}
                id={`faq-btn-${i}`}
              >
                <span
                  className="font-display pr-8"
                  style={{
                    fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                    fontWeight: 500,
                    color: openIndex === i ? 'var(--gold)' : 'var(--charcoal)',
                    transition: 'color 0.3s',
                    lineHeight: 1.2,
                  }}
                >
                  {item.q}
                </span>
                <span
                  className="shrink-0 flex items-center justify-center transition-transform duration-300"
                  style={{
                    transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0deg)',
                    color: 'var(--gold)',
                  }}
                  aria-hidden="true"
                >
                  <Plus size={18} strokeWidth={1.3} />
                </span>
              </button>

              <div
                id={`faq-body-${i}`}
                ref={(el) => { bodyRefs.current[i] = el }}
                style={{ height: 0, overflow: 'hidden', opacity: 0 }}
                role="region"
                aria-labelledby={`faq-btn-${i}`}
              >
                <p
                  className="text-body pb-7"
                  style={{ color: 'rgba(28,22,16,0.58)', lineHeight: '1.85', maxWidth: '680px' }}
                >
                  {item.a}
                </p>
              </div>
            </div>
          ))}
          <div style={{ borderTop: '1px solid rgba(28,22,16,0.1)' }} />
        </div>

        {/* CTA below FAQ */}
        <div className="flex flex-col items-center mt-16 gap-4">
          <p className="text-body text-center" style={{ color: 'rgba(28,22,16,0.45)', fontStyle: 'italic' }}>
            Have a question we have not answered?
          </p>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="inline-flex items-center gap-3 group"
            style={{ color: 'var(--gold)', textDecoration: 'none' }}
          >
            <span className="text-label" style={{ fontStyle: 'normal', letterSpacing: '0.12em' }}>
              Write to us
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
