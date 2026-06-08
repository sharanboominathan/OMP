import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Instagram, Facebook, MapPin, Mail, Phone, ChevronRight, ChevronLeft, Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// ── Floating label input ────────────────────────────────────────────────────
function Field({
  label, type = 'text', value, onChange, placeholder, required, hint, optional
}: {
  label: string
  type?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  required?: boolean
  hint?: string
  optional?: boolean
}) {
  const [focused, setFocused] = useState(false)
  const active = focused || value.length > 0
  return (
    <div className="relative pt-6">
      <label
        className="absolute left-0 pointer-events-none transition-all duration-300"
        style={{
          top:           active ? '0px' : '24px',
          fontSize:      active ? '0.6rem' : '0.875rem',
          color:         focused ? 'var(--gold)' : 'rgba(28,22,16,0.38)',
          letterSpacing: active ? '0.12em' : '0.01em',
          fontFamily:    "'Inter', sans-serif",
          textTransform: active ? 'uppercase' : 'none',
          fontWeight:    active ? 500 : 400,
        }}
      >
        {label}{optional && <span style={{ opacity: 0.5 }}> (optional)</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        placeholder={active ? (placeholder ?? '') : ''}
        className="w-full bg-transparent py-3 focus:outline-none"
        style={{
          borderBottom: `1px solid ${focused ? 'var(--gold)' : 'rgba(28,22,16,0.12)'}`,
          color: 'var(--charcoal)',
          fontSize: '0.95rem',
          transition: 'border-color 0.3s',
        }}
      />
      {hint && (
        <p className="mt-1.5" style={{ fontSize: '0.68rem', color: 'rgba(28,22,16,0.3)', fontStyle: 'italic' }}>
          {hint}
        </p>
      )}
    </div>
  )
}

// ── Floating label select ───────────────────────────────────────────────────
function SelectField({
  label, value, onChange, options, required
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
  required?: boolean
}) {
  const [focused, setFocused] = useState(false)
  const active = focused || value.length > 0
  return (
    <div className="relative pt-6">
      <label
        className="absolute left-0 pointer-events-none transition-all duration-300"
        style={{
          top:           active ? '0px' : '24px',
          fontSize:      active ? '0.6rem' : '0.875rem',
          color:         focused ? 'var(--gold)' : 'rgba(28,22,16,0.38)',
          letterSpacing: active ? '0.12em' : '0.01em',
          fontFamily:    "'Inter', sans-serif",
          textTransform: active ? 'uppercase' : 'none',
          fontWeight:    active ? 500 : 400,
        }}
      >
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className="w-full bg-transparent py-3 focus:outline-none appearance-none cursor-pointer"
        style={{
          borderBottom: `1px solid ${focused ? 'var(--gold)' : 'rgba(28,22,16,0.12)'}`,
          color: value ? 'var(--charcoal)' : 'transparent',
          fontSize: '0.95rem',
          transition: 'border-color 0.3s',
        }}
      >
        <option value="" disabled />
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  )
}

// ── Floating textarea ───────────────────────────────────────────────────────
function TextareaField({
  label, value, onChange, required, hint, rows = 4
}: {
  label: string
  value: string
  onChange: (v: string) => void
  required?: boolean
  hint?: string
  rows?: number
}) {
  const [focused, setFocused] = useState(false)
  const active = focused || value.length > 0
  return (
    <div className="relative pt-6">
      <label
        className="absolute left-0 pointer-events-none transition-all duration-300"
        style={{
          top:           active ? '0px' : '24px',
          fontSize:      active ? '0.6rem' : '0.875rem',
          color:         focused ? 'var(--gold)' : 'rgba(28,22,16,0.38)',
          letterSpacing: active ? '0.12em' : '0.01em',
          fontFamily:    "'Inter', sans-serif",
          textTransform: active ? 'uppercase' : 'none',
          fontWeight:    active ? 500 : 400,
        }}
      >
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        rows={rows}
        className="w-full bg-transparent py-3 focus:outline-none resize-none"
        style={{
          borderBottom: `1px solid ${focused ? 'var(--gold)' : 'rgba(28,22,16,0.12)'}`,
          color: 'var(--charcoal)',
          fontSize: '0.95rem',
          transition: 'border-color 0.3s',
        }}
      />
      <div className="flex items-start justify-between mt-1.5">
        {hint && <p style={{ fontSize: '0.68rem', color: 'rgba(28,22,16,0.3)', fontStyle: 'italic' }}>{hint}</p>}
        <p className="ml-auto" style={{ fontSize: '0.62rem', color: value.length > 20 ? 'var(--gold)' : 'rgba(28,22,16,0.2)' }}>
          {value.length} chars
        </p>
      </div>
    </div>
  )
}

// ── Step indicator ──────────────────────────────────────────────────────────
function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <div
            className="flex items-center justify-center transition-all duration-400"
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: i < current ? 'var(--gold)' : i === current ? 'transparent' : 'transparent',
              border: `1px solid ${i <= current ? 'var(--gold)' : 'rgba(28,22,16,0.15)'}`,
              flexShrink: 0,
            }}
          >
            {i < current ? (
              <Check size={13} strokeWidth={2} style={{ color: 'var(--ivory)' }} />
            ) : (
              <span style={{
                fontSize: '0.65rem',
                color: i === current ? 'var(--gold)' : 'rgba(28,22,16,0.3)',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
              }}>
                {i + 1}
              </span>
            )}
          </div>
          {i < total - 1 && (
            <div
              style={{
                width: '40px',
                height: '1px',
                background: i < current ? 'var(--gold)' : 'rgba(28,22,16,0.1)',
                transition: 'background 0.4s',
              }}
            />
          )}
        </div>
      ))}
      <span
        className="ml-2"
        style={{ fontSize: '0.65rem', color: 'rgba(28,22,16,0.35)', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase', letterSpacing: '0.1em' }}
      >
        {['About You', 'Your Wedding', 'Your Vision'][current]} &mdash; Step {current + 1} of {total}
      </span>
    </div>
  )
}

