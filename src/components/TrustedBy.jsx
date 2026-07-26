import { Bot, Database, Eye, Cpu, Workflow, Sparkles, Shield, Building2 } from 'lucide-react'

const CLIENT_TYPES = [
  { icon: Bot, label: 'Autonomous AI Agents' },
  { icon: Database, label: 'Enterprise RAG Search' },
  { icon: Eye, label: 'Real-Time Computer Vision' },
  { icon: Cpu, label: 'Fine-Tuned LLMs' },
  { icon: Workflow, label: 'Document & OCR Automation' },
  { icon: Sparkles, label: 'Predictive Decision Engines' },
  { icon: Shield, label: 'On-Premise AI Security' },
  { icon: Building2, label: 'Custom Enterprise AI' },
]

export default function TrustedBy() {
  return (
    <section className="trusted-section">
      <div className="trusted-label">Architecting AI systems across key technologies</div>
      <div style={{ overflow: 'hidden', width: '100%' }}>
        <div className="marquee-container">
          {[...CLIENT_TYPES, ...CLIENT_TYPES].map((item, i) => {
            const Icon = item.icon
            return (
              <div key={i} className="marquee-item">
                <Icon size={18} className="text-accent" />
                <span>{item.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
