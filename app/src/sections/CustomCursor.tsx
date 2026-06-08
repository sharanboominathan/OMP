import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({
    x: 0, y: 0,
    targetX: 0, targetY: 0,
    ringX: 0, ringY: 0,
  })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches
    if (isTouchDevice) return

    const cursor = cursorRef.current
    const ring = ringRef.current
    if (!cursor || !ring) return

    document.documentElement.style.cursor = 'none'

    const onMouseMove = (e: MouseEvent) => {
      posRef.current.targetX = e.clientX
      posRef.current.targetY = e.clientY
    }

    const setHover = (active: boolean) => {
      if (active) {
        cursor.classList.add('hover')
        ring.classList.add('hover')
      } else {
        cursor.classList.remove('hover')
        ring.classList.remove('hover')
      }
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' || target.tagName === 'BUTTON' ||
        target.closest('a') || target.closest('button') ||
        target.tagName === 'IMG' || target.closest('.portfolio-item')
      ) {
        setHover(true)
      }
    }

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' || target.tagName === 'BUTTON' ||
        target.closest('a') || target.closest('button') ||
        target.tagName === 'IMG' || target.closest('.portfolio-item')
      ) {
        setHover(false)
      }
    }

    const animate = () => {
      const p = posRef.current

      // Inner dot: fast follow
      p.x += (p.targetX - p.x) * 0.18
      p.y += (p.targetY - p.y) * 0.18

      // Outer ring: slower, lags behind
      p.ringX += (p.targetX - p.ringX) * 0.07
      p.ringY += (p.targetY - p.ringY) * 0.07

      cursor.style.left = `${p.x}px`
      cursor.style.top = `${p.y}px`
      ring.style.left = `${p.ringX}px`
      ring.style.top = `${p.ringY}px`

      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      cancelAnimationFrame(rafRef.current)
      document.documentElement.style.cursor = ''
    }
  }, [])

  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null
  }

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor hidden md:block"
        style={{ left: '-100px', top: '-100px' }}
      />
      <div
        ref={ringRef}
        className="custom-cursor-ring hidden md:block"
        style={{ left: '-100px', top: '-100px' }}
      />
    </>
  )
}
