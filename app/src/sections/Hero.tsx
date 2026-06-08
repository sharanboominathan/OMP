import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FloatingPetals from './FloatingPetals'

gsap.registerPlugin(ScrollTrigger)

const vertexShaderSource = `
varying vec2 vUv;
uniform float uTime;

void main() {
  vUv = uv;
  vec3 pos = position;
  pos.y += sin(pos.x * 2.0 + uTime) * 0.1;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`

const fragmentShaderSource = `
varying vec2 vUv;
uniform sampler2D uTexture;
uniform vec4 uResolution;
uniform float uTime;
uniform float uHover;
uniform float uClick;
uniform vec2 uMouse;
uniform vec2 uMouseIntro;
uniform float uIntro;
uniform float uRadius;
uniform float uRgbShift;
uniform float uStrength;
uniform float uScale;
uniform float uRedFactor;
uniform float uGreenFactor;
uniform float uBlueFactor;
uniform float uId;

float sdRoundBox(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

vec2 coverUv(vec2 uv, vec4 resolution) {
  vec2 ratio = vec2(min((resolution.z / resolution.w), (resolution.x / resolution.y)), 1.0);
  return (uv * ratio) + (1.0 - ratio) * 0.5;
}

void main() {
  vec2 uv = coverUv(vUv, uResolution);
  float distance = sdRoundBox(vUv - 0.5, vec2(0.5), uRadius);
  float smoothedAlpha = 1.0 - smoothstep(0.0, 0.01, distance);
  vec2 center = vec2(uMouse.x * 0.05 + uMouseIntro.x, uMouse.y * 0.05 + 1.0 - uMouseIntro.y);
  float dist = distance(uv, center);
  float effectRadius = 0.45;
  float effect = smoothstep(effectRadius, 0.0, dist) * (uHover + uClick);
  vec2 direction = normalize(uv - center);
  vec2 rgbShift = direction * uRgbShift * effect;
  float scale = 1.0 - uScale * effect;
  vec2 scaledUv = (uv - 0.5) * scale + 0.5;
  float red = texture2D(uTexture, scaledUv + rgbShift).r;
  float green = texture2D(uTexture, scaledUv + rgbShift * 0.05).g;
  float blue = texture2D(uTexture, scaledUv + rgbShift * 2.0).b;
  vec3 textureColor = vec3(red, green, blue);
  textureColor *= vec3(uRedFactor, uGreenFactor, uBlueFactor);
  textureColor *= uStrength;
  textureColor += sin(uv.y * 12.0 + uTime * (0.2 + uId * 0.05)) * (1.0 - uIntro) * 0.03;
  gl_FragColor = vec4(textureColor, smoothedAlpha);
}
`

const GALLERY_IMAGES = [
  './images/gallery-1.jpg', './images/gallery-2.jpg',
  './images/gallery-3.jpg', './images/gallery-4.jpg',
  './images/gallery-5.jpg', './images/gallery-6.jpg',
  './images/gallery-7.jpg', './images/gallery-8.jpg',
]

