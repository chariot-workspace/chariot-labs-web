import { MapPin, Bot, Database, Eye, CheckCircle2 } from 'lucide-react'

const focusAreas = [
  {
    icon: Bot,
    title: 'Agentic Workflows',
    detail: 'Autonomous AI agents that execute complex, multi-step business actions across APIs.',
  },
  {
    icon: Database,
    title: 'Enterprise Knowledge',
    detail: 'Private RAG architectures enabling accurate conversational search over proprietary data.',
  },
  {
    icon: Eye,
    title: 'Vision & Perception',
    detail: 'Edge and cloud computer vision models for automated inspection, safety, and tracking.',
  },
]

const principles = [
  'We build custom AI capabilities tailored specifically to your data schema and workflows — zero generic wrappers.',
  'Your data remains 100% private. We implement zero-data-retention pipelines and on-premise model deployments.',
  'Full production engineering: latency optimization, fallback handling, hallucination guardrails, and telemetry monitoring.',
]

export default function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="about-grid">
        <div>
          <div className="section-label">About Chariot Labs</div>
          <h2 className="section-title">
            Your dedicated engineering partner for enterprise AI solutions.
          </h2>
          <p className="section-description" style={{ marginBottom: '24px' }}>
            Based in Noida, Chariot Labs specializes in turning cutting-edge AI research into robust, production-ready software.
          </p>
          <p className="section-description" style={{ marginBottom: '32px' }}>
            Whether you need custom autonomous AI agents, enterprise-grade RAG systems over internal data, or real-time computer vision pipelines — we architect solutions designed specifically for your operational requirements.
          </p>

          <ul className="about-principles">
            {principles.map((item, i) => (
              <li key={i} className="about-principle">
                <CheckCircle2 size={18} className="text-accent" style={{ flexShrink: 0, marginTop: 3 }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '32px', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
            <MapPin size={16} className="text-accent" />
            <span>Noida, Uttar Pradesh, India — Engineering AI for global enterprises</span>
          </div>
        </div>

        {/* Right side focus cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {focusAreas.map((area, i) => {
            const Icon = area.icon
            return (
              <div key={i} className="card" style={{ padding: '24px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div className="card-icon" style={{ marginBottom: 0, width: '40px', height: '40px', flexShrink: 0 }}>
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="card-title" style={{ fontSize: '1.05rem', marginBottom: '4px' }}>{area.title}</h3>
                  <p className="card-text" style={{ fontSize: '0.85rem' }}>{area.detail}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
