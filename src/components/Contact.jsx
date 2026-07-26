import { useState } from 'react'
import { Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    product: 'Autonomous AI Agents',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', phone: '', product: 'Autonomous AI Agents', message: '' })
    }, 4000)
  }

  return (
    <section id="contact" className="section section-alt">
      <div className="contact-grid">
        <div>
          <div className="section-label">Get in Touch</div>
          <h2 className="section-title">Let's discuss your AI initiative</h2>
          <p className="section-description" style={{ marginBottom: '32px' }}>
            Have a custom AI requirement or want to evaluate an autonomous agent or RAG architecture for your organization? Contact our AI engineering team today.
          </p>

          <div className="contact-info-list">
            <div className="contact-info-item">
              <Mail className="contact-info-icon" size={18} />
              <a href="mailto:admin@chariotlabs.in">admin@chariotlabs.in</a>
            </div>
            <div className="contact-info-item">
              <MapPin className="contact-info-icon" size={18} />
              <span>Noida, Uttar Pradesh, India</span>
            </div>
            <div className="contact-info-item">
              <Clock className="contact-info-icon" size={18} />
              <span>Response within 24 business hours</span>
            </div>
          </div>
        </div>

        <div className="contact-form">
          {submitted ? (
            <div className="success-toast">
              <div className="success-icon">
                <CheckCircle size={28} className="text-emerald-500" />
              </div>
              <h3 className="card-title" style={{ textAlign: 'center', marginBottom: '8px' }}>
                Thank you for reaching out!
              </h3>
              <p className="card-text" style={{ textAlign: 'center' }}>
                We have received your AI inquiry and will get back to <strong>{formData.email}</strong> shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label className="form-label" htmlFor="contact-name">Full Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    className="input-field"
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="form-label" htmlFor="contact-email">Work Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    className="input-field"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="form-label" htmlFor="contact-product">AI Capability / Interest</label>
                  <select
                    id="contact-product"
                    className="input-field"
                    value={formData.product}
                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                  >
                    <option value="Autonomous AI Agents">Autonomous AI Agents</option>
                    <option value="Enterprise RAG System">Enterprise RAG &amp; Knowledge Search</option>
                    <option value="Computer Vision">Computer Vision &amp; Stream Analytics</option>
                    <option value="Fine-Tuned LLMs">Fine-Tuned Domain LLM</option>
                    <option value="Process Automation">Document &amp; Process Automation</option>
                    <option value="Predictive Analytics">Predictive AI &amp; Decision Engines</option>
                    <option value="Custom AI System">Other Custom AI Project</option>
                  </select>
                </div>

                <div>
                  <label className="form-label" htmlFor="contact-message">Project Details</label>
                  <textarea
                    id="contact-message"
                    className="input-field"
                    rows={4}
                    placeholder="Tell us about your data, use case, or what you want your AI system to accomplish..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  <span>Submit Inquiry</span>
                  <Send size={16} />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