export default function Hero() {
  const containerRef       = useRef<HTMLDivElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const titleLine1Ref      = useRef<HTMLSpanElement>(null)
  const titleLine2Ref      = useRef<HTMLSpanElement>(null)
  const subtitleRef        = useRef<HTMLParagraphElement>(null)
  const ctaRef             = useRef<HTMLAnchorElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const socialProofRef     = useRef<HTMLParagraphElement>(null)
  const appRef             = useRef<any>(null)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  useEffect(() => {
    // Skip Three.js on mobile -- too heavy, use static fallback
    if (isMobile) return

    if (!canvasContainerRef.current) return
    const container = canvasContainerRef.current

    class GalleryApp {
      container: HTMLDivElement
      options: any
      scroll: { ease: number; current: number; target: number; last: number; delta: number }
      settings: any
      mouse: { x: number; y: number; prevX: number; prevY: number; vX: number; vY: number }
      items: any[]
      group: { mesh: THREE.Group | null; width: number }
      renderer!: THREE.WebGLRenderer
      scene!: THREE.Scene
      camera!: THREE.PerspectiveCamera
      clock!: THREE.Clock
      viewport: { width: number; height: number }
      raycaster: THREE.Raycaster
      pointer: THREE.Vector2
      animFrameId: number
      introTl: gsap.core.Timeline

      constructor(container: HTMLDivElement, options = {}) {
        this.container = container
        this.options = { itemCount: 12, imageSize: [400, 500], gutter: 60, curvature: 2, scrollSpeed: 0.05, perspective: 1200, ...options }
        this.scroll = { ease: 0.05, current: 0, target: 0, last: 0, delta: 0 }
        this.settings = { imageSize: this.options.imageSize, gutter: this.options.gutter, curvature: this.options.curvature, scrollSpeed: this.options.scrollSpeed, width: window.innerWidth, height: window.innerHeight }
        this.mouse = { x: 0, y: 0, prevX: 0, prevY: 0, vX: 0, vY: 0 }
        this.items = []
        this.group = { mesh: null, width: 0 }
        this.viewport = { width: window.innerWidth, height: window.innerHeight }
        this.clock = new THREE.Clock()
        this.raycaster = new THREE.Raycaster()
        this.pointer = new THREE.Vector2()
        this.animFrameId = 0
        this.introTl = gsap.timeline()
        this.init()
        this.addEventListeners()
      }

      init() {
        const { width, height, imageSize, gutter, curvature } = this.settings
        const totalWidth = imageSize[0] * this.options.itemCount + gutter * (this.options.itemCount - 1)
        const aspect = width / height
        const fov = 2 * Math.atan(height / 2 / this.options.perspective) * (180 / Math.PI)
        const curvatureAngle = curvature * (Math.PI / 180)
        void (totalWidth / curvatureAngle)

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        this.renderer.setSize(width, height)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.container.appendChild(this.renderer.domElement)

        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(fov, aspect, 10, 5000)
        this.camera.position.z = this.options.perspective
        this.group.mesh = new THREE.Group()
        this.scene.add(this.group.mesh)
        this.viewport = { width, height }
        this.group.width = totalWidth
        this.loadImages()
      }

      loadImages() {
        const loader = new THREE.TextureLoader()
        let loaded = 0
        for (let i = 0; i < this.options.itemCount; i++) {
          loader.load(GALLERY_IMAGES[i % GALLERY_IMAGES.length], (texture) => {
            this.createItem(texture, i)
            if (++loaded === this.options.itemCount) { this.start(); this.introAnimation() }
          })
        }
      }

      createItem(texture: THREE.Texture, index: number) {
        const { imageSize, gutter, curvature } = this.settings
        const totalWidth = imageSize[0] * this.options.itemCount + gutter * (this.options.itemCount - 1)
        const angleStep = (curvature * Math.PI / 180) / (this.options.itemCount - 1)
        const radius = totalWidth / (curvature * Math.PI / 180)
        const geometry = new THREE.PlaneGeometry(imageSize[0], imageSize[1], 50, 50)
        const material = new THREE.ShaderMaterial({
          vertexShader: vertexShaderSource, fragmentShader: fragmentShaderSource,
          transparent: true, depthTest: false,
          uniforms: {
            uTexture: { value: texture },
            uResolution: { value: new THREE.Vector4(imageSize[0], imageSize[1], imageSize[0] / imageSize[1], 1) },
            uTime: { value: 0 }, uHover: { value: 0 }, uClick: { value: 0 },
            uMouse: { value: new THREE.Vector2(0, 0) }, uMouseIntro: { value: new THREE.Vector2(0.5, 0.5) },
            uIntro: { value: 0 }, uRadius: { value: 0.07 }, uRgbShift: { value: 0.3 },
            uStrength: { value: 1.0 }, uScale: { value: 0 },
            uRedFactor: { value: 1.0 }, uGreenFactor: { value: 1.0 }, uBlueFactor: { value: 1.0 },
            uId: { value: index },
          },
        })
        const mesh = new THREE.Mesh(geometry, material)
        const itemAngle = (index - (this.options.itemCount - 1) / 2) * angleStep
        mesh.position.x = Math.sin(itemAngle) * radius
        mesh.position.y = 0
        mesh.position.z = Math.cos(itemAngle) * radius - radius
        mesh.rotation.y = -itemAngle
        mesh.userData = { index, angle: itemAngle, x: mesh.position.x, y: mesh.position.y, z: mesh.position.z, scale: 1 }
        this.group.mesh!.add(mesh)
        this.items.push(mesh)
      }

      introAnimation() {
        this.introTl = gsap.timeline()
        this.items.forEach((item, i) => {
          this.introTl.to(item.material.uniforms.uIntro, { value: 1, duration: 1.5, ease: 'power2.out' }, i * 0.05)
        })
      }

      mouseMove(e: MouseEvent) {
        this.mouse.prevX = this.mouse.x; this.mouse.prevY = this.mouse.y
        this.mouse.x = (e.clientX / this.viewport.width) * 2 - 1
        this.mouse.y = -(e.clientY / this.viewport.height) * 2 + 1
        this.pointer.x = (e.clientX / window.innerWidth) * 2 - 1
        this.pointer.y = -(e.clientY / window.innerHeight) * 2 + 1
      }

      onWheel(e: WheelEvent) { this.scroll.target += e.deltaY * 0.01 }

      updateItems() {
        this.mouse.vX = this.mouse.x - this.mouse.prevX
        this.mouse.vY = this.mouse.y - this.mouse.prevY
        this.items.forEach((item) => {
          const strength = 1 + Math.abs(this.mouse.vX * 10)
          const targetScale = Math.max(1, Math.min(1.3, 1 + this.mouse.vX * 5))
          item.userData.scale += (targetScale - item.userData.scale) * 0.1
          item.scale.x = item.userData.scale; item.scale.y = item.userData.scale
          item.material.uniforms.uTime.value = this.clock.getElapsedTime()
          item.material.uniforms.uRedFactor.value = 1.0 + this.mouse.vX * 10
          item.material.uniforms.uGreenFactor.value = 1.0 - this.mouse.vX * 2
          item.material.uniforms.uBlueFactor.value = 1.0 - this.mouse.vX * 10
          item.material.uniforms.uStrength.value = strength
          item.material.uniforms.uMouse.value.set(this.mouse.x, this.mouse.y)
        })
      }

      checkIntersection() {
        this.raycaster.setFromCamera(this.pointer, this.camera)
        const isHovering = this.raycaster.intersectObjects(this.group.mesh!.children, true).length > 0
        this.group.mesh!.children.forEach((child: any) => { this.setHover(child, isHovering) })
      }

      setHover(mesh: any, isHovering: boolean) {
        if (!mesh.isMesh) return
        const target = isHovering ? 1.0 : 0.0
        mesh.material.uniforms.uHover.value += (target - mesh.material.uniforms.uHover.value) * 0.1
        mesh.scale.set(mesh.userData.scale, mesh.userData.scale, 1)
      }

      updateScroll() {
        this.scroll.current += (this.scroll.target - this.scroll.current) * this.scroll.ease
        this.scroll.delta = this.scroll.target - this.scroll.current
        this.scroll.last = this.scroll.current
        this.items.forEach((item) => { item.position.x = item.userData.x - this.scroll.current })
      }

      render() {
        this.updateScroll(); this.updateItems(); this.checkIntersection()
        this.renderer.render(this.scene, this.camera)
        this.animFrameId = requestAnimationFrame(() => this.render())
      }

      start() { this.render() }

      addEventListeners() {
        this.onWheelBound = this.onWheel.bind(this)
        this.mouseMoveBound = this.mouseMove.bind(this)
        this.resizeBound = this.resize.bind(this)
        this.container.addEventListener('wheel', this.onWheelBound, { passive: true })
        window.addEventListener('mousemove', this.mouseMoveBound)
        window.addEventListener('resize', this.resizeBound)
      }

      onWheelBound: any; mouseMoveBound: any; resizeBound: any

      resize() {
        const width = window.innerWidth; const height = window.innerHeight
        this.viewport = { width, height }; this.settings.width = width; this.settings.height = height
        this.camera.aspect = width / height
        const fov = 2 * Math.atan(height / 2 / this.options.perspective) * (180 / Math.PI)
        this.camera.fov = fov; this.camera.updateProjectionMatrix()
        this.renderer.setSize(width, height)
      }

      dispose() {
        cancelAnimationFrame(this.animFrameId)
        this.container.removeEventListener('wheel', this.onWheelBound)
        window.removeEventListener('mousemove', this.mouseMoveBound)
        window.removeEventListener('resize', this.resizeBound)
        this.items.forEach((item) => {
          item.geometry.dispose(); item.material.dispose()
          if (item.material.uniforms.uTexture.value) item.material.uniforms.uTexture.value.dispose()
        })
        this.renderer.dispose()
        if (this.renderer.domElement.parentNode) this.renderer.domElement.parentNode.removeChild(this.renderer.domElement)
      }
    }

    const app = new GalleryApp(container, { itemCount: 12, imageSize: [400, 500], gutter: 60, curvature: 2, scrollSpeed: 0.05, perspective: 1200 })
    appRef.current = app

    const st = ScrollTrigger.create({
      trigger: container, start: 'top top', end: '+=15%', scrub: true,
      onUpdate: (self) => {
        const p = self.progress
        app.camera.fov = 2 * Math.atan(app.viewport.height / 2 / (app.options.perspective * (1 - p * 0.5))) * (180 / Math.PI)
        app.group.mesh!.scale.setScalar(1 - p * 0.1)
        container.style.opacity = String(1 - p * 0.7)
        app.camera.updateProjectionMatrix()
      },
    })

    const tl = gsap.timeline({ delay: 0.6 })
    tl.to([titleLine1Ref.current, titleLine2Ref.current], { y: 0, duration: 1.3, stagger: 0.14, ease: 'power3.out' })
    tl.to(subtitleRef.current,    { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' }, '-=0.85')
    tl.to(socialProofRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.6')
    tl.to(ctaRef.current,         { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5')
    tl.to(scrollIndicatorRef.current, { opacity: 1, duration: 0.6 }, '-=0.4')

    return () => { app.dispose(); st.kill(); tl.kill() }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile])

  const scrollToStory = () => {
    document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" ref={containerRef} className="relative min-h-[120vh] overflow-hidden" style={{ background: 'var(--charcoal)' }}>

      {/* Full-bleed background image at reduced opacity */}
      <div className="absolute inset-0 z-0">
        <img
          src="./images/gallery-5.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
          style={{ opacity: 0.28, filter: 'saturate(0.7) brightness(0.9)' }}
        />
        {/* Deep charcoal overlay for legibility */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(160deg, rgba(28,22,16,0.55) 0%, rgba(28,22,16,0.30) 50%, rgba(28,22,16,0.70) 100%)' }}
        />
      </div>

      {/* 3D Canvas -- desktop only */}
      {!isMobile ? (
        <div ref={canvasContainerRef} style={{ position: 'absolute', inset: 0, zIndex: 1 }} />
      ) : (
        /* Mobile: static image grid */
        <div className="absolute inset-0 z-[1] grid grid-cols-2 gap-1 p-1 opacity-40" aria-hidden="true">
          {['./images/gallery-1.jpg','./images/gallery-2.jpg','./images/gallery-3.jpg','./images/gallery-4.jpg'].map((src, i) => (
            <img key={i} src={src} alt="" className="w-full h-full object-cover" style={{ aspectRatio: '3/4' }} />
          ))}
        </div>
      )}

      {/* Gradient fade -- bottom */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(28,22,16,0.88) 0%, rgba(28,22,16,0) 45%)' }}
      />

      {/* Floating Petals */}
      <FloatingPetals />

      {/* Hero Copy */}
      <div
        className="relative z-[4] flex flex-col items-center justify-end min-h-[120vh] px-8"
        style={{ paddingBottom: '14vh' }}
      >
        {/* Main title */}
        <h1 className="text-display-xl text-center" style={{ color: 'rgba(253,250,244,0.96)' }}>
          <span className="line-reveal-wrap">
            <span ref={titleLine1Ref} className="line-reveal-inner" style={{ transform: 'translateY(110%)' }}>
              Where Love
            </span>
          </span>
          <span className="line-reveal-wrap">
            <span ref={titleLine2Ref} className="line-reveal-inner" style={{ transform: 'translateY(110%)' }}>
              Becomes Legacy
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-body text-center max-w-[500px] mt-7 opacity-0 translate-y-6"
          style={{ color: 'rgba(253,250,244,0.62)' }}
        >
          Fine-art wedding photography for couples who understand that extraordinary moments deserve to be preserved with extraordinary care.
        </p>

        {/* Social proof */}
        <p
          ref={socialProofRef}
          className="text-label text-center mt-5 opacity-0 translate-y-4"
          style={{ color: 'rgba(253,250,244,0.38)', fontStyle: 'normal' }}
        >
          Trusted by 400+ couples across Europe &amp; North America
        </p>

        {/* CTA */}
        <a
          ref={ctaRef}
          href="#story"
          onClick={(e) => { e.preventDefault(); scrollToStory() }}
          className="mt-10 opacity-0 translate-y-4 inline-block px-10 py-4 text-button"
          style={{
            border: '1px solid rgba(166,124,69,0.7)',
            color: 'var(--gold)',
            letterSpacing: '0.14em',
            textDecoration: 'none',
            transition: 'background 0.3s, color 0.3s, border-color 0.3s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--gold)'
            e.currentTarget.style.color = 'var(--ivory)'
            e.currentTarget.style.borderColor = 'var(--gold)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = 'var(--gold)'
            e.currentTarget.style.borderColor = 'rgba(166,124,69,0.7)'
          }}
        >
          Begin Your Journey
        </a>

        {/* Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
        >
          <div className="w-px h-10" style={{ background: 'rgba(166,124,69,0.5)' }} />
          <div className="scroll-indicator-dot w-1.5 h-1.5 rounded-full" style={{ background: 'var(--gold)' }} />
        </div>
      </div>
    </section>
  )
}
