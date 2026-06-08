import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react'

function PinterestIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.853 0 1.267.641 1.267 1.408 0 .858-.546 2.141-.828 3.33-.236.995.499 1.806 1.476 1.806 1.771 0 3.134-1.867 3.134-4.562 0-2.386-1.716-4.054-4.165-4.054-2.837 0-4.502 2.128-4.502 4.327 0 .857.33 1.775.741 2.276a.3.3 0 0 1 .069.286c-.076.314-.244.995-.277 1.134-.044.183-.146.222-.337.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z" />
    </svg>
  )
}

const navLinks = [
  { label: 'Home',      href: '#hero'      },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Services',  href: '#services'  },
  { label: 'About',     href: '#story'     },
  { label: 'Contact',   href: '#contact'   },
]

const socialLinks = [
  { Icon: Instagram,     href: 'https://www.instagram.com/oncemorephotography', label: 'Instagram' },
  { Icon: Facebook,      href: 'https://www.facebook.com/oncemorephotography',  label: 'Facebook'  },
  { Icon: PinterestIcon, href: 'https://www.pinterest.com/oncemorephotography', label: 'Pinterest' },
  { Icon: Youtube,       href: 'https://www.youtube.com/@oncemorephotography',  label: 'YouTube'   },
]

export default function Footer() {
  const scrollToSection = (href: string) => {
    const el = document.getElementById(href.replace('#', ''))
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer style={{ background: 'var(--charcoal)' }}>

      {/* Top CTA band */}
      <div className="py-20 px-8 flex flex-col md:flex-row items-center justify-between gap-8 max-w-[1400px] mx-auto"
        style={{ borderBottom: '1px solid rgba(253,250,244,0.06)' }}>
        <div className="flex flex-col gap-2 text-center md:text-left">
          <span className="text-label" style={{ color: 'var(--gold)', fontStyle: 'normal' }}>
            Accepting bookings for 2025 &amp; 2026
          </span>
          <h2 className="font-display"
            style={{ fontSize: 'clamp(2rem,4.5vw,3.8rem)', fontWeight: 400, fontStyle: 'italic', color: 'rgba(253,250,244,0.88)', lineHeight: 1.05 }}>
            Let&apos;s tell your story.
          </h2>
        </div>
        <a href="#contact"
          onClick={(e) => { e.preventDefault(); scrollToSection('#contact') }}
          className="text-label px-10 py-4 transition-all duration-300 whitespace-nowrap"
          style={{ background: 'var(--gold)', color: 'var(--ivory)', textDecoration: 'none', fontStyle: 'normal', letterSpacing: '0.14em' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--deep-gold)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--gold)' }}>
          Book a Consultation
        </a>
      </div>

      {/* Main footer grid */}
      <div className="max-w-[1400px] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">

          {/* Brand column */}
          <div className="flex flex-col gap-4 md:col-span-2">
            <div className="flex flex-col gap-1">
              <span className="font-display text-heading-s"
                style={{ color: 'rgba(253,250,244,0.92)', letterSpacing: '0.06em', lineHeight: 1 }}>
                Once More
              </span>
              <span className="text-label"
                style={{ color: 'rgba(253,250,244,0.28)', fontStyle: 'italic', fontSize: '0.58rem', letterSpacing: '0.18em' }}>
                Fine-Art Wedding Photography
              </span>
            </div>
            <p className="text-body-sm"
              style={{ color: 'rgba(253,250,244,0.38)', maxWidth: '340px', lineHeight: 1.75 }}>
              Award-winning photography for couples who understand that extraordinary moments deserve extraordinary care. 15 years. 400+ weddings. 3 continents.
            </p>
            <div className="flex gap-4 mt-2">
              {socialLinks.map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="transition-colors duration-300"
                  style={{ color: 'rgba(253,250,244,0.35)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(253,250,244,0.35)')}>
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-3">
            <span className="text-label mb-2" style={{ color: 'rgba(253,250,244,0.28)', fontStyle: 'normal' }}>Explore</span>
            {navLinks.map((link) => (
              <a key={link.label} href={link.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href) }}
                className="text-body-sm transition-colors duration-300"
                style={{ color: 'rgba(253,250,244,0.42)', textDecoration: 'none' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(253,250,244,0.88)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(253,250,244,0.42)')}>
                {link.label}
              </a>
            ))}
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-3">
            <span className="text-label mb-2" style={{ color: 'rgba(253,250,244,0.28)', fontStyle: 'normal' }}>Get in Touch</span>
            <a href="tel:+12125550147"
              className="flex items-start gap-2.5 text-body-sm transition-colors duration-300"
              style={{ color: 'rgba(253,250,244,0.42)', textDecoration: 'none' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(253,250,244,0.42)')}>
              <Phone size={13} strokeWidth={1.5} style={{ marginTop: '2px', flexShrink: 0 }} />
              +1 212 555 0147
            </a>
            <a href="mailto:hello@oncemore.studio"
              className="flex items-start gap-2.5 text-body-sm transition-colors duration-300"
              style={{ color: 'rgba(253,250,244,0.42)', textDecoration: 'none' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(253,250,244,0.42)')}>
              <Mail size={13} strokeWidth={1.5} style={{ marginTop: '2px', flexShrink: 0 }} />
              hello@oncemore.studio
            </a>
            <div className="flex items-start gap-2.5 text-body-sm" style={{ color: 'rgba(253,250,244,0.28)' }}>
              <MapPin size={13} strokeWidth={1.5} style={{ marginTop: '2px', flexShrink: 0 }} />
              <span>127 West 24th St, Suite 4B<br />New York, NY 10011</span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom strip */}
      <div className="px-8 py-6 max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3"
        style={{ borderTop: '1px solid rgba(253,250,244,0.06)' }}>
        <p className="text-body-sm" style={{ color: 'rgba(253,250,244,0.22)' }}>
          &copy; 2025 Once More Photography. All rights reserved.
        </p>
        <p className="text-body-sm text-center"
          style={{ color: 'rgba(253,250,244,0.18)', fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif" }}>
          &ldquo;The bravest thing you can do is let someone else hold your memories.&rdquo;
        </p>
      </div>

    </footer>
  )
}
