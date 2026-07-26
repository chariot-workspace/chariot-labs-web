const testimonials = [
  {
    quote: "Chariot Labs built our autonomous customer support agent. It handles 70% of our daily query volume accurately while maintaining our strict tone guidelines.",
    author: "VP of Product",
    company: "SaaS Enterprise Platform",
  },
  {
    quote: "Our internal RAG knowledge system searches across 50,000+ technical PDF manuals instantly with exact page citations. The accuracy is remarkable.",
    author: "Head of Engineering",
    company: "Industrial Manufacturing Group",
  },
  {
    quote: "The computer vision stream analysis system installed across our warehouses detects safety compliance issues automatically in under 200ms.",
    author: "Chief Technology Officer",
    company: "Logistics & Supply Chain Corp",
  },
]

export default function Testimonials() {
  return (
    <section className="section">
      <div style={{ marginBottom: '48px' }}>
        <div className="section-label">Client Impact</div>
        <h2 className="section-title">Proven AI results in production</h2>
        <p className="section-description">
          Feedback from technical leaders and operational teams deploying Chariot Labs AI solutions.
        </p>
      </div>

      <div className="testimonials-grid">
        {testimonials.map((t, i) => (
          <div key={i} className="testimonial-card">
            <p className="testimonial-quote">"{t.quote}"</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">
                {t.author.charAt(0)}
              </div>
              <div>
                <div className="testimonial-name">{t.author}</div>
                <div className="testimonial-role">{t.company}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
