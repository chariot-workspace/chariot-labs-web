import { Users, MapPin, Cpu, Zap } from 'lucide-react'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { getSectionStyle } from '../utils/sectionLayout'

const stats = [
  { icon: Cpu, label: 'Products Shipped', value: '3+' },
  { icon: Users, label: 'Industries Served', value: '3' },
  { icon: Zap, label: 'Uptime SLA', value: '99.9%' },
  { icon: MapPin, label: 'Based In', value: 'Noida' },
]

export default function AboutSection() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const layout = getSectionStyle('about', isMobile)

  return (
    <section
      id="about"
      className="section-padding about-section"
      style={{
        position: 'absolute',
        left: 0,
        width: '100%',
        top: layout.top,
        minHeight: layout.minHeight,
        display: 'flex',
        alignItems: isMobile ? 'flex-start' : 'center',
        justifyContent: 'center',
        padding: '80px 1.5rem',
        pointerEvents: 'none',
      }}
    >
      <div style={{ maxWidth: '1100px', width: '100%' }}>
        {/* Section Tag */}
        <div
          style={{
            fontFamily: '"Inter", system-ui',
            fontSize: '0.75rem',
            color: '#8b5cf6',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '20px',
            fontWeight: 600,
          }}
        >
          About Us
        </div>

        {/* Main statement */}
        <h2
          style={{
            fontFamily: '"Outfit", system-ui',
            fontWeight: 700,
            fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
            lineHeight: 1.2,
            color: '#f1f5f9',
            marginBottom: '24px',
            letterSpacing: '-0.02em',
          }}
        >
          Founded in{' '}
          <span className="gradient-text-violet">Noida</span> by engineers{' '}
          <span className="about-break" />
          who believe in{' '}
          <span className="gradient-text-cyan">building what matters</span>.
        </h2>

        {/* Description */}
        <p
          style={{
            fontFamily: '"Inter", system-ui',
            fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
            lineHeight: 1.8,
            color: '#94a3b8',
            maxWidth: '700px',
            marginBottom: '48px',
          }}
        >
          Chariot Labs was started with a singular focus: engineer solutions that
          eliminate operational friction. We don't build for demos — we build for
          production at scale. Every line of code is designed to solve real problems
          for real organizations, from enterprise security to education to renewable
          energy forecasting.
        </p>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="glass product-card"
              style={{
                padding: '28px 24px',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <stat.icon size={22} color="#8b5cf6" strokeWidth={1.5} />
              <div
                style={{
                  fontFamily: '"Outfit", system-ui',
                  fontWeight: 700,
                  fontSize: '1.8rem',
                  color: '#f1f5f9',
                  letterSpacing: '-0.02em',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: '"Inter", system-ui',
                  fontSize: '0.8rem',
                  color: '#64748b',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
