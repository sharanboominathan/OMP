import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router'

const navLinks = [
  { label: 'Home',      href: '#hero',      route: '/'          },
  { label: 'Portfolio', href: '#portfolio', route: '/'          },
  { label: 'Services',  href: '#services',  route: '/services'  },
  { label: 'About',     href: '#story',     route: '/about'     },
  { label: 'Contact',   href: '#contact',   route: '/contact'   },
]

const socialLinks = [
  { Icon: Instagram, href: 'https://www.instagram.com/oncemore.photography/',                    label: 'Instagram' },
  { Icon: Facebook,  href: 'https://www.facebook.com/Oncemorephotography/',                       label: 'Facebook'  },
  { Icon: Youtube,   href: 'https://www.youtube.com/channel/UC9SQjaJOBO3kRaie75kWRmg',             label: 'YouTube'   },
]

export default function Footer() {
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  const scrollToSection = (href: string) => {
    const el = document.getElementById(href.replace('#', ''))
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const handleNavClick = (href: string, route: string) => (e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault()
      scrollToSection(href)
    } else {
      e.preventDefault()
      navigate(route)
    }
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
        <Link to="/contact"
          onClick={handleNavClick('#contact', '/contact')}
          className="text-label px-10 py-4 transition-all duration-300 whitespace-nowrap"
          style={{ background: 'var(--gold)', color: 'var(--ivory)', textDecoration: 'none', fontStyle: 'normal', letterSpacing: '0.14em' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--deep-gold)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--gold)' }}>
          Book a Consultation
        </Link>
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
              Wedding photography for couples who understand that extraordinary moments deserve extraordinary care. 7+ years of experience. 750+ weddings captured.
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
              <Link key={link.label} to={link.route}
                onClick={handleNavClick(link.href, link.route)}
                className="text-body-sm transition-colors duration-300"
                style={{ color: 'rgba(253,250,244,0.42)', textDecoration: 'none' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(253,250,244,0.88)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(253,250,244,0.42)')}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-3">
            <span className="text-label mb-2" style={{ color: 'rgba(253,250,244,0.28)', fontStyle: 'normal' }}>Get in Touch</span>
            <a href="tel:+919677006647"
              className="flex items-start gap-2.5 text-body-sm transition-colors duration-300"
              style={{ color: 'rgba(253,250,244,0.42)', textDecoration: 'none' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(253,250,244,0.42)')}>
              <Phone size={13} strokeWidth={1.5} style={{ marginTop: '2px', flexShrink: 0 }} />
              +91 96770 06647
            </a>
            <a href="mailto:oncemorephotography@gmail.com"
              className="flex items-start gap-2.5 text-body-sm transition-colors duration-300"
              style={{ color: 'rgba(253,250,244,0.42)', textDecoration: 'none' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(253,250,244,0.42)')}>
              <Mail size={13} strokeWidth={1.5} style={{ marginTop: '2px', flexShrink: 0 }} />
              oncemorephotography@gmail.com
            </a>
            <div className="flex items-start gap-2.5 text-body-sm" style={{ color: 'rgba(253,250,244,0.28)' }}>
              <MapPin size={13} strokeWidth={1.5} style={{ marginTop: '2px', flexShrink: 0 }} />
              <span>Anna Nagar, Chennai<br />Tamil Nadu, India</span>
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
