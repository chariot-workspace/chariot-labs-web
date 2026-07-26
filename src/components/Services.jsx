import { Bot, Database, Eye, Cpu, Workflow, LineChart, ArrowRight } from 'lucide-react'

const aiCapabilities = [
  {
    id: 'agentic-ai',
    icon: Bot,
    title: 'Autonomous AI Agents',
    subtitle: 'Multi-Agent Orchestration & Workflow Execution',
    description:
      'Custom autonomous agents designed to plan, reason, invoke APIs, and execute complex multi-step workflows across your internal tools and enterprise systems.',
    features: [
      'Custom tool & API binding',
      'Multi-agent collaborative loops',
      'Long-term memory persistence',
      'Human-in-the-loop oversight',
    ],
    badge: 'Agentic Systems',
    accent: '#0065ff',
    subject: 'Autonomous AI Agents',
  },
  {
    id: 'enterprise-rag',
    icon: Database,
    title: 'Enterprise RAG & Knowledge Systems',
    subtitle: 'Secure Knowledge Search over Proprietary Data',
    description:
      'Private Retrieval-Augmented Generation engines that turn your internal documents, PDFs, databases, and wikis into precise, conversational knowledge bases.',
    features: [
      'Hybrid vector & keyword retrieval',
      'Strict role-based data isolation',
      'Source citation & hallucination checks',
      'Zero data training / total privacy',
    ],
    badge: 'RAG & Search',
    accent: '#8b5cf6',
    subject: 'Enterprise RAG System',
  },
  {
    id: 'computer-vision',
    icon: Eye,
    title: 'Computer Vision & Video Analytics',
    subtitle: 'Real-Time Camera Stream Intelligence',
    description:
      'Deep learning video analysis for automated safety compliance, object tracking, anomaly detection, and facial verification on edge or cloud servers.',
    features: [
      'Live RTSP stream processing',
      'Custom YOLO / TensorRT models',
      'Automated event & threat alerts',
      'Edge & cloud hybrid deployment',
    ],
    badge: 'Vision AI',
    accent: '#10b981',
    subject: 'Computer Vision Solution',
  },
  {
    id: 'fine-tuned-llms',
    icon: Cpu,
    title: 'Fine-Tuned Domain LLMs',
    subtitle: 'Specialized Open-Weights Models',
    description:
      'Training and LoRA fine-tuning of open models (Llama 3, Qwen, DeepSeek, Mistral) on your industry jargon, legal codes, or domain dataset for peak accuracy.',
    features: [
      'LoRA / QLoRA parameter tuning',
      'On-premise / private cloud hosting',
      'Low-latency vLLM inference engines',
      'Domain-specific vocabulary optimization',
    ],
    badge: 'Model Tuning',
    accent: '#ec4899',
    subject: 'Fine-Tuned LLMs',
  },
  {
    id: 'process-automation',
    icon: Workflow,
    title: 'Intelligent Document & Process Automation',
    subtitle: 'OCR + LLM Extraction Pipelines',
    description:
      'Automated processing of complex invoices, contracts, medical records, and receipts into structured database inputs with near-zero error rates.',
    features: [
      'Multimodal OCR + Vision Extraction',
      'Automated ERP / CRM sync',
      'Exception routing & validation ui',
      'Complete audit trail logging',
    ],
    badge: 'Process AI',
    accent: '#f59e0b',
    subject: 'Process Automation',
  },
  {
    id: 'predictive-ai',
    icon: LineChart,
    title: 'Predictive Analytics & Decision Engines',
    subtitle: 'Machine Learning Forecasting & Optimization',
    description:
      'Custom ML algorithms for demand forecasting, predictive maintenance, inventory optimization, and automated risk scoring tailored to operational data.',
    features: [
      'Real-time feature store integration',
      'Automated model retraining pipelines',
      'Drift detection & performance monitoring',
      'Interactive executive dashboards',
    ],
    badge: 'Predictive AI',
    accent: '#06b6d4',
    subject: 'Predictive Analytics',
  },
]

export default function Services() {
  return (
    <section id="services" className="section section-alt">
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div className="section-label">AI Engineering Capabilities</div>
        <h2 className="section-title">
          Anything you imagine in AI, engineered for production
        </h2>
        <p className="section-description" style={{ margin: '0 auto' }}>
          From autonomous multi-agent teams to fine-tuned domain models and real-time vision pipelines — we design, build, and deploy tailored AI capabilities for your enterprise.
        </p>
      </div>

      <div className="services-grid">
        {aiCapabilities.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.id} className="service-card">
              <div className="service-card-header">
                <div
                  className="card-icon"
                  style={{
                    marginBottom: 0,
                    color: item.accent,
                    background: `${item.accent}15`,
                  }}
                >
                  <Icon size={24} />
                </div>
                <span
                  className="service-status"
                  style={{
                    color: item.accent,
                    borderColor: `${item.accent}40`,
                    background: `${item.accent}10`,
                  }}
                >
                  {item.badge}
                </span>
              </div>

              <div className="service-card-body">
                <h3 className="service-card-title">{item.title}</h3>
                <div className="service-card-subtitle">{item.subtitle}</div>
                <p className="service-card-desc">{item.description}</p>

                <ul className="service-features">
                  {item.features.map((feat, fi) => (
                    <li key={fi} className="service-feature">
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={`mailto:admin@chariotlabs.in?subject=${encodeURIComponent(`AI Project Inquiry: ${item.subject}`)}`}
                  className="service-link"
                  style={{ color: item.accent }}
                >
                  <span>Build This Capability</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
