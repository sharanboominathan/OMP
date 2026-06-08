import { Instagram, Facebook } from 'lucide-react'

const navLinks = [
  { label: 'Home',      href: '#hero' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Services',  href: '#services' },
  { label: 'About',     href: '#story' },
  { label: 'Contact',   href: '#contact' },
]

export default function Footer() {
  const scrollToSection = (href: string) => {
    const el = document.getElementById(href.replace('#', ''))
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="py-[72px]" style={{ background: 'var(--charcoal)' }}>
      <div className="max-w-[1400px] mx-auto px-8">

        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Wordmark */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              className="font-display text-heading-s"
              style={{ color: 'rgba(253,250,244,0.92)', letterSpacing: '0.06em' }}
            >
              Once More
            </a>
            <span className="text-label" style={{ color: 'rgba(253,250,244,0.28)', fontStyle: 'italic', fontSize: '0.65rem' }}>
              Fine-Art Wedding Photography
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6 md:gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href) }}
                className="text-body-sm transition-colors"
                style={{ color: 'rgba(253,250,244,0.45)', textDecoration: 'none' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(253,250,244,0.9)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(253,250,244,0.45)')}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="flex gap-4">
              {[Instagram, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="transition-colors"
                  style={{ color: 'rgba(253,250,244,0.4)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(253,250,244,0.9)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(253,250,244,0.4)')}
                >
                  <Icon size={19} strokeWidth={1.4} />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="mt-10 mb-8 h-px" style={{ background: 'rgba(253,250,244,0.08)' }} />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-body-sm" style={{ color: 'rgba(253,250,244,0.28)' }}>
            &copy; 2025 Once More Photography. All rights reserved.
          </p>
          <p
            className="text-body-sm text-center"
            style={{ color: 'rgba(253,250,244,0.2)', fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif" }}
          >
            &ldquo;The bravest thing you can do is let someone else hold your memories.&rdquo;
          </p>
        </div>

      </div>
    </footer>
  )
}
