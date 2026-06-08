import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const ITEMS = [
  'Once More Photography',
  'Tuscany, Italy',
  'Lake Como',
  'New York City',
  'Paris, France',
  'Fine-Art Wedding Films',
  'Engagement Portraits',
  'Santorini, Greece',
  'Bali, Indonesia',
  'London, UK',
  'Provence, France',
  'Amalfi Coast',
]

export default function MarqueeBand() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const rafId = requestAnimationFrame(() => {
      const totalWidth = track.scrollWidth / 2
      const tween = gsap.fromTo(track, { x: 0 }, { x: -totalWidth, duration: 44, ease: 'none', repeat: -1 })
      return () => { tween.kill() }
    })

    return () => {
      cancelAnimationFrame(rafId)
      gsap.killTweensOf(track)
    }
  }, [])

  const text = ITEMS.map(i => `${i}  ·  `).join('   ')

  return (
    <div
      style={{
        overflow: 'hidden',
        padding: '20px 0',
        borderTop: '1px solid rgba(28,22,16,0.09)',
        borderBottom: '1px solid rgba(28,22,16,0.09)',
        background: 'var(--parchment)',
      }}
    >
      <div ref={trackRef} style={{ display: 'flex', whiteSpace: 'nowrap', willChange: 'transform' }}>
        {[text, text].map((t, i) => (
          <span key={i} className="text-label" style={{ flexShrink: 0, color: 'rgba(28,22,16,0.38)' }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
