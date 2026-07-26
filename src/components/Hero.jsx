import { ArrowRight, Sparkles } from 'lucide-react'
import HeroBackground from './HeroBackground'
import { scrollToSection } from '../utils/scrollTo'

export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      <HeroBackground />
      <div className="hero-content">
        <div className="hero-badge">
          <Sparkles size={14} className="text-accent" />
          <span>Custom AI &amp; Agentic Engineering Studio · Noida, India</span>
        </div>

        <h1 className="hero-title">
          Engineering custom AI capabilities for <span className="hero-accent">real-world impact</span>
        </h1>

        <p className="hero-description">
          We design, fine-tune, and deploy tailor-made AI systems — from autonomous multi-agent teams and enterprise RAG engines to real-time computer vision and domain-trained models. If it can be built with AI, we engineer it for production.
        </p>

        <div className="hero-cta-group">
          <button
            className="btn-primary"
            onClick={() => scrollToSection('services')}
          >
            Explore AI Capabilities
            <ArrowRight size={18} />
          </button>
          <button
            className="btn-secondary"
            onClick={() => scrollToSection('contact')}
          >
            Discuss Your AI Project
          </button>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-number">6+</span>
            <span className="hero-stat-label">AI Core Capabilities</span>
          </div>
          <div className="hero-stat" style={{ width: '1px', height: '32px', background: 'var(--color-border)' }} />
          <div className="hero-stat">
            <span className="hero-stat-number">100%</span>
            <span className="hero-stat-label">Private &amp; Secure Data</span>
          </div>
          <div className="hero-stat" style={{ width: '1px', height: '32px', background: 'var(--color-border)' }} />
          <div className="hero-stat">
            <span className="hero-stat-number">24/7</span>
            <span className="hero-stat-label">Production AI Reliability</span>
          </div>
        </div>
      </div>
    </section>
  )
}
