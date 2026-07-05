import { useState } from 'react'
import { Mail, Send, MapPin, ArrowUpRight } from 'lucide-react'

export default function ContactFooter() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section
      id="contact"
      style={{
        position: 'absolute',
        top: '500vh',
        left: 0,
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px 1.5rem',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '60px',
          alignItems: 'start',
        }}
      >
        {/* Left - Info */}
        <div>
          <div
            style={{
              fontFamily: '"Inter", system-ui',
              fontSize: '0.75rem',
              color: '#f59e0b',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '20px',
              fontWeight: 600,
            }}
          >
            Get In Touch
          </div>
          <h2
            style={{
              fontFamily: '"Outfit", system-ui',
              fontWeight: 700,
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              lineHeight: 1.2,
              color: '#f1f5f9',
              marginBottom: '20px',
              letterSpacing: '-0.02em',
            }}
          >
            Let's build something{' '}
            <span className="gradient-text-amber">extraordinary</span>.
          </h2>
          <p
            style={{
              fontFamily: '"Inter", system-ui',
              fontSize: '1rem',
              lineHeight: 1.7,
              color: '#94a3b8',
              marginBottom: '32px',
              maxWidth: '420px',
            }}
          >
            Have a complex operational challenge? We'd love to hear about it.
            Whether you need AI-powered solutions, scalable platforms, or ML
            forecasting — we engineer it.
          </p>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <a
              href="mailto:hello@chariotlabs.in"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontFamily: '"Inter", system-ui',
                fontSize: '0.9rem',
                color: '#94a3b8',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                pointerEvents: 'auto',
              }}
            >
              <Mail size={16} color="#f59e0b" />
              hello@chariotlabs.in
            </a>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontFamily: '"Inter", system-ui',
                fontSize: '0.9rem',
                color: '#94a3b8',
              }}
            >
              <MapPin size={16} color="#f59e0b" />
              Noida, India
            </div>
          </div>
        </div>

        {/* Right - Form */}
        <div
          className="glass-strong"
          style={{
            borderRadius: '24px',
            padding: '36px',
            pointerEvents: 'auto',
          }}
        >
          {submitted ? (
            <div
              style={{
                textAlign: 'center',
                padding: '40px 0',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'rgba(34, 197, 94, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}
              >
                <Send size={24} color="#22c55e" />
              </div>
              <h3
                style={{
                  fontFamily: '"Outfit", system-ui',
                  fontWeight: 600,
                  fontSize: '1.3rem',
                  color: '#f1f5f9',
                  marginBottom: '8px',
                }}
              >
                Message sent!
              </h3>
              <p
                style={{
                  fontFamily: '"Inter", system-ui',
                  fontSize: '0.9rem',
                  color: '#94a3b8',
                }}
              >
                We'll get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '18px',
                }}
              >
                <div>
                  <label
                    htmlFor="contact-name"
                    style={{
                      fontFamily: '"Inter", system-ui',
                      fontSize: '0.8rem',
                      color: '#64748b',
                      marginBottom: '8px',
                      display: 'block',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    className="input-field"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    style={{
                      fontFamily: '"Inter", system-ui',
                      fontSize: '0.8rem',
                      color: '#64748b',
                      marginBottom: '8px',
                      display: 'block',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    className="input-field"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    style={{
                      fontFamily: '"Inter", system-ui',
                      fontSize: '0.8rem',
                      color: '#64748b',
                      marginBottom: '8px',
                      display: 'block',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    className="input-field"
                    placeholder="Tell us about your challenge..."
                    rows={4}
                    style={{ resize: 'vertical', minHeight: '100px' }}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                  Send Message
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          maxWidth: '1100px',
          margin: '80px auto 0',
          width: '100%',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          paddingTop: '32px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          {/* Logo */}
          <img
            src="/logo.jpg"
            alt="Chariot Labs Logo"
            width="24"
            height="24"
            style={{ borderRadius: '50%', objectFit: 'cover' }}
          />
          <span
            style={{
              fontFamily: '"Outfit", system-ui',
              fontWeight: 600,
              fontSize: '0.85rem',
              color: '#64748b',
              letterSpacing: '0.08em',
            }}
          >
            Chariot Labs
          </span>
        </div>

        <p
          style={{
            fontFamily: '"Inter", system-ui',
            fontSize: '0.8rem',
            color: '#475569',
          }}
        >
          © {new Date().getFullYear()} Chariot Labs · Noida, India. All rights reserved.
        </p>

        <div
          style={{
            display: 'flex',
            gap: '24px',
            pointerEvents: 'auto',
          }}
        >
          {['LinkedIn', 'Twitter', 'GitHub'].map((link) => (
            <a
              key={link}
              href="#"
              style={{
                fontFamily: '"Inter", system-ui',
                fontSize: '0.8rem',
                color: '#64748b',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#00f0ff')}
              onMouseLeave={(e) => (e.target.style.color = '#64748b')}
            >
              {link}
              <ArrowUpRight size={12} />
            </a>
          ))}
        </div>
      </footer>
    </section>
  )
}
