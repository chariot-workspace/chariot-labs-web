import { MapPin, Mail, Clock } from 'lucide-react'

export default function TopBar() {
  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <div className="top-bar-item">
          <MapPin size={13} className="text-accent" />
          <span>Noida, Uttar Pradesh, India</span>
        </div>
        <div className="top-bar-item">
          <Clock size={13} />
          <span>Mon – Sat: 9:00 AM – 7:00 PM IST</span>
        </div>
      </div>
      <div className="top-bar-right">
        <a href="mailto:admin@chariotlabs.in" className="top-bar-item">
          <Mail size={13} />
          <span>admin@chariotlabs.in</span>
        </a>
      </div>
    </div>
  )
}
