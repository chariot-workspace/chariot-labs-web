import { Shield, GraduationCap, Sun, ArrowUpRight } from 'lucide-react'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { getSectionStyle } from '../utils/sectionLayout'

const products = [
  {
    id: 'security',
    tag: '01',
    icon: Shield,
    title: 'Security Operations SaaS',
    subtitle: 'Enterprise Command & Control',
    description:
      'A comprehensive management platform built for modern security firms. Oversee personnel deployment, real-time dispatch, shift scheduling, compliance tracking, and organizational workflows — all from a single pane of glass.',
    features: [
      'Real-time personnel tracking',
      'Automated dispatch & routing',
      'Compliance & reporting engine',
      'Multi-org hierarchy management',
    ],
    accentColor: '#3b82f6',
    gradientClass: 'gradient-text-cyan',
    glowClass: 'glow-cyan',
    visual: 'shield',
  },
  {
    id: 'education',
    tag: '02',
    icon: GraduationCap,
    title: 'School Management Ecosystem',
    subtitle: 'Intelligent Campus Operations',
    description:
      'A comprehensive platform that handles every dimension of school operations — from admissions and attendance to fee management and real-time administrative decisions. Designed to resolve institutional challenges dynamically, not statically.',
    features: [
      'Admissions & enrollment pipeline',
      'Smart attendance & timetabling',
      'Fee management & analytics',
      'Parent-teacher communication hub',
    ],
    accentColor: '#22c55e',
    gradientClass: 'gradient-text-violet',
    glowClass: 'glow-violet',
    visual: 'nodes',
  },
  {
    id: 'heliobeam',
    tag: '03',
    icon: Sun,
    title: 'Helio-Beam',
    subtitle: 'Predictive Solar Intelligence',
    description:
      'A high-precision ML application that forecasts power generation for solar plants with remarkable accuracy. Enables seamless automated reporting to State Load Despatch Centres (SLDC), eliminating grid deviation penalties entirely.',
    features: [
      'ML-powered generation forecasting',
      'Automated SLDC reporting',
      'Zero grid penalty achievement',
      'Real-time plant performance analytics',
    ],
    accentColor: '#f59e0b',
    gradientClass: 'gradient-text-amber',
    glowClass: 'glow-amber',
    visual: 'solar',
  },
]

function ProductVisual({ type, color }) {
  if (type === 'shield') {
    return (
      <svg width="100%" height="200" viewBox="0 0 400 200" fill="none" style={{ opacity: 0.5 }}>
        {/* Grid network */}
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={25 * i + 10}
            x2="400"
            y2={25 * i + 10}
            stroke={color}
            strokeWidth="0.5"
            opacity="0.15"
          />
        ))}
        {Array.from({ length: 16 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={25 * i + 10}
            y1="0"
            x2={25 * i + 10}
            y2="200"
            stroke={color}
            strokeWidth="0.5"
            opacity="0.15"
          />
        ))}
        {/* Shield nodes */}
        <circle cx="200" cy="80" r="40" stroke={color} strokeWidth="1" fill="none" opacity="0.3" />
        <circle cx="200" cy="80" r="25" stroke={color} strokeWidth="0.8" fill="none" opacity="0.4" />
        <circle cx="200" cy="80" r="6" fill={color} opacity="0.6" />
        {/* Connecting lines from center */}
        {[45, 90, 135, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180
          return (
            <g key={i}>
              <line
                x1="200"
                y1="80"
                x2={200 + Math.cos(rad) * 70}
                y2={80 + Math.sin(rad) * 70}
                stroke={color}
                strokeWidth="0.5"
                opacity="0.25"
              />
              <circle
                cx={200 + Math.cos(rad) * 70}
                cy={80 + Math.sin(rad) * 70}
                r="3"
                fill={color}
                opacity="0.4"
              />
            </g>
          )
        })}
      </svg>
    )
  }

  if (type === 'nodes') {
    return (
      <svg width="100%" height="200" viewBox="0 0 400 200" fill="none" style={{ opacity: 0.5 }}>
        {/* Interconnected nodes */}
        {[
          [80, 60], [160, 40], [240, 70], [320, 50],
          [60, 120], [140, 140], [220, 110], [300, 130],
          [120, 180], [200, 160], [280, 175], [350, 100],
        ].map(([cx, cy], i, arr) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r={i % 3 === 0 ? 6 : 4} fill={color} opacity={0.3 + (i % 3) * 0.15} />
            {i > 0 && (
              <line
                x1={arr[i - 1][0]}
                y1={arr[i - 1][1]}
                x2={cx}
                y2={cy}
                stroke={color}
                strokeWidth="0.5"
                opacity="0.2"
              />
            )}
            {i > 2 && (
              <line
                x1={arr[i - 3][0]}
                y1={arr[i - 3][1]}
                x2={cx}
                y2={cy}
                stroke={color}
                strokeWidth="0.3"
                opacity="0.12"
                strokeDasharray="4 4"
              />
            )}
          </g>
        ))}
        {/* Central hub */}
        <circle cx="200" cy="100" r="18" stroke={color} strokeWidth="0.8" fill="none" opacity="0.25" />
        <circle cx="200" cy="100" r="8" fill={color} opacity="0.15" />
      </svg>
    )
  }

  // Solar / energy visual
  return (
    <svg width="100%" height="200" viewBox="0 0 400 200" fill="none" style={{ opacity: 0.5 }}>
      {/* Sun rays */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180
        return (
          <line
            key={i}
            x1={200 + Math.cos(angle) * 25}
            y1={80 + Math.sin(angle) * 25}
            x2={200 + Math.cos(angle) * (55 + (i % 2) * 20)}
            y2={80 + Math.sin(angle) * (55 + (i % 2) * 20)}
            stroke={color}
            strokeWidth="1"
            opacity={0.2 + (i % 3) * 0.1}
          />
        )
      })}
      <circle cx="200" cy="80" r="20" fill={color} opacity="0.2" />
      <circle cx="200" cy="80" r="12" fill={color} opacity="0.3" />
      {/* Predictive curve */}
      <path
        d="M 40 170 Q 100 160 140 150 Q 180 140 220 120 Q 260 100 300 80 Q 340 60 370 40"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M 40 180 Q 100 175 140 168 Q 180 160 220 148 Q 260 135 300 120 Q 340 105 370 85"
        stroke={color}
        strokeWidth="0.8"
        fill="none"
        opacity="0.2"
        strokeDasharray="4 4"
      />
      {/* Data points on curve */}
      {[
        [100, 158], [160, 145], [220, 125], [280, 105], [340, 65],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3" fill={color} opacity={0.4 + i * 0.1} />
      ))}
    </svg>
  )
}

