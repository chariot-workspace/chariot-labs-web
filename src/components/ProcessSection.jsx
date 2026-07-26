const steps = [
  {
    step: '01',
    title: 'Discovery & Audit',
    description: 'We evaluate your current ground operations, data flows, compliance needs, and hardware integrations.',
  },
  {
    step: '02',
    title: 'Architecture & Design',
    description: 'We structure custom workflows, user permission hierarchies, and reporting pipelines fitted to your org.',
  },
  {
    step: '03',
    title: 'Integration & Testing',
    description: 'We configure your platform, run stress tests under actual field conditions, and train your personnel.',
  },
  {
    step: '04',
    title: 'Live Launch & Operations',
    description: 'We deploy to production with continuous monitoring, automated backups, and guaranteed uptime.',
  },
]

export default function ProcessSection() {
  return (
    <section id="process" className="section section-alt">
      <div style={{ marginBottom: '48px' }}>
        <div className="section-label">Our Process</div>
        <h2 className="section-title">How we partner with operations</h2>
        <p className="section-description">
          A structured, transparent engagement model designed to move from initial assessment to live production seamlessly.
        </p>
      </div>

      <div className="process-grid">
        {steps.map((item, i) => (
          <div key={i} className="process-card">
            <div className="process-number">{item.step}</div>
            <h3 className="process-title">{item.title}</h3>
            <p className="process-desc">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
