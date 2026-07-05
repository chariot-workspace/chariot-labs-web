import { ArrowDown, Sparkles } from 'lucide-react'
import { scrollToSection } from '../utils/scrollTo'

export default function HeroOverlay() {
  return (
    <section
      id="hero"
      className="hero-section"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 1.5rem',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          maxWidth: '900px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '28px',
        }}
      >
        {/* Badge */}
        <div
          className="glass animate-fade-up badge-glow"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 20px',
            borderRadius: '999px',
            fontSize: '0.8rem',
            fontFamily: '"Inter", system-ui',
            color: '#94a3b8',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            pointerEvents: 'auto',
          }}
        >
          <Sparkles size={14} color="#00f0ff" />
          AI-Powered Engineering
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-up hero-title"
          style={{
            fontFamily: '"Outfit", system-ui',
            fontWeight: 800,
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            color: '#f1f5f9',
            animationDelay: '0.15s',
            animationFillMode: 'both',
          }}
        >
          We Engineer{' '}
          <span className="gradient-text shimmer-text">Intelligence</span>
          <br />
          Into Operations
        </h1>

        {/* Subtitle */}
        <p
          className="animate-fade-up"
          style={{
            fontFamily: '"Inter", system-ui',
            fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
            lineHeight: 1.7,
            color: '#94a3b8',
            maxWidth: '640px',
            animationDelay: '0.3s',
            animationFillMode: 'both',
          }}
        >
          Chariot Labs builds high-performance software powered by AI, ML, and
          robust system architectures — solving complex, real-world operational
          problems across industries.
        </p>

        {/* CTA Button */}
        <button
          className="btn-primary animate-fade-up hero-cta"
          style={{
            animationDelay: '0.45s',
            animationFillMode: 'both',
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
          onClick={() => scrollToSection('ecosystem')}
        >
          Explore Our Ecosystem
          <ArrowDown size={18} />
        </button>
      </div>

      {/* Scroll indicator */}
      <div
        className="hero-scroll-indicator animate-fade-up"
        style={{
          animationDelay: '0.8s',
          animationFillMode: 'both',
        }}
      >
        <span
          style={{
            fontFamily: '"Inter", system-ui',
            fontSize: '0.7rem',
            color: '#475569',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          Scroll to explore
        </span>
        <div
          style={{
            width: '1px',
            height: '40px',
            background:
              'linear-gradient(to bottom, rgba(0,240,255,0.5), transparent)',
          }}
          className="animate-pulse-glow"
        />
      </div>
    </section>
  )
}