// ── Main component ──────────────────────────────────────────────────────────
type FormData = {
  name: string; email: string; phone: string
  date: string; venue: string; guestCount: string; package: string; budget: string
  vision: string; referral: string
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef   = useRef<HTMLSpanElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef     = useRef<HTMLParagraphElement>(null)
  const formRef    = useRef<HTMLDivElement>(null)
  const infoRef    = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const [form, setForm] = useState<FormData>({
    name: '', email: '', phone: '',
    date: '', venue: '', guestCount: '', package: '', budget: '',
    vision: '', referral: '',
  })
  const set = (k: keyof FormData) => (v: string) => setForm((p) => ({ ...p, [k]: v }))

  useEffect(() => {
    const ctx = gsap.context(() => {
      ;[labelRef, headingRef, subRef].forEach((ref, i) => {
        if (!ref.current) return
        gsap.fromTo(ref.current, { opacity: 0, y: 20 + i * 10 }, {
          opacity: 1, y: 0, duration: 0.8 + i * 0.15, delay: i * 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%', toggleActions: 'play none none none' },
        })
      })
      ;[formRef.current, infoRef.current].forEach((el, i) => {
        if (!el) return
        gsap.fromTo(el, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 1.0, delay: 0.3 + i * 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Animate step transition
  const goStep = (next: number) => {
    if (!formRef.current) return
    gsap.to(formRef.current, {
      opacity: 0, x: -24, duration: 0.22, ease: 'power2.in',
      onComplete: () => {
        setStep(next)
        gsap.fromTo(formRef.current, { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' })
      },
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const canAdvanceStep1 = form.name.trim() && form.email.trim()
  const canAdvanceStep2 = true // optional fields
  const canSubmit = form.vision.trim().length >= 20

  return (
    <section id="contact" ref={sectionRef} className="py-0 overflow-hidden" style={{ background: 'var(--ivory)' }}>

      {/* Header band */}
      <div
        className="py-24 px-8 text-center"
        style={{ background: 'var(--charcoal)', borderBottom: '1px solid rgba(166,124,69,0.18)' }}
      >
        <span ref={labelRef} className="text-label opacity-0 block" style={{ color: 'var(--gold)' }}>
          Begin Your Story
        </span>
        <h2 ref={headingRef} className="text-display-l mt-6 opacity-0" style={{ color: 'rgba(253,250,244,0.96)' }}>
          Reserve Your Date
        </h2>
        <p
          ref={subRef}
          className="text-body max-w-[520px] mx-auto mt-5 opacity-0"
          style={{ color: 'rgba(253,250,244,0.46)', lineHeight: '1.85', fontStyle: 'italic' }}
        >
          We accept only 12 weddings each year. 2025 is fully booked.
          2026 has limited availability. Complete the enquiry form and we will be in touch within 24 hours.
        </p>
      </div>

      {/* Two-column body */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_400px]" style={{ minHeight: '720px' }}>

        {/* Form panel */}
        <div className="py-16 px-8 md:px-14 lg:px-20" style={{ background: 'var(--ivory)' }}>

          {submitted ? (
            /* Success state */
            <div className="flex flex-col items-start justify-center h-full gap-7 py-16 max-w-[480px]">
              <div
                className="flex items-center justify-center"
                style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(166,124,69,0.1)', border: '1px solid rgba(166,124,69,0.3)' }}
              >
                <Check size={22} strokeWidth={1.5} style={{ color: 'var(--gold)' }} />
              </div>
              <div className="gold-rule" style={{ width: '48px' }} />
              <h3
                className="font-display"
                style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontStyle: 'italic', fontWeight: 500, color: 'var(--charcoal)', lineHeight: 1.1 }}
              >
                Your enquiry<br />is with us.
              </h3>
              <p className="text-body" style={{ color: 'rgba(28,22,16,0.52)', lineHeight: '1.85', maxWidth: '420px' }}>
                Thank you, <strong style={{ fontWeight: 500, color: 'var(--charcoal)' }}>{form.name.split(' ')[0]}</strong>.
                We have received your message and will reply to <em>{form.email}</em> within 24 hours.
                In the meantime, browse our latest work on Instagram.
              </p>
              <div className="flex flex-col gap-3 mt-2">
                <p className="text-label" style={{ color: 'rgba(28,22,16,0.3)', fontStyle: 'normal' }}>What happens next</p>
                {[
                  'We review your date and confirm availability',
                  'A personal call to understand your vision',
                  'A bespoke proposal sent within 48 hours',
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span
                      className="shrink-0 flex items-center justify-center"
                      style={{ width: '20px', height: '20px', borderRadius: '50%', border: '1px solid rgba(166,124,69,0.4)', fontSize: '0.6rem', color: 'var(--gold)', fontFamily: "'Inter', sans-serif" }}
                    >
                      {i + 1}
                    </span>
                    <p className="text-body-sm" style={{ color: 'rgba(28,22,16,0.5)', lineHeight: '1.6' }}>{step}</p>
                  </div>
                ))}
              </div>
              <button
                className="text-label mt-2"
                style={{ color: 'rgba(28,22,16,0.3)', fontStyle: 'normal', letterSpacing: '0.1em', background: 'none', border: 'none', cursor: 'pointer' }}
                onClick={() => { setSubmitted(false); setStep(0); setForm({ name:'',email:'',phone:'',date:'',venue:'',guestCount:'',package:'',budget:'',vision:'',referral:'' }) }}
              >
                Submit another enquiry &rarr;
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-[520px]">
              <StepIndicator current={step} total={3} />

              <div ref={formRef}>
                {/* ── Step 1: About You ── */}
                {step === 0 && (
                  <div className="flex flex-col gap-7">
                    <div>
                      <h3 className="font-display text-charcoal" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontStyle: 'italic', fontWeight: 400, marginBottom: '4px' }}>
                        Tell us about yourself
                      </h3>
                      <p className="text-body-sm" style={{ color: 'rgba(28,22,16,0.38)' }}>
                        We would love to know who we are speaking with.
                      </p>
                    </div>

                    <Field
                      label="Your Full Name"
                      value={form.name}
                      onChange={set('name')}
                      placeholder="e.g. Olivia & James Harrison"
                      hint="Include both names if you are enquiring as a couple"
                      required
                    />
                    <Field
                      label="Email Address"
                      type="email"
                      value={form.email}
                      onChange={set('email')}
                      placeholder="your@email.com"
                      hint="We will never share your details with third parties"
                      required
                    />
                    <Field
                      label="Phone Number"
                      type="tel"
                      value={form.phone}
                      onChange={set('phone')}
                      placeholder="+1 (212) 000-0000"
                      hint="Optional — for our introductory call if you prefer to speak"
                      optional
                    />

                    <div className="flex items-center justify-between mt-4">
                      <p className="text-body-sm" style={{ color: 'rgba(28,22,16,0.28)', fontStyle: 'italic' }}>
                        All information is kept strictly confidential.
                      </p>
                      <button
                        type="button"
                        disabled={!canAdvanceStep1}
                        onClick={() => canAdvanceStep1 && goStep(1)}
                        className="inline-flex items-center gap-2 text-button px-8 py-3.5 transition-all duration-300"
                        style={{
                          background: canAdvanceStep1 ? 'var(--charcoal)' : 'rgba(28,22,16,0.1)',
                          color: canAdvanceStep1 ? 'rgba(253,250,244,0.92)' : 'rgba(28,22,16,0.3)',
                          letterSpacing: '0.12em',
                          cursor: canAdvanceStep1 ? 'pointer' : 'not-allowed',
                        }}
                        onMouseEnter={(e) => { if (canAdvanceStep1) { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--ivory)' } }}
                        onMouseLeave={(e) => { if (canAdvanceStep1) { e.currentTarget.style.background = 'var(--charcoal)'; e.currentTarget.style.color = 'rgba(253,250,244,0.92)' } }}
                      >
                        Continue <ChevronRight size={15} strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                )}

                {/* ── Step 2: Your Wedding ── */}
                {step === 1 && (
                  <div className="flex flex-col gap-7">
                    <div>
                      <h3 className="font-display text-charcoal" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontStyle: 'italic', fontWeight: 400, marginBottom: '4px' }}>
                        Tell us about your day
                      </h3>
                      <p className="text-body-sm" style={{ color: 'rgba(28,22,16,0.38)' }}>
                        The more detail you share, the better we can personalise our response.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                      <Field
                        label="Wedding Date"
                        type="date"
                        value={form.date}
                        onChange={set('date')}
                        hint="Even an approximate month/year helps"
                      />
                      <Field
                        label="Venue or Destination"
                        value={form.venue}
                        onChange={set('venue')}
                        placeholder="e.g. Villa Antinori, Tuscany"
                        hint="Domestic or international"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                      <SelectField
                        label="Guest Count"
                        value={form.guestCount}
                        onChange={set('guestCount')}
                        options={[
                          { value: 'intimate', label: 'Intimate (under 30)' },
                          { value: 'small',    label: 'Small (30 to 75)' },
                          { value: 'medium',   label: 'Medium (75 to 150)' },
                          { value: 'large',    label: 'Large (150+)' },
                        ]}
                      />
                      <SelectField
                        label="Package Interest"
                        value={form.package}
                        onChange={set('package')}
                        options={[
                          { value: 'photo',       label: 'Photography only' },
                          { value: 'film',        label: 'Film only' },
                          { value: 'both',        label: 'Photography + Film' },
                          { value: 'engagement',  label: 'Engagement session' },
                          { value: 'unsure',      label: 'Not sure yet' },
                        ]}
                      />
                    </div>

                    <SelectField
                      label="Approximate Budget"
                      value={form.budget}
                      onChange={set('budget')}
                      options={[
                        { value: '5-8k',   label: '$5,000 to $8,000' },
                        { value: '8-12k',  label: '$8,000 to $12,000' },
                        { value: '12-18k', label: '$12,000 to $18,000' },
                        { value: '18k+',   label: '$18,000+' },
                        { value: 'open',   label: 'Open to discussion' },
                      ]}
                    />

                    <div className="flex items-center justify-between mt-4">
                      <button
                        type="button"
                        onClick={() => goStep(0)}
                        className="inline-flex items-center gap-2 text-label transition-colors"
                        style={{ color: 'rgba(28,22,16,0.35)', background: 'none', border: 'none', cursor: 'pointer', fontStyle: 'normal', letterSpacing: '0.08em' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--charcoal)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(28,22,16,0.35)')}
                      >
                        <ChevronLeft size={14} strokeWidth={1.5} /> Back
                      </button>
                      <button
                        type="button"
                        onClick={() => goStep(2)}
                        className="inline-flex items-center gap-2 text-button px-8 py-3.5 transition-all duration-300"
                        style={{ background: 'var(--charcoal)', color: 'rgba(253,250,244,0.92)', letterSpacing: '0.12em', cursor: 'pointer' }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--ivory)' }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--charcoal)'; e.currentTarget.style.color = 'rgba(253,250,244,0.92)' }}
                      >
                        Continue <ChevronRight size={15} strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                )}

                {/* ── Step 3: Your Vision ── */}
                {step === 2 && (
                  <div className="flex flex-col gap-7">
                    <div>
                      <h3 className="font-display text-charcoal" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontStyle: 'italic', fontWeight: 400, marginBottom: '4px' }}>
                        Describe your vision
                      </h3>
                      <p className="text-body-sm" style={{ color: 'rgba(28,22,16,0.38)' }}>
                        This is the most important part. We read every word carefully.
                      </p>
                    </div>

                    <TextareaField
                      label="Your Vision & Story"
                      value={form.vision}
                      onChange={set('vision')}
                      required
                      rows={6}
                      hint="What matters most to you? What feeling do you want your photographs to hold? Tell us anything — your relationship, your venue, the atmosphere you are creating."
                    />

                    <SelectField
                      label="How did you hear about us?"
                      value={form.referral}
                      onChange={set('referral')}
                      options={[
                        { value: 'instagram',  label: 'Instagram' },
                        { value: 'google',     label: 'Google search' },
                        { value: 'referral',   label: 'Friend or family referral' },
                        { value: 'planner',    label: 'Wedding planner' },
                        { value: 'magazine',   label: 'Magazine or press feature' },
                        { value: 'other',      label: 'Other' },
                      ]}
                    />

                    <div
                      className="flex items-start gap-3 p-4"
                      style={{ background: 'rgba(166,124,69,0.06)', border: '1px solid rgba(166,124,69,0.15)', borderRadius: '2px' }}
                    >
                      <div className="shrink-0 mt-0.5">
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold)', marginTop: '6px' }} />
                      </div>
                      <p className="text-body-sm" style={{ color: 'rgba(28,22,16,0.48)', lineHeight: '1.7' }}>
                        By sending this enquiry you agree that Once More Photography may store your details
                        to respond to your message. We do not share data with third parties. You may request
                        deletion at any time by emailing us directly.
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <button
                        type="button"
                        onClick={() => goStep(1)}
                        className="inline-flex items-center gap-2 text-label transition-colors"
                        style={{ color: 'rgba(28,22,16,0.35)', background: 'none', border: 'none', cursor: 'pointer', fontStyle: 'normal', letterSpacing: '0.08em' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--charcoal)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(28,22,16,0.35)')}
                      >
                        <ChevronLeft size={14} strokeWidth={1.5} /> Back
                      </button>
                      <button
                        type="submit"
                        disabled={!canSubmit}
                        className="inline-flex items-center gap-2 text-button px-10 py-3.5 transition-all duration-300"
                        style={{
                          background: canSubmit ? 'var(--charcoal)' : 'rgba(28,22,16,0.1)',
                          color: canSubmit ? 'rgba(253,250,244,0.92)' : 'rgba(28,22,16,0.3)',
                          letterSpacing: '0.12em',
                          cursor: canSubmit ? 'pointer' : 'not-allowed',
                        }}
                        onMouseEnter={(e) => { if (canSubmit) { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--ivory)' } }}
                        onMouseLeave={(e) => { if (canSubmit) { e.currentTarget.style.background = 'var(--charcoal)'; e.currentTarget.style.color = 'rgba(253,250,244,0.92)' } }}
                      >
                        Send Enquiry <Check size={14} strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </form>
          )}
        </div>

        {/* Info sidebar */}
        <div
          ref={infoRef}
          className="py-16 px-10 opacity-0 flex flex-col justify-between"
          style={{ background: 'var(--charcoal)' }}
        >
          <div className="flex flex-col gap-10">

            <div>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                className="font-display text-heading-s block mb-1"
                style={{ color: 'rgba(253,250,244,0.92)', letterSpacing: '0.06em', textDecoration: 'none' }}
              >
                Once More
              </a>
              <span className="text-label" style={{ color: 'rgba(166,124,69,0.65)', fontStyle: 'italic', fontSize: '0.62rem' }}>
                Fine-Art Wedding Photography
              </span>
            </div>

            {/* What to expect */}
            <div className="flex flex-col gap-5">
              <p className="text-label" style={{ color: 'rgba(253,250,244,0.28)', fontStyle: 'normal', letterSpacing: '0.12em' }}>
                What happens next
              </p>
              {[
                { n: '01', title: 'We review your date', body: 'We check availability and review your enquiry in full before responding.' },
                { n: '02', title: 'A personal call', body: 'We schedule a 30-minute call to understand your vision and answer your questions.' },
                { n: '03', title: 'Your bespoke proposal', body: 'A tailored quote and creative brief, delivered within 48 hours of our call.' },
              ].map(({ n, title, body }) => (
                <div key={n} className="flex gap-4">
                  <span
                    className="shrink-0 font-display"
                    style={{ fontSize: '0.68rem', color: 'rgba(166,124,69,0.5)', marginTop: '3px', fontStyle: 'italic', minWidth: '22px' }}
                  >
                    {n}
                  </span>
                  <div>
                    <p className="text-body-sm" style={{ color: 'rgba(253,250,244,0.75)', fontWeight: 500, marginBottom: '2px' }}>{title}</p>
                    <p className="text-body-sm" style={{ color: 'rgba(253,250,244,0.35)', lineHeight: '1.65' }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-px" style={{ background: 'rgba(253,250,244,0.07)' }} />

            {/* Contact details */}
            <div className="flex flex-col gap-5">
              {[
                { icon: MapPin, text: '127 West 24th Street, Suite 4B\nNew York, NY 10011', href: null },
                { icon: Mail,   text: 'hello@oncemore.studio', href: 'mailto:hello@oncemore.studio' },
                { icon: Phone,  text: '+1 (212) 555-0147', href: 'tel:+12125550147' },
              ].map(({ icon: Icon, text, href }, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <Icon size={14} strokeWidth={1.4} style={{ color: 'var(--gold)', marginTop: '3px', flexShrink: 0 }} />
                  {href ? (
                    <a href={href} className="text-body-sm transition-colors" style={{ color: 'rgba(253,250,244,0.55)', textDecoration: 'none', lineHeight: '1.65' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(253,250,244,0.55)')}
                    >{text}</a>
                  ) : (
                    <p className="text-body-sm" style={{ color: 'rgba(253,250,244,0.55)', lineHeight: '1.65', whiteSpace: 'pre-line' }}>{text}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="h-px" style={{ background: 'rgba(253,250,244,0.07)' }} />

            <div className="flex gap-5">
              {[Instagram, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex items-center gap-2 text-body-sm transition-colors"
                  style={{ color: 'rgba(253,250,244,0.3)', textDecoration: 'none' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(253,250,244,0.3)')}
                >
                  <Icon size={15} strokeWidth={1.4} />
                </a>
              ))}
            </div>
          </div>

          {/* Editorial image */}
          <div className="mt-10 overflow-hidden" style={{ borderRadius: '2px' }}>
            <img
              src="/images/contact-editorial.jpg"
              alt="Studio editorial"
              className="w-full object-cover"
              style={{ aspectRatio: '4/3', display: 'block', opacity: 0.6 }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
