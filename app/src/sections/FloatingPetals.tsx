import { useEffect, useRef } from 'react'

interface Petal {
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
  vRotation: number
  opacity: number
  size: number
  wobbleOffset: number
  wobbleSpeed: number
  colorIndex: number
}

const PETAL_COLORS = [
  'rgb(216, 180, 166)',  // dusty rose
  'rgb(245, 238, 230)',  // champagne
  'rgb(230, 210, 200)',  // blush
  'rgb(196, 138, 106)',  // copper (rare, only idx 3)
]

function drawPetal(
  ctx: CanvasRenderingContext2D,
  petal: Petal
) {
  ctx.save()
  ctx.translate(petal.x, petal.y)
  ctx.rotate(petal.rotation)
  ctx.globalAlpha = petal.opacity
  ctx.fillStyle = PETAL_COLORS[petal.colorIndex]

  const s = petal.size
  // Organic teardrop shape
  ctx.beginPath()
  ctx.moveTo(0, -s * 1.3)
  ctx.bezierCurveTo( s * 0.95, -s * 0.6,  s * 0.95,  s * 0.45, 0,  s * 0.85)
  ctx.bezierCurveTo(-s * 0.95,  s * 0.45, -s * 0.95, -s * 0.6,  0, -s * 1.3)
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

export default function FloatingPetals() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId = 0
    let petals: Petal[] = []
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const makePetal = (fromTop = false): Petal => ({
      x: Math.random() * (canvas.width + 40) - 20,
      y: fromTop ? -20 - Math.random() * 60 : Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: Math.random() * 0.22 + 0.14,
      rotation: Math.random() * Math.PI * 2,
      vRotation: (Math.random() - 0.5) * 0.016,
      opacity: Math.random() * 0.16 + 0.04,
      size: Math.random() * 5.5 + 2.5,
      wobbleOffset: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.014 + 0.007,
      // copper is very rare (1 in 8 chance)
      colorIndex: Math.random() < 0.125
        ? 3
        : Math.floor(Math.random() * 3),
    })

    resize()
    petals = Array.from({ length: 32 }, () => makePetal(false))

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time++

      petals.forEach((p, i) => {
        const wobble = Math.sin(time * p.wobbleSpeed + p.wobbleOffset) * 0.45
        p.x += p.vx + wobble
        p.y += p.vy
        p.rotation += p.vRotation

        // Recycle when off-screen
        if (p.y > canvas.height + 30) {
          petals[i] = makePetal(true)
        } else if (p.x < -30) {
          p.x = canvas.width + 30
        } else if (p.x > canvas.width + 30) {
          p.x = -30
        }

        drawPetal(ctx, p)
      })

      animId = requestAnimationFrame(animate)
    }

    animate()
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 3,
        opacity: 0.75,
      }}
    />
  )
}
