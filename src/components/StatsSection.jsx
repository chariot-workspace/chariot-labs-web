const stats = [
  { value: '500+', label: 'Personnel Managed Daily' },
  { value: '99.9%', label: 'System Uptime Target' },
  { value: '100%', label: 'SLDC File Compliance' },
  { value: '24/7', label: 'Proactive Telemetry' },
]

export default function StatsSection() {
  return (
    <section className="stats-section">
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="stat-item">
            <div className="stat-number">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