export default function ProductShowcase() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const layout = getSectionStyle('ecosystem', isMobile)

  return (
    <section
      id="ecosystem"
      className="section-padding ecosystem-section"
      style={{
        position: 'absolute',
        left: 0,
        width: '100%',
        top: layout.top,
        minHeight: layout.minHeight,
        padding: '80px 1.5rem',
        pointerEvents: 'none',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ marginBottom: '60px' }}>
          <div
            style={{
              fontFamily: '"Inter", system-ui',
              fontSize: '0.75rem',
              color: '#00f0ff',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '20px',
              fontWeight: 600,
            }}
          >
            The Ecosystem
          </div>
          <h2
            style={{
              fontFamily: '"Outfit", system-ui',
              fontWeight: 700,
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              lineHeight: 1.2,
              color: '#f1f5f9',
              letterSpacing: '-0.02em',
            }}
          >
            Three platforms.{' '}
            <span className="gradient-text">Three industries.</span>{' '}
            <span className="ecosystem-break" />
            One engineering philosophy.
          </h2>
        </div>

        {/* Product Cards */}
        <div className="product-cards-stack" style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`glass-strong product-card ${product.glowClass}`}
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                pointerEvents: 'auto',
                borderLeft: `2px solid ${product.accentColor}40`,
              }}
            >
              {/* Visual header */}
              <div className="product-card-visual" style={{
                paddingTop: '24px',
                overflow: 'hidden',
              }}>
                <ProductVisual type={product.visual} color={product.accentColor} />
              </div>

              {/* Content */}
              <div className="product-card-content">
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '16px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: '"Outfit", system-ui',
                      fontSize: '0.75rem',
                      color: product.accentColor,
                      fontWeight: 600,
                      opacity: 0.6,
                    }}
                  >
                    {product.tag}
                  </span>
                  <product.icon
                    size={20}
                    color={product.accentColor}
                    strokeWidth={1.5}
                  />
                </div>

                <h3
                  style={{
                    fontFamily: '"Outfit", system-ui',
                    fontWeight: 700,
                    fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
                    color: '#f1f5f9',
                    marginBottom: '6px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {product.title}
                </h3>

                <p
                  style={{
                    fontFamily: '"Outfit", system-ui',
                    fontSize: '0.9rem',
                    color: product.accentColor,
                    fontWeight: 500,
                    marginBottom: '16px',
                    opacity: 0.8,
                  }}
                >
                  {product.subtitle}
                </p>

                <p
                  style={{
                    fontFamily: '"Inter", system-ui',
                    fontSize: '0.95rem',
                    lineHeight: 1.7,
                    color: '#94a3b8',
                    marginBottom: '24px',
                  }}
                >
                  {product.description}
                </p>

                {/* Feature list */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '10px',
                    marginBottom: '24px',
                  }}
                >
                  {product.features.map((feature, fi) => (
                    <div
                      key={fi}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontFamily: '"Inter", system-ui',
                        fontSize: '0.85rem',
                        color: '#cbd5e1',
                      }}
                    >
                      <div
                        style={{
                          width: '5px',
                          height: '5px',
                          borderRadius: '50%',
                          background: product.accentColor,
                          flexShrink: 0,
                          opacity: 0.6,
                        }}
                      />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* CTA Link */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontFamily: '"Inter", system-ui',
                    fontSize: '0.85rem',
                    color: product.accentColor,
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'gap 0.3s ease',
                  }}
                >
                  Learn more <ArrowUpRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
