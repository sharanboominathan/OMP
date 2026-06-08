import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: 400, suffix: '+', label: 'Couples entrusted us' },
  { value: 15,  suffix: '',  label: 'Years of craft' },
  { value: 3,   suffix: '',  label: 'Continents covered' },
  { value: 98,  suffix: '%', label: 'Referral rate' },
]

const PRESS = [
  'Vogue Weddings',
  'Martha Stewart',
  'Brides Magazine',
  'Harper\'s Bazaar',
  'Junebug Weddings',
  'Style Me Pretty',
]

export default function StatsAndPress() {
  const sectionRef  = useRef<HTMLElement>(null)
  const statRefs    = useRef<(HTMLSpanElement | null)[]>([])
  const ruleRef     = useRef<HTMLDivElement>(null)
  const pressRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Count-up each stat
      STATS.forEach((stat, i) => {
        const el = statRefs.current[i]
        if (!el) return
        const obj = { val: 0 }
        gsap.fromTo(obj, { val: 0 }, {
          val: stat.value,
          duration: 2.2,
          ease: 'power2.out',
          delay: i * 0.1,
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + stat.suffix
          },
          scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none none' },
        })
        gsap.fromTo(el.parentElement!, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.9, delay: i * 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none none' },
        })
      })

      // Gold rule
      if (ruleRef.current) {
        gsap.fromTo(ruleRef.current, { scaleX: 0, opacity: 0 }, {
          scaleX: 1, opacity: 1, duration: 1.2, ease: 'power3.out',
          transformOrigin: 'center',
          scrollTrigger: { trigger: ruleRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        })
      }

      // Press line
      if (pressRef.current) {
        gsap.fromTo(pressRef.current, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: pressRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-[100px]" style={{ background: 'var(--charcoal)' }}>
      <div className="max-w-[1400px] mx-auto px-8">

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-0">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center opacity-0 gap-3"
              style={{ borderRight: i < 3 ? '1px solid rgba(253,250,244,0.06)' : 'none' }}
            >
              <span
                ref={(el) => { statRefs.current[i] = el }}
                className="font-display"
                style={{
                  fontSize: 'clamp(3rem, 6vw, 5.5rem)',
                  fontWeight: 500,
                  lineHeight: 1,
                  color: 'var(--gold)',
                  letterSpacing: '-0.02em',
                }}
              >
                0{stat.suffix}
              </span>
              <span className="text-label" style={{ color: 'rgba(253,250,244,0.38)', fontStyle: 'normal' }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          ref={ruleRef}
          className="my-16 h-px opacity-0"
          style={{ background: 'rgba(166,124,69,0.22)', transformOrigin: 'center' }}
        />

        {/* As seen in */}
        <div ref={pressRef} className="flex flex-col items-center gap-7 opacity-0">
          <span className="text-label" style={{ color: 'rgba(253,250,244,0.22)', fontStyle: 'normal' }}>
            As featured in
          </span>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {PRESS.map((name) => (
              <span
                key={name}
                className="font-display"
                style={{
                  fontSize: 'clamp(0.85rem, 1.5vw, 1.05rem)',
                  fontWeight: 400,
                  color: 'rgba(253,250,244,0.28)',
                  letterSpacing: '0.08em',
                  fontStyle: 'italic',
                  whiteSpace: 'nowrap',
                }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
