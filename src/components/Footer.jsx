import { scrollToSection } from '../utils/scrollTo'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-brand-logo">
            <img
              src="/logo.jpg"
              alt="Chariot Labs Logo"
              width="32"
              height="32"
              style={{ borderRadius: '50%', objectFit: 'cover' }}
            />
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem', color: '#fff' }}>
              Chariot Labs
            </span>
          </div>
          <p className="footer-brand-text">
            Custom AI engineering studio architecting autonomous agents, enterprise RAG search, computer vision pipelines, and fine-tuned domain models.
          </p>
        </div>

        <div>
          <div className="footer-col-title">Navigation</div>
          <ul className="footer-links">
            <li><a href="#about" className="footer-link" onClick={(e) => { e.preventDefault(); scrollToSection('about') }}>About Us</a></li>
            <li><a href="#services" className="footer-link" onClick={(e) => { e.preventDefault(); scrollToSection('services') }}>AI Capabilities</a></li>
            <li><a href="#why-us" className="footer-link" onClick={(e) => { e.preventDefault(); scrollToSection('why-us') }}>Why Chariot Labs</a></li>
            <li><a href="#process" className="footer-link" onClick={(e) => { e.preventDefault(); scrollToSection('process') }}>Our Process</a></li>
            <li><a href="#contact" className="footer-link" onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}>Contact Us</a></li>
          </ul>
        </div>

        <div>
          <div className="footer-col-title">AI Capabilities</div>
          <ul className="footer-links">
            <li><a href="#services" className="footer-link" onClick={(e) => { e.preventDefault(); scrollToSection('services') }}>Autonomous Agents</a></li>
            <li><a href="#services" className="footer-link" onClick={(e) => { e.preventDefault(); scrollToSection('services') }}>Enterprise RAG</a></li>
            <li><a href="#services" className="footer-link" onClick={(e) => { e.preventDefault(); scrollToSection('services') }}>Computer Vision</a></li>
            <li><a href="#services" className="footer-link" onClick={(e) => { e.preventDefault(); scrollToSection('services') }}>Fine-Tuned LLMs</a></li>
            <li><a href="#services" className="footer-link" onClick={(e) => { e.preventDefault(); scrollToSection('services') }}>Process Automation</a></li>
            <li><a href="#services" className="footer-link" onClick={(e) => { e.preventDefault(); scrollToSection('services') }}>Predictive Engines</a></li>
          </ul>
        </div>

        <div>
          <div className="footer-col-title">Location</div>
          <p className="footer-brand-text" style={{ marginBottom: '12px' }}>
            Noida, Uttar Pradesh, India
          </p>
          <a href="mailto:admin@chariotlabs.in" className="footer-link" style={{ color: 'var(--color-accent)' }}>
            admin@chariotlabs.in
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-copyright">
          © {new Date().getFullYear()} Chariot Labs. All rights reserved. Engineering AI in Noida, India.
        </div>
      </div>
    </footer>
  )
}
