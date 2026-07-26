import { useState, useEffect } from 'react'
import { Menu, X, MapPin, Mail, Sun, Moon } from 'lucide-react'
import { scrollToSection } from '../utils/scrollTo'
import { useTheme } from '../hooks/useTheme'

const NAV_ITEMS = [
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Why Us', id: 'why-us' },
  { label: 'Process', id: 'process' },
  { label: 'Contact', id: 'contact' },
]

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const handleNavClick = (id) => {
    scrollToSection(id)
    setMenuOpen(false)
  }

  return (
    <>
      <nav className={`nav-bar ${scrolled ? 'scrolled' : ''}`} aria-label="Main navigation">
        <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ cursor: 'pointer' }}>
          <img
            src="/logo.jpg"
            alt="Chariot Labs Logo"
            width="36"
            height="36"
            className="nav-logo-img"
          />
          <div className="nav-logo-copy">
            <span className="nav-logo-text">Chariot Labs</span>
            <span className="nav-logo-tagline">Operational Software Studio</span>
          </div>
        </div>

        <div className="nav-links-desktop">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="nav-link"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick(item.id)
              }}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>

          <button
            type="button"
            className="nav-cta"
            onClick={() => handleNavClick('contact')}
          >
            Get in Touch
          </button>
        </div>

        <button
          type="button"
          className="nav-menu-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`nav-mobile-menu ${menuOpen ? 'nav-mobile-menu--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className="nav-mobile-links">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="nav-mobile-link"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick(item.id)
              }}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="nav-mobile-footer">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            <span>Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
          </button>

          <a href="mailto:admin@chariotlabs.in" className="nav-mobile-contact">
            <Mail size={16} />
            admin@chariotlabs.in
          </a>
          <span className="nav-mobile-location">
            <MapPin size={16} />
            Noida, Uttar Pradesh
          </span>
          <button
            type="button"
            className="btn-primary nav-mobile-cta"
            onClick={() => handleNavClick('contact')}
          >
            Get in Touch
          </button>
        </div>
      </div>

      {menuOpen && (
        <button
          type="button"
          className="nav-mobile-backdrop"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  )
}
