import { ShieldCheck, Zap, Lock, Cpu, Server, Sparkles } from 'lucide-react'

const benefits = [
  {
    icon: Lock,
    title: '100% Private & Confidential Data',
    description: 'Zero data training policy. Your data is used exclusively to serve your inference requests with strict isolation.',
  },
  {
    icon: Cpu,
    title: 'Custom Model Tuning',
    description: 'We fine-tune open-weights models (Llama, Qwen, DeepSeek) to match your domain jargon and business rules.',
  },
  {
    icon: Server,
    title: 'On-Premise & Cloud Deployment',
    description: 'Flexibility to host AI pipelines in your AWS/Azure cloud account or fully air-gapped on-premise servers.',
  },
  {
    icon: ShieldCheck,
    title: 'Guardrails & Anti-Hallucination',
    description: 'Robust verification layers, citation enforcement, and structured output formatting for reliable outputs.',
  },
  {
    icon: Zap,
    title: 'Ultra-Low Latency Inference',
    description: 'Optimized Model serving with TensorRT, vLLM, and INT4/INT8 quantization for rapid real-time responses.',
  },
  {
    icon: Sparkles,
    title: 'End-to-End AI Engineering',
    description: 'From initial prompt architecture and vector indexing to UI design and full production monitoring.',
  },
]

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="section">
      <div style={{ marginBottom: '48px' }}>
        <div className="section-label">Why Choose Chariot Labs</div>
        <h2 className="section-title">Built for enterprise AI rigor</h2>
        <p className="section-description">
          We combine cutting-edge AI architecture with software engineering practices to deliver secure, reliable AI solutions.
        </p>
      </div>

      <div className="benefits-grid">
        {benefits.map((benefit, i) => {
          const Icon = benefit.icon
          return (
            <div key={i} className="card">
              <div className="card-icon">
                <Icon size={24} />
              </div>
              <h3 className="card-title">{benefit.title}</h3>
              <p className="card-text">{benefit.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
