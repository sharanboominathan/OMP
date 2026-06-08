import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface LightboxProps {
  images: { src: string; caption: string }[]
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext }: LightboxProps) {
  const overlayRef  = useRef<HTMLDivElement>(null)
  const contentRef  = useRef<HTMLDivElement>(null)
  const captionRef  = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const tl = gsap.timeline()
    tl.fromTo(overlayRef.current,  { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' })
    tl.fromTo(contentRef.current,  { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out' }, '-=0.2')
    return () => { document.body.style.overflow = '' }
  }, [])

  // Animate image swap
  useEffect(() => {
    if (!contentRef.current) return
    gsap.fromTo(contentRef.current, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' })
  }, [currentIndex])

  const handleClose = useCallback(() => {
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.3, ease: 'power2.in',
      onComplete: onClose,
    })
  }, [onClose])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     handleClose()
      if (e.key === 'ArrowLeft')  onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleClose, onPrev, onNext])

  const img = images[currentIndex]

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: 'rgba(18,14,10,0.96)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${currentIndex + 1} of ${images.length}: ${img.caption}`}
    >
      {/* Close */}
      <button
        onClick={handleClose}
        className="absolute top-6 right-8 flex items-center gap-2 transition-colors z-10"
        style={{ color: 'rgba(253,250,244,0.45)' }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(253,250,244,0.9)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(253,250,244,0.45)')}
        aria-label="Close lightbox"
      >
        <span className="text-label" style={{ fontStyle: 'normal', fontSize: '0.65rem' }}>ESC</span>
        <X size={18} strokeWidth={1.2} />
      </button>

      {/* Counter */}
      <div
        className="absolute top-7 left-8 text-label"
        style={{ color: 'rgba(253,250,244,0.28)', fontStyle: 'normal', fontSize: '0.65rem' }}
      >
        {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
      </div>

      {/* Prev */}
      <button
        onClick={onPrev}
        className="absolute left-4 md:left-8 flex items-center justify-center w-12 h-12 transition-colors"
        style={{ color: 'rgba(253,250,244,0.4)' }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(253,250,244,0.9)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(253,250,244,0.4)')}
        aria-label="Previous image"
      >
        <ChevronLeft size={28} strokeWidth={1} />
      </button>

      {/* Image */}
      <div
        ref={contentRef}
        className="flex flex-col items-center px-20 md:px-24 w-full max-w-5xl"
        style={{ maxHeight: '90vh' }}
      >
        <div className="relative w-full" style={{ maxHeight: '78vh', overflow: 'hidden', borderRadius: '2px' }}>
          <img
            src={img.src}
            alt={img.caption}
            className="w-full h-full object-contain"
            style={{ maxHeight: '78vh', display: 'block' }}
          />
        </div>
        <p
          ref={captionRef}
          className="text-body-sm mt-5 text-center"
          style={{ color: 'rgba(253,250,244,0.45)', fontStyle: 'italic' }}
        >
          {img.caption}
        </p>
      </div>

      {/* Next */}
      <button
        onClick={onNext}
        className="absolute right-4 md:right-8 flex items-center justify-center w-12 h-12 transition-colors"
        style={{ color: 'rgba(253,250,244,0.4)' }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(253,250,244,0.9)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(253,250,244,0.4)')}
        aria-label="Next image"
      >
        <ChevronRight size={28} strokeWidth={1} />
      </button>

      {/* Thumbnail strip */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2"
        role="tablist"
        aria-label="Image thumbnails"
      >
        {images.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === currentIndex}
            aria-label={`Go to image ${i + 1}`}
            onClick={() => {}}
            className="transition-all duration-300"
            style={{
              width: i === currentIndex ? '24px' : '6px',
              height: '2px',
              background: i === currentIndex ? 'var(--gold)' : 'rgba(253,250,244,0.25)',
              borderRadius: '1px',
            }}
          />
        ))}
      </div>
    </div>
  )
}
